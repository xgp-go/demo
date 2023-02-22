<template>
  <div>
    <header style="margin-bottom:15px">
      <el-row type="flex"
              style="margin-bottom:15px">
        <el-col :span="8">
          策略名称：<el-input placeholder="请输入策略名称"
                    size="mini"
                    clearable
                    maxlength="50"
                    class="searchElB"
                    v-model.trim="searchForm.templateName">
          </el-input>
        </el-col>
        <el-col :span="8">
          策略状态： <el-select size="mini"
                     placeholder="请选择"
                     class="searchElM"
                     v-model="searchForm.status">
            <el-option label="开启"
                       :value="1">
            </el-option>
            <el-option label="关闭"
                       :value="0">
            </el-option>
          </el-select>
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
          <el-table-column prop="templateName"
                           label="策略名称">
          </el-table-column>
          <el-table-column prop="type"
                           label="周期类型"
                           width="100"
                           :formatter="fType">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="开始时间">
          </el-table-column>
          <el-table-column prop="endTime"
                           label="结束时间">
          </el-table-column>
          <el-table-column prop="status"
                           label="状态"
                           width="100"
                           :formatter="fStatus">
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
                       @click="handlerPreview(row)">合流</el-link>
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
    <el-dialog width="50%"
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
            <el-form-item label="模板名称："
                          prop="templateName">
              <el-input size="small"
                        placeholder="请输入模板名称"
                        v-model.trim="ruleForm.templateName"
                        style="width:96%"></el-input>
            </el-form-item>
            <el-form-item label="周期类型："
                          prop="status">
              <el-select size="small"
                         placeholder="请选择"
                         class="searchElM"
                         style="width:48%"
                         v-model="searchForm.status">
                <el-option label="日"
                           :value="0">
                </el-option>
                <el-option label="月"
                           :value="1">
                </el-option>
                <el-option label="年"
                           :value="2">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间："
                          prop="createTime">
              <el-date-picker size="small"
                              v-model="ruleForm.createTime"
                              type="date"
                              style="width:48%"
                              placeholder="请选择开始时间"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              :picker-options="cPickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间："
                          prop="endTime">
              <el-date-picker size="small"
                              v-model="ruleForm.endTime"
                              type="date"
                              style="width:48%"
                              placeholder="请选择结束时间"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              :picker-options="ePickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态："
                          prop="status">
              <el-select size="small"
                         placeholder="请选择"
                         class="searchElM"
                         style="width:48%"
                         v-model="searchForm.status">
                <el-option label="开启"
                           :value="1">
                </el-option>
                <el-option label="关闭"
                           :value="0">
                </el-option>
              </el-select>
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
  name: "Task",
  mixins: [publicM],
  data() {
    let that = this
    return {
      searchForm: {},
      tableData: [],
      multipleSelection: [],

      ruleForm: {
        templateName: "",
        type: 1,
        createTime: "",
        endTime: "",
        status: 1,
      },
      rules: {
        templateName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50位中文、英文、数字、字符', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
      },

      dialogVisible: true,
      title: "",
      isRight: false,

      cPickerOptions: {
        disabledDate(time) {
          if (that.ruleForm.endTime) {
            return Date.parse(time) > Date.parse(that.ruleForm.endTime)
          }
          return false;
        }
      },
      ePickerOptions: {
        disabledDate(time) {
          if (that.ruleForm.createTime) {
            return time.getTime() < Date.parse(that.ruleForm.createTime)
          }
          return false;
        }
      }
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
        templateName: "",
        status: 1
      }
    },
    fType(row, column, cellValue) {
      switch (cellValue) {
        case 0:
          return '日';
        case 1:
          return '月';
        default:
          return '年';
      }
    },
    fStatus(row, column, cellValue) {
      switch (cellValue) {
        case 1:
          return '开启';
        default:
          return '关闭';
      }
    },
    async getData() {
      let loading = this.loading()

      this.tableData = [
        {
          id: 1,
          templateName: "策略测试一",
          type: 1,
          createTime: "2022/02/02 12:33:00",
          endTime: "2022/02/03 12:33:00",
          status: 1,
          createBy: "徐高鹏",
          updateBy: "高启强",
          updateTime: "2022/02/02 18:33:00",
        },
        {
          id: 2,
          templateName: "策略测试二",
          type: 1,
          createTime: "2022/09/02 12:33:00",
          endTime: "2022/09/03 12:33:00",
          status: 1,
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
          this.ruleForm.templateName = row["templateName"]
          this.ruleForm.type = row["type"]
          this.ruleForm.createTime = row["createTime"]
          this.ruleForm.endTime = row["endTime"]
          this.ruleForm.status = row["status"]
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
</style>