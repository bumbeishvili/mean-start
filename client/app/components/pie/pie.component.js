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
        this.renderer = renderer;
        this.taskService = taskService;
        this.dom = document.body;
        this.elementRef = elementRef;
    }
    PieComponent.prototype.ngOnInit = function () {
        this.chartInit();
    };
    PieComponent.prototype.ngOnDestroy = function () {
        this.renderer.setElementClass(this.dom, 'is-not-scrollable', false);
    };
    PieComponent.prototype.chartInit = function () {
        var _this = this;
        var width, height;
        var chartWidth, chartHeight;
        var margin;
        var svg = d3.select(this.elementRef.nativeElement).select("#pieChartContainer").append("svg");
        var chartLayer = svg.append("g").classed("chartLayer", true);
        this.taskService
            .getTasks()
            .subscribe(function (tasks) {
            console.log(tasks);
            _this.tasks = tasks;
            var doneTasks = tasks.filter(function (t) { return t.isDone; });
            console.log(tasks);
            main([{
                    name: "Done",
                    value: doneTasks.length
                },
                {
                    name: "Not Done",
                    value: tasks.length - doneTasks.length
                }]);
        });
        function cast(d) {
            d.value = +d.value;
            return d;
        }
        function main(data) {
            setSize(data);
            drawChart(data);
        }
        function setSize(data) {
            width = 300;
            height = 300;
            margin = { top: 40, left: 0, bottom: 40, right: 0 };
            chartWidth = width - (margin.left + margin.right);
            chartHeight = height - (margin.top + margin.bottom);
            svg.attr("width", width).attr("height", height);
            chartLayer
                .attr("width", chartWidth)
                .attr("height", chartHeight)
                .attr("transform", "translate(" + [margin.left, margin.top] + ")");
        }
        function drawChart(data) {
            //pieチャート用のデータセットを生成する
            var arcs = d3.pie()
                .sort(null)
                .value(function (d) { return d.value; })(data);
            var arc = d3.arc()
                .outerRadius(chartHeight / 2)
                .innerRadius(chartHeight / 4)
                .padAngle(0.03)
                .cornerRadius(8);
            var pieG = chartLayer.selectAll("g")
                .data([data])
                .enter()
                .append("g")
                .attr("transform", "translate(" + [chartWidth / 2, chartHeight / 2] + ")");
            var block = pieG.selectAll(".arc")
                .data(arcs);
            var newBlock = block.enter().append("g").classed("arc", true);
            newBlock.append("path")
                .attr("d", arc)
                .attr("id", function (d, i) { return "arc-" + i; })
                .attr("stroke", "gray")
                .attr("fill", function (d, i) { return d3.interpolateCool(Math.random()); });
            newBlock.append("text")
                .attr("dx", 55)
                .attr("dy", -5)
                .append("textPath")
                .attr("xlink:href", function (d, i) { return "#arc-" + i; })
                .text(function (d) { console.log(d); return d.data.name; });
        }
    };
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