$(document).ready(function () {
    var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 99.0, "minX": 1.72283904E12, "maxY": 1033.0, "series": [{"data": [[1.72283916E12, 544.0], [1.72283904E12, 1033.0], [1.7228391E12, 523.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.72283916E12, 99.0], [1.72283904E12, 124.0], [1.7228391E12, 133.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.72283916E12, 515.5000000000001], [1.72283904E12, 277.5], [1.7228391E12, 353.70000000000016]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.72283916E12, 544.0], [1.72283904E12, 1033.0], [1.7228391E12, 523.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.72283916E12, 236.0], [1.72283904E12, 250.5], [1.7228391E12, 252.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.72283916E12, 544.0], [1.72283904E12, 844.5], [1.7228391E12, 514.9499999999999]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72283916E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
    getOptions: function () {
        return {
            chart: {
                animations:{
                    enabled:false
                },
                type: 'line',
                height: 500,
                zoom: {
                    type: 'xy',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    show: true
                }
            },
            series: this.data.result.series.map(series => ({
                name: series.label,
                data: series.data.map(point => ({
                    x: new Date(point[0]),
                    y: point[1].toFixed(0)
                }))
            })),
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false,
                    formatter: function (value) {
                        return new Date(value).toLocaleTimeString();
                    }
                },
                title: {
                    text: this.getElapsedTimeLabel(this.data.result.granularity),
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, Arial',
                        padding: 20
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Response Time in ms',
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Verdana, Arial',
                        padding: 20
                    }
                }
            },
            stroke: {
                        curve: 'smooth',
                        width: 2
                    },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
            },
            tooltip: {
                x: {
                    show: true,
                    formatter: function (value) {
                        return new Date(value).toLocaleString();
                    }
                },
                y: {
                    formatter: function (value) {
                        return value + ' ms';
                    }
                }
            }
        };
    },
    createGraph: function () {
        var options = this.getOptions();
        var chart = new ApexCharts(document.querySelector("#flotResponseTimePercentilesOverTime"), options);
        chart.render();
    },
    getTimeFormat: function (granularity) {
        // Implement the time format logic based on granularity
        return 'HH:mm:ss'; // Example time format
    },
    getElapsedTimeLabel: function (granularity) {
        // Implement the label logic based on granularity
        return 'Elapsed Time'; // Example label
    }
        };

// Function to refresh the response time percentiles chart
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if (fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
}
infos.createGraph();
        }

// Call the refresh function to initialize the chart
refreshResponseTimePercentilesOverTime(false);
})