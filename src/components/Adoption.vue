<template >
<div class="pet_bgi">
  <div style="padding:20px;text-align:left">
  <Button type="primary"  class="ado_button" @click="findByAtype(0)">送养</Button>
  <Button type="primary"  class="ado_button" @click="findByAtype(1)">领养</Button>
  <Button type="primary"  class="ado_button" @click="findByAtype(2)">寻主</Button>
  <Button type="primary"  class="ado_button" @click="findByAtype(3)">寻宠</Button>
    <Row :gutter="16">
      <Col span="6" v-for="item in list" :key="item.aid">
        <Card :bordered="false" class="my_card">
            <img :src="'pet-adoption/img/'+item.aic" alt="" class="adoption_img">
            <Icon type="ios-contact" />发布人&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="card_span">{{ item.username }}</span><br>
            <Icon type="ios-clock" />联系方式
            <span class="card_span">{{ item.atitle }}</span><br>
            <Icon type="ios-clock" />发布时间
            <span class="card_span"><Time :time="item.adate" /></span><br>
            <Icon type="ios-paper" />发布信息
            <span class="card_span">{{ item.adesc }}</span>
        </Card>
      </Col>
     
      
    </Row>

    
  </div>
</div>
  
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods:{
    findByAtype(value){
      this.$axios.get('pet-adoption/animal/findByAtype?atype='+value)
      .then(res => {
        this.list = res.data
        this.$Message.success('列表渲染成功')
        this.list.forEach(function(){

        })
      }).catch( err =>
        this.$Message.error('服务器错误')
      )
    }
  }
};
</script>
<style>
.pet_bgi {
  text-align: center;
}
.pet_bgi::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 880px;
  background: transparent url("../assets/img/宠物7.jpg") center center no-repeat;
  filter: blur(5px);
  z-index: -1;
  background-size: cover;
}
.my_card{
    height: 400px;
    overflow: hidden;
    margin-bottom: 10px;
}
.adoption_img {
  width: 400px;
  display: block;
  margin: 5px auto;
}
.card_span{
    margin-left: 100px;
}
.my_page{
    margin-top: 30px;
    text-align: center;
}
.ado_button{
  margin-bottom: 15px;
  margin-right: 15px;
}
</style>