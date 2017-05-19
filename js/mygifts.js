$( document ).ready(function() {
  
  database.ref("gifts/").orderByChild('priority').once('value', function(snapshot)
  {
    var giftTemplate = $("#gift-template");
    snapshot.forEach(function(childSnapshot)
    {
        //console.log(childSnapshot.val());
        var gift=giftTemplate.clone();
        gift.attr('id', childSnapshot.key);
        // for each gift, now we have to edit its gift-name, gift-status, send-link and remove button.
        var receiver = childSnapshot.val().inputs["input1"];
        if(receiver == "") receiver = "somebody";
        var timeStamp = -childSnapshot.val()['priority'];
        console.log(childSnapshot.key);
        console.log(timeStamp);
        console.log(moment(timeStamp).format('L'));
        var giftType = childSnapshot.val().templateName;
        gift.find('.gift-name').html('Gift to ' + receiver);
        var status = childSnapshot.val()["status"];
        gift.find('.gift-status').html(status);
        gift.find('.gift-details').css('background-color', status == "Completed" ? "#5fcff1" : "#cbd1d8");
        gift.find('.gift-time').html('last modified:  ' + moment(timeStamp).format('LLL'));
        gift.attr('data-gifttype', giftType);

        // fixing the image
        if(giftType == "Bigbang")
        {
          gift.find('.gift-image img').attr('src',childSnapshot.val().inputs['input6']);
        }
        if(giftType == "MyGirl")
        {
          gift.find('.gift-image img').attr('src',childSnapshot.val().inputs['input3']);
        }
        
        gift.appendTo('#gift-manager');
    });
  });

  //filter feature
  $('[name="status-option"]').click(function()
  {
    var filterType = this.id.split("-")[1];
    gifts = document.getElementsByClassName("one-gift");
    for(var i=1; i<gifts.length; i++) //start at 1 because we excluding the template
    {
      var giftStatus = gifts[i].getElementsByClassName("gift-status")[0].innerHTML;
      if(giftStatus == filterType || filterType == "All") gifts[i].style.display = "block";
      else gifts[i].style.display = "none";
    }
  });

  $(document).on( "click",".gift-preview", function(event) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      var _url = "Preview/" + gift.dataset.gifttype + ".html?mode=preview&giftid=" + gift.id;
      window.location.href = _url;
    });

	$(document).on( "click",".gift-edit", function( event ) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      var _url = "Editing/" + gift.dataset.gifttype + ".html?mode=preview&giftid=" + gift.id;
      window.location.href = _url;
    });

  var selectedGift;
	$(document).on( "click",".gift-copylink", function( event ) {
        selectedGift = this.parentNode.parentNode.parentNode.parentNode; //really?
        console.log(window.location.href);
        $("#gift-copylink-modal #copy-link-gift-name").html(selectedGift.getElementsByClassName("gift-name")[0].innerHTML);
        var _url = "Preview/" + selectedGift.dataset.gifttype + ".html?mode=preview&giftid=" + selectedGift.id;
        $("#gift-copylink-modal input").val(window.location.href.split("mygifts.html")[0] + _url);
        
        var giftStatus = selectedGift.getElementsByClassName("gift-status")[0].innerHTML;
        if (giftStatus == "Completed") {
          $("#gift-copylink-modal").modal("show");
        } else {
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

  })
})