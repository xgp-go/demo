<template>
  <div id="root">
    <el-container class="elContainer">
      <el-header class="elHeader">
        <el-row type="flex"
                justify="space-between"
                class="elRow">
          <el-col style="width:200px;text-align:center">
            <h3 style="color:#fff;margin:initial">集流同传平台</h3>
          </el-col>
          <el-col style="width:200px;text-align:center">---</el-col>
        </el-row>
      </el-header>
      <el-container class="elContainer">
        <el-aside width="200px"
                  class="elAside">
          <!-- 导航start -->
          <el-menu class="elMenu"
                   :router="true"
                   :unique-opened="true"
                   background-color="#3a4966"
                   text-color="#E8E8E8"
                   active-text-color="#4095E5">
            <!-- 业务管理 -->
            <el-submenu index="business/template">
              <template slot="title">
                <i class="el-icon-house"></i>
                <span>业务管理</span>
              </template>
              <el-menu-item index="template">
                <span slot="title">模板信息管理</span>
              </el-menu-item>
              <el-menu-item index="live">
                <span slot="title">直播管理</span>
              </el-menu-item>
              <el-menu-item index="lookback">
                <span slot="title">回看管理</span>
              </el-menu-item>
              <el-menu-item index="mediaresources">
                <span slot="title">媒资信息管理</span>
              </el-menu-item>
              <el-menu-item index="preview">
                <span slot="title">预览播放</span>
              </el-menu-item>
            </el-submenu>
            <!-- 策略管理 -->
            <el-submenu index="strategy/task">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>策略管理</span>
              </template>
              <el-menu-item index="strategy/task">
                <span slot="title">任务调度管理</span>
              </el-menu-item>
              <el-menu-item index="strategy/open">
                <span slot="title">合流开启</span>
              </el-menu-item>
              <el-menu-item index="strategy/close">
                <span slot="title">合流关闭</span>
              </el-menu-item>
            </el-submenu>
            <!-- 日志 -->
            <el-submenu index="log/tasklog">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>日志管理</span>
              </template>
              <el-menu-item index="log/tasklog">
                <span slot="title">任务操作日志</span>
              </el-menu-item>
              <el-menu-item index="log/instruct">
                <span slot="title">指令日志</span>
              </el-menu-item>
              <el-menu-item index="log/livelog">
                <span slot="title">直播日志</span>
              </el-menu-item>
              <el-menu-item index="log/lookbacklog">
                <span slot="title">回看日志</span>
              </el-menu-item>
            </el-submenu>
            <!-- 配置管理 -->
            <el-submenu index="setting/operation">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>配置管理</span>
              </template>
              <el-menu-item index="setting/operation">
                <span slot="title">操作指令配置</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- 导航end -->
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
  methods: {
  }
}
</script>

<style lang="less" scoped>
.elContainer,
.elRow {
  height: 100%;
}

.elHeader {
  padding: initial;
  background-color: #333333;
  .elRow {
    align-items: center;
  }
}

.elAside {
  overflow: hidden;
  background-color: #3a4966;
  .elMenu {
    height: 100%;
    overflow-y: auto;
    border-right: initial;
  }
}
</style>