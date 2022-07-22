import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Select ,Container,Aside,Header,Main,Footer,Breadcrumb,BreadcrumbItem,Avatar,Divider,Input,Tag,Empty,Card,Image,Table,TableColumn,Option,Tabs,TabPane,Pagination,Descriptions,DescriptionsItem,Row} from 'element-ui';
import 'element-plus/dist/index.css'
import "./assets/global.css";
Vue.filter('select',(date,Input) => {
  alert(Input,date)
  if(date.indexOf(Input)!==-1){
    console.log('123');
  }
 
})
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Empty)
Vue.use(Card)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Row)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
