!function(t){function n(n){for(var r,u,c=n[0],f=n[1],s=n[2],l=0,p=[];l<c.length;l++)u=c[l],o[u]&&p.push(o[u][0]),o[u]=0;for(r in f)Object.prototype.hasOwnProperty.call(f,r)&&(t[r]=f[r]);for(a&&a(n);p.length;)p.shift()();return i.push.apply(i,s||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,c=1;c<e.length;c++){var f=e[c];0!==o[f]&&(r=!1)}r&&(i.splice(n--,1),t=u(u.s=e[0]))}return t}var r={},o={1:0},i=[];function u(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,u),e.l=!0,e.exports}u.m=t,u.c=r,u.d=function(t,n,e){u.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,n){if(1&n&&(t=u(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(u.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)u.d(e,r,function(n){return t[n]}.bind(null,r));return e},u.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(n,"a",n),n},u.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},u.p="/wboo/dist/";var c=window.webpackJsonp=window.webpackJsonp||[],f=c.push.bind(c);c.push=n,c=c.slice();for(var s=0;s<c.length;s++)n(c[s]);var a=f;i.push([45,0]),e()}({12:function(t,n,e){var r=e(67);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,e(2).default)("43404e04",r,!1,{})},37:function(t,n,e){"use strict";(function(n){function e(t){o.length||(r(),!0),o[o.length]=t}t.exports=e;var r,o=[],i=0,u=1024;function c(){for(;i<o.length;){var t=i;if(i+=1,o[t].call(),i>u){for(var n=0,e=o.length-i;n<e;n++)o[n]=o[n+i];o.length-=i,i=0}}o.length=0,i=0,!1}var f,s,a,l=void 0!==n?n:self,p=l.MutationObserver||l.WebKitMutationObserver;function h(t){return function(){var n=setTimeout(r,0),e=setInterval(r,50);function r(){clearTimeout(n),clearInterval(e),t()}}}"function"==typeof p?(f=1,s=new p(c),a=document.createTextNode(""),s.observe(a,{characterData:!0}),r=function(){f=-f,a.data=f}):r=h(c),e.requestFlush=r,e.makeRequestCallFromTimer=h}).call(this,e(52))},4:function(t,n){t.exports=dll},45:function(t,n,e){(function(t){new t({el:"#main",components:{"v-main":e(97).default}})}).call(this,e(3))},46:function(t,n,e){var r=e(47),o=e(6),i=(e(48),e(49)),u=!o.isProduction,c=o.ajaxUrlBase,f=function(t){return t&&!1!==t.success?t:r.reject(t)},s=function(t,n){return i.getJSON(t,n).then(function(t){return f(t)})},a=function(t,n){return s(u?c+(t+".json"):c+(t+".do"),n)};n={fetch1:a,fetch2:function(t,n){return a(t,n).then(function(t){return function(t){return t?!0===t.success?t.data:void 0===t.success&&void 0!==t.data?t.data:r.reject(t):r.reject(t)}(t)})},post:function(t,n){var e=c+t+".do";return i.post(e,n).then(function(t){return f(t)})}};t.exports=n},47:function(t,n,e){var r,o,i,u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};o=[],void 0===(i="function"==typeof(r=function(){var t=2;function n(n){this.state=t,this.value=void 0,this.deferred=[];var e=this;try{n(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}n.resolve=function(t){return new n(function(n,e){n(t)})},n.reject=function(t){return new n(function(n,e){e(t)})},n.all=function(t){return new n(function(e,r){var o=0,i=[];function u(n){return function(r){i[n]=r,(o+=1)===t.length&&e(i)}}0===t.length&&e(i);for(var c=0;c<t.length;c+=1)n.resolve(t[c]).then(u(c),r)})},n.race=function(t){return new n(function(e,r){for(var o=0;o<t.length;o++)n.resolve(t[o]).then(e,r)})};var e=n.prototype;e.then=function(t,e){var r=this;return new n(function(n,o){r.deferred.push([t,e,n,o]),r.notify()})},e.catch=function(t){return this.then(void 0,t)},e.resolve=function(n){var e=this;if(e.state===t){if(n===e)throw new TypeError("Promise settled with itself.");var r=!1;try{var o=n&&n.then;if(null!==n&&"object"===(void 0===n?"undefined":u(n))&&"function"==typeof o)return void o.call(n,function(t){r||e.resolve(t),r=!0},function(t){r||e.reject(t),r=!0})}catch(t){return void(r||e.reject(t))}e.state=0,e.value=n,e.notify()}},e.reject=function(n){if(this.state===t){if(n===this)throw new TypeError("Promise settled with itself.");this.state=1,this.value=n,this.notify()}},e.notify=function(){var n=this;r(function(){if(3!==n.state&&n.state!==t)for(;n.deferred.length;){var e=n.deferred.shift(),r=e[0],o=e[1],i=e[2],u=e[3];try{0===n.state?i("function"==typeof r?r.call(void 0,n.value):n.value):1===n.state&&("function"==typeof o?i(o.call(void 0,n.value)):u(n.value))}catch(t){u(t)}}})},e.cancel=function(){this.state=3};var r=new function(){var t=window.setImmediate,n=window.MutationObserver;if(t)return t.bind(window);var e=[];if(n){var r=document.createTextNode("meepo");new n(function(){for(var t=e.length,n=0;n<t;n++)e[n]();e=e.slice(t)}).observe(r,{characterData:!0});var o=!1;return function(t){e.push(t),o=!o,r.data=o}}return function(t){setTimeout(t,4)}};return n})?r.apply(n,o):r)||(t.exports=i)},48:function(t,n,e){var r,o,i;o=[],void 0===(i="function"==typeof(r=function(){"use strict";var t,n={getQuery:function(t){var n=(t=t||window.location.search).indexOf("?");n>=0&&(t=t.substr(n+1));var e=t.indexOf("#");e>=0&&(t=t.substr(0,e));for(var r={},o=t.split("&"),i=0;i<o.length;i++){var u=o[i].split("=");u[0]&&(r[u[0]]=decodeURIComponent(u[1]||""))}return r},buildQuery:function(t){var n=[];for(var e in t){if(!t.hasOwnProperty(e)||!e)return;var r=encodeURIComponent(t[e]||"");n.push(encodeURIComponent(e)+"="+r)}return n.join("&")},getHashArray:function(t){t=t||"-";var n=location.hash.substr(1);return n?n.split(t):[]},query:function(e){return t&&!e||(t=n.getQuery()),t},addParam:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e||!t||!t.split)return t;var r=t.split("#"),o=r[0],i=n.buildQuery(e);return o.indexOf("?")>=0?o+="&"+i:o+="?"+i,r[0]=o,r.join("#")}};return n})?r.apply(n,o):r)||(t.exports=i)},49:function(t,n,e){var r=e(7),o=e(50),i=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"json";return new o(function(o,u){var c={url:t,dataType:i,data:n,type:e};return r.ajax(c).success(function(t){t?o(t):u(t)}).error(u)})};i.getJSON=function(t,n){return i(t,n,"GET","json")},i.getHTML=function(t,n){return i(t,n,"GET","html")},i.post=function(t,n){return i(t,n,"POST")},i.once=function(t){var n=void 0;return function(){return void 0===n&&(n=t()),n}},i.onceParam=function(t){var n={};return function(){var e=Array.prototype.slice.call(arguments)||[],r="";return e.forEach(function(t){r+="string"==typeof t?t:JSON.stringify(t)}),r||(r="default"),void 0===n[r]?t.apply(null,e).then(function(t){return n[r]=t,t}):o.resolve(n[r])}},t.exports=i},5:function(t,n,e){"use strict";var r=e(37);function o(){}var i=null,u={};function c(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("Promise constructor's argument is not a function");this._40=0,this._65=0,this._55=null,this._72=null,t!==o&&h(t,this)}function f(t,n){for(;3===t._65;)t=t._55;if(c._37&&c._37(t),0===t._65)return 0===t._40?(t._40=1,void(t._72=n)):1===t._40?(t._40=2,void(t._72=[t._72,n])):void t._72.push(n);!function(t,n){r(function(){var e=1===t._65?n.onFulfilled:n.onRejected;if(null!==e){var r=function(t,n){try{return t(n)}catch(t){return i=t,u}}(e,t._55);r===u?a(n.promise,i):s(n.promise,r)}else 1===t._65?s(n.promise,t._55):a(n.promise,t._55)})}(t,n)}function s(t,n){if(n===t)return a(t,new TypeError("A promise cannot be resolved with itself."));if(n&&("object"==typeof n||"function"==typeof n)){var e=function(t){try{return t.then}catch(t){return i=t,u}}(n);if(e===u)return a(t,i);if(e===t.then&&n instanceof c)return t._65=3,t._55=n,void l(t);if("function"==typeof e)return void h(e.bind(n),t)}t._65=1,t._55=n,l(t)}function a(t,n){t._65=2,t._55=n,c._87&&c._87(t,n),l(t)}function l(t){if(1===t._40&&(f(t,t._72),t._72=null),2===t._40){for(var n=0;n<t._72.length;n++)f(t,t._72[n]);t._72=null}}function p(t,n,e){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof n?n:null,this.promise=e}function h(t,n){var e=!1,r=function(t,n,e){try{t(n,e)}catch(t){return i=t,u}}(t,function(t){e||(e=!0,s(n,t))},function(t){e||(e=!0,a(n,t))});e||r!==u||(e=!0,a(n,i))}t.exports=c,c._37=null,c._87=null,c._61=o,c.prototype.then=function(t,n){if(this.constructor!==c)return function(t,n,e){return new t.constructor(function(r,i){var u=new c(o);u.then(r,i),f(t,new p(n,e,u))})}(this,t,n);var e=new c(o);return f(this,new p(t,n,e)),e}},50:function(t,n,e){"use strict";t.exports=e(51)},51:function(t,n,e){"use strict";t.exports=e(5),e(53),e(54),e(55),e(56),e(58)},52:function(t,n,e){t.exports=e(4)(3)},53:function(t,n,e){"use strict";var r=e(5);t.exports=r,r.prototype.done=function(t,n){(arguments.length?this.then.apply(this,arguments):this).then(null,function(t){setTimeout(function(){throw t},0)})}},54:function(t,n,e){"use strict";var r=e(5);t.exports=r,r.prototype.finally=function(t){return this.then(function(n){return r.resolve(t()).then(function(){return n})},function(n){return r.resolve(t()).then(function(){throw n})})}},55:function(t,n,e){"use strict";var r=e(5);t.exports=r;var o=a(!0),i=a(!1),u=a(null),c=a(void 0),f=a(0),s=a("");function a(t){var n=new r(r._61);return n._65=1,n._55=t,n}r.resolve=function(t){if(t instanceof r)return t;if(null===t)return u;if(void 0===t)return c;if(!0===t)return o;if(!1===t)return i;if(0===t)return f;if(""===t)return s;if("object"==typeof t||"function"==typeof t)try{var n=t.then;if("function"==typeof n)return new r(n.bind(t))}catch(t){return new r(function(n,e){e(t)})}return a(t)},r.all=function(t){var n=Array.prototype.slice.call(t);return new r(function(t,e){if(0===n.length)return t([]);var o=n.length;function i(u,c){if(c&&("object"==typeof c||"function"==typeof c)){if(c instanceof r&&c.then===r.prototype.then){for(;3===c._65;)c=c._55;return 1===c._65?i(u,c._55):(2===c._65&&e(c._55),void c.then(function(t){i(u,t)},e))}var f=c.then;if("function"==typeof f)return void new r(f.bind(c)).then(function(t){i(u,t)},e)}n[u]=c,0==--o&&t(n)}for(var u=0;u<n.length;u++)i(u,n[u])})},r.reject=function(t){return new r(function(n,e){e(t)})},r.race=function(t){return new r(function(n,e){t.forEach(function(t){r.resolve(t).then(n,e)})})},r.prototype.catch=function(t){return this.then(null,t)}},56:function(t,n,e){"use strict";var r=e(5),o=e(57);t.exports=r,r.denodeify=function(t,n){return"number"==typeof n&&n!==1/0?function(t,n){for(var e=[],o=0;o<n;o++)e.push("a"+o);var u=["return function ("+e.join(",")+") {","var self = this;","return new Promise(function (rs, rj) {","var res = fn.call(",["self"].concat(e).concat([i]).join(","),");","if (res &&",'(typeof res === "object" || typeof res === "function") &&','typeof res.then === "function"',") {rs(res);}","});","};"].join("");return Function(["Promise","fn"],u)(r,t)}(t,n):function(t){for(var n=Math.max(t.length-1,3),e=[],o=0;o<n;o++)e.push("a"+o);var u=["return function ("+e.join(",")+") {","var self = this;","var args;","var argLength = arguments.length;","if (arguments.length > "+n+") {","args = new Array(arguments.length + 1);","for (var i = 0; i < arguments.length; i++) {","args[i] = arguments[i];","}","}","return new Promise(function (rs, rj) {","var cb = "+i+";","var res;","switch (argLength) {",e.concat(["extra"]).map(function(t,n){return"case "+n+":res = fn.call("+["self"].concat(e.slice(0,n)).concat("cb").join(",")+");break;"}).join(""),"default:","args[argLength] = cb;","res = fn.apply(self, args);","}","if (res &&",'(typeof res === "object" || typeof res === "function") &&','typeof res.then === "function"',") {rs(res);}","});","};"].join("");return Function(["Promise","fn"],u)(r,t)}(t)};var i="function (err, res) {if (err) { rj(err); } else { rs(res); }}";r.nodeify=function(t){return function(){var n=Array.prototype.slice.call(arguments),e="function"==typeof n[n.length-1]?n.pop():null,i=this;try{return t.apply(this,arguments).nodeify(e,i)}catch(t){if(null==e)return new r(function(n,e){e(t)});o(function(){e.call(i,t)})}}},r.prototype.nodeify=function(t,n){if("function"!=typeof t)return this;this.then(function(e){o(function(){t.call(n,null,e)})},function(e){o(function(){t.call(n,e)})})}},57:function(t,n,e){"use strict";var r=e(37),o=[],i=[],u=r.makeRequestCallFromTimer(function(){if(i.length)throw i.shift()});function c(t){var n;(n=o.length?o.pop():new f).task=t,r(n)}function f(){this.task=null}t.exports=c,f.prototype.call=function(){try{this.task.call()}catch(t){c.onerror?c.onerror(t):(i.push(t),u())}finally{this.task=null,o[o.length]=this}}},58:function(t,n,e){"use strict";var r=e(5);t.exports=r,r.enableSynchronous=function(){r.prototype.isPending=function(){return 0==this.getState()},r.prototype.isFulfilled=function(){return 1==this.getState()},r.prototype.isRejected=function(){return 2==this.getState()},r.prototype.getValue=function(){if(3===this._65)return this._55.getValue();if(!this.isFulfilled())throw new Error("Cannot get a value of an unfulfilled promise.");return this._55},r.prototype.getReason=function(){if(3===this._65)return this._55.getReason();if(!this.isRejected())throw new Error("Cannot get a rejection reason of a non-rejected promise.");return this._55},r.prototype.getState=function(){return 3===this._65?this._55.getState():-1===this._65||-2===this._65?0:this._65}},r.disableSynchronous=function(){r.prototype.isPending=void 0,r.prototype.isFulfilled=void 0,r.prototype.isRejected=void 0,r.prototype.getValue=void 0,r.prototype.getReason=void 0,r.prototype.getState=void 0}},66:function(t,n,e){"use strict";var r=e(12);e.n(r).a},67:function(t,n,e){(t.exports=e(1)(!1)).push([t.i,"",""])},8:function(t,n,e){"use strict";(function(t,r){e(38);var o={alert:function(){var n=this;this.$alert(t.env+t.ajaxUrlBase),r.fetch2("/api/my").then(function(t){}).catch(function(){n.$msg("request fail.")})}};n.a={data:function(){return{name:"meepo"}},created:function(){},methods:o,computed:{},watch:{},props:[],mounted:function(){},mixins:[],beforeDestroy:function(){},components:{}}}).call(this,e(6),e(46))},97:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-index"},[e("form",{staticClass:"p15",on:{submit:function(t){t.preventDefault()}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(n){n.target.composing||(t.name=n.target.value)}}}),t._v(" "),e("p",{domProps:{textContent:t._s(t.name)}}),t._v(" "),e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.alert}},[t._v("\r\n            确定\r\n        ")])]),t._v(" "),e("div",{staticClass:"shadow-container"},[t._v("\r\n        fuck yeah\r\n    ")])])};r._withStripped=!0;var o=e(8).a,i=(e(66),e(0)),u=Object(i.a)(o,r,[],!1,null,"036678e2",null);u.options.__file="js/pages/index.vue";n.default=u.exports}});