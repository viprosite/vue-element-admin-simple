<template>
  <!-- 1. 顶级菜单且不需要子菜单 -->
  <el-menu-item v-if="item.enableFlag && item.meta?.notShowChildren" class="show-tip" popper-class="sub-str-pop"
    style="position: relative; overflow: visible" :index="item.href" @mouseover="hoverNav(item)"
    @click="goRouter(item.href)">
    <img class="normal" :src="getAssetsImages(item.icon)" v-if="item.icon !== null" />
    <img class="active" :src="getAssetsAtiveImages(item.icon)" v-if="item.icon !== null" />
    <template #title v-show="!isFold">
      <span class="menu-leval1" :class="{ 'fold-text': isFold == true }">{{
        item.menuName
      }}</span>
    </template>
    <!-- 左侧菜单栏收起状态下hover时显示 -->
    <div class="side-pop" v-if="item.frontCode == navCode && isFold" @mouseleave="mouseleave">
      <div class="slide-tree">
        <div class="nav-pop-tit">{{ item.menuName }}</div>
      </div>
    </div>
  </el-menu-item>

  <!-- 2. 顶级菜单且需要显示子菜单 且 子菜单启用数>0 -->
  <el-sub-menu v-else-if="
    item.enableFlag &&
    item.children?.filter((menu) => menu.enableFlag)?.length > 0 &&
    !item.meta?.notShowChildren
  " class="show-tip leval1-tit-sty" @mouseover="hoverNav(item)" :index="item.href">
    <!-- 顶级（父级）菜单标题和左侧菜单栏收起时hover显示 -->
    <template #title>
      <img class="normal" :src="getAssetsImages(item.icon)" v-if="item.icon !== null" />
      <img class="active" :src="getAssetsAtiveImages(item.icon)" v-if="item.icon !== null" />
      <span class="menu-leval1" v-show="!isFold">{{
        item.menuName }}</span>
      <!-- 弹出层 -->
      <div class="side-pop" v-if="item.frontCode == navCode && isFold" @mouseleave="mouseleave">
        <div class="slide-tree">
          <div class="nav-pop-tit">{{ item.menuName }}</div>
          <el-menu width="200" active-text-color="#ffd04b" text-color="#fff" mode="vertical"
            :default-active="defaultActive">
            <template v-for="(li, index) in item.children">
              <el-menu-item :index="li.href" v-if="li.childrenCount == 0" @click="goRouter(li.href)">
                <template #title v-show="!isFold"><text class="menu-item-color" style="color: #303133">{{
                  li.menuName
                    }}</text></template>
              </el-menu-item>
              <el-sub-menu class="menu-sub" :index="li.href" v-if="li.childrenCount > 0">
                <template #title><text class="sub-menu-item-color sub-tit">{{
                  li.menuName
                    }}</text></template>
                <template v-for="(subItem, subIndex) in li.children.filter(
                  (item) => item.enableFlag
                )" :index="subItem.href">
                  <el-menu-item :index="subItem.href" v-if="subItem.childrenCount == 0" @click="goRouter(subItem.href)">
                    <template #title v-show="!isFold">
                      <text class="sub-menu-item-color"><text class="sub-point"></text>{{ subItem.menuName
                      }}</text></template>
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
          </el-menu>
        </div>
      </div>
    </template>

    <template v-if="item.children?.length">
      <template v-for="li in item.children">
        <!-- 3.顶级菜单下的直接子级菜单 且该子菜单没有下级菜单 或所有下级菜单都禁用了 -->
        <template
          v-if="!('children' in li) || li.children.length == 0 || li.children.filter(s => s.enableFlag).length == 0">
          <el-menu-item v-if="li.enableFlag" class="leval2-sub-tit" :index="li.href" @click="goRouter(li.href)">
            <template #title v-show="!isFold">
              <span class="menu-leval2">{{ li.menuName }}</span>
            </template>
          </el-menu-item>
        </template>
        <!-- 4. 顶级菜单下的直接子级菜单 且 该子菜单还有嵌套菜单 -->
        <SideBarItem v-else :item="li" :navCode="navCode" :isFold="isFold" :key="index">
        </SideBarItem>
      </template>
    </template>


  </el-sub-menu>

</template>

<script setup>
// const SideBarItem = defineAsyncComponent(() => import("./sideBarItem.vue"));
import SideBarItem from "./sideBarItem.vue";

const { item, navCode, isFold } = defineProps(["item", "navCode", "isFold"]);
console.log("isFold", isFold);

const emits = defineEmits(["hoverNav"]);
const router = useRouter();

const hoverNav = (item) => {
  //   navCode.value = item.frontCode;
  emits("hoverNav", item.frontCode);
  let ele = document.getElementsByClassName("fold-text");
  let popEle = document.getElementsByClassName("el-menu--popup-container");
  if (ele && ele.length > 0 && ele[0].parentNode) {
    if (ele[0].parentNode.className.indexOf("el-popper") > -1) {
      ele[0].parentNode.style.display = "none";
      ele[0].parentNode.style.width = 0;
      ele[0].parentNode.style.height = 0;
      ele[0].parentNode.style.padding = "0px";
      ele[0].parentNode.style.visibility = "hidden";
      ele[0].style.display = "none";
    }
  }
  if (popEle && popEle.length > 0) {
    for (let i = 0; i < popEle.length - 1; i++) {
      if (popEle[i].parentNode.className.indexOf("el-popper") > -1) {
        popEle[i].parentNode.style.display = "none";
        popEle[i].parentNode.style.width = 0;
        popEle[i].parentNode.style.height = 0;
        popEle[i].parentNode.style.padding = "0px";
        popEle[i].parentNode.style.visibility = "hidden";
        popEle[i].style.display = "none";
      }
    }
  }
};
const mouseleave = () => {
  emits("hoverNav", "");
  //   navCode.value = "";
};
const getAssetsImages = (name) => {
  return new URL(`../../assets/img/menu/${name}.png`, import.meta.url).href;
};

const getAssetsAtiveImages = (name) => {
  return new URL(`../../assets/img/menu/${name}1.png`, import.meta.url).href;
};

const goRouter = (target) => {
  // console.log(target);
  router.push({ path: target, query: { t: Math.random() } });
  // routeclick();
};
</script>

<style lang="scss" scoped></style>
