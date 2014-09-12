(function () {

    //Sample data
    var data = [
        {
            command: 'expand',
            width: 10
        },
        {
            command: 'squeeze',
            width: 100
        },
        {
            command: 'expandWidth',
            width: 150
        },
    ];

    //Ajax mock
    var Ajax = {
        get: function () {
            return data;
        }
    };

    /**
     * Object with command pattern.
     * Notice that commandObject objects implements same interface
     */
    var Visualisation = {
        elem: document.createElement('div'),
        init: function () {
            var elem = this.elem;
            elem.style.width = '100px';
            elem.style.height = '100px';
            elem.style.backgroundColor = '#FACE8D';
            document.getElementById('widget').appendChild(elem);
        },
        expand: function (length) {
            var sizeW = parseInt(this.elem.style.width) + length + 'px',
                sizeH = parseInt(this.elem.style.height) + length + 'px';
            this.elem.style.width = sizeW;
            this.elem.style.height = sizeH;
            return sizeW + sizeH;
        },

        squeeze: function (length) {
            var sizeW = parseInt(this.elem.style.width) - length + 'px',
                sizeH = parseInt(this.elem.style.height) - length + 'px';
            this.elem.style.width = sizeW;
            this.elem.style.height = sizeH;
            return sizeW + sizeH;
        },

        expandWidth: function (length) {
            var size = parseInt(this.elem.style.width) + length + 'px';
            this.elem.style.width = size;
            return size;
        },

        expandHeight: function (length) {
            var size = parseInt(this.elem.style.height) + length + 'px';
            this.elem.style.height = size;
            return size;
        }

    };

    Visualisation.execute = function (commandObject) {

        var command = commandObject.command,
            args = [commandObject.width];

        log(command + ': ' + args.join(','));
        return Visualisation[command].apply(Visualisation, args);

    };

    var block = Visualisation;

    block.init();

    assert(block.elem.style.width === '100px', 'Initial width of block is 100px');
    assert(block.elem.style.height === '100px', 'Initial height of block is 100px');

    var commands = Ajax.get('/transformations');

    commands.forEach(function (command) {
        block.execute(command);
    });

    block.execute(commands[0]);
    block.execute({command: 'squeeze', width: 10});
    block.execute({command: 'expandHeight', width: 100});

    assert(block.elem.style.width === '160px', 'Width of block after transformations is 160px');
    assert(block.elem.style.height === '110px', 'Height of block after transformations is 110px');

    assert(block.execute({command: 'expandWidth', width: 100}) === '260px', 'Executed commands can return values');

})();