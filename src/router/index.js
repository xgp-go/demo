import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layouts'

Vue.use(VueRouter)

let initRouter = [
  // 业务管理
  {
    path: '/index/business',
    name: 'business',
    component: Layout,
    // redirect: '/index/business/template',
    children: [
      // 模板信息管理
      {
        path: '/index/business/template',
        name: 'template',
        component: () => import("@/views/business/Template.vue"),
      },
      // 直播管理
      {
        path: '/index/business/live',
        name: 'live',
        component: () => import("@/views/business/Live.vue"),
      },
      // 回看管理
      {
        path: '/index/business/lookback',
        name: 'lookback',
        component: () => import("@/views/business/Lookback.vue"),
      },
      // 媒资信息管理
      {
        path: '/index/business/mediaresources',
        name: 'mediaresources',
        component: () => import("@/views/business/Mediaresources.vue"),
      },
      // 预览播放
      {
        path: '/index/business/preview',
        name: 'preview',
        component: () => import("@/views/business/Preview.vue"),
      },
    ]
  },
  // 策略管理
  {
    path: '/index/strategy',
    name: 'strategy',
    component: Layout,
    children: [
      // 任务调度管理
      {
        path: '/index/strategy/task',
        name: 'task',
        component: () => import("@/views/strategy/Task.vue"),
      },
      // 合流开启
      {
        path: '/index/strategy/open',
        name: 'open',
        component: () => import("@/views/strategy/Open.vue"),
      },
      // 合流关闭
      {
        path: '/index/strategy/close',
        name: 'close',
        component: () => import("@/views/strategy/Close.vue"),
      },
    ]
  },
  // 日志
  {
    path: '/index/log',
    name: 'log',
    component: Layout,
    children: [
      // 任务操作日志
      {
        path: '/index/log/tasklog',
        name: 'tasklog',
        component: () => import("@/views/log/Tasklog.vue"),
      },
      // 指令日志
      {
        path: '/index/log/instructlog',
        name: 'instruct',
        component: () => import("@/views/log/Instructlog.vue"),
      },
      // 直播日志
      {
        path: '/index/log/livelog',
        name: 'livelog',
        component: () => import("@/views/log/Livelog.vue"),
      },
      // 回看日志
      {
        path: '/index/log/lookbacklog',
        name: 'lookbacklog',
        component: () => import("@/views/log/Lookbacklog.vue"),
      },
    ]
  },
  // 配置管理
  {
    path: '/index/setting',
    name: 'setting',
    component: Layout,
    children: [
      // 操作指令配置
      {
        path: '/index/setting/operation',
        name: 'operation',
        component: () => import("@/views/setting/Operation.vue"),
      },
    ]
  }
]

const routes = [
  { path: '*', redirect: '/index/business' },
  ...initRouter
  ,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
