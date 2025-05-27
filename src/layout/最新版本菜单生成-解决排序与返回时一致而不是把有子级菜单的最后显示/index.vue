<template>
  <div style="width: 100%; height: 100%" class="ayoutin">
    <div
      style="
        position: fixed;
        right: 20px;
        bottom: 150px;
        cursor: pointer;
        z-index: 9999;
      "
      v-show="kefuShow"
    >
      <el-icon
        style="position: absolutele; left: 10px; top: -90px"
        @click="kefuShow = false"
      >
        <Close />
      </el-icon>
      <img :src="uelImg.imags" alt="" @click="imgkefu" />
    </div>
    <el-container
      class="layout-container-demo"
      style="height: 100%; background-color: #f5f7fa"
    >
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
                v-for="(item, ind) in menuList1"
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
          <el-header
            style="background-color: #fff; height: 41px; line-height: 42px"
          >
            <div style="text-align: left"></div>
            <div class="cm-fixed-home" style="top: 5px">
              <el-popover
                :width="300"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: #606266;
                      cursor: pointer;
                      font-size: 14px;
                    "
                  >
                    <img
                      src="../assets/img/plant/ji.png"
                      alt=""
                      style="
                        width: 20px;
                        height: 26px;
                        margin-right: 5px;
                        font-size: 14px;
                      "
                    />
                    {{ t("lang.appDowload") }}
                  </div>
                </template>
                <template #default>
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div style="margin-right: 15px; text-align: center">
                      <img
                        src="../assets/img/plant/xaizai.png"
                        alt=""
                        style="width: 84px; height: 84px"
                      />
                      <div
                        style="font-size: 13px; color: #444; font-size: 14px"
                      >
                        {{ t("lang.scanDowload") }}
                      </div>
                    </div>
                    <div>
                      <img
                        src="../assets/img/plant/tupian.png"
                        alt=""
                        style="width: 119px; height: 118px"
                      />
                    </div>
                  </div>
                </template>
              </el-popover>
              <el-dropdown
                style="border-color: #fff; cursor: pointer; margin: 0 25px"
              >
                <div
                  style="
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <img
                    src="../assets/img/plant/help.png"
                    alt=""
                    style="width: 20px; height: 20px"
                  /><span style="margin: 0 15px 0 5px; font-size: 14px">{{
                    t("lang.instruction")
                  }}</span>
                  <el-icon>
                    <ArrowDown />
                  </el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="gogingWeb"
                      style="height: 15px; font-size: 12px; font-size: 14px"
                      >{{ t("lang.optManualWeb") }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="gogingApp"
                      style="height: 15px; font-size: 12px; font-size: 14px"
                      >{{ t("lang.optManualApp") }}</el-dropdown-item
                    >
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

              <el-dropdown>
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
                    style="
                      width: 26px;
                      height: 26px;
                      border-radius: 50%;
                      margin-left: 20px;
                      vertical-align: sub;
                    "
                  />
                  <span
                    style="
                      margin-left: 5px;
                      font-size: 14px;
                      color: #444;
                      position: relative;
                      top: -3px;
                    "
                    >{{ fmunll.realName }}</span
                  >
                </div>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="goPersonal"
                      style="height: 15px; font-size: 12px"
                      >{{ t("lang.personalnformation") }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="loginOut"
                      style="height: 15px; font-size: 12px"
                      >{{ t("lang.sogout") }}</el-dropdown-item
                    >
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
const menuList = ref([
  {
    childrenCount: 0,
    menuName: t("lang.dashboard"),
    menuNameEn: t("lang.dashboard"),
    menuNameDe: t("lang.dashboard"),
    menuSort: 1,
    menuType: 1,
    href: "/home",
    icon: "shuju",
    enableFlag: true,
    permission: null,
    frontCode: "databoard",
    targetScope: 0,
  },
  {
    id: "7554763109710944",
    parentId: "0",
    childrenList: [
      {
        id: "9525774699161088",
        parentId: "7554763109710944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sPlant"),
        menuNameEn: t("lang.sPlant"),
        menuNameDe: t("lang.sPlant"),
        menuSort: 0,
        menuType: 1,
        href: "/station",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "station",
        targetScope: 0,
      },
      {
        id: "9525775813371392",
        parentId: "7554763109710944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sdsevice"),
        menuNameEn: t("lang.sdsevice"),
        menuNameDe: t("lang.sdsevice"),
        menuSort: 1,
        menuType: 1,
        href: "/deviceList",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "deviceList",
        targetScope: 0,
      },
      {
        id: "9525787011016192",
        parentId: "7554763109710944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.saslarm"),
        menuNameEn: t("lang.saslarm"),
        menuNameDe: t("lang.saslarm"),
        menuSort: 2,
        menuType: 1,
        href: "/alarm",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "alarm",
        targetScope: 0,
      },
    ],
    childrenCount: 11,
    menuName: t("lang.smonitoring"),
    menuNameEn: t("lang.smonitoring"),
    menuNameDe: t("lang.smonitoring"),
    menuSort: 2,
    menuType: 1,
    href: "/station",
    icon: "jiank",
    enableFlag: true,
    permission: null,
    frontCode: "station",
    targetScope: 0,
  },

  {
    id: "8279556538122720",
    parentId: "0",
    childrenList: [
      {
        id: "9525803171964416",
        parentId: "8279556538122720",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.shelpcsenter"),
        menuNameEn: t("lang.shelpcsenter"),
        menuNameDe: t("lang.shelpcsenter"),
        menuSort: 2,
        menuType: 1,
        href: "/helpCenter",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "helpCenter",
        targetScope: 0,
      },
      {
        id: "9525804905686528",
        parentId: "8279556538122720",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.scsontactus"),
        menuNameEn: t("lang.scsontactus"),
        menuNameDe: t("lang.scsontactus"),
        menuSort: 3,
        menuType: 1,
        href: "/contactUs",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "contactUs",
        targetScope: 0,
      },
      {
        id: "9525808928679424",
        parentId: "8279556538122720",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sdsevicerepair"),
        menuNameEn: t("lang.sdsevicerepair"),
        menuNameDe: t("lang.sdsevicerepair"),
        menuSort: 5,
        menuType: 1,
        href: "/equRepair",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "equRepair",
        targetScope: 0,
      },

      {
        id: "9525800504157696",
        parentId: "8279556538122720",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.productData"),
        menuNameEn: t("lang.productData"),
        menuNameDe: t("lang.productData"),
        menuSort: 0,
        menuType: 1,
        href: "/videoList",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "videoList",
        targetScope: 0,
      },
    ],
    childrenCount: 11,
    menuName: t("lang.sservice"),
    menuNameEn: t("lang.sservice"),
    menuNameDe: t("lang.sservice"),
    menuSort: 4,
    menuType: 1,
    href: "/videoList",
    icon: "fuw",
    enableFlag: true,
    permission: null,
    frontCode: "videoList",
    targetScope: 0,
  },
  // 老版产品资料
  // {
  //   id: "7554766402894944",
  //   parentId: "0",
  //   childrenList: [

  //     {
  //       id: "9525801502303744",
  //       parentId: "8279556538122720",
  //       childrenList: [],
  //       childrenCount: 0,
  //       menuName: t("lang.spsroductmanual"),
  //       menuNameEn: t("lang.spsroductmanual"),
  //       menuNameDe: t("lang.spsroductmanual"),
  //       menuSort: 1,
  //       menuType: 1,
  //       href: "/productManual",
  //       icon: null,
  //       enableFlag: true,
  //       permission: null,
  //       frontCode: "productManual",
  //       targetScope: 0,
  //       // childrenList: [
  //       //   {
  //       //     id: "9525801502303744",
  //       //     parentId: "8279556538122720",
  //       //     childrenList: [],
  //       //     childrenCount: 0,
  //       //     menuName: "产品详情",
  //       //     menuNameEn: null,
  //       //     menuNameDe: null,
  //       //     menuSort: 1,
  //       //     menuType: 1,
  //       //     href: "/productDetail",
  //       //     icon: null,
  //       //     enableFlag: true,
  //       //     permission: null,
  //       //     frontCode: "productDetail",
  //       //     targetScope: 0,
  //       //   }
  //       // ]
  //     },
  //   ],
  //   childrenCount: 4,
  //   menuName: t("lang.productData"),
  //   menuNameEn: t("lang.productData"),
  //   menuNameDe: t("lang.productData"),
  //   menuSort: 3,
  //   menuType: 1,
  //   href: "/productManual",
  //   icon: "cp",
  //   enableFlag: true,
  //   permission: null,
  //   frontCode: "productManual",
  //   targetScope: 0,
  // },
  {
    id: "9525760518579712",
    parentId: "0",
    childrenList: [
      {
        id: "9525913048704512",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sworkorderlist"),
        menuNameEn: t("lang.sworkorderlist"),
        menuNameDe: t("lang.sworkorderlist"),
        menuSort: 0,
        menuType: 1,
        href: "/workorder",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "workorderList",
        targetScope: 0,
      },
      {
        id: "9525914242377216",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.scomplaintrecord"),
        menuNameEn: t("lang.scomplaintrecord"),
        menuNameDe: t("lang.scomplaintrecord"),
        menuSort: 1,
        menuType: 1,
        href: "/customer",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "customer",
        targetScope: 0,
      },
      {
        id: "9525914242557216",
        parentId: "9525760518575512",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.maintenance"),
        menuNameEn: t("lang.maintenance"),
        menuNameDe: t("lang.maintenance"),
        menuSort: 1,
        menuType: 1,
        href: "/solarenergy",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "solarenergy",
        targetScope: 0,
      },
      // 二期任务
      // {
      //   id: "9525915177412096",
      //   parentId: "9525760518579712",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: "重大客诉记录",
      //   menuNameEn: null,
      //   menuNameDe: null,
      //   menuSort: 2,
      //   menuType: 1,
      //   href: "/major",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "major",
      //   targetScope: 0,
      // },
      // {
      //   id: "9525916128568832",
      //   parentId: "9525760518579712",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: t("lang.swarrantyrecord"),
      //   menuNameEn: t("lang.swarrantyrecord"),
      //   menuNameDe: t("lang.swarrantyrecord"),
      //   menuSort: 3,
      //   menuType: 1,
      //   href: "/quality",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "quality",
      //   targetScope: 0,
      // },
      {
        id: "9525917744915968",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.saftersalesstaffmanagement"),
        menuNameEn: t("lang.saftersalesstaffmanagement"),
        menuNameDe: t("lang.saftersalesstaffmanagement"),
        menuSort: 4,
        menuType: 1,
        href: "/aftersales",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "aftersales",
        targetScope: 0,
      },
      {
        id: "9525917744915968",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.prototypeManage"),
        menuNameEn: t("lang.prototypeManage"),
        menuNameDe: t("lang.prototypeManage"),
        menuSort: 4,
        menuType: 1,
        href: "/prototypeManage",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "prototypeManage",
        targetScope: 0,
      },
      {
        id: "9525917744915968",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.newAircraft"),
        menuNameEn: t("lang.newAircraft"),
        menuNameDe: t("lang.newAircraft"),
        menuSort: 4,
        menuType: 1,
        href: "/newMachine",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "newMachine",
        targetScope: 0,
      },
      {
        id: "9525917744915968",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.feedbackRecord"),
        menuNameEn: t("lang.feedbackRecord"),
        menuNameDe: t("lang.feedbackRecord"),
        menuSort: 4,
        menuType: 1,
        href: "/feedbackRecord",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "feedbackRecord",
        targetScope: 0,
      },
      {
        id: "9525917744915955",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.queSurveyRecord"),
        menuNameEn: t("lang.queSurveyRecord"),
        menuNameDe: t("lang.queSurveyRecord"),
        menuSort: 4,
        menuType: 1,
        href: "/questionSurvey",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "questionSurvey",
        targetScope: 0,
      },

      // {
      //   id: "9525918562510336",
      //   parentId: "9525760518579712",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: "售后区域管理",
      //   menuNameEn: null,
      //   menuNameDe: null,
      //   menuSort: 5,
      //   menuType: 1,
      //   href: "/region",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "region",
      //   targetScope: 0,
      // },
    ],
    childrenCount: 6,
    menuName: t("lang.om"),
    menuNameEn: t("lang.om"),
    menuNameDe: t("lang.om"),
    menuSort: 6,
    menuType: 1,
    href: "/workorder",
    icon: "yunwei",
    enableFlag: true,
    permission: null,
    frontCode: "workorder",
    targetScope: 0,
  },
  {
    id: "9525749865145856",
    parentId: "0",
    childrenList: [
      {
        id: "9525909216290304",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.scommandtask"),
        menuNameEn: t("lang.scommandtask"),
        menuNameDe: t("lang.scommandtask"),
        menuSort: 1,
        menuType: 1,
        href: "/insTask",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "insTask",
        targetScope: 0,
      },
      {
        id: "9525910647301632",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.scommandrecord"),
        menuNameEn: t("lang.scommandrecord"),
        menuNameDe: t("lang.scommandrecord"),
        menuSort: 2,
        menuType: 1,
        href: "/insRecording",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "insRecording",
        targetScope: 0,
      },
      {
        id: "9525907614721536",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sstrategytemplate"),
        menuNameEn: t("lang.sstrategytemplate"),
        menuNameDe: t("lang.sstrategytemplate"),
        menuSort: 0,
        menuType: 1,
        href: "/strategy",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "strategy",
        targetScope: 0,
      },
      {
        id: "9525911744407040",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.slargescreen"),
        menuNameEn: t("lang.slargescreen"),
        menuNameDe: t("lang.slargescreen"),
        menuSort: 3,
        menuType: 1,
        href: "/screen",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "screen",
        targetScope: 0,
      },
      {
        id: "9525909216290304",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.modificationSn"),
        menuNameEn: t("lang.modificationSn"),
        menuNameDe: t("lang.modificationSn"),
        menuSort: 1,
        menuType: 1,
        href: "/modificationSn",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "modificationSn",
        targetScope: 0,
      },
      {
        id: "9525909216290304",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.equiChange"),
        menuNameEn: t("lang.equiChange"),
        menuNameDe: t("lang.equiChange"),
        menuSort: 1,
        menuType: 1,
        href: "/equiChange",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "equiChange",
        targetScope: 0,
      },
      {
        id: "9525909216290304",
        parentId: "9525749865145856",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.collectWhiteList"),
        menuNameEn: t("lang.collectWhiteList"),
        menuNameDe: t("lang.collectWhiteList"),
        menuSort: 1,
        menuType: 1,
        href: "/whiteList",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "whiteList",
        targetScope: 0,
      },
      {
        id: "9525925313046063",
        parentId: "9525762669700608",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.copyParameterManagement"),
        menuNameEn: t("lang.copyParameterManagement"),
        menuNameDe: t("lang.copyParameterManagement"),
        menuSort: 4,
        menuType: 1,
        href: "/copyParamManage",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "copyParamManage",
        targetScope: 0,
      },
      // {
      //   id: "9525925313046063",
      //   parentId: "9525762669700608",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: t("lang.systemConfigPlan"),
      //   menuNameEn: t("lang.systemConfigPlan"),
      //   menuNameDe: t("lang.systemConfigPlan"),
      //   menuSort: 4,
      //   menuType: 1,
      //   href: "/systemConfigPlan",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "systemConfigPlan",
      //   targetScope: 0,
      // },
    ],
    childrenCount: 4,
    menuName: t("lang.stools"),
    menuNameEn: t("lang.stools"),
    menuNameDe: t("lang.stools"),
    menuSort: 5,
    menuType: 1,
    href: "/screen",
    icon: "gongju",
    enableFlag: true,
    permission: null,
    frontCode: "screen",
    targetScope: 0,
  },
  {
    id: "9525762669700608",
    parentId: "0",
    childrenList: [
      {
        id: "9525919714993664",
        parentId: "9525762669700608",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.suser"),
        menuNameEn: t("lang.suser"),
        menuNameDe: t("lang.suser"),
        menuSort: 1,
        menuType: 1,
        href: "/user",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "user",
        targetScope: 0,
      },
      {
        id: "9525920903357952",
        parentId: "9525762669700608",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sorganization"),
        menuNameEn: t("lang.sorganization"),
        menuNameDe: t("lang.sorganization"),
        menuSort: 1,
        menuType: 1,
        href: "/organization",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "organization",
        targetScope: 0,
      },

      // {
      //   id: "9525919714993664",
      //   parentId: "9525762669700608",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: t("lang.userAudit"),
      //   menuNameEn: t("lang.userAudit"),
      //   menuNameDe: t("lang.userAudit"),
      //   menuSort: 1,
      //   menuType: 1,
      //   href: "/userreview",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "userreview",
      //   targetScope: 0,
      // },
      {
        id: "9525921839506944",
        parentId: "9525762669700608",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.srole"),
        menuNameEn: t("lang.srole"),
        menuNameDe: t("lang.srole"),
        menuSort: 2,
        menuType: 1,
        href: "/role",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "role",
        targetScope: 0,
      },
      {
        id: "9525924389611008",
        parentId: "9525762669700608",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sunctionanagement"),
        menuNameEn: t("lang.sunctionanagement"),
        menuNameDe: t("lang.sunctionanagement"),
        menuSort: 3,
        menuType: 1,
        href: "/power",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "power",
        targetScope: 0,
      },
      {
        id: "9525925313046016",
        parentId: "9525762669700608",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.segistrationanagement"),
        menuNameEn: t("lang.segistrationanagement"),
        menuNameDe: t("lang.segistrationanagement"),
        menuSort: 4,
        menuType: 1,
        href: "/register",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "register",
        targetScope: 0,
      },
      // {
      //   id: "9525925313046044",
      //   parentId: "9525762669700608",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: t("lang.scheManagement"),
      //   menuNameEn: t("lang.scheManagement"),
      //   menuNameDe: t("lang.scheManagement"),
      //   menuSort: 4,
      //   menuType: 1,
      //   href: "/scheManagement",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "scheManagement",
      //   targetScope: 0,
      // },
      {
        id: "9525927605855744",
        parentId: "9525762669700608",
        childrenList: [
          {
            id: "9525927605855744",
            parentId: "9525762669700608",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.category"),
            menuNameEn: t("lang.category"),
            menuNameDe: t("lang.category"),
            menuSort: 6,
            menuType: 1,
            href: "/sortManagement",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "sortManagement",
            targetScope: 0,
          },
          {
            id: "9525927605855744",
            parentId: "9525762669700608",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.material"),
            menuNameEn: t("lang.material"),
            menuNameDe: t("lang.material"),
            menuSort: 6,
            menuType: 1,
            href: "/documentManagement",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "documentManagement",
            targetScope: 0,
          },
        ],
        childrenCount: 2,
        menuName: t("lang.ducumentManagement"),
        menuNameEn: t("lang.ducumentManagement"),
        menuNameDe: t("lang.ducumentManagement"),
        menuSort: 6,
        menuType: 1,
        href: "/documentManagement",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "documentManagement",
        targetScope: 0,
      },
      {
        id: "10242310839467456",
        parentId: "9525762669700608",
        childrenList: [
          {
            id: "9525927605855744",
            parentId: "9525762669700608",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.sproductmsanagement"),
            menuNameEn: t("lang.sproductmsanagement"),
            menuNameDe: t("lang.sproductmsanagement"),
            menuSort: 6,
            menuType: 1,
            href: "/productMng",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "productMng",
            targetScope: 0,
          },
          {
            id: "9525927605855744",
            parentId: "9525762669700608",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.productIdentificat"),
            menuNameEn: t("lang.productIdentificat"),
            menuNameDe: t("lang.productIdentificat"),
            menuSort: 6,
            menuType: 1,
            href: "/productIdentificat",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "productIdentificat",
            targetScope: 0,
          },
        ],
        childrenCount: 2,
        menuName: t("lang.sproductmsanagement"),
        menuNameEn: t("lang.sproductmsanagement"),
        menuNameDe: t("lang.sproductmsanagement"),
        menuSort: 6,
        menuType: 1,
        href: "/productManage",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "productMng",
        targetScope: 0,
      },
      {
        id: "10242310839467453",
        parentId: "9525762669700608",
        childrenList: [
          {
            id: "9525927605855744",
            parentId: "9525762669700608",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.inverter"),
            menuNameEn: t("lang.inverter"),
            menuNameDe: t("lang.inverter"),
            menuSort: 6,
            menuType: 1,
            href: "/inverterList",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "inverterList",
            targetScope: 0,
          },
          {
            id: "9525927605855744",
            parentId: "9525762669700608",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.batteryGroup"),
            menuNameEn: t("lang.batteryGroup"),
            menuNameDe: t("lang.batteryGroup"),
            menuSort: 6,
            menuType: 1,
            href: "/batteryPackList",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "batteryPackList",
            targetScope: 0,
          },
        ],
        childrenCount: 2,
        menuName: t("lang.installConfigManage"),
        menuNameEn: t("lang.installConfigManage"),
        menuNameDe: t("lang.installConfigManage"),
        menuSort: 6,
        menuType: 1,
        href: "/inverterList",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "installConfigManage",
        targetScope: 0,
      },
    ],
    childrenCount: 7,
    menuName: t("lang.smanagement"),
    menuNameEn: t("lang.smanagement"),
    menuNameDe: t("lang.smanagement"),
    menuSort: 7,
    menuType: 1,
    href: "/organization",
    icon: "gaunli",
    enableFlag: true,
    permission: null,
    frontCode: "organizational",
    targetScope: 0,
  },

  {
    id: "7554766402894944",
    parentId: "0",
    childrenList: [
      // {
      //   id: "9525791575762432",
      //   parentId: "7554766402894944",
      //   childrenList: [],
      //   childrenCount: 0,
      //   menuName: t("lang.sproductmsanagement"),
      //   menuNameEn: t("lang.sproductmsanagement"),
      //   menuNameDe: t("lang.sproductmsanagement"),
      //   menuSort: 0,
      //   menuType: 1,
      //   href: "/product",
      //   icon: null,
      //   enableFlag: true,
      //   permission: null,
      //   frontCode: "product",
      //   targetScope: 0,
      // },
      {
        id: "9525793155147264",
        parentId: "7554766402894944",
        childrenList: [],
        childrenCount: 0,
        menuName: "设备库",
        menuNameEn: null,
        menuNameDe: null,
        menuSort: 1,
        menuType: 1,
        href: "/devicelibrary",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "devicelibrary",
        targetScope: 0,
      },

      {
        id: "9525794372347392",
        parentId: "7554766402894944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.sfirmwaremsanagement"),
        menuNameEn: t("lang.sfirmwaremsanagement"),
        menuNameDe: t("lang.sfirmwaremsanagement"),
        menuSort: 2,
        menuType: 1,
        href: "/software",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "software",
        targetScope: 0,
      },
      {
        id: "9525794372347392",
        parentId: "7554766402894944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.upgradeVersion"),
        menuNameEn: t("lang.upgradeVersion"),
        menuNameDe: t("lang.upgradeVersion"),
        menuSort: 2,
        menuType: 1,
        href: "/upgradeVersion",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "upgradeVersion",
        targetScope: 0,
      },
      {
        id: "9525800504158896",
        parentId: "8279556538128820",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.upgradePush"),
        menuNameEn: t("lang.upgradePush"),
        menuNameDe: t("lang.upgradePush"),
        menuSort: 5,
        menuType: 1,
        href: "/pushUpgrade",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "pushUpgrade",
        targetScope: 0,
      },
      {
        id: "9525795549668864",
        parentId: "7554766402894944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.softwareUpgrade"),
        menuNameEn: t("lang.softwareUpgrade"),
        menuNameDe: t("lang.softwareUpgrade"),
        menuSort: 3,
        menuType: 1,
        href: "/upgrade",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "softupgrade",
        targetScope: 0,
      },
      {
        id: "9525794372347392",
        parentId: "7554766402894944",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.bluetoothRecording"),
        menuNameEn: t("lang.bluetoothRecording"),
        menuNameDe: t("lang.bluetoothRecording"),
        menuSort: 2,
        menuType: 1,
        href: "/bluetoothRecord",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "bluetoothRecord",
        targetScope: 0,
      },
    ],
    childrenCount: 4,
    menuName: t("lang.spsroduct"),
    menuNameEn: t("lang.spsroduct"),
    menuNameDe: t("lang.spsroduct"),
    menuSort: 3,
    menuType: 1,
    href: "/upgrade",
    icon: "cp",
    enableFlag: true,
    permission: null,
    frontCode: "upgrade",
    targetScope: 0,
  },
  {
    id: "9525766895953408",
    parentId: "0",
    childrenList: [
      {
        id: "9525929204409856",
        parentId: "9525766895953408",
        childrenList: [
          {
            id: "9525931015857664",
            parentId: "9525929204409856",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.sessageemplate"),
            menuNameEn: t("lang.sessageemplate"),
            menuNameDe: t("lang.sessageemplate"),
            menuSort: 1,
            menuType: 1,
            href: "/messageTem",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "messageTem",
            targetScope: 0,
          },
          {
            id: "9525931996800512",
            parentId: "9525929204409856",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.sessageask"),
            menuNameEn: t("lang.sessageask"),
            menuNameDe: t("lang.sessageask"),
            menuSort: 1,
            menuType: 1,
            href: "/messageTask",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "messageTask",
            targetScope: 0,
          },
          {
            id: "9525932785001984",
            parentId: "9525929204409856",
            childrenList: [],
            childrenCount: 0,
            menuName: t("lang.sessageog"),
            menuNameEn: t("lang.sessageog"),
            menuNameDe: t("lang.sessageog"),
            menuSort: 2,
            menuType: 1,
            href: "/messageLog",
            icon: null,
            enableFlag: true,
            permission: null,
            frontCode: "messageLog",
            targetScope: 0,
          },
          // {
          //   id: "9525933681403392",
          //   parentId: "9525929204409856",
          //   childrenList: [],
          //   childrenCount: 0,
          //   menuName: "消息配置",
          //   menuNameEn: null,
          //   menuNameDe: null,
          //   menuSort: 3,
          //   menuType: 1,
          //   href: "/messageSet",
          //   icon: null,
          //   enableFlag: true,
          //   permission: null,
          //   frontCode: "messageSet",
          //   targetScope: 0,
          // },
        ],
        childrenCount: 4,
        menuName: t("lang.sessageenter"),
        menuNameEn: t("lang.sessageenter"),
        menuNameDe: t("lang.sessageenter"),
        menuSort: 1,
        menuType: 1,
        href: "/messageTask",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "messageTask",
        targetScope: 0,
      },
      {
        id: "9525930037470720",
        parentId: "9525766895953408",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.slog"),
        menuNameEn: t("lang.slog"),
        menuNameDe: t("lang.slog"),
        menuSort: 1,
        menuType: 1,
        href: "/logMng",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "logMng",
        targetScope: 0,
      },
      {
        id: "9525916128568832",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.smqlog"),
        menuNameEn: t("lang.smqlog"),
        menuNameDe: t("lang.smqlog"),
        menuSort: 3,
        menuType: 1,
        href: "/mqLog",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "mqLog",
        targetScope: 0,
      },
      {
        id: "9525916128568832",
        parentId: "9525760518579712",
        childrenList: [],
        childrenCount: 0,
        menuName: t("lang.bannerConfig"),
        menuNameEn: t("lang.bannerConfig"),
        menuNameDe: t("lang.bannerConfig"),
        menuSort: 3,
        menuType: 1,
        href: "/bannerConfig",
        icon: null,
        enableFlag: true,
        permission: null,
        frontCode: "bannerConfig",
        targetScope: 0,
      },
    ],
    childrenCount: 2,
    menuName: t("lang.ssystem"),
    menuNameEn: t("lang.ssystem"),
    menuNameDe: t("lang.ssystem"),
    menuSort: 8,
    menuType: 1,
    href: "/system",
    icon: "system",
    enableFlag: true,
    permission: null,
    frontCode: "system",
    targetScope: 0,
  },
]);

const routeList = routers.getRoutes();
// console.log("routeList", routeList, sortedWebMenuList);
const menuList1 = ref(sortedWebMenuList);
console.log("menuList1", menuList1.value);

// 从menuList中找到与frontCode对应的那项
function findRouteByName(routes, targetName) {
  // 如果routes是数组，遍历数组
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const result = findRouteByName(route, targetName);
      if (result) return result;
    }
    return null;
  }

  // 如果routes是对象
  if (routes && typeof routes === "object") {
    // 检查当前路由是否匹配
    if (routes.frontCode === targetName) {
      return routes;
    }
    // 如果有children，递归搜索children
    if (routes.childrenList && Array.isArray(routes.childrenList)) {
      return findRouteByName(routes.childrenList, targetName);
    }
  }
  return null;
}

// 递归处理菜单名字翻译
function mapMenuName(menus) {
  if (!menus || !menus.length) return;
  menus.forEach((item) => {
    if (item.children?.length) {
      mapMenuName(item.children);
    }
    // findRouteByName从menuList中找到与当前item的frontCode一致的对象后，替换当前item中menuName为menuList中那一项的menuName
    let temp = findRouteByName(menuList.value, item.frontCode) ?? {};
    if (temp.menuName) {
      item.menuName = temp.menuName;
    }
  });
}
mapMenuName(menuList1.value);

// menuList.value = menuList.value.filter((item) =>
//   routeList.find((routeItem) => routeItem.name === item.frontCode)
// );
// for (let i = 0; i < menuList.value.length; i++) {
//   if (menuList.value[i].childrenList !== undefined) {
//     menuList.value[i].childrenList = menuList.value[i].childrenList.filter(
//       (item) => routeList.find((routeItem) => routeItem.name === item.frontCode)
//     );
//   }
// }
// for (let i = 0; i < menuList.value.length; i++) {
//   if (menuList.value[i].childrenList !== undefined) {
//     for (let j = 0; j < menuList.value[i].childrenList.length; j++) {
//       if (menuList.value[i].childrenList[j].childrenList !== undefined) {
//         menuList.value[i].childrenList[j].childrenList = menuList.value[
//           i
//         ].childrenList[j].childrenList.filter((item) =>
//           routeList.find((routeItem) => routeItem.name === item.frontCode)
//         );
//       }
//     }
//   }
// }

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
