var view = new Cortado({

	init: function() {
		console.log('instance init');
		this.listenTo('customEvent', 'render');
		this.count = 1;
	},

	// el: '#myView',

	tagName: 'span',

	className: 'row',

	id: 'cell',

	events: {
		'click': 'clicked'
	},

	ui: {
		b: 'b'
	},

	clicked: function(){
		console.log(this.ui.b.innerText);
		this.trigger('customEvent');
	},

	render: function(){
		this.el.innerHTML = '<b>' + (this.count++) + '</b>';
		this.bindUIElements();
		return this;
	}

});

document.body.appendChild(view.render().el);

// view.close();

// view.remove();