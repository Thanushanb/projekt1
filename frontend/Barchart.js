document.addEventListener("DOMContentLoaded", () => {
    // Dimensioner for diagrammet
    const w = 1000; // Bredde
    const h = 500;  // Højde
    const padding = 50; // Margen til akserne

    // Funktion til at hente data fra API'et
    async function fetchData() {
        try {
            const response = await fetch("/api/albums"); // Hent data fra API
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json(); // Returner data som JSON
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    // Funktion til at oprette diagram
    async function createChart(sortByAvg = false) {
        const data = await fetchData(); // Hent data
        if (!data) return; // Afbryd, hvis data ikke kan hentes

        // Grupér data efter år og beregn total og gennemsnit
        let aggregatedData = {};
        data.forEach(d => {
            if (!aggregatedData[d.year]) {
                aggregatedData[d.year] = { total: 0, count: 0 };
            }
            aggregatedData[d.year].total += +d.avg_measurement; // Saml total
            aggregatedData[d.year].count += 1; // Tæl antallet
        });

        // Opret nyt array med gennemsnit for hvert år
        let formattedData = Object.keys(aggregatedData).map(year => ({
            year: +year, // Konverter år til tal
            avg_measurement: aggregatedData[year].total / aggregatedData[year].count, // Beregn gennemsnit
        }));

        // Sortér data efter gennemsnit, hvis sortByAvg er sandt
        if (sortByAvg) {
            formattedData.sort((a, b) => b.avg_measurement - a.avg_measurement);
        }

        // Fjern eksisterende SVG
        d3.select("#chartContainer").select("svg").remove();

        // Opret skalaer
        const xScale = d3
            .scaleBand()
            .domain(formattedData.map(d => d.year)) // Mapper år
            .range([padding, w - padding]) // Inden for bredden
            .padding(0.1); // Mellemrum mellem søjler

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(formattedData, d => d.avg_measurement)]) // Op til max værdi
            .range([h - padding, padding]); // Inden for højden

        // Opret SVG-element
        const svg = d3
            .select("#chartContainer")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Opret tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #ccc")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("pointer-events", "none")
            .style("opacity", 0);

        // Opret akser
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Tegn x-aksen
        svg.append("g")
            .attr("transform", `translate(0, ${h - padding})`) // Flyt til bunden
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-45)") // Roter labels
            .style("text-anchor", "end"); // Juster tekst

        // Tegn y-aksen
        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`) // Flyt til venstre
            .call(yAxis);

        // Tilføj søjler
        svg.selectAll("rect")
            .data(formattedData) // Bind data
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.year)) // Placering på x-aksen
            .attr("y", h - padding) // Start nederst for animation
            .attr("width", xScale.bandwidth()) // Bredde på søjler
            .attr("height", 0) // Start med højde 0
            .attr("fill", "steelblue") // Farve på søjler
            .on("mouseover", (event, d) => {
                tooltip
                    .style("opacity", 1)
                    .html(`<strong>Year:</strong> ${d.year}<br><strong>Avg Measurement:</strong> ${d.avg_measurement.toFixed(2)}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 30}px`);
            })
            .on("mousemove", event => {
                tooltip
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 30}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            })
            .transition() // Animation
            .duration(2000) // Varighed
            .delay((d, i) => i * 100) // Forsinkelse mellem søjler
            .attr("y", d => yScale(d.avg_measurement)) // Slutplacering
            .attr("height", d => h - padding - yScale(d.avg_measurement)); // Sluthøjde

        // Tilføj aksetitler
        svg.append("text")
            .attr("x", w / 2)
            .attr("y", h - 10)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("Year");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -h / 2)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("Average Measurement (Tons of Plastic)");
    }

    // Knappernes event listeners
    document.getElementById("comparisonButton").addEventListener("click", () => {
        createChart(); // Tegn uden sortering
    });

    document.getElementById("rankingButton").addEventListener("click", () => {
        createChart(true); // Tegn med sortering
    });
});
