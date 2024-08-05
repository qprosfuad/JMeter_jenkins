$(document).ready(function(){
    var syntheticResponseTimeDistributionData = {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 57.0, "series": [{"data": [[0.0, 57.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 3.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}};
    console.log(syntheticResponseTimeDistributionData)
// Create a function to generate the options for the chart
function getSyntheticResponseTimeDistributionOptions() {
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
                columnWidth: '25%',
                endingShape: 'flat'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: syntheticResponseTimeDistributionData.result.ticks.map(tick=>{
                tick[1];
            }),
            title: {
                text: 'Response times ranges',
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
                    return val + " " + syntheticResponseTimeDistributionData.result.series.map(serie=>serie.label);
                }
            }
        }
    };
}

// Create a function to initialize the chart
function initSyntheticResponseTimeDistributionChart() {
    var options = getSyntheticResponseTimeDistributionOptions();
    var series = prepareData(syntheticResponseTimeDistributionData.result.series, $("#choicesSyntheticResponseTimeDistribution"));
    var chart = new ApexCharts(document.querySelector("#flotSyntheticResponseTimeDistribution"), options);
    chart.render(series);
}

// Call the function to initialize the chart
initSyntheticResponseTimeDistributionChart();
})