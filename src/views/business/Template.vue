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
                    v-model.trim="searchForm.tName">
          </el-input>
        </el-col>
        <el-col :span="8">
          模板状态： <el-select size="mini"
                     placeholder="请选择"
                     class="searchElM"
                     v-model="searchForm.tType">
            <el-option label="可使用"
                       value="Y">
            </el-option>
            <el-option label="禁用"
                       value="N">
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
                     size="mini">新增</el-button>
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
          <el-table-column prop="date"
                           label="名称">
          </el-table-column>
          <el-table-column prop="name"
                           label="模板数量">
          </el-table-column>
          <el-table-column prop="address"
                           label="状态">
          </el-table-column>
          <el-table-column prop="address"
                           label="创建人">
          </el-table-column>
          <el-table-column prop="address"
                           label="更新人">
          </el-table-column>
          <el-table-column prop="address"
                           label="更新时间">
          </el-table-column>
          <el-table-column label="模板布局">
            <template v-slot="scoped">
              <el-link type="primary">预览</el-link>
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

    <Dialog :width="'80%'">
      <template>
        <div class="DialogBody">
          <div class="form">
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="模板名称："
                            prop="tName">
                <el-input size="small"
                          placeholder="请输入模板名称"
                          v-model.trim="ruleForm.tName"
                          style="width:90%"></el-input>
              </el-form-item>
              <el-form-item label="模板数量："
                            prop="tSize">
                <el-select size="small"
                           v-model="ruleForm.tSize"
                           placeholder="请选择"
                           style="width:90%"
                           @change="tSizeChange">
                  <el-option v-for="item in 9"
                             :key="item"
                             :label="item"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 模板参数 start -->
              <div style="max-height:255px;overflow:auto">
                <template v-for="item,index in ruleForm.childrenList">
                  <el-form-item :key="index"
                                :label="`模板${index}参数：`">
                    <el-row type="flex"
                            style="width:90%">
                      <el-col>
                        <el-form-item :prop="`${ruleForm.childrenList[index].width}`"
                                      :rules="{
      required: true, message: '宽度不能为空', trigger: 'blur'
    }">
                          <el-input size="small"
                                    placeholder="宽度"
                                    style="width:90%"
                                    v-model="item.width"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item :prop="`${ruleForm.childrenList[index].height}`"
                                      :rules="{
      required: true, message: '高度不能为空', trigger: 'blur'
    }">
                          <el-input size="small"
                                    placeholder="高度"
                                    style="width:90%"
                                    v-model="item.height"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item :prop="`${ruleForm.childrenList[index].x}`"
                                      :rules="{
      required: true, message: 'X轴不能为空', trigger: 'blur'
    }">
                          <el-input size="small"
                                    placeholder="X轴"
                                    style="width:90%"
                                    v-model="item.x"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col style="text-align:right">
                        <el-form-item :prop="`${ruleForm.childrenList[index].y}`"
                                      :rules="{
      required: true, message: 'Y轴不能为空', trigger: 'blur'
    }">
                          <el-input size="small"
                                    placeholder="Y轴"
                                    style="width:90%"
                                    v-model="item.y"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </template>
              </div>
              <!-- 模板参数 end -->
              <el-form-item label="模板状态："
                            prop="tType">
                <el-select size="small"
                           v-model="ruleForm.tType"
                           placeholder="请选择"
                           style="width:90%">
                  <el-option label="可使用"
                             value="Y">
                  </el-option>
                  <el-option label="禁用"
                             value="N">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="view"></div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";

import publicM from "@/mixins/publicM";

export default {
  name: "Template",
  components: {
    Dialog,
  },
  mixins: [publicM],
  data() {
    return {
      searchForm: {},
      tableData: [],
      ruleForm: {
        tName: "",
        tSize: 1,
        tType: "Y",
        childrenList: [
          {
            width: "",
            height: "",
            x: "",
            y: ""
          }
        ]
      },
      rules: {
        tName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50位中文、英文、数字、字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.initSearchInfo();
  },
  methods: {
    initSearchInfo() {
      this.searchForm = {
        tName: "",
        tType: "Y"
      }
    },
    getData() {
      console.log("获取数据");
    },
    // 模板数量对模板的增删
    tSizeChange(val) {
      const leng = this.ruleForm.childrenList.length
      if (val < leng) {
        this.ruleForm.childrenList = [...this.ruleForm.childrenList.slice(0, val)]
      } else if (val > leng) {
        for (let i = 0; i < val - leng; i++) {
          this.ruleForm.childrenList.push({
            width: "",
            height: "",
            x: "",
            y: ""
          })
        }
      } else return false
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
    width: 50%;
  }
}
</style>