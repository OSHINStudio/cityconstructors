var CCI = {};

CCI.app = (function() {

	'use strict';

    // var defaultEaseTime = 1250,
    //     defaultEaseMode = 'easeInOutQuint';

	return {

        init: function() {

            $('#menu-toggle').on('click', function(){
                $('body').toggleClass('menu-open');
            });
        }

    };

}());

$(document).ready(CCI.app.init);