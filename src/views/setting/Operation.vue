<template>
  <div>
    <header style="margin-bottom:15px">
      <el-row type="flex"
              style="margin-bottom:15px">
        <el-col :span="7">
          指令编码：<el-input placeholder="请输入指令编码"
                    size="mini"
                    clearable
                    maxlength="50"
                    class="searchElB"
                    v-model.trim="searchForm.settingName">
          </el-input>
        </el-col>
        <el-col :span="7">
          指令名称：<el-input placeholder="请输入指令名称"
                    size="mini"
                    clearable
                    maxlength="50"
                    class="searchElB"
                    v-model.trim="searchForm.settingCode">
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex"
              style="margin-bottom:15px;text-align:center"
              justify="center">
        <el-col :span="8">
          <el-button type="primary"
                     size="mini"
                     @click="handleCurrentChange(1)">搜索</el-button>
          <el-button size="mini"
                     @click="rest">重置</el-button>
        </el-col>
      </el-row>
      <el-row type="flex"
              style="text-align:right"
              justify="end">
        <el-col :span="8">
          <el-button type="danger"
                     size="mini"
                     :disabled="!multipleSelection.length"
                     @click="deleteSelects(multipleSelection)">删除选中</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="openDialog('新增')">新增</el-button>
        </el-col>
      </el-row>
    </header>
    <section>
      <article>
        <el-table :data="tableData"
                  ref="multipleTable"
                  size="medium"
                  style="width: 100%"
                  :header-cell-style="{'background-color':'#F8F8F8','color':'#5B6265'}"
                  :cell-style="{'padding':'9px 0','font-size':'13px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"
                           align="center">
          </el-table-column>
          <el-table-column prop="settingName"
                           label="指令编码">
          </el-table-column>
          <el-table-column prop="settingCode"
                           label="指令名称">
          </el-table-column>
          <el-table-column prop="description"
                           label="描述">
          </el-table-column>
          <el-table-column prop="createBy"
                           label="创建人">
          </el-table-column>
          <el-table-column prop="updateBy"
                           label="更新人">
          </el-table-column>
          <el-table-column prop="updateTime"
                           label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-link type="primary"
                       @click="openDialog('修改',row)">修改</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="danger"
                       @click="deleteSelects([row])">删除</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="success"
                       @click="handlerInterflow(row)">合流</el-link>
            </template>
          </el-table-column>
        </el-table>
      </article>
      <footer style="text-align:right;margin-top:10px">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page.sync="pageObj.currentPage"
                       :page-size="pageObj.pageSize"
                       :total="pageObj.total"
                       layout="total, prev, pager, next">
        </el-pagination>
      </footer>
    </section>

    <!-- 新增、修改 -->
    <el-dialog class="elDialog"
               width="50%"
               top="10vh"
               :title="title"
               :close-on-click-modal="false"
               :visible.sync="dialogVisible"
               :before-close="handleClose">
      <div class="DialogBody">
        <div class="form">
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   label-width="110px"
                   class="demo-ruleForm">
            <el-form-item label="指令编码："
                          prop="settingCode">
              <el-input size="small"
                        placeholder="请输入指令编码"
                        v-model.trim="ruleForm.settingCode"
                        style="width:96%"></el-input>
            </el-form-item>
            <el-form-item label="指令名称："
                          prop="settingName">
              <el-input size="small"
                        placeholder="请输入指令名称"
                        v-model.trim="ruleForm.settingName"
                        style="width:96%"></el-input>
            </el-form-item>
            <el-form-item label="内容："
                          prop="description">
              <el-input size="small"
                        type="textarea"
                        :autosize="{ minRows: 4}"
                        placeholder="请输入内容"
                        v-model.trim="ruleForm.description"
                        style="width:96%"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   :loading="isRight"
                   @click="handleClose">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="isRight"
                   @click="handlerRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import publicM from "@/mixins/publicM";

export default {
  name: "Operation",
  mixins: [publicM],
  data() {
    let that = this
    return {
      searchForm: {},
      tableData: [],
      multipleSelection: [],

      ruleForm: {
        settingCode: "",
        settingName: "",
        description: ""
      },
      rules: {
        settingCode: [
          { required: true, message: '请输入指令编码', trigger: 'blur' }
        ],
        settingName: [
          { required: true, message: '请输入指令名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
      },

      dialogVisible: false,
      title: "",
      isRight: false,
    }
  },
  created() {
    this.initSearchInfo();
  },
  mounted() {
    this.getData()
  },
  methods: {
    initSearchInfo() {
      this.searchForm = {
        settingName: "",
        settingCode: ""
      }
    },
    async getData() {
      let loading = this.loading()

      this.tableData = [
        {
          id: 1,
          settingName: "指令1",
          settingCode: "zl1",
          description: "11111111111111111111",
          createBy: "徐高鹏",
          updateBy: "高启强",
          updateTime: "2022/02/02 18:33:00",
        },
        {
          id: 2,
          settingName: "指令2",
          settingCode: "zl2",
          description: "222222222222222222222",
          createBy: "安欣",
          updateBy: "高启盛",
          updateTime: "2022/02/02 18:33:00",
        }
      ]

      // let params = {
      //   ...this.searchForm,
      //   index: (this.pageObj.currentPage - 1) * this.pageObj.pageSize,
      //   size: this.pageObj.pageSize
      // }
      // let { data: { code, data, total } } = await getList({ ...params })
      loading.close();
      // if (code == 200) {
      //   this.tableData = data || []
      //   this.pageObj.total = total || 0
      // }
    },
    // 删除选中
    deleteSelects(multipleSelection) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let idArr = multipleSelection.map(item => item.id)
        console.log(multipleSelection, idArr);
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
        this.$refs.multipleTable.clearSelection();
      }).catch(() => false)
    },
    // 复选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    openDialog(title, row) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.title = title
        this.$refs["ruleForm"].resetFields();
        if (title === "修改") {
          // 回显
          this.ruleForm.settingCode = row["settingCode"]
          this.ruleForm.settingName = row["settingName"]
          this.ruleForm.description = row["description"]
          this.$set(this.ruleForm, "id", row.id)
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.$delete(this.ruleForm, "id")
    },
    handlerRight() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let username = localStorage.getItem("username")
          this.isRight = true
          let parmas = {
            ...this.ruleForm,
          }
          if (this.title === '新增') {
            parmas.createBy = username
          } else if (this.title === '修改') {
            parmas.updateBy = username
          }
          console.log(parmas);
          // let { data: { code, message } } = await createTempalte({ ...parmas })
          this.isRight = false
          // if (code == 200) {
          //   this.handleClose()
          //   this.handleCurrentChange(1)

          //   this.$notify({
          //     message: message,
          //     type: 'success'
          //   });
          // }
        } else return false;
      });
    },
    handlerInterflow(row) {
      //   this.$router.push({ name: "taskEdit", params: { id: row.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.searchElB {
  width: 70%;
}
.searchElM {
  width: 40%;
}
.elDialog ::v-deep .el-dialog__body {
  border-top: 1.5px solid rgba(26, 26, 26, 0.6);
  border-bottom: 1.5px solid rgba(26, 26, 26, 0.6);
}
</style>