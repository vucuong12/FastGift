$(document).ready(function()
{
	showSlide(1);
	/*SLIDE 2*/

	var curImgHeight = $("#balloon-img").height();
	var curImgWidth = $("#balloon-img").width();

	function adjustInput567() {
		console.log("adjustInput567");
		var topImg = $("#balloon-img").offset().top;
		var leftImg = $("#balloon-img").offset().left;
		var newImgHeight = $("#balloon-img").height();
		var newImgWidth = $("#balloon-img").width();
		var ratio = newImgWidth / curImgWidth;
		//Input 5
		var input5 = $("#wrapper_input5");
		input5.height(newImgHeight * 0.3);
		input5.width(newImgWidth * 0.3);
		input5.offset({top: topImg + 0.2 * newImgHeight, left: leftImg + 0.01 * newImgWidth})

		//Input 6
		var input6 = $("#wrapper_input6");
		input6.height(newImgHeight * 0.3);
		input6.width(newImgWidth * 0.3);
		input6.offset({top: topImg + 0.05 * newImgHeight, left: leftImg + 0.39 * newImgWidth})

		//Input 7
		var input7 = $("#wrapper_input7");
		input7.height(newImgHeight * 0.3);
		input7.width(newImgWidth * 0.3);
		input7.offset({top: topImg + 0.2 * newImgHeight, left: leftImg + 0.8 * newImgWidth})

		curImgHeight = $("#balloon-img").height();
		curImgWidth = $("#balloon-img").width();
	}

	afterResize(function(){
		console.log("Resize on panal 2")
		if ($('#panel2').css('display') != 'none'){
			adjustInput567();	
		}
		
	})

	/*SLIDE 3*/
	var curCardHeight = $("#gift_card_panel3").height();
	var curCardWidth = $("#gift_card_panel3").width();
	
	function adjustInput9() {

		var topImg = $("#gift_card_panel3").offset().top;
		var leftImg = $("#gift_card_panel3").offset().left;
		var newCardHeight = $("#gift_card_panel3").height();
		var newCardWidth = $("#gift_card_panel3").width();

		//Input 9
		var input9 = $("#wrapper_input9");
		input9.height(newCardHeight * 0.3 );
		input9.width(newCardHeight * 0.6 );
		input9.offset({top: topImg + 0.47 * newCardHeight, left: leftImg + 0.35 * newCardHeight})

		

		curCardHeight = $("#gift_card_panel3").height();
		curCardWidth = $("#gift_card_panel3").width();
	}

	afterResize(function(){
		console.log("Resize on panal 3")
		if ($('#panel3').css('display') != 'none'){
			adjustInput9();	
		}
		
	})

	function afterResize(callback){
		var delta = 10;
		var id;
		$(window).resize(function() {
			clearTimeout(id);
		    id = setTimeout(resizeend, delta);
		});

		function resizeend() {
		    callback();              
		}
	}

	$("#slide1").click(function(){
		showSlide(1);
	})

	$("#slide2").click(function(){
		showSlide(2);
	})

	$("#slide3").click(function(){
		showSlide(3);
	})

	

	function showSlide(slideNumber, totalSlide = 3){
		if ($('#panel' + slideNumber).css('display') != 'none') {
			return;
		}
		for (var i = 1; i < totalSlide + 1; i++){
			if (i == slideNumber){
				$("#panel" + i).show();	
				$("#slide" + i).addClass("current-slide");
			} else {
				$("#panel" + i).hide();	
				$("#slide" + i).removeClass("current-slide");
			}
			
		}

		if (slideNumber == 3){
			adjustInput9();	
		} else if (slideNumber == 2){
			adjustInput567();
		}
	}
	
	$("#panel1_next").click(function()
	{
		showSlide(2);
	});

	$("#panel2_prev").click(function()
	{
		showSlide(1);
	});
	$("#panel2_next").click(function()
	{
		showSlide(3);
	});

	$("#panel3_prev").click(function()
	{
		showSlide(2);
	});
	$("#panel3_save").click(function()
	{
		
	});
});