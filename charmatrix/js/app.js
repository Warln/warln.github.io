Vue.filter('todots', function(value){
	var val = value.replace(/0/g, this.dotsStyle.current[0]);
	return val.replace(/1/g, '<span class="cdot">' + this.dotsStyle.current[1] + '</span>') + '<br>';
});
Vue.filter('tohex', function(value){
	var hexv = [], len = value.length;
	for(var i = 0; i < len; i++){
		hexv.push('0x' + parseInt(value[i], 2).toString(16));
	}
	return hexv;
});
var V = new Vue({
	el: 'body',
	data: {
		strs: {
			chars: '字狐狸精神果醋',
			currentChar: '醋',
			direct: [0, 0, 0, 0, 0, 0, 0]
		},
		cvsCtx: document.querySelector('#cvs').getContext('2d'),
		mtrCtx: document.querySelector('#mtr').getContext('2d'),
		grid: {
			cellW: 40,
			cellH: 40,
			maxW: 320,
			maxH: 320
		},
		matrix: {
			rows: 16,
			columns: 16,
			rowcols: 16,
			shows: false,
			getby: 'byrow',
			dt: [],
			threshold: .47
		},
		ft: {
			style: 'normal',
			variant: 'normal',
			weight: '100',
			size: '',
			family: 'monospace'
		},
		dotsStyle: {
			sw: 0,
			current: ['◯', '⚫'],
			libs: {
				dot: ['◯', '⚫'],
				tigon: ['△', '▲'],
				dice: ['□', '■'],
				diamond: ['◇', '◆'],
				fourmanstar: ['✧', '✦'],
				pentacle: ['✩', '★']
			}
		}
	},
	computed: {
		vv: function(){
			return new vcv(
				this.cvsCtx,
				(
					this.matrix.rows * this.grid.cellW >= this.grid.maxW
						? this.grid.maxW
						: this.matrix.rows * this.grid.cellW
				) + 'px',
				(
					this.matrix.columns * this.grid.cellH >= this.grid.maxH
						? this.grid.maxH
						: this.matrix.columns * this.grid.cellH
				) + 'px'
			);
		},
		mtr: function(){
			return new vcv(
				this.mtrCtx,
				(
					this.matrix.rows * this.grid.cellW >= this.grid.maxW
						? this.grid.maxW
						: this.matrix.rows * this.grid.cellW
				) + 'px',
				(
					this.matrix.columns * this.grid.cellH >= this.grid.maxH
						? this.grid.maxH
						: this.matrix.columns * this.grid.cellH
				) + 'px'
			);
		},
		dots: function(){
			var mdt = this.matrix.dt;
			var mdtlen = mdt.length;
			var val = [];
			for(var i = 0; i < mdtlen; i++){
				val.push(mdt[i]);
			}
			for(var indx in val){
				if(val.hasOwnProperty(indx)){
					val[indx] = val[indx].replace(/0/g, this.dotsStyle.current[0]);
					val[indx] = val[indx].replace(/1/g, this.dotsStyle.current[1]);
				}
			}
			return val;
		}
	},
	methods: {
		crntChar: function(evt){
			var evt = evt || window.event;
			var tgt = evt.target || ev.srcElement;
			this.strs.currentChar = tgt.innerText;
		},
		swDotsStyle: function(){
			var styleLibs = this.dotsStyle.libs;
			var styles = [];
			for(var style in styleLibs){
				if(styleLibs.hasOwnProperty(style)){
					styles.push(style);
				}
			}
			this.dotsStyle.current = styleLibs['' + styles[this.dotsStyle.sw++]];
			this.dotsStyle.sw = this.dotsStyle.sw === styles.length ? 0 : this.dotsStyle.sw;
		},
		reversedrow: function(){
			for(var c in this.matrix.dt){
				if(this.matrix.dt.hasOwnProperty(c)){
					//this.matrix.dt.splice(c, 1, this.matrix.dt[c].reverse());
					//this.matrix.dt[c] = this.matrix.dt[c].reverse();
				}
			}
		},
		reversedcolumn: function(){
			for(var c in this.matrix.dt){
				if(this.matrix.dt.hasOwnProperty(c)){
					this.matrix.dt[c] = this.matrix.dt[c].reverse(0);
				}
			}
		},
		swBin: function(evt){
			var evt = evt || window.event;
			var tgt = evt.target || evt.srcElement;
			var pos = tgt.getContext('2d').getMousePos(evt);
			var r = ~~(pos.x / (this.mtr.canvas.width/this.matrix.rows));
			var c = ~~(pos.y / (this.mtr.canvas.height/this.matrix.columns));
			var dtc = this.matrix.dt[c].split('');
			dtc[r] = dtc[r] == 0 ? 1 : 0;
			this.matrix.dt.splice(c, 1, dtc.join(''));
		},
		rtt: function(evt){
			var evt = evt || window.event;
			var tgt = evt.target || evt.srcElement;
			var chr = tgt.innerText;
			var indx = this.strs.chars.indexOf(chr);
			this.strs.direct[indx] = +this.strs.direct[indx] + 90;
			tgt.style.transform = 'rotate(' + this.strs.direct[indx] +'deg)';
			/*
			tgt.style.msTransform = 'rotate(' + this.strs.direct[indx] +'deg)';
			tgt.style.mozTransform = 'rotate(' + this.strs.direct[indx] +'deg)';
			tgt.style.webkitTransform = 'rotate(' + this.strs.direct[indx] +'deg)';
			tgt.style.oTransform = 'rotate(' + this.strs.direct[indx] +'deg)';
			*/
			this.strs.direct[indx] = this.strs.direct[indx] === 360 ? 0 : this.strs.direct[indx];
		}
	},
	watch: {
		'strs.chars': function(current, prev){
			var len = current.length;
			this.strs.currentChar = len > 0 ? current[len - 1] : 'A';
		},
		'strs.currentChar': function(current, prev){
			this.matrix.dt = this.vv.refresh(current, this.matrix.rows, this.matrix.columns);
		},
		'matrix.rows': function(current, prev){
			this.matrix.dt = this.vv.refresh(this.strs.currentChar, current, this.matrix.columns);
		},
		'matrix.columns': function(current, prev){
			this.matrix.dt = this.vv.refresh(this.strs.currentChar, this.matrix.rows, current);
		},
		'matrix.rowcols': function(current, prev){
			this.matrix.dt = this.vv.refresh(this.strs.currentChar, current, current);
			this.matrix.rows = current;
			this.matrix.columns = current;
		},
		'matrix.threshold': function(current, prev){
			this.matrix.dt = this.vv.refresh(this.strs.currentChar, this.matrix.rows, this.matrix.columns, current);
		},
		'matrix.getby': function(current, prev){
			this.matrix.dt = this.vv.refresh(this.strs.currentChar, this.matrix.rows, this.matrix.columns, current);
		},
		'dots': function(current, prev){
			this.mtr.clearAll();
			this.mtr.bhatch(current.join(''), current.length, current.join('').length/current.length);
		}
	},
	ready: function(){
		//在Canvas上绘制网格
		this.vv.drawGrid(this.matrix.rows, this.matrix.columns);
		//在Canvas上绘制文字
		this.vv.drawText(this.strs.currentChar);
		//在对应网格单元中绘制出二值化后的文本值
		this.matrix.dt = this.vv.refresh(this.strs.currentChar, this.matrix.rowcols, this.matrix.rowcols);
	}
});
