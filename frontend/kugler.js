// Opret en SVG-container direkte på body (uden at pakke det ind i en aflang boks)
const svgLegend = d3.selectAll(".visualisering-content").append("svg")
    .attr("width", 1400)  // Brede af SVG, juster efter behov
    .attr("height", 100);  // Højde af SVG

const r = 10;  // Radius for cirklerne (standard)
const d = 150;  // Mellemrum mellem cirklerne (horisontalt), kan justeres

const offsetY = 50;  // For at placere cirklerne på den ønskede vertikale position

// Tekstværdierne, som skal vises ved cirklerne
const values = [500, 100, 1, 0.1];

for (let i = 0; i < 4; i++) {
    let circleRadius = r;  // Standardradius

    // Hvis det er den lille cirkel (i == 3), gør radius mindre og ændr farven til hvid
    if (i === 3) {
        circleRadius = 5;  // Gør den lille cirkel mindre (radius 5)
    }

    // Tilføj cirklerne vandret
    svgLegend.append("circle")
        .attr('cx', 100 + (i * d))  // X-position for cirklerne, placeres med et større mellemrum horisontalt
        .attr('cy', offsetY)  // Y-position for cirklerne (forbliver konstant)
        .attr('r', circleRadius)  // Brug den beregnede radius
        .attr("id", `viz${i}`)  // Unikt ID for hver cirkel (fx viz0, viz1, osv.)
        .attr('fill', 
            i === 0 ? '#FF0000' :   // Gør den første cirkel rød
            (i === 1 ? '#FCFF00' :  // Gør den anden cirkel gul
            (i === 2 ? '#FFFFFF' :  // Gør den tredje cirkel hvid
            '#FFFFFF')));  // Gør den lille cirkel hvid (i == 3)

    // Tilføj tekst ved cirklerne
    svgLegend.append("text")
        .attr("x", 100 + (i * d) + 20)   // Placering af teksten til højre for cirklerne
        .attr("y", offsetY)    // Samme Y-position som cirklen
        .attr("font-size", "14px")  // Tekststørrelse
        .attr("fill", "#fcffc7")    // Tekstfarve #fcffc7 (lys gul)
        .text(values[i] + ' stk. plastik');           // Teksten afhænger af værdien i arrayet 'values'
}
