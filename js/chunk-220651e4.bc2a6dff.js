(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-220651e4"],{"129f":function(t,a){t.exports=Object.is||function(t,a){return t===a?0!==t||1/t===1/a:t!=t&&a!=a}},2277:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"home"},[e("VueLoading",{attrs:{loading:"",active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}},[e("loading")],1),e("VueWindowResize",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],model:{value:t.window,callback:function(a){t.window=a},expression:"window"}}),e("header",{staticClass:"header"},[e("nav",{staticClass:"nav-top"},[e("div",{staticClass:"menu-icon cursor-pointer",class:{opened:t.menu.openMobileMenu},on:{click:t.mobileMenu}},[e("span",{staticClass:"bar"}),e("span",{staticClass:"bar"}),e("span",{staticClass:"bar"})]),e("router-link",{attrs:{to:"/"}},[e("img",{staticClass:"logo",style:{height:t.logoMaxHeight?"100px":"70px"},attrs:{src:s("9d64"),alt:""}})]),e("ul",{staticClass:"link-top"},[e("li",[e("a",{staticClass:"text-main p-3",attrs:{href:"javascript:;"},on:{click:function(a){return a.preventDefault(),t.isSearch(a)}}},[e("i",{staticClass:"fas fa-search"})]),e("div",{staticClass:"search",class:{opened:t.search},attrs:{id:"search"}},[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchName,expression:"searchName",modifiers:{trim:!0}}],ref:"searchInput",staticClass:"search-text",attrs:{type:"text",placeholder:"請輸入產品名稱"},domProps:{value:t.searchName},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.searchProduct(t.searchName)},input:function(a){a.target.composing||(t.searchName=a.target.value.trim())},blur:function(a){return t.$forceUpdate()}}}),e("button",{staticClass:"btn btn-main",on:{click:function(a){return t.searchProduct(t.searchName)}}},[t._v("搜尋")]),e("i",{staticClass:"search-close cursor-pointer fas fa-times",on:{click:function(a){return a.preventDefault(),t.isSearch(a)}}})])]),"/checkout"!==this.$route.path?e("li",[e("a",{staticClass:"text-main p-3",attrs:{href:"javascript:;","data-toggle":"modal","data-target":"#cartModal"}},[e("i",{staticClass:"fas fa-shopping-cart"}),e("span",{staticClass:"badge badge-primary rounded-circle cartnum-text"},[t._v(t._s(t.carts.length))])])]):t._e()])],1),e("nav",{staticClass:"menu"},[e("div",{staticClass:"container"},[e("ul",{staticClass:"menu-down",class:{show:t.menu.openMenuDown}},[t._m(0),e("li",{staticClass:"menu-down-item",on:{click:t.clearStyle}},[e("router-link",{staticClass:"menu-down-link text-main",attrs:{to:"/products"}},[e("i",{staticClass:"fab fa-product-hunt mr-2"}),t._v("產品")])],1),e("li",{staticClass:"menu-down-item",on:{click:t.clearStyle}},[e("router-link",{staticClass:"menu-down-link text-main",attrs:{to:"/about"}},[e("i",{staticClass:"far fa-handshake mr-2"}),t._v("關於弄甜屋")])],1),e("li",{staticClass:"menu-down-item",on:{click:t.clearStyle}},[e("router-link",{staticClass:"menu-down-link text-main",attrs:{to:"/contact"}},[e("i",{staticClass:"far fa-address-card mr-2"}),t._v("聯絡我們")])],1)])])])]),e("router-view",{attrs:{carts:t.carts}}),"/checkout"!==this.$route.path?e("footer",{class:{"footer-mb":0===this.$route.path.indexOf("/product/")}},[t._m(1),e("div",{staticClass:"text-center py-3"},[t._v(" Copyright 2020 © 弄甜屋 All Rights Reserved. ")])]):t._e(),e("CartModal",{attrs:{carts:t.carts,"price-total":t.priceTotal}})],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"menu-down-item"},[e("img",{staticClass:"logo",attrs:{src:s("9d64"),alt:""}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"footer py-5"},[e("div",{staticClass:"footer-media"},[e("img",{staticClass:"footer-logo",attrs:{src:s("9d64"),alt:"",height:"150"}}),e("ul",[e("li",[e("a",{staticClass:"media-item text-main",attrs:{href:"javascript:;"}},[e("i",{staticClass:"fab fa-facebook-square"})])]),e("li",[e("a",{staticClass:"media-item text-main",attrs:{href:"javascript:;"}},[e("i",{staticClass:"fab fa-instagram-square"})])]),e("li",[e("a",{staticClass:"media-item text-main",attrs:{href:"javascript:;"}},[e("i",{staticClass:"fab fa-line"})])])])]),e("div",{staticClass:"footer-info"},[e("ul",[e("li",{staticClass:"py-1"},[e("span",[e("i",{staticClass:"fas fa-phone"}),t._v("電話： ")]),e("a",{attrs:{href:"tel:07-5168168"}},[t._v("07-5168168")])]),e("li",{staticClass:"py-1"},[e("span",[e("i",{staticClass:"far fa-envelope"}),t._v("信箱： ")]),e("a",{attrs:{href:"mailto:money168@give.com"}},[t._v("money168@give.com")])]),e("li",{staticClass:"py-1"},[e("span",[e("i",{staticClass:"fas fa-map-marked-alt"}),t._v("地址：高雄市前鎮區凱旺街1號 ")])]),e("li",{staticClass:"py-1"},[e("span",[e("i",{staticClass:"far fa-clock"}),t._v("營業時間：8:00 ~ 20:00 ")])])])])])}],n=(s("99af"),s("4160"),s("ac1f"),s("841c"),s("159b"),function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)}),r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"loading-img"}),s("div",{staticClass:"loading-text"},[t._v("Loading...")])])}],o=(s("cb13"),s("2877")),c={},l=Object(o["a"])(c,n,r,!1,null,null,null),u=l.exports,d=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"cartModal modal fade modal-left",attrs:{id:"cartModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header w-100 bg-white"},[s("div",{staticClass:"d-flex justify-content-between align-items-center w-100"},[t._m(0),s("div",[s("div",{staticClass:"large-size text-center"},[t._v("購物清單")]),s("div",{staticClass:"large-size"},[s("span",[t._v("小計")]),s("span",[t._v(" $ "+t._s(t._f("thousands")(t.priceTotal)))])])]),t._m(1)])]),t.carts.length>0?s("div",{staticClass:"modal-body"},t._l(t.carts,(function(a){return s("div",{key:a.product.id,staticClass:"row"},[s("div",{staticClass:"cart-item d-flex position-relative p-3 w-100"},[s("div",[s("img",{staticClass:"cart-img img-fluid",attrs:{src:a.product.imageUrl,alt:""}}),s("div",{staticClass:"qty-counter d-flex"},[s("button",{staticClass:"btn btn-compute less",attrs:{type:"button","data-btn":"less",disabled:a.quantity<=1||""!==t.btnLoading},on:{click:function(s){a.quantity--,t.updateQuantity(s,a.product.id,a.quantity)}}},[t.btnLoading===a.product.id&&"less"===t.btnStatus?s("div",{staticClass:"spinner-border spinner-border-sm m-auto",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):s("i",{staticClass:"fas fa-minus"})]),s("input",{directives:[{name:"model",rawName:"v-model.number",value:a.quantity,expression:"item.quantity",modifiers:{number:!0}}],staticClass:"text-center qty-num",attrs:{type:"number","data-btn":"input",min:"1",max:"99",value:"1",disabled:""!==t.btnStatus||"input"===t.btnStatus},domProps:{value:a.quantity},on:{change:function(s){return t.updateQuantity(s,a.product.id,a.quantity)},input:function(s){s.target.composing||t.$set(a,"quantity",t._n(s.target.value))},blur:function(a){return t.$forceUpdate()}}}),t.btnLoading===a.product.id&&"input"===t.btnStatus?s("div",{staticClass:"spinner-border spinner-border-sm m-auto qty-loading",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):t._e(),s("button",{staticClass:"btn btn-compute plus",attrs:{type:"button","data-btn":"plus",disabled:""!==t.btnLoading},on:{click:function(s){a.quantity++,t.updateQuantity(s,a.product.id,a.quantity)}}},[t.btnLoading===a.product.id&&"plus"===t.btnStatus?s("div",{staticClass:"spinner-border spinner-border-sm m-auto",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):s("i",{staticClass:"fas fa-plus"})])])]),s("div",{staticClass:"w-100"},[s("h4",{staticClass:"m-3"},[t._v(t._s(a.product.title))]),s("div",{staticClass:"subtitle m-3"},[t._v(t._s(a.product.unit))]),s("div",{staticClass:"price-text text-right"},[s("span",[t._v("NT $ ")]),s("span",[t._v(t._s(t._f("thousands")(a.product.subtotal)))])])]),s("button",{staticClass:"btn btn-outline-main del-btn d-flex align-items-center justify-content-center",attrs:{type:"button","data-btn":"del",disabled:""!==t.btnLoading},on:{click:function(s){return s.preventDefault(),t.delProduct(s,a.product.id,a.product)}}},[t.btnLoading===a.product.id&&"del"===t.btnStatus?s("div",{staticClass:"spinner-border spinner-border-sm m-auto",attrs:{role:"status"}},[s("span",{staticClass:"sr-only"},[t._v("Loading...")])]):s("i",{staticClass:"far fa-trash-alt"})])])])})),0):s("div",{staticClass:"modal-body"},[s("div",{staticClass:"d-flex justify-content-center align-items-center h-100"},[t._v("目前購物車沒有任何商品")])]),s("div",{staticClass:"modal-footer w-100 bg-white"},[s("button",{staticClass:"large-size btn btn-main w-100",attrs:{type:"button",disabled:t.errorQty||0===t.carts.length},on:{click:t.checkout}},[t._v("立即結帳")])])])])])])},p=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("span",{staticClass:"cart-icon px-4"},[s("i",{staticClass:"fas fa-cart-arrow-down"})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"close m-0",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],h=s("1157"),m=s.n(h),f={props:["carts","priceTotal"],data:function(){return{btnLoading:"",tenpQuantity:0,errorQty:!1,btnStatus:""}},methods:{checkout:function(){"/checkout"!==this.$route.path&&this.$router.push("/checkout"),m()("#cartModal").modal("hide")},updateQuantity:function(t,a,s){var e=this,i=t.currentTarget.dataset.btn;this.btnLoading=a,this.tenpQuantity=s,this.errorQty=!0;var n="".concat("https://course-ec-api.hexschool.io","/api/").concat("fafb5ae3-81cd-4ad3-9cd2-824d4284b57c","/ec/shopping"),r={product:a,quantity:s};switch(i){case"less":this.btnStatus=i;break;case"plus":this.btnStatus=i;break;case"input":this.btnStatus=i;break;default:}var o=/^[1-9]+[0-9]*]*$/;if(!o.test(r.quantity))return this.$toast.error("數量錯誤"),this.btnLoading="",this.btnStatus="",void(this.errorQty=!0);this.$http.patch(n,r).then((function(){e.btnLoading="",e.btnStatus="",e.errorQty=!1,e.$bus.$emit("getcart","edit")})).catch((function(t){if(r.quantity===e.tenpQuantity)return e.btnLoading="",e.btnStatus="",e.errorQty=!1,void e.$toast.success("數量更新正確");e.$toast.error("".concat(t.response.data.errors)),e.btnLoading="",e.btnStatus=""}))},delProduct:function(t,a,s){var e=this;this.btnStatus=t.currentTarget.dataset.btn,this.btnLoading=a;var i="".concat("https://course-ec-api.hexschool.io","/api/").concat("fafb5ae3-81cd-4ad3-9cd2-824d4284b57c","/ec/shopping/").concat(a);this.$http.delete(i,s).then((function(){e.$bus.$emit("getcart","del"),e.btnLoading="",e.btnStatus=""})).catch((function(t){e.$toast.error("".concat(t.response.data.errors),{icon:"fas fa-times"}),e.btnLoading=""}))}}},b=f,v=Object(o["a"])(b,d,p,!1,null,"0ab50dd4",null),g=v.exports,C={components:{loading:u,CartModal:g},data:function(){return{menu:{openMobileMenu:!1,openMenuDown:!1,bodyFreeze:!1},searchName:"",url:"",search:!1,window:{width:0,height:0},logoMaxHeight:!0,carts:[],priceTotal:0}},computed:{isLoading:function(){return this.$store.state.isLoading}},created:function(){var t=this;this.$bus.$on("getcart",(function(a){t.getCart(a)}))},mounted:function(){window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleResize),this.handleResize(),this.getCart()},destroyed:function(){window.removeEventListener("resize",this.handleResize),window.removeEventListener("scroll",this.handleScroll)},watch:{$route:function(t,a){t.path!==a.path&&this.search&&(this.search=!1)}},methods:{searchProduct:function(t){this.searchName&&(this.searchName="",this.search=!1,this.$router.push("/search/q=".concat(t)))},getCart:function(t){var a=this,s="".concat("https://course-ec-api.hexschool.io","/api/").concat("fafb5ae3-81cd-4ad3-9cd2-824d4284b57c","/ec/shopping");this.$http.get(s).then((function(s){a.carts=s.data.data,a.priceTotal=0,a.carts.forEach((function(t,s){a.carts[s].product.subtotal=t.product.price*t.quantity,a.priceTotal+=t.product.price*t.quantity})),"add"===t&&a.$toast.success("已加入購物車～"),"edit"===t&&a.$toast.success("購物車數量已更新"),"del"===t&&a.$toast.success("商品移除成功"),"success"===t&&a.$toast.success("成功幫您建立訂單囉～")})).catch((function(t){a.$toast.error("取得購物車資料異常".concat(t),{icon:"fas fa-times"})}))},clearStyle:function(){this.menu.openMobileMenu=!1,this.menu.openMenuDown=!1,this.menu.bodyFreeze=!1,document.body.classList.remove("freeze")},mobileMenu:function(){this.menu.openMobileMenu=!this.menu.openMobileMenu,this.menu.openMenuDown=!this.menu.openMenuDown,document.body.classList.toggle("freeze")},isSearch:function(){var t=this;this.search=!this.search,setTimeout((function(){t.$refs.searchInput.focus()}),1)},handleResize:function(){var t=this.window.width,a=this.menu.openMobileMenu;t<768&&a?document.body.classList.add("freeze"):document.body.classList.remove("freeze")},handleScroll:function(){this.scroll=document.documentElement.scrollTop||document.body.scrollTop,this.scroll>50?this.logoMaxHeight=!1:this.logoMaxHeight=!0}}},y=C,w=Object(o["a"])(y,e,i,!1,null,null,null);a["default"]=w.exports},"841c":function(t,a,s){"use strict";var e=s("d784"),i=s("825a"),n=s("1d80"),r=s("129f"),o=s("14c3");e("search",1,(function(t,a,s){return[function(a){var s=n(this),e=void 0==a?void 0:a[t];return void 0!==e?e.call(a,s):new RegExp(a)[t](String(s))},function(t){var e=s(a,t,this);if(e.done)return e.value;var n=i(t),c=String(this),l=n.lastIndex;r(l,0)||(n.lastIndex=0);var u=o(n,c);return r(n.lastIndex,l)||(n.lastIndex=l),null===u?-1:u.index}]}))},"9d64":function(t,a,s){t.exports=s.p+"img/logo.427451fe.png"},cb13:function(t,a,s){"use strict";s("f314")},f314:function(t,a,s){}}]);
//# sourceMappingURL=chunk-220651e4.bc2a6dff.js.map