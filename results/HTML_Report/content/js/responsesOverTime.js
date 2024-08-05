var generateTransaction = {
    data: {"result": {"minY": 202.25, "minX": 1.72283904E12, "maxY": 338.75, "series": [{"data": [[1.72283916E12, 338.6666666666667], [1.72283904E12, 338.75], [1.7228391E12, 294.0]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[1.72283916E12, 243.33333333333334], [1.72283904E12, 205.5], [1.7228391E12, 222.88888888888886]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.72283916E12, 202.25], [1.72283904E12, 252.12499999999997], [1.7228391E12, 281.375]], "isOverall": false, "label": "Cart", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72283916E12, "title": "Response Time Over Time"}},
    getOptions: function () {
        // Filter the series data based on isController property
        var filteredSeries = this.data.result.series
            .filter(series => series.isController)
            .map(series => ({
                name: series.label,
                data: series.data.map(point => ({
                    x: new Date(point[0]),
                    y: (point[1]).toFixed(0)
                }))
            }));

        return {
            colors: constantColor,
            chart: {
                animations: {
                    enabled: false
                },
                type: 'line',
                height: 650,
                zoom: {
                    type: 'xy',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    show: true
                }
            },
            series: filteredSeries,
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
                    text: 'Average response time in ms',
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
            tooltip: {
                x: {
                    show: true,
                    formatter: function (value) {
                        return new Date(value).toLocaleString();
                    }
                },
                y:{
                    show: true,
                    formatter: function (value) {
                        return value + " ms"
                    }
                }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                floating: false,
            }
        };
    },
    createGraph: function () {
        var options = this.getOptions();
        var chart = new ApexCharts(document.querySelector("#flotResponseTimesOverTime"), options);
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
// Function to refresh the response time chart
function generateTransactionChart(fixTimestamps) {
    var infos = generateTransaction;
    prepareSeries(infos.data);
    if (infos.data.result.series.length === 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if (fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
}
            else {
    infos.createGraph();
}
        };

$(document).ready(function () {
    var responseTimesOverTime = {"result": {"minY": 202.25, "minX": 1.72283904E12, "maxY": 338.75, "series": [{"data": [[1.72283916E12, 338.6666666666667], [1.72283904E12, 338.75], [1.7228391E12, 294.0]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[1.72283916E12, 243.33333333333334], [1.72283904E12, 205.5], [1.7228391E12, 222.88888888888886]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.72283916E12, 202.25], [1.72283904E12, 252.12499999999997], [1.7228391E12, 281.375]], "isOverall": false, "label": "Cart", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72283916E12, "title": "Response Time Over Time"}};
console.log(responseTimesOverTime);
var responseTimesOverTimeInfos = {
    data: responseTimesOverTime,
    getOptions: function () {
        return {
            colors:constantColor,
            chart: {
                animations: {
                    enabled:false
                },
                type: 'line',
                height: 650,
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
                    y: (point[1]).toFixed(0)
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
                    text: 'Average response time in ms',
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
            tooltip: {
                x: {
                    show: true,
                    formatter: function (value) {
                        return new Date(value).toLocaleString();
                    }
                },
                y:{
                    show: true,
                    formatter: function (value) {
                        return value + " ms"
                    }
                }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                floating: false,
            }
        };
    },
    createGraph: function () {
        var options = this.getOptions();
        var chart = new ApexCharts(document.querySelector("#flotResponseTimesOverTime"), options);
        chart.render();
        chartInstances["flotResponseTimesOverTime"] = chart;
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

// Function to refresh the response time chart
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if (infos.data.result.series.length === 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if (fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
}
            else {
    infos.createGraph();
}
        }


refreshResponseTimeOverTime(false);

$('#flexCheckChecked').change(function() {
    let el = document.getElementById('flotResponseTimesOverTime');
    el.textContent="";
        if($(this).is(":checked")){
           generateTransactionChart(false);
        }
        else {
            refreshResponseTimeOverTime(false);
        }
    });
})

