$(document).ready(function()
{
	/*SLIDE 2*/

	var curImgHeight = $("#balloon-img").height();
	var curImgWidth = $("#balloon-img").width();

	function adjustInput567() {
		var topImg = $("#balloon-img").offset().top;
		var leftImg = $("#balloon-img").offset().left;
		var newImgHeight = $("#balloon-img").height();
		var newImgWidth = $("#balloon-img").width();
		var ratio = newImgWidth / curImgWidth;
		//Input 5
		var input5 = $("#wrapper_input5");
		input5.height(input5.height() * ratio);
		input5.width(input5.width() * ratio);
		input5.offset({top: topImg + 0.2 * newImgHeight, left: leftImg + 0.01 * newImgWidth})

		//Input 6
		var input6 = $("#wrapper_input6");
		input6.height(input6.height() * ratio);
		input6.width(input6.width() * ratio);
		input6.offset({top: topImg + 0.05 * newImgHeight, left: leftImg + 0.39 * newImgWidth})

		//Input 7
		var input7 = $("#wrapper_input7");
		input7.height(input7.height() * ratio);
		input7.width(input7.width() * ratio);
		input7.offset({top: topImg + 0.2 * newImgHeight, left: leftImg + 0.9 * newImgWidth})

		curImgHeight = $("#balloon-img").height();
		curImgWidth = $("#balloon-img").width();
	}

	if ($('#panel2').css('display') != 'none') {
		adjustInput567();
		$( window ).resize(function() {
		  adjustInput567();
		});    
	}





	/*SLIDE 3*/
	var curCardHeight = $("#gift_card_panel3").height();
	var curCardWidth = $("#gift_card_panel3").width();
	
	function adjustInput9() {
		var topImg = $("#gift_card_panel3").offset().top;
		var leftImg = $("#gift_card_panel3").offset().left;
		var newCardHeight = $("#gift_card_panel3").height();
		var newCardWidth = $("#gift_card_panel3").width();
		var ratio = newCardWidth / curCardWidth;
		
		//Input 9
		var input9 = $("#wrapper_input9");
		input9.height(input9.height() * ratio );
		input9.width(input9.width() * ratio );
		input9.offset({top: topImg + 0.5 * newCardHeight, left: leftImg + 0.3 * newCardWidth})

		

		curCardHeight = $("#gift_card_panel3").height();
		curCardWidth = $("#gift_card_panel3").width();
	}

	
	if ($('#panel3').css('display') != 'none') {
		
		adjustInput9();
		$( window ).resize(function() {
		  adjustInput9();
		});    
	}
});