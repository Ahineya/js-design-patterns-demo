(function () {

//Data variable --------------------------------------
    var data = [
        {
            text: 'Settings:'
        },
        {
            type: 'SETTING_CHECKBOX',
            text: 'Show my master password to all people',
            value: 1
        },
        {
            type: 'SETTING_CHECKBOX',
            text: 'Order free horse mask',
            value: 1
        },
        {
            type: 'SETTING_INPUT',
            text: 'My name is'
        },
        {
            type: 'SETTING_RADIO',
            text: 'My gender',
            name: 'gender',
            options: [
                {
                    value: 'm',
                    text: 'Male'
                },
                {
                    value: 'f',
                    text: 'Female'
                },
                {
                    value: 'n',
                    text: 'I\'m not sure'
                }
            ]
        }
    ];
    
  // minimal helpers to escape html
    function escapeHtml(string) {
        var entityMap = {
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;'
        };
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }

//Widget classes -------------------------------------------

    function CheckboxSettingWidget(data) {
        var html = escapeHtml("<input type='checkbox' value='" + data.value + "'>" + data.text);

        this.getLayout = function () {
            return html;
        };

    }

    function InputSettingWidget(data) {
        var html = escapeHtml(data.text + ": <input type='text' value='" + (data.value || '') + "'>");

        this.getLayout = function () {
            return html;
        };

    }

    function RadioSettingWidget(data) {
        var html = data.text + ":";
        html += escapeHtml("<input type='radio' name='" + data.gender + "' value='" + data.options[0].value + "'>" + data.options[0].text);
        html += escapeHtml("<input type='radio' name='" + data.gender + "' value='" + data.options[1].value + "'>" + data.options[1].text);
        html += escapeHtml("<input type='radio' name='" + data.gender + "' value='" + data.options[2].value + "'>" + data.options[2].text);

        this.getLayout = function () {
            return html;
        };

    }

    function PlainTextSettingWidget(data) {
        var text = data.text;

        this.getLayout = function () {
            return text;
        };

    }

//Factory class ------------------------------------------

    var WidgetFactory = function () {
        var classes = {
            SETTING_CHECKBOX: CheckboxSettingWidget,
            SETTING_INPUT: InputSettingWidget,
            SETTING_RADIO: RadioSettingWidget,
            SETTING_PLAINTEXT: PlainTextSettingWidget
        };

        var defaultWidget = classes.SETTING_PLAINTEXT;

        function _build(data) {
            var widgetClass = classes[data.type] || defaultWidget;
            return new widgetClass(data);
        }

        return {
            build: _build
        };

    };

//App --------------------------------------

    var widgetFactory = new WidgetFactory();
    for (var i = 0; i < data.length; i++) {
        log(escapeHtml('<hr>') + widgetFactory.build(data[i]).getLayout());
    }

    log(escapeHtml('<hr>'));

    var o = widgetFactory.build(data[0]);
    assert(o instanceof PlainTextSettingWidget, 'First object from factory is instance of PlainTextSettingWidget');
    o = widgetFactory.build(data[1]);
    assert(o instanceof CheckboxSettingWidget, 'Second object from factory created with another data is instance of CheckboxSettingWidget');

})();
