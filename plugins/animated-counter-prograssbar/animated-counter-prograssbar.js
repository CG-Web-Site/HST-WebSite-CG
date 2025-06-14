
;(function($) {
    'use strict'

    // Animated Prograssbar
    $("#progress-bar, #progress-bar2 , #progress-bar3 ,#progress-bar4").each(function () {
    $(this)
        .find(".progress-fill")
        .animate(
        {
            width: $(this).attr("data-percentage"),
        },
        6000
        );

    $(this)
        .find(".progress-number-mark")
        .animate(
        { left: $(this).attr("data-percentage") },
        {
            duration: 6000,
            step: function (now, fx) {
            var data = Math.round(now);
            $(this)
                .find(".percent")
                .html(data + "%");
            },
        }
        );
    });
})(jQuery)