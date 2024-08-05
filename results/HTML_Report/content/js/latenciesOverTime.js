$(document).ready(function(){
    var latenciesOverTimeInfos = {
            data: {"result": {"minY": 193.25, "minX": 1.72283904E12, "maxY": 322.875, "series": [{"data": [[1.72283916E12, 299.0], [1.72283904E12, 322.875], [1.7228391E12, 278.6666666666667]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[1.72283916E12, 239.33333333333334], [1.72283904E12, 201.875], [1.7228391E12, 213.88888888888889]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.72283916E12, 193.25], [1.72283904E12, 245.375], [1.7228391E12, 275.375]], "isOverall": false, "label": "Cart", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72283916E12, "title": "Latencies Over Time"}},
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