$(function(){
	Highcharts.chart('chart_bems', {
        chart: {
        	type: 'area',
            backgroundColor: 'transparent',
            events: {
	            load: function () {
	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                	getChartRandomData(series, 'chart_bems_text');
	                	//alert("2 :" + series.data[0].y);
	                	//setChartText("chart_bems_text", series[0].x);
	                }, 1000);
	            }
            }
        },
        title: {
            text: ''
        },
        exporting: { enabled: false }, 
        xAxis: {
			type: 'datetime',
            labels: {
	            style: {
	                color: '#fff'
	            }
	        }
        },
        yAxis: {
        	lineWidth:1,
            gridLineWidth: 0,
            minorGridLineWidth: 1,
            title: {
                text: ''
            },
            labels: {
	            style: {
	                color: '#fff'
	            }
	        }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    },
                    stops: [
                        [0, '#449CF7'],
                        [1, '#444DF7']
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                }
            }, 
            series: {
                marker: {
                    enabled: false
                }
            }
        }, 
        series: [{
            name: '에너지현황',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -500; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(getRandomInt(950, 1100))
                    ]);
                }
                return data;
            }())
        }],
    });
	
	Highcharts.chart('chart_rems', {
        chart: {
        	type: 'area',
            backgroundColor: 'transparent',
            events: {
	            load: function () {
	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                	getChartRandomData(series, 'chart_rems_text');
	                }, 1000);
	            }
            }
        },
        title: {
            text: ''
        },
        exporting: { enabled: false }, 
        xAxis: {
			type: 'datetime',
            labels: {
	            style: {
	                color: '#fff'
	            }
	        }
        },
        yAxis: {
        	lineWidth:1,
            gridLineWidth: 0,
            minorGridLineWidth: 1,
            title: {
                text: ''
            },
            labels: {
	            style: {
	                color: '#fff'
	            }
	        }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    },
                    stops: [
                        [0, '#449CF7'],
                        [1, '#444DF7']
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                }
            }, 
            series: {
                marker: {
                    enabled: false
                }
            }
        }, 
        series: [{
            name: '태양광 현황',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -500; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(getRandomInt(950, 1100))
                    ]);
                }
                return data;
            }())
        }],
    });
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getChartRandomData(series, id) {
	var x = (new Date()).getTime(); // current time
    var y = getRandomInt(950,1100);
    series.addPoint([x, y], true, true);
    var percent = getRandomInt(50,100);
    var percent_dp  = getRandomInt(0,99);
    var percent_text = '';
    if (percent != 100) {
    	percent_text = percent + '.'+ percent_dp;
    } else {
    	percent_text = "100%";
    }
    var classText = getRandomInt(1,2) == 1 ? " safetyStat" : "";
    $("#"+id).html("<p class='statNum" + classText + "'><span><i class='ico_arrow'></i><strong>" + percent_text + "</strong>%</span>(" + numberWithCommas(y) + "kwh)</p>");
    return series;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}