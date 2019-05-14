(function ($) {
    $(window).on('load', function () {

    });

    $(document).ready(function () {
        __has();
        console.log(onLoad());
        
    });

})(jQuery);

let __has =  (data) => {
    let __has = {
        // initialize object
        init : function(){
            this.picker();
            this.book();
            this.menuSlider();
            this.packageSlider();
            this.homeslider();
            this.stickyNav();
            this.scrollit();
            this.aosAnimation();
        },
        aosAnimation : function(){
            AOS.init({
                delay: 300, // values from 0 to 3000, with step 50ms
                duration: 800, // values from 0 to 3000, with step 50ms
                easing: 'ease', // default easing for AOS animations
                once: false, // whether animation should happen only once - while scrolling down
                mirror: false, // whether elements should animate out while scrolling past them
            });
        },
        scrollit : function(){
            $.scrollIt({
                upKey: 38, // key code to navigate to the next section
                downKey: 40, // key code to navigate to the previous section
                easing: 'swing', // the easing function for animation
                scrollTime: 600, // how long (in ms) the animation takes
                activeClass: 'active', // class given to the active nav element
                onPageChange: null, // function(pageIndex) that is called when page is changed
                topOffset: -30 // offste (in px) for fixed top navigation
            });
        },
        stickyNav: function(){
            $(window).scroll(function() {    
                var scroll = $(window).scrollTop();
                if (scroll >= 200) {
                    $(".navbar").addClass("fixed-top");
                } else {
                    $(".navbar").removeClass("fixed-top");
                }
            });
        },
        homeslider: function(){
            $('.home-slider').owlCarousel({
                animateOut: 'fadeOutLeft',
                animateIn: 'fadeInRight',
                items: 1,
                nav: true,
                dots: false,
                autoplayTimeout: 7000,
                autoplaySpeed: 2000,
                autoplay: true,
                loop: true,
                navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
                mouseDrag: true,
                touchDrag: true,
            });
        },

        // Date Picker
        picker : function(){
           // $('[data-select="datepicker"]').datepicker();
        },
        // Package Slider
        packageSlider : function(){
            $('.package-slider').owlCarousel({
                animateOut: 'fadeOutLeft',
                animateIn: 'fadeInRight',
                autoplayTimeout: 7000,
			    autoplaySpeed: 5000,
                items: 1,
                nav: false,
                dots: true,
                autoplay: true,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
            });
        },

        // Turn Js activation
        book : function(){
            $(".pages").turn({
                duration: 1500,
                width: 637,
                height: 445,
                acceleration: true,
                display: 'double',
                turnCorners: "bl,br",
                elevation: 300
            });
        },
        menuSlider : function(){
            $(".food-menu-slider").owlCarousel({
                nav: false,
                dots: true,
                autoplay: true,
                margin: 20,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    768: {
                        items: 2
                    },
                    1000: {
                        items: 2
                    },
                    1200: {
                        items: 1
                    }
                }
        
                });
        }
    };

    // Call The Function
    return __has.init();
};

// Preloader Settings 
let preloader = {
    start : function(classname){
        $(classname).fadeIn('fast');
    },
    stop : function(classname){
        $(classname).fadeOut('slow');
    }
};

// Page Speed On Browser about Application Performance
let onLoad = function() {
    var now = new Date().getTime();
    var page_load_time = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    var messages = "Page loaded in: " + page_load_time / 1000 + ' sec';
    return messages;
};