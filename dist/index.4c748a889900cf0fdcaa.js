!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MetaSlider=t():e.MetaSlider=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,i)=>{for(var r in i)e.o(i,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function i(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.r(t),e.d(t,{default:()=>F});const r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.observers=[]}var t,r;return t=e,(r=[{key:"subscribe",value:function(e){this.observers.push(e)}},{key:"notify",value:function(e,t){this.observers.forEach((function(i){i.key===e&&i.observer(t)}))}}])&&i(t.prototype,r),e}();function n(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.observer=new r,this.name=this.element.prop("name"),this.type=this.element.prop("type"),this.value="number"===this.type?this.element.val():this.element.prop("checked"),this.bindEventListeners()}var t,i;return t=e,(i=[{key:"getName",value:function(){return this.name}},{key:"getValue",value:function(){var e=this.value;return"number"==typeof e&&Number(e),e}},{key:"setValue",value:function(e){this.value=e,"number"==typeof e?this.element.val(e):this.element.prop("checked",e)}},{key:"setProp",value:function(e,t){this.element.prop(e,t)}},{key:"bindEventListeners",value:function(){$(this.element).on("change keyup",this.handleInputValueChange.bind(this))}},{key:"handleInputValueChange",value:function(e){switch(this.type){case"number":this.value=Number(e.target.value);break;case"checkbox":this.value=e.target.checked}var t={};t[this.name]=this.value,this.observer.notify("setting",t)}}])&&n(t.prototype,i),e}();function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function o(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$root=t,this.observer=new r,this.$panel=$(this.$root).find(".js-panel"),this.$form=this.$panel.find(".js-panel__form"),this.inputs=this.initInputs(),this.max=this.takeInputFromArr("max"),this.min=this.takeInputFromArr("min"),this.step=this.takeInputFromArr("step"),this.from=this.takeInputFromArr("from"),this.to=this.takeInputFromArr("to"),this.range=this.takeInputFromArr("range"),this.bindEventListeners()}var t,i,n;return t=e,n=[{key:"handlePanelFormSubmit",value:function(){return!1}}],(i=[{key:"initPanel",value:function(e){var t=this,i=this;Object.entries(e).forEach((function(e){var r,n,s=(n=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var r,n,s=[],a=!0,o=!1;try{for(i=i.call(e);!(a=(r=i.next()).done)&&(s.push(r.value),!t||s.length!==t);a=!0);}catch(e){o=!0,n=e}finally{try{a||null==i.return||i.return()}finally{if(o)throw n}}return s}}(r,n)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=s[0],l=s[1],c=i.inputs.get(o),h={};c&&(c.setValue(l),h[o]=l,t.changeBounds(h))}))}},{key:"initValues",value:function(e){switch(e.length){case 1:var t=this.max.getValue();this.from.setValue(e[0]),this.from.setProp("max",t);break;case 2:this.from.setValue(e[0]),this.to.setValue(e[1]),this.from.setProp("max",e[1]),this.to.setProp("min",e[0]);break;default:throw new Error("undefined values")}}},{key:"setValue",value:function(e){var t=Object.keys(e)[0],i=Object.values(e)[0];this.takeInputFromArr(t).setValue(i)}},{key:"initInputs",value:function(){var e=this,t=new Map;return this.$panel.find(".js-input__field").each((function(){var i=new s($(this)),r=i.getName();i.observer.subscribe({key:"setting",observer:e.changeSettings.bind(e)}),t.set(r,i)})),t}},{key:"takeInputFromArr",value:function(e){var t=this.inputs.get(e);if(t)return t;throw new Error("no such input")}},{key:"bindEventListeners",value:function(){this.$form.on("submit",e.handlePanelFormSubmit)}},{key:"changeSettings",value:function(e){this.changeBounds(e),this.observer.notify("setting",e)}},{key:"changeBounds",value:function(e){var t=Object.keys(e)[0],i=Object.values(e)[0],r=Number(this.max.getValue())-Number(this.min.getValue());switch(t){case"min":this.max.setProp("min",i),this.step.setProp("max",r),this.from.setProp("min",i);break;case"max":this.min.setProp("max",i),this.step.setProp("max",r),this.from.setProp("max",this.range.getValue()?this.to.getValue():i),this.to.setProp("max",i);break;case"step":this.from.setProp("step",i),this.to.setProp("step",i);break;case"from":this.to.setProp("min",i);break;case"to":this.from.setProp("max",i);break;case"range":var n=i?this.to.getValue():this.max.getValue();this.to.setProp("disabled",!i),this.from.setProp("max",n);break;case"vertical":case"tip":break;default:throw new Error("undefined setting")}}}])&&o(t.prototype,i),n&&o(t,n),e}();function c(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const h=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.vertical=i,this.$track=jQuery("<div>",{class:"meta-slider__track"}).appendTo(this.$slider),this.observer=new r,this.position=this.$track.position(),this.trackStart=this.vertical?Number(this.position.top):Number(this.position.left),this.bindEventListeners()}var t,i;return t=e,(i=[{key:"getTrackParameters",value:function(){var e=this.vertical?Number(this.position.top):Number(this.position.left),t=this.vertical?this.$track.height():this.$track.width();return this.trackStart=e,{trackStart:e,trackWidth:t}}},{key:"setVertical",value:function(e){this.vertical=e}},{key:"bindEventListeners",value:function(){this.$track.on("click",this.handleTrackClick.bind(this))}},{key:"handleTrackClick",value:function(e){var t=this.vertical?e.pageY:e.pageX,i=Math.round(t-this.trackStart);this.observer.notify("position",i)}}])&&c(t.prototype,i),e}();function u(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.vertical=i,this.observer=new r,this.$scale=jQuery("<div>",{class:"meta-slider__scale"}).appendTo(this.$slider),this.bindEventListeners()}var t,i,n;return t=e,i=[{key:"initScale",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.vertical=i,this.$scale.empty();var r=e.takeValues(t);this.addValues(r)}},{key:"setVertical",value:function(e){this.vertical=e}},{key:"bindEventListeners",value:function(){$(this.$slider).on("click touchstart",this.sendScaleClickValue.bind(this))}},{key:"sendScaleClickValue",value:function(e){var t=this.observer;if(e.target.dataset.value){var i=Number(e.target.dataset.value);t.notify("click",i)}}},{key:"addValues",value:function(e){var t=this;e.forEach((function(e){var i=jQuery("<div>",{class:"meta-slider__line",text:t.vertical?"—":"|",style:t.vertical?"top: ".concat(e.item.x-10,"px"):"left: ".concat(e.item.x-10,"px")}).appendTo(t.$scale);jQuery("<div>",{class:"meta-slider__value js-meta-slider__value","data-value":e.item.value,text:e.item.value}).appendTo(i)}))}}],n=[{key:"takeValues",value:function(e){var t=[],i=Math.round(e.length/10),r=e.length>10;return e.forEach((function(e,n){(r&&n%i==0||!r)&&t.push({item:e,index:n})})),t[t.length-1].item!==e[e.length-1]&&(t.pop(),t.push({item:e[e.length-1],index:e.length-1})),t}}],i&&u(t.prototype,i),n&&u(t,n),e}();const f=v;function m(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.$track=this.$slider.find(".meta-slider__track"),this.vertical=i,this.observer=new r,this.handles=this.initHandles(),this.bindEventListeners()}var t,i,n;return t=e,i=[{key:"correctHandlesByRange",value:function(e){if(e&&1===this.handles.length){var t=jQuery("<div>",{class:"meta-slider__handle meta-slider__handle_right"}).appendTo(this.$track);this.handles.push(t)}else e||2!==this.handles.length||(this.handles[1].remove(),this.handles.pop());this.bindEventListeners()}},{key:"moveHandles",value:function(e){var t=this;this.handles.forEach((function(i,r){i.css(t.vertical?"top":"left","".concat(e[r]-10,"px")),i.css(t.vertical?"left":"top","-5px")}))}},{key:"setVertical",value:function(e){this.vertical=e}},{key:"bindEventListeners",value:function(){var e=this;this.handles.forEach((function(t){t.on("mousedown touchstart",e.handleHandleMouseDown.bind(e))}))}},{key:"handleHandleMouseDown",value:function(t){t.preventDefault();var i=t.target;$(document).on("mousemove",this.handleMouseMove.bind(this,i)),$(document).on("touchmove",this.handleTouchMove.bind(this,i)),$(document).on("mouseup touchend",this.handleMoveEnd.bind(this)),$(document).on("dragstart",e.handleDragStart)}},{key:"handleMouseMove",value:function(e,t){var i=$(e).hasClass("meta-slider__handle_right")?1:0,r={eventPosition:this.vertical?t.pageY:t.pageX,index:i};this.observer.notify("mouseMove",r)}},{key:"handleTouchMove",value:function(e,t){var i=$(e).hasClass("meta-slider__handle_right")?1:0,r=null==t?void 0:t.touches;if(void 0!==r){var n=r[0],s={eventPosition:this.vertical?n.pageY:n.pageX,index:i};this.observer.notify("mouseMove",s)}}},{key:"handleMoveEnd",value:function(e){this.observer.notify("moveEnd",e),$(document).off("mousemove mouseup touchmove touchend")}},{key:"initHandles",value:function(){var e=[],t=jQuery("<div>",{class:"meta-slider__handle meta-slider__handle_left"}).appendTo(this.$track);e.push(t);var i=jQuery("<div>",{class:"meta-slider__handle meta-slider__handle_right"}).appendTo(this.$track);return e.push(i),e}}],n=[{key:"handleDragStart",value:function(){return!1}}],i&&m(t.prototype,i),n&&m(t,n),e}();const d=p;function b(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.$track=$(this.$slider).find(".meta-slider__track"),jQuery("<div>",{class:"meta-slider__interval"}).appendTo(this.$track),this.$interval=this.$slider.find(".meta-slider__interval")}var t,i;return t=e,(i=[{key:"moveInterval",value:function(e,t){var i,r;if(1===e.length)i=0,r=e[0]-10-2;else{if(2!==e.length)throw new Error("wrong number of handles");var n=Math.min(e[0],e[1]);i=n+10,r=Math.max(e[0],e[1])-n-20-2}r=r>0?r:0,this.$interval.css(t?"height":"width","".concat(r,"px")),this.$interval.css(t?"width":"height","10px"),this.$interval.css(t?"top":"left","".concat(i,"px")),this.$interval.css(t?"left":"top","0px")}}])&&b(t.prototype,i),e}();function k(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var g=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.$tips=[],this.$tip=jQuery("<div>",{class:"meta-slider__tip"})}var t,i;return t=e,i=[{key:"initTips",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this;if(this.$slider.find(".meta-slider__tip").remove(),this.$tips=[],e){var i=this.$slider.find(".meta-slider__handle");i.each((function(){var e=t.$tip.clone();e.appendTo($(this)),t.$tips.push(e)}))}}},{key:"changeTips",value:function(e){this.$tips.forEach((function(t,i){t.html("".concat(e[i]))}))}}],i&&k(t.prototype,i),e}();const w=g;function P(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const x=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$root=t,this.vertical=i,this.observer=new r,this.$container=this.$root.closest(".js-body__container").addClass(this.vertical?"body__container_vertical":"body__container_horizontal"),this.$slider=jQuery("<div>",{class:"meta-slider"}).appendTo(this.$root).addClass(this.vertical?"meta-slider_vertical":"meta-slider_horizontal"),this.track=new h(this.$slider,this.vertical),this.track.observer.subscribe({key:"position",observer:this.changePositionByTrack.bind(this)}),this.scale=new f(this.$slider,this.vertical),this.scale.observer.subscribe({key:"click",observer:this.scaleClick.bind(this)}),this.handles=new d(this.$slider,this.vertical),this.handles.observer.subscribe({key:"mouseMove",observer:this.mouseMove.bind(this)}),this.handles.observer.subscribe({key:"moveEnd",observer:this.mouseMoveEnd.bind(this)}),this.tips=new w(this.$slider),this.interval=new y(this.$slider),this.panel=new l(this.$container),this.panel.observer.subscribe({key:"setting",observer:this.changeSettings.bind(this)})}var t,i;return t=e,i=[{key:"getTrackParameters",value:function(){return this.track.getTrackParameters()}},{key:"initScale",value:function(e){this.scale.initScale(e,this.vertical)}},{key:"correctHandlesByRange",value:function(e){this.handles.correctHandlesByRange(e)}},{key:"initTips",value:function(e){this.tips.initTips(e)}},{key:"changeTips",value:function(e){this.tips.changeTips(e)}},{key:"changeDirection",value:function(e){this.vertical=e,this.track.setVertical(e),this.scale.setVertical(e),this.handles.setVertical(e),this.$container.removeClass("body__container_".concat(this.vertical?"horizontal":"vertical")).addClass("body__container_".concat(this.vertical?"vertical":"horizontal")),this.$slider.removeClass("meta-slider_".concat(this.vertical?"horizontal":"vertical")).addClass("meta-slider_".concat(this.vertical?"vertical":"horizontal"))}},{key:"setParameters",value:function(e){this.handles.moveHandles(e.positions),this.tips.changeTips(e.values),this.interval.moveInterval(e.positions,this.vertical),this.panel.initValues(e.values)}},{key:"setSettings",value:function(e){this.panel.setValue(e)}},{key:"initPanel",value:function(e){this.panel.initPanel(e)}},{key:"changePositionByTrack",value:function(e){this.observer.notify("position",e)}},{key:"scaleClick",value:function(e){this.observer.notify("click",e)}},{key:"changeSettings",value:function(e){this.observer.notify("setting",e)}},{key:"mouseMove",value:function(e){this.observer.notify("mouseMove",e)}},{key:"mouseMoveEnd",value:function(e){this.observer.notify("moveEnd",e)}}],i&&P(t.prototype,i),e}();function _(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function T(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?_(Object(i),!0).forEach((function(t){S(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):_(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function S(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function j(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C={min:10,max:40,step:4,from:8,to:24,vertical:!1,tip:!0,range:!0},O=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;j(this,e),this.trackStart=i,this.trackWidth=r,this.options=this.correctOptionsType(t),this.config=$.extend({},C,this.options),this.correctMinMax(),this.stepsArr=this.initStepsArr(),this.correctFromTo(),this.parameters=this.initParameters()}var t,i,r;return t=e,i=[{key:"correctMinMax",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.config,t=T({},e);return t.max=e.max>e.min?e.max:e.min,t.min=e.max>e.min?e.min:e.max,t.max=e.max===e.min?e.min+10:t.max,this.config=t,t}},{key:"initStepsArr",value:function(){var t=this.config,i=t.min,r=t.max,n=t.step,s=r-i,a=this.trackWidth/s*n,o=Math.floor(s/n),l=Array(o+1),c=Array.from(l,(function(t,r){return e.round(i+e.round(n*r))})),h=[];return c.map((function(e,t){return h.push({value:e,x:Math.round(a*t)})})),-1===c.indexOf(r)&&(c.push(r),h.push({value:r,x:this.trackWidth})),this.stepsArr=h,h}},{key:"correctFromTo",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.config,i=T({},t),r=this.stepsArr.map((function(e){return e.value})),n=e.takeClosestNum(i.from,r),s=e.takeClosestNum(i.to,r);return this.config.range?(i.from=n<s?n:s,i.to=n<s?s:n):i.from=n,this.config=i,i}},{key:"initParameters",value:function(){var e={values:[],positions:[]},t=this;return e.values[0]=this.config.from,this.config.range&&(e.values[1]=this.config.to),e.positions=e.values.map((function(e){return t.takeXByValue(e)})),this.parameters=e,e}},{key:"takeParamHandleMove",value:function(t){var i=t.eventPosition,r=t.index,n=Math.round(i-this.trackStart);if(n>=0&&n<=this.trackWidth){var s=this.stepsArr.map((function(e){return e.x})),a=e.takeClosestIndex(n,s),o=this.stepsArr[a];return this.parameters.values[r]=o.value,this.parameters.positions[r]=o.x,this.parameters}return!1}},{key:"correctFromToByParams",value:function(){this.parameters.values.sort(),this.parameters.positions.sort();var e=this.parameters.values[0];this.config.from=e,this.config.to=this.parameters.values[1]?this.parameters.values[1]:this.config.to}},{key:"takeParamScaleClick",value:function(t){if(this.config.range){var i=e.takeClosestIndex(t,this.parameters.values);return this.parameters.values[i]=t,this.parameters.positions[i]=this.takeXByValue(t),this.parameters}return this.parameters.values=[t],this.parameters.positions=[this.takeXByValue(t)],this.parameters}},{key:"takeParamTrackClick",value:function(t){var i=this.stepsArr.map((function(e){return e.x})),r=e.takeClosestNum(t,i);if(this.config.range){var n=e.takeClosestIndex(r,this.parameters.positions);return this.parameters.positions[n]=r,this.parameters.values[n]=this.takeValueByX(r),this.parameters}return this.parameters.positions=[r],this.parameters.values=[this.takeValueByX(r)],this.parameters}},{key:"getConfig",value:function(){return this.config}},{key:"setConfig",value:function(e){this.config=e}},{key:"getParameters",value:function(){return this.parameters}},{key:"setTrackStart",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.trackStart=e}},{key:"setTrackWidth",value:function(e){this.trackWidth=void 0===e?500:e}},{key:"getStepsArr",value:function(){return this.stepsArr}},{key:"correctOptionsType",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.options,t=T({},e);return t.max=Number.isInteger(e.max)?Math.round(e.max):C.max,t.min=Number.isInteger(e.min)?Math.round(e.min):C.min,t.step=Number.isInteger(e.step)?Math.round(e.step):C.step,t.from=Number.isInteger(e.from)?Math.round(e.from):C.from,t.to=Number.isInteger(e.to)?Math.round(e.to):C.to,t.vertical="boolean"==typeof e.vertical?e.vertical:C.vertical,t.tip="boolean"==typeof e.tip?e.tip:C.tip,t.range="boolean"==typeof e.range?e.range:C.range,t}},{key:"takeXByValue",value:function(e){var t=this.stepsArr.find((function(t){return t.value===e}));if(t)return t.x;throw new Error("position for this value is not consist")}},{key:"takeValueByX",value:function(e){var t=this.stepsArr.find((function(t){return t.x===e}));if(t)return t.value;throw new Error("value for this position is not consist")}}],r=[{key:"takeClosestNum",value:function(t,i){return i[e.takeClosestIndex(t,i)]}},{key:"takeClosestIndex",value:function(e,t){var i=t.reduce((function(t,i){return Math.abs(i-e)<Math.abs(t-e)?i:t}));return t.indexOf(i)}},{key:"round",value:function(e){return Math.round(10*e)/10}}],i&&E(t.prototype,i),r&&E(t,r),e}();const M=O;function V(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var A=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=i,this.$root=t,this.vertical=void 0!==i.vertical&&i.vertical,this.view=new x(this.$root,this.vertical);var r=this.view.getTrackParameters(),n=r.trackStart,s=r.trackWidth;this.model=new M(this.options,n,s),this.init()}var t,i;return t=e,i=[{key:"init",value:function(){this.initElements(),this.view.observer.subscribe({key:"mouseMove",observer:this.moveHandle.bind(this)}),this.view.observer.subscribe({key:"moveEnd",observer:this.moveEnd.bind(this)}),this.view.observer.subscribe({key:"click",observer:this.clickOnScale.bind(this)}),this.view.initPanel(this.model.getConfig()),this.view.observer.subscribe({key:"setting",observer:this.changeSettings.bind(this)}),this.view.observer.subscribe({key:"position",observer:this.changePositionByTrack.bind(this)})}},{key:"initElements",value:function(){var e=this.model.getStepsArr();this.view.initScale(e);var t=this.model.getConfig().range;this.view.correctHandlesByRange(t);var i=this.model.getConfig().tip;this.view.initTips(i);var r=this.model.getParameters();this.view.setParameters(r)}},{key:"moveHandle",value:function(e){var t=this.model.takeParamHandleMove(e);"boolean"!=typeof t&&this.view.setParameters(t)}},{key:"moveEnd",value:function(){this.model.correctFromToByParams();var e=this.model.getConfig();this.view.setSettings({from:e.from}),this.view.setSettings({to:e.to}),this.view.setParameters(this.model.getParameters())}},{key:"clickOnScale",value:function(e){var t=this.model.takeParamScaleClick(e);t&&this.view.setParameters(t)}},{key:"changeSettings",value:function(e){var t=this.model.getConfig(),i=$.extend({},t,e);switch(this.model.setConfig(i),Object.keys(e)[0]){case"min":case"max":case"step":this.model.correctMinMax(),this.view.initScale(this.model.initStepsArr()),this.view.setSettings({min:i.min}),this.view.setSettings({max:i.max}),this.view.setSettings({step:i.step}),this.model.correctFromTo(),this.view.setParameters(this.model.initParameters());break;case"from":case"to":this.model.correctFromTo(),this.view.setSettings({from:i.from}),this.view.setSettings({to:i.to}),this.view.setParameters(this.model.initParameters());break;case"range":this.model.correctFromTo(),this.view.setSettings({range:i.range}),this.view.correctHandlesByRange(i.range),this.view.initTips(i.tip),this.view.setParameters(this.model.initParameters());break;case"tip":this.view.setSettings({tip:i.tip}),this.view.initTips(i.tip),this.view.changeTips(this.model.getParameters().values);break;case"vertical":this.view.setSettings({vertical:i.vertical}),this.vertical=!this.vertical,this.view.changeDirection(this.vertical);var r=this.view.getTrackParameters(),n=r.trackStart,s=r.trackWidth;this.model.setTrackStart(n),this.model.setTrackWidth(s),this.model.initStepsArr(),this.initElements();break;default:throw new Error("undefined setting")}}},{key:"changePositionByTrack",value:function(e){var t=this.model.takeParamTrackClick(e);t&&this.view.setParameters(t)}}],i&&V(t.prototype,i),e}();const I=A;function B(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(e,t,i){return t&&B(e.prototype,t),i&&B(e,i),e}const F=N((function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.controller=new I(t,i)}));return t})()}));