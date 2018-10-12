var pageUrlParams = {};
//if (fw.fwObject.FWObjectHelper.hasValue(pageUrlParams.ticket)) {
//    page.publicTicket = pageUrlParams.ticket;
//}

var colsConfig = [
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: '姓名',
        key: 'name',
        ellipsis: true
    },
    {
        title: '年龄',
        key: 'age',
        ellipsis: true
    },
    {
        title: '性别',
        key: 'sex',
        ellipsis: true
    },
    {
        title: '地址',
        key: 'address',
        ellipsis: true
    },
    {
        title: '电话',
        key: 'phoneNumber',
        ellipsis: true
    },
    {
        title: '操作',
        key: 'action',
        width: 160,
        render: function (h, params) {
             return gridRender(h, params);
        }
    }
];

var gridVue = new Vue({
    el: '#app',
    data: {
        columns: colsConfig,
        gridData: {
            data: [],
            pageSize: 10,
            pageIndex: 1,
            totalPage: null,
            totalRecord: null
        },
        searchParams: {
            keyword: ""
        },
        //表格选中内容
        gridSelection: [],
        isShowLoading: false//是否显示加载框
    },
    created: function () {
        //初始加载 
        this.pageInit();
    },
    methods: {
        pageInit: function () {
            var vm = this;
            if (fw.fwObject.FWObjectHelper.hasValue(pageUrlParams.spCode)) {
                vm.searchParams.spCode = pageUrlParams.spCode;
            };
            this.onSearch();
        },
        onSearch: function () {
            this.gridData.pageIndex = 1; //搜索时初始化翻页
            this.gridload();
        },
        gridload: function () {
            var vm = this;
            vm.gridSelection = [];

            var requestData = {
                userAge: 30
            };
            page.ajax(page.getAjaxSettings({
                serviceType: "defaultCall",
                url: "http://localhost:8081/api/user/getUserByAge",
                data: requestData,
                success: function (resultData) {
                    if (resultData.status != page.FWResultStatus.Success || resultData.data == null) {
                        gridVue.$Message.error('数据获取失败！');
                        return;
                    };
                    var response = resultData.data;
                    gridVue.gridData.data = response.datas;
                    
                    if (response.paging.pageIndex == "0") {
                        gridVue.gridData.pageIndex = gridVue.gridData.pageIndex;
                    } else {
                        gridVue.gridData.pageIndex = response.paging.pageIndex;
                    };
                    gridVue.gridData.totalPage = response.paging.totalPage;
                    gridVue.gridData.totalRecord = response.paging.totalRecord;
                    $.myDoThing.addEllipsisTitleHtml();
                },
                error: function(){
                    console.info(111);
                },
                complete: function () {
                    gridVue.isShowLoading = false;
                }
            }));
            
            
            /*var requestData = {
                    ticket: "437c12069f214d9f8e423e9622ffc38d",
                    queryParams:{
                        typeCode: '02', //废气
                    }
            };
            page.ajax(page.getAjaxSettings({
                serviceType: "defaultCall",
                url: "http://192.168.253.147:8080/mlsc-ecs/service/mobile/consult/getUser",
                data: requestData,
                success: function (resultData) {
                    if (resultData.status != page.FWResultStatus.Success || resultData.data == null) {
                        gridVue.$Message.error('数据获取失败！');
                        return;
                    };
                    var response = resultData.data;
                    gridVue.gridData.data = response.datas;
                    
                },
                error: function(){
                    console.info(111);
                },
                complete: function () {
                    gridVue.isShowLoading = false;
                }
            }));*/
        },
        pageChange: function (pageIndex) {
            var vm = this;
            vm.gridData.pageIndex = pageIndex;
            vm.gridload();
        },
        pageSizeChange: function (pageSize) {
            var vm = this;
            vm.gridData.pageSize = pageSize;
            vm.gridload();
        },
        onSelectionChange: function (selection) {
            var vm = this;
            vm.gridSelection = selection;
        },
        addOrEdit: function (action) {
            Edit(action);
        },
        del: function () {
            var vm = this;
            var deleteManufactureFacility = gridVue.gridSelection;
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确定删除选择的数据吗！</p>',
                okText: '确定',
                cancelText: '取消',
                onOk: function () {
                    page.ajax(page.getAjaxSettings({
                        serviceType: "crossDomainCall",
                        serviceName: "spsDeclare/manufactureFacility",
                        methodName: "deleteManufactureFacility",
                        data: {
                            ticket: page.publicTicket,
                            manufactureFacilityList: deleteManufactureFacility
                        },
                        success: function (resultData) {
                            if (resultData.status != page.FWResultStatus.Success) {
                                vm.$Message.error('数据加载异常！');
                                return;
                            };
                            vm.$Notice.success({ title: '删除成功', desc: '提示' });
                            vm.onSearch();
                        }
                    }));
                }
            });
        },
        downloadTemplate: function(){//下载模板
            window.open(page.webSiteRootUrl + "files/生产设施数据模板.xlsx");
        },
        importData: function (name) {//导入数据
            var vm = this;
            var data = {
                ticket: page.publicTicket,
                spCode: pageUrlParams.spCode,
                closeWindowCallback: "onCloseWindowCallback"  //关闭回调
            };
            var pageUrl = page.UrlHelper.addParams(page.UrlHelper.getAbsoluteUrl("web/spsDeclare/manufactureFacility/uploadFile.htm", page.webSiteRootUrl), data);
            var configs = {
                url: pageUrl,
                type: 'page',
                title: "生产设施数据导入",
                width: "60%",
                height: "60%"
            };
            page.pageOpen(configs);
        }
    }
});

//单元格渲染事件
function gridRender(h, params) {
    var html = "";
    var column = params.column,
       row = params.row,
       index = params.index;
    switch (column.key) {
        case "action":
           // html = "<a href=\"javascript:Edit('view'," + index + ")\"><i-button type=\"primary\">详细</i-button></a>";
            return h('div', [
                  h('i-button', {
                      props: {
                          type: 'primary'
                      },
                      on: {
                          click: function () {
                              Edit('view', index);
                          }
                      }
                  }, '详细')
            ])
            break;
        default:
            break;
    };
    return html;
};

function Edit(action, index) {
    var data = {
        ticket: page.publicTicket
        , action: action
        , spCode: pageUrlParams.spCode
    };
    data.closeWindowCallback = "onCloseWindowCallback";   //关闭回调

    if (action == "edit") {
        if (gridVue.gridSelection.length < 1) {
            vm.$Message.error('请选择一条数据！');
            return;
        };
        data.facilityID = gridVue.gridSelection[0].facilityID;
    };
    if (action == "view") {
        var row = gridVue.gridData.data[index];
        data.facilityID = row.facilityID;
    };
    var pageUrl = page.UrlHelper.addParams(page.UrlHelper.getAbsoluteUrl("web/spsDeclare/manufactureFacility/manufactureFacility.htm", page.webSiteRootUrl), data);
    var pageConfig = {};
    pageConfig.pageUrl = pageUrl;
    pageConfig.type = "page";
    pageConfig.title = fw.fwObject.FWObjectHelper.hasValue(pageUrlParams.menuName) ? pageUrlParams.menuName : "生产设施";
    pageConfig.width = "80%";
    pageConfig.height = "75%";
    $.myDoThing.openViewDetail(pageConfig);
}; 
function onCloseWindowCallback() {
    gridVue.gridSelection = [];
    gridVue.onSearch();
};
