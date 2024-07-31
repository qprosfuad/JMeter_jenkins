$(document).ready(function(){
    var latenciesOverTimeInfos = {
            data: {"result": {"minY": 142.32142857142856, "minX": 1.72241052E12, "maxY": 543.0, "series": [{"data": [[1.72241058E12, 200.8928571428571], [1.72241064E12, 163.92000000000002], [1.72241052E12, 543.0]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[1.72241058E12, 165.85185185185185], [1.72241064E12, 173.40740740740742], [1.72241052E12, 194.66666666666666]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.72241058E12, 142.32142857142856], [1.72241064E12, 179.14814814814818], [1.72241052E12, 176.0]], "isOverall": false, "label": "Cart", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72241064E12, "title": "Latencies Over Time"}},
            getOptions: function() {
                return {
                    colors:constantColor,
                    chart: {
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
                            formatter: function(value) {
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
                            text: 'Average response latencies in ms',
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
                        container: '#legendLatenciesOverTime'
                    },
                    grid: {
                        hoverable: true
                    },
                    tooltip: {
                        x: {
                            show: true,
                            formatter: function(value) {
                                return new Date(value).toLocaleString();
                            }
                        },
                        y: {
                            formatter: function(value) {
                                return value + ' ms';
                            }
                        }
                    }
                };
            },
            createGraph: function() {
                var options = this.getOptions();
                var chart = new ApexCharts(document.querySelector("#flotLatenciesOverTime"), options);
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

        // Function to refresh the latencies over time chart
        function refreshLatenciesOverTime(fixTimestamps) {
            var infos = latenciesOverTimeInfos;
            prepareSeries(infos.data);
            if (infos.data.result.series.length == 0) {
                setEmptyGraph("#bodyLatenciesOverTime");
                return;
            }
            if (fixTimestamps) {
                fixTimeStamps(infos.data.result.series, 10800000);
            }
            infos.createGraph();
        }

        // Call the refresh function to initialize the chart
        refreshLatenciesOverTime(false);
})