// JavaScript Document

$(document).ready(function() {

	//divs for display data from server
	let stat1 = $('#stat1');
	let stat2 = $('#stat1');
	let stat3 = $('#stat1');
	let stat4 = $('#stat1');

	//div for dark mode onoffSwitch
	let onoff = $('#onoffSwitch');
	let colorChange = $('.colorChange');

	//divs for dark mode
	let heading = $('.heading');
	let nameWrapper = $('#nameWrapper');
	let middleWrapper = $('#middleWrapper');
	let statsBox = $('.statsBox');
	let chartWrapper = $('#chartWrapper');

    const socket = io.connect('http://localhost:5485');

	socket.on('connect', (data) => {
	    console.log('check',socket.connected);
	    socket.emit('weatherData');
    });
	
	socket.on('weatherData', (data) => {
      //console.log(data);

      let obj = JSON.parse(data);
      console.log(obj);

		/*$('#stat1').text(obj[0].Temperature);
		$('#stat2').text(obj[0].AirHumidity);
		$('#stat3').text(obj[0].SoilHumidity);
		$('#stat4').text(obj[0].WaterSurface);*/
		
		stat1.text(obj[0].Temperature);
		stat2.text(obj[0].AirHumidity);
		stat3.text(obj[0].SoilHumidity);
		stat4.text(obj[0].WaterSurface);

		Chart.defaults.global.maintainAspectRatio = false;
		let chart = document.getElementById("chart").getContext("2d");
		let TestChart = new Chart(chart, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: ["Temperature"],
				datasets: [{
					label: '# of Votes',
					data: [obj[0].Temperature],
					backgroundColor: [
						'#009E7F'
					],
					borderColor: [
						'#00846B',
					],
					borderWidth: 5
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
    
    });
	
	onoff.click(() => {

		colorChange.toggleClass('-darkmode');
		heading.toggleClass('-darkmode');
		nameWrapper.toggleClass('-darkmode');
		middleWrapper.toggleClass('-darkmode');
		statsBox.toggleClass('-darkmode');
		chartWrapper.toggleClass('-darkmode');

	});


  	/*$('#onoffSwitch').click(() => {

  		$('.colorChange').toggleClass('-darkmode');
		$('.heading').toggleClass('-darkmode');
		$('#nameWrapper').toggleClass('-darkmode');
		$('#middleWrapper').toggleClass('-darkmode');
	    $('.statsBox').toggleClass('-darkmode');
		$('#chartWrapper').toggleClass('-darkmode');
	
	});*/

});