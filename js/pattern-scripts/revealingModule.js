(function () {

    var ItemList = function () {
        var items = [];

        function _add(item) {
            items.push(item);
        }

        function _get() {
            return {
                items: items,
                count: items.length
            };
        }

        function _build() {
            var data = _get();

            var container = $('ul');

            for (var i = 0; i < data.count; i++) {
                $('li')
                    .addClass('test')
                    .insHTML(data.items[i])
                    .appendTo(container);
            }

            return container;

        }

        return {
            add: _add,
            getNodes: _build
        };

    }();

    ItemList.add('Lemon');
    ItemList.add('Apple');
    ItemList.add('Tomato');

    ItemList.getNodes().appendTo($('#log'));

    assert(ItemList.hasOwnProperty('add'), 'ItemList has public property \'add\'');
    assert(!ItemList.hasOwnProperty('_add'), 'ItemList has private property \'_add\'');

})();