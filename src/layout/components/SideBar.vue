<template>
  <div class="side-bar-container">
    <div class="logo-box">
      <i class="el-icon-eleme" />
      <span v-show="!isCollapse">Ele-admin</span>
    </div>
    <div class="collapse-icon">
      <i
        :class="[!isCollapse?'el-icon-s-fold':'el-icon-s-unfold']"
        @click="handleToggleSideBar"
      />
    </div>
    <el-menu
      background-color="#314151"
      text-color="#adb3b9"
      active-text-color="#fff"
      class="el-menu-vertical"
      :collapse="isCollapse"
      :router="true"
      :default-active="activeMenu"
      :unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <SideBarItem
        v-for="item in routes"
        :key="item.name"
        :item="item"
        :base-path="item.path"
      />
    </el-menu>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import SideBarItem from './SideBarItem.vue'
export default {
  components: {
    SideBarItem
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.sideBarIsCollapse,
      routes: state => state.routes
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    handleToggleSideBar() {
      this.$store.commit('TOGGLE_SIDE_BAR')
    },
    handleOpen() {

    },
    handleClose() {

    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar-container{
    height: 100%;
    background-color: #314151;
    .logo-box{
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;

        i{

            font-size: 26px;
        }
        span{
            margin-left: 8px;
        }
    }
    .collapse-icon{
        color: #999;
        background-color: #394c61;
        padding: 8px;
        display: flex;
        justify-content: center;
        i{
            cursor: pointer;
        }
    }
    .el-menu-vertical{
        // height: 100%;
        width: 100%;
        border-right: none !important;  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        .el-submenu .el-menu-item{
            min-width: inherit !important;
        }
    }
}
</style>
