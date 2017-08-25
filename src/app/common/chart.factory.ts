import { Injectable } from '@angular/core';
import * as Chartist from 'chartist';

@Injectable()
export class ChartsFactory {

    public dashboardCardChartOptions: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        chartPadding: { top: 18, right: 0, bottom: 0, left: 0 }
    };

    constructor() { }

    public getPolarAreaDefaults(labels, data) {
        var colors = [];
        for (var i = 0; i < data.length; i++) {
            colors.push(this.getPolarAreaColors(i));
        }

        return {
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        };
    }

    public getChartDefaults(labels, dataSetsLabels, data, type, fill?, stacked?) {
        var datasets = [];
        for (var i = 0; i < data.length; i++) {
            let chartColors = this.getChartColors(i);
            var dataSet = {
                label: dataSetsLabels[i],
                data: data[i],
                backgroundColor: (type === 'line') || (type === 'radar') ? [chartColors.backgroundColor] : chartColors.borderColor,
                borderColor: chartColors.borderColor,
                pointBackgroundColor: chartColors.borderColor,
                fill: (fill != null) ? fill : true
            };
            datasets.push(dataSet);
        }

        var graph: any = {
            type,
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        };

        if (stacked) {
            graph.options.scales = {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            };
        }

        return graph;
    }

    public getChartColors(i) {
        var chartColors = { backgroundColor: '', borderColor: '' };
        switch (i) {
            case 0:
                chartColors.backgroundColor = "rgba(0, 188, 212,0.2)";
                chartColors.borderColor = "rgba(0, 188, 212,0.8)";
                break;
            case 1:
                chartColors.backgroundColor = "rgba(76, 175, 80,0.2)";
                chartColors.borderColor = "rgba(76, 175, 80,0.8)";
                break;
            case 2:
                chartColors.backgroundColor = "rgba(247,70,74,0.2)";
                chartColors.borderColor = "rgba(247,70,74,0.8)";
                break;
            case 3:
                chartColors.backgroundColor = "rgba(255, 152, 0,0.2)";
                chartColors.borderColor = "rgba(255, 152, 0,0.8)";
                break;
            case 4:
                chartColors.backgroundColor = "rgba(138, 43, 226, 0.2)";
                chartColors.borderColor = "rgba(138, 43, 226, 0.8)";
                break;
            default:
                chartColors.backgroundColor = "rgba(220,220,220,0.2)";
                chartColors.borderColor = "rgba(220,220,220,0.8)";
                break;
        }
        return chartColors;
    }

    private getPolarAreaColors(i) {
        switch (i) {
            case 0:
                return "rgba(0, 188, 212,0.6)";
            case 1:
                return "rgba(76, 175, 80,0.6)";
            case 2:
                return "rgba(247,70,74,0.6)";
            case 3:
                return "rgba(255, 152, 0,0.6)";
            default:
                return "rgba(220,220,220,0.6)";
        }
    }

    public startAnimationForLineChart(chart) {
        var seq, delays, durations;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data) {

            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    }

    public startAnimationForBarChart(chart) {
        var seq2, delays2, durations2;
        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    }

}