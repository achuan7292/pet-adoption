<template>
  <div class="pet_bgi">
    <h1 style="margin-bottom:40px;">发布领养</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      
      <FormItem label="上传图片">
        <Upload
          :action="'pet-adoption/animal/upload'"
          :format="['jpg','jpeg','png']"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleSuccess"
          :max-size="20480"
        >
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>

      <FormItem label="领养时间">
            <FormItem prop="adate">
               <DatePicker type="datetime" placeholder="Select date and time" v-model="formValidate.adate"></DatePicker>
            </FormItem>
         
      </FormItem>
      <FormItem label="性别" prop="asex">
        <RadioGroup v-model="formValidate.asex">
          <Radio label="0">公猫</Radio>
          <Radio label="1">母猫</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="联系方式" prop="atitle">

       <Input v-model="formValidate.atitle" placeholder="请输入联系方式" clearable />
      </FormItem>
      <FormItem label="描述" prop="adesc">
        <Input
          v-model="formValidate.adesc"
          type="textarea"
          show-word-limit
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="介绍一下你的宠物吧"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">发布</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "PublishAdoption",
  data() {
    return {
      formValidate: {
        adate: "",
        asex: "",
        adesc: "",
        aic:"",
        atitle:""
      },
      ruleValidate: {
        atitle: [
          {
            required: true,
            message: "请输入联系方式用户名",
            trigger: "blur"
          }
        ],
        asex: [
          { required: true, message: "您还未选择性别", trigger: "change" }
        ],
        adate: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        adesc: [
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
          this.$axios
            .post( "pet-adoption/animal/publishAdoption", this.formValidate)
            .then(res => {
              if (res.data.success) {
                this.$Message.success(res.data.message);
              } else {
                this.$Message.error(res.data.message);
              }
            })
            .catch(err => this.$Message.error("服务器错误!"));
        } else {
          this.$Message.error("请完善信息!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSuccess(res, file) {
      console.log(res)
      file.url = this.$host + "/img" + res.url;
      this.formValidate.aic = res.url
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不允许此类型的文件",
        desc: "文件 " + file.name + " 格式不正确, 请选择 jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超过限制",
        desc: "文件  " + file.name + " 太大了，不可以超过20M."
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
  color: black;
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
  width: 400px;
  margin: 0 auto;
  color: black;
}
</style>