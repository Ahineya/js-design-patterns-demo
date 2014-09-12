(function () {

    function User(options) {
        this.options = options || {};
        this.name = this.options.name || 'Dummy';

        this.sayHi = function () {
            log('Hi, I am ' + this.name + '!');
        };

    }

    User.prototype.sayHello = function () {
        log('Hello, I am ' + this.name + '!');
    };

    var user1 = new User({name: "User1"});
    var user2 = new User({name: "User2"});

    assert(user1.name === 'User1', 'The name property of user1 is \'User1\'');
    assert(user2.name === 'User2', 'The name property of user2 is \'User2\'');

    user1.sayHi();
    user2.sayHi();

    assert(user1.hasOwnProperty('sayHi'), 'user1 has own property \'sayHi\'');
    assert(user2.hasOwnProperty('sayHi'), 'user2 has own property \'sayHi\'');

    user1.sayHello();
    user2.sayHello();

    assert(!user1.hasOwnProperty('sayHello'), 'user1 hasn\'t own property \'sayHello\'');
    assert(!user2.hasOwnProperty('sayHello'), 'user2 hasn\'t own property \'sayHello\'');

})();