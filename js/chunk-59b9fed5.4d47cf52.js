(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59b9fed5"],{"0542":function(e,t,a){},"28e0":function(e,t,a){"use strict";a("0542")},"2fbc":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:{"breadcrumb-top":e.paddingTop}},[a("nav",{attrs:{"aria-label":"breadcrumb"}},[a("ol",{staticClass:"breadcrumb px-0 bg-white"},[a("li",{staticClass:"breadcrumb-item"},[a("router-link",{attrs:{to:"/"}},[a("i",{staticClass:"fas fa-home text-main"})])],1),a("li",{staticClass:"breadcrumb-item",class:{active:!e.deepLink}},[e.deepLink?a("router-link",{staticClass:"text-main",attrs:{to:"/products"}},[e._v("全部產品")]):a("span",[e._v(e._s(this.$route.name))])],1),e.deepLink?a("li",{staticClass:"breadcrumb-item active",class:{active:e.deepLink},attrs:{"aria-current":"page"}},[e._v(" "+e._s(e.productTitle)+" ")]):e._e()])])])},r=[],i=(a("b0c0"),{props:["productTitle","paddingTop"],data:function(){return{product:[],deepLink:!1}},mounted:function(){this.links(this.$route.name)},methods:{links:function(e){this.deepLink="Product"===e}}}),n=i,o=(a("28e0"),a("2877")),l=Object(o["a"])(n,s,r,!1,null,null,null);t["a"]=l.exports},"7aaa":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[a("div",{staticClass:"container pt-5 pb-5"},[a("Breadcrumb"),e._m(0),a("div",{staticClass:"row py-5"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form"},[a("ValidationObserver",{scopedSlots:e._u([{key:"default",fn:function(t){var s=t.invalid;return[a("form",[a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.errors,r=t.classes;return[a("label",{attrs:{for:"name"}},[e._v("姓名")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],staticClass:"form-control",class:r,attrs:{type:"text",id:"names",placeholder:"請輸入姓名",name:"姓名"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[e._v(e._s(s[0]))])]}}],null,!0)})],1),a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{rules:"required|integer|min:8|numeric"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.errors,r=t.classes;return[a("label",{attrs:{for:"phone"}},[e._v("電話")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.form.phone,expression:"form.phone"}],staticClass:"form-control",class:r,attrs:{type:"tel",id:"phone",placeholder:"請輸入電話",name:"電話"},domProps:{value:e.form.phone},on:{input:function(t){t.target.composing||e.$set(e.form,"phone",t.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[e._v(e._s(s[0]))])]}}],null,!0)})],1),a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.errors,r=t.classes;return[a("label",{attrs:{for:"email"}},[e._v("信箱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.form.email,expression:"form.email"}],staticClass:"form-control",class:r,attrs:{type:"text",id:"email",placeholder:"請輸入信箱",name:"信箱"},domProps:{value:e.form.email},on:{input:function(t){t.target.composing||e.$set(e.form,"email",t.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[e._v(e._s(s[0]))])]}}],null,!0)})],1),a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.errors,r=t.classes;return[a("label",{attrs:{for:"message"}},[e._v("問題描述或相關建議")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.message,expression:"form.message"}],staticClass:"form-control",class:r,attrs:{id:"message",rows:"5",placeholder:"留下您的問題或建議",name:"問題或建議"},domProps:{value:e.form.message},on:{input:function(t){t.target.composing||e.$set(e.form,"message",t.target.value)}}}),a("span",{staticClass:"invalid-feedback"},[e._v(e._s(s[0]))])]}}],null,!0)})],1),a("button",{staticClass:"large-size btn btn-main w-100",attrs:{type:"submit",disabled:s}},[e._v("送出表單")])])]}}])})],1)]),e._m(1)])],1)])},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"headline py-4"},[a("h2",[e._v("聯絡我們")]),a("hr",{staticClass:"headline-bottom"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"map"},[a("iframe",{staticStyle:{border:"0"},attrs:{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1841.800451128156!2d120.31784567600603!3d22.594025372626124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e036a5d95c9a9%3A0xb983a800c2334e9b!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5Yex5pe66KGX!5e0!3m2!1szh-TW!2stw!4v1611556123162!5m2!1szh-TW!2stw",width:"100%",height:"100%",frameborder:"0",allowfullscreen:"","aria-hidden":"false",tabindex:"0"}})])])}],i=a("2fbc"),n={components:{Breadcrumb:i["a"]},data:function(){return{form:{name:"",phone:"",email:"",message:""}}}},o=n,l=a("2877"),c=Object(l["a"])(o,s,r,!1,null,null,null);t["default"]=c.exports},b0c0:function(e,t,a){var s=a("83ab"),r=a("9bf2").f,i=Function.prototype,n=i.toString,o=/^\s*function ([^ (]*)/,l="name";s&&!(l in i)&&r(i,l,{configurable:!0,get:function(){try{return n.call(this).match(o)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-59b9fed5.4d47cf52.js.map