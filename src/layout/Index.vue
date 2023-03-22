<template>
  <div class="layout-container">
    <div class="left-menu" :style="{width: isCollapse? '65px':'180px'}">
      <SideBar />
    </div>
    <div class="right-content" :style="{width: isCollapse?'calc(100vw - 65px)':'calc(100vw - 180px)'}">
      <TopBar />
      <MainContent />
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import TopBar from './components/TopBar.vue'
import MainContent from './components/MainContent.vue'

import { mapState } from 'vuex'
export default {
  components: {
    SideBar,
    TopBar,
    MainContent
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.sideBarIsCollapse
    })
  }
}
</script>

<style lang="scss" scoped>
.layout-container{
    display: flex;
    height: 100%;
    .left-menu{
        // width: 180px;
        height: 100%;
        overflow-x: hidden;
        transition: width .3s;
    }
    .right-content{
        display: flex;
        flex-direction: column;
        // width: calc(100vw - 180px);
    }
}
</style>
