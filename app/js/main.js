$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded'); 
});

$(document).ready(function(){

// Wow animation
// https://github.com/matthieua/WOW

var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();

// **

// Slider
// http://kenwheeler.github.io/slick/

$('.single-item').slick();
// **

});
        var topShow = 150;
        var delay = 1000;
        $(document).ready(function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > topShow ) $('#goTop').fadeIn();
                else $('#goTop').fadeOut();
            });
            $('#goTop').click(function(){
                $('body,html').animate({
                    scrollTop: 0
                }, delay);
            });
        });
    $(document).ready(function() {
        $('.slider').slick({
            slidesToShow: 1,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 3000,
            prevArrow: '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            nextArrow: '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
            pauseOnHover: false,
        });
        $('.clients-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            dots: true,
            pauseOnHover: false,
        });
    });

    $(window).load(function(){
        $window = $(window),
        $menu = $(".header-menu"),
        menuTop = $menu.position().top,
        $menu.addClass('fixed');

        $window.scroll(function(event){
            scrollTop = $window.scrollTop(),
            topPosition = Math.max(0, menuTop - scrollTop),
            $menu.css('top', topPosition);
        });
    });