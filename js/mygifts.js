$( document ).ready(function() {
  database.ref("gifts/").once('value', function(snapshot)
  {
    var giftManager = document.getElementById('gift-manager');
    var giftTemplate = document.getElementById('gift-template');
    snapshot.forEach(function(childSnapshot)
    {
        //console.log(childSnapshot.val());
        var gift=giftTemplate.cloneNode(true);
        gift.id=childSnapshot.key;
        // for each gift, now we have to edit its gift-name, gift-status, send-link and remove button.
        var receiver = childSnapshot.val().inputs["input1"];
        if(receiver == "") receiver = "somebody";
        gift.getElementsByClassName("gift-name")[0].innerHTML = "Gift to " + receiver;
        gift.getElementsByClassName("gift-status")[0].innerHTML = childSnapshot.val()["status"];
        giftManager.appendChild(gift);
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
      window.location.href = "Preview/Bigbang.html?giftid=" + gift.id;
    });

	$(document).on( "click",".gift-edit", function( event ) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      window.location.href = "Editing/Bigbang.html?giftid=" + gift.id;
    });

  var selectedGift;
	$(document).on( "click",".gift-copylink", function( event ) {
        selectedGift = this.parentNode.parentNode.parentNode.parentNode; //really?
        console.log(window.location.href);
        $("#gift-copylink-modal #copy-link-gift-name").html(selectedGift.getElementsByClassName("gift-name")[0].innerHTML);
        $("#gift-copylink-modal input").val(window.location.href.split("mygifts.html")[0] + "Preview/Bigbang.html?giftid=" + selectedGift.id);
        
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
  })
})