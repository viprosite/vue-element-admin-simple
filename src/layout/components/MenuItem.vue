<template>
  <el-menu-item v-if="!item.hidden" :index="item.path=='/'?'/':basePath+'/'+item.path">
    <i :class="[item.meta.icon]" />
    <span slot="title">{{ item.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  props: ['item', 'basePath']
}
</script>

<style>

</style>
