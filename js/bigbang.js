var localGift = {};
var giftID = "";
var isCompleted = true;
var mode = "";
var img1_url = "";
$(document).ready(function()
{
	init();

	$("#wrapper_input6").click(function(){
		$("#img-input-modal").modal("show");
	})

	$("#img-input-modal .done").click(function(){
		
		img1_url = $("#img-input-modal input").val();
		$("#img-input-modal").modal("hide");
		alert(img1_url)
		$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
		$("#wrapper_input6 img").attr('src', img1_url).show();
		$("#wrapper_input6 h2").hide();
		
	})

	$("#img-input-modal .cancel").click(function(){
		$("#img-input-modal").modal("hide");
	})


	if ($( "#hand" ).length > 0){
		$( "#hand" ).draggable({
			stop: function( event, ui ) {
		        var offset = $(this).offset();
		        var left = offset.left + $(this).width() / 2;
		        var top = offset.top + $(this).height() / 2;
		        
		        var img = $("#panel1_body img");
		        var leftImg = img.offset().left;
		        var topImg = img.offset().top;
		        var widthImg = img.width();
		        var heightImg = img.height();
		        
		        if (leftImg < left && left < leftImg + widthImg
		        &&  topImg < top && top < topImg + heightImg){
		        	console.log("Inside img");
		        	showSlide(2);
		        }
		        
			}
		});
	}
	

	if ($( "#needle" ).length > 0){
		$( "#needle" ).draggable({
			stop: function( event, ui ) {
		        var offset = $(this).offset();
		        var left = offset.left + $(this).width() / 2;
		        var top = offset.top + $(this).height() / 2;
		        
		        var img = $("#panel2_body img");
		        var leftImg = img.offset().left;
		        var topImg = img.offset().top;
		        var widthImg = img.width();
		        var heightImg = img.height();
		        
		        if (leftImg < left && left < leftImg + widthImg
		        &&  topImg < top && top < topImg + heightImg){
		        	console.log("Inside img");
		        	showSlide(3);
		        }
		        
			}
		});
	}
	


	
	function showHand(){
		if (mode === "editing") return;
		console.log("showhand")
		$( "#hand" ).show();
		$( "#hand" )
		.css({"position": "fixed"})
		.css({"top":"250px"})
		.css({"right":"100px", "left": "auto"})
		// var offset = $("#panel1_body img").offset();
  //       var leftPos = offset.left + $("#panel1_body img").width() + 20;
  //       var topPos = offset.top + $("#panel1_body img").height() / 2;
  //       $( "#hand" ).offset({top: topPos, left:leftPos})
	}

	function showNeedle(){
		if (mode === "editing") return;
		$( "#needle" ).show();
		$( "#needle" )
		.css({"top":"300px"})
		.css({"right":"200px", "left": "auto"})
		// var offset = $("#panel2_body img").offset();
  //       var leftPos = offset.left + $("#panel2_body img").width() + 70;
  //       var topPos = offset.top + $("#panel2_body img").height() / 2;
  //       console.log("====");
  //       console.log(leftPos, topPos);
  //       $( "#needle" ).offset({top: topPos, left:leftPos})
	}
	
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
		if (mode == "preview" || mode == "receiving"){
			$(".navi-button").hide();
			$("#panel3_startover").show();
		} else {
			$(".navi-button").show();
			$("#panel3_startover").hide();
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
			if (mode === "preview" || mode === "receiving"){
				$("#panel3_save").remove();	
			}
			
		} else if (slideNumber == 2){
			adjustInput567();
		}

		if (slideNumber === 1){
			$("#needle").hide();
			showHand();
		}
		if (slideNumber === 2){
			
			$("#hand").hide();
			showNeedle();
		}
		if (slideNumber === 3){
			$("#needle").hide();
			$("#hand").hide();
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
	$("#panel3_startover").click(function()
	{
		showSlide(1);
	});

	$("#back-to-edit").click(function(){
		window.location.href = "../Editing/Bigbang.html?mode=editing&giftid=" +giftID;
	})


	/*INIT*/
	
	function init(){

		/*0. Get mode*/
		var localUrl = window.location.href;
		// if (localUrl.indexOf("Preview") > -1 || localUrl.indexOf("preview") > -1){
		// 	mode = "Preview"
		// } else if (localUrl.indexOf("Editing") > -1 || localUrl.indexOf("editing") > -1) {
		// 	mode = "Editing"
		// } else if (localUrl.indexOf("gifts") > -1|| localUrl.indexOf("Preview") > -1){
		// 	mode = "Receiving"
		// }
		/*1. Get giftid*/
		giftID = getParameterByName("giftid");
		mode = getParameterByName("mode");

		if (mode === "receiving"){
			$("#back-to-mygifts").hide();
		}

		//console.log("giftID " + giftID )
		/*2. Get gift from firebase*/
		database.ref("gifts/" + giftID).once("value").then(function(snapshot){
			localGift = snapshot.val();
			console.log("Hi: " + localGift);
			console.log(localGift.inputs.input1);
			displayCurrentStatus(function(){
				showSlide(1);

			});
		});
		
		
	}

	function displayEachInput(inputKey){
		var value = localGift.inputs[inputKey];
		if (mode === "preview" || mode === "receiving"){
			if (value == "" || value == undefined) {

			} else {
				if (inputKey === "input6"){
					console.log("Preview input6")
					$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
					$("#wrapper_input6 img").attr('src', value).show();
					$("#wrapper_input6 h2").hide();
					return
				}
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

		if (inputKey === "input6"){
					$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
					$("#wrapper_input6 img").attr('src', value).show();
					$("#wrapper_input6 h2").hide();
					return
				}

		$("#wrapper_" + inputKey).css({"background-color":"#fff"});
		$("#"+inputKey).show();
		console.log($("#"+inputKey +"-outer"));
		$("#"+inputKey +"-outer").hide();
		$("#"+inputKey).val(localGift.inputs[inputKey])
	}

	function displayCurrentStatus(callback) {
		displayEachInput("input1");
		displayEachInput("input2");
		displayEachInput("input8");

		displayEachInput("input5");
		displayEachInput("input6");
		displayEachInput("input7");
		callback();
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
		if (mode === "preview" || mode === "receiving") return;
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
		updateEachInput("input6");
		updateEachInput("input7");
		updateEachInput("input8");
		sendToFirebase();
	}

	function updateEachInput(inputKey){
		if ($("#"+inputKey).val() == ""){
			isCompleted = false;
		}

		/*Update localGift*/
		
		if (inputKey == "input6"){
			if ($("#img-input-modal input").val() != ""){
				localGift.inputs[inputKey] = $("#img-input-modal input").val();
				console.log("Input 6" + localGift.inputs[inputKey]);	
			} 
			
		} else {
			localGift.inputs[inputKey] = $("#"+inputKey).val();
		}


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
			window.location.href = "../Preview/Bigbang.html?mode=preview&giftid=" + giftID;	
		});
		
	}


});