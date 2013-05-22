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

	function unbind(ele) {
		ele.parentNode.replaceChild(ele.cloneNode(true), ele);
	}

	function removeEl(el) {
		el.parentNode.removeChild(el);
	}

	cortado.fn = cortado.prototype;

	cortado.fn.init = function() {};

	cortado.fn.$ = function(sel) {
		if (!sel) return;
		return find(sel);
	};

	cortado.fn.listenTo = function(type, cb) {
		this.on(type, this.el, cb);
	};

	cortado.fn.trigger = function(type, data) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(type, true, true);
		event.data = data || {};
		event.eventName = type;
		event.target = this;
		this.el.dispatchEvent(event);
	};

	cortado.fn.on = function(type, el, cb) {
		var _this = this;
		if (el === this.el) {
			el = this.el;
		} else {
			el = find(el, this.el);
		}
		if (!el || el.length === 0) return;
		el.addEventListener(type, function(e) {
			_this[cb].call(_this, e);
		}, false);
	};

	cortado.fn.close = function() {
		this.removeEvents();
	};

	cortado.fn.remove = function() {
		removeEl(this.el);
	};

	cortado.fn.bindUIElements = function() {
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

	cortado.fn.removeEvents = function() {
		for (var e in this.events) {
			var parts = e.split(/\s/);
			var type = parts[0];
			var el = parts[1] || this.el;
			unbind(el);
		}
	};

	window.Cortado = cortado;
})(this, document);