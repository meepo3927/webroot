(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{79:function(t,n,e){"use strict";(function(t){e(7);var s={onClick0:function(){this.visible=!this.visible},onClick1:function(){this.list1.push(this.list1.length+". "+Math.random()+t.now()),this.list1.push(this.list1.length+". "+Math.random()+t.now()),this.list1.push(this.list1.length+". "+Math.random()+t.now())}},i={users:function(){return[{id:111,name:"郭野",score:1234},{id:111,name:"郭野-active",score:123,cls:"active"},{id:111,name:"郭野-success",score:123,cls:"success"},{id:111,name:"郭野",score:123},{id:111,name:"郭野",score:123},{id:111,name:"郭野-info",score:123,cls:"info"},{id:111,name:"郭野",score:123},{id:111,name:"郭野",score:123},{id:111,name:"郭野-warning",score:123,cls:"warning"},{id:111,name:"郭野-danger",score:123,cls:"danger"},{id:111,name:"郭野",score:123},{id:111,name:"郭野-active",score:123,cls:"active"},{id:111,name:"郭野",score:123}]},menuList:function(){return[{name:"用户研究中心",children:[{name:"用户研究",children:[{name:"测试菜单000"},{name:"测试菜单000"},{name:"测试菜单000"}]},{name:"动态标签训练"},{name:"标签使用日志"},{name:"标签管理",children:[{name:"标签生命周期管理"},{name:"标签预下线管理"}]}]},{name:"预约下线",children:[{name:"测试表单111"},{name:"测试表单222"}]},{name:"营销资源中心"},{name:"模型视窗"}]}};n.a={data:function(){return{gender:"",visible:!1,list1:[]}},created:function(){},methods:s,computed:i,watch:{},props:[],mounted:function(){window.VM=this},mixins:[],beforeDestroy:function(){},components:{}}}).call(this,e(81))},80:function(t,n,e){var s=e(83);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);(0,e(2).default)("43cede98",s,!0,{})},81:function(t,n,e){t.exports=e(5)(10)},82:function(t,n,e){"use strict";var s=e(80);e.n(s).a},83:function(t,n,e){(t.exports=e(1)(!1)).push([t.i,".test-upload[data-v-2fb255b5] {\n  padding-top: 15px;\n  padding-left: 15px;\n}\nform[data-v-2fb255b5] {\n  border: 1px solid #eee;\n  padding: 12px;\n}\nform .col-1[data-v-2fb255b5] {\n  width: 6em;\n}\n.scroll-test[data-v-2fb255b5] {\n  border: 1px solid #ccc;\n  width: 460px;\n  background-color: #fff;\n}\n.scroll-test-1[data-v-2fb255b5] {\n  max-height: 320px;\n}\n.scroll-test-2[data-v-2fb255b5] {\n  top: 0;\n  right: 0;\n  height: 50vh;\n}\n.table-wrapper[data-v-2fb255b5] {\n  width: 40vw;\n}\n.b-block[data-v-2fb255b5] {\n  height: 80vh;\n}\n.list-1[data-v-2fb255b5] {\n  padding: 8px;\n}\n.list-1 li[data-v-2fb255b5] {\n  margin: 15px;\n}\n.ol-1[data-v-2fb255b5] {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n}\nol > li[data-v-2fb255b5]:hover {\n  background-color: yellow;\n}\n.menu-2[data-v-2fb255b5],\n.menu-3[data-v-2fb255b5] {\n  position: absolute;\n  width: 220px;\n  height: 240px;\n  border: 1px solid #eee;\n  left: 320px;\n  z-index: 1;\n  background-color: #fff;\n}\n.menu-2[data-v-2fb255b5] {\n  top: 220px;\n}\n.menu-3[data-v-2fb255b5] {\n  top: 250px;\n}\n",""])},84:function(t,n,e){"use strict";e.r(n);var s=e(79).a,i=(e(82),e(0)),a=Object(i.a)(s,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"test-upload"},[e("h4",[t._v("oh yeah")]),t._v(" "),e("file-upload",{attrs:{filetype:"image"}}),t._v(" "),e("file-upload",{staticClass:"mt10",attrs:{filetype:"excel"}}),t._v(" "),e("input-file"),t._v(" "),e("mui-scroll",{ref:"ss2",staticClass:"scroll-test-2 scroll-test",attrs:{position:"absolute"}},[e("div",[e("ul",{staticClass:"list-1"},[e("li",[t._v("噢呃噢呃")]),t._v(" "),t._l(t.list1,function(n){return e("li",{domProps:{textContent:t._s(n)}})})],2),t._v(" "),e("button",{staticClass:"btn btn-default m20",on:{click:t.onClick1}},[t._v("Add Item+")])])]),t._v(" "),e("div",{staticClass:"fl"},[e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.onClick0}},[t._v("Danger")])]),t._v(" "),t.visible?e("level-menu",{attrs:{list:t.menuList}}):t._e(),t._v(" "),e("div",{staticClass:"table-wrapper "},[e("table",{staticClass:"table table-striped mt20"},[t._m(0),t._v(" "),e("tbody",t._l(t.users,function(n){return e("tr",{class:[n.cls]},[e("td",{domProps:{textContent:t._s(n.id)}}),t._v(" "),e("td",{domProps:{textContent:t._s(n.name)}}),t._v(" "),e("td",{domProps:{textContent:t._s(n.score)}})])}),0)])]),t._v(" "),e("div",{staticClass:"pb30"})],1)},[function(){var t=this.$createElement,n=this._self._c||t;return n("thead",[n("tr",[n("th",[this._v("ID")]),this._v(" "),n("th",[this._v("用户名")]),this._v(" "),n("th",[this._v("得分")])])])}],!1,null,"2fb255b5",null);n.default=a.exports}}]);