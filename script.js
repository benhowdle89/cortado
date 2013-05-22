var view = new Cortado({

	init: function() {
		console.log('instance init');
	},

	el: '#myView',

	//tagname

	//className

	//id

	events: {
		'click button': 'clicked'
	},

	clicked: function(){
		alert('clicked');
	},

	render: function(){
		return this;
	}

});

document.body.appendChild(view.render().el);