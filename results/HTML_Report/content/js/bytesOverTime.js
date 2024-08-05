$(document).ready(function() {
    var bytesThroughputOverTimeInfos = {
            data: {"result": {"minY": 145.58333333333334, "minX": 1.72283904E12, "maxY": 3808.9166666666665, "series": [{"data": [[1.72283916E12, 1161.3], [1.72283904E12, 3365.55], [1.7228391E12, 3808.9166666666665]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.72283916E12, 145.58333333333334], [1.72283904E12, 349.2], [1.7228391E12, 378.21666666666664]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.72283916E12, "title": "Bytes Throughput Over Time"}},
            getOptions: function() {
                return {
                    colors:["#E85450","#737373"],
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
                    dataLabels:{
                        enabled: false
                    },
                    series: this.data.result.series.map(series => ({
                        name: series.label,
                        data: series.data.map(point => ({
                            x: new Date(point[0]),
                            y: point[1]
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
                            text: 'Bytes / sec',
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
                        container: '#legendBytesThroughputOverTime'
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
                                return value;
                            }
                        }
                    }
                };
            },
            createGraph: function() {
                var options = this.getOptions();
                var chart = new ApexCharts(document.querySelector("#flotBytesThroughputOverTime"), options);
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

        // Function to refresh the bytes throughput over time chart
        function refreshBytesThroughputOverTime(fixTimestamps) {
            var infos = bytesThroughputOverTimeInfos;
            prepareSeries(infos.data);
            if (fixTimestamps) {
                fixTimeStamps(infos.data.result.series, 10800000);
            }
            infos.createGraph();
        }

        // Call the refresh function to initialize the chart
        refreshBytesThroughputOverTime(false);
})