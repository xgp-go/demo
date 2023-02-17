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
        // 重置
        rest() {
            this.initSearchInfo()
            this.handleCurrentChange(1)
        },
        // 分页
        handleCurrentChange(val) {
            this.pageObj.currentPage = val
            const loading = this.$loading({
                lock: true,
                text: '数据加载中……',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)'
            });
            this.getData()
            loading.close()
        }
    },
}