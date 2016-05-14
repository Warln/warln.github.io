/*!
 * vconsole v1.1.0 (https://github.com/WechatFE/vConsole)
 * Copyright 2016, WechatFE Team
 * MIT license
 */
!function(o,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.vConsole=t():o.vConsole=t()}(this,function(){return function(o){function t(n){if(e[n])return e[n].exports;var i=e[n]={exports:{},id:n,loaded:!1};return o[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var e={};return t.m=o,t.c=e,t.p="",t(0)}([function(o,t,e){"use strict";function n(o){return o&&o.__esModule?o:{"default":o}}function i(){this.html=u["default"],this.$dom=null,this.activedTab="default",this.tabList=["default","system"],this.console={},this.isReady=!1,this.readyCallback=[];var o=this;l(window,"load",function(){o._render(),o._bindEvent(),o._mokeConsole(),o._autoRun()})}function r(o,t){return t?t.querySelector(o):document.querySelector(o)}function c(o,t){var e,n=[];return e=t?t.querySelectorAll(o):document.querySelectorAll(o),e&&e.length>0&&(n=Array.prototype.slice.call(e)),n}function a(o,t){if(o){"[object Array]"!=Object.prototype.toString.call(o)&&(o=[o]);for(var e=0;e<o.length;e++)o[e].className+=" "+t}}function s(o,t){if(o){"[object Array]"!=Object.prototype.toString.call(o)&&(o=[o]);for(var e=0;e<o.length;e++){for(var n=o[e].className.split(" "),i=0;i<n.length;i++)n[i]==t&&(n[i]="");o[e].className=n.join(" ")}}}function l(o,t,e,n){if(o){void 0===n&&(n=!1),"[object Array]"!=Object.prototype.toString.call(o)&&(o=[o]);for(var i=0;i<o.length;i++)o[i].addEventListener(t,e,n)}}function d(o){var t=o>0?new Date(o):new Date,e=t.getDay()<10?"0"+t.getDay():t.getDay(),n=t.getMonth()<9?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getFullYear(),r=t.getHours()<10?"0"+t.getHours():t.getHours(),c=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),a=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds(),s=t.getMilliseconds()<10?"0"+t.getMilliseconds():t.getMilliseconds();return 100>s&&(s="0"+s),{time:+t,year:i,month:n,day:e,hour:r,minute:c,second:a,millisecond:s}}function f(o){return document.createElement("a").appendChild(document.createTextNode(o)).parentNode.innerHTML}Object.defineProperty(t,"__esModule",{value:!0});var v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol?"symbol":typeof o};e(1);var p=e(5),u=n(p);i.prototype._render=function(){var o="#__vconsole";if(!r(o)){var t=document.createElement("div");t.innerHTML=this.html,document.body.appendChild(t.children[0])}this.$dom=r(o)},i.prototype._bindEvent=function(){var o=this;l(r(".vc-show"),"click",function(){o.show()}),l(r(".vc-hide"),"click",function(){o.hide()}),l(r(".vc-mask"),"click",function(t){return t.target!=r(".vc-mask")?!1:void o.hide()}),l(r(".vc-clear"),"click",function(){o.clearLog(o.activedTab)}),l(c(".vc-tab"),"click",function(t){var e=t.target.dataset.tab;e!=o.activedTab&&o.showTab(e)})},i.prototype._mokeConsole=function(){if(window.console){var o=this;this.console.log=window.console.log,this.console.info=window.console.info,this.console.warn=window.console.warn,this.console.debug=window.console.debug,this.console.error=window.console.error,window.console.log=function(){o._printLog("auto","log",arguments)},window.console.info=function(){o._printLog("auto","info",arguments)},window.console.warn=function(){o._printLog("auto","warn",arguments)},window.console.debug=function(){o._printLog("auto","debug",arguments)},window.console.error=function(){o._printLog("auto","error",arguments)},window.onerror=function(o,t,e,n,i){var r=i.stack.split("at");r=r[0]+" "+r[1],r=r.replace(location.origin,""),console.error(r)}}},i.prototype._autoRun=function(){var o=navigator.userAgent,t=[],e=d();this._printLog("system","info",["日志时间:",e.year+"-"+e.month+"-"+e.day+" "+e.hour+":"+e.minute+":"+e.second+" "+e.millisecond]),t=["系统版本:","不明"];var n=o.match(/(ipod).*\s([\d_]+)/i),i=o.match(/(ipad).*\s([\d_]+)/i),r=o.match(/(iphone)\sos\s([\d_]+)/i),c=o.match(/(android)\s([\d\.]+)/i);c?t[1]="Android "+c[2]:r?t[1]="iPhone, iOS "+r[2].replace(/_/g,"."):i?t[1]="iPad, iOS "+i[2].replace(/_/g,"."):n&&(t[1]="iPod, iOS "+n[2].replace(/_/g,".")),this._printLog("system","info",t);var a=o.match(/MicroMessenger\/([\d\.]+)/i);t=["微信版本:","不明"],a&&a[1]&&(t[1]=a[1],this._printLog("system","info",t));var s=o.toLowerCase().match(/ nettype\/([^ ]+)/g);for(t=["网络类型:","不明"],s&&s[0]&&(s=s[0].split("/"),t[1]=s[1],this._printLog("system","info",t)),t=["网址协议:","不明"],"https:"==location.protocol?t[1]="HTTPS":"http:"==location.protocol?t[1]="HTTP":t[1]=location.protocol.replace(":",""),this._printLog("system","info",t),window.addEventListener("load",function(o){var t=window.performance||window.msPerformance||window.webkitPerformance;if(t&&t.timing){var e=t.timing,n=e.navigationStart;this._printLog("system","info",["连接结束点:",e.connectEnd-n+"ms"]),this._printLog("system","info",["回包结束点:",e.responseEnd-n+"ms"]),e.secureConnectionStart>0&&this._printLog("system","info",["ssl耗时:",e.connectEnd-e.secureConnectionStart+"ms"]),this._printLog("system","info",["dom渲染耗时:",e.domComplete-e.domLoading+"ms"])}});this.readyCallback.length>0;){var l=this.readyCallback.shift();l&&l.call(this)}this.isReady=!0},i.prototype._printLog=function(o,t,e){if(e.length){for(var n="",i=0;i<e.length;i++)try{n+="function"==typeof e[i]?" "+e[i].toString():"object"==v(e[i])?" "+JSON.stringify(e[i]):" "+f(e[i]).replace(/\n/g,"<br/>")}catch(c){n+=" ["+v(e[i])+"]"}if("auto"==o){var a=/^ \[(\w+)\]/i,s=n.match(a);null!==s&&s.length>0&&this.tabList.indexOf(s[1])>-1&&(o=s[1],n=n.replace(a,""))}"auto"==o&&(o="default");var l=r("#__vc_log_"+o),d=document.createElement("p");d.className="vc-item vc-item-"+t,d.innerHTML=n,r(".vc-log",l).appendChild(d),r(".vc-content").scrollTop=r(".vc-content").scrollHeight,this.console[t].apply(window.console,e)}},i.prototype.showTab=function(o){var t=r("#__vc_log_"+o);s(c(".vc-tab",this.$dom),"vc-actived"),a(r("#__vc_tab_"+o),"vc-actived"),s(c(".vc-logbox"),"vc-actived"),a(t,"vc-actived"),r(".vc-content").scrollTop=r(".vc-content").scrollHeight,this.activedTab=o},i.prototype.clearLog=function(o){var t=r("#__vc_log_"+o);r(".vc-log",t).innerHTML=""},i.prototype.show=function(){a(this.$dom,"vc-toggle")},i.prototype.hide=function(){s(this.$dom,"vc-toggle")},i.prototype.ready=function(o){this.isReady?o.call(this):this.readyCallback.push(o)},t["default"]=new i,o.exports=t["default"]},function(o,t,e){var n=e(2);"string"==typeof n&&(n=[[o.id,n,""]]);e(4)(n,{});n.locals&&(o.exports=n.locals)},function(o,t,e){t=o.exports=e(3)(),t.push([o.id,'#__vconsole{font-size:13px}#__vconsole .vc-show{display:block;position:fixed;right:10px;bottom:10px;color:#fff;background-color:#04be02;line-height:1;font-size:14px;padding:8px 16px;z-index:10000;border-radius:4px;box-shadow:0 0 8px rgba(0,0,0,.4)}#__vconsole .vc-mask{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:10001;transition:background .3s}#__vconsole .vc-panel{position:fixed;min-height:80%;left:0;right:0;bottom:0;z-index:10002;background-color:#efeff4;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:translateY(100%);transform:translateY(100%)}#__vconsole .vc-tabbar{border-bottom:1px solid #d9d9d9;overflow:hidden}#__vconsole .vc-tabbar .vc-tab{float:left;line-height:39px;padding:0 15px;border-right:1px solid #d9d9d9;text-decoration:none;color:#000}#__vconsole .vc-tabbar .vc-tab.vc-actived{background-color:#fff}#__vconsole .vc-content{background-color:#fff;overflow-x:hidden;overflow-y:scroll;position:absolute;top:40px;left:0;right:0;bottom:40px;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox{display:none;position:relative;height:100%}#__vconsole .vc-logbox .vc-log:empty:before{content:"No log";color:#999;position:absolute;top:45%;left:0;right:0;bottom:0;font-size:15px;text-align:center}#__vconsole .vc-logbox .vc-item{margin:0;padding:6px 8px;line-height:1.3;border-bottom:1px solid #eee;word-break:break-word}#__vconsole .vc-logbox .vc-item-info{color:#6a5acd}#__vconsole .vc-logbox .vc-item-debug{color:#daa520}#__vconsole .vc-logbox .vc-item-warn{color:orange;border-color:#ffb930;background-color:#fffacd}#__vconsole .vc-logbox .vc-item-error{color:#dc143c;border-color:#f4a0ab;background-color:#ffe4e1}#__vconsole .vc-logbox.vc-actived{display:block}#__vconsole .vc-toolbar{border-top:1px solid #d9d9d9;line-height:39px;position:absolute;left:0;right:0;bottom:0;overflow:hidden}#__vconsole .vc-toolbar .vc-tool{text-decoration:none;color:#000;width:50%;float:left;text-align:center;position:relative}#__vconsole .vc-toolbar .vc-tool:after{content:" ";position:absolute;top:7px;bottom:7px;right:0;border-left:1px solid #d9d9d9}#__vconsole .vc-toolbar .vc-tool-last:after{border:none}#__vconsole.vc-toggle .vc-show{display:none}#__vconsole.vc-toggle .vc-mask{background:rgba(0,0,0,.6);display:block}#__vconsole.vc-toggle .vc-panel{-webkit-transform:translate(0);transform:translate(0)}',""])},function(o,t){"use strict";o.exports=function(){var o=[];return o.toString=function(){for(var o=[],t=0;t<this.length;t++){var e=this[t];e[2]?o.push("@media "+e[2]+"{"+e[1]+"}"):o.push(e[1])}return o.join("")},o.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(n[r]=!0)}for(i=0;i<t.length;i++){var c=t[i];"number"==typeof c[0]&&n[c[0]]||(e&&!c[2]?c[2]=e:e&&(c[2]="("+c[2]+") and ("+e+")"),o.push(c))}},o}},function(o,t,e){function n(o,t){for(var e=0;e<o.length;e++){var n=o[e],i=p[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(l(n.parts[r],t))}else{for(var c=[],r=0;r<n.parts.length;r++)c.push(l(n.parts[r],t));p[n.id]={id:n.id,refs:1,parts:c}}}}function i(o){for(var t=[],e={},n=0;n<o.length;n++){var i=o[n],r=i[0],c=i[1],a=i[2],s=i[3],l={css:c,media:a,sourceMap:s};e[r]?e[r].parts.push(l):t.push(e[r]={id:r,parts:[l]})}return t}function r(o,t){var e=g(),n=_[_.length-1];if("top"===o.insertAt)n?n.nextSibling?e.insertBefore(t,n.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),_.push(t);else{if("bottom"!==o.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");e.appendChild(t)}}function c(o){o.parentNode.removeChild(o);var t=_.indexOf(o);t>=0&&_.splice(t,1)}function a(o){var t=document.createElement("style");return t.type="text/css",r(o,t),t}function s(o){var t=document.createElement("link");return t.rel="stylesheet",r(o,t),t}function l(o,t){var e,n,i;if(t.singleton){var r=m++;e=b||(b=a(t)),n=d.bind(null,e,r,!1),i=d.bind(null,e,r,!0)}else o.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=s(t),n=v.bind(null,e),i=function(){c(e),e.href&&URL.revokeObjectURL(e.href)}):(e=a(t),n=f.bind(null,e),i=function(){c(e)});return n(o),function(t){if(t){if(t.css===o.css&&t.media===o.media&&t.sourceMap===o.sourceMap)return;n(o=t)}else i()}}function d(o,t,e,n){var i=e?"":n.css;if(o.styleSheet)o.styleSheet.cssText=y(t,i);else{var r=document.createTextNode(i),c=o.childNodes;c[t]&&o.removeChild(c[t]),c.length?o.insertBefore(r,c[t]):o.appendChild(r)}}function f(o,t){var e=t.css,n=t.media;if(n&&o.setAttribute("media",n),o.styleSheet)o.styleSheet.cssText=e;else{for(;o.firstChild;)o.removeChild(o.firstChild);o.appendChild(document.createTextNode(e))}}function v(o,t){var e=t.css,n=t.sourceMap;n&&(e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var i=new Blob([e],{type:"text/css"}),r=o.href;o.href=URL.createObjectURL(i),r&&URL.revokeObjectURL(r)}var p={},u=function(o){var t;return function(){return"undefined"==typeof t&&(t=o.apply(this,arguments)),t}},h=u(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=u(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,m=0,_=[];o.exports=function(o,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var e=i(o);return n(e,t),function(o){for(var r=[],c=0;c<e.length;c++){var a=e[c],s=p[a.id];s.refs--,r.push(s)}if(o){var l=i(o);n(l,t)}for(var c=0;c<r.length;c++){var s=r[c];if(0===s.refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete p[s.id]}}}};var y=function(){var o=[];return function(t,e){return o[t]=e,o.filter(Boolean).join("\n")}}()},function(o,t){o.exports='<div id=__vconsole class=""> <div class=vc-show>面板</div> <div class=vc-mask> </div> <div class=vc-panel> <div class=vc-tabbar> <a class="vc-tab vc-actived" data-tab=default id=__vc_tab_default href=javascript:;>日志</a> <a class=vc-tab data-tab=system id=__vc_tab_system href=javascript:;>系统</a> </div> <div class=vc-content> <div class="vc-logbox vc-actived" id=__vc_log_default> <div class=vc-log></div> </div> <div class=vc-logbox id=__vc_log_system> <div class=vc-log></div> </div> </div> <div class=vc-toolbar> <a href=javascript:; class="vc-tool vc-clear">清空</a> <a href=javascript:; class="vc-tool vc-tool-last vc-hide">隐藏</a> </div> </div> </div>'}])});