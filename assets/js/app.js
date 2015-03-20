var CCI = {};

CCI.app = (function() {

	'use strict';

    var defaultEaseTime = 1250,
        defaultEaseMode = 'easeInOutQuint';

	return {

        init: function() {

            $('#menu-toggle').on('click', function(){
                $('body').toggleClass('menu-open');
            });

            $('#slider').cycle({
                log:false,
                speed: 600,
                prev: '#slider-prev',
                next: '#slider-next',
                swipe: true
            });

            $('#nav a').on('click', function(){
                var $dis = $(this),
                    $whichHref = $dis.attr('href');

                CCI.app.scrolltoElement($($whichHref));
            });
        }, 

        scrolltoElement: function($selector,$offset) {
            if(!$selector) {
                return;
            }
            else
            {
                if(!$offset) {
                    $offset = 0;
                }

                $('html, body').animate({scrollTop:$($selector).offset().top-$offset}, defaultEaseTime/2, defaultEaseMode);
            }
        }

    };

}());

$(document).ready(CCI.app.init);