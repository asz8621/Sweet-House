(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6dc78225"],{"294f":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"login"},[a("img",{staticClass:"mb-3",attrs:{src:e("9d64"),alt:"",width:"200"}}),a("form",{staticClass:"form-signin",on:{submit:function(s){return s.preventDefault(),t.signin(s)}}},[a("div",{staticClass:"signin-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"login-input form-control mb-4",attrs:{type:"email",id:"inputEmail",placeholder:"Account",autocomplete:"off",required:""},domProps:{value:t.user.email},on:{input:function(s){s.target.composing||t.$set(t.user,"email",s.target.value)}}}),t._m(0)]),a("div",{staticClass:"signin-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"login-input form-control mb-4",attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:t.user.password},on:{input:function(s){s.target.composing||t.$set(t.user,"password",s.target.value)}}}),t._m(1)]),a("button",{staticClass:"large-size btn btn-lg btn-main btn-block",attrs:{type:"submit"}},[t._v("登入")]),a("p",{staticClass:"text-muted mt-6 mb-4"},[t._v("© 2021 弄甜屋 All Rights Reserved.")])])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("label",{staticClass:"signin-icon",attrs:{for:"inputEmail"}},[e("i",{staticClass:"fas fa-user-alt"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("label",{staticClass:"signin-icon",attrs:{for:"inputPassword"}},[e("i",{staticClass:"fas fa-key"})])}],n=(e("99af"),{data:function(){return{user:{email:"",password:""}}},methods:{signin:function(){var t=this,s="".concat("https://course-ec-api.hexschool.io","/api/auth/login");this.$http.post(s,this.user).then((function(s){var e=s.data,a=e.token,i=e.expired;document.cookie="SHtoken=".concat(a,"; expires=").concat(new Date(1e3*i),"; path=/"),t.$router.push("/admin/index")})).catch((function(){alert("請確認帳號密碼"),t.user.password=""}))}}}),o=n,r=(e("bb6f"),e("2877")),c=Object(r["a"])(o,a,i,!1,null,"2e318880",null);s["default"]=c.exports},"9d64":function(t,s,e){t.exports=e.p+"img/logo.427451fe.png"},bb6f:function(t,s,e){"use strict";e("cd13")},cd13:function(t,s,e){}}]);
//# sourceMappingURL=chunk-6dc78225.e89ce3c8.js.map