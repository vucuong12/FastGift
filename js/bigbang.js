var localGift = {};
var giftID = "";
var isCompleted = true;
var mode = "";
$(document).ready(function()
{
	init();
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
		$("#wrapper_input5 textarea").width(input5.width());
		$("#wrapper_input5 textarea").height(input5.height());


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
		$("#wrapper_input7 textarea").width(input7.width());
		$("#wrapper_input7 textarea").height(input7.height());

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
			if (mode === "Preview"){
				$("#panel3_save").remove();	
			}
			
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
		uploadGiftToFibrebase();
	});


	/*INIT*/
	
	function init(){

		/*0. Get mode*/
		var localUrl = window.location.href;
		if (localUrl.indexOf("Preview") > -1){
			mode = "Preview"
		} else if (localUrl.indexOf("Editing") > -1) {
			mode = "Editing"
		}
		/*1. Get giftid*/
		giftID = getParameterByName("giftid");
		//console.log("giftID " + giftID )
		/*2. Get gift from firebase*/
		database.ref("gifts/" + giftID).once("value").then(function(snapshot){
			localGift = snapshot.val();
			console.log("Hi: " + localGift);
			console.log(localGift.inputs.input1);
			displayCurrentStatus();
		});
		
		/*3. Display current status for the gift*/
	}

	function displayEachInput(inputKey){
		var value = localGift.inputs[inputKey];
		if (mode === "Preview"){
			if (value == "" || value == undefined) {

			} else {
				$("#"+inputKey).hide();
				$("#"+inputKey +"-outer").show();
				$("#"+inputKey +"-outer").html(localGift.inputs[inputKey])
				console.log($("#"+inputKey +"-outer").closest(".wrapper_input"));
				$("#"+inputKey +"-outer").closest(".wrapper_input")
				// .css({"background-color": "#fff"})
				// .css({"text-align":"left"})
				.css({"min-width": "0%"})
				.css({"margin-left": "5px"})
				.css({"margin-right": "5px"})
				
				if (inputKey === "input5" || inputKey === "input7"){
					
				} else {
					console.log("aaaa");
					$("#"+inputKey +"-outer").closest(".wrapper_input")
					.css({"background-color": "#fff"})
				}
			}
			
			
			return;
		}

		
		console.log("Displaying " +inputKey + " " + value)
		
		if (value == "" || value == undefined) return;
		$("#wrapper_" + inputKey).css({"background-color":"#fff"});
		$("#"+inputKey).show();
		console.log($("#"+inputKey +"-outer"));
		$("#"+inputKey +"-outer").hide();
		$("#"+inputKey).val(localGift.inputs[inputKey])
	}

	function displayCurrentStatus() {
		displayEachInput("input1");
		displayEachInput("input2");
		displayEachInput("input8");

		displayEachInput("input5");
		displayEachInput("input7");
	}

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}



	/*GETTING INPUT*/
	function showInputField(inputNumber, inputType){
		if (inputType == "text"){
			$("#wrapper_input" + inputNumber).click(function(){
				$("#wrapper_input" + inputNumber + " h2").hide();
				$("#wrapper_input" + inputNumber + " input").show();
				$("#wrapper_input" + inputNumber).css({"background-color":"#fff"});
			})
		}

		if (inputType == "textarea"){
			$("#wrapper_input" + inputNumber).click(function(){
				$("#wrapper_input" + inputNumber + " h2").hide();
				$("#wrapper_input" + inputNumber + " textarea").show();
				$("#wrapper_input" + inputNumber + " textarea").focus();
				$("#wrapper_input" + inputNumber).css({"background-color":"#fff"});
			})

		}
	}

	function showInputFieldsAfterClick(){
		if (mode === "Preview") return;
		showInputField(1, "text");
		showInputField(2, "text");
		showInputField(5, "textarea");
		showInputField(7, "textarea");
		showInputField(8, "text");
	}
	
	showInputFieldsAfterClick();



	function uploadGiftToFibrebase(){
		isCompleted = true;
		updateEachInput("input1");
		updateEachInput("input2");
		updateEachInput("input5");
		updateEachInput("input7");
		updateEachInput("input8");
		sendToFirebase();
	}

	function updateEachInput(inputKey){
		if ($("#"+inputKey).val() == ""){
			isCompleted = false;
		}

		/*Update localGift*/
		localGift.inputs[inputKey] = $("#"+inputKey).val();

		//localGift["inputs"] = $("#"+inputKey).val();
		console.log("Update inputKey " + inputKey);

		// updates["/gifts/" + giftID] = localGift;
		// return database.ref().update(updates);
	}

	function sendToFirebase() {
		var updates = {};
		if (isCompleted){
			localGift.status = "Completed"
		} else {
			localGift.status = "Incompleted"
		}
		updates["/gifts/" + giftID] = localGift;
		return database.ref().update(updates, function(err){
			window.location.href = "../Preview/Bigbang.html?giftid=" + giftID;	
		});
		
	}


});