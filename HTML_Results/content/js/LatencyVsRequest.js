$(document).ready(function(){
    var latency = {"result": {"minY": 189.0, "minX": 1.0, "maxY": 191.0, "series": [{"data": [[1.0, 191.0], [2.0, 189.0], [3.0, 190.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Latencies Vs Request"}};
    console.log(latency);
     var latenciesVsRequestInfos = {
            data: {"result": {"minY": 189.0, "minX": 1.0, "maxY": 191.0, "series": [{"data": [[1.0, 191.0], [2.0, 189.0], [3.0, 190.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Latencies Vs Request"}},
            getOptions: function() {
                return {
                    chart: {
                        type: 'scatter',
                        height:500,
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
                            x: point[0],
                            y: point[1]
                        }))
                    })),
                    xaxis: {
                        min:0,
                        tickAmount: Math.ceil(this.data.result.maxX/50),
                        title: {
                            text: 'Global number of requests per second',
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Verdana, Arial',
                                padding: 20
                            }
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Median Latency in ms',
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
                            formatter: function(value) {
                                return value.toFixed(2) + ' req/s';
                            }
                        },
                        y: {
                            formatter: function(value) {
                                return value.toFixed(2) + ' ms';
                            }
                        }
                    },
                    colors: ["#9ACD32", "#FF6347"]
                };
            },
            createGraph: function() {
                var options = this.getOptions();
                var chart = new ApexCharts(document.querySelector("#flotLatenciesVsRequest"), options);
                chart.render();
            }
        };

        // Function to refresh the latencies vs request chart
        function refreshLatenciesVsRequest() {
            var infos = latenciesVsRequestInfos;
            prepareSeries(infos.data);
            infos.createGraph();
        }

        // Call the refresh function to initialize the chart
        refreshLatenciesVsRequest();
})