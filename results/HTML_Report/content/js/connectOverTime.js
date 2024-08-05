$(document).ready(function(){
    var connectTimeOverTimeInfos = {
            data: {"result": {"minY": 0.0, "minX": 1.72283904E12, "maxY": 93.49999999999999, "series": [{"data": [[1.72283916E12, 72.0], [1.72283904E12, 93.49999999999999], [1.7228391E12, 27.222222222222214]], "isOverall": false, "label": "Landing_Page", "isController": false}, {"data": [[1.72283916E12, 0.0], [1.72283904E12, 0.0], [1.7228391E12, 0.0]], "isOverall": false, "label": "Home", "isController": false}, {"data": [[1.72283916E12, 0.0], [1.72283904E12, 0.0], [1.7228391E12, 0.0]], "isOverall": false, "label": "Cart", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72283916E12, "title": "Connect Time Over Time"}},
            getOptions: function() {
                return {
                    colors:dynamicColors,
                    chart: {
                        animations:{
                            enabled:false,
                        },
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
                            text: this.getConnectTimeLabel(this.data.result.granularity),
                            style: {
                                fontSize: '12px',
                                fontFamily: 'Verdana, Arial',
                                padding: 20
                            }
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Average Connect Time in ms',
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
                        container: '#legendConnectTimeOverTime'
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
                var chart = new ApexCharts(document.querySelector("#flotConnectTimeOverTime"), options);
                chart.render();
            },
            getConnectTimeLabel: function(granularity) {
                // Implement the label logic based on granularity
                return 'Connect Time'; // Example label
            }
        };

        // Function to refresh the connect time over time chart
        function refreshConnectTimeOverTime(fixTimestamps) {
            var infos = connectTimeOverTimeInfos;
            prepareSeries(infos.data);
            if (infos.data.result.series.length == 0) {
                setEmptyGraph("#bodyConnectTimeOverTime");
                return;
            }
            if (fixTimestamps) {
                fixTimeStamps(infos.data.result.series, 10800000);
            }
            infos.createGraph();
        }

        // Call the refresh function to initialize the chart
        refreshConnectTimeOverTime(false);
})