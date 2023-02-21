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
                     @click="">删除选中</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="">新增</el-button>
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
                           label="策略名称">
          </el-table-column>
          <el-table-column prop="childNumber"
                           label="周期类型">
          </el-table-column>
          <el-table-column prop="createBy"
                           label="开始时间">
          </el-table-column>
          <el-table-column prop="createBy"
                           label="结束时间">
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
          <el-table-column label="操作">
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
  </div>
</template>

<script>
import publicM from "@/mixins/publicM";

export default {
  name: "Task",
  mixins: [publicM],
  data() {
    return {
      searchForm: {},
      tableData: [],
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
          return '开启';
        default:
          return '关闭';
      }
    },
    async getData() {
      let loading = this.loading()
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