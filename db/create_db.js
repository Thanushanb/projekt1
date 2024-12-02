import pg from 'pg';
import dotenv from 'dotenv';
import { pipeline } from 'node:stream/promises'
import fs from 'node:fs'
import { from as copyFrom } from 'pg-copy-streams'

dotenv.config();
console.log('Connecting to database', process.env.PG_DATABASE);
const db = new pg.Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: process.env.PG_REQUIRE_SSL ? {
        rejectUnauthorized: false,
    } : undefined,
});
const dbResult = await db.query('select now()');
console.log('Database connection established on', dbResult.rows[0].now);

console.log('Recreating tables...');
await db.query(`
drop table if exists oceans cascade;
drop table if exists samples cascade;
drop table if exists sampling_methods cascade;
drop table if exists units cascade;
drop table if exists density_classes cascade;
drop table if exists temp_table;

create table temp_table (
object_id integer,
ocean text,
regions text,
subregions text,
samplingmethod text,
measurement numeric,
unit text,
densityrange text,
densityclass text,
shortreference text,
longreference text,
doi text,
organization text,
keywords text,
accessionnumber integer,
accessionlink text,
latitude numeric,
longitude numeric,
date timestamp,
globalid text,
x real,
y real
);

/* Har importeret csv fil ind i temp table gennem PSQL */

create table oceans (
ocean_id serial primary key,
ocean text
);


create table sampling_methods (
sampling_method_id serial primary key,
sampling_method text
);


create table units (
unit_id serial primary key,
unit text
);

create table density_classes (
density_class_id serial primary key,
density_class text
);


create table samples (
sample_id serial primary key,
ocean_id integer references oceans (ocean_id),
sampling_method_id integer references sampling_methods (sampling_method_id),
measurement numeric not null check (measurement >= 0),
date timestamp,
unit_id integer references units (unit_id) not null,
density_range text,
density_class_id integer references density_classes (density_class_id),
latitude real,
longitude real
);`);
console.log('Tables recreated.');

console.log('Copying data from CSV files...');
await copyIntoTable(db, `
	copy temp_table
	from stdin
	with csv header`, 'db/MicroPlastics.csv');


await db.query(`
        insert into oceans (ocean)
(select distinct ocean from temp_table);


insert into sampling_methods (sampling_method)
(select distinct samplingmethod from temp_table);


insert into units (unit)
(select distinct unit from temp_table);


insert into density_classes (density_class)
(select distinct densityclass from temp_table);


insert into samples (ocean_id, sampling_method_id, measurement, date, unit_id, density_range, density_class_id, latitude, longitude)
(select case when ocean = 'Pacific Ocean' then 5
when ocean = 'Arctic Ocean' then 1
when ocean = 'Atlantic Ocean' then 3
when ocean = 'Sounthern Ocean' then 2
when ocean = 'Indian Ocean' then 6
end,
case when samplingmethod = 'Aluminum bucket' then 1
when samplingmethod = 'stainless-steel sampler' then 2
when samplingmethod = 'Surface water intake' then 3
when samplingmethod = 'Sediment grab sampler' then 4
when samplingmethod = 'Grab sample' then 5
when samplingmethod = 'shovel' then 6
when samplingmethod = 'Manta net' then 7
when samplingmethod = 'Metal spoon' then 8
when samplingmethod = 'Ekman dredge' then 9
when samplingmethod = 'PVC cylinder' then 10
when samplingmethod = 'Shipek grab sampler' then 11
when samplingmethod = 'Stainless steel spoon' then 12
when samplingmethod = 'Metal scoop' then 13
when samplingmethod = 'CTD rosette sampler' then 14
when samplingmethod = 'Intake seawater pump' then 15
when samplingmethod = 'Plankton net' then 16
when samplingmethod = 'Neuston net' then 17
when samplingmethod = 'Stainless steel bucket' then 18
when samplingmethod = 'Hand picking' then 19
when samplingmethod = 'Van Veen grab sampler' then 20
when samplingmethod = 'AVANI net' then 21
when samplingmethod = 'Trowel' then 22
when samplingmethod = 'Van Dorn sampler' then 23
when samplingmethod = 'plankton net' then 24
when samplingmethod = 'Megacorer' then 25
when samplingmethod = 'Day grab' then 26
when samplingmethod = 'Petite Ponar benthic grab' then 27
when samplingmethod = 'Remotely operated vehicle' then 28
end,
measurement,
date,
case when unit = 'pieces/10 mins' then 3
when unit = 'pieces kg-1 d.w.' then 1
when unit = 'pieces/m3' then 2
end,
densityrange,
case when densityclass = 'Very Low' then 4
when densityclass = 'High' then 3
when densityclass = 'Medium' then 1
when densityclass = 'Very High' then 2
when densityclass = 'Low' then 5
end,
latitude,
longitude
from temp_table
);

delete from samples
where measurement = 0;

create index samples_index on samples (measurement);`)
	

await db.end();
console.log('Data copied.');

async function copyIntoTable(db, sql, file) {
	const client = await db.connect();
	try {
		const ingestStream = client.query(copyFrom(sql))
		const sourceStream = fs.createReadStream(file);
		await pipeline(sourceStream, ingestStream);
	} finally {
		client.release();
	}
}