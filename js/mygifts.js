$( document ).ready(function() {
  
  database.ref("gifts/").once('value', function(snapshot)
  {
    var giftTemplate = $("#gift-template");
    var keys = Object.keys(snapshot.val());
    for (var index = 0; index < keys.length; index++){
      var key = keys[index];
      var childSnapshot = snapshot.val()[key];
      // alert(1);
      var gift=giftTemplate.clone();
      gift.attr('id', key);
      // for each gift, now we have to edit its gift-name, gift-status, send-link and remove button.
      var receiver = childSnapshot.inputs["input1"];
      if(receiver == "") receiver = "somebody";
      var timeStamp = -childSnapshot['priority'];
      gift.attr('data-sort', timeStamp);
      //console.log(timeStamp);
      var giftType = childSnapshot.templateName;
      // gift.find('.gift-name').html('Gift to ' + receiver);
      gift.find('.gift-name').html(childSnapshot.giftTitle);
      var status = childSnapshot["status"];
      // gift.find('.gift-status').html(status);
      
      gift.find('.gift-time').html('last modified:  ' + moment(timeStamp).format('LLL'));
      gift.attr('data-gifttype', giftType);
      gift.attr('data-wholegift', JSON.stringify(childSnapshot));

      // fixing the image
      

      if(giftType == "Bigbang")
      {
        //alert(childSnapshot.val().inputs['input6'])
        gift.find('.gift-image img').attr('src',"images/homepage/birthday1.png");
        if (checkImgURL(childSnapshot.inputs['input6'])){
          gift.find('.gift-image img').attr('src',childSnapshot.inputs['input6']);
        }
      }
      if(giftType == "MyGirl")
      {
        //alert(childSnapshot.val().inputs['input3'])
        gift.find('.gift-image img').attr('src',"images/homepage/birthday4.gif");
        //console.log("---");
        //console.log(childSnapshot);
        if(checkImgURL(childSnapshot.inputs['input3'])){
          gift.find('.gift-image img').attr('src',childSnapshot.inputs['input3']);
        }
      }

      var isCompleted = checkPercentCompleted(gift);
      if (isCompleted){
        gift.attr("gift_status", "Completed")
      } else {
        gift.attr("gift_status", "Incompleted")
      }
      if (gift.attr('id') == '-KlDwgayM2KPjVEVUYxk') {
        continue;
      } else {
        gift.appendTo('#gift-manager');
        gift.find('.gift-details').css('background-color', isCompleted ? "#5fcff1" : "#cbd1d8");
      }
    }

    giftTemplate.remove();

    $("#gift-manager .one-gift").sort(function(a,b)
    {
      var A = parseInt($(a).attr('data-sort'));
      var B = parseInt($(b).attr('data-sort'));
      if(A > B) return -1;
      return A<B?1:0;
    }).each(function()
    {
      var u = $(this);
      u.remove();
      $(u).appendTo('#gift-manager');
    });
    
    $('#gift-manager .one-gift').hide();
    $('#gift-manager .one-gift').slice((1-1)*5, 1*5).show();
    $(".pagination").appendTo('#gift-manager');
  });
  function checkImgURL(url) {
    if (url === undefined) return false;
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  function checkVideoURL(url) {
    if (url === undefined) return false;
      return(url.match(/\.(mp4|webm|webm)$/) != null);
  }

  function checkPercentCompleted(gift){
    gift = gift;
    var localGift = gift.data("wholegift");
    var inputs = localGift.inputs;
    var completed = 0;
    var tolalInputs = 0;
    if (localGift.templateName === "MyGirl") {
      tolalInputs = 4;
    } else if (localGift.templateName === "Bigbang"){
      tolalInputs = 7;
    }
    var inputKeys = Object.keys(inputs);
    
    for (var index = 0; index < inputKeys.length; index++){
      if (inputs[inputKeys[index]] == undefined || inputs[inputKeys[index]] == ""){
      } else {
        if (localGift.templateName === "Bigbang"){
          if (inputKeys[index] === "input6"){
            if (checkImgURL(inputs[inputKeys[index]])){
              completed++;
            }
          } else if (inputKeys[index] === "input9"){
            if (inputs[inputKeys[index]] != "" && inputs[inputKeys[index]] != undefined){
              completed++;
            }
          } else {
            completed++;
          }
        } else if (localGift.templateName === "MyGirl"){
          if (inputKeys[index] === "input3"){
            if (checkImgURL(inputs[inputKeys[index]])){
              completed++;
            }
          } else {
            completed++;  
          }
        }
      }
    }
    var percent = Math.round(100.0 * completed / tolalInputs);

    gift.find(".progress-bar")
    .attr("aria-valuenow",percent)
    .css({"width": percent + "%"})
    .text(percent + "%")
    if (percent === 100){
      gift.find(".progress-bar").css({"background-color":"#4CAF50"}).html("Completed")
    }

    return (percent === 100);
  }

  //filter feature
  $('[name="status-option"]').click(function()
  {
    if ($('#filter-christmas-topic input').is(':checked')) return;
    var filterType = this.id.split("-")[1];
    gifts = document.getElementsByClassName("one-gift");
    for(var i=0; i<gifts.length; i++) //start at 1 because we excluding the template
    {
      var giftStatus = gifts[i].getElementsByClassName("progress-bar")[0].innerHTML;
      if (giftStatus !== "Completed") giftStatus = "Incompleted";
      if(giftStatus == filterType || filterType == "All") gifts[i].style.display = "block";
      else gifts[i].style.display = "none";
    }
  });

  $('#filter-christmas-topic').click(function()
  {
    $(".one-gift").hide();
  });

  $('#filter-birthday-topic, #filter-all-topic').click(function()
  {
    $(".one-gift").show();
  });

  $(document).on( "click",".gift-preview", function(event) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      var _url = "Preview/" + gift.dataset.gifttype + ".html?mode=preview&giftid=" + gift.id;
      window.location.href = _url;
    });

	$(document).on( "click",".gift-edit", function( event ) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      var _url = "Editing/" + gift.dataset.gifttype + ".html?mode=editing&giftid=" + gift.id;
      window.location.href = _url;
    });

  var selectedGift;
	$(document).on( "click",".gift-copylink", function( event ) {
        selectedGift = this.parentNode.parentNode.parentNode.parentNode; //really?
        $("#gift-copylink-modal #copy-link-gift-name").html(selectedGift.getElementsByClassName("gift-name")[0].innerHTML);
        var _url = "Preview/" + selectedGift.dataset.gifttype + ".html?mode=receiving&giftid=" + selectedGift.id;
        $("#gift-copylink-modal input").val(window.location.href.split("mygifts.html")[0] + _url);
        
        var giftStatus = $(this).closest(".one-gift").attr("gift_status");
        console.log($(this).closest(".one-gift"));
        if (giftStatus == "Completed") {
          $("#gift-copylink-modal").modal("show");
        } else {
          console.log(giftStatus);
          $("#gift-copylink-modal-incompleted").modal("show");
        }
  });

  $(document).on( "click",".gift-remove", function( event ) {
    selectedGift = this.parentNode.parentNode.parentNode.parentNode; //really?
    $("#gift-remove-modal").modal("show");
  });

  $(document).on("click","#gift-remove-modal .btn-danger", function(event)
  {
    database.ref("gifts/" + selectedGift.id).remove();
    selectedGift.remove();
  });

  $(document).on( "click",".gift-url", function( event ) {
    $(".gift-url").select();
    document.execCommand('copy');
  });
  $(".url-wrapper").mousedown(function(e){ e.preventDefault(); });
  $(".url-wrapper").click(function(e){

  	$(".gift-url").select();
  	//alert("DM");
    document.execCommand('copy');
  })

  $("#copy-link-btn").click(function(e){

    $(".gift-url").select();
    document.execCommand('copy');
    $("#done-copy-btn").notify("Link is copied to the clipboard", { 
      position:"right",
      className: "success",
      showDuration: 400,
      hideAnimation: 'slideUp',
    });

  });

  $(".page-selector").click(function(e){
    e.preventDefault();
    var page = $(this).find('a').html();
    $('#gift-manager .one-gift').hide();
    if(page != '...') $('#gift-manager .one-gift').slice((page-1)*5, page*5).show();
    else $('#gift-manager .one-gift').slice(20).show();
  });


  $(document).on("focusout", "#giftname", function(e){
    var localGift = JSON.parse(this.parentNode.dataset.wholegift); //really?
    var giftID = this.parentNode.id;
    
    if ($(this).html() == ""){
          $(this).html("Untitled gift")
        }
        var newTitle = $.trim($(this).text());

        localGift.giftTitle = newTitle;
        sendToFirebase(localGift, giftID);
  })

  $(document).on("keypress", "#giftname", function(e){ 
    if (e.which === 13) {
          e.preventDefault();
          $(this).blur();   
      }
  })

  function sendToFirebase(localGift, giftID) {
    var updates = {};
    localGift.priority = -Date.now();
    updates["/gifts/" + giftID] = localGift;
    return database.ref().update(updates, function(err){

     
      
      
    });
    
  }
})