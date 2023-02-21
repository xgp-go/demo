<template>
  <div>
    <header style="margin-bottom:15px">
      <el-row type="flex"
              style="margin-bottom:15px">
        <el-col :span="8">
          模板名称：<el-input placeholder="请输入模板名称"
                    size="mini"
                    clearable
                    maxlength="50"
                    class="searchElB"
                    v-model.trim="searchForm.templateName">
          </el-input>
        </el-col>
        <el-col :span="8">
          模板状态： <el-select size="mini"
                     placeholder="请选择"
                     class="searchElM"
                     v-model="searchForm.status">
            <el-option label="可使用"
                       :value="1">
            </el-option>
            <el-option label="禁用"
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
          <el-button type="primary"
                     size="mini"
                     @click="openDialog">新增</el-button>
        </el-col>
      </el-row>
    </header>
    <section>
      <article>
        <el-table :data="tableData"
                  size="medium"
                  style="width: 100%"
                  :header-cell-style="{'background-color':'#F8F8F8','color':'#5B6265'}"
                  :cell-style="{'padding':'9px 0','font-size':'13px'}">
          <el-table-column prop="templateName"
                           label="名称">
          </el-table-column>
          <el-table-column prop="childNumber"
                           label="模板数量">
          </el-table-column>
          <el-table-column prop="status"
                           label="状态"
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
          <el-table-column label="模板布局">
            <template v-slot="{row}">
              <el-link type="primary"
                       @click="handlerPreview(row)">预览</el-link>
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

    <!-- 新增 -->
    <el-dialog width="80%"
               top="10vh"
               title="新增"
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
                        v-model.trim="ruleForm.templateName"></el-input>
            </el-form-item>
            <el-form-item label="宽："
                          prop="width">
              <el-input size="small"
                        placeholder="宽"
                        v-model.trim="ruleForm.width"></el-input>
            </el-form-item>

            <el-form-item label="高："
                          prop="height">
              <el-input size="small"
                        placeholder="高"
                        v-model.trim="ruleForm.height"></el-input>
            </el-form-item>

            <!-- 子模版模板参数 start -->
            <el-form-item label="模板数量："
                          prop="childNumber">
              <el-select size="small"
                         v-model="ruleForm.childNumber"
                         placeholder="请选择"
                         style="width:50%"
                         @change="tSizeChange">
                <el-option v-for="item in 9"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <div style="max-height:255px;overflow:auto;padding-right:5px">
              <template v-for="item,index in ruleForm.childList">
                <el-form-item :key="index"
                              :label="`设备${index+1}：`"
                              :rules="{required: true}">
                  <el-row type="flex"
                          justify="space-between">
                    <el-col :span="5">
                      <el-form-item :prop="'childList.'+index+'.width'"
                                    hide-required-asterisk
                                    :rules="{required: true, message: '宽度不能为空', trigger: 'blur'}">
                        <el-input size="small"
                                  placeholder="宽度"
                                  v-model="item.width"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item :prop="'childList.'+index+'.height'"
                                    hide-required-asterisk
                                    :rules="{required: true, message: '高度不能为空', trigger: 'blur'}">
                        <el-input size="small"
                                  placeholder="高度"
                                  v-model="item.height"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item :prop="'childList.'+index+'.startX'"
                                    hide-required-asterisk
                                    :rules="{required: true, message: 'X轴不能为空', trigger: 'blur'}">
                        <el-input size="small"
                                  placeholder="X轴"
                                  v-model="item.startX"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5"
                            style="text-align:right">
                      <el-form-item :prop="'childList.'+index+'.startY'"
                                    hide-required-asterisk
                                    :rules="{required: true, message: 'Y轴不能为空', trigger: 'blur'}">
                        <el-input size="small"
                                  placeholder="Y轴"
                                  v-model="item.startY"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </template>
            </div>
            <!-- 模板参数 end -->

            <el-form-item label="模板状态："
                          prop="status">
              <el-select size="small"
                         style="width:50%"
                         placeholder="请选择"
                         v-model="ruleForm.status">
                <el-option label="可使用"
                           :value="1">
                </el-option>
                <el-option label="禁用"
                           :value="0">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="view"
             ref="view">
          <template v-for="item in ruleForm.childList">
            <div :key="item.number"
                 :style="[!(item.height&&item.width)?minStyle:{
                  'width':`${item.width*rateW}px`,
                  'height':`${item.height*rateH}px`,
                  'left':`${item.startX*rateW||0}px`,
                  'top':`${item.startY*rateH||0}px`
                 }]">
              {{`${item.number}号设备`}}
            </div>
          </template>
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

    <!-- 预览 -->
    <el-dialog width="80%"
               top="10vh"
               :title="`${moudleInfo.templateName}（预览）`"
               :visible.sync="dialogVisibles">
      <div class="DialogBody">
        <div class="view"
             ref="view"
             :style="{'width':`${moudleInfo.width}px`,'height':`${moudleInfo.height}px`}">
          <template v-for="item in moudleInfo.childList">
            <div :key="item.number"
                 :style="{
                  'width':`${item.width}px`,
                  'height':`${item.height}px`,
                  'left':`${item.startX||0}px`,
                  'top':`${item.startY||0}px`
                 }">
              {{`${item.number}号设备`}}
            </div>
          </template>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisibles=false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createTempalte, getList, getChildrenList } from "@/api/template";

import publicM from "@/mixins/publicM";

export default {
  name: "Template",
  mixins: [publicM],
  data() {
    return {
      searchForm: {},
      tableData: [],
      ruleForm: {
        templateName: "",
        width: undefined,
        height: undefined,
        childNumber: 1,
        childList: [
          {
            number: 1,
            width: undefined,
            height: undefined,
            startX: undefined,
            startY: undefined
          }
        ],
        status: 1,
      },
      rules: {
        templateName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50位中文、英文、数字、字符', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请输入模板宽', trigger: 'blur' },
        ],
        height: [
          { required: true, message: '请输入模板高', trigger: 'blur' },
        ],
      },

      dialogVisible: false,
      isRight: false,

      dialogVisibles: false,
      moudleInfo: {},
      minStyle: {
        'min-width': '72px',
        'min-height': '43px',
      },
    }
  },
  watch: {
    "ruleForm.height": {
      handler(newValue) {
        this.$nextTick(() => {
          let viewH = this.$refs.view.clientHeight
          this.rateH = newValue ? Math.round((viewH / newValue) * 100) / 100 : 1
        })
      }
    },
    "ruleForm.width": {
      handler(newValue) {
        this.$nextTick(() => {
          let viewW = this.$refs.view.clientWidth
          this.rateW = newValue ? Math.round((viewW / newValue) * 100) / 100 : 1
        })
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
    fStatus(row, column, cellValue) {
      switch (cellValue) {
        case 1:
          return '可使用';
        default:
          return '禁用';
      }
    },
    async getData() {
      let loading = this.loading()
      let params = {
        ...this.searchForm,
        index: (this.pageObj.currentPage - 1) * this.pageObj.pageSize,
        size: this.pageObj.pageSize
      }
      let { data: { code, data, total } } = await getList({ ...params })
      loading.close();
      if (code == 200) {
        this.tableData = data || []
        this.pageObj.total = total || 0
      }
    },
    // 预览
    async handlerPreview(row) {
      let { data: { code, data } } = await getChildrenList({
        id: row.id
      })
      if (code == 200) {
        this.dialogVisibles = true
        this.moudleInfo = { ...row, childList: data || [] }
      }
    },
    // 模板数量对模板的增删
    tSizeChange(val) {
      const leng = this.ruleForm.childList.length
      if (val < leng) {
        this.ruleForm.childList = [...this.ruleForm.childList.slice(0, val)]
      } else if (val > leng) {
        for (let i = leng; i < val; i++) {
          this.ruleForm.childList.push({
            number: i + 1,
            width: undefined,
            height: undefined,
            startX: undefined,
            startY: undefined
          })
        }
      } else return false
    },
    openDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
        this.tSizeChange(1)
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    handlerRight() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          this.isRight = true
          let { data: { code, message } } = await createTempalte({ ...this.ruleForm })
          this.isRight = false
          if (code == 200) {
            this.handleClose()
            this.handleCurrentChange(1)

            this.$notify({
              message: message,
              type: 'success'
            });
          }
        } else return false;
      });
    }
  },
}
</script>

<style lang="less" scoped>
.searchElB {
  width: 70%;
}
.searchElM {
  width: 40%;
}

.DialogBody {
  display: flex;
  .form,
  .view {
    flex: 1 1;
  }

  .form {
    margin-right: 10px;
  }

  .view {
    background-color: #cecece;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    & > div {
      user-select: none;
      box-sizing: border-box;
      border: 1px double;
      position: absolute;
      background-color: #e8e8e8;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 10px;
      overflow: hidden;
    }
  }
}
</style>