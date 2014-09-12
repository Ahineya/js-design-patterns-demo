(function () {

    //Define list of observers --------------
    function ObserverList() {
        this.observerList = [];
    }

    ObserverList.prototype.add = function (obj) {
        return this.observerList.push(obj);
    };

    ObserverList.prototype.count = function () {
        return this.observerList.length;
    };

    ObserverList.prototype.get = function (index) {
        if (index > -1 && index < this.observerList.length) {
            return this.observerList[index];
        }
    };

    ObserverList.prototype.indexOf = function (obj, startIndex) {
        var i = startIndex;

        while (i < this.observerList.length) {
            if (this.observerList[i] === obj) {
                return i;
            }
            i++;
        }

        return -1;

    };

    ObserverList.prototype.removeAt = function (index) {
        return this.observerList.splice(index, 1);
    };

    //Define Subject object ------------------------------------
    function Subject() {
        this.observers = new ObserverList();
    }

    Subject.prototype.addObserver = function (observer) {
        this.observers.add(observer);
    };

    Subject.prototype.removeObserver = function (observer) {
        this.observers.removeAt(this.observers.indexOf(observer), 0);
    };

    Subject.prototype.notify = function (context) {
        var observerCount = this.observers.count();
        for (var i = 0; i < observerCount; i++) {
            this.observers.get(i).update(context);
        }
    };

    function Observer() {
        this.update = function () {
        };
    }

    var widget = $('#log');
    $('button').attr('id', 'addNewObserver').insHTML('Add New Observer checkbox').appendTo( widget );
    $('input').attr('id', 'mainCheckbox').attr('type', 'checkbox').appendTo( widget );
    $('div').attr('id', 'observersContainer').appendTo( widget );



    var addBtn = document.getElementById("addNewObserver"),
        controlCheckbox = document.getElementById("mainCheckbox"),
        container = document.getElementById("observersContainer");

    extend(new Subject(), controlCheckbox);

    controlCheckbox.onclick = function () {
        controlCheckbox.notify(controlCheckbox.checked);
    };

    addBtn.onclick = addNewObserver;

    function addNewObserver() {
        var check = document.createElement('input');
        check.type = 'checkbox';

        extend(new Observer(), check);

        check.update = function (value) {
            this.checked = value;
        };

        controlCheckbox.addObserver(check);
        container.appendChild(check);

    }

})();