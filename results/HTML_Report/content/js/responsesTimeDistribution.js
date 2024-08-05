$(document).ready(function(){
    var responseTimeDistributionData = {"result": {"minY": 1.0, "minX": 0.0, "maxY": 18.0, "series": [{"data": [[200.0, 16.0], [100.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[200.0, 15.0], [100.0, 5.0]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[0.0, 1.0], [200.0, 18.0], [500.0, 1.0]], "isOverall": false, "label": "Cart", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}};

// Create a function to generate the options for the chart
function getResponseTimeDistributionOptions(data) {
    return {
        chart: {
            type: 'bar',
            height: 500,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '70%', // Increase bar height to make them thicker
                columnWidth: '70%', // Increase column width to make them thicker
                endingShape: 'flat'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data.result.series[0].data.map(d => d[0]), // Assumes all series have same x values
            title: {
                text: 'Response times in ms',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, Arial',
                    padding: {
                        left: 20
                    }
                }
            }
        },
        yaxis: {
            title: {
                text: 'Number of responses',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, Arial',
                    padding: {
                        top: 20
                    }
                }
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val + ' responses';
                }
            },
            x: {
                formatter: function (val) {
                    var granularity = data.result.granularity;
                    return 'Between ' + val + ' and ' + (val + granularity) + ' ms';
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            floating: false,
            offsetY: 0,
            offsetX: 0
        }
    };
}

// Create a function to prepare the series data for ApexCharts
function prepareSeriesData(seriesData) {
    return seriesData.map(serie => {
        return {
            name: serie.label,
            data: serie.data.map(d => d[1])
        };
    });
}

// Create a function to initialize the chart dynamically
function initResponseTimeDistributionChart(data) {
    var options = getResponseTimeDistributionOptions(data);
    var series = prepareSeriesData(data.result.series);
    options.series = series; // Add series data to options
    var chart = new ApexCharts(document.querySelector("#flotResponseTimeDistribution"), options);
    chart.render();
}

// Call the function to initialize the chart with the provided data
initResponseTimeDistributionChart(responseTimeDistributionData);
})