import { select, selectAll } from "d3-selection";
import { max } from "d3-array";
import { forceSimulation, forceY, forceCollide } from "d3-force";
import { colorScale, getRadius } from "./scales";

export const drawBeeswarm = (nodes) => {

  // Dimensions
  const width = 1140;
  const height = 400;


  // Append a SVG container
  const svg = select("#beeswarm")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
      .attr("transform", `translate(${width/2}, ${height/2})`);


  // Append nodes
  const maxLines = max(nodes, d => d.totalLinesNumber)
  svg
    .selectAll(".beeswarm-circle")
    .data(nodes)
    .join("circle")
      .attr("class", "beeswarm-circle")
      .attr("r", d => {
        d["radius"] = getRadius(maxLines, d.totalLinesNumber);
        return d.radius;
      })
      .attr("fill", d => colorScale(d.house))
      .attr("stroke", "#FAFBFF")
      .attr("stroke-width", 1);

  
  // Function called after each tick to set the nodes' position
  const updateNetwork = () => {
    selectAll(".beeswarm-circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  };


  // Run the simulation
  forceSimulation()
    .force("y", forceY(0) )
    .force("collide", forceCollide().radius(d => d.radius + 2) )
    .nodes(nodes)
    .on("tick", updateNetwork);


};