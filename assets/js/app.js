var CCI = {};

CCI.app = (function() {

    'use strict';

    var defaultEaseTime = 1250,
        defaultEaseMode = 'easeInOutQuint';

    return {

        init: function() {

            $('#menu-toggle').on('click', function() {
                $('body').toggleClass('menu-open');

                return false;
            });

            $('#slider').cycle({
                log: false,
                speed: 600,
                prev: '#slider-prev',
                next: '#slider-next',
                swipe: true
            });

            $('#nav a').on('click', function() {
                var $dis = $(this),
                    $whichHref = $dis.attr('href');

                CCI.app.scrolltoElement($($whichHref));

                $('body').removeClass('menu-open');
                
                return false;
            });

            // $('#contact-form input[type="submit"]').on('click', function(){

            //     $.ajax({
            //         url : './inc/ajax-submit.php',
            //         type: 'POST',
            //         // data : formData,
            //         success: function(data, textStatus, jqXHR)
            //         {
            //             //data - response from server
            //             console.log(data);
            //         },
            //         error: function (jqXHR, textStatus, errorThrown)
            //         {
            //             console.log('error: ' + errorThrown);
            //         }
            //     });

            //     return false;

            // });

        },

        scrolltoElement: function($selector, $offset) {
            if (!$selector) {
                return;
            } else {
                if (!$offset) {
                    $offset = 100;
                }

                $('html, body').animate({
                    scrollTop: $($selector).offset().top - $offset
                }, defaultEaseTime / 2, defaultEaseMode);
            }
        }

    };

}());

$(document).ready(CCI.app.init);