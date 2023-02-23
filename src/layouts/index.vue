<template>
  <div id="root">
    <el-container class="elContainer">
      <el-header class="elHeader">
        <el-row type="flex"
                justify="space-between"
                class="elRow">
          <el-col style="width: 200px; text-align: center; cursor: pointer"
                  @click.native="go">
            <h3 style="color: #fff; margin: initial">集流同传平台</h3>
          </el-col>
          <el-col style="width: 200px; text-align: center">---</el-col>
        </el-row>
      </el-header>
      <el-container class="elContainers">
        <el-aside width="200px"
                  class="elAside">
          <!-- 导航start -->
          <el-menu class="elMenu"
                   background-color="#3a4966"
                   text-color="#E8E8E8"
                   active-text-color="#4095E5"
                   :unique-opened="true"
                   :default-active="defaultActive"
                   @select="handleSelect">
            <template v-for="item in router">
              <el-submenu :index="item.name"
                          :key="item.name"
                          v-if="item.children && item.children.length > 0">
                <template slot="title">
                  <i :class="item.mate.icon"></i>
                  <span>{{ item.mate.title }}</span>
                </template>
                <template v-for="items in item.children">
                  <el-menu-item :index="items.name"
                                :key="items.name"
                                v-if="!items.mate.isConceal">
                    <span slot="title">{{ items.mate.title }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>

              <el-menu-item :index="item.name"
                            :key="item.name"
                            v-else>
                <template slot="title">
                  <i :class="item.mate.icon"></i>
                  <span>{{ item.mate.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
          <!-- 导航end -->
        </el-aside>
        <el-main class="elMain">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { initRouter } from "@/router";

export default {
  name: "Layout",
  data() {
    return {
      defaultActive: "",
      router: initRouter,
    };
  },
  methods: {
    go() {
      this.$router.push({ path: "/" });
      this.defaultActive = this.$route.name;
    },
    handleSelect(key) {
      if (key !== this.$route.name) {
        this.$router.push({ name: key });
        this.defaultActive = key;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.defaultActive = to.name;
    });
  },
};
</script>

<style lang="less" scoped>
.elContainer,
.elRow {
  height: 100%;
}

.elContainers {
  overflow: hidden;
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
    &::v-deep .is-active {
      background-color: rgba(230, 247, 255, 0.9) !important;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        display: inline-block;
        width: 6px;
        height: 50px;
        background-color: #4095e5;
      }
    }
  }
}

.elMain {
  background-color: #f7f6f4;
  padding: 10px;
  & > div {
    min-height: 100%;
    box-sizing: border-box;
    padding: 20px 10px 10px;
    border-radius: 5px;
    background-color: #fff;
  }
}
</style>
