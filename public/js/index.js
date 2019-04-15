'use strict';

function matchCountPlot(matchCountData) {
  var seasons = Object.keys(matchCountData);
  var matchData = formatData(seasons, matchCountData);

  var myChart = Highcharts.chart('matchCount', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'IPL Seasons : Total Matches Played'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total Matches'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0
      }
    },

    'series': [{
      'name': 'Total Matches',
      'colorByPoint': true,
      'data': matchData
    }]
  });
}

function extrasCountPlot(extrasData) {
  var teamNames = Object.keys(extrasData);
  var extrasCountData = formatData(teamNames, extrasData);
  Highcharts.chart('extrasCount', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'IPL Season 2016 : ExtraRuns Conceived'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total Extras'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0
      }
    },
    'series': [{
      'name': 'Total Extras',
      'colorByPoint': true,
      'data': extrasCountData
    }]
  });
}

function economicalBowlersPlot(ecoBowlerData) {
  var bowlerEconomyData = Object.keys(ecoBowlerData);
  var topEconomicalBowlers = formatData(bowlerEconomyData, ecoBowlerData);

  Highcharts.chart('economicalBowlers', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'IPL Season 2015 : Top Economical Bowlers'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Economy'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:13px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
    },

    'series': [{
      'name': 'Top Economical Bowlers',
      'colorByPoint': true,
      'data': topEconomicalBowlers
    }]
  });
}

function formatData(requiredData, givenData) {

  return requiredData.reduce(function (dataObjectArr, dataName) {
    var dataObject = {};
    dataObject['name'] = dataName;
    dataObject['y'] = givenData[dataName];
    dataObjectArr.push(dataObject);
    return dataObjectArr;
  }, []);
}

$.getJSON("../../json_files/matchesPerYear.json", function (json) {
  console.log(json);
  matchCountPlot(json);
});

$.getJSON("../../json_files/extraRuns.json", function (json) {
  console.log(json);
  extrasCountPlot(json);
});

$.getJSON("../../json_files/ecoBowlers.json", function (json) {
  console.log(json);
  economicalBowlersPlot(json);
});