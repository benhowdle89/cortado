(function(w, d) {
	var cortado = function(options) {
		for (var o in options) {
			this[o] = options[o];
		}
		setEl.call(this);
		if (this.events) delegateEvents.call(this);
		this.init();
	};

	function delegateEvents() {
		for (var e in this.events) {
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
			this.el = d.createElement(this.tagName);
			this.el.classList.add(this.className);
			this.el.id = this.id;
		}
	}

	function find(sel, ctx) {
		var el = (ctx) ? ctx : (typeof sel === 'string') ? d : this.el;
		if (typeof sel !== 'string') return sel;
		var r = el.querySelectorAll(sel || ''),
			length = r.length;
		return (length == 1) ? r[0] : r;
	}

	cortado.prototype.init = function() {};

	cortado.prototype.$ = function(sel) {
		if (!sel) return;
		return find(sel);
	};

	cortado.prototype.on = function(type, el, cb) {
		var _this = this;
		if (el === this.el) {
			el = this.el;
		} else {
			el = find(el, this.el);
		}
		if (!el || el.length === 0) return;
		el.addEventListener(type, function(e){
			_this[cb].call(_this, e);
		}, false);
	};

	cortado.prototype.bindUIElements = function() {
		if (!this.ui) return;

		var that = this;

		if (!this.uiBindings) {
			this.uiBindings = this.ui;
		}

		this.ui = {};
		for (var u in this.uiBindings) {
			var selector = that.uiBindings[u];
			that.ui[u] = find(selector, this.el);
		}
	};

	window.Cortado = cortado;
})(this, document);