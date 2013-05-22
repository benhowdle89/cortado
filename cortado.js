(function(w, d) {
	var cortado = function(options) {
		for (var o in options) {
			this[o] = options[o];
		}
		setEl.call(this);
		if(this.events) delegateEvents.call(this);
		this.init();
	};

	function delegateEvents() {
		for(var e in this.events){
			var parts = e.split(/\s/);
			var type = parts[0];
			var el = parts[1] || this.el;
			var func = this.events[e];
			this.on(type, el, func);
		}
	}

	function setEl() {
		if (this.el) {
			this.el = find(this.el);
		} else {
			this.el = d.createElement('div');
		}
	}

	function find(sel) {
		var el = (typeof sel === 'string') ? d : this.el;
		var r = el.querySelectorAll(sel || '☺'),
			length = r.length;
		return (length == 1) ? r[0] : r;
	}

	cortado.prototype.init = function() {};

	cortado.prototype.$ = function(sel) {
		if (!sel) return;
		return find(sel);
	};

	cortado.prototype.on = function(type, el, cb){
		el = find(el);
		el.addEventListener(type, this[cb], false);
	};

	window.Cortado = cortado;
})(this, document);