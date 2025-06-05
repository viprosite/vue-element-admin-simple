<template>
  <div class="layout-container">
    <!-- 客服悬层 -->
    <div v-show="kefuShow" class="kefu-box">
      <el-icon @click="kefuShow = false" class="close">
        <Close />
      </el-icon>
      <img :src="uelImg.imags" alt="" @click="imgkefu" />
    </div>

    <el-container class="layout-container-demo">
      <!-- :style="{'min-width':isFold == true?'auto':'200px'}" -->
      <el-container>
        <el-aside
          :style="{ width: isFold ? 'auto' : 'auto' }"
          class="custom-menu"
          hide-timeout="100"
          show-timeout="100"
        >
          <div class="cont-logo">
            <img
              src="@/assets/img/login/log1.png"
              style="height: 20px; width: auto"
              alt=""
            />
          </div>
          <div class="cm-menu-container">
            <div
              class="menu-fold"
              :class="{
                'menu-unfold-bg': isFold == true,
                'menu-fold-bg': isFold == false,
              }"
              @mouseover="mouseleave"
              @click="toggleFold"
            ></div>
            <el-menu
              ref="navMenu"
              mode="vertical"
              class="el-menu-vertical-demo"
              :class="{
                'keep-row': isFold == true,
                'fold-row': isFold == false,
                'el-menu-vertical-cn': langTpye == 'zh_CN',
                'el-menu-vertical-og': langTpye !== 'zh_CN',
              }"
              :default-active="defaultActive"
              :collapse="isFold"
              @open="handleOpen"
              @close="handleClose"
              popper-effect="light"
              active-text-color="#FF8A33"
              popper-class="menu-pop"
              @mouseover="hideTip"
            >
              <SideBarItem
                v-for="(item, ind) in menuList"
                :key="item.id"
                :item="item"
                :navCode="navCode"
                :isFold="isFold"
                :defaultActive="defaultActive"
                @hoverNav="handleHoverNav"
              ></SideBarItem>
            </el-menu>
          </div>
        </el-aside>

        <el-container>
          <el-header class="top-header-bar">
            <div style="text-align: left"></div>
            <div class="cm-fixed-home" style="top: 5px">
              <el-popover
                :width="300"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <div class="download-icon-text">
                    <img src="../assets/img/plant/ji.png" alt="" />
                    {{ t("lang.appDowload") }}
                  </div>
                </template>
                <template #default>
                  <div class="download-qrcode">
                    <div class="qrcode">
                      <img src="../assets/img/plant/xaizai.png" alt="" />
                      <div class="qrcode-text">
                        {{ t("lang.scanDowload") }}
                      </div>
                    </div>
                    <div class="qrcode-right-img">
                      <img src="../assets/img/plant/tupian.png" alt="" />
                    </div>
                  </div>
                </template>
              </el-popover>
              <el-dropdown class="instruction-box">
                <div class="icon-text">
                  <img src="../assets/img/plant/help.png" alt="" /><span>{{
                    t("lang.instruction")
                  }}</span>
                  <el-icon>
                    <ArrowDown />
                  </el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu class="instruction-menu">
                    <el-dropdown-item @click="gogingWeb">{{
                      t("lang.optManualWeb")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                  <el-dropdown-menu class="instruction-menu">
                    <el-dropdown-item @click="gogingApp">{{
                      t("lang.optManualApp")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown @command="langChange" class="drop-sty">
                <span class="el-dropdown-link">
                  <img
                    v-if="nationalFlag"
                    v-lazy="nationalFlag"
                    alt=""
                    class="vt-sub"
                  />
                  {{ matchLang(langValue) }}
                  <el-icon
                    style="top: 3px"
                    class="el-icon--right dir-icon"
                    v-show="matchLang(langValue)"
                  >
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      class="cm-dro-li"
                      :command="item"
                      v-for="item in langData"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    >
                      <img
                        class="lang-icon"
                        :src="item.iconUrl"
                        alt=""
                        style=""
                      />
                      <span class="lang-li-text">{{ item.name }}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <!-- <el-select
                v-model="langValue"
                class="m-2 cm-head-select my-el-select"
                placeholder="Select"
                @change="langChange"
                :style="{
                  width: langValue === 'uk_UK' ? '160px !important' : '100px',
                }"
              >
                <el-option
                  style="box-shadow: none !important"
                  ref="seletor"
                  class="cm-select-options"
                  v-for="item in langData"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  ><div style="display: flex; align-items: center">
                    <img
                      :src="item.iconUrl"
                      alt=""
                      style="margin-right: 5px; width: 20px; height: 11.67px"
                    />{{ item.name }}
                  </div>
                </el-option>
              </el-select> -->

              <!-- <img
                src="../assets/img/home/1.png"
                alt=""
                style="width: 30px;height: 30px;"
              /> -->

              <el-dropdown class="avatar-name-box">
                <div style="cursor: pointer">
                  <img
                    v-lazy="
                      imglauout == null
                        ? tupian
                        : imglauout == ''
                        ? tupian
                        : imglauout == undefined
                        ? tupian
                        : imglauout
                    "
                    alt=""
                    class="avatar-img"
                  />
                  <span class="avatar-name">{{ fmunll.realName }}</span>
                </div>

                <template #dropdown>
                  <el-dropdown-menu class="avatar-menu">
                    <el-dropdown-item @click="goPersonal">{{
                      t("lang.personalnformation")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                  <el-dropdown-menu class="avatar-menu">
                    <el-dropdown-item @click="loginOut">{{
                      t("lang.sogout")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-header>
          <div style="box-sizing: border-box">
            <TabsView v-if="needTagsView" />
          </div>
          <el-main>
            <router-view>
              <template #default="{ Component, route }">
                <keep-alive :exclude="['home', 'repairDetails']">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </template>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import routers, { sortedWebMenuList } from "../router";
import i18n from "../i18n/i18n.js";
import tupian from "../assets/img/home/37.png";
import { inject, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { serviceUrl } from "@/api/setting";
import Cookies from "js-cookie";
import SideBarItem from "./components/sideBarItem.vue";
const reload = inject("inject");

const { t } = i18n.global;
const kefuShow = ref(true);
const route = useRoute();
const fmunll = JSON.parse(sessionStorage.getItem("fulldetail"));
const langTpye = sessionStorage.getItem("lang");
const imglauout = JSON.parse(sessionStorage.getItem("headImg"));
const nationalFlag = ref("");

const defaultActive = ref(route.path);
const seletor = ref();
const isFold = ref(false);
const navCode = ref("");
const navMenu = ref();
// console.log(fmunll, "route");

const menuList = ref(sortedWebMenuList);
console.log("menuList", menuList.value);

const needTagsView = ref(true);
const langValue = ref(Cookies.get("langList"));
const langData = ref(
  localStorage.getItem("langList")
    ? JSON.parse(localStorage.getItem("langList"))
    : []
);
const langChange = (item) => {
  nationalFlag.value = "";
  langValue.value = item.code;
  Cookies.set("langList", langValue.value, { expires: 90 });
  sessionStorage.setItem("lang", item.code);
  nextTick(() => {
    nationalFlag.value = item.iconUrl;
    location.reload();
  });
};

const matchLang = (code) => {
  let str = "";
  langData.value.forEach((el) => {
    if (code == el.code) {
      str = el.name;
    }
  });
  return str;
};

const loginOut = () => {
  ElMessageBox.confirm(t("lang.slogout"), "", {
    confirmButtonText: t("lang.confirm"),
    cancelButtonText: t("lang.ancel"),
    // type: "warning",
  })
    .then(() => {
      sessionStorage.removeItem("username");
      location.reload();
      ElMessage({
        type: "success",
        message: t("lang.slogoutsuccessful"),
      });
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "Delete canceled",
      // });
    });
};
const router = useRouter();

const goPersonal = () => {
  router.push({ path: "/personal" });
};

const handleOpen = () => {};
const handleClose = () => {};
const lang = sessionStorage.getItem("lang");
const uelImg = ref([]);
const serviceData = () => {
  let data = {};
  serviceUrl(data).then((res) => {
    if (res.code == 200) {
      uelImg.value = res.data;
    }
  });
};
const imgkefu = () => {
  window.open(uelImg.value.url);
};

// 切换收缩隐藏
const toggleFold = () => {
  if (isFold.value == false) {
    let eles = document.getElementsByClassName("menu-leval2");
    for (var i = 0; i < eles.length - 1; i++) {
      eles[i].style.whiteSpace = "nowrap";
    }
  }
  nextTick(() => {
    isFold.value = !isFold.value;
    navCode.value = "";
    if (isFold.value == false) {
      navCode.value = "";
    }
  });
};
const gogingWeb = () => {
  window.open("http://om.felicitysolar.com/vue/1.html", "_blank");
};
const gogingApp = () => {
  window.open(
    "https://file.felicitysolar.com/prod/operationManual/app_operation_manualen_en.pdf"
  );
};

const hideTip = () => {};

const mouseleave = () => {
  navCode.value = "";
};

const handleHoverNav = (e) => {
  navCode.value = e;
};
// const toFirst = (item) => {
//   if (isFold.value) {
//     if (item.childrenList && item.childrenList.length > 0) {
//       router.push({
//         path: item.childrenList[0].href,
//         query: { t: Math.random() },
//       });
//     }
//   }
// };
const pipe = () => {
  for (let i = 0; i < langData.value.length; i++) {
    if (langData.value[i].code == langValue.value) {
      nationalFlag.value = langData.value[i].iconUrl;
    }
  }
};
onMounted(() => {
  if (navigator.language.substr(0, 2) == "zh") {
    langValue.value = Cookies.get("langList") || "zh_CN";
    pipe();
  } else if (navigator.language.substr(0, 2) == "en") {
    langValue.value = Cookies.get("langList") || "en_US";
    pipe();
  } else if (navigator.language.substr(0, 2) == "de") {
    langValue.value = Cookies.get("langList") || "de_DE";
    pipe();
  } else if (navigator.language.substr(0, 2) == "pl") {
    langValue.value = Cookies.get("langList") || "pl_PL";
    pipe();
  } else if (navigator.language.substr(0, 2) == "cs") {
    langValue.value = Cookies.get("langList") || "cs_CZ";
    pipe();
  } else if (navigator.language.substr(0, 2) == "uk") {
    langValue.value = Cookies.get("langList") || "uk_UK";
    pipe();
  } else if (navigator.language.substr(0, 2) == "it") {
    langValue.value = Cookies.get("langList") || "it_IT";
    pipe();
  } else if (navigator.language.substr(0, 2) == "es") {
    langValue.value = Cookies.get("langList") || "sp_SP";
    pipe();
  } else if (navigator.language.substr(0, 2) == "fr") {
    langValue.value = Cookies.get("langList") || "fr_FR";
    pipe();
  } else if (navigator.language.substr(0, 2) == "my") {
    langValue.value = Cookies.get("langList") || "my_MM";
    pipe();
  } else if (navigator.language.substr(0, 2) == "ar") {
    langValue.value = Cookies.get("langList") || "ar_SA";
    pipe();
  } else if (navigator.language.substr(0, 2) == "pt") {
    langValue.value = Cookies.get("langList") || "pt_BR";
    pipe();
  } else {
    langValue.value = "en_US";
  }
  serviceData();
  nextTick(() => {
    if (langValue.value) {
      sessionStorage.setItem("lang", langValue.value);
    }
  });
});
watch(
  () => route.path,
  (value) => {
    defaultActive.value = value;
  }
);
</script>

<style lang="scss" scoped></style>
<style>
.el-menu {
  border-right: none !important;
}

.el-header {
  box-sizing: none;
}

/* .el-input__wrapper {
  box-shadow: none !important;
} */
</style>
