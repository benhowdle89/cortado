var view = new Cortado({

	init: function() {
		console.log('instance init');
	},

	render: function(){
		this.el.innerHTML = 'hi';
		return this;
	}

});

document.body.appendChild(view.render().el);