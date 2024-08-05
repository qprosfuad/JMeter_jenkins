$(document).ready(function(){
    var timeVsThreadsData = {"result": {"minY": 219.00000000000003, "minX": 1.0, "maxY": 318.59999999999997, "series": [{"data": [[1.0, 318.59999999999997]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[1.0, 318.59999999999997]], "isOverall": false, "label": "Landing_Page-Aggregated", "isController": false}, {"data": [[1.0, 219.00000000000003]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.0, 219.00000000000003]], "isOverall": false, "label": "Home-Aggregated", "isController": false}, {"data": [[1.0, 253.85]], "isOverall": false, "label": "Cart", "isController": false}, {"data": [[1.0, 253.85]], "isOverall": false, "label": "Cart-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}};
console.log(timeVsThreadsData)
// Create a function to generate the options for the chart
function getTimeVsThreadsOptions() {
    return {
        chart: {
            type: 'line',
            height: 500,
            toolbar: {
                show: true
            }
        },
        series:  timeVsThreadsData.result.series.map(series => ({
                name: series.label,
                data: series.data.map(point => ({
                    x: point[0],
                    y: point[1]
                }))
            })),
        xaxis: {
            min:0,
            max:timeVsThreadsData.result.maxX,
            tickAmount:50,
            type: 'numeric',
            title: {
                text: 'Number of active threads',
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
                text: 'Average response times in ms',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, Arial',
                    padding: {
                        top: 20
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val.toFixed(0) + ' ms';
                }
            }
        }
    };
}

// Create a function to initialize the chart
function initTimeVsThreadsChart() {
    var options = getTimeVsThreadsOptions();
    var chart = new ApexCharts(document.querySelector("#flotTimesVsThreads"), options);
    chart.render();
}

// Call the function to initialize the chart
initTimeVsThreadsChart();
})