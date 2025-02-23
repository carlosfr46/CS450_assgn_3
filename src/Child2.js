import React, { Component } from "react"
import * as d3 from 'd3'

class Child2 extends Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  drawChart(){
    const { data2 } = this.props;
  
    const margin = { top: 60, right: 50, bottom: 70, left: 70 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(".child2_svg")
      .attr("width", width)
      .attr("height", height);

    const innerChart = svg.append("g")
      .attr("class", "inner_chart")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const groupedData = Array.from(
      d3.group(this.props.data2, d => d.day), 
      ([day, values]) => ({
        day: day,
        avgTip: d3.mean(values, d => +d.tip)
      })
    );

    const xScale = d3.scaleBand().domain(groupedData.map(d => d.day)).range([0, innerWidth]).padding(0.3);
    const yScale = d3.scaleLinear().domain([0, d3.max(groupedData, d => d.avgTip)]).range([innerHeight, 0]);


    innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale).tickFormat(d => `${d}`))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

  innerChart.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

  innerChart.selectAll(".bar")
    .data(groupedData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.day))
    .attr("y", d => yScale(d.avgTip))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.avgTip))
    .attr("fill", "steelblue");
  
    svg.append("text").attr("x", width/2).attr("y", margin.top/2).style("font-size", 16).style("font-weight", "bold").text("Average Tip by Day")
    svg.append("text").attr("x", width/2).attr("y", height -12).style("font-size", "14px").text("Day");
    svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", 20).style("font-size", "14px").text("Average Tip");

  }

  componentDidMount(){
    // console.log("child 2")
    // console.log(this.props.data2);
    this.drawChart();
  }

  componentDidUpdate(){
    this.drawChart();
  }

  render(){
    return(
        <svg className="child2_svg">
          <g className="inner_chart"></g>
        </svg>
    )
  }
}

export default Child2;