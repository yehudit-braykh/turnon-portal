(function(){
  var MFATitle = document.getElementById("ap_signin_authentication_device_section_title");
  var oldEmail = document.getElementById("ap_email_old");
  if(MFATitle != null || oldEmail != null) {
    var marketingimage = document.getElementById("center-2");
    if(marketingimage != null)
      marketingimage.style.display = 'none';
  }
})();
