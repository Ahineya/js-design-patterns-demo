(function () {

    function extend(receiving, giving, methods) {
        if (!!methods) {
            methods.forEach(function (method) {
                receiving.prototype[method] = giving.prototype[method];
            });
        } else {
            for (var method in giving.prototype) {
                if (!Object.hasOwnProperty.call(receiving.prototype, method)) {
                    receiving.prototype[method] = giving.prototype[method];
                }
            }
        }
    }

    var Message = function (message) {
        this.message = message || 'Default message';

        this.show = function () {
            log(this.message);
        };

    };

    var Mixin = function () {
    };

    Mixin.prototype = {
        showStrong: function () {
            log('<strong>' + this.message + '</strong>');
        },
        showItalic: function () {
            log('<em>' + this.message + '</em>');
        }
    };

    extend(Message, Mixin, ['showItalic']);

    var m = new Message('Test');
    m.show();
    m.showItalic();

    assert(typeof m.showItalic === 'function', 'Type of function mixed in is \'function\'');
    assert(typeof m.showStrong === 'undefined', 'Type of not mixed function is \'undefined\'');

})();