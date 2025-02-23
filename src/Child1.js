import React, { Component } from "react"
import * as d3 from 'd3'

class Child1 extends Component{
 /**
  * total bill v tips
  * 
  */
  constructor(props){
    super(props);
    this.state = {};
  }
  
  drawChart(){
    const margin = { top: 40, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('.child1_svg').attr("width", width).attr("height", height);

    const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const data = this.props.data1.map(d => ({
      x: +d["total_bill"],
      y: +d["tip"]
    }));

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([innerHeight, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll(".x-axis").data(data)
      .join("g").attr('class','x-axis')
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

      
    innerChart.selectAll(".y-axis").data(data)
      .join("g").attr('class','y-axis')
      .call(yAxis);

    innerChart.selectAll("circle").data(data).join("circle").attr("r", 5).attr("fill", "#69b3a2")
      .attr("cx", d => xScale(d.x)).attr("cy", d => yScale(d.y))

    d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");

    svg.append("text").attr("x", width/2).attr("y", margin.top/2).style("font-size", 16).style("font-weight", "bold").text("Total Bill vs Tips")
    svg.append("text").attr("x", width/2).attr("y", height -12).style("font-size", "14px").text("Total Bill");
    svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", 20).style("font-size", "14px").text("Tip");
  }

  componentDidMount(){
    const { data1 } = this.props;
    // console.log(this.props.data1)
    this.drawChart();
  }

  componentDidUpdate(){
   this.drawChart();
  }

  render(){
    // const { data1 } = this.props
    return(
        <svg className="child1_svg">
          <g className="inner_chart"></g>
        </svg>
    )
  }
}

export default Child1;