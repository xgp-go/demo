import apiBaseAxios from "@/utils/request";

// 创建模板
export function createTempalte(data) {
    return apiBaseAxios({
        url: '/business/createTemplate',
        method: 'post',
        data,
    })
}

// 查询模板
export function getList(data) {
    return apiBaseAxios({
        url: '/template/getList',
        method: 'post',
        data,
    })
}

// 获取子模板数据
export function getChildrenList(data) {
    return apiBaseAxios({
        url: '/templateChild/getList',
        method: 'post',
        data,
    })
}
