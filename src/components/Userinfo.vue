<template>
  <div class="pet_bgi">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户名" prop="username">
        <Input v-model="formValidate.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" password v-model="formValidate.password" placeholder="请输入密码"/>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup v-model="formValidate.sex">
          <Radio label="0">男</Radio>
          <Radio label="1">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="描述" prop="udesc">
        <Input
          v-model="formValidate.udesc"
          type="textarea"
          show-word-limit
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="介绍一下自己吧"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      formValidate: {
        username: "",
        password: "",
        sex: "",
        udesc: ""
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "名字不可为空",
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
        ],
        sex: [
          { required: true, message: "您还未选择性别", trigger: "change" }
        ],
        udesc: [
          {
            required: true,
            message: "请输入你的描述",
            trigger: "blur"
          },
          {
            type: "string",
            min: 5,
            message: "描述不可以少于5个字",
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
          this.$axios.post('pet-adoption/user/updateUserInfo',this.formValidate).then(res=>{
            if(res.data.success){
              this.$Message.success("修改成功!");
              this.$router.replace('/login')
            }else{
              this.$Message.error("修改失败!");
            }
          }).catch(err => this.$Message.error("服务器错误!"))
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
  mounted(){
      this.$axios.get('pet-adoption/user/user').then(res => this.formValidate = res.data)
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
form {
  width: 300px;
  margin: 0 auto;
  color: black;
}
</style>