const width = 1200;
const height = 600;

const marginLeft = 30;
const marginBottom = 30;
const marginRight = 30;
const marginTop = 10;

const svgLine = d3.select("#line-viz").append("svg").attr("width", width + marginLeft + marginRight + 90).attr("height", height + marginTop + marginBottom).append("g").attr("transform", `translate(${75}, ${marginTop})`)

const explainerStart = svgLine
                  .append("text")
                  .text("Hyppigheden af samples med density class")
                  .attr("fill", "#fcffc7")
                  .attr("x", 50)
                  .attr("y", 20)
                  
                  

const explainerH = svgLine
                  .append("text")
                  .text("'High'")
                  .attr("fill", "#FFFF00")
                  .attr("x", 362)
                  .attr("y", 20)

const og = svgLine
                  .append("text")
                  .text("og")
                  .attr("fill", "#fcffc7")
                  .attr("x", 405)
                  .attr("y", 20)

const explainerVH = svgLine
                  .append("text")
                  .text("'Very High'")
                  .attr("fill", "#ff0000")
                  .attr("x", 427)
                  .attr("y", 20)

const veryHighTxt = svgLine
                    .append("text")
                    .text("Very High")
                    .attr("fill", "#ff0000")
                    .attr("x", 1200)
                    .attr("y", 515)

const HighTxt = svgLine
                    .append("text")
                    .text("High")
                    .attr("fill", "#FFFF00")
                    .attr("x", 1200)
                    .attr("y", 465)


d3.json(`/api/density`).then((data) => {
    console.log(data);

    // Grupperer data efter density_class. group(data, keys) grupperer data efter keys med anonym funktion
    // Laver det til en 'InternMap' (her får man 1 array med index tilsvarende grupperne, hvert er et objekt med den grupperede key værdi som key, og værdien til den key er et nyt array med de tilhørende værdier
    const sumstat = d3.group(data, (d) => d.density_class);
    console.log(sumstat); // Eksempel på ovenstående forklaring

    // Tilføjer x-akse
    const xAxis = d3.scaleLinear()
                    .domain(d3.extent(data, function(d) { return d.year}))  // Domain er 'range' for data  d3.extent sætter både min og maks i en funktion
                    .range([0, width]);  // Range er den aktuelle range som data skal vises i (normalt svg'ets størrelse i pixels)
    
    svgLine.append("g")
    .attr("transform", `translate(0, ${height})`) // Sætter x og y værdien for vores g element
    .call(d3.axisBottom(xAxis).ticks(19).tickFormat(d => `år ${d}`));  // axisBottom bestemmer hvor ticks' skal stritte ud. xAxis scaler g elementet. tickFormat() bruges til at sætte prefix foran året

    // Tilføjer y-akse
    const yAxis = d3.scaleLinear()
                    .domain([0, 400]) // Istedet for at lave max af data, laver jeg max statisk, så vi får den øverste tick med (hvis max bliver max af data kommer sidste tick ikke med)
                    .range([height, 0]);
    svgLine.append("g")
           .call(d3.axisLeft(yAxis).tickFormat(d => `Samples ${d}`)); // yAxis scaler g elementet

    // Farven til hver gruppering
    const color = d3.scaleOrdinal()
                    .range(["#FFFF00", "#ff0000"])

    // Lav linjerne baseret på data
    const path = svgLine.selectAll(".line")
    .data(sumstat)
    .join("path")  // Laver en <path> for hvert group i sumstat
      .attr("fill", "none") // Ingen fill, da fill fylder pladsen under grafen (som noget integral noget). uden .attr("fill") vil den alligevel fylde ud med sort farve.
      .attr("stroke", function(d){ return color(d[0]) })  // Her bliver farverne sat på, baseret på d[0] som er group keys i vores InternMap
      .attr("stroke-width", 1.5)
      .attr("d", function(d){   // "d" bestemmer 'formen' på vores linjer
        return d3.line()  // Line funktionen laver linjer baseret på datasæt
                .x(function(d) {return xAxis(d.year); })  // Linjens x-værdi lig med datasættets år
                .y(function(d) {return yAxis(+d.high); })  // Linjens y-værdi lig med datasættets 'high' værdi som er mængden af samples med enten 'high' eller 'very high' i density
                (d[1])  // d[1] er et array af data som tilhører gruppen (her ved os er det 'high' og 'very high')
      })

      const pathLength = path.node().getTotalLength();

      function drawPath(){
      path.attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition()
      .duration(2500)
      .attr("stroke-dashoffset", 0);
      };

     
      drawPath();
      
      
});