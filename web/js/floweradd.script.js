// JavaScript Document

$(document).ready(() => {

	//div for dark mode onoffSwitch
	const onoff = $('#onoffSwitch');
	const colorChange = $('.colorChange');

	//divs for dark mode
	const heading = $('.heading');
	const nameWrapper = $('#nameWrapper');
	const middleWrapper = $('#middleWrapper');

	//divs for add plants
	const addPlant = $('#fixedBox');

	onoff.click(() => {
		colorChange.toggleClass('-darkmode');
		heading.toggleClass('-darkmode');
		nameWrapper.toggleClass('-darkmode');
		middleWrapper.toggleClass('-darkmode');
	});

	//TODO popup na click a pridanie kvetiny až po zadani mena a potvrdení
	addPlant.click(() => {
		console.log("test addPlant");
		middleWrapper.append("<div id='addedPlant'></div>");
	});

});