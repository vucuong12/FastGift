var totalSlide = 2;
var localGift = {};
var giftID;
var isCompleted;
var img1_url;
var mode;
$(document).ready(function()
{
	init();
	/*Image*/
	$("#wrapper_input3").click(function(){
		$("#img-input-modal").modal("show");
	})

	function checkImgURL(url) {
	    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}

	$("#img-input-modal .done").click(function(){
		img1_url = $("#img-input-modal input").val();
		if (!checkImgURL(img1_url)){
			alert("Invalid image URL")
			return;
		}
		$("#img-input-modal").modal("hide");
		$("#wrapper_input3").css({ 'background-color':"rgba(255, 0, 0, 0)" })
		.css({"border":"none"})
		$("#wrapper_input3 #output3").attr('src', img1_url).show();
		$("#wrapper_input3 #input3_img").hide();
		
	})

	$("#img-input-modal .cancel").click(function(){
		$("#img-input-modal").modal("hide");
	})

	$("#slide1").click(function(){
		showSlide(1);
		
	})

	$("#slide2").click(function(){
		showSlide(2);
	})




	function showSlide(slideNumber, totalSlide = 3){
		// if ($('#panel' + slideNumber).css('display') != 'none') {
		// 	return;
		// }


		for (var i = 1; i < totalSlide + 1; i++){
			if (i == slideNumber){
				$("#panel" + i).show();	
				$("#slide" + i).addClass("current-slide");
			} else {
				$("#panel" + i).hide();	
				$("#slide" + i).removeClass("current-slide");
			}
			
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
	$("#panel2_save").click(function()
	{
		uploadGiftToFibrebase();
	});

	$("#back-to-edit").click(function(){
		window.location.href = "../Editing/MyGirl.html?mode=editing&giftid=" +giftID;
	})

	$("#back-to-home").click(function(){
		window.location.href = "../index.html";
	})

	function init() {

		/*0. Get mode*/
		var localUrl = window.location.href;
		
		/*1. Get giftid*/
		giftID = getParameterByName("giftid");
		mode = getParameterByName("mode");
		if (mode == "preview" || mode == "receiving"){
			$(".navi-button").hide();
			
		}

		if (mode === "receiving"){
			$("#back-to-edit").hide();
			$("#back-to-home").hide();
		}

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

	function displayEachInput(inputKey, inputType, defaultValue = "Your message"){
		var value = localGift.inputs[inputKey];
		var hasValue = !(value == "" || value == undefined);
		if (mode === "preview" || mode === "receiving"){
			if (!hasValue) {
				if (inputType === "video"){

				} else if (inputType === "image"){

				} else {
					if (inputType == "text"){
						$("#wrapper_" + inputKey + " p").hide();
						$("#wrapper_" + inputKey + " input").show();
						//$("#wrapper_" + inputKey).css({"background-color":"#fff"});
						$("#wrapper_" + inputKey + " input").attr("placeholder", defaultValue);
					}

					if (inputType == "textarea"){
						console.log("---> " + inputKey);
						$("#wrapper_" + inputKey + " h2").hide();
						$("#wrapper_" + inputKey + " div").hide();
						$("#wrapper_" + inputKey + " textarea").show();
						$("#wrapper_" + inputKey + " textarea").focus();
						$("#wrapper_" + inputKey + " textarea").attr("placeholder", defaultValue);
						$("#wrapper_" + inputKey).css({"background-color":"#fff"});

					}
				}
			} else {
				if (inputType === "video") {
					$("#wrapper_input9").css({ 'background-color':"rgba(255, 0, 0, 0)" })
					$("#wrapper_input9 source").attr('src', value);
					$("#wrapper_input9 video").show();
					$("#wrapper_input9 img").hide();
					return;
				} else if (inputType === "image"){
					console.log("Preview input6")
					$("#wrapper_input3").css({ 'background-color':"rgba(255, 0, 0, 0)" })
					.css({"border":"none"})
					$("#wrapper_input3 #output3").attr('src', value).show();
					$("#wrapper_input3 #input3_img").hide();
					return
				}
				console.log("----> " + inputKey);

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
		// Editing mode
		if(inputType === "video") {
			if (hasValue){
				$("#wrapper_input9").css({ 'background-color':"rgba(255, 0, 0, 0)" })
				$("#wrapper_input9 source").attr('src', value);
				$("#wrapper_input9 video").show();
				$("#wrapper_input9 img").hide();
			}
		}else if (inputType === "image"){
			if (hasValue){
				$("#img-input-modal input").val(value);
				$("#wrapper_" + inputKey).css({ 'background-color':"rgba(255, 0, 0, 0)" })
				.css({"border":"none"})
				$("#wrapper_" + inputKey + " #output3").attr('src', value).show();
				$("#wrapper_" + inputKey + " #" + inputKey + "_img").hide();
			}
		} else {
			if (inputType == "text"){
				$("#wrapper_" + inputKey + " p").hide();
				$("#wrapper_" + inputKey + " input").show();
				// $("#wrapper_" + inputKey).css({"background-color":"#fff"});
				if (!hasValue){
					$("#wrapper_" + inputKey + " input").attr("placeholder", defaultValue);	
				} else {
					$("#wrapper_" + inputKey + " input").val(value);
				}
				
			}

			if (inputType == "textarea"){
				console.log("---> " + inputKey);
				$("#wrapper_" + inputKey + " h2").hide();
				$("#wrapper_" + inputKey + " div").hide();
				$("#wrapper_" + inputKey + " textarea").show();
				$("#wrapper_" + inputKey + " textarea").focus();
				
				if (!hasValue){
					$("#wrapper_" + inputKey + " textarea").attr("placeholder", defaultValue);
				} else {
					$("#wrapper_" + inputKey + " textarea").html(value);
				}
				$("#wrapper_" + inputKey).css({"background-color":"#fff"});

			}
		}
	}

	function displayCurrentStatus(callback) {
		displayEachInput("input1", "text", "Your greeting message");
		displayEachInput("input2", "text", "Your message");
		displayEachInput("input4", "text", "Your message");
		displayEachInput("input3", "image");

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

	function updateEachInput(inputKey, inputType){
		if ($("#"+inputKey).val() == ""){
			isCompleted = false;
		}

		/*Update localGift*/
		
		if (inputType === "video") {
			if ($("#video-input-modal input").val() != ""){
				localGift.inputs[inputKey] = $("#video-input-modal input").val();
				console.log("Input 9" + localGift.inputs[inputKey]);	
			} 
		} else if (inputType == "image"){
			if ($("#img-input-modal input").val() != ""){
				localGift.inputs[inputKey] = $("#img-input-modal input").val();
				console.log("Input 3" + localGift.inputs[inputKey]);	
			} 
			
		} else {
			localGift.inputs[inputKey] = $("#"+inputKey).val();
		}


		//localGift["inputs"] = $("#"+inputKey).val();
		console.log("Update inputKey " + inputKey);

		// updates["/gifts/" + giftID] = localGift;
		// return database.ref().update(updates);
	}

	function uploadGiftToFibrebase(){
	
		isCompleted = true;
		updateEachInput("input1", "text");
		updateEachInput("input2", "text");
		updateEachInput("input3", "image");
		updateEachInput("input4", "text");


		sendToFirebase();
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
			window.location.href = "../Preview/MyGirl.html?mode=preview&giftid=" + giftID;	
		});
		
	}
	function open_card() {
	  if (mode != "editing"){
	  	document.getElementById('outside').className = 'open-card';	
	  } else {
	  	showSlide(2);
	  }
	  
	}

	function close_card() {
	  if (mode != "editing"){
	  	document.getElementById('outside').className = '';
	  } else {
	  	showSlide(1)
	  }
	  
	}

	$("#open_card_btn").click(open_card);
	$("#close_card_btn").click(close_card);
})



