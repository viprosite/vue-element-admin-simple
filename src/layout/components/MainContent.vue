<template>
  <div class="main-content-container">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main-content-container{
    background-color: #e9ebeb;
    height: calc(100vh - 40px);
    padding: 15px 20px;
}
</style>
