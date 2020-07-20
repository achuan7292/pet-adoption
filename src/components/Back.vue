<template>
  <List>
    <Button
      type="primary"
      shape="circle"
      icon="md-add"
      class="pet_button"
      @click="value3 = true"
    >添加新的回访</Button>
    <Drawer title="新建许愿" v-model="value3" width="720" :mask-closable="false" :styles="styles">
      <Form :model="formData">
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
        <FormItem label="我要许愿" label-position="top">
          <Input type="textarea" v-model="formData.ndesc" :rows="4" placeholder="请输入你的愿望" />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
        <Button type="primary" @click="handleSubmit">Submit</Button>
      </div>
    </Drawer>

    <ListItem v-for="item in list" :key="item.nid" style="position:relative">
      <ListItemMeta
        :avatar="'pet-adoption/img/'+item.ncontent"
        :title="item.ntitle"
        :description="item.ndesc"
        style="margin-top:-140px"
      />
      <template slot="action"></template>
      <template slot="extra">
        <img :src="'pet-adoption/img/'+item.ncontent" style="width: 280px" />
      </template>
      <div class="thumbs_comment">
        <Icon
          type="ios-thumbs-up"
          size="24"
          title="点赞"
          @click="handleThumbs($event,item.nid)"
          color="#2d8cf0"
          v-if="item.isThumbs"
        />
        <Icon
          type="ios-thumbs-up"
          size="24"
          title="点赞"
          @click="handleThumbs($event,item.nid)"
          v-else
        />
        <span style="margin-right:35px;margin-left:15px">{{ item.thumbs }}</span>
        <Icon type="ios-chatboxes" size="24" title="评论" />
        <span style="width:40px">评论</span>
        <br />
        <Input v-model="item.cdesc" placeholder="请输入评论" style="width: 300px" />
        <Button type="info" @click="addComment(item.cdesc,item.nid)">发布评论</Button>
      </div>
      
      <List class="comm_list"  size="small">
        <ListItem v-for="co in item.comment" :key="co.cid">
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            :title="co.cstart"
            :description="co.cdesc"
          />
        </ListItem>
      </List>
    </ListItem>
    <div class="page_div">
      <Page
        :total="page.total"
        :page-size="page.pageSize"
        :current="page.index"
        show-elevator
        show-sizer
        show-total
        class="my_page"
        @on-change="getList"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </List>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      page: {
        total: 100,
        pageSize: 3,
        index: 1
      },
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        ndesc: "",
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
    getList(start) {
      this.$axios
        .get(
          "pet-adoption/back/allBack?start=" +
            start +
            "&size=" +
            this.page.pageSize
        )
        .then(res => {
          this.list = res.data.news;
          this.page.total = res.data.total;
          this.$Message.success("列表渲染成功");
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    handleSubmit() {
      this.value3 = false;
      this.$axios
        .post("pet-adoption/back/addBack", this.formData)
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
    handleSuccess(res, file) {
      console.log(res);
      file.url = this.$host + "/img" + res.url;
      this.formData.ncontent = res.url;
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
    },
    handleThumbs(e, pid, uid) {
      if (!this.isClick) {
        this.isClick = true;
        if (
          e.path[0].style.color === "" ||
          e.path[0].style.color === "rgb(81, 90, 110)"
        ) {
          if (this.uid === undefined) {
            this.$Message.error("未登录");
          } else {
            this.$axios
              .post("pet-adoption/back/thumbs", {
                pid: pid,
                uid: this.uid
              })
              .then(res => {
                this.$Message.success("点赞成功");
                this.isClick = false;
                this.getList(this.page.index);
              })
              .catch(err => {
                this.$Message.error("服务器错误");
                this.isClick = false;
              });
            e.path[0].style.color = "#2d8cf0";
          }
        } else {
          if (this.uid === undefined) {
            this.$Message.error("未登录");
          } else {
            this.$axios
              .post("pet-adoption/back/thumbs", {
                pid: pid,
                uid: this.uid
              })
              .then(res => {
                this.$Message.success("取消成功");
                this.isClick = false;
                this.getList(this.page.index);
              })
              .catch(err => {
                this.$Message.error("服务器错误");
                this.isClick = false;
              });
            e.path[0].style.color = "#515a6e";
          }
        }
      }
    },
    pageSizeChange(size) {
      this.page.pageSize = size;
      this.getList(this.page.index);
    },
    addComment(cdesc, pid) {
      if (!this.isClick) {
        if (this.uid === undefined) {
          this.$Message.error("未登录");
        } else {
          this.isClick = true;
          this.comment.cdesc = cdesc;
          this.comment.pid = pid;
          this.comment.cstart = this.uid
          this.$axios
            .post("pet-adoption/back/addBackComment", this.comment)
            .then(res => {
              if (res.data.success) this.$Message.success(res.data.message);
              else this.$Message.error(res.data.message);
              this.isClick = false;
              this.getList(this.page.index);
            })
            .catch(err => {
              this.$Message.error("服务器错误");
              this.isClick = false;
            });
        }
      }
    }
  },
  mounted() {
    this.getList(1, 3);
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
.thumbs_comment {
  text-align: left;
  position: absolute;
  bottom: 87px;
  left: 47px;
}
.comm_list{
  margin-right: 500px;
  width: 500px;
}
</style>