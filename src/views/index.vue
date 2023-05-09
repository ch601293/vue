<template>
    <div id="continer">
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item v-for="item in 6" :key="item">
          <a :href="href_h"
            ><el-image
              style="height: 300px"
              src="../public/result/100.jpg"
              fit="fill"
          /></a>
        </el-carousel-item>
      </el-carousel>
      <el-skeleton />
      <br />
      <el-skeleton style="--el-skeleton-circle-size: 100px">
        <template #template>
          <el-skeleton-item variant="circle" />
        </template>
      </el-skeleton>
      
    </div>
  </template>
  
  <style scoped>
  #continer {
    height: 300px;
    width: 1050px;
  }
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  </style>
  <script setup>
  import { computed } from "vue";
  import Axios from "axios";
  import { useCookies } from "vue3-cookies";
  
  const { cookies } = useCookies();
  const axios = Axios.create({});
  var token = cookies.get("token");
  console.log(token)
  axios
    .get("http://127.0.0.1:3000/api/url_h")
    .then((res) => {
      confirm.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  const href_h = computed({
    get() {
      return "https://movielens.org/movies/2";
    },
  });
  </script>
  