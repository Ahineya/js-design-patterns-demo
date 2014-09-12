(function () {

    (function (window) {
        var DOMWork = function () {
            this.elements = [];
        };

        function DW(selector) {

            /**
             * Facade goes here
             */
            if (!!selector) {
                switch (selector[0]) {
                    case '.':
                        return new DOMWork().byClass(selector.substr(1));
                    case '#':
                        return new DOMWork().byId(selector.substr(1));
                    default:
                        return new DOMWork().createByTag(selector);
                }
            }

            return new DOMWork();
        }

        DOMWork.prototype.getById = DOMWork.prototype.byId = function (id) {
            this.elements = [];
            this.elements.push(document.getElementById(id));
            return this;
        };

        DOMWork.prototype.getByClass =
            DOMWork.prototype.byClass =
                function (className) {
                    var elements = document.getElementsByClassName(className);
                    this.elements = [].slice.call(elements, 0);
                    return this;
                };

        DOMWork.prototype.createByTag = function (tag) {
            this.elements = [];
            this.elements.push(document.createElement(tag));
            return this;
        };

        DOMWork.prototype.color = function (color) {
            this.elements.forEach(function (elem) {
                elem.style.color = color;
            });
            return this;
        };

        window.fDW = DW;

    })(window);

    var container = $('ul');

    $('li').attr('id', 'test').insHTML('Test by Id').appendTo(container);
    $('li').addClass('test').insHTML('Test by class').appendTo(container);
    $('li').addClass('test').insHTML('Test by class').appendTo(container);

    container.appendTo($('#log'));

    fDW().byClass('test').color('red');
    fDW().byId('test').color('blue');


    fDW('#test').color('orange');
    fDW('.test').color('green');


})();