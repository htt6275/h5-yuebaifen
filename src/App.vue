<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*, *:before, *:after {
  box-sizing: border-box;
}
body {
  margin: 0;
  color: #333;
}
ul {
  padding: 0;
  list-style: none
}
a {
  text-decoration: none;
  color: inherit;
}
.clearfix:after,
.clearfix:before,
.container:after,
.container:before,
.container-fluid:after,
.container-fluid:before {
  display: table;
  content: '';
}
.clearfix:after,
.container:after,
.container-fluid:after {
  clear: both
}
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.pull-right {
  float: right
}
.pull-left {
  float: left
}
.m-t {
  margin-top: 15px
}
.m-b-5 {
  margin-bottom: 5px
}
.m-b {
  margin-bottom: 15px
}
.m-r {
  margin-right: 15px;
}
.m-l {
  margin-left: 15px;
}
.text-center {
  text-align: center
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.transition {
  transition: all .3s
}
.mint-header {
  font-size: 16px
}
.mint-cell-wrapper {
  background: none!important;
}
.mint-field-core {
  color: #fff;
  background: transparent;
}
.mint-field .mint-cell-title {
  width: 80px!important;
}
.mint-button-text {
  color: #00b4e7;
  font-weight: bold;
}
</style>
