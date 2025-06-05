import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { flattenArray, deepCopy } from "@/utils";
import { ElLoading } from "element-plus";
import i18n from "../i18n/i18n.js";
var loadingInstance = null;

const { t } = i18n.global;
// 动态路由
let dynamicRoute = [
  {
    path: "home",
    name: "databoard",
    component: () => import("../views/Home/index"),
    meta: {
      title: t("lang.dashboard"),
      cn: "数据看板",
      notShowChildren: true,
    },
  },
  {
    path: "alarm",
    name: "alarm",
    component: () => import("../views/alarm/index"),
    meta: {
      title: t("lang.alarm"),
      cn: "告警",
    },
  },
  {
    path: "power",
    name: "power",
    component: () => import("../views/power/index"),
    meta: {
      title: t("lang.sunctionanagement"),
      cn: "功能管理",
    },
  },
  {
    path: "/management",
    name: "management",
    meta: {
      title: t("lang.smanagement"),
      cn: "管理",
      noComponent: true,
    },
  },
  {
    path: "organization",
    name: "organization",
    component: () => import("../views/organization/index"),
    meta: {
      title: t("lang.sorganization"),
      cn: "组织管理",
    },
  },
  {
    path: "personal",
    name: "personal",
    component: () => import("../views/setting/personal/index"),
    meta: {
      title: t("lang.personalnformation"),
      cn: "个人信息",
      hidden: true,
    },
  },
  {
    path: "role",
    name: "role",
    component: () => import("../views/setting/role/index"),
    meta: {
      title: t("lang.srole"),
      cn: "角色管理",
    },
  },
  //   {
  // 	path: "below",
  // 	name: "below",
  // 	component: () => import("../views/usercenter/below.vue"),
  // 	meta: {
  // 	  title: t("lang.Subordinate"),
  // 	},
  //   },
  //   {
  // 	path: "userinfo",
  // 	name: "userinfo",
  // 	component: () => import("../views/usercenter/userinfo.vue"),
  // 	meta: {
  // 	  title: t("lang.userinformation"),
  // 	  cn:'用户信息'
  // 	},
  //   },
  //   {
  // 	path: "record",
  // 	name: "record",
  // 	component: () => import("../views/log/msgRecord.vue"),
  // 	meta: {
  // 	  title: "消息记录",
  // 	},
  //   },
  {
    path: "/logMng",
    name: "logMng",
    component: () => import("../views/log/logMng.vue"),
    meta: {
      title: t("lang.slog"),
      cn: "日志管理",
    },
  },
  {
    path: "user",
    name: "user",
    component: () => import("../views/setting/user/index.vue"),
    meta: {
      title: t("lang.suser"),
      cn: "用户管理",
    },
  },
  {
    path: "userreview",
    name: "userreview",
    component: () => import("../views/setting/userreview/index.vue"),
    meta: {
      title: t("lang.userAudit"),
      cn: "用户审核",
    },
  },
  //   {
  // 	path: "appuser",
  // 	name: "appuser",
  // 	component: () => import("../views/setting/appuser/index.vue"),
  // 	meta: {
  // 	  title: "APP角色管理",
  // 	},
  //   },
  //   {
  // 	path: "resource",
  // 	name: "resource",
  // 	component: () => import("../views/setting/resource/index.vue"),
  // 	meta: {
  // 	  title: "APP资源管理",
  // 	},
  //   },
  {
    path: "software",
    name: "software",
    component: () => import("../views/firmwareMng/software.vue"),
    meta: {
      title: t("lang.sfirmwaremsanagement"),
      cn: "固件管理",
    },
  },
  {
    path: "upgrade",
    name: "softupgrade",
    component: () => import("../views/firmwareMng/upgrade.vue"),
    meta: {
      title: t("lang.softwareUpgrade"),
      cn: "远程升级",
    },
  },
  {
    path: "upgradeVersion",
    name: "upgradeVersion",
    component: () => import("../views/firmwareMng/upgradeVersion.vue"),
    meta: {
      title: t("lang.upgradeVersion"),
      cn: "蓝牙版本",
    },
  },
  {
    path: "/pushUpgrade",
    name: "pushUpgrade",
    component: () => import("../views/firmwareMng/upgradepush.vue"),
    meta: {
      title: t("lang.upgradePush"),
      cn: "蓝牙推送",
    },
  },
  {
    path: "bluetoothRecord",
    name: "bluetoothRecord",
    component: () => import("../views/firmwareMng/bluetoothRecord.vue"),
    meta: {
      title: t("lang.bluetoothRecording"),
      cn: "蓝牙升级记录",
    },
  },
  {
    path: "register",
    name: "register",
    component: () => import("../views/register/index.vue"),
    meta: {
      title: t("lang.segistrationanagement"),
      cn: "注册管理",
    },
  },
  {
    path: "upgrade",
    name: "upgrade",
    meta: {
      title: t("lang.spsroduct"),
      cn: "固件",
      noComponent: true,
    },
  },

  // {
  //   path: "product",
  //   name: "product",
  //   component: () => import("../views/product/productMng.vue"),
  //   meta: {
  //     title: t("lang.sproductmsanagement"),
  //   },
  // },
  {
    path: "messageTem",
    name: "messageTem",
    component: () => import("../views/message/messageTem.vue"),
    meta: {
      title: t("lang.sessageemplate"),
      cn: "消息模板",
    },
  },
  {
    path: "",
    name: "msgTask",
    meta: {
      title: t("lang.sessageask"),
      cn: "消息任务",
      noComponent: true,
    },
  },
  {
    path: "messageTask",
    name: "messageTask",
    component: () => import("../views/message/messageTask.vue"),
    meta: {
      title: t("lang.sessageask"),
      cn: "消息任务",
    },
  },
  {
    path: "messageLog",
    name: "messageLog",
    component: () => import("../views/message/messageLog.vue"),
    meta: {
      title: t("lang.sessageog"),
      cn: "消息日志",
    },
  },
  {
    path: "video",
    name: "video",
    component: () => import("../views/video/index.vue"),
    meta: {
      title: t("lang.sideoanagement"),
      cn: "视频管理",
    },
  },
  {
    path: "/manual",
    name: "manual",
    component: () => import("../views/manual/index.vue"),
    meta: {
      title: t("lang.sroductanualanagement"),
      cn: "产品手册管理",
    },
  },
  {
    path: "station",
    name: "station",
    component: () => import("../views/surveillance/station/index.vue"),
    meta: {
      title: t("lang.sPlant"),
      cn: "电站",
    },
  },
  //   {
  // 	path: "messageSet",
  // 	name: "messageSet",
  // 	component: () => import("../views/message/messageSet.vue"),
  // 	meta: {
  // 	  title: t("lang.sessageonfiguration"),
  // 	  cn:'消息配置'
  // 	},
  //   },
  {
    path: "",
    name: "monitoring",
    redirect: "/deviceList",
    meta: {
      title: t("lang.smonitoring"),
      cn: "监控",
      noComponent: true,
    },
  },
  {
    path: "/deviceList",
    name: "deviceList",
    component: () => import("../views/monitoring/deviceList.vue"),
    meta: {
      title: t("lang.sdsevice"),
      cn: "设备",
    },
  },
  {
    path: "",
    name: "service",
    redirect: "/videoList",
    meta: {
      title: t("lang.sservice"),
      cn: "服务",
      noComponent: true,
    },
    children: [
      {
        path: "/videoList",
        name: "videoList",
        component: () => import("../views/serve/videoList.vue"),
        meta: {
          title: t("lang.productData"),
          cn: "产品资料",
        },
      },
      //   {
      // 	path: "productManual",
      // 	name: "productManual",
      // 	component: () => import("../views/serve/productManual.vue"),
      // 	meta: {
      // 	  title: t("lang.spsroductmanual"),
      // 	  cn:'产品手册'
      // 	},
      //   },
      //   {
      // 	path: "/productDetail",
      // 	name: "productDetail",
      // 	component: () => import("../views/serve/productDetail.vue"),
      // 	meta: {
      // 	  title: t("lang.productDetails"),
      // 	  cn:'产品详情'
      // 	},
      //   },
      {
        path: "/helpCenter",
        name: "helpCenter",
        component: () => import("../views/serve/helpCenter.vue"),
        meta: {
          title: t("lang.shelpcsenter"),
          cn: "帮助中心",
        },
      },
      {
        path: "contactUs",
        name: "contactUs",
        component: () => import("../views/serve/contactUs.vue"),
        meta: {
          title: t("lang.scsontactus"),
          cn: "联系我们",
        },
      },
      {
        path: "/repairDetails",
        name: "repairDetails",
        component: () => import("../views/serve/component/repairDetail.vue"),
        meta: {
          title: "报修详情",
          hidden: true,
        },
      },
      {
        path: "/equRepair",
        name: "equRepair",
        component: () => import("../views/serve/equRepair.vue"),
        meta: {
          title: t("lang.sdsevicerepair"),
          cn: "设备报修",
        },
        children: [],
      },
      //   {
      // 	path: "repairDetails",
      // 	name: "repairDetails",
      // 	component: () => import("../views/serve/component/repairDetail.vue"),
      // 	meta: {
      // 	  title: t("lang.fixDetail"),
      // 	  cn:'报修详情'
      // 	},
      //   },
    ],
  },
  {
    path: "/strategy",
    name: "strategy",
    meta: {
      title: t("lang.sstrategytemplate"),
      cn: "策略模板",
    },
    component: () => import("../views/tool/strategyTem.vue"),
  },
  {
    path: "/insTask",
    name: "insTask",
    meta: {
      title: t("lang.scommandtask"),
      cn: "指令任务",
    },
    component: () => import("../views/tool/insTask.vue"),
  },
  {
    path: "/insRecording",
    name: "insRecording",
    meta: {
      title: t("lang.scommandrecord"),
      cn: "指令记录",
    },
    component: () => import("../views/tool/insRecording.vue"),
  },
  {
    path: "/maintenance",
    name: "workorder",
    children: [],
    meta: {
      title: t("lang.om"),
      cn: "运维",
    },
  },
  {
    path: "/workorder",
    name: "workorderList",
    component: () => import("../views/operation/workorder.vue"),
    meta: {
      title: t("lang.sworkorderlist"),
      cn: "工单列表",
    },
  },
  {
    path: "/workDetail",
    name: "workDetail",
    component: () =>
      import("../views/operation/components/workorderDetail.vue"),
    meta: {
      title: t("lang.workdetails"),
      cn: "工单详情",
      hidden: true,
    },
  },
  {
    path: "/customer",
    name: "customer",
    component: () => import("../views/operation/customer.vue"),
    meta: {
      title: t("lang.scomplaintrecord"),
      cn: "客诉记录",
    },
  },
  {
    path: "/solarenergy",
    name: "solarenergy",
    component: () => import("../views/operation/solarenergy.vue"),
    meta: {
      title: t("lang.maintenance"),
      cn: "海外维修报表",
    },
  },
  {
    path: "/mqLog",
    name: "mqLog",
    children: [],
    component: () => import("../views/operation/mqLog.vue"),
    meta: {
      title: t("lang.smqlog"),
      cn: "MQ日志",
    },
  },
  {
    path: "/system",
    name: "system",
    children: [],
    meta: {
      title: t("lang.ssystem"),
      cn: "系统",
      noComponent: true,
    },
  },
  {
    path: "/major",
    name: "major",
    component: () => import("../views/operation/major.vue"),
    meta: {
      title: t("lang.complaintrecords"),
      cn: "重大客诉记录",
    },
  },
  {
    path: "/quality",
    name: "quality",
    component: () => import("../views/operation/quality.vue"),
    meta: {
      title: t("lang.swarrantyrecord"),
      cn: "质保记录",
    },
  },
  {
    path: "/aftersales",
    name: "aftersales",
    component: () => import("../views/operation/aftersales.vue"),
    meta: {
      title: t("lang.saftersalesstaffmanagement"),
      cn: "售后人员管理",
    },
  },
  {
    path: "/region",
    name: "region",
    component: () => import("../views/operation/region.vue"),
    meta: {
      title: t("lang.afterSales"),
      cn: "售后区域管理",
    },
  },
  {
    path: "/tools",
    name: "tools",
    meta: {
      title: t("lang.stools"),
      cn: "工具",
      noComponent: true,
    },
  },
  {
    path: "/screen",
    name: "screen",
    component: () => import("../views/largeScreen/index.vue"),
    meta: {
      title: t("lang.slargescreen"),
      cn: "大屏",
    },
  },
  {
    path: "/modificationSn",
    name: "modificationSn",
    meta: {
      title: t("lang.modificationSn"),
      cn: "修改SN",
    },
    component: () => import("../views/tool/modificationSn.vue"),
  },
  {
    path: "/equiChange",
    name: "equiChange",
    meta: {
      title: t("lang.equiChange"),
      cn: "设备变更",
    },
    component: () => import("../views/tool/equiChange.vue"),
  },
  {
    path: "/whiteList",
    name: "whiteList",
    meta: {
      title: t("lang.collectWhiteList"),
      cn: "采集器白名单",
    },
    component: () => import("../views/tool/collectWhiteList.vue"),
  },
  {
    path: "/sortManagement",
    name: "sortManagement",
    meta: {
      title: t("lang.category"),
      cn: "分类",
    },
    component: () => import("../views/sortManagement/index.vue"),
  },
  {
    path: "/documentManagement",
    name: "documentManagement",
    meta: {
      title: t("lang.ducumentManagement"),
      cn: "资料管理",
      noComponent: true,
    },
  },
  {
    path: "/documentManagement",
    name: "document",
    meta: {
      title: t("lang.material"),
      cn: "资料",
    },
    component: () => import("../views/documentManagement/index.vue"),
  },
  {
    path: "",
    name: "productManagement",
    meta: {
      title: t("lang.sproductmsanagement"),
      cn: "产品管理",
      noComponent: true,
    },
  },
  {
    path: "/productIdentificat",
    name: "productIdentificat",
    meta: {
      title: t("lang.productIdentificat"),
      cn: "产品识别",
    },
    component: () =>
      import("../views/productManagement/productIdentificat.vue"),
  },
  {
    path: "/productMng",
    name: "productMng",
    meta: {
      title: t("lang.sproductmsanagement"),
      cn: "产品管理",
    },
    component: () => import("../views/productManagement/productMng.vue"),
  },
  {
    path: "/prototypeManage",
    name: "prototypeManage",
    meta: {
      title: t("lang.prototypeManage"),
      cn: "样机管理",
    },
    component: () => import("../views/operation/prototypeManage.vue"),
  },
  {
    path: "/newMachine",
    name: "newMachine",
    meta: {
      title: t("lang.newAircraft"),
      cn: "新机人员管理",
    },
    component: () => import("../views/operation/newMachine.vue"),
  },
  {
    path: "/bannerConfig",
    name: "bannerConfig",
    meta: {
      title: t("lang.bannerConfig"),
      cn: "轮播配置",
    },
    component: () => import("@/views/system/bannerConfig.vue"),
  },
  {
    path: "/feedbackRecord",
    name: "feedbackRecord",
    meta: {
      title: t("lang.feedbackRecord"),
      cn: "意见反馈记录",
    },
    component: () => import("../views/operation/feedbackRecord.vue"),
  },
  {
    path: "/questionSurvey",
    name: "questionSurvey",
    meta: {
      title: t("lang.queSurveyRecord"),
      cn: "问卷调查记录",
    },
    component: () => import("../views/operation/queSurveyRecord.vue"),
  },
  {
    path: "/copyParamManage",
    name: "copyParamManage",
    meta: {
      title: t("lang.copyParameterManagement"),
      cn: "复制参数管理",
    },
    component: () => import("../views/copyParamsManage/index.vue"),
  },
  {
    path: "/scheManagement",
    name: "scheManagement",
    meta: {
      title: t("lang.scheManagement"),
      cn: "调度管理",
    },
    component: () => import("../views/scheManagement/index.vue"),
  },
  {
    path: "/installConfigManage",
    name: "installConfigManage",
    meta: {
      title: t("lang.installConfigManage"),
      cn: "装机配置管理",
      noComponent: true,
    },
    children: [
      {
        path: "/inverterList",
        name: "inverterList",
        meta: {
          title: t("lang.inverter"),
          cn: "逆变器",
        },
        component: () =>
          import("../views/installConfigManage/inverterList.vue"),
      },
      {
        path: "/batteryPackList",
        name: "batteryPackList",
        meta: {
          title: t("lang.batteryGroup"),
          cn: "电池组",
        },
        component: () =>
          import("../views/installConfigManage/batteryPackList.vue"),
      },
    ],
  },
];

// 静态路由
const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
    component: () => import("../Layout/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    redirect: "/databoard",
  },
  {
    path: "/login",
    name: "/login",
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/Login/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404/index.vue"),
  },
  {
    path: "/largescreen",
    name: "largescreen",
    component: () => import("../views/largeScreen/largescreen.vue"),
  },
  {
    path: "/largescreendetails",
    name: "largescreendetails",
    component: () => import("../views/largeScreen/largescreendetails.vue"),
  },
  {
    path: "/commercial",
    name: "commercial",
    component: () => import("../views/largeScreen/echarts/Earthcopy.vue"),
  },
  {
    path: "/systemConfigPlan",
    name: "systemConfigPlan",
    meta: {
      title: t("lang.systemConfigPlan"),
      cn: "装机配置方案",
      notInLayout: true,
    },
    component: () => import("../views/tool/systemConfigPlan.vue"),
  },
];

// 路由配置
let router = createRouter({
  base: "/dist",
  //history模式：createWebHistory , hash模式：createWebHashHistory
  history: createWebHistory(), //hash模式
  routes,
});

let resetRouterNum = 0;
let sortedWebMenuList = [];
const whitePageNames = [
  "largescreen",
  "largescreendetails",
  "commercial",
  "systemConfigPlan",
];
// 路由拦截
router.beforeEach((to, from, next) => {
  console.log(to);

  // loadingInstance = ElLoading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.7)',})
  // 判断当前是否已经登录
  const username = sessionStorage.getItem("username"); // 这里根据自己项目的实际情况添加是否登录的判断条件
  // 校验404页面
  // console.log(resetRouterNum, "resetRouterNum");
  if (to.matched.length === 0) {
    resetRouterNum += 1;
    if (resetRouterNum === 2) {
      resetRouterNum = 0;
      next({ path: "/404", replace: true });
    }
  } else {
    resetRouterNum = 0;
  }

  // 如果当前非login页面,并且未登录,则强制跳转login页面
  if (to.name !== "login" && !username && !whitePageNames.includes(to.name)) {
    next({ name: "login" });
  } else if (whitePageNames.includes(to.name)) {
    next();
  } else {
    // 获取登录用户信息
    let userData = sessionStorage.getItem("fulldetail");
    let hasRoutes = localStorage.getItem("hasRoutes");
    // 判断是否登录
    if (userData) {
      // 解构用户数据
      let { permissionMenuListVOList, username } = JSON.parse(userData);
      if (!hasRoutes) {
        // 添加所有动态路由权限
        // router.addRoute(dynamicRoute);
        // router.addRoute();
        sortedWebMenuList = dealMenuList(permissionMenuListVOList);
        console.log("sortedWebMenuList", sortedWebMenuList);
        sortedWebMenuList.forEach((item) => {
          // console.log(item);
          router.addRoute("root", item);
        });
        router.addRoute({
          path: "/systemConfigPlan",
          name: "systemConfigPlan",
          meta: {
            title: t("lang.systemConfigPlan"),
            cn: "装机配置方案",
            notInLayout: true,
          },
          component: () => import("../views/tool/systemConfigPlan.vue"),
        });

        const routeList = router.getRoutes();
        console.log("routeList", routeList);
        localStorage.setItem("hasRoutes", "true");
        //   to.meta = {
        // 	custom: true,
        //   };

        setTimeout(() => {
          next({ ...to });
        }, 100);
      } else {
        localStorage.removeItem("hasRoutes");
        next();
      }
    } else {
      console.log("denglu");
      next();
    }
    // loadingInstance.close()
  }
});

//使用vite懒加载
const Layout = () => import("@/layout/index.vue");
function _import(file) {
  const modules = import.meta.glob("../views/**/*.vue");
  const filePath = modules[`../views/${file}.vue`];
  return filePath;
}

// 通过后端返回的permissionMenuListVOList，对比上面的 dynamicRoute 拿到对应的component，组装成路由表
function dealMenuList(permissionMenuListVOList) {
  // 过滤出启用的web端路由
  let webMenuList = permissionMenuListVOList.filter(
    (item) => item.targetScope === 0 && item.enableFlag
  );
  console.log("webMenuList", webMenuList);
  // 按照 menuSort 排序
  let sortedWebMenuList = webMenuList.sort((a, b) => a.menuSort - b.menuSort);

  function formatMenuList(menuList) {
    menuList.forEach((item) => {
      let { component, meta, redirect } =
        findRouteByName([...dynamicRoute, ...routes], item.frontCode) ?? {};
      let { frontCode, menuName, icon, enableFlag, parentId } = item;
      item.name = frontCode;
      item.menuName = menuName;
      item.path = formatMenuPath(item);
      item.href = formatMenuPath(item);
      item.icon = icon;
      item.meta = meta;
      item.component = component;
      if (item.meta?.hidden) {
        sortedWebMenuList.push(item);
      }
      if (item.childrenList.length && !item.meta?.notShowChildren) {
        item.redirect = dealRedirect(item); // 父级菜单跳转到第一个未hidden的子菜单
        const enabledChildren = item.childrenList.filter(
          (item) => item.enableFlag
        );
        item.childrenCount = enabledChildren.length;
        item.children = formatMenuList(enabledChildren);
      }
    });
    return menuList;
  }
  // 父级菜单跳转到第一个未hidden的子菜单;已确保item有childrenList，但childrenList中可能有hidden
  function dealRedirect(item) {
    let res = "";
    for (let son of item.childrenList) {
      let { meta } =
        findRouteByName([...dynamicRoute, ...routes], son.frontCode) ?? {};
      if (meta && !("hidden" in meta)) {
        res = formatMenuPath(son);
        break;
      }
    }
    return res;
  }

  // 通过接口返回的frontCode 与 dynamicRoute中name比对，拿到 dynamicRoute中该条数据（component、meta）
  // 有部分菜单后端返回了但是 dynamicRoute 中没有对应的
  /**
   * 查找指定name的路由配置
   * @param {Object} routes - 路由配置对象
   * @param {string} targetName - 要查找的路由name
   * @returns {Object|null} 返回找到的路由配置或null
   */
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
      if (routes.name === targetName) {
        return routes;
      }

      // 如果有children，递归搜索children
      if (routes.children && Array.isArray(routes.children)) {
        return findRouteByName(routes.children, targetName);
      }
    }

    return null;
  }

  // 格式化路由path，处理以/开头
  function formatMenuPath(item) {
    return item.href.startsWith("/") ? item.href : "/" + item.href;
  }

  formatMenuList(sortedWebMenuList);
  // console.log(sortedWebMenuList);
  return sortedWebMenuList;
}

export { router as default, sortedWebMenuList };
// export default router;
