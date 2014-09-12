(function($) {

	var app = function() {

		var configuration = {};

		var init = function() {
			$.get({
				url: 'config.json'
			}).then(function(data) {
				configuration = JSON.parse(data);

				$.pubsub.subscribe('app/load', function(file) {
					load(file);
				});

				$.pubsub.subscribe('app/clear', function() {
					clear();
				});

				$('.maxmin').bind('click', function() {
					$().node(this).toggleClass('minimize');
					$('.code').toggleClass('maximized');
				});

				renderApp();
			});
			
		};

		function renderApp() {
			configuration.files.forEach(function(item) {
				new MenuItem(item).appendTo($('.menu'));
			});
		}

		function load(file) {
			$.get({
				url: 'js/pattern-scripts/' + file
			}).then(function(data) {
				renderFile(data);
			});
		}

		function renderFile(data) {

			try {
				eval(data); // jshint ignore:line
			} catch (e) {
				console.log(e);
			}

			$('.code-code').removeClass('hljs').insHTML(data);

			hljs.highlightBlock($('.code-code').elements[0]);
 
		}


		/**
		*	Helper functions for compatibility with old patterns code
		*/
		function assert(assertion, message) {
		  var className = (assertion) ? 'truthy' : 'falsy';
		  log('<li class="' + className +'">' + message + '</li>', 'assertions');
		}

		function log(message, place, clear) {
		  var elem = document.getElementById(place || 'log');
		  if (clear) {
		    elem.innerHTML = '';
		  }
		  elem.innerHTML = elem.innerHTML + '<br>' + message;
		}

		function extend( extension, obj ){
		  for ( var key in extension ){
		    obj[key] = extension[key];
		  }
		}

		function clear() {
			log('', 'log', true);
		    log('', 'assertions', true);
		    log('', 'widget', true);
		}


		init();

		return true;

	}();

	

	function MenuItem(name) {

		var displayName = name.slice(0, -3);


		var item = $('div')
					.insHTML(displayName[0].toUpperCase() + displayName.slice(1))
					.data('file', name)
					.addClass('menuitem')
					.bind('click', function() {

						$.pubsub.publish('app/clear');

						var self = $().node(this);
						$('.menuitem').removeClass('active');
						self.addClass('active');

						$.pubsub.publish('app/load', self.data('file'));
					});

		return item;

	}

})($DW);