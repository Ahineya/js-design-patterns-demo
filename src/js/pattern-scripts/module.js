(function () {

    var MessageTemplate = (function () {
        var templateString = "";
        var builtTemplate = "";

        function build(model) {
            for (var key in model) {
                var regex = new RegExp('{' + key + '}');
                templateString = templateString.replace(regex, model[key]);
            }
            builtTemplate = templateString.replace(/{.*}/, '');
        }

        function placeAt(id) {
            document.getElementById(id).innerHTML = builtTemplate;
        }

        return {
            setFromString: function (str) {
                templateString = str.trim();
                return this;
            },
            setFromDom: function (id) {
                templateString = document.getElementById(id).innerHTML;
                return this;
            },
            place: function (model, id) {
                build(model);
                placeAt(id);
                return this;
            }
        };

    })();

    MessageTemplate
        .setFromString('<strong>{name}: </strong>{message}{time}')
        .place({
            name: 'User',
            message: 'Hello'
        }, 'log');

    assert(
        MessageTemplate.hasOwnProperty('setFromString'),
        'MessageTemplate has public property \'setFromString\''
    );

    assert(
        !MessageTemplate.hasOwnProperty('build'),
        'build function is a private method in MessageTemplate'
    );

})();