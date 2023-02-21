export default {
    data() {
        return {
            pageObj: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        loading(text = "数据加载中……", spinner = "el-icon-loading", background = "rgba(0, 0, 0, 0.7)") {
            return this.$loading({
                lock: true,
                text,
                spinner,
                background
            })
        },
        // 重置
        rest() {
            this.initSearchInfo()
            this.handleCurrentChange(1)
        },
        // 分页
        handleCurrentChange(val) {
            this.pageObj.currentPage = val
            this.getData()
        }
    },
}