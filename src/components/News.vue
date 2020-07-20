<template>
  <List item-layout="vertical">
  <Button type="primary"  class="ado_button" @click="findByType('头条')">头条</Button>
  <Button type="primary"  class="ado_button" @click="findByType('新闻')">新闻</Button>
  <Button type="primary"  class="ado_button" @click="findByType('财经')">财经</Button>
  <Button type="primary"  class="ado_button" @click="findByType('娱乐')">娱乐</Button>
  <Button type="primary"  class="ado_button" @click="findByType('军事')">军事</Button>
  <Button type="primary"  class="ado_button" @click="findByType('教育')">教育</Button>
  <Button type="primary"  class="ado_button" @click="findByType('科技')">科技</Button>
  <Button type="primary"  class="ado_button" @click="findByType('NBA')">NBA</Button>
  <Button type="primary"  class="ado_button" @click="findByType('股票')">股票</Button>
  <Button type="primary"  class="ado_button" @click="findByType('星座')">星座</Button>
  <Button type="primary"  class="ado_button" @click="findByType('女性')">女性</Button>
  <Button type="primary"  class="ado_button" @click="findByType('健康')">健康</Button>
  <Button type="primary"  class="ado_button" @click="findByType('育儿')">育儿</Button>
  <Button type="primary"  class="ado_button" @click="findByType('体育')">体育</Button><br>
    <Input
      suffix="ios-search"
      placeholder="输入你想搜索的新闻"
      style="width: 240px;margin: 20px;"
      v-model="keyWord"
    />
    <Button type="primary" :loading="loading" @click="toLoading">
      <span v-if="!loading">搜索</span>
      <span v-else>Loading...</span>
    </Button>
    <ListItem v-for="item in data" :key="item.title">
      <ListItemMeta :title="item.title" />
      <template slot="action">
        <li>
          <div  v-html="item.content" class="news_div"></div>
          <Time :time="item.time" />
          <span style="margin-left: 20px;">原文地址</span>
          <a v-if="item.weburl.length >  10" :href="item.weburl">{{ item.weburl }}</a>
          <a v-else :href="item.url">{{ item.url }}</a>
          <span style="margin-left: 1300px;">信息来源：</span>{{ item.src }}
          <span></span>
          
        </li>
      </template>
      <template slot="extra">
        <img :src="item.pic" style="height: 140px" />
      </template>
    </ListItem>
  </List>
</template>
<script>
export default {
  name: "News",
  data() {
    return {
      loading: false,
      data: [],
      keyWord: ""
    };
  },
  methods: {
    toLoading() {
      this.loading = true;
      this.$axios
        .get(
          "api//news/search?keyword="+this.keyWord+"&appkey=604e57f1f7ecc508"
        )
        .then(res => {
          this.data = res.data.result.list;
          this.loading = false;
        })
        .catch(err => this.$Message.error("服务器错误"));
    },
    findByType(value){
      this.$Message.warning('正在请求')
      this.$axios
        .get(
          "api//news/get?channel="+value+"&start=0&num=10&appkey=604e57f1f7ecc508"
        )
        .then(res => {
          this.data = res.data.result.list;
          this.$Message.success()
        })
        .catch(err => this.$Message.error("服务器错误"));
    }
  }
};
</script>
<style>
.ado_button{
  margin:15px 15px 5px 20px;
}
.news_div{
  height: 100px;
  overflow: hidden;
  margin-bottom: 20px;
}
</style>