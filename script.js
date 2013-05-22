var view = new Cortado({

	init: function() {
		console.log('instance init');
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
	},

	render: function(){
		this.el.innerHTML = '<b>click here</b>';
		this.bindUIElements();
		return this;
	}

});

document.body.appendChild(view.render().el);