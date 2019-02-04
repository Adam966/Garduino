// JavaScript Document

$(document).ready(function() {
	
	/*const socket = () => { io('http://localhost:5485') };
	//socket();*/
	
	const socket = io.connect('http://localhost:5485');
	
	socket.on('connect',function(){
		console.log('check',socket.connected);
	});
	
	socket.on('data',function(data){
		console.log('data');
		let obj = JSON.parse('data');
		
		$('#stat1').text(obj.info.temperature);
		$('#stat2').text(obj.info.humidityAir);
		$('#stat3').text(obj.info.humiditySoil);
		$('#stat4').text(obj.info.watersurface);
		
	});
	
  	$('#onoffSwitch').click(() => {
	$('.heading').toggleClass('-darkmode');
	$('#nameWrapper').toggleClass('-darkmode');
	$('#middleWrapper').toggleClass('-darkmode');
    $('.statsBox').toggleClass('-darkmode');
	$('#chartWrapper').toggleClass('-darkmode');
	
	});
	
	let chart = document.getElementById("chart").getContext("2d");
		let TestChart = new Chart(chart, {
			responsive:'true',
			type: 'line',
			data: {
				labels: ["1", "2", "3", "4", "5", "6"],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
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