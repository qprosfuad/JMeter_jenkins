$(document).ready(function () {
    let beginDate = "7/31/24, 10:22 AM";
let endDate = "7/31/24, 10:24 AM";
let splitStart = beginDate.split(", ");
console.log(splitStart);
let beginDate_str = splitStart[0];
let beginTime_str = splitStart[1];
let splitEnd = endDate.split(", ");
let endDate_str = splitEnd[0];
let endTime_str = splitEnd[1];
document.getElementById("startTime").innerText = beginTime_str;
document.getElementById("startDate").innerText = beginDate_str;
document.getElementById("endTime").innerText = endTime_str;
document.getElementById("endDate").innerText = endDate_str;


var dateParts = beginDate_str.split('/');
var bgDate = new Date('20' + dateParts[2], dateParts[0] - 1, dateParts[1]); // Assuming '20' prefix for years

// Parse the start time string into a Date object
var startTime_parts = beginTime_str.split(/:| /);
var startTime_hours = parseInt(startTime_parts[0], 10);
var startTime_minutes = parseInt(startTime_parts[1], 10);
if (startTime_parts[2] === 'PM' && startTime_hours !== 12) {
    startTime_hours += 12;
}
var startTime = new Date(bgDate.getFullYear(), bgDate.getMonth(), bgDate.getDate(), startTime_hours, startTime_minutes);

// Parse the end time string into a Date object
var endTime_parts = endTime_str.split(/:| /);
var endTime_hours = parseInt(endTime_parts[0], 10);
var endTime_minutes = parseInt(endTime_parts[1], 10);
if (endTime_parts[2] === 'PM' && endTime_hours !== 12) {
    endTime_hours += 12;
}
var endTime = new Date(bgDate.getFullYear(), bgDate.getMonth(), bgDate.getDate(), endTime_hours, endTime_minutes);

// Prepare data for the line chart
var chartData = [{
    x: startTime.getTime(),
    y: bgDate.getTime()
}, {
    x: endTime.getTime(),
    y: bgDate.getTime()
}];

var options = {
    colors: ["#e5554f"],
    chart: {
        toolbar:{
            show:false,
        },
        type: 'line',
        height: 350,
    },
    series: [{
        name: 'Time Range',
        data: chartData
    }],
    xaxis: {
        type: 'datetime',
        labels: {
            datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM',
                day: 'dd',
                hour: 'HH',
                minute: 'mm',
                second: 'ss',
            },
            formatter: function (val) {
                return new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        }
    },
    yaxis: {
        type: 'datetime',
        labels: {
            datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM',
                day: 'dd',
                hour: 'HH',
                minute: 'mm',
                second: 'ss',
            },
            formatter: function (val) {
                return new Date(val).toLocaleDateString();
            }
        },
        tickAmount: 3
    }
}

var chart = new ApexCharts(document.querySelector("#timeTaken"), options);
chart.render();

}) 