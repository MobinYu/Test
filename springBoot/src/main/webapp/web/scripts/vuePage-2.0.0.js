var pageMix = {
    data: function () {
        return {
            ticket: pageCustomer.publicTicket,
            params: {},
            _pageHelper: {},
            webSiteRootUrl: '',
            frontSiteRootUrl: pageCustomer.frontSiteRootUrl,
            serviceSiteRootUrl: pageCustomer.serviceSiteRootUrl,
            loginOutUrl: pageCustomer.loginOutUrl,
            spsServiceSiteRootUrl: pageCustomer.spsServiceSiteRootUrl,
            initSettings: null,
            initInfo: null,
            fileServer: pageCustomer.fileServer,
            ResultStatusEnum: {
                LOGIN_OUT: -1,
                FAILURE: 0,
                SUCCESS: 1,
                FREQUENTLY: 2
            }
        };
    },
    beforeCreate: function () {
        var sysPageHelper = new sys.PageHelper();
        this._pageHelper = sysPageHelper;

    },
    created: function () {
        if (!fw.core.util.ObjectUtils.hasValue(this.webSiteRootUrl)) {
            this.webSiteRootUrl = window.webSiteRootUrl;
        }
        if (!fw.core.util.ObjectUtils.hasValue(this.serviceSiteRootUrl)) {
            this.serviceSiteRootUrl = this.webSiteRootUrl;
        }
        this._pageHelper.setWebSiteRootUrl(this.webSiteRootUrl);
        this._pageHelper.setServiceSiteRootUrl(this.serviceSiteRootUrl);
        var params = fw.core.util.UrlUtils.getParams();
        this.params = params;
        if (fw.core.util.ObjectUtils.hasValue(params.ticket)) {
            this.ticket = params.ticket;

        }
    },
    mounted: function () {
        var vm = this;
        if (!window.isVuePageMounted) {
            this._pageHelper.init(function (initSettings, initInfo) {
                vm.initSettings = initSettings;
                vm.initInfo = initInfo;
            });
            window.isVuePageMounted = true
        }
    },
    methods: {
        setInitSettings: function (initSettings) {
            this._pageHelper.setInitSettings(initSettings);
        },
        ajax: function (settings) {
            this._pageHelper.ajax(settings);
        },
        goLogin() {
            window.top.open(this.loginOutUrl, "_self");
        },
        getClientHost() {
            var curWwwPath = window.document.location.href;
            var pathname = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathname);
            var localhostPath = curWwwPath.substring(0, pos);
            var projectName = pathname.substring(0, pathname.substr(1).indexOf('/') + 1);
            if (projectName.length > 1 && fw.core.Utils.lodash.startsWith(projectName, "/shencai")) {
                return localhostPath + projectName;
            } else {
                return localhostPath;
            }
        },
        //将后台返回的code，name转换成iview需要的lable和value
        dealTree(tree) {
            var vm = this;
            if (fw.core.Utils.lodash.isArray(tree)) {
                fw.core.Utils.lodash.forEach(tree, function (obj) {
                    return vm.dealNode(obj);
                });
            } else {
                return vm.dealNode(tree);
            }
        },
        dealNode(node) {
            var vm = this;
            if (fw.core.Utils.lodash.isArray(node)) {
                fw.core.Utils.lodash.forEach(node, function (obj) {
                    obj[""] =
                        vm.dealNode(obj);
                });
            } else {
                node["value"] = node["code"];
                node["label"] = node["name"];
                delete node["code"];
                delete node["name"];
                if (fw.core.util.ObjectUtils.hasValue(node.children)) {
                    fw.core.Utils.lodash.forEach(node.children, function (obj) {
                        vm.dealNode(obj);
                    });
                }
                return node;
            }
        },
        getSettingsDictionary: function (owner, vueModel, config) {
            if (!fw.core.util.ObjectUtils.hasValue(config) || !fw.core.util.ObjectUtils.hasValue(config.code)) {
                owner.$Message.error('字典编码异常！');
            }
            var vm = this;
            var requestData = {
                ticket: vm.ticket,
                prodId: vm.prodId,
                dictCode: config.code
            };
            if (fw.core.util.ObjectUtils.hasValue(config.parentCode)) {
                requestData.code = config.parentCode;
            }
            var methodName = "getProdDictCodeList"; //默认无层级的
            if (fw.core.util.ObjectUtils.hasValue(config) && fw.core.util.ObjectUtils.hasValue(config.isTree) && config.isTree == true) {
                methodName = "getProdDictCodeTree";
            }
            vm.ajax({
                serviceType: "crossDomainCall",
                serviceName: "sys/main/api",
                methodName: methodName,
                data: requestData,
                success: function (resultData) {
                    if (resultData.status != vm.ResultStatusEnum.SUCCESS || resultData.data == null) {
                        owner.$Message.error('控件数据加载异常！');
                        return;
                    }
                    if (config && config.isEmpty === true) {
                        var emptyContent = config.emptyContent || '请选择';
                        vueModel.push({
                            'name': emptyContent,
                            'code': ""
                        });
                    };
                    if (fw.core.util.ObjectUtils.hasValue(config.parentCode) && fw.core.util.ObjectUtils.hasValue(config.isTree)) {
                        vueModel.push(vm.dealTree(resultData.data));
                    } else {
                        for (var i = 0; i < resultData.data.length; i++) {
                            vueModel.push(dealTree(resultData.data[i]));
                        }
                    }
                }
            });
        },
        //增加参数 isEncrypt 报表的参数不需要加密 
        pageOpen: function (pageConfig) {
            var layType = 2;
            switch (pageConfig.type) {
                case 'page':
                    layType = 2;
                    break;
                case 'div':
                    layType = 1;
                    break;
                default:
                    {
                        console.log('层类型选择有误');
                        return;
                    };
                    break;
            }

            var settings = {
                url: "",
                title: "未定义标题",
                width: "800px",
                height: "600px"
            };
            $.extend(settings, pageConfig);
            layer.open({
                type: layType, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: pageConfig.title,
                shadeClose: true,
                maxmin: true,
                shade: 0.8,
                area: [settings.width, settings.height],
                content: (layType == 2) ? settings.url : settings.content
            });
        }
    }

};