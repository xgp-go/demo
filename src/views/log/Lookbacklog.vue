<template>
  <div>
    <header style="margin-bottom:15px">
      <el-row type="flex"
              style="margin-bottom:15px">
        <el-col :span="5">
          开始时间：<el-date-picker size="mini"
                          class="searchElB"
                          type="date"
                          placeholder="请选择开始时间"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          v-model="searchForm.startTime"
                          :picker-options="cPickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :span="5">
          结束时间：<el-date-picker size="mini"
                          class="searchElB"
                          type="date"
                          placeholder="请选择结束时间"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          v-model="searchForm.endTime"
                          :picker-options="ePickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          内容： <el-input placeholder="请输入内容"
                    size="mini"
                    clearable
                    maxlength="50"
                    class="searchElB"
                    v-model.trim="searchForm.context">
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
    </header>
    <section>
      <article>
        <el-table :data="tableData"
                  size="medium"
                  style="width: 100%"
                  :header-cell-style="{'background-color':'#F8F8F8','color':'#5B6265'}"
                  :cell-style="{'padding':'9px 0','font-size':'13px'}">
          <el-table-column prop="id"
                           label="ID">
          </el-table-column>
          <el-table-column prop="username"
                           label="用户">
          </el-table-column>
          <el-table-column prop="instruct"
                           label="回看合流操作">
          </el-table-column>
          <el-table-column prop="instruct"
                           label="合流信息">
          </el-table-column>
          <el-table-column prop="createBy"
                           label="创建人">
          </el-table-column>
          <el-table-column prop="updateTime"
                           label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-link type="primary"
                       @click="handlerPreview(row)">详情</el-link>
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
  </div>
</template>

<script>
import publicM from "@/mixins/publicM";

export default {
  name: "Lookbacklog",
  mixins: [publicM],
  data() {
    let that = this
    return {
      searchForm: {},
      tableData: [],

      cPickerOptions: {
        disabledDate(time) {
          if (that.searchForm.endTime) {
            return Date.parse(time) > Date.parse(that.searchForm.endTime)
          }
          return false;
        }
      },
      ePickerOptions: {
        disabledDate(time) {
          if (that.searchForm.startTime) {
            return time.getTime() < Date.parse(that.searchForm.startTime)
          }
          return false;
        }
      }
    }
  },
  created() {
    this.initSearchInfo();
  },
  methods: {
    initSearchInfo() {
      this.searchForm = {
        startTime: "",
        endTime: "",
        context: ""
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
      // let { data: { code, data, total } } = await getList({ ...params })
      loading.close();
      // if (code == 200) {
      //   this.tableData = data || []
      //   this.pageObj.total = total || 0
      // }
    },
    // 预览
    async handlerPreview(row) {
      // let { data: { code, data } } = await getChildrenList({
      //   id: row.id
      // })
      // if (code == 200) {
      //   this.dialogVisibles = true
      //   this.moudleInfo = { ...row, childList: data || [] }
      // }
    },
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
</style>