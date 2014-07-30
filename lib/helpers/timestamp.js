

/*
            // Generate a timestamp
            _.registerHelper('$timestamp', function (context) {
                context = context || {};
                if (!Date.now) return new Date().getTime();
                else return Date.now();
            });

            // Generate random number
            // if no min_max
            // generate random from 0 to 1 decimal
            _.registerHelper('$rand', function (context, options) {
                if (typeof context === 'string') {
                    context = context.split(':');
                    var first = parseFloat(context[0]);
                    var last = parseFloat(context[1]);
                    return Math.floor((Math.random() * (last - first)) + first);
                } else {
                    return Math.random();
                }
            });
*/
