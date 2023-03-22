<template>
  <div class="top-bar-container">
    <el-dropdown @command="handleCommand">
      <span class="name-text">
        <i class="el-icon-user" />
        <span>admin</span>
        <i class="el-icon-arrow-down" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">主页</el-dropdown-item>
        <el-dropdown-item command="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(c) {
      if (c == 'home') {
        this.$router.push('/')
      } else if (c == 'logout') {
        this.$store.commit('LOGOUT')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar-container{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    height: 40px;
    box-sizing: border-box;
    .el-dropdown{
        .name-text{
            font-size: 16px;
            color: #000;
            cursor: pointer;
            span{
                margin: 0 10px;
            }
        }
    }
}
</style>
