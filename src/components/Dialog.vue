<template>
  <div>
    <el-dialog :width="width"
               :top="top"
               :title="title"
               :visible.sync="dialogVisible"
               :before-close="handleClose">
      <slot></slot>
      <span slot="footer"
            class="dialog-footer"
            v-if="ifFooter">
        <el-button size="small"
                   @click="handleClose">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="handlerRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    ifFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "60%"
    },
    top: {
      type: String,
      default: "10vh"
    },
    title: {
      type: String,
      default: "操作"
    },
  },
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose() {
      console.log("关闭");
    },
    handlerRight() {
    }
  }
}
</script>

<style lang="less" scoped>
</style>