<template>
  <List item-layout="vertical">
    <Input
      suffix="ios-search"
      placeholder="输入你想搜索的宠物"
      style="width: 240px;margin: 20px;"
      v-model="keyWord"
    />
    <Button type="primary" :loading="loading" @click="toLoading">
      <span v-if="!loading">搜索</span>
      <span v-else>Loading...</span>
    </Button>
    <ListItem v-for="item in data" :key="item.name">
      <ListItemMeta
        :avatar="item.coverURL"
        :title="item.name+' '+item.engName"
        :description="item.bdesc"
      />
      {{ item.feature }}
      <br />
      {{ item.characterFeature }}
      <br />
      {{ item.careKnowledge }}
      <br />
      {{ item.feedPoints }}
      <br />
      <template slot="action">
        <li>
          <span style="margin-right:15px">价格</span>
          <span>{{ item.price}}</span>
        </li>
        <li>
          <span style="margin-right:15px">所在地</span>
          <span>{{ item.nation}}</span>
        </li>
        <li>
          <span style="margin-right:15px">特点</span>
          <span>{{ item.characters}}</span>
        </li>
      </template>
      <template slot="extra">
        <img :src="item.coverURL" style="width: 280px" />
      </template>
    </ListItem>
  </List>
</template>
<script>
export default {
  name: "Encyclopedias",
  data() {
    return {
      loading: false,
      data: [],
      keyWord: ""
    };
  },
  mounted() {
    this.$axios
      .get(
        "tianapi/txapi/pet/index?key=c123f8cd1901c050c4ec1f634adb5276&name=哈士奇"
      )
      .then(res => (this.data = res.data.newslist));
  },
  methods: {
    toLoading() {
      this.loading = true;
      this.$axios
        .get(
          "tianapi/txapi/pet/index?key=c123f8cd1901c050c4ec1f634adb5276&name=" +
            this.keyWord
        )
        .then(res => {
          this.$Message.warning(res.data.msg);
          this.data = res.data.newslist;
          this.loading = false;
        })
        .catch(err => {
          this.$Message.error("服务器错误");
          this.loading = false;
        });
    }
  }
};
</script>