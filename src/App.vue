<template>
  <div id="app">
    <Menu mode="horizontal" theme="light" active-name="1" v-show="this.showNav">
      <img src="../src/assets/img/爪子.png"  class="pet_icon"/>
      <MenuItem name="1" class="menu-left" to="/home">
        <Icon type="ios-home" />首页
      </MenuItem>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-paper-plane" />发布消息
        </template>
        <MenuItem name="2-4">发布消息</MenuItem>
        <MenuItem name="2-1" to="/publishOut">发布送养</MenuItem>
        <MenuItem name="2-2" to="/publishAdoption">发布领养</MenuItem>
        <MenuItem name="2-3" to="/publishFindUser">发布寻主</MenuItem>
        <MenuItem name="2-5" to="/publishFindAni">发布寻宠</MenuItem>
      </Submenu>
      <MenuItem name="3" to="/back">
        <Icon type="md-paw" />宠秀/回访
      </MenuItem>
      <MenuItem name="4" to="/adoption">
        <Icon type="ios-construct" />领养基地
      </MenuItem>
      <MenuItem name="5" to="/news">
        <Icon type="logo-hackernews" />宠物新闻
      </MenuItem>
      <MenuItem name="6" to="/message">
        <Icon type="ios-paper" />领养须知
      </MenuItem>
      <MenuItem name="7" to="/hope">
        <Icon type="ios-construct" />许愿墙
      </MenuItem>
      <MenuItem name="8" class="menu-right" to="/encyclopedias">
        <Icon type="ios-easel" />百科
      </MenuItem>
      <MenuItem name="9" to="/login">
        <Icon type="ios-construct" />登录
      </MenuItem>
      <MenuItem name="10" to="/userinfo">
        <Icon type="md-person" />个人中心
      </MenuItem>
    </Menu>

    <Menu mode="horizontal" theme="light" active-name="1" v-show="this.showOthers">
      <img src="../src/assets/img/爪子.png"  class="pet_icon"/>
     
      <MenuItem name="8" class="menu-right-admin" to="/admin_user">
        <Icon type="ios-settings" />用户设置
      </MenuItem>
      <MenuItem name="9" to="/admin_login">
        <Icon type="ios-construct" />登录
      </MenuItem>
     
    </Menu>
  
    <router-view />
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "App",
  data() {
    return {
      active: 0,
      showOthers : false,
      showNav :true
    };
  },
  watch:{
    '$route':'pathFilter'
  },
  methods:{
    
    pathFilter(){
      var _path = this.$route.path
      console.log(_path)
    
      if( _path.match('/admin*')){
        this.showOthers = true
        this.showNav = false
      }else{
        this.showOthers = false
        this.showNav = true
      }
    }
  },
  mounted(){
    this.pathFilter()
  }
};
</script>

<style>
.pet_icon {
  height: 55px;
  position: absolute;
  top: 2px;
  left: 20px;
}
.menu-left {
  margin-left: 140px;
}
.menu-right {
  margin-right: 500px;
}
.menu-right-admin{
  margin-left: 140px;
  margin-right: 1480px;
}

</style>
