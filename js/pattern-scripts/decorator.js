(function () {

    //Undecorated object constructor
    function CleaningServiceOrder() {
        this.cost = 100;
        this.benefits = ['Fast'];

        this.getCost = function () {
            return this.cost;
        };

        this.getBenefits = function () {
            return this.benefits;
        };

    }

    //Decorator #1
    function VIPServiceDecorator(cleaningServiceOrder) {
        var cost = cleaningServiceOrder.getCost();
        var benefits = cleaningServiceOrder.getBenefits();

        //Notice that constructor function isn't rewrited
        cleaningServiceOrder.getCost = function () {
            return cost + 200;
        };

        cleaningServiceOrder.getBenefits = function () {
            var b = benefits.slice(0);
            b.push('Best quality');
            return b;
        };

    }

    //Decorator #2
    function PremiumServiceDecorator(cleaningServiceOrder) {
        var cost = cleaningServiceOrder.getCost();
        var benefits = cleaningServiceOrder.getBenefits();

        cleaningServiceOrder.getCost = function () {
            return cost + 300;
        };

        cleaningServiceOrder.getBenefits = function () {
            var b = benefits.slice(0);
            b.push('Two vacuum cleaners');
            return b;
        };

    }

    var cso = new CleaningServiceOrder();
    log('Simple order: $' + cso.getCost() + " " + cso.getBenefits().join(','));
    assert(cso.getCost() === 100, 'Not decorated CleaningServiceOrder has cost 100');
    assert(cso.getBenefits().length === 1, 'Not decorated CleaningServiceOrder has only one benefit');

    VIPServiceDecorator(cso);

    log('VIP order: $' + cso.getCost() + " " + cso.getBenefits().join(','));
    assert(cso.getCost() === 300, 'Decorated with VIPServiceDecorator CleaningServiceOrder has cost 300');
    assert(cso.getBenefits().length === 2, 'Decorated with VIPServiceDecorator CleaningServiceOrder has two benefits');

    PremiumServiceDecorator(cso);

    log('Premium order: $' + cso.getCost() + " " + cso.getBenefits().join(','));
    assert(cso.getCost() === 600, 'Decorated with PremiumServiceDecorator CleaningServiceOrder has cost 600');
    assert(cso.getBenefits().length === 3, 'Decorated with PremiumServiceDecorator CleaningServiceOrder has three benefits');

    var cso2 = new CleaningServiceOrder();

    assert(cso2.getCost() === 100, 'CleaningServiceOrder constructor is not modified');

})();