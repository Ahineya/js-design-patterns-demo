(function () {

    var PubSub = function () {

        var subToken = 0;
        var topics = {};

        this.publish = function (topic, obj) {

            if (!topics[topic]) {
                return false;
            }

            topics[topic].forEach(function (item) {
                item.func(obj);
            });


        };

        this.subscribe = function (topic, callback) {
            /* istanbul ignore else */
            if (!topics[topic]) {
                topics[topic] = [];
            }

            var token = ++subToken;

            topics[topic].push({
                token: token,
                func: callback
            });

            return token;
        };

        this.unsubscribe = function (token) {

            for (var m in topics) {
                /* istanbul ignore else */
                if (topics[m]) {
                    for (var i = 0, l = topics[m].length; i < l; i++) {
                        if (topics[m][i].token === token) {
                            topics[m].splice(i, 1);
                        }
                    }
                }
            }

        };

        this.applyTo = function (obj) {
            if (typeof obj !== 'undefined') {
                obj.publish = this.publish;
                obj.subscribe = this.subscribe;
            }
        };

    };

    window.pubsub = new PubSub();

    var Mediator = function () {
        pubsub.applyTo(this);

        var self = this;

        var modules = {
            counter: new Counter(),
            taskStorage: new TaskStorage(),
            taskInput: new TaskInput(),
            taskOutput: new TaskOutput()
        };

        modules.taskInput.addButton.onclick = function () {
            self.publish('app/task:add', modules.taskInput.taskField.value);
        };

        this.subscribe('app/task:add', function (data) {
            modules.taskStorage.add(data);
            modules.taskOutput.reload();
            modules.counter.reload();
        });

        this.subscribe('app/taskOutput:reload', function () {
            modules.taskOutput.set(modules.taskStorage.getTasks());
        });

        this.subscribe('app/counter:reload', function () {
            modules.counter.set(modules.taskStorage.count());
        });

        modules.taskOutput.reload();
        modules.counter.reload();

    };

    function Counter() {
        pubsub.applyTo(this);
        var self = this;

        var elem = document.createElement('div');
        document.getElementById('widget').appendChild(elem);

        var _reload = function () {
            self.publish('app/counter:reload');
        };

        var _set = function (value) {
            elem.innerHTML = 'Task count:' + value;
        };

        _set(0);

        return {
            set: _set,
            reload: _reload
        };

    }

    function TaskStorage() {
        pubsub.applyTo(this);
        var self = this;

        var tasks = [
            'First task',
            'Second task'
        ];

        var _add = function (task) {
            if ((task.trim() !== '') && (!~tasks.indexOf(task))) {
                tasks.push(task);
            }
        };
        var _count = function () {
            return tasks.length;
        };
        var _getTasks = function () {
            return tasks;
        };

        return {
            add: _add,
            count: _count,
            getTasks: _getTasks
        };

    }

    function TaskInput() {
        pubsub.applyTo(this);

        var _addButton = document.createElement('button');
        _addButton.innerText = 'Add task';
        document.getElementById('widget').appendChild(_addButton);

        var _taskField = document.createElement('input');
        document.getElementById('widget').appendChild(_taskField);

        return {
            addButton: _addButton,
            taskField: _taskField
        };
    }

    function TaskOutput() {
        pubsub.applyTo(this);
        var self = this;

        var _reload = function () {
            self.publish('app/taskOutput:reload');
        };

        var _set = function (tasks) {
            log('', 'log', true);
            tasks.forEach(function (task) {
                log(task);
            });
        };

        return {
            reload: _reload,
            set: _set
        };

    }

    var app = new Mediator();

})();