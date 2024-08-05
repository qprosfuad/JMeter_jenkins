$(document).ready(function(){
    var transactionsPerSecondInfos = {
            data: {"result": {"minY": 0.05, "minX": 1.72283904E12, "maxY": 0.15, "series": [{"data": [[1.72283916E12, 0.05], [1.72283904E12, 0.13333333333333333], [1.7228391E12, 0.15]], "isOverall": false, "label": "Landing_Page-success", "isController": false}, {"data": [[1.72283916E12, 0.06666666666666667], [1.72283904E12, 0.13333333333333333], [1.7228391E12, 0.13333333333333333]], "isOverall": false, "label": "Cart-success", "isController": false}, {"data": [[1.72283916E12, 0.05], [1.72283904E12, 0.13333333333333333], [1.7228391E12, 0.15]], "isOverall": false, "label": "Home-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.72283916E12, "title": "Transactions Per Second"}},
            getOptions: function() {
                return {
                    colors:constantColor,
                    chart: {
                        animations:{
                            enabled:false
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
                            text: 'Number of transactions / sec',
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
                        container: '#legendTransactionsPerSecond'
                    },
                    grid: {
                        hoverable: true
                    },
                    stroke: {
                        show: true,
                        curve: 'smooth',
                        width: 2,
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
                                return value + ' transactions/sec';
                            }
                        }
                    }
                };
            },
            createGraph: function() {
                var options = this.getOptions();
                var chart = new ApexCharts(document.querySelector("#flotTransactionsPerSecond"), options);
                chart.render();
            },
            getElapsedTimeLabel: function(granularity) {
                // Implement the label logic based on granularity
                return 'Elapsed Time'; // Example label
            }
        };

        // Function to refresh the transactions per second chart
        function refreshTransactionsPerSecond(fixTimestamps) {
            var infos = transactionsPerSecondInfos;
            prepareSeries(infos.data);
            if (fixTimestamps) {
                fixTimeStamps(infos.data.result.series, 10800000);
            }
            infos.createGraph();
        }

        // Call the refresh function to initialize the chart
        refreshTransactionsPerSecond(false);
})