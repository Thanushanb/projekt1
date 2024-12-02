const svg = d3.selectAll(".visualisering-content").append("svg").attr("width", 1400).attr("height", 300);

svg
.append("text")
.text("Gennemsnitlig mikroplast pr. m3 pr. år siden 2014")
.attr("x", 0)
.attr("y", 20)
.style("fill", "#fcffc7")
.style("font-size", 14)


d3.json(`/api/albums`).then((data) => {
  
    console.log(data);

    function createBucket  (scaling, xShift, yShift) {
        svg.append("line")
        .attr('x1', 50 * scaling + xShift)
        .attr('y1', 200 * scaling + yShift)
        .attr('x2', 100 * scaling + xShift)
        .attr('y2', 300 * scaling + yShift)
        .attr('stroke', '#fcffc7')
    
        svg.append("line")
        .attr('x1', 100 * scaling + xShift)
        .attr('y1', 300 * scaling + yShift)
        .attr('x2', 200 * scaling + xShift)
        .attr('y2', 300 * scaling + yShift)
        .attr('stroke', '#fcffc7')
    
        svg.append("line")
        .attr('x1', 200 * scaling + xShift)
        .attr('y1', 300 * scaling + yShift)
        .attr('x2', 250 * scaling + xShift)
        .attr('y2', 200 * scaling + yShift)
        .attr('stroke', '#fcffc7')
    };

    createBucket (1.25, 50, -75);
    createBucket (1.25, 350, -75);
    createBucket (1.25, 650, -75);
    createBucket (1.25, 950, -75);



    // Teksten til Atlantic over bucket
    svg
    .append("text")
    .text("Atlantic Ocean")
    .attr("x", 470)
    .attr("y", 170)
    .attr("id", "pac")
    .style("fill", "#fcffc7")
    .style("font-size", 20)


    // Teksten til Pacific over bucket
    svg
    .append("text")
    .text("Pacific Ocean")
    .attr("x", 1075)
    .attr("y", 170)
    .style("fill", "#fcffc7")
    .style("font-size", 20)

    // Teksten til Arctic over bucket
    svg
    .append("text")
    .text("Arctic Ocean")
    .attr("x", 180)
    .attr("y", 170)
    .style("fill", "#fcffc7")
    .style("font-size", 20)

    // Teksten til Indian over buvket
    svg
    .append("text")
    .text("Indian Ocean")
    .attr("x", 780)
    .attr("y", 170)
    .style("fill", "#fcffc7")
    .style("font-size", 20)
   
    // Show buttons
    function show2014 () {
      svg.selectAll("#viz").remove();
        svg.selectAll("#viz_year").remove();
        createPlasticAtla2014 (352);
        createPlasticPacific2014 (952);

        svg
        .append("text")
        .text("2014")
        .attr("x", 665)
        .attr("y", 20)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 20);
        
        let Pac2014 = data[3].avg_measurement
        svg
        .append("text")
        .text(`${Pac2014.slice(0, 4)}`)
        .attr("x", 1123)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 1123)
        .attr("y", 140 )
        .style("opacity", 1);

        let Atl2014 = data[1].avg_measurement
        svg
        .append("text")
        .text(`${Atl2014.slice(0, 4)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);
    };
   
    function show2015 () {
      svg.selectAll("#viz").remove();
      svg.selectAll("#viz_year").remove();
      createPlasticAtla2015 (352);
      createPlasticPacific2015 (952);
        

        svg
        .append("text")
        .text("2015")
        .attr("x", 665)
        .attr("y", 20)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 20);

        let Pac2015 = data[7].avg_measurement
        svg
        .append("text")
        .text(`${Pac2015.slice(0, 3)}`)
        .attr("x", 1123)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 1123)
        .attr("y", 140 )
        .style("opacity", 1);

        let Atl2015 = data[5].avg_measurement
        svg
        .append("text")
        .text(`${Atl2015.slice(0, 4)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);
        
    };


    function show2016 () {
      svg.selectAll("#viz").remove();
      svg.selectAll("#viz_year").remove();
      createPlasticAtla2016 (352)
      createPlasticArc2016 (52)
        

        svg
        .append("text")
        .text("2016")
        .attr("x", 665)
        .attr("y", 20)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 20);

        let Atl2016 = data[9].avg_measurement
        svg
        .append("text")
        .text(`${Atl2016.slice(0, 3)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);

        let Arc2016 = data[8].avg_measurement
        svg
        .append("text")
        .text(`${Arc2016.slice(0, 2)}`)
        .attr("x", 225)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 225)
        .attr("y", 140 )
        .style("opacity", 1);
    };


    function show2017 () {
      svg.selectAll("#viz").remove();
      svg.selectAll("#viz_year").remove();
      createPlasticAtla2017 (352);
      createPlasticIndia2017 (652);
      createPlasticPacific2017 (952);

        svg
        .append("text")
        .text("2017")
        .attr("x", 665)
        .attr("y", 20)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 20);

        let Atl2017 = data[13].avg_measurement
        svg
        .append("text")
        .text(`${Atl2017.slice(0, 3)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);

        let Pac2017 = data[15].avg_measurement
        svg
        .append("text")
        .text(`${Pac2017.slice(0, 4)}`)
        .attr("x", 1123)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 1123)
        .attr("y", 140 )
        .style("opacity", 1);

        let Indi2017 = data[14].avg_measurement
        svg
        .append("text")
        .text(`${Indi2017.slice(0, 2)}`)
        .attr("x", 818)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 818)
        .attr("y", 140 )
        .style("opacity", 1);
    }


    function show2018 () {
      svg.selectAll("#viz").remove();
      svg.selectAll("#viz_year").remove();
      createPlasticAtla2018 (352);
      createPlasticPacific2018 (952);

        svg
        .append("text")
        .text("2018")
        .attr("x", 665)
        .attr("y", 20)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 20);

        let Atl2018 = data[17].avg_measurement
        svg
        .append("text")
        .text(`${Atl2018.slice(0, 3)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);

        let Pac2018 = data[19].avg_measurement
        svg
        .append("text")
        .text(`${Pac2018.slice(0, 4)}`)
        .attr("x", 1123)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 1123)
        .attr("y", 140 )
        .style("opacity", 1);
    }

    function show2019 () {
        svg.selectAll("#viz").remove();
        svg.selectAll("#viz_year").remove();
        createPlasticAtla2019 (352);
        createPlasticPacific2019 (952);
        createPlasticArc2019 (52);
        createPlasticIndia2019 (652);

        svg
        .append("text")
        .text("2019")
        .attr("x", 665)
        .attr("y", 20)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 20);

        let Atl2019 = data[21].avg_measurement
        svg
        .append("text")
        .text(`${Atl2019.slice(0, 4)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);

        let Pac2019 = data[23].avg_measurement
        svg
        .append("text")
        .text(`${Pac2019.slice(0, 5)}`)
        .attr("x", 1123)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 1123)
        .attr("y", 140 )
        .style("opacity", 1);

        let Indi2019 = data[22].avg_measurement
        svg
        .append("text")
        .text(`${Indi2019.slice(0, 4)}`)
        .attr("x", 818)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 818)
        .attr("y", 140 )
        .style("opacity", 1);

        let Arc2019 = data[20].avg_measurement
        svg
        .append("text")
        .text(`${Arc2019.slice(0, 4)}`)
        .attr("x", 225)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 225)
        .attr("y", 140 )
        .style("opacity", 1);
        
    };


    function show2020 () {
      svg.selectAll("#viz").remove();
      svg.selectAll("#viz_year").remove();
      createPlasticAtla2020 (352);
      createPlasticIndia2020 (652);
      createPlasticPacific2020 (952);


      svg
      .append("text")
      .text("2020")
      .attr("x", 665)
      .attr("y", 20)
      .attr("id", "viz_year")
      .style("fill", "#fcffc7")
      .style("font-size", 20);

      let Atl2020 = data[25].avg_measurement
        svg
        .append("text")
        .text(`${Atl2020.slice(0, 3)}`)
        .attr("x", 520)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 520)
        .attr("y", 140 )
        .style("opacity", 1);

        let Pac2020 = data[27].avg_measurement
        svg
        .append("text")
        .text(`${Pac2020.slice(0, 2)}`)
        .attr("x", 1123)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 1123)
        .attr("y", 140 )
        .style("opacity", 1);

        let Indi2020 = data[26].avg_measurement
        svg
        .append("text")
        .text(`${Indi2020.slice(0, 3)}`)
        .attr("x", 818)
        .attr("y", 170)
        .attr("id", "viz_year")
        .style("fill", "#fcffc7")
        .style("font-size", 16)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .attr("x", 818)
        .attr("y", 140 )
        .style("opacity", 1);
    }


// create 2014 cirklerne

    function createPlasticPacific2014 (xShift) {
      makeBalls = Math.round(data[3].avg_measurement / 0.10);
      console.log(makeBalls);
   
         for (i = 1; i<=makeBalls; i++) { 
          let time = 1000;
          let timeFactor = 0.05;
          let r = 5
          let d = r * 2
   
          if (i < 12){
          svg.append("circle")
          .attr('cx', 185)
          .attr('cy', -10)
          .attr('r', r)
          .attr("id", "viz")
          .attr('stroke', 'black')
          .attr('fill', '#dfe3eb')
          .transition()
          .duration(time * (i * timeFactor)) 
          .attr('cx', 115 + (i * d) + xShift)
          .attr('cy', 293)
         }
   
     }
    };


    function createPlasticAtla2014 (xShift) {
      makeBalls = Math.round(data[1].avg_measurement / 0.10);
      console.log(makeBalls);
   
         for (i = 1; i<=makeBalls; i++) { 
          let time = 1000;
          let timeFactor = 0.05;
          let r = 5
          let d = r * 2
   
          if (i < 12){
          svg.append("circle")
          .attr('cx', 185)
          .attr('cy', -10)
          .attr('r', r)
          .attr("id", "viz")
          .attr('stroke', 'black')
          .attr('fill', '#dfe3eb')
          .transition()
          .duration(time * (i * timeFactor)) 
          .attr('cx', 115 + (i * d) + xShift)
          .attr('cy', 293)
         }
   
     }
    };

// create 2015 cirklerne

    function createPlasticAtla2015 (xShift) {
      makeBalls = Math.round(data[5].avg_measurement / 0.10);
      console.log(makeBalls);

      for (i = 1; i<=makeBalls; i++) { 
      
            for (i = 1; i<=makeBalls; i++) { 
             let time = 1000;
             let timeFactor = 0.05;
             let r = 5
             let d = r * 2
      
             if (i < 12){
             svg.append("circle")
             .attr('cx', 185)
             .attr('cy', -10)
             .attr('r', r)
             .attr("id", "viz")
             .attr('stroke', 'black')
             .attr('fill', '#dfe3eb')
             .transition()
             .duration(time * (i * timeFactor)) 
             .attr('cx', 115 + (i * d) + xShift)
             .attr('cy', 293)
             }
        }
    }};


    function createPlasticPacific2015 (xShift) {
      makeBalls = Math.round(data[7].avg_measurement / 100);
      console.log(makeBalls);

      for (i = 1; i<=makeBalls; i++) { 
      
         for (i = 1; i<=makeBalls; i++) { 
            let time = 1000;
            let timeFactor = 0.05;
     
            if (i < 7){
            svg.append("circle")
            .attr('cx', 185)
            .attr('cy', -10)
            .attr('r', 10)
            .attr("id", "viz")
            .attr('stroke', 'black')
            .attr('fill', '#FFFF00')
            .transition()
            .duration(time * (i * timeFactor)) 
            .attr('cx', 115 + (i * 20) + xShift)
            .attr('cy', 288)
           }
         }
    }};


// create 2016 cirklerne

    function createPlasticArc2016 (xShift) {
      makeBalls = Math.round(data[8].avg_measurement / 1);
      console.log(makeBalls);
      for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
  
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#dfe3eb')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        } else if (i >= 7 && i <= 13) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#dfe3eb')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -13 + (i * 20) + xShift) 
         .attr('cy', 268)
        } else if (i > 13 && i <=21) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#dfe3eb')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -165 + (i * 20) + xShift) 
         .attr('cy', 248)
        } else if (i > 21 && i <= 30) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#dfe3eb')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -335 + (i * 20) + xShift) 
         .attr('cy', 228)
        }

     }};


    function createPlasticAtla2016 (xShift) {
      makeBalls = Math.round(data[9].avg_measurement / 100);
      console.log(makeBalls);
      for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
  
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        }
     }};


// create 2017 cirklerne

function createPlasticAtla2017 (xShift) {
   makeBalls = Math.round(data[13].avg_measurement / 100);
      console.log(makeBalls);
      for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
  
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        }
     }
};

function createPlasticIndia2017 (xShift) {
   makeBalls = Math.round(data[14].avg_measurement / 1);
   console.log(makeBalls);
   for (i = 1; i<=makeBalls; i++) { 
      let time = 1000;
      let timeFactor = 0.05;

      if (i < 7){
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#dfe3eb')
      .transition()
      .duration(time * (i * timeFactor)) 
      .attr('cx', 115 + (i * 20) + xShift)
      .attr('cy', 288)
     } else if (i >= 7 && i <= 13) {
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#dfe3eb')
      .transition()
      .duration(time * (i * timeFactor))
      .attr('cx', -13 + (i * 20) + xShift) 
      .attr('cy', 268)
     } else if (i > 13 && i <=21) {
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#dfe3eb')
      .transition()
      .duration(time * (i * timeFactor))
      .attr('cx', -165 + (i * 20) + xShift) 
      .attr('cy', 248)
     };
}};

function createPlasticPacific2017 (xShift) {
   makeBalls = Math.round(data[15].avg_measurement / 100);
        console.log(makeBalls);
        let time = 1000;
        let timeFactor = 0.05;

        for (i = 1; i<=makeBalls; i++) { 
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        } else if (i >= 7 && i <= 13) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -13 + (i * 20) + xShift) 
         .attr('cy', 268)
        } else if (i > 13 && i <=21) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -165 + (i * 20) + xShift) 
         .attr('cy', 248)
        } else if (i > 21 && i <= 30) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -335 + (i * 20) + xShift) 
         .attr('cy', 228)
        } else if (i > 30 && i <= 40) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -528 + (i * 20) + xShift) 
         .attr('cy', 208)
        }
        }
    };


// create 2018 cirklerne

function createPlasticAtla2018 (xShift) {
   makeBalls = Math.round(data[17].avg_measurement / 100);
   console.log(makeBalls);
   for (i = 1; i<=makeBalls; i++) { 
      let time = 1000;
      let timeFactor = 0.05;

      if (i < 7){
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#FFFF00')
      .transition()
      .duration(time * (i * timeFactor)) 
      .attr('cx', 115 + (i * 20) + xShift)
      .attr('cy', 288)
     }
  }
};


function createPlasticPacific2018 (xShift) {
   makeBalls = Math.round(data[19].avg_measurement / 100);
   console.log(makeBalls);
   for (i = 1; i<=makeBalls; i++) { 
      let time = 1000;
      let timeFactor = 0.05;

      if (i < 7){
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#FFFF00')
      .transition()
      .duration(time * (i * timeFactor)) 
      .attr('cx', 115 + (i * 20) + xShift)
      .attr('cy', 288)
     }else if (i >= 7 && i <= 13) {
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#FFFF00')
      .transition()
      .duration(time * (i * timeFactor))
      .attr('cx', -13 + (i * 20) + xShift) 
      .attr('cy', 268)
     } else if (i > 13 && i <=21) {
      svg.append("circle")
      .attr('cx', 185)
      .attr('cy', -10)
      .attr('r', 10)
      .attr("id", "viz")
      .attr('stroke', 'black')
      .attr('fill', '#FFFF00')
      .transition()
      .duration(time * (i * timeFactor))
      .attr('cx', -165 + (i * 20) + xShift) 
      .attr('cy', 248)
     }
  }
};


// create 2019 cirklerne

    function createPlasticIndia2019 (xShift) {
      makeBalls = Math.round(data[22].avg_measurement / 100);
      console.log(makeBalls);

      for (i = 1; i<=makeBalls; i++) { 
       let time = 1000;
       let timeFactor = 0.05;

       if (i < 7){
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor)) 
       .attr('cx', 115 + (i * 20) + xShift)
       .attr('cy', 288)
      } else if (i >= 7 && i <= 13) {
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor))
       .attr('cx', -13 + (i * 20) + xShift) 
       .attr('cy', 268)
      } else if (i > 13 && i <=21) {
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor))
       .attr('cx', -165 + (i * 20) + xShift) 
       .attr('cy', 248)
      } else if (i > 21 && i <= 30) {
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor))
       .attr('cx', -335 + (i * 20) + xShift) 
       .attr('cy', 228)
      } else if (i > 30 && i <= 40) {
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor))
       .attr('cx', -528 + (i * 20) + xShift) 
       .attr('cy', 208)
      } else if (i > 40 && i <=51) {
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor))
       .attr('cx', -735 + (i * 20) + xShift) 
       .attr('cy', 188)
      }

  }};


    function createPlasticArc2019 (xShift) {
      makeBalls = Math.round(data[20].avg_measurement / 0.10);
      console.log(makeBalls);

      for (i = 1; i<=makeBalls; i++) { 
       let time = 1000;
       let timeFactor = 0.05;
       let r = 5
       let d = r * 2

       if (i < 7){
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', r)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#dfe3eb')
       .transition()
       .duration(time * (i * timeFactor)) 
       .attr('cx', 115 + (i * d) + xShift)
       .attr('cy', 293)
      }

  }};



    function createPlasticAtla2019 (xShift) {
        makeBalls = Math.round(data[21].avg_measurement / 500);
        console.log(makeBalls);

        for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
 
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        } else if (i >= 7 && i <= 13) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -13 + (i * 20) + xShift) 
         .attr('cy', 268)
        } else if (i > 13 && i <=21) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -165 + (i * 20) + xShift) 
         .attr('cy', 248)
        } else if (i > 21 && i <= 30) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -335 + (i * 20) + xShift) 
         .attr('cy', 228)
        }

    }};


    function createPlasticPacific2019 (xShift) {
        makeBalls = Math.round(data[23].avg_measurement / 500);
        console.log(makeBalls);
        let time = 1000;
        let timeFactor = 0.05;

        for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
 
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        } else if (i >= 7 && i <= 13) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -13 + (i * 20) + xShift) 
         .attr('cy', 268)
        } else if (i > 13 && i <=21) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -165 + (i * 20) + xShift) 
         .attr('cy', 248)
        } else if (i > 21 && i <= 30) {
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FF0000')
         .transition()
         .duration(time * (i * timeFactor))
         .attr('cx', -335 + (i * 20) + xShift) 
         .attr('cy', 228)
        }
        }
    }


// create 2020 cirklerne

    function createPlasticAtla2020 (xShift) {
      makeBalls = Math.round(data[25].avg_measurement / 0.1);
        console.log(makeBalls);

        for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
 
         let r = 5
         let d = r * 2
  
         if (i < 12){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', r)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#dfe3eb')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * d) + xShift)
         .attr('cy', 293)
        }
    }};

    function createPlasticIndia2020 (xShift) {
      makeBalls = Math.round(data[26].avg_measurement / 100);
      console.log(makeBalls);

      for (i = 1; i<=makeBalls; i++) { 
       let time = 1000;
       let timeFactor = 0.05;

       if (i < 7){
       svg.append("circle")
       .attr('cx', 185)
       .attr('cy', -10)
       .attr('r', 10)
       .attr("id", "viz")
       .attr('stroke', 'black')
       .attr('fill', '#FFFF00')
       .transition()
       .duration(time * (i * timeFactor)) 
       .attr('cx', 115 + (i * 20) + xShift)
       .attr('cy', 288)
      }
    }};

    function createPlasticPacific2020 (xShift) {
      makeBalls = Math.round(data[27].avg_measurement / 100);
        console.log(makeBalls);

        for (i = 1; i<=makeBalls; i++) { 
         let time = 1000;
         let timeFactor = 0.05;
 
         if (i < 7){
         svg.append("circle")
         .attr('cx', 185)
         .attr('cy', -10)
         .attr('r', 10)
         .attr("id", "viz")
         .attr('stroke', 'black')
         .attr('fill', '#FFFF00')
         .transition()
         .duration(time * (i * timeFactor)) 
         .attr('cx', 115 + (i * 20) + xShift)
         .attr('cy', 288)
        }
    }};









// Tilføjer en 'eventListener' til knappen, som gør at når den bliver klikket kører den funktionen
// else if attachEvent gør, at ældre browsere såsom Internet Explorer 8 og ældre
// attachEvent er mere eller mindre ubrugelig for vores projekt

const btn14 = document.getElementById("2014btn");
if (btn14.addEventListener)
    btn14.addEventListener("click", show2014, false);
else if(btn14.attachEvent)
    btn14.attachEvent("onclick", show2014);


const btn15 = document.getElementById("2015btn");
if (btn15.addEventListener)
    btn15.addEventListener("click", show2015, false);
else if(btn15.attachEvent)
    btn15.attachEvent("onclick", show2015);


const btn16 = document.getElementById("2016btn");
if (btn16.addEventListener)
    btn16.addEventListener("click", show2016, false);
else if(btn16.attachEvent)
    btn16.attachEvent("onclick", show2016);


const btn17 = document.getElementById("2017btn");
if (btn17.addEventListener)
    btn17.addEventListener("click", show2017, false);
else if(btn17.attachEvent)
    btn17.attachEvent("onclick", show2017);


const btn18 = document.getElementById("2018btn");
if (btn18.addEventListener)
    btn18.addEventListener("click", show2018, false);
else if(btn18.attachEvent)
    btn18.attachEvent("onclick", show2018);


const btn19 = document.getElementById("2019btn");
if (btn19.addEventListener)
    btn19.addEventListener("click", show2019, false);
else if(btn19.attachEvent)
    btn19.attachEvent("onclick", show2019);


const btn20 = document.getElementById("2020btn");
if (btn20.addEventListener)
    btn20.addEventListener("click", show2020, false);
else if(btn20.attachEvent)
    btn20.attachEvent("onclick", show2020);


})