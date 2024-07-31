$(document).ready(function () {
    var threads = {"result": {"minY": 2.8888888888888884, "minX": 1.72241052E12, "maxY": 3.0, "series": [{"data": [[1.72241058E12, 3.0], [1.72241064E12, 2.9620253164556964], [1.72241052E12, 2.8888888888888884]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72241064E12, "title": "Active Threads Over Time"}};
    console.log(threads);
var activeThreadsOverTimeInfos = {
    data: {"result": {"minY": 2.8888888888888884, "minX": 1.72241052E12, "maxY": 3.0, "series": [{"data": [[1.72241058E12, 3.0], [1.72241064E12, 2.9620253164556964], [1.72241052E12, 2.8888888888888884]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72241064E12, "title": "Active Threads Over Time"}},
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