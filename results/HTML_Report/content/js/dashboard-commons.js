/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var DAY_MS   = 86400000;
var HOUR_MS  =  3600000;
var MINUTE_MS  =    60000;

/**
 * From https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 * Licensed under https://creativecommons.org/licenses/by-sa/2.5/
 */
// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

/*
 * Suffixes the specified value with a unit
 * The spaced argument defines whether a space character is introduced.
 */
function formatUnit(value, unit, spaced){
    return spaced ? value + " " + unit : value + unit;
}

/*
 * Gets a string representing the specified duration in milliseconds.
 * 
 * E.g : duration = 20000100, returns "45 min 20 sec 100 ms"
 */
function formatDuration(duration, spaced) {
    var type = $.type(duration);
    if (type === "string")
        return duration;

    // Calculate each part of the string
    var days = Math.floor(duration / 86400000); // 1000 * 60 * 60 * 24 = 1 day
    duration %= 8640000;

    var hours = Math.floor(duration / 3600000); // 1000 * 60 *60 = 1 hour
    duration %= 3600000;

    var minutes = Math.floor(duration / 60000); // 1000 * 60 = 1 minute
    duration %= 60000;

    var seconds = Math.floor(duration / 1000); // 1 second
    duration %= 1000;

    // Add non zero part.
    var formatArray = [];
    if (days > 0)
        formatArray.push(formatUnit(days, " day(s)", spaced));

    if (hours > 0)
        formatArray.push(formatUnit(hours, " hour(s)", spaced));

    if (minutes > 0)
        formatArray.push(formatUnit(minutes," min", spaced));

    if (seconds > 0)
        formatArray.push(formatUnit(seconds, " sec", spaced));

    if (duration > 0)
        formatArray.push(formatUnit(duration, " ms", spaced));

    // Build the string
    return formatArray.join(" ");
}

/*
 * Gets axis label for the specified granularity
 */
function getElapsedTimeLabel(granularity) {
    return "Elapsed Time (granularity: " + formatDuration(granularity) + ")";
}

/*
 * Gets time format based on granularity
 */
function getTimeFormat(granularity) {
    if (granularity >= DAY_MS) {
        return "%y/%m/%d"; 
    } else if (granularity >= HOUR_MS) {
        return "%m/%d %H"; 
    } else if (granularity >= MINUTE_MS) {
        return "%d %H:%M";
    } else {
        return "%H:%M:%S";
    }
}

/*
 * Gets axis label for the specified granularity
 */
function getConnectTimeLabel(granularity) {
    return "Connect Time (granularity: " + formatDuration(granularity) + ")";
}

//Get the property value of an object using the specified key
//Returns the property value if all properties in the key exist; undefined
//otherwise.
function getProperty(key, obj) {
    return key.split('.').reduce(function(prop, subprop){
        return prop && prop[subprop];
    }, obj);
}

/*
 * Removes quotes from the specified string 
 */
function unquote(str, quoteChar) {
    quoteChar = quoteChar || '"';
    if (str.length > 0 && str[0] === quoteChar && str[str.length - 1] === quoteChar)
        return str.slice(1, str.length - 1);
    else
        return str;
};

/*
 * This comparison function evaluates abscissas to sort array of coordinates.
 */
function compareByXCoordinate(coord1, coord2) {
    return coord2[0] - coord1[0];
}


/*
 * Followings functions and variables are used to generate statics graphs
 * AND dynamics graphs (if you have the plugin)
 */

var showControllersOnly = false;
var seriesFilter = "^(Cart|Home|Landing_Page)(-success|-failure)?$";
var filtersOnlySampleSeries = true;

// Fixes time stamps
function fixTimeStamps(series, offset){
    $.each(series, function(index, item) {
        $.each(item.data, function(index, coord) {
            coord[0] += offset;
        });
    });
}

// Check if the specified jquery object is a graph
function isGraph(object){
    return object.data('plot') !== undefined;
}

// Collapse
$(function() {
        $('.collapse').on('shown.bs.collapse', function(){
            collapse(this, false);
        }).on('hidden.bs.collapse', function(){
            collapse(this, true);
        });
});

$(function() {
    $(".glyphicon").mousedown( function(event){
        var tmp = $('.in:not(ul)');
        tmp.parent().parent().parent().find(".fa-chevron-up").removeClass("fa-chevron-down").addClass("fa-chevron-down");
        tmp.removeClass("in");
        tmp.addClass("out");
    });
});

/**
 * Export graph to a PNG
 */
function exportToPNG(graphName, target) {
    var plot = $("#"+graphName).data('plot');
    var flotCanvas = plot.getCanvas();
    var image = flotCanvas.toDataURL();
    image = image.replace("image/png", "image/octet-stream");
    
    var downloadAttrSupported = ("download" in document.createElement("a"));
    if(downloadAttrSupported === true) {
        target.download = graphName + ".png";
        target.href = image;
    }
    else {
        document.location.href = image;
    }
}

// Override the specified graph options to fit the requirements of an overview
function prepareOverviewOptions(graphOptions){
    var overviewOptions = {
        series: {
            shadowSize: 0,
            lines: {
                lineWidth: 1
            },
            points: {
                // Show points on overview only when linked graph does not show
                // lines
                show: getProperty('series.lines.show', graphOptions) == false,
                radius : 1
            }
        },
        xaxis: {
            ticks: 2,
            axisLabel: null
        },
        yaxis: {
            ticks: 2,
            axisLabel: null
        },
        legend: {
            show: false,
            container: null
        },
        grid: {
            hoverable: false
        },
        tooltip: false
    };
    return $.extend(true, {}, graphOptions, overviewOptions);
}

function prepareOptions(options, data) {
    options.canvas = true;
    var extraOptions = data.extraOptions;
    if(extraOptions !== undefined){
        var xOffset = options.xaxis.mode === "time" ? 10800000 : 0;
        var yOffset = options.yaxis.mode === "time" ? 10800000 : 0;

        if(!isNaN(extraOptions.minX))
        	options.xaxis.min = parseFloat(extraOptions.minX) + xOffset;
        
        if(!isNaN(extraOptions.maxX))
        	options.xaxis.max = parseFloat(extraOptions.maxX) + xOffset;
        
        if(!isNaN(extraOptions.minY))
        	options.yaxis.min = parseFloat(extraOptions.minY) + yOffset;
        
        if(!isNaN(extraOptions.maxY))
        	options.yaxis.max = parseFloat(extraOptions.maxY) + yOffset;
    }
}

// Filter, mark series and sort data
/**
 * @param data
 * @param noMatchColor if defined and true, series.color are not matched with index
 * @param ignoreFilterParam If true we don't apply seriesFilter
 */
function prepareSeries(data, noMatchColor, ignoreFilterParam){
    var result = data.result;
    var ignoreFilter = ignoreFilterParam === true;
    // Keep only series when needed
    if(!ignoreFilter && seriesFilter && (!filtersOnlySampleSeries || result.supportsControllersDiscrimination)){
        // Insensitive case matching
        var regexp = new RegExp(seriesFilter, 'i');
        result.series = $.grep(result.series, function(series, index){
            return regexp.test(series.label);
        });
    }

    // Keep only controllers series when supported and needed
    if(result.supportsControllersDiscrimination && showControllersOnly){
        result.series = $.grep(result.series, function(series, index){
            return series.isController;
        });
    }

    // Sort data and mark series
    $.each(result.series, function(index, series) {
        series.data.sort(compareByXCoordinate);
        if(!(noMatchColor && noMatchColor===true)) {
	        series.color = index;
	    }
    });
}

// Set the zoom on the specified plot object
function zoomPlot(plot, xmin, xmax, ymin, ymax){
    var axes = plot.getAxes();
    // Override axes min and max options
    $.extend(true, axes, {
        xaxis: {
            options : { min: xmin, max: xmax }
        },
        yaxis: {
            options : { min: ymin, max: ymax }
        }
    });

    // Redraw the plot
    plot.setupGrid();
    plot.draw();
}

// Prepares DOM items to add zoom function on the specified graph
function setGraphZoomable(graphSelector, overviewSelector){
    var graph = $(graphSelector);
    var overview = $(overviewSelector);

    // Ignore mouse down event
    graph.bind("mousedown", function() { return false; });
    overview.bind("mousedown", function() { return false; });

    // Zoom on selection
    graph.bind("plotselected", function (event, ranges) {
        // clamp the zooming to prevent infinite zoom
        if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
            ranges.xaxis.to = ranges.xaxis.from + 0.00001;
        }
        if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
            ranges.yaxis.to = ranges.yaxis.from + 0.00001;
        }

        // Do the zooming
        var plot = graph.data('plot');
        zoomPlot(plot, ranges.xaxis.from, ranges.xaxis.to, ranges.yaxis.from, ranges.yaxis.to);
        plot.clearSelection();

        // Synchronize overview selection
        overview.data('plot').setSelection(ranges, true);
    });

    // Zoom linked graph on overview selection
    overview.bind("plotselected", function (event, ranges) {
        graph.data('plot').setSelection(ranges);
    });

    // Reset linked graph zoom when reseting overview selection
    overview.bind("plotunselected", function () {
        var overviewAxes = overview.data('plot').getAxes();
        zoomPlot(graph.data('plot'), overviewAxes.xaxis.min, overviewAxes.xaxis.max, overviewAxes.yaxis.min, overviewAxes.yaxis.max);
    });
}

// Prepares data to be consumed by plot plugins
function prepareData(series, choiceContainer, customizeSeries){
    var datasets = [];

    // Add only selected series to the data set
    choiceContainer.find("input:checked").each(function (index, item) {
        var key = $(item).attr("name");
        var i = 0;
        var size = series.length;
        while(i < size && series[i].label != key)
            i++;
        if(i < size){
            var currentSeries = series[i];
            datasets.push(currentSeries);
            if(customizeSeries)
                customizeSeries(currentSeries);
        }
    });
    return datasets;
}

/*
 * Ignore case comparator
 */
function sortAlphaCaseless(a,b){
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
};

function createLegend(choiceContainer, infos) {
    // Sort series by name
    var keys = [];
    $.each(infos.data.result.series, function(index, series){
        keys.push(series.label);
    });
    keys.sort(sortAlphaCaseless);

    // Create list of series with support of activation/deactivation
    $.each(keys, function(index, key) {
        var id = choiceContainer.attr('id') + index;
        $('<li />')
            .append($('<input id="' + id + '" name="' + key + '" type="checkbox" checked="checked" hidden />'))
            .append($('<label />', { 'text': key , 'for': id }))
            .appendTo(choiceContainer);
    });
    choiceContainer.find("label").click( function(){
        if (this.style.color !== "rgb(129, 129, 129)" ){
            this.style.color="#818181";
        }else {
            this.style.color="black";
        }
        $(this).parent().children().children().toggleClass("legend-disabled");
    });
    choiceContainer.find("label").mousedown( function(event){
        event.preventDefault();
    });
    choiceContainer.find("label").mouseenter(function(){
        this.style.cursor="pointer";
    });

    // Recreate graphe on series activation toggle
    choiceContainer.find("input").click(function(){
        infos.createGraph();
    });
}

// Unchecks all boxes for "Hide all samples" functionality
function uncheckAll(id){
    toggleAll(id, false);
}

// Checks all boxes for "Show all samples" functionality
function checkAll(id){
    toggleAll(id, true);
}

const colorArray = [
            "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac",
            "#86b4a9", "#f4a582", "#d8b365", "#f7f7f7", "#5ab4ac", "#92c5de", "#fddbc7", "#d6604d", "#c7eae5",
            "#4393c3", "#f4a582", "#67a9cf", "#b2182b", "#92c5de", "#2166ac", "#f4a582", "#d1e5f0", "#67001f",
            "#fddbc7", "#d8daeb", "#762a83", "#e7d4e8", "#1b7837", "#d9f0d3", "#a6dba0", "#5aae61", "#f7f7f7",
            "#b35806", "#dfc27d", "#80cdc1", "#018571", "#c2a5cf", "#9970ab", "#f7f7f7", "#8c510a", "#01665e",
            "#5ab4ac", "#c51b7d", "#762a83", "#af8dc3", "#de77ae", "#1b7837", "#e9a3c9", "#d9f0d3", "#5aae61",
            "#fdae61", "#fee08b", "#e6f598", "#8c510a", "#7fbf7b", "#af8dc3", "#762a83", "#66c2a5", "#e78ac3",
            "#1b7837", "#5aae61", "#d9f0d3", "#fee08b", "#a6dba0", "#e7d4e8", "#af8dc3", "#66c2a5", "#4393c3",
            "#f4a582", "#92c5de", "#67001f", "#d1e5f0", "#2166ac", "#92c5de", "#762a83", "#a6dba0", "#018571",
            "#d8daeb", "#c7eae5", "#e9a3c9", "#b35806", "#9970ab", "#fdae61", "#e78ac3", "#8c510a", "#7fbf7b",
            "#d9f0d3", "#66c2a5", "#e9a3c9", "#c51b7d"
        ];