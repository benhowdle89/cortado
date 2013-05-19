(function(w, d) {
	var cortado = function(options) {
		for (var o in options) {
			this[o] = options[o];
		}
		this.el = this.el || document.createElement('div');
		this.init();
	};

	function find(sel) {
		var r = this.el.querySelectorAll(sel || '☺'),
			length = r.length;
		return (length == 1) ? r[0] : r;
	}

	cortado.prototype.init = function() {};

	cortado.prototype.$ = function(sel) {
		if (!sel) return;
		return find(sel);
	};

	window.Cortado = cortado;
})(this, document);