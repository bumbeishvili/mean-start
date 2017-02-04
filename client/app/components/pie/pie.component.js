"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var d3 = require("../../../../node_modules/d3/build/d3.js");
var task_services_1 = require('../../services/task.services');
var PieComponent = (function () {
    function PieComponent(elementRef, renderer, taskService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.taskService = taskService;
        this.chart = this.pieChart()
            .width(300)
            .height(300);
    }
    PieComponent.prototype.ngOnInit = function () {
        var _this = this;
        d3.select(this.elementRef.nativeElement)
            .select("#pieChartContainer")
            .call(this.chart);
        this.taskService.tasksUpdated.subscribe(function (updatedTasks) {
            var doneTasks = updatedTasks.filter(function (t) { return t.isDone; });
            var newData = [{
                    name: "Done",
                    value: doneTasks.length
                }, {
                    name: "Not Done",
                    value: updatedTasks.length - doneTasks.length
                }];
            _this.chart.data(newData);
        });
    };
    PieComponent.prototype.pieChart = function () {
        // exposed variables
        var attrs = {
            width: null,
            height: null,
            chartWidth: null,
            chartHeight: null,
            margin: { top: 40, left: 0, bottom: 40, right: 0 },
            data: [{ name: "Done", value: 0 }, { name: "Not Done", value: 2 }]
        };
        //innerFunctions
        var updateData;
        //main chart object
        var chart = function (selection) {
            selection.each(function () {
                //calculated properties
                var calc = {};
                calc.chartWidth = attrs.width - (attrs.margin.left + attrs.margin.right);
                calc.chartHeight = attrs.height - (attrs.margin.top + attrs.margin.bottom);
                calc.chartInnerRadius = calc.chartHeight / 4;
                calc.chartOuterRadius = calc.chartHeight / 2;
                calc.chartHorizontalCenter = calc.chartWidth / 2;
                calc.chartVerticalCenter = calc.chartHeight / 2;
                calc.centerPointCoordinates = [calc.chartHorizontalCenter, calc.chartVerticalCenter];
                var arc = d3.arc()
                    .padAngle(0.03)
                    .cornerRadius(8)
                    .outerRadius(calc.chartOuterRadius)
                    .innerRadius(calc.chartInnerRadius);
                var pie = d3.pie()
                    .sort(null)
                    .value(function (d) { return d.value; });
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
                    .attr("transform", "translate(" + [attrs.margin.left, attrs.margin.top] + ")");
                var pieG = chartLayer.selectAll("g")
                    .data([attrs.data])
                    .enter()
                    .append("g")
                    .attr("transform", "translate(" + calc.centerPointCoordinates + ")");
                var block = pieG.selectAll(".arc")
                    .data(arcs);
                var newBlock = block.enter()
                    .append("g")
                    .classed("arc", true);
                newBlock.append("path")
                    .attr("d", arc)
                    .attr("id", function (d, i) { return "arc-" + i; })
                    .attr("stroke", "gray")
                    .attr("fill", function (d, i) { return d3.interpolateCool(Math.random()); })
                    .each(function (d) { this._current = d; });
                newBlock.append("text")
                    .attr("dx", 55)
                    .attr("dy", -5)
                    .append("textPath")
                    .attr("xlink:href", function (d, i) { return "#arc-" + i; })
                    .text(function (d) { console.log(d); return d.data.name; });
                // smoothly handle data updating
                updateData = function () {
                    svg.selectAll('.arc')
                        .data(pie(attrs.data))
                        .select('path')
                        .transition()
                        .duration(700)
                        .attrTween('d', arcTween);
                };
                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function (t) {
                        var result = arc(i(t));
                        console.log(result);
                        return result;
                    };
                }
            });
        };
        //exposed variables funcs
        chart.data = function (value) {
            if (!arguments.length)
                return attrs.data;
            attrs.data = value;
            if (typeof updateData === 'function') {
                updateData();
            }
            return chart;
        };
        chart.width = function (value) {
            if (!arguments.length)
                return attrs.width;
            attrs.width = value;
            return chart;
        };
        chart.height = function (value) {
            if (!arguments.length)
                return attrs.height;
            attrs.height = value;
            return chart;
        };
        return chart;
    };
    ;
    PieComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pie',
            templateUrl: 'pie.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, task_services_1.TaskService])
    ], PieComponent);
    return PieComponent;
}());
exports.PieComponent = PieComponent;
//# sourceMappingURL=pie.component.js.map