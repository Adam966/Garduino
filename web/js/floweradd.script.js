// JavaScript Document

$(document).ready(() => {

	//div for dark mode onoffSwitch
	const onoff = $('#onoffSwitch');
	const colorChange = $('.colorChange');

	//divs for dark mode
	const heading = $('.heading');
	const nameWrapper = $('#nameWrapper');
	const middleWrapper = $('#middleWrapper');


	onoff.click(() => {
		colorChange.toggleClass('-darkmode');
		heading.toggleClass('-darkmode');
		nameWrapper.toggleClass('-darkmode');
		middleWrapper.toggleClass('-darkmode');
	});

});