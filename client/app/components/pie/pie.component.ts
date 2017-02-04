import { Renderer, Component, ElementRef } from '@angular/core';
import * as d3 from "../../../../node_modules/d3/build/d3.js";
import { TaskService } from '../../services/task.services';
import { Task } from '../../../Task';

interface IChart {
  (): any,
  data: (value: any[]) => any,
  width: (value: number) => any,
  height: (value: number) => any,
}


@Component({
  moduleId: module.id,
  selector: 'pie',
  templateUrl: 'pie.component.html'
})


export class PieComponent {
  chart: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer, private taskService: TaskService) {
    this.chart = this.pieChart()
      .width(300)
      .height(300);
  }



  ngOnInit() {

    d3.select(this.elementRef.nativeElement)
      .select("#pieChartContainer")
      .call(this.chart);

    this.taskService.tasksUpdated.subscribe((updatedTasks: Task[]) => {
      var doneTasks = updatedTasks.filter((t: Task) => t.isDone);

      var newData = [{
        name: "Done",
        value: doneTasks.length
      }, {
        name: "Not Done",
        value: updatedTasks.length - doneTasks.length
      }];

      this.chart.data(newData);
    });
  }

  pieChart() {
    // exposed variables
    var attrs: any = {
      width: null,
      height: null,
      chartWidth: null,
      chartHeight: null,
      margin: { top: 40, left: 0, bottom: 40, right: 0 },
      data: [{ name: "Done", value: 0 }, { name: "Not Done", value: 2 }]
    };


    //innerFunctions
    var updateData: any;


    //main chart object
    var chart = <IChart>function (selection: any) {
      selection.each(function () {

        //calculated properties
        var calc: any = {}
        calc.chartWidth = attrs.width - (attrs.margin.left + attrs.margin.right)
        calc.chartHeight = attrs.height - (attrs.margin.top + attrs.margin.bottom)
        calc.chartInnerRadius = calc.chartHeight / 4;
        calc.chartOuterRadius = calc.chartHeight / 2;
        calc.chartHorizontalCenter = calc.chartWidth / 2;
        calc.chartVerticalCenter = calc.chartHeight / 2;
        calc.centerPointCoordinates = [calc.chartHorizontalCenter, calc.chartVerticalCenter];



        var arc = d3.arc()
          .padAngle(0.03)
          .cornerRadius(8)
          .outerRadius(calc.chartOuterRadius)
          .innerRadius(calc.chartInnerRadius)


        var pie = d3.pie()
          .sort(null)
          .value(function (d) { return d.value; })

        var arcs = pie(attrs.data);

        //drawing
        var svg = d3.select(this)
          .append("svg")
          .attr("width", attrs.width)
          .attr("height", attrs.height);


        var chartLayer = svg.append("g")
          .classed("chartLayer", true)
          .attr("width", calc.chartWidth)
          .attr("height", calc.chartHeight)
          .attr("transform", "translate(" + [attrs.margin.left, attrs.margin.top] + ")")



        var pieG = chartLayer.selectAll("g")
          .data([attrs.data])
          .enter()
          .append("g")
          .attr("transform", "translate(" + calc.centerPointCoordinates + ")")

        var block = pieG.selectAll(".arc")
          .data(arcs)

        var newBlock = block.enter()
          .append("g")
          .classed("arc", true)


        newBlock.append("path")
          .attr("d", arc)
          .attr("id", function (d, i) { return "arc-" + i })
          .attr("stroke", "gray")
          .attr("fill", function (d, i) { return d3.interpolateCool(Math.random()) })
          .each(function (d) { this._current = d; });


        newBlock.append("text")
          .attr("dx", 55)
          .attr("dy", -5)
          .append("textPath")
          .attr("xlink:href", function (d, i) { return "#arc-" + i; })
          .text(function (d: any) { console.log(d); return d.data.name })


        // smoothly handle data updating
        updateData = function () {
          svg.selectAll('.arc')
            .data(pie(attrs.data))
            .select('path')
            .transition()
            .duration(700)
            .attrTween('d', arcTween)

        }


        function arcTween(a: any) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function (t: any) {
            var result = arc(i(t));
            console.log(result);
            return result;
          };
        }


      });
    }


    //exposed variables funcs
    chart.data = function (value: any[]) {
      if (!arguments.length) return attrs.data;
      attrs.data = value;
      if (typeof updateData === 'function') {
        updateData();
      }
      return chart;
    }

    chart.width = function (value: number) {
      if (!arguments.length) return attrs.width;
      attrs.width = value;
      return chart;
    }

    chart.height = function (value: number) {
      if (!arguments.length) return attrs.height;
      attrs.height = value;
      return chart;
    }


    return chart;
  };


}




