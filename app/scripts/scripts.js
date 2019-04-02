(function ($) {

    $(window).on('load', function () {
        // code to execute 
        onLoad();

    });

    $(document).ready(function () {
        __has();
    });

})(jQuery);

let __has =  (data, $) => {
    $ = jQuery;
    let __has = {
        init : ()=>{}
    };
    // Call The Function
    return __has.init();
};

// Page Speed On Browser about Application Performance
let onLoad = ()=> {
    var now = new Date().getTime();
    var page_load_time = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log("Page loaded in: " + page_load_time / 1000 + ' sec');
};

console.log(Modernizr.webp? 'yes' : 'no');

if (Modernizr.canvas) {
    alert("This browser supports HTML5 canvas!");
  }