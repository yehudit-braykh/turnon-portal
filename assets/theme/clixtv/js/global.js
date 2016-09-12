function resizeInput () {
    $('.fa-search').css('color', '#e61419')
    $('#search-terms').addClass('focused');
    $('#search-terms').focus();
}
function removeInput () {
    $('.fa-search').css('color', 'white')
    $('#search-terms').removeClass('focused');
}
function moveRight (className) {
    $('.'+className+'').addClass('moveLeft')
}
function moveLeft (className) {
    $('.'+className+'').removeClass('moveLeft')
}
function openPreview (category, title) {
    console.log(category);
    $('.episode-info.' + category + '').addClass('open')

}


$('.dropdown').on('show.bs.dropdown', function(e){
   $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
 });

 // ADD SLIDEUP ANIMATION TO DROPDOWN //
 $('.dropdown').on('hide.bs.dropdown', function(e){
   $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
 });

 setInterval(function(){
    var checked = $('input:checked').attr('id').slice(-1)
    if (checked == '6') {
        $('.slider-button').eq(0).prop('checked', true);
    }else {
        $('.slider-button').eq(checked).prop('checked', true);
    }
},3000);
