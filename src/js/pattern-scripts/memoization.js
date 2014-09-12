(function() {
  
  var flags = {};
  
  function memoize( fn, performTests ) {
    flags[fn.name] || (flags[fn.name] = true ); // jshint ignore:line
    
    return function () {
      var args = Array.prototype.slice.call(arguments),
          hash = "",
          i = args.length,
          currentArg = null;
      while (i--) {
        
        currentArg = args[i];
        
        hash += (currentArg === Object(currentArg)) ?
                JSON.stringify(currentArg) : 
                currentArg;
                
        fn.memoize || (fn.memoize = {}); // jshint ignore:line
      }
      
      if (performTests)
        if (!(hash in fn.memoize)) {
          flags[fn.name] = false;
          assert(!(hash in fn.memoize), 'First time ' + fn.name + ' return value is calculated');
        } else {
          assert((hash in fn.memoize), 'Second time ' + fn.name + ' return value is taken from hash');
        }
      
      return (hash in fn.memoize) ? 
              fn.memoize[hash] :
              fn.memoize[hash] = fn.apply(this, args);
      
    };
    
  }
  
  function add( a, b ) {
    return a + '+' +b+ ' = ' + (a + b);
  }
  
  function fib( x ) {
    if(x < 2) return 1; else return fib(x-1) + fib(x-2);
  }
  
  
  
  log(add(10, 15));
  add = memoize(add, true); // jshint ignore:line
  
  log(add(10, 15));
  log(add(10, 15));
  
  log('');
  
  fib = memoize(fib); // jshint ignore:line
  console.time("non-memoized call");
  log('1000 fibonacci number is ' + fib(1000));
  console.timeEnd("non-memoized call");
  
  console.time("memoized call");
  log('1000 fibonacci number is ' + fib(1000));
  console.timeEnd("memoized call"); 
  
  console.time("second memoized call");
  log('1000 fibonacci number is ' + fib(1100)); 
  console.timeEnd("second memoized call"); 
  
  
  
})();