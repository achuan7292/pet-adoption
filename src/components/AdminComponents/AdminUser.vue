<template>
  <div>
    <!-- 抽屉组件-->
    <Button
      type="primary"
      shape="circle"
      icon="md-add"
      class="pet_button"
      @click="value3 = true"
    >添加新的用户</Button>
    <Drawer title="添加新的用户" v-model="value3" width="720" :mask-closable="false" :styles="styles">
      <Form :model="formData">
        <FormItem label="用户名" label-position="top">
          <Input type="text" v-model="formData.username" :rows="3" placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="用户密码" label-position="top">
          <Input type="password" v-model="formData.password" :rows="3" />
        </FormItem>
        <FormItem label="用户性别">
          <RadioGroup v-model="formData.sex">
            <Radio label="0">男</Radio>
            <Radio label="1">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="用户描述" label-position="top">
          <Input type="textarea" v-model="formData.udesc" :rows="3" placeholder="简单的用户" />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
        <Button type="primary" @click="handleSubmit">Submit</Button>
      </div>
    </Drawer>
    <Drawer title="添加新的用户" v-model="value2" width="720" :mask-closable="false" :styles="styles">
      <Form :model="formData">
        <FormItem label="用户名" label-position="top">
          <Input type="text" v-model="formData.username" :rows="3" placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="用户密码" label-position="top">
          <Input type="password" v-model="formData.password" :rows="3" />
        </FormItem>
        <FormItem label="用户性别">
          <RadioGroup v-model="formData.sex">
            <Radio label="0">男</Radio>
            <Radio label="1">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="用户描述" label-position="top">
          <Input type="textarea" v-model="formData.udesc" :rows="3" placeholder="简单的用户" />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
        <Button type="primary" @click="handleSubmit2">Submit</Button>
      </div>
    </Drawer>
    <!-- 用户列表
    -->
    <div v-for="item in list" :key="item.uid" class="user_list">
      <div class="demo-avatar">
        <Avatar
          shape="square"
          icon="ios-person"
          size="large"
          src="https://i.loli.net/2017/08/21/599a521472424.jpg"
        />
        <span>{{item.username}}</span>
      </div>
      <Breadcrumb separator="|">
        <BreadcrumbItem>
          <a @click="editUser(item)">
            <Icon type="ios-home-outline"></Icon>修改用户
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a @click="delUser(item.uid)">
            <Icon type="logo-buffer"></Icon>删除用户
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="ios-cafe"></Icon>展开/收缩 评论
        </BreadcrumbItem>
      </Breadcrumb>
      <List>
        <ListItem v-for="co in item.comment" :key="co.cid">
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            :title="co.cstart"
            :description="co.cdesc"
          />
          <template slot="action">
            <li>
              <a @click="delComment(co.cid)">删除</a>
            </li>
            <li>
              <a @click="handleRender(co)">修改</a>
            </li>
          </template>
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      value3: false,
      value2: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        udesc: "",
        username: "",
        password: "",
        sex: "0",
        ncontent: ""
      },
      isClick: false,
      uid: "",
      comment: {
        cid: "",
        cdesc: "",
        cstart: "",
        pid: ""
      }
    };
  },
  methods: {
    getList() {
      this.$axios
        .get("pet-adoption/admin/userAndCommentAdmin")
        .then(res => {
          this.list = res.data;
          this.$Message.success("列表渲染成功");
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    handleSubmit() {
      this.value3 = false;
      this.$axios
        .post("pet-adoption/user/register", this.formData)
        .then(res => {
          this.list = res.data;
          if (res.data.success) {
            this.$Message.success(res.data.message);
            this.getList();
          } else {
            this.$Message.err(res.data.message);
          }
        })
        .catch(err => this.$Message.error("服务器错误"));
      this.getList();
    },
    handleSubmit2() {
      this.value3 = false;
      this.$axios
        .post("pet-adoption/admin/AdminUpdateUserInfo", this.formData)
        .then(res => {
          if (res.data.success) {
            this.$Message.success(res.data.message);
            this.getList();
          } else {
            this.$Message.err(res.data.message);
          }
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    editUser(item) {
      this.value2 = true;
      this.formData = item;
    },
    delUser(uid) {
      this.$axios
        .post("pet-adoption/admin/AdminDelUser", {
          uid: uid
        })
        .then(res => {
          if (res.data.success) {
            this.$Message.success(res.data.message);
            this.getList();
          } else {
            this.$Message.err(res.data.message);
          }
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    delComment(cid) {
      this.$axios
        .get("pet-adoption/admin/AdminDelComment?cid=" + cid)
        .then(res => {
          if (res.data.success) {
            this.$Message.success(res.data.message);
            this.getList();
          } else {
            this.$Message.err(res.data.message);
          }
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    handleRender(co) {
      this.$Modal.confirm({
        title: "修改评论",
        onOk: function() {
          this.$axios
            .post("pet-adoption/admin/AdminUpdateComment", co)
            .then(res => {
              if (res.data.success) {
                this.$Message.success(res.data.message);
                this.getList();
              } else {
                this.$Message.err(res.data.message);
              }
            })
        },
        render: h => {
          return h("Input", {
            props: {
              value: co.cdesc,
              autofocus: true
            },
            on: {
              input: val => {
                co.cdesc = val;
              }
            }
          });
        }
      });
    }
  },
  mounted() {
    this.getList();
    this.$axios
      .get("pet-adoption/user/user")
      .then(res => {
        this.uid = res.data.uid;
      })
      .catch(err => this.$Message.error("服务器错误"));
  }
};
</script>
<style>
.pet_button {
  margin: 10px 0px 10px 1700px;
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.page_div {
  text-align: center;
  margin-top: 30px;
}
.user_list {
  width: 100%;
  margin-bottom: 50px;
}
</style>