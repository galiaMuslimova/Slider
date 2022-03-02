!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MetaSlider=t():e.MetaSlider=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.r(t),e.d(t,{default:()=>B});const n=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.observers=[]}var t,n;return t=e,(n=[{key:"subscribe",value:function(e){this.observers.push(e)}},{key:"unsubscribe",value:function(e){this.observers=this.observers.filter((function(t){return t!==e}))}},{key:"notify",value:function(e,t){this.observers.forEach((function(i){i.key===e&&i.observer(t)}))}}])&&i(t.prototype,n),e}();function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}const s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$root=t,this.observer=new n,this.$panel=$(this.$root).find(".js-panel"),this.$inputs=$(this.$root).find(".js-panel__input"),this.$max=this.$panel.find('input[name="max"]'),this.$min=this.$panel.find('input[name="min"]'),this.$step=this.$panel.find('input[name="step"]'),this.$from=this.$panel.find('input[name="from"]'),this.$to=this.$panel.find('input[name="to"]'),this.$vertical=this.$panel.find('input[name="vertical"]'),this.$range=this.$panel.find('input[name="range"]'),this.$tip=this.$panel.find('input[name="tip"]'),this.bindEventListeners()}var t,i,s;return t=e,s=[{key:"handlePanelormSubmit",value:function(){return!1}}],(i=[{key:"bindEventListeners",value:function(){var t=this;this.$inputs.each((function(){$(this).on("change keyup",t.handleInputValueChange.bind(t))})),$(".js-panel__form").on("submit",e.handlePanelormSubmit)}},{key:"initPanel",value:function(e){var t=this;Object.entries(e).forEach((function(e){var i,n,a=(n=2,function(e){if(Array.isArray(e))return e}(i=e)||function(e,t){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var n,r,a=[],s=!0,o=!1;try{for(i=i.call(e);!(s=(n=i.next()).done)&&(a.push(n.value),!t||a.length!==t);s=!0);}catch(e){o=!0,r=e}finally{try{s||null==i.return||i.return()}finally{if(o)throw r}}return a}}(i,n)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?r(e,t):void 0}}(i,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=a[0],o=a[1],l={};l[s]=o,t.setValue(l)}))}},{key:"handleInputValueChange",value:function(e){var t={},i=e.target.name;switch(e.target.type){case"number":t[i]=Number(e.target.value);break;case"checkbox":t[i]=e.target.checked}this.observer.notify("settings",t)}},{key:"changeBounds",value:function(e){var t=Object.keys(e)[0],i=Object.values(e)[0];switch(t){case"min":this.$max.prop("min",i),this.$from.prop("min",i);break;case"max":this.$min.prop("max",i),this.$from.prop("max",this.$range.prop("checked")?this.$to.val():i),this.$to.prop("max",i);break;case"step":this.$from.prop("step",i),this.$to.prop("step",i);break;case"from":this.$to.prop("min",i);break;case"to":this.$from.prop("max",i);break;case"range":var n=i?this.$to.val():this.$max.val();this.$to.prop("disabled",!i),this.$from.prop("max",n);break;default:throw new Error("undefined setting")}}},{key:"setValue",value:function(e){var t=Object.keys(e)[0],i=Object.values(e)[0],n=this.$panel.find("input[name='".concat(t,"']"));switch(n.prop("type")){case"number":n.val(Number(i)),this.changeBounds(e);break;case"checkbox":n.prop("checked",i)}"range"===t&&this.changeBounds(e)}},{key:"initValues",value:function(e){switch(e.length){case 1:var t=this.$max.val();this.$from.val(e[0]),this.$from.prop("max",t);break;case 2:this.$from.val(e[0]),this.$to.val(e[1]),this.$from.prop("max",e[1]),this.$to.prop("min",e[0]);break;default:throw new Error("undefined values")}}}])&&a(t.prototype,i),s&&a(t,s),e}();function o(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}const l=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.vertical=i,this.$track=jQuery("<div>",{class:"meta-slider__track"}).appendTo(this.$slider),this.observer=new n,this.position=this.$track.position(),this.trackStart=this.vertical?Number(this.position.top):Number(this.position.left),this.trackWidth=this.vertical?this.$track.height():this.$track.width(),this.bindEventListeners()}var t,i;return t=e,(i=[{key:"bindEventListeners",value:function(){this.$track.on("click",this.handleTrackClick.bind(this))}},{key:"handleTrackClick",value:function(e){var t=this.vertical?e.pageY:e.pageX,i=Math.round(t-this.trackStart);this.observer.notify("position",i)}},{key:"getTrackParameters",value:function(e){this.vertical=e;var t=Number(e?this.position.top:this.position.left),i=e?this.$track.height():this.$track.width();return this.trackStart=t,this.trackWidth=i,{trackStart:t,trackWidth:i}}}])&&o(t.prototype,i),e}();function c(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var h=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.$scale=jQuery("<div>",{class:"meta-slider__scale"}).appendTo(this.$slider)}var t,i;return t=e,i=[{key:"initScale",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.$scale.empty();var n=20;e.forEach((function(e){jQuery("<div>",{class:"meta-slider__value",data_value:e.value,text:e.value,style:i?"top: ".concat(e.x-n/2,"px"):"left: ".concat(e.x-n/2,"px")}).appendTo(t.$scale)}))}}],i&&c(t.prototype,i),e}();const u=h;function v(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.handles=[]}var t,i;return t=e,i=[{key:"initHandles",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.handles=[];var t=this.$slider.find(".meta-slider__handle");t.remove();var i=$(this.$slider).find(".meta-slider__track"),n=jQuery("<div>",{class:"meta-slider__handle meta-slider__handle_left"}).appendTo(i);if(this.handles.push(n),e){var r=jQuery("<div>",{class:"meta-slider__handle meta-slider__handle_right"}).appendTo(i);this.handles.push(r)}}},{key:"moveHandles",value:function(e,t){this.handles.forEach((function(i,n){i.css(t?"top":"left","".concat(e[n]-10,"px"))}))}}],i&&v(t.prototype,i),e}();const p=f;function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}const m=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.$track=$(this.$slider).find(".meta-slider__track"),jQuery("<div>",{class:"meta-slider__interval"}).appendTo(this.$track),this.$interval=this.$slider.find(".meta-slider__interval")}var t,i;return t=e,(i=[{key:"moveInterval",value:function(e,t){var i,n;if(1===e.length)i=0,n=e[0]-10-2;else{if(2!==e.length)throw new Error("wrong number of handles");var r=Math.min(e[0],e[1]);i=r+10,n=Math.max(e[0],e[1])-r-20-2}n=n>0?n:0,this.$interval.css(t?"height":"width","".concat(n,"px")),this.$interval.css(t?"width":"height","10px"),this.$interval.css(t?"top":"left","".concat(i,"px")),this.$interval.css(t?"left":"top","0px")}}])&&d(t.prototype,i),e}();function b(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$slider=t,this.$handles=[],this.$tips=[],this.$tip=jQuery("<div>",{class:"meta-slider__tip"})}var t,i;return t=e,i=[{key:"initTips",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$slider.find(".meta-slider__tip").remove(),this.$tips=[];var t=this.$slider.find(".meta-slider__handle");if(e)for(var i=0;i<t.length;i+=1){var n=this.$tip.clone();n.appendTo($(t[i])),this.$tips.push(n)}}},{key:"changeTips",value:function(e){this.$tips.forEach((function(t,i){t.html("".concat(e[i]))}))}}],i&&b(t.prototype,i),e}();const g=y;function k(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var w=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$root=t,this.vertical=i,this.observer=new n,this.$container=this.$root.closest(".js-body__container").addClass(this.vertical?"body__container_vertical":"body__container_horizontal"),this.$slider=jQuery("<div>",{class:"meta-slider"}).appendTo(this.$root).addClass(this.vertical?"meta-slider_vertical":"meta-slider_horizontal"),this.track=new l(this.$slider,this.vertical),this.track.observer.subscribe({key:"position",observer:this.changePositionByTrack.bind(this)}),this.scale=new u(this.$slider),this.handles=new p(this.$slider),this.tips=new g(this.$slider),this.interval=new m(this.$slider),this.panel=new s(this.$container),this.panel.observer.subscribe({key:"settings",observer:this.changeSettings.bind(this)}),this.moveHandle(),this.scaleClick()}var t,i,r;return t=e,i=[{key:"changePositionByTrack",value:function(e){this.observer.notify("position",e)}},{key:"changeSettings",value:function(e){this.observer.notify("settings",e)}},{key:"moveHandle",value:function(){var t=this.observer;this.$slider.on("mousedown touchstart",".meta-slider__handle",(function(i){i.preventDefault();var n=$(i.currentTarget).hasClass("meta-slider__handle_right")?1:0;$(document).on("mousemove",{index:n,observer:t},e.handleMouseMove),$(document).on("touchmove",{index:n,observer:t},e.handleTouchMove),$(document).on("mouseup touchend",e.handleMoveEnd),$(document).on("dragstart",e.handleDragStart)}))}},{key:"scaleClick",value:function(){var t=this.observer;this.$slider.on("click touchstart",".meta-slider__value",{observer:t},e.sendScaleClickValue)}},{key:"getTrackParameters",value:function(){return this.track.getTrackParameters(this.vertical)}},{key:"initScale",value:function(e){this.scale.initScale(e,this.vertical)}},{key:"initHandles",value:function(e){this.handles.initHandles(e)}},{key:"initTips",value:function(e){this.tips.initTips(e)}},{key:"changeTips",value:function(e){this.tips.changeTips(e)}},{key:"changeDirection",value:function(e){this.vertical=e,this.$container.removeClass("body__container_".concat(this.vertical?"horizontal":"vertical")).addClass("body__container_".concat(this.vertical?"vertical":"horizontal")),this.$slider.removeClass("meta-slider_".concat(this.vertical?"horizontal":"vertical")).addClass("meta-slider_".concat(this.vertical?"vertical":"horizontal"))}},{key:"setParameters",value:function(e){this.handles.moveHandles(e.positions,this.vertical),this.tips.changeTips(e.values),this.interval.moveInterval(e.positions,this.vertical),this.panel.initValues(e.values)}},{key:"setSettings",value:function(e,t){this.panel.setValue(e)}},{key:"initPanel",value:function(e){this.panel.initPanel(e)}}],r=[{key:"handleMouseMove",value:function(e){var t=e.data.index,i=e.data.observer,n={eventPosition:{pageX:e.pageX,pageY:e.pageY},index:t};i.notify("mousemove",n)}},{key:"handleTouchMove",value:function(e){var t=e.data.index,i=e.data.observer,n=e.originalEvent;if(void 0!==n){var r=n.touches;if(void 0!==r){var a=r[0],s={eventPosition:{pageX:a.pageX,pageY:a.pageY},index:t};i.notify("mousemove",s)}}}},{key:"handleMoveEnd",value:function(){$(document).off("mousemove mouseup touchmove touchend")}},{key:"handleDragStart",value:function(){return!1}},{key:"sendScaleClickValue",value:function(e){var t=e.data.observer,i=Number($(e.currentTarget).attr("data_value"));t.notify("click",i)}}],i&&k(t.prototype,i),r&&k(t,r),e}();const x=w;function _(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function P(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?_(Object(i),!0).forEach((function(t){T(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):_(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function T(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function S(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function j(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var O={min:10,max:40,step:4,from:8,to:24,vertical:!1,tip:!0,range:!0},C=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:500;S(this,e),this.trackStart=i,this.trackWidth=n,this.options=this.correctOptionsType(t),this.config=$.extend({},O,this.options),this.stepsArr=[],this.changeConfig(),this.parameters=this.initParameters()}var t,i,n;return t=e,i=[{key:"correctOptionsType",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.options,t=P({},e);return t.max=Number.isInteger(e.max)?Math.round(e.max):O.max,t.min=Number.isInteger(e.min)?Math.round(e.min):O.min,t.step=Number.isInteger(e.step)?Math.round(e.step):O.step,t.from=Number.isInteger(e.from)?Math.round(e.from):O.from,t.to=Number.isInteger(e.to)?Math.round(e.to):O.to,t.vertical="boolean"==typeof e.vertical?e.vertical:O.vertical,t.tip="boolean"==typeof e.tip?e.tip:O.tip,t.range="boolean"==typeof e.range?e.range:O.range,t}},{key:"changeConfig",value:function(){this.correctMinMax(),this.initStepsArr(),this.correctFromTo()}},{key:"correctMinMax",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.config,t=P({},e);return t.max=e.max>e.min?e.max:e.min,t.min=e.max>e.min?e.min:e.max,t.max=e.max===e.min?e.min+10:t.max,this.config=t,t}},{key:"initStepsArr",value:function(){var e=this.config,t=e.min,i=e.max,n=e.step,r=i-t,a=this.trackWidth/r*n,s=Math.floor(r/n),o=Array(s+1),l=Array.from(o,(function(e,i){return t+Math.round(n*i*10)/10})),c=[];return l.map((function(e,t){return c.push({value:e,x:Math.round(a*t)})})),-1===l.indexOf(i)&&(l.push(i),c.push({value:i,x:this.trackWidth})),this.stepsArr=c,c}},{key:"correctFromTo",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.config,i=P({},t),n=this.stepsArr.map((function(e){return e.value})),r=e.takeClosestNum(i.from,n),a=e.takeClosestNum(i.to,n);return this.config.range?(i.from=r<a?r:a,i.to=r<a?a:r):i.from=r,this.config=i,i}},{key:"initParameters",value:function(){var e={values:[],positions:[]},t=this;return e.values[0]=this.config.from,this.config.range&&(e.values[1]=this.config.to),e.positions=e.values.map((function(e){return t.takeXByValue(e)})),this.parameters=e,e}},{key:"takeXByValue",value:function(e){var t=this.stepsArr.find((function(t){return t.value===e}));if(t)return t.x;throw new Error("position for this value is not consist")}},{key:"takeParamHandleMove",value:function(t){var i=t.eventPosition.pageX,n=t.eventPosition.pageY,r=t.index,a=this.config.vertical?n:i,s=Math.round(a-this.trackStart);if(s>=0&&s<=this.trackWidth){var o=this.stepsArr.map((function(e){return e.x})),l=e.takeClosestIndex(s,o),c=this.stepsArr[l];this.parameters.values[r]=c.value,this.parameters.positions[r]=c.x;var h=this.parameters.values[0];return this.config.from=h,this.config.to=this.parameters.values[1]?this.parameters.values[1]:this.config.to,this.parameters}return!1}},{key:"takeParamScaleClick",value:function(t){if(this.config.range){var i=e.takeClosestIndex(t,this.parameters.values);return this.parameters.values[i]=t,this.parameters.positions[i]=this.takeXByValue(t),this.parameters}return this.parameters.values=[t],this.parameters.positions=[this.takeXByValue(t)],this.parameters}},{key:"takeParamTrackClick",value:function(t){var i=this.stepsArr.map((function(e){return e.x})),n=e.takeClosestNum(t,i);if(this.config.range){var r=e.takeClosestIndex(n,this.parameters.positions);return this.parameters.positions[r]=n,this.parameters.values[r]=this.takeValueByX(n),this.parameters}return this.parameters.positions=[n],this.parameters.values=[this.takeValueByX(n)],this.parameters}},{key:"takeValueByX",value:function(e){var t=this.stepsArr.find((function(t){return t.x===e}));if(t)return t.value;throw new Error("value for this position is not consist")}}],n=[{key:"takeClosestNum",value:function(t,i){return i[e.takeClosestIndex(t,i)]}},{key:"takeClosestIndex",value:function(e,t){var i=t.reduce((function(t,i){return Math.abs(i-e)<Math.abs(t-e)?i:t}));return t.indexOf(i)}}],i&&j(t.prototype,i),n&&j(t,n),e}();const E=C;function M(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var A=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=i,this.$root=t,this.vertical=void 0!==i.vertical&&i.vertical,this.view=new x(this.$root,this.vertical);var n=this.view.getTrackParameters(),r=n.trackStart,a=n.trackWidth;this.model=new E(this.options,r,a),this.init()}var t,i;return t=e,i=[{key:"init",value:function(){this.initElements(),this.view.observer.subscribe({key:"mousemove",observer:this.moveHandle.bind(this)}),this.view.observer.subscribe({key:"click",observer:this.clickOnScale.bind(this)}),this.view.initPanel(this.model.config),this.view.observer.subscribe({key:"settings",observer:this.changeSettings.bind(this)}),this.view.observer.subscribe({key:"position",observer:this.changePositionByTrack.bind(this)})}},{key:"initElements",value:function(){var e=this.model.stepsArr;this.view.initScale(e);var t=this.model.config.range;this.view.initHandles(t);var i=this.model.config.tip;this.view.initTips(i);var n=this.model.initParameters();this.view.setParameters(n)}},{key:"moveHandle",value:function(e){var t=this.model.takeParamHandleMove(e);t&&this.view.setParameters(t)}},{key:"clickOnScale",value:function(e){var t=this.model.takeParamScaleClick(e);t&&this.view.setParameters(t)}},{key:"changeSettings",value:function(e){switch(this.model.config=$.extend({},this.model.config,e),Object.keys(e)[0]){case"min":case"max":case"step":this.model.changeConfig(),this.view.setSettings({min:this.model.config.min},"min"),this.view.setSettings({max:this.model.config.max},"max"),this.view.setSettings({step:this.model.config.step},"step"),this.view.initScale(this.model.stepsArr),this.view.setParameters(this.model.initParameters());break;case"from":case"to":this.model.correctFromTo(),this.view.setSettings({from:this.model.config.from},"from"),this.view.setSettings({to:this.model.config.to},"to"),this.view.setParameters(this.model.initParameters());break;case"range":this.model.correctFromTo(),this.view.setSettings({range:this.model.config.range},"range"),this.view.initHandles(this.model.config.range),this.view.initTips(this.model.config.tip),this.view.setParameters(this.model.initParameters());break;case"tip":this.view.setSettings({tip:this.model.config.tip},"tip"),this.view.initTips(this.model.config.tip),this.view.changeTips(this.model.parameters.values);break;case"vertical":this.view.setSettings({vertical:this.model.config.vertical},"vertical");var t=!this.vertical;this.options.vertical=t,this.vertical=t,this.view.changeDirection(t);var i=this.view.getTrackParameters(),n=i.trackStart,r=i.trackWidth;this.model.trackStart=n||0,this.model.trackWidth=r||500,this.initElements();break;default:throw new Error("undefined setting")}}},{key:"changePositionByTrack",value:function(e){var t=this.model.takeParamTrackClick(e);t&&this.view.setParameters(t)}}],i&&M(t.prototype,i),e}();const I=A;function V(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function N(e,t,i){return t&&V(e.prototype,t),i&&V(e,i),e}const B=N((function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.controller=new I(t,i)}));return t})()}));