<template>
  <div class="pet_bgi">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
      <FormItem prop="user">
        <Input type="text" v-model="formInline.username"  placeholder="请输入用户名" style="margin-bottom:20px;">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" password v-model="formInline.password" placeholder="请输入密码" style="margin-bottom:20px;">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="warning" @click="handleSubmit('formInline')" style="margin:0 10px">登录</Button>
        <Button type="warning"  to="/register" style="margin:0 10px">注册</Button>
        <Button type="warning"  to="/admin_login">我是管理员</Button>
      </FormItem>
      
    </Form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      formInline: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不可以小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios.post('pet-adoption/user/login',{
              username:this.formInline.username,
              password:this.formInline.password
            }).then(res=>{
            if(res.data.success){
              this.$Message.success("登录成功!");
              this.$router.push('/home')
            }else{
              this.$Message.error(res.data.message);
            }
          }).catch(err => this.$Message.error("服务器错误!"))
        } else {
          this.$Message.error("请完善信息!");
        }
      });
    }
  }
};
</script>
<style scoped>
.pet_bgi {
  height: 1080px;
  text-align: center;
  padding-top: 150px;
}
.pet_bgi::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  background: transparent url("../assets/img/宠物7.jpg") center center no-repeat;
  filter: blur(5px);
  z-index: -1;
  background-size: cover;
}
form{
    width: 300px;
    margin: 0 auto;
}
</style>