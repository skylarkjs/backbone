/**
 * skylark-backbone - A version of backbone that ported to running on skylarkjs.
 * @author 
 * @version v0.9.0
 * @link 
 * @license MIT
 */
!function(t,e){var i=e.define,n=e.require,r="function"==typeof i&&i.amd,s=!r&&"undefined"!=typeof exports;if(!r&&!i){var o={};i=e.define=function(t,e,i){"function"==typeof i?(o[t]={factory:i,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var i=e.split("/"),n=t.split("/");i.pop();for(var r=0;r<n.length;r++)"."!=n[r]&&(".."==n[r]?i.pop():i.push(n[r]));return i.join("/")}(e,t)}),exports:null},n(t)):o[t]=i},n=e.require=function(t){if(!o.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var i=o[t];if(!i.exports){var r=[];i.deps.forEach(function(t){r.push(n(t))}),i.exports=i.factory.apply(e,r)}return i.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,e){t("skylark-backbone/backbone",["skylark-langx/skylark","skylark-jquery"],function(t,e){var i=t.backbone={};return i.$=e,i}),t("skylark-backbone/models",["skylark-langx/langx"],function(t){var e={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"},i=function(t,e){var i=e.error;e.error=function(n){i&&i.call(e.context,t,n,e),t.trigger("error",t,n,e)}},n=t.Stateful.inherit({sync:function(){return c.sync.apply(this,arguments)},matches:function(e){return t.isMatch(this.attributes,e)},fetch:function(e){var n=this,r=(e=t.mixin({parse:!0},e)).success;return e.success=function(t){var i=e.parse?n.parse(t,e):t;if(!n.set(i,e))return!1;r&&r.call(e.context,n,t,e),n.trigger("sync",n,t,e)},i(this,e),this.sync("read",this,e)},save:function(e,n,r){var s;null==e||"object"==typeof e?(s=e,r=n):(s={})[e]=n;var o=(r=t.mixin({validate:!0,parse:!0},r)).wait;if(s&&!o){if(!this.set(s,r))return!1}else if(!this._validate(s,r))return!1;var a=this,c=r.success,l=this.attributes;r.success=function(e){a.attributes=l;var i=r.parse?a.parse(e,r):e;if(o&&(i=t.mixin({},s,i)),i&&!a.set(i,r))return!1;c&&c.call(r.context,a,e,r),a.trigger("sync",a,e,r)},i(this,r),s&&o&&(this.attributes=t.mixin({},l,s));var u=this.isNew()?"create":r.patch?"patch":"update";"patch"!==u||r.attrs||(r.attrs=s);var h=this.sync(u,this,r);return this.attributes=l,h},destroy:function(e){var n=this,r=(e=e?t.clone(e):{}).success,s=e.wait,o=function(){n.stopListening(),n.trigger("destroy",n,n.collection,e)};e.success=function(t){s&&o(),r&&r.call(e.context,n,t,e),n.isNew()||n.trigger("sync",n,t,e)};var a=!1;return this.isNew()?t.defer(e.success):(i(this,e),a=this.sync("delete",this,e)),s||o(),a},url:function(){var e=t.result(this,"urlRoot")||t.result(this.collection,"url")||urlError();if(this.isNew())return e;var i=this.get(this.idAttribute);return e.replace(/[^\/]$/,"$&/")+encodeURIComponent(i)},parse:function(t,e){return t}}),r=t.Evented.inherit({_construct:function(e,i){i||(i={}),i.entity&&(this.entity=i.entity),void 0!==i.comparator&&(this.comparator=i.comparator),this._reset(),e&&this.reset(e,t.mixin({silent:!0},i))}}),s={add:!0,remove:!0,merge:!0},o={add:!0,remove:!1},a=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var n,r=Array(t.length-i),s=e.length;for(n=0;n<r.length;n++)r[n]=t[n+i];for(n=0;n<s;n++)t[n+i]=e[n];for(n=0;n<r.length;n++)t[n+s+i]=r[n]};function c(){return c}return r.partial({entity:n,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return c.sync.apply(this,arguments)},add:function(e,i){return this.set(e,t.mixin({merge:!1},i,o))},remove:function(e,i){i=t.mixin({},i);var n=!t.isArray(e);e=n?[e]:e.slice();var r=this._removeEntitys(e,i);return!i.silent&&r.length&&(i.changes={added:[],merged:[],removed:r},this.trigger("update",this,i)),n?r[0]:r},set:function(e,i){if(null!=e){(i=t.mixin({},s,i)).parse&&!this._isEntity(e)&&(e=this.parse(e,i)||[]);var n=!t.isArray(e);e=n?[e]:e.slice();var r=i.at;null!=r&&(r=+r),r>this.length&&(r=this.length),r<0&&(r+=this.length+1);var o,c,l=[],u=[],h=[],d=[],f={},p=i.add,y=i.merge,g=i.remove,m=!1,v=this.comparator&&null==r&&!1!==i.sort,k=t.isString(this.comparator)?this.comparator:null;for(c=0;c<e.length;c++){o=e[c];var b=this.get(o);if(b){if(y&&o!==b){var x=this._isEntity(o)?o.attributes:o;i.parse&&(x=b.parse(x,i)),b.set(x,i),h.push(b),v&&!m&&(m=b.hasChanged(k))}f[b.cid]||(f[b.cid]=!0,l.push(b)),e[c]=b}else p&&(o=e[c]=this._prepareEntity(o,i))&&(u.push(o),this._addReference(o,i),f[o.cid]=!0,l.push(o))}if(g){for(c=0;c<this.length;c++)o=this.entities[c],f[o.cid]||d.push(o);d.length&&this._removeEntitys(d,i)}var E=!1,_=!v&&p&&g;if(l.length&&_?(E=this.length!==l.length||this.entities.some(function(t,e){return t!==l[e]}),this.entities.length=0,a(this.entities,l,0),this.length=this.entities.length):u.length&&(v&&(m=!0),a(this.entities,u,null==r?this.length:r),this.length=this.entities.length),m&&this.sort({silent:!0}),!i.silent){for(c=0;c<u.length;c++)null!=r&&(i.index=r+c),(o=u[c]).trigger("add",o,this,i);(m||E)&&this.trigger("sort",this,i),(u.length||d.length||h.length)&&(i.changes={added:u,removed:d,merged:h},this.trigger("update",this,i))}return n?e[0]:e}},reset:function(e,i){i=i?t.clone(i):{};for(var n=0;n<this.entities.length;n++)this._removeReference(this.entities[n],i);return i.previousEntitys=this.entities,this._reset(),e=this.add(e,t.mixin({silent:!0},i)),i.silent||this.trigger("reset",this,i),e},push:function(e,i){return this.add(e,t.mixin({at:this.length},i))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(e,i){return this.add(e,t.mixin({at:0},i))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return slice.apply(this.entities,arguments)},get:function(t){if(null!=t)return this._byId[t]||this._byId[this.entityId(t.attributes||t)]||t.cid&&this._byId[t.cid]},has:function(t){return null!=this.get(t)},at:function(t){return t<0&&(t+=this.length),this.entities[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,!0)},sort:function(e){var i=this.comparator;if(!i)throw new Error("Cannot sort a set without a comparator");e||(e={});var n=i.length;return t.isFunction(i)&&(i=t.proxy(i,this)),1===n||t.isString(i)?this.entities=this.sortBy(i):this.entities.sort(i),e.silent||this.trigger("sort",this,e),this},pluck:function(t){return this.map(t+"")},fetch:function(e){var n=(e=t.mixin({parse:!0},e)).success,r=this;return e.success=function(t){var i=e.reset?"reset":"set";r[i](t,e),n&&n.call(e.context,r,t,e),r.trigger("sync",r,t,e)},i(this,e),this.sync("read",this,e)},create:function(e,i){var n=(i=i?t.clone(i):{}).wait;if(!(e=this._prepareEntity(e,i)))return!1;n||this.add(e,i);var r=this,s=i.success;return i.success=function(t,e,i){n&&r.add(t,i),s&&s.call(i.context,t,e,i)},e.save(null,i),e},parse:function(t,e){return t},clone:function(){return new this.constructor(this.entities,{entity:this.entity,comparator:this.comparator})},entityId:function(t){return t[this.entity.prototype.idAttribute||"id"]},_reset:function(){this.length=0,this.entities=[],this._byId={}},_prepareEntity:function(e,i){if(this._isEntity(e))return e.collection||(e.collection=this),e;(i=i?t.clone(i):{}).collection=this;var n=new this.entity(e,i);return n.validationError?(this.trigger("invalid",this,n.validationError,i),!1):n},_removeEntitys:function(t,e){for(var i=[],n=0;n<t.length;n++){var r=this.get(t[n]);if(r){var s=this.indexOf(r);this.entities.splice(s,1),this.length--,delete this._byId[r.cid];var o=this.entityId(r.attributes);null!=o&&delete this._byId[o],e.silent||(e.index=s,r.trigger("remove",r,this,e)),i.push(r),this._removeReference(r,e)}}return i},_isEntity:function(t){return t instanceof n},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.entityId(t.attributes);null!=i&&(this._byId[i]=t),t.on("all",this._onEntityEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.entityId(t.attributes);null!=i&&delete this._byId[i],this===t.collection&&delete t.collection,t.off("all",this._onEntityEvent,this)},_onEntityEvent:function(t,e,i,n){if(e){if(("add"===t||"remove"===t)&&i!==this)return;if("destroy"===t&&this.remove(e,n),"change"===t){var r=this.entityId(e.previousAttributes()),s=this.entityId(e.attributes);r!==s&&(null!=r&&delete this._byId[r],null!=s&&(this._byId[s]=e))}}this.trigger.apply(this,arguments)}}),t.mixin(c,{emulateHTTP:!1,emulateJSON:!1,sync:function(i,n,r){var s=e[i];t.defaults(r||(r={}),{emulateHTTP:c.emulateHTTP,emulateJSON:c.emulateJSON});var o={type:s,dataType:"json"};r.url||(o.url=t.result(n,"url")||urlError());null!=r.data||!n||"create"!==i&&"update"!==i&&"patch"!==i||(o.contentType="application/json",o.data=JSON.stringify(r.attrs||n.toJSON(r)));r.emulateJSON&&(o.contentType="application/x-www-form-urlencoded",o.data=o.data?{entity:o.data}:{});if(r.emulateHTTP&&("PUT"===s||"DELETE"===s||"PATCH"===s)){o.type="POST",r.emulateJSON&&(o.data._method=s);var a=r.beforeSend;r.beforeSend=function(t){if(t.setRequestHeader("X-HTTP-Method-Override",s),a)return a.apply(this,arguments)}}"GET"===o.type||r.emulateJSON||(o.processData=!1);var l=r.error;r.error=function(t,e,i){r.textStatus=e,r.errorThrown=i,l&&l.call(r.context,t,e,i)};var u=r.xhr=t.Xhr.request(t.mixin(o,r));return n.trigger("request",n,u,r),u},Entity:n,Collection:r}),c}),t("skylark-backbone/events",["skylark-langx/langx","./backbone"],function(t,e){var i=Array.prototype.slice,n={on:function(t,e,n){var r=function(){var n=i.call(arguments,1);"all"==t&&n.unshift(arguments[0].type),e.apply(this,n)};return r._=e,this.overrided(t,r,n)},once:function(t,e,i){return this.one(t,e,i)},bind:function(t,e,i){return this.on(t,e,i)},unbind:function(t,e,i){return this.off(t,e,i)},stopListening:function(t,e,i){return this.unlistenTo(t,e,i)}},r=t.Evented.inherit(n),s=r.prototype,o=e.Events={bind:s.bind,listenTo:s.listenTo,listenToOnce:s.listenToOnce,off:s.off,on:s.on,once:s.once,stopListening:s.stopListening,trigger:s.trigger,unbind:s.unbind,unlistenTo:s.unlistenTo};return t.extend(e,o),{EventExtends:n,BackboneEvented:r}}),t("skylark-backbone/helper",["skylark-langx/langx","skylark-underscore/underscore","./backbone"],function(t,e,i){var n=function(t,i){return e.isFunction(t)?t:e.isObject(t)&&!i._isModel(t)?r(t):e.isString(t)?function(e){return e.get(t)}:t},r=function(t){var i=e.matches(t);return function(t){return i(t.attributes)}},s=i.extend=function(t,i){t.constructor=this._constructor;var n=this.inherit(t);return e.extend(n,i),n};return{addUnderscoreMethods:function(t,i,r){e.each(i,function(i,s){e[s]&&(t.prototype[s]=function(t,i,r){switch(t){case 1:return function(){return e[i](this[r])};case 2:return function(t){return e[i](this[r],t)};case 3:return function(t,s){return e[i](this[r],n(t,this),s)};case 4:return function(t,s,o){return e[i](this[r],n(t,this),s,o)};default:return function(){var t=slice.call(arguments);return t.unshift(this[r]),e[i].apply(e,t)}}}(i,s,r))})},extend:s}}),t("skylark-backbone/Collection",["skylark-langx/langx","./models","./backbone","./events","./helper"],function(t,e,i,n,r){var s=i.Collection=e.Collection.inherit({_construct:function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,_.extend({silent:!0},e))},initialize:function(){}});s.partial(n.EventExtends),Object.defineProperty(s.prototype,"model",{get(){return this.entity},set(t){this.entity=t}}),Object.defineProperty(s.prototype,"models",{get(){return this.entities},set(t){this.entities=t}}),s.prototype.modelId=s.prototype.entityId,s.prototype._isModel=s.prototype._isEntity;return r.addUnderscoreMethods(s,{forEach:3,each:3,map:3,collect:3,reduce:0,foldl:0,inject:0,reduceRight:0,foldr:0,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3,findIndex:3,findLastIndex:3},"models"),s.extend=r.extend,s}),t("skylark-backbone/Model",["skylark-langx/langx","skylark-underscore/underscore","./models","./backbone","./events","./helper"],function(t,e,i,n,r,s){var o=n.Model=i.Entity.inherit({_construct:function(e,i){t.Stateful.prototype._construct.apply(this,arguments),this.initialize.apply(this,arguments)},initialize:function(){},escape:function(t){return e.escape(this.get(t))},matches:function(t){return!!e.iteratee(t,this)(this.attributes)}});return o.partial(r.EventExtends),o.extend=s.extend,o}),t("skylark-backbone/View",["skylark-langx/langx","skylark-utils-dom/query","skylark-utils-dom/noder","skylark-utils-dom/plugins","skylark-underscore/underscore","./backbone","./events","./helper"],function(t,e,i,n,r,s,o,a){var c=s.View=n.Plugin.inherit({_construct:function(t){this.cid=r.uniqueId("view"),this.preinitialize.apply(this,arguments),r.extend(this,r.pick(t,u)),this._ensureElement(),this.initialize.apply(this,arguments)},tagName:"div",$:function(t){return this.$el.find(t)},preinitialize:function(){},initialize:function(){},render:function(){return this},remove:function(){return this._removeElement(),this.unlistenTo(),this},_removeElement:function(){this.$el.remove()},setElement:function(t){return this.undelegateEvents(),this._setElement(t),this.delegateEvents(),this},_setElement:function(t){this.$el=e(t),this.el=this.$el[0]},delegateEvents:function(e){if(e||(e=t.result(this,"events")),!e)return this;for(var i in this.undelegateEvents(),e){var n=e[i];if(t.isFunction(n)||(n=this[n]),n){var r=i.match(l);this.delegate(r[1],r[2],t.proxy(n,this))}}return this},delegate:function(t,e,i){return this.$el.on(t+".delegateEvents"+this.uid,e,i),this},undelegateEvents:function(){return this.$el&&this.$el.off(".delegateEvents"+this.uid),this},undelegate:function(t,e,i){return this.$el.off(t+".delegateEvents"+this.uid,e,i),this},_createElement:function(t,e){return i.createElement(t,e)},_ensureElement:function(){if(this.el)this.setElement(t.result(this,"el"));else{var e=t.mixin({},t.result(this,"attributes"));this.id&&(e.id=t.result(this,"id")),this.className&&(e.class=t.result(this,"className")),this.setElement(this._createElement(t.result(this,"tagName"),e)),this._setAttributes(e)}},_setAttributes:function(t){this.$el.attr(t)}});c.partial(o.EventExtends);var l=/^(\S+)\s*(.*)$/,u=["model","collection","el","id","attributes","className","tagName","events"];return c.extend=a.extend,c}),t("skylark-backbone/LocalStorage",["skylark-langx/langx","skylark-underscore","./models","./backbone"],function(t,e,i,n){function r(){return(65536*(1+Math.random())|0).toString(16).substring(1)}var s=t.klass({_construct:function(t){this.name=t;var e=this.localStorage().getItem(this.name);this.records=e&&e.split(",")||[]},save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(t){return t.id||(t.id=r()+r()+"-"+r()+"-"+r()+"-"+r()+"-"+r()+r()+r(),t.set(t.idAttribute,t.id)),this.localStorage().setItem(this.name+"-"+t.id,JSON.stringify(t)),this.records.push(t.id.toString()),this.save(),this.find(t)},update:function(t){return this.localStorage().setItem(this.name+"-"+t.id,JSON.stringify(t)),e.include(this.records,t.id.toString())||this.records.push(t.id.toString()),this.save(),this.find(t)},find:function(t){return this.jsonData(this.localStorage().getItem(this.name+"-"+t.id))},findAll:function(){return e(this.records).chain().map(function(t){return this.jsonData(this.localStorage().getItem(this.name+"-"+t))},this).compact().value()},destroy:function(t){return!t.isNew()&&(this.localStorage().removeItem(this.name+"-"+t.id),this.records=e.reject(this.records,function(e){return e===t.id.toString()}),this.save(),t)},localStorage:function(){return localStorage},jsonData:function(t){return t&&JSON.parse(t)}});return s.sync=i.localSync=function(t,e,i){var n,r,s=e.localStorage||e.collection.localStorage,o=$.Deferred&&$.Deferred();try{switch(t){case"read":n=void 0!=e.id?s.find(e):s.findAll();break;case"create":n=s.create(e);break;case"update":n=s.update(e);break;case"delete":n=s.destroy(e)}}catch(t){r=t.code===DOMException.QUOTA_EXCEEDED_ERR&&0===window.localStorage.length?"Private browsing is unsupported":t.message}return n?(e.trigger("sync",e,n,i),i&&i.success&&i.success(n),o&&o.resolve(n)):(r=r||"Record Not Found",i&&i.error&&i.error(r),o&&o.reject(r)),i&&i.complete&&i.complete(n),o&&o.promise()},i.ajaxSync=i.sync,i.getSyncMethod=function(t){return t.localStorage||t.collection&&t.collection.localStorage?i.localSync:i.ajaxSync},i.sync=function(t,e,n){return i.getSyncMethod(e).apply(this,[t,e,n])},n.LocalStorage=s}),t("skylark-backbone/main",["./backbone","./Collection","./events","./Model","./View","./LocalStorage"],function(t){return t}),t("skylark-backbone",["skylark-backbone/main"],function(t){return t})}(i),!r){var a=n("skylark-langx/skylark");s?module.exports=a:e.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-backbone.js.map
