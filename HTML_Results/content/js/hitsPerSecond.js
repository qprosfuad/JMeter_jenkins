$(document).ready(function(){
    var hitsPerSecondInfos = {
            data: {"result": {"minY": 0.3, "minX": 1.72241052E12, "maxY": 1.3833333333333333, "series": [{"data": [[1.72241058E12, 1.3833333333333333], [1.72241064E12, 1.3166666666666667], [1.72241052E12, 0.3]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72241064E12, "title": "Hits Per Second"}},
            getOptions: function() {
                return {
                    colors:["#E85450"],
                    chart: {
                        type: 'area',
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
                            y: point[1].toFixed(2) // Fixing to 2 decimal places
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
                            text: 'Number of hits / sec',
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Verdana, Arial',
                                padding: 20
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false
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
                                return new Date(value).toLocaleString();
                            }
                        },
                        y: {
                            formatter: function(value) {
                                return value + ' hits/sec';
                            }
                        }
                    }
                };
            },
            createGraph: function() {
                var options = this.getOptions();
                var chart = new ApexCharts(document.querySelector("#flotHitsPerSecond"), options);
                chart.render();
            },
            getElapsedTimeLabel: function(granularity) {
                // Implement the label logic based on granularity
                return 'Elapsed Time'; // Example label
            }
        };

        // Function to refresh the hits per second chart
        function refreshHitsPerSecond(fixTimestamps) {
            var infos = hitsPerSecondInfos;
            prepareSeries(infos.data);
            if (fixTimestamps) {
                fixTimeStamps(infos.data.result.series, 10800000);
            }
            infos.createGraph();
        }

        // Call the refresh function to initialize the chart
        refreshHitsPerSecond(false);
})