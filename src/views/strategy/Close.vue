<template>
  <div>
    <header style="margin-bottom:15px">
      <el-row type="flex"
              style="margin-bottom:15px">
        <el-col :span="8">
          合流名称：<el-input placeholder="请输入合流名称"
                    size="mini"
                    clearable
                    maxlength="50"
                    class="searchElB"
                    v-model.trim="searchForm.tName">
          </el-input>
        </el-col>
        <el-col :span="8">
          类型： <el-select size="mini"
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
                     size="mini">关闭选中</el-button>
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
                           label="合流名称">
          </el-table-column>
          <el-table-column prop="date"
                           label="类型">
          </el-table-column>
          <el-table-column prop="date"
                           label="周期">
          </el-table-column>
          <el-table-column prop="date"
                           label="开始时间">
          </el-table-column>
          <el-table-column prop="name"
                           label="结束时间">
          </el-table-column>
          <el-table-column prop="address"
                           label="创建人">
          </el-table-column>
          <el-table-column prop="address"
                           label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scoped">
              <el-link type="primary">详情</el-link>
              <el-link type="primary">开启</el-link>
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
  name: "Close",
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