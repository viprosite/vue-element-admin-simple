<template>
  <div class="">
    <!-- route有children但是只需要显示一级的（如首页因为有layout需要children） -->
    <template v-if="!item.hidden && item.meta.notShowChildren">
      <MenuItem
        :item="item"
        :base-path="basePath"
      />
    </template>

    <el-submenu v-if="!item.hidden && ('children' in item) && !item.meta.notShowChildren" :index="item.path">
      <!-- 含有子菜单项目的标题 -->
      <template slot="title">
        <i :class="[item.meta.icon]" />
        <span slot="title">{{ item.name }}</span>
      </template>
      <!-- 子菜单下的每一小项目 且 该小项不含有children -->
      <MenuItem
        v-for="sonItem in item.children.filter(son=>!('children' in son))"
        :key="sonItem.name"
        :item="sonItem"
        :base-path="basePath"
      />
      <!-- 子菜单下的小项还有嵌套children -->
      <template v-if="item.children.some(son=>'children' in son)">
        <SideBarItem
          v-for="sonItem in item.children.filter(son=>'children' in son)"
          :key="sonItem.name"
          :item="sonItem"
          :base-path="basePath+'/'+sonItem.path"
        />
      </template>
    </el-submenu>

  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import SideBarItem from './SideBarItem.vue'
export default {
  name: 'SideBarItem',
  components: {
    SideBarItem,
    MenuItem
  },
  props: ['item', 'basePath']
}
</script>

<style>

</style>
