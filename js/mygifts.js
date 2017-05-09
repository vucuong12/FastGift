$( document ).ready(function() {
  database.ref("gifts/").once('value', function(snapshot)
  {
    var giftManager = document.getElementById('gift-manager');
    var giftTemplate = document.getElementById('gift-template');
    snapshot.forEach(function(childSnapshot)
    {
        var gift=giftTemplate.cloneNode(true);
        gift.id=childSnapshot.key;
        // for each gift, now we have to edit its gift-name, gift-status, send-link and remove button.
        // setname
        gift.getElementsByClassName("gift-name")[0].innerHTML = childSnapshot.key;
        gift.getElementsByClassName("gift-status")[0].innerHTML = childSnapshot.val()["status"];
        giftManager.appendChild(gift);
    });
  });

  $(document).on( "click",".gift-preview", function(event) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      window.location.href = "Preview/Bigbang.html?giftid=" + gift.id;
    });

	$(document).on( "click",".gift-edit", function( event ) {
      var gift = this.parentNode.parentNode.parentNode.parentNode; //really?
      window.location.href = "Editing/Bigbang.html?giftid=" + gift.id;
    });

    // $('#gift-copylink-modal').on('shown.bs.modal', function() {
    //     $(".gift-url").select();
    //     document.execCommand('copy');
    //   })

	$(document).on( "click",".gift-copylink", function( event ) {
      $("#gift-copylink-modal").modal("show");
      
      
    });

    $(document).on( "click",".gift-remove", function( event ) {
      $("#gift-remove-modal").modal("show");
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