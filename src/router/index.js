import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layouts'

Vue.use(VueRouter)

export const initRouter = [
  // 业务管理
  {
    path: '/index/business',
    name: 'business',
    component: Layout,
    mate: {
      title: "业务管理",
      icon: "el-icon-house"
    },
    // redirect: '/index/business/template',
    children: [
      // 模板信息管理
      {
        path: '/index/business/template',
        name: 'template',
        component: () => import("@/views/business/Template.vue"),
        mate: {
          title: "模板信息管理",
        },
      },
      // 直播管理
      {
        path: '/index/business/live',
        name: 'live',
        component: () => import("@/views/business/Live.vue"),
        mate: {
          title: "直播管理",
        },
      },
      // 回看管理
      {
        path: '/index/business/lookback',
        name: 'lookback',
        component: () => import("@/views/business/Lookback.vue"),
        mate: {
          title: "回看管理",
        },
      },
      // 媒资信息管理
      {
        path: '/index/business/mediaresources',
        name: 'mediaresources',
        component: () => import("@/views/business/Mediaresources.vue"),
        mate: {
          title: "媒资信息管理",
        },
      },
      // 预览播放
      {
        path: '/index/business/preview',
        name: 'preview',
        component: () => import("@/views/business/Preview.vue"),
        mate: {
          title: "预览播放",
        },
      },
    ]
  },
  // 策略管理
  {
    path: '/index/strategy',
    name: 'strategy',
    component: Layout,
    mate: {
      title: "策略管理",
      icon: "el-icon-message"
    },
    children: [
      // 任务调度管理
      {
        path: '/index/strategy/task',
        name: 'task',
        component: () => import("@/views/strategy/Task.vue"),
        mate: {
          title: "任务调度管理",
        },
      },
      // 合流详情
      {
        path: '/index/strategy/task/edit/:id',
        name: 'taskEdit',
        component: () => import("@/views/strategy/TaskEdit.vue"),
        mate: {
          isConceal: true
        },
      },
      // 合流开启
      {
        path: '/index/strategy/open',
        name: 'open',
        component: () => import("@/views/strategy/Open.vue"),
        mate: {
          title: "合流开启",
        },
      },
      // 合流关闭
      {
        path: '/index/strategy/close',
        name: 'close',
        component: () => import("@/views/strategy/Close.vue"),
        mate: {
          title: "合流关闭",
        },
      },

    ]
  },
  // 日志
  {
    path: '/index/log',
    name: 'log',
    component: Layout,
    mate: {
      title: "日志",
      icon: "el-icon-user"
    },
    children: [
      // 任务操作日志
      {
        path: '/index/log/tasklog',
        name: 'tasklog',
        component: () => import("@/views/log/Tasklog.vue"),
        mate: {
          title: "任务操作日志",
        },
      },
      // 指令日志
      {
        path: '/index/log/instructlog',
        name: 'instruct',
        component: () => import("@/views/log/Instructlog.vue"),
        mate: {
          title: "指令日志",
        },
      },
      // 直播日志
      {
        path: '/index/log/livelog',
        name: 'livelog',
        component: () => import("@/views/log/Livelog.vue"),
        mate: {
          title: "直播日志",
        },
      },
      // 回看日志
      {
        path: '/index/log/lookbacklog',
        name: 'lookbacklog',
        component: () => import("@/views/log/Lookbacklog.vue"),
        mate: {
          title: "回看日志",
        },
      },
    ]
  },
  // 配置管理
  {
    path: '/index/setting',
    name: 'setting',
    component: Layout,
    mate: {
      title: "配置管理",
      icon: "el-icon-setting"
    },
    children: [
      // 操作指令配置
      {
        path: '/index/setting/operation',
        name: 'operation',
        component: () => import("@/views/setting/Operation.vue"),
        mate: {
          title: "操作指令配置",
        },
      },
    ]
  }
]

const routes = [
  { path: '*', redirect: '/index/business/template' },
  ...initRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
