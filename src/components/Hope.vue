<template>
  <div class="pet_bgi">
    <List style="color:#fff">
      <Button
        type="primary"
        shape="circle"
        icon="md-add"
        class="pet_button"
        @click="value3 = true"
      >我要许愿</Button>
      <Drawer title="新建许愿" v-model="value3" width="720" :mask-closable="false" :styles="styles">
        <Form :model="formData">
          <FormItem label="我要许愿" label-position="top">
            <Input type="textarea" v-model="formData.hdesc" :rows="4" placeholder="请输入你的愿望" />
          </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
          <Button type="primary" @click="handleSubmit">提交</Button>
        </div>
      </Drawer>

      <ListItem v-for="item in list" :key="item.hid">
        <ListItemMeta
          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
          :title="item.htitle"
          :description="item.hdesc"
        />
        <template slot="action">
          <li v-if="item.uid === uid">
            <a @click="editClick(item.hdesc)">编辑</a>
            <Drawer
              title="更改许愿"
              v-model="value4"
              width="720"
              :mask-closable="false"
              :styles="styles"
            >
              <Form :model="formData">
                <FormItem label="我要许愿" label-position="top">
                  <Input type="textarea" v-model="formData.hdesc" :rows="4" placeholder="请输入你的愿望" />
                </FormItem>
              </Form>
              <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value4 = false">取消</Button>
                <Button type="primary" @click="handleEdit(item.hid)">提交</Button>
              </div>
            </Drawer>
          </li>
          <li v-if="item.uid === uid">
            <a @click="handleRemove(item.hid)">删除</a>
          </li>
          <li v-if="item.isThumbs">
            <Icon type="ios-thumbs-up" @click="handleThumbs($event,item.hid)" color="#2d8cf0" />
            {{item.thumbs}}
          </li>
          <li v-else>
            <Icon type="ios-thumbs-up" @click="handleThumbs($event,item.hid)" />
            {{item.thumbs}}
          </li>
          <li>
            <Icon type="ios-chatbubbles" @click="handleRender(item.comment,item.hid)" />
            {{item.countComment}}
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      value3: false,
      value4: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        hdesc: "",
        hid: ""
      },
      isClick: false,
      comment: {
        cid: "",
        cdesc: "",
        cstart: "",
        hid: ""
      },
      uid: ""
    };
  },
  methods: {
    getList() {
      this.$axios
        .get("pet-adoption/hope/allHope")
        .then(res => {
          this.list = res.data;
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    handleSubmit() {
      this.value3 = false;
      this.$axios
        .post("pet-adoption/hope/addHope", {
          hdesc: this.formData.hdesc
        })
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
    },
    editClick(value) {
      this.value4 = true;
      this.formData.hdesc = value;
    },
    handleRemove(value) {
      this.$axios
        .get("pet-adoption/hope/delHope?hid=" + value)
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
    handleEdit(value) {
      this.formData.hid = value;
      this.$axios
        .post("pet-adoption/hope/editHope", this.formData)
        .then(res => {
          if (res.data.success) {
            this.$Message.success(res.data.message);
            this.value4 = false;
            this.getList();
          } else {
            this.$Message.err(res.data.message);
          }
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    handleThumbs(e, hid, uid) {
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
              .post("pet-adoption/hope/thumbsHope", {
                hid: hid,
                uid: this.uid
              })
              .then(res => {
                this.$Message.success("点赞成功");
                this.isClick = false;
                this.getList();
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
              .post("pet-adoption/hope/thumbsHope", {
                hid: hid,
                uid: this.uid
              })
              .then(res => {
                this.$Message.success("取消成功");
                this.isClick = false;
                this.getList();
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
    addComment(hid) {
      if (!this.isClick) {
        if (this.uid === undefined) {
          this.$Message.error("未登录");
        } else {
          this.isClick = true;
          this.comment.hid = hid;
          this.comment.cstart = this.uid;
          this.$axios
            .post("pet-adoption/hope/addHopeComment", this.comment)
            .then(res => {
              if (res.data.success) this.$Message.success(res.data.message);
              else this.$Message.error(res.data.message);
              this.isClick = false;
              this.getList();
            })
            .catch(err => {
              this.$Message.error("服务器错误");
              this.isClick = false;
            });
        }
      }
    },
    handleRender(comment, hid) {
      var _this = this;
      this.$Modal.confirm({
        render: h => {
          if (comment.length) {
            return h("div", [
              comment.map(function(item) {
                return h("p", item.cstart + ":" + item.cdesc);
              }),
              h("Input", {
                style: {
                  "margin-top": "20px"
                },
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: "请输入您的评论"
                },
                on: {
                  input: val => {
                    this.comment.cdesc = val;
                  }
                }
              }),
              h(
                "Button",
                {
                  style: {
                    "text-align": "center",
                    "margin-top": "20px"
                  },
                  on: {
                    click: function() {
                      if (!_this.isClick) {
                        if (_this.uid === undefined) {
                          _this.$Message.error("未登录");
                        } else {
                          _this.isClick = true;
                          _this.comment.hid = hid;
                          _this.comment.cstart = _this.uid;
                          _this.$axios
                            .post(
                              "pet-adoption/hope/addHopeComment",
                              _this.comment
                            )
                            .then(res => {
                              if (res.data.success)
                                _this.$Message.success(res.data.message);
                              else _this.$Message.error(res.data.message);
                              _this.isClick = false;
                              _this.getList();
                            })
                            .catch(err => {
                              _this.$Message.error("服务器错误");
                              _this.isClick = false;
                            });
                        }
                      }
                    }
                  }
                },
                "提交"
              )
            ]);
          } else {
            return h(
              "div",
              [
                h("Input", {
                  style: {
                    "margin-top": "20px"
                  },
                  props: {
                    value: this.value,
                    autofocus: true,
                    placeholder: "请输入您的评论"
                  },
                  on: {
                    input: val => {
                      this.comment.cdesc = val;
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    style: {
                      "text-align": "center",
                      "margin-top": "20px"
                    },
                    on: {
                      click: function() {
                        if (!_this.isClick) {
                          if (_this.uid === undefined) {
                            _this.$Message.error("未登录");
                          } else {
                            _this.isClick = true;
                            _this.comment.hid = hid;
                            _this.comment.cstart = _this.uid;
                            _this.$axios
                              .post(
                                "pet-adoption/hope/addHopeComment",
                                _this.comment
                              )
                              .then(res => {
                                if (res.data.success)
                                  _this.$Message.success(res.data.message);
                                else _this.$Message.error(res.data.message);
                                _this.isClick = false;
                                _this.getList();
                              })
                              .catch(err => {
                                _this.$Message.error("服务器错误");
                                _this.isClick = false;
                              });
                          }
                        }
                      }
                    }
                  },
                  "提交"
                )
              ],
              "列表为空"
            );
          }
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
  margin: 10px 0px 10px 1800px;
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
.pet_bgi::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 880px;
  background: transparent url("../assets/img/宠物4.jpg") center center no-repeat;
  filter: blur(5px);
  z-index: -1;
  background-size: cover;
}
</style>