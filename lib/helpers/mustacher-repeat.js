/**

 http://handlebarsjs.com/block_helpers.html

*/
'use strict';

var MustacherRepeatHelper;

MustacherRepeatHelper = (function () {


    function MustacherRepeatHelper() {}

    MustacherRepeatHelper.prototype.compile = function(context,options)
    {
        console.log( context );
        console.log( options );
        return options.fn(context);
    };

    /*
    _.registerHelper('repeat', function (context, extras, options) {
        var r = "",
            d = {};

        if (arguments.length > 1) {

            if (arguments.length <= 2) {
                context = context;
                options = extras;
                extras = {};
            }

            extras = parseContext(extras);

            if (_.Utils.isFunction(context)) {
                context = context.call(this);
            }

            if (options.data) {
                d = _.createFrame(options.data);
            }

            var counts = [];
            var length = parseFloat(context);
            for (var j = 0; j < length; j++) {
                var is_odd = (j % 2);
                counts.push({
                    count: (j + 1),
                    odd: is_odd,
                    even: !is_odd
                });
            }
            for (var i = 0; i < length; i++) {
                if (d) {
                    d.index = i;
                    d.first = (i === 0);
                    d.last = (i === (length - 1));
                }
                r += options.fn(counts[i], {
                    data: d
                });
            }
            return r;
        } else {
            return false;
        }
    });
    */

})();

module.exports = new MustacherRepeatHelper();
