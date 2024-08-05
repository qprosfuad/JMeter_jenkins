$(document).ready(function () {
    var threads = {"result": {"minY": 1.0, "minX": 1.72283904E12, "maxY": 1.0, "series": [{"data": [[1.72283916E12, 1.0], [1.72283904E12, 1.0], [1.7228391E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72283916E12, "title": "Active Threads Over Time"}};
    console.log(threads);
var activeThreadsOverTimeInfos = {
    data: {"result": {"minY": 1.0, "minX": 1.72283904E12, "maxY": 1.0, "series": [{"data": [[1.72283916E12, 1.0], [1.72283904E12, 1.0], [1.7228391E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72283916E12, "title": "Active Threads Over Time"}},
getOptions: function() {
    return {
        colors:constantColor,
        chart: {
            type: 'line',
            height: 350,
            stacked: true,
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
                text: 'Number of active threads',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, Arial',
                    padding: 20
                }
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
        },
        grid: {
            hoverable: true
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
                    return value + ' threads';
                }
            }
        }
    };
},
createGraph: function() {
    var options = this.getOptions();
    var chart = new ApexCharts(document.querySelector("#flotActiveThreadsOverTime"), options);
    chart.render();
},
getTimeFormat: function(granularity) {
    // Implement the time format logic based on granularity
    return 'HH:mm:ss'; // Example time format
},
getElapsedTimeLabel: function(granularity) {
    // Implement the label logic based on granularity
    return 'Elapsed Time'; // Example label
}
        };

// Function to refresh the active threads over time chart
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if (fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
}
infos.createGraph();
        }

// Call the refresh function to initialize the chart
refreshActiveThreadsOverTime(false);
    });