<template>
  <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物1.jpg" alt=""></div>
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物2.jpg" alt=""></div>
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物3.jpg" alt=""></div>
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物4.jpg" alt=""></div>
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物5.jpg" alt=""></div>
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物6.jpg" alt=""></div>
            <div class="swiper-slide"><img class="swipe_img" src="../assets/img/宠物7.jpg" alt=""></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      loop: true,

      // 如果需要分页器
      pagination: ".swiper-pagination",

      // 如果需要前进后退按钮
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",

     
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-container {
  height: 1080px;
}
</style>
