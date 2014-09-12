(function () {

    var alerts = (function () {

        var instance;

        function raiseAlert() {

            return {
                raise: function (text) {
                    log(text);
                }
            };

        }

        function _getInstance(options) {
            if (!instance) {
                instance = raiseAlert();
            }
            return instance;
        }

        return {
            getInstance: _getInstance
        };

    })();

    var a = alerts.getInstance();
    var b = alerts.getInstance();

    a.raise('First instance');
    b.raise('Second instance');

    assert(a === b, 'a and b is the same object');
    assert(a.raise === b.raise, 'a.raise and b.raise is the same function');

})();