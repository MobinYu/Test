///////////////////////////////////////////////////////////////////////////////
//扩展：自定义高度
//////////////////////////////////////////////////////////////////////////////
var fixheight_prototype = {
    doLayout: function () {
        if (!this.canLayout()) return;

        if (this._noLayout && this._doInputLayout) {
            this._doInputLayout(false);
        }

        if (this._doLabelLayout) {
            this._labelLayout();
        }

        if (this._heightChanged) {
            this._heightChanged = false;

            var h = mini.getHeight(this.el);
            mini.setHeight(this._borderEl, h);
            h -= 2;
            if (h < 0) h = 0;
            this._textEl.style.height = h + "px";
        }

    },
    setHeight: function (value) {
        if (parseInt(value) == value) value += "px";
        this.height = value;

        if (value != "21px") {
            this._textEl.style["line-height"] = (parseInt(value) - 2) + "px";
            this.el.style.height = value;
            this._heightChanged = true;
            mini.addClass(this.el, "mini-buttonedit-height");
            this.doLayout();
        }
    }
};


$.extend(mini.TextBox.prototype, fixheight_prototype);
$.extend(mini.Password.prototype, fixheight_prototype);
$.extend(mini.ButtonEdit.prototype, fixheight_prototype);
$.extend(mini.PopupEdit.prototype, fixheight_prototype);
$.extend(mini.ComboBox.prototype, fixheight_prototype);
$.extend(mini.TreeSelect.prototype, fixheight_prototype);
$.extend(mini.DatePicker.prototype, fixheight_prototype);
$.extend(mini.FileUpload.prototype, fixheight_prototype);
$.extend(mini.HtmlFile.prototype, fixheight_prototype);
$.extend(mini.Lookup.prototype, fixheight_prototype);
$.extend(mini.Spinner.prototype, fixheight_prototype);
$.extend(mini.TimeSpinner.prototype, fixheight_prototype);
$.extend(mini.AutoComplete.prototype, fixheight_prototype);



mini.ControlHelper = {
    findMethodDictionary: function (key, obj) {
        var methodDictionary = {};
        var f;
        for (var i in obj) {
            f = obj[i];
            if ($.isFunction(f)) {
                f = f.toString();
                if (f.indexOf(key) > -1) {
                    methodDictionary[i] = f;
                };
            };
        };
        return methodDictionary;
    },
    convertPager: function (pager) {
        if (!pager.isConvert) {
            pager.isConvert = true;
            pager.setShowReloadButton(false);
            $(pager._leftEl).css({
                float: "none"
            }).find(">table").width("100%");
            pager._rightEl = $('<span style="padding-right:10px;"></span>').html(pager._rightEl.innerHTML).replaceAll(pager._rightEl)[0];
            $(pager._barEl).prepend(pager._rightEl);
            $(pager._barEl).before(pager._barEl2).css({
                "width": "100%",
                "text-align": "right"
            });
        };
    },
    convertOutlookMenu: function (menu) {
        if (!menu.isConvert) {


            menu.isConvert = true;
            $(menu._borderEl).bind('mousewheel', function (event, delta, deltaX, deltaY) {
                var scrollTop = fw.scrollTop(this);
                fw.scrollTop(this, scrollTop - event.originalEvent.wheelDelta);
                $("#sssss").html(event.originalEvent.wheelDelta);
                //                console.log(event.originalEvent.wheelDelta);
                //                //                var dir = delta > 0 ? 'Up' : 'Down',
                //                var add = event.delta < 0 ? -10 : 10;
                //                fw.scrollTop(this, scrollTop + add);
                //                vel = Math.abs(delta);
                //                $(this).text(dir + ' at a velocity of ' + vel);
                //                return false;
            });

            menu.selectNode = function (node) {


                //node = this.getNode(node);
                if (!node) {
                    if (this._selected) {
                        var menu = this._getOwnerMenu(this._selected);
                        if (menu) menu.setSelectedItem(null);
                    }
                    return;
                }

                var menu = this._getOwnerMenu(node);
                if (!menu) return;
                this.expandGroup(menu._ownerGroup);

                setTimeout(function () {
                    try {
                        menu.setSelectedItem(node);
                    } catch (ex) {
                    }
                }, 100);


            };

            menu.getNodes = function (attr, value) {
                var node = this.findNodes(function (node) {
                    if (node[attr] == value) {
                        return true;
                    }
                });
                return node;
            };

            menu.getNode = function (attr, value) {
                var node = this.findNodes(function (node) {
                    if (node[attr] == value) {
                        return true;
                    }
                })[0];
                return node;
            };

            menu.getFirstChildNode = function () {

                var node = undefined;

                var _getFirstChildNode = function (nodes) {
                    if (nodes != undefined && nodes.length > 0) {
                        if (nodes[0].items) {
                            if (nodes[0].items.length > 0) {
                                _getFirstChildNode(nodes[0].items);
                            }
                        } else {
                            node = nodes[0];
                        }
                    };
                };

                _getFirstChildNode(this.l1l10o);

                return node;

            };

            menu.loadList = function (list, idField, parentField) {
                idField = idField || this.idField;
                parentField = parentField || this.parentField;
                this._doParseFields(list);
                var tree = mini.arrayToTree(list, this.nodesField, idField, parentField);
                for (var i = 0; i < tree.length; i++) {
                    if (tree[i].children == undefined) {
                        tree[i]["children"] = [];
                        tree[i].children.push(fw.fwJson.FWJsonHelper.copyObject(tree[i]));
                        tree[i].text = "";
                        tree[i][this.textField] = "";
                        delete tree[i].children[0].children;
                    }
                };
                this.load(tree);

                /*if (fw.fwObject.FWObjectHelper.hasValue(pageController.params[this.idField])) {
                this.selectNode(pageController.params[this.idField]);
                } else {
                if (fw.fwObject.FWObjectHelper.hasValue(tree)) {
                this.selectNode(tree[0].children[0][this.idField]);
                }
                }*/

                /* if (fw.fwObject.FWObjectHelper.hasValue(tree)) {
                var node = this.findNodes(function (node) {
                if (node[this.idField].indexOf(tree[0].children[0][this.idField]) != -1) return true;
                })[0];
                this.selectNode(node);
                }*/
            };

            menu.load = function (value) {
                if (typeof value == "string") {
                    this.setUrl(value);
                } else {
                    for (var i = 0; i < value.length; i++) {
                        if (value[i].children == undefined) {
                            value[i]["children"] = [];
                            value[i].children.push(fw.fwJson.FWJsonHelper.copyObject(value[i]));
                            value[i].text = "";
                            value[i][this.textField] = "";
                            delete value[i].children[0].children;
                        }
                    };
                    var list = mini.treeToArray(value, this.itemsField, this.idField, this.parentField);

                    this._doParseFields(list);

                    this.createNavBarMenu(value);
                }
            };



            menu._doParseFields = function (list) {
                for (var i = 0, l = list.length; i < l; i++) {
                    var o = list[i];
                    o.text = o[this.textField];
                    o.url = o[this.urlField];
                    o.iconCls = o[this.iconField];
                }
            };

        }
    },
    convertDataGrid: function (dataGrid) {
        if (!dataGrid.isConvert) {
            dataGrid.isConvert = true;
            for (var i = 0; i < dataGrid._pagers.length; i++) {
                var pager = dataGrid._pagers[i];
                mini.ControlHelper.convertPager(pager);
            };
            var elJQ = $(dataGrid.el);
            if (elJQ.hasClass("interlaceRow")) {
                dataGrid._borderEl.style.borderWidth = 0;
                //dataGrid.onDrawHeaderRow
                dataGrid.on("update", function () {
                    var tdLastJQ, borderStyle, borderColor;

                    var tdLastJQ = $(".mini-grid-columns .mini-grid-columns-view .mini-grid-table .mini-grid-rightCell", elJQ);
                    borderStyle = tdLastJQ.css("border-top-style");
                    borderColor = tdLastJQ.css("border-top-color");
                    tdLastJQ.css({ "border-right-width": "2px", "border-right-style": borderStyle, "border-right-color": borderColor });

                    //.mini-grid-rows-lock  .mini-grid-rows-view
                    var columnsLength = this.columns.length + 1;
                    var trFunction = function (i, j) {
                        if (i == 0) {
                            $(j).before('<tr class="mini-grid-interlaceRow"><td colspan="' + columnsLength + '"><div></div></td></tr>');
                        };
                        if ($.isFunction(dataGrid.onDrawHeaderRow)) {
                            $(j).before('<tr class="mini-grid-headerRow"><td colspan="' + columnsLength + '"><div>' + dataGrid.onDrawHeaderRow(i, dataGrid.getRow(i)) + '</div></td></tr>');
                        };
                        $(j).after('<tr class="mini-grid-interlaceRow"><td colspan="' + columnsLength + '"><div></div></td></tr>');
                        if ($.isFunction(dataGrid.onDrawFooterRow)) {
                            $(j).after('<tr class="mini-grid-footerRow"><td colspan="' + columnsLength + '"><div>' + dataGrid.onDrawFooterRow(i, dataGrid.getRow(i)) + '</div></td></tr>');
                        };
                        tdLastJQ = $(">td:last", j);
                        borderStyle = tdLastJQ.css("border-top-style");
                        borderColor = tdLastJQ.css("border-top-color");
                        tdLastJQ.css({ "border-right-width": "1px", "border-right-style": borderStyle, "border-right-color": borderColor });
                        $(">td:lt(2)", j).css({ "border-left-width": "1px", "border-left-style": borderStyle, "border-left-color": borderColor });
                    };
                    var tableJQ, trJQ;
                    //                    tableJQ = $(".mini-panel-body .mini-grid-rows-lock .mini-grid-table", elJQ);
                    //                    trJQ = $("tr.mini-grid-row", tableJQ);
                    //                    trJQ.each(trFunction);
                    tableJQ = $(".mini-panel-body .mini-grid-rows-view .mini-grid-table", elJQ);
                    trJQ = $("tr.mini-grid-row", tableJQ);
                    trJQ.each(trFunction);
                });
            };
        };
    },
    convertAutoComplete: function (autoComplete) {
        if (!autoComplete.isConvert) {
            autoComplete.isConvert = true;
            autoComplete.setData = function (data) {
                var D = this; function $(_, $) { D.oo101[ooO0ll](_); D[OOO0Oo](); D.oo101.OoO1l(0, true); D.data = _; D[o0o0oo]("load", { data: _, result: $ }) };

                //以上乱码是方法_doQuery中的代码片段
                $(data, data);
            };
            //var methodDictionary = mini.ControlHelper.findMethodDictionary('beforeload', autoComplete);
            autoComplete.O10ol0 = function (key) {
                //乱码对应源码中的方法_doQuery
                var params = {};
                params[this.searchField] = key;
                var e = {
                    params: params,
                    data: params,
                    cache: false,
                    cancel: false
                };
                this.fire("beforeload", e);
            };
        };
    },
    convertForm: function (form) {
        if (!form.isConvert) {
            form.isConvert = true;
            form.setData = function (options, all, deep) {
                if (mini.isNull(deep)) deep = true;
                if (typeof options != "object") options = {};
                var map = this.getFieldsMap();
                for (var name in map) {
                    var control = map[name];
                    if (!control) continue;
                    if (control.setValue) {
                        var v = options[name];
                        if (deep == true) {
                            v = mini._getMap(name, options);
                        }
                        if (v === undefined && all === false) continue;
                        if (v === null) v = "";
                        var _originalValue = control["_originalValue"];
                        if (control["defaultValue"]) {
                            _originalValue = control["defaultValue"];
                        };
                        if (_originalValue) {
                            if (_originalValue !== v) {
                                control["_originalValue"] = v;
                                control._changed = true;
                            };
                        } else {
                            control["_originalValue"] = v;
                            control._changed = true;
                        };
                        control.setValue(v);
                    }
                    if (control.setText && control.textName) {
                        var text = options[control.textName];
                        if (deep == true) {
                            text = mini._getMap(control.textName, options);
                        }
                        if (mini.isNull(text)) text = "";
                        control.setText(text);
                    }
                }

            };
            form.getChangesData = function (formatted, deep) {
                if (mini.isNull(deep)) deep = true;
                var valueFn = formatted ? "getFormValue" : "getValue";
                var controls = this.getFields();
                var data = {};
                for (var i = 0, l = controls.length; i < l; i++) {
                    var control = controls[i];
                    var fn = control[valueFn];
                    if (!fn) continue;
                    var value = fn.call(control);
                    if (value !== control["defaultValue"]) {
                        if (control["_changed"] === true || mini.isNull(control["_changed"])) {
                            if (value !== control["_originalValue"]) {
                                if (control.name) {
                                    if (deep == true) {
                                        mini._setMap(control.name, value, data);
                                    } else {
                                        data[control.name] = value;
                                    }
                                }
                                if (control.textName && control.getText) {
                                    if (deep == true) {
                                        mini._setMap(control.textName, control.getText(), data);
                                    } else {
                                        data[control.textName] = control.getText();
                                    }
                                }

                            }
                        }
                    }

                }
                return data;
            };
        };
    },
    convertTextArea: function (textarea) {
        if (!textarea.isConvert) {
            textarea.isConvert = true;
            textarea.doLayout = function () {
                var me = this;

                this._textEl.style.overflow = "hidden";

                var _autoHeight = function () {
                    var h = mini.getHeight(me.el);

                    if (mini.isIE6) {
                        mini.setHeight(me._borderEl, h);
                    }
                    h -= 2;
                    if (h < 0) h = 0;

                    me._textEl.style.height = me._textEl.scrollTop + me._textEl.scrollHeight + "px";
                };


                this._textEl.onkeydown = function () {

                    _autoHeight();
                }

                if (!this.canLayout()) return;
                mini.TextArea.superclass.doLayout.call(this);

                _autoHeight();

            };

        }
    },
    convertTree: function (tree) {
        if (!tree.isConvert) {
            tree.isConvert = true;
            tree.getFirstChildNode = function () {
                var node = undefined;

                var list = mini.treeToArray(this.data, this.getNodesField(), this.idField, this.parentField);

                var tree = mini.listToTree(list, this.getNodesField(), this.idField, this.parentField);

                var _getFirstChildNode = function (nodes) {
                    if (nodes != undefined && nodes.length > 0) {
                        if (nodes[0].children) {
                            if (nodes[0].children.length > 0) {
                                _getFirstChildNode(nodes[0].children);
                            }
                        } else {
                            node = nodes[0];
                        }
                    };
                };

                _getFirstChildNode(tree);

                return node;
            };

            //var methodDictionary = mini.ControlHelper.findMethodDictionary('document.getElementById', tree);

            //tree._rowSelectedCls = "mini-tree-selectedNode";


            /*tree._doRowSelect = function (rows, select) {
            for (var i = 0, l = rows.length; i < l; i++) {
            var record = rows[i];

            if (select) {
            this.addRowCls(record, this._rowSelectedCls);
                        
            } else {
            this.removeRowCls(record, this._rowSelectedCls);
            }
            }
            }*/
        }
    }
};
mini.PagesHelper = {
    loadedScriptDictionary: {},
    pageHtmlInfoDictionary: {},
    convertTabs: function (tabs, pageController) {
        if (!tabs.isConvert) {
            tabs.isConvert = true;
            $(tabs.el).addClass("pages");
            if (pageController.driverType == "ipage") {
                tabs._addTab = tabs.addTab;
                tabs.addTab = function (tab, index) {
                    if (!tab.driverType) {
                        tab.driverType = pageController.driverType;
                    };
                    if (tab.driverType == "ipage") {
                        var page = {
                            url: tab.url
                        };
                        delete tab.url;
                        this._addTab(tab);
                        var tabBodyEl = this.getTabBodyEl(tab);
                        var pages = new mini.ux.Pages();
                        pages.async = true;
                        pages.page = pageController;
                        pages.set({
                            width: "100%",
                            height: "100%",
                            bodyStyle: "border: 0px; padding: 0px 0px;"
                        });
                        pages.render(tabBodyEl);
                        pages.addPage(page);
                        delete tab._url;
                        tab.pages = pages;
                    } else {
                        this._addTab(tab);
                    };
                };
                tabs._activeTab = tabs.activeTab;
                tabs.activeTab = function (tab) {
                    tab = this.getTab(tab);
                    if (!tab.driverType) {
                        tab.driverType = pageController.driverType;
                    };
                    if (tab.driverType == "ipage") {
                        this._activeTab(tab);
                        var page = tab.pages.getPage(0);
                        tab.pages.activePage(page);
                    } else {
                        this._activeTab(tab);
                    };
                };
                tabs._reloadTab = tabs.reloadTab;
                tabs.reloadTab = function (tab) {
                    if (!tab.driverType) {
                        tab.driverType = pageController.driverType;
                    };
                    if (tab.driverType == "ipage") {
                        tab = this.getTab(tab);
                        var page = tab.pages.getPage(0);
                        page.url = page.loadedUrl;
                        tab.pages.reloadPage(page);
                    } else {
                        this._reloadTab(tab);
                    };
                };
                tabs._removeTab = tabs.removeTab;
                tabs.removeTab = function (tab) {
                    if (!tab.driverType) {
                        tab.driverType = pageController.driverType;
                    };
                    if (tab.driverType == "ipage") {
                        tab = this.getTab(tab);
                        var page = tab.pages.getPage(0);
                        tab.pages.removePage(page);
                    };
                    this._removeTab(tab);
                };
                tabs.removeAll = function (butTabs) {
                    var activeTab = this.getActiveTab();
                    if (mini.isNull(butTabs)) butTabs = [];
                    if (!mini.isArray(butTabs)) {
                        butTabs = [butTabs];
                    };
                    for (var i = butTabs.length - 1; i >= 0; i--) {
                        var t = this.getTab(butTabs[i]);
                        if (!t) butTabs.removeAt(i);
                        else butTabs[i] = t;
                    };
                    var olds = this.tabs;
                    for (var i = olds.length - 1; i >= 0; i--) {
                        var tab = olds[i];
                        if (butTabs.indexOf(tab) == -1) {
                            this.removeTab(tab);
                        }
                    };
                    var butTab = butTabs[0];
                    if (activeTab != this.getActiveTab()) {
                        if (butTab) this.activeTab(butTab);
                    };
                };
            };
        };
    }
};

mini.getPageXY = function (el) {
    return { pageX: el.pageX, pageY: el.pageY }
};
mini.__IPageCreateCount = 1;
mini.createIPage = function (page) {
    var ipageCreateCount = mini.__IPageCreateCount++;
    var ipageHtml = '<div style="width:100%;height:100%;"></div>';
    var div = document.createElement("div");
    var ipageEl = mini.append(div, ipageHtml);
    ipageEl.ipageCreateCount = ipageCreateCount;
    return ipageEl;
};
mini.loadIPage = function (page, onIPageLoad) {
    var url = page.url;

    var ipageEl = page._ipageEl;
    ipageEl.src = url;

    var firstLoad = true;
    function __OnLoad() {
        if (page.async) {
            setTimeout(function () {
                if (onIPageLoad) {
                    onIPageLoad(ipageEl, firstLoad);
                };
                firstLoad = false;
            }, 1);
        } else {
            if (onIPageLoad) {
                onIPageLoad(ipageEl, firstLoad);
            };
            firstLoad = false;
        };
    };

    ipageEl._ondestroy = function () {
        window[page.pageControllerID] = null;
        page.pageControllerID = null;
        page.pageController = null;
        page.pages = null;
        ipageEl.src = "";
        ipageEl._ondestroy = null;
        ipageEl.ipageCreateCount = null;
        ipageEl = null;
    };

    function loadPage(pageHtmlInfo) {
        page.pageControllerID = "ipage" + ipageEl.ipageCreateCount;
        var html = pageHtmlInfo.bodyHtml.replace(/pageController/g, page.pageControllerID);
        $(ipageEl).html(html);

        try {
            page.pageController = pageHtmlInfo.PageController();
            page.pageController.pageControllerID = page.pageControllerID;
            window[page.pageControllerID] = page.pageController;
            page.pageController.driverType = "ipage";
            page.pageController.page = page;
            page.pageController._windowLoad(page.pageController.driverType, { url: url });
        } catch (ex) {
        };

        __OnLoad();
    };

    if (ipageEl) {
        var urlInfo = fw.fwUrl.FWUrlHelper.parser(url);
        var pageHtmlInfo = mini.PagesHelper.pageHtmlInfoDictionary[urlInfo.fileFullPath];
        if (!pageHtmlInfo) {
            $.ajax({
                type: "GET"
                , dataType: "html"
                , url: ipageEl.src
                , async: page.async
                , success: function (data, textStatus, jqXHR) {
                    var pageHtmlInfo = {
                        PageController: function () { },
                        links: [],
                        scripts: [],
                        bodyHtml: ""
                    };

                    if (data) {
                        //解析需要加载的css
                        var links = data.match(new RegExp(/<ipagelink[\s|\S]*?>/g));
                        //加载css
                        if (links != null && links.length > 0) {
                            var hrefArray = [];
                            for (var i = 0; i < links.length; i++) {
                                var href = $(links[i]).attr("href");
                                href = fw.fwUrl.FWUrlHelper.getAbsoluteUrl(href, window.pageController.webSiteRootUrl);
                                hrefArray.push(href);
                            };
                            pageHtmlInfo.links = hrefArray;
                        };

                        //解析需要加载的js
                        var scripts = data.match(new RegExp(/<ipagescript[\s|\S]*?<\/ipagescript>/g));
                        if (scripts != null && scripts.length > 0) {
                            var srcArray = [];
                            for (var i = 0; i < scripts.length; i++) {
                                var src = $(scripts[i]).attr("src");
                                src = fw.fwUrl.FWUrlHelper.getAbsoluteUrl(src, window.pageController.webSiteRootUrl);
                                srcArray.push(src);
                            };
                            pageHtmlInfo.scripts = srcArray;
                        };

                        //页面UI初始化
                        data = data
                        .replace(/[\s|\S]*?<body>/g, '')
                        .replace(/<\/body>[\s|\S]*?<\/html>/g, '')
                        .replace(/<link[\s|\S]*?>/g, '')
                        .replace(/<script[\s|\S]text\/javascript*?[\s|\S]*?<\/script>/g, '');
                        pageHtmlInfo.bodyHtml = data;

                        //加载js

                        fw.loadLinks(pageHtmlInfo.links, function () {
                            page.windowPageController = window.pageController;
                            try {
                                //delete window.pageController;
                                fw.loadScripts(pageHtmlInfo.scripts, function () {
                                    pageHtmlInfo.PageController = window.PageController;
                                    window.pageController = page.windowPageController;
                                    delete page.windowPageController;

                                    mini.PagesHelper.pageHtmlInfoDictionary[urlInfo.fileFullPath] = pageHtmlInfo;
                                    loadPage(pageHtmlInfo);
                                });
                            } catch (ex) {
                                window.pageController = page.windowPageController;
                            };
                        });
                    };
                }
            });
        } else {
            loadPage(pageHtmlInfo);
        };
    };
};

mini.ux.Pages = function () {
    this._initPages();
    mini.ux.Pages.superclass.constructor.call(this);
}
mini.extend(mini.ux.Pages, mini.Control, {
    activeIndex: -1,
    showBody: true,

    nameField: "name",
    titleField: "title",
    urlField: "url",

    url: "",
    async: true,
    maskOnLoad: true,

    page: null,

    bodyStyle: "",

    set: function (obj) {
        if (typeof obj == 'string') {
            return this;
        }

        var _allowLayout = this._allowLayout;
        this._allowLayout = false;

        var activeIndex = obj.activeIndex;
        delete obj.activeIndex;

        var url = obj.url;
        delete obj.url;

        mini.ux.Pages.superclass.set.call(this, obj);

        if (url) {
            this.setUrl(url);
        }
        if (mini.isNumber(activeIndex)) {
            this.setActiveIndex(activeIndex);
        }

        this._allowLayout = _allowLayout;
        this.doLayout();

        return this;
    },

    uiCls: "mini-ux-pages",
    _create: function () {
        this.el = document.createElement("div");
        this.el.className = "mini-ux-pages";

        var s = '<div class="mini-pages-bodys"></div>';
        this.el.innerHTML = s;

        this._bodyEl = this.el.firstChild;
        this._borderEl = this._bodyEl;
        this.doUpdate();
    },
    destroy: function (removeEl) {
        this._bodyEl = this._borderEl = null;
        this.pages = [];
        mini.ux.Pages.superclass.destroy.call(this, removeEl);
    },
    _initEvents: function () {

    },
    _initPages: function () {
        this.pages = [];
    },
    _PageID: 1,

    createPage: function (options) {
        var page = mini.copyTo({
            _id: this._PageID++,
            name: "",
            title: "",
            newLine: false,

            iconCls: "",
            iconStyle: "",
            headerCls: "",
            headerStyle: "",
            bodyCls: "",
            bodyStyle: "",

            visible: true,
            enabled: true,
            showCloseButton: false,
            active: false,

            url: "",
            loaded: false,
            refreshOnClick: false

        }, options);
        if (options) {
            options = mini.copyTo(options, page);
            page = options;
        }
        return page;
    },

    _doLoad: function () {

        var pages = mini._getResult(this.url, null, null, null, null, this.dataField);

        if (this.dataField && !mini.isArray(pages)) {
            pages = mini._getMap(this.dataField, pages);
        }
        if (!pages) pages = [];


        this.setPages(pages);
        this.fire("load");
    },

    load: function (url) {
        if (typeof url == "string") {
            this.setUrl(url);
        } else {
            this.setPages(url);
        }
    },
    setUrl: function (value) {
        this.url = value;
        this._doLoad();
    },
    getUrl: function () {
        return this.url;
    },
    setNameField: function (value) {
        this.nameField = value;
    },
    getNameField: function () {
        return this.nameField;
    },
    setTitleField: function (value) {
        this.titleField = value;
    },
    getTitleField: function () {
        return this.titleField;
    },
    setUrlField: function (value) {
        this.urlField = value;
    },
    getUrlField: function () {
        return this.urlField;
    },
    setPages: function (pages) {
        if (!mini.isArray(pages)) return;
        this.beginUpdate();

        this.removeAll();


        for (var i = 0, l = pages.length; i < l; i++) {
            var page = pages[i];
            page.title = mini._getMap(this.titleField, page);
            page.url = mini._getMap(this.urlField, page);
            page.name = mini._getMap(this.nameField, page);
        }

        for (var i = 0, l = pages.length; i < l; i++) {
            this.addPage(pages[i]);
            this.setActiveIndex(i);
        }
        //        this.setActiveIndex(0);
        this.endUpdate();
    },
    getPages: function () {
        return this.pages;
    },
    removeAll: function (butPages) {
        var activePage = this.getActivePage();
        if (mini.isNull(butPages)) butPages = [];
        if (!mini.isArray(butPages)) {
            butPages = [butPages];
        }
        for (var i = butPages.length - 1; i >= 0; i--) {
            var t = this.getPage(butPages[i]);
            if (!t) butPages.removeAt(i);
            else butPages[i] = t;
        }

        var olds = this.pages;
        for (var i = olds.length - 1; i >= 0; i--) {
            var page = olds[i];
            if (butPages.indexOf(page) == -1) {
                this.removePage(page);
            }
        }
        var butPage = butPages[0];
        if (activePage != this.getActivePage()) {
            if (butPage) this.activePage(butPage);
        }
    },
    addPage: function (page, index) {
        if (typeof page == "string") {
            page = { title: page };
        }
        page = this.createPage(page);
        if (!page.name) page.name = "";

        if (typeof index != "number") index = this.pages.length;
        this.pages.insert(index, page);

        var bodyId = this._createPageBodyId(page);
        var s = '<div id="' + bodyId + '" class="mini-pages-body ' + page.bodyCls + '" style="' + page.bodyStyle + ';display1:none;"></div>';
        mini.append(this._bodyEl, s);

        this.doUpdate();
        return page;
    },
    removePage: function (page) {
        page = this.getPage(page);
        if (!page || this.pages.indexOf(page) == -1) return;

        var acPage = this.getActivePage();

        var isActive = page == acPage;

        var autoActive = this._OnPageDestroy(page);

        this.pages.remove(page);

        this._doRemoveIPage(page);

        var el = this.getPageBodyEl(page);
        if (el) this._bodyEl.removeChild(el);

        if (autoActive && isActive) {
            for (var i = this.activeIndex; i >= 0; i--) {
                var page = this.getPage(i);
                if (page && page.enabled && page.visible) {
                    this.activeIndex = i;
                    break;
                }
            }
            this.doUpdate();
            this.setActiveIndex(this.activeIndex);
            this.fire("activechanged");
        } else {
            this.activeIndex = this.pages.indexOf(acPage);
            this.doUpdate();
        }
        return page;
    },
    movePage: function (page, index) {
        page = this.getPage(page);
        if (!page) return;

        var t = this.pages[index];
        if (t == page) return;

        this.pages.remove(page);
        var index = this.pages.indexOf(t);
        if (index == -1) {
            this.pages.add(page);
        } else {
            this.pages.insert(index, page);
        }
        this.doUpdate();
    },
    updatePage: function (page, options) {
        page = this.getPage(page);
        if (!page) return;
        mini.copyTo(page, options);
        this.doUpdate();
    },
    _getMaskWrapEl: function () {
        return this._bodyEl;
    },
    _doRemoveIPage: function (page, removeAll) {
        if (page._ipageEl && page._ipageEl.parentNode) {
            page._ipageEl.onload = function () { };
            jQuery(page._ipageEl).unbind("load");
            page._ipageEl.src = "";
            try {
                page._ipageEl.innerHTML = "";
            } catch (ex) { }
            if (page._ipageEl._ondestroy) page._ipageEl._ondestroy();
            try {
                page._ipageEl.parentNode.removeChild(page._ipageEl);
                page._ipageEl.removeNode(true);
            } catch (ex) { }
        }
        page._ipageEl = null;
        page.loadedUrl = null;

        if (removeAll === true) {
            var bodyEl = this.getPageBodyEl(page);
            if (bodyEl) {
                var cs = mini.getChildNodes(bodyEl, true);
                for (var i = 0, l = cs.length; i < l; i++) {
                    var d = cs[i];
                    if (d && d.parentNode) d.parentNode.removeChild(d);
                }
            }
        }
    },
    _deferLoadingTime: 180,
    _cancelLoadPages: function (page) {

        //        var pages = this.pages;
        //        for (var i = 0, l = pages.length; i < l; i++) {
        //            var t = pages[i];
        //            if (t != page) {
        //                if (t._loading && t._ipageEl) {
        //                    t._loading = false;
        //                    this._doRemoveIPage(t, true);
        //                }
        //            }
        //        }
        //        if (page && page == this.getActivePage() && page._loading) {
        //        } else {
        //            this._loading = false;
        //            this.unmask();
        //        }
    },
    _doLoadPage: function (page) {
        if (!page || page != this.getActivePage()) return;
        var bodyEl = this.getPageBodyEl(page);
        if (!bodyEl) return;

        this._cancelLoadPages();

        this._doRemoveIPage(page, true);

        this._loading = true;
        page._loading = true;

        page.pages = this;
        page.async = this.async;

        this.unmask();
        if (this.maskOnLoad) this.loading();
        var st = new Date();

        var me = this;

        me.isLoading = true;

        var ipageEl = mini.createIPage(page);
        page._ipageEl = ipageEl;
        bodyEl.appendChild(ipageEl);
        mini.loadIPage(page,
            function (_ipage, firstLoad) {
                //                    try {
                //                        page._ipageEl.contentWindow.Owner = window;
                //                        page._ipageEl.contentWindow.CloseOwnerWindow = function (action) {
                //                            page.removeAction = action;

                //                            var ret = true;
                //                            if (page.ondestroy) {
                //                                if (typeof page.ondestroy == "string") {
                //                                    page.ondestroy = window[page.ondestroy];
                //                                }
                //                                if (page.ondestroy) {
                //                                    ret = page.ondestroy.call(this, e);
                //                                }
                //                            }
                //                            if (ret === false) {
                //                                return false;
                //                            }

                //                            setTimeout(function () {
                //                                me.removePage(page);
                //                            }, 10);
                //                        }
                //                    } catch (e) { }

                if (page._loading != true) return;
                var t = (st - new Date()) + me._deferLoadingTime;

                page._loading = false;
                page.loadedUrl = page.url;

                if (t < 0) t = 0;
                setTimeout(function () {
                    me.unmask();
                    me.doLayout();
                    me.isLoading = false;
                }, t);

                if (firstLoad) {
                    var e = {
                        sender: me,
                        page: page,
                        index: me.pages.indexOf(page),
                        name: page.name,
                        ipage: page._ipageEl
                    };
                    if (page.onload) {
                        if (typeof page.onload == "string") {
                            page.onload = window[page.onload];
                        }
                        if (page.onload) {
                            page.onload.call(sf, e);
                        }
                    }
                }
                if (me.getActivePage() == page) {
                    me.fire("pageload", e);
                }
            }
        );
    },
    _OnPageDestroy: function (page) {
        var e = {
            sender: this,
            page: page,
            index: this.pages.indexOf(page),
            name: page.name,
            ipage: page._ipageEl,
            autoActive: true
        };
        this.fire("pagedestroy", e);
        return e.autoActive;
    },
    loadPage: function (url, page, onload, ondestroy) {
        if (!url) return;
        page = this.getPage(page);
        if (!page) page = this.getActivePage();
        if (!page) return;

        var el = this.getPageBodyEl(page);
        if (el) {
            mini.addClass(el, 'mini-pages-hideOverflow');
        }

        page.url = url;
        delete page.loadedUrl;

        if (onload) page.onload = onload;
        if (ondestroy) page.ondestroy = ondestroy;

        var me = this;

        if (me.async) {
            clearTimeout(this._loadPageTimer);
            this._loadPageTimer = null;
            this._loadPageTimer = setTimeout(function () {
                me._doLoadPage(page);
            }, 1);
        } else {
            me._doLoadPage(page);
        };
    },
    reloadPage: function (page) {
        page = this.getPage(page);
        if (!page) page = this.getActivePage();
        if (!page) return;
        this.loadPage(page.url, page);
    },

    getPageRows: function () {
        var rows = [];
        var row = [];
        for (var i = 0, l = this.pages.length; i < l; i++) {
            var page = this.pages[i];
            if (i != 0 && page.newLine) {
                rows.push(row);
                row = [];
            }
            row.push(page);
        }
        rows.push(row);
        return rows;
    },
    doUpdate: function () {

        if (this._allowUpdate === false) return;

        if (this._buttons && this._buttons.parentNode) {
            this._buttons.parentNode.removeChild(this._buttons);
        }

        if (this._buttons) {
            var el = mini.byClass('mini-pages-buttons', this.el);
            if (el) {
                el.appendChild(this._buttons);
                mini.parse(el);
            }
        }

        this.doLayout();

        this.setActiveIndex(this.activeIndex, false);
    },
    _handleIPageOverflow: function () {
        var bodyEl = this.getPageBodyEl(this.activeIndex);
        if (bodyEl) {
            mini.removeClass(bodyEl, 'mini-pages-hideOverflow');
            var dom = mini.getChildNodes(bodyEl)[0];

            if (dom && dom.tagName && dom.tagName.toUpperCase() == "IFRAME") {
                mini.addClass(bodyEl, 'mini-pages-hideOverflow');
            }

        }
    },
    doLayout: function () {

        if (!this.canLayout()) return;

        this._handleIPageOverflow();

        var autoHeight = this.isAutoHeight();

        h = this.getHeight(true);
        w = this.getWidth();
        var elHeight = h;
        var elWidth = w;

        if (this.showBody) {
            this._bodyEl.style.display = "";
        } else {
            this._bodyEl.style.display = "none";
        }

        if (this.plain) {
            mini.addClass(this.el, "mini-pages-plain");
        } else {
            mini.removeClass(this.el, "mini-pages-plain");
        }


        if (!autoHeight && this.showBody) {
            if (jQuery.boxModel) {
                var padding = mini.getPaddings(this._bodyEl);
                var border = mini.getBorders(this._bodyEl);

                h = h - padding.top - padding.bottom - border.top - border.bottom;
                w = w - padding.left - padding.right - border.left - border.right;
            }
            margin = mini.getMargins(this._bodyEl);

            h = h - margin.top - margin.bottom;
            w = w - margin.left - margin.right;

            if (h < 0) h = 0;
            if (w < 0) w = 0;

            this._bodyEl.style.width = w + "px";
            this._bodyEl.style.height = h + "px";

        } else {
            this._bodyEl.style.width = "auto";
            this._bodyEl.style.height = "auto";
        }


        var pageBodyEl = this.getPageBodyEl(this.activeIndex);
        if (pageBodyEl) {
            if (!autoHeight && this.showBody) {
                var h = mini.getHeight(this._bodyEl, true);
                if (jQuery.boxModel) {
                    var padding = mini.getPaddings(pageBodyEl);
                    var border = mini.getBorders(pageBodyEl);
                    h = h - padding.top - padding.bottom - border.top - border.bottom;
                }
                pageBodyEl.style.height = h + "px";
            } else {
                pageBodyEl.style.height = "auto";
            }
        }


        mini.removeClass(this.el, 'mini-pages-scroll');
        var buttons = mini.byClass('mini-pages-buttons', this.el);
        if (buttons) buttons.style.display = 'none';

        this._scrollToPage(this.activeIndex);
        this._doScrollButton();

        mini.layout(this._bodyEl);

        var that = this;
        var page = this.getActivePage();
        if (page && page.repaint && pageBodyEl) {
            var w = pageBodyEl.style.width;
            pageBodyEl.style.width = '0px';
            setTimeout(function () {

                pageBodyEl.style.width = w;
            }, 1);
        }

        this.fire("layout");

    },
    getPage: function (index) {
        if (typeof index == "object") return index;
        if (typeof index == "number") {
            return this.pages[index];
        } else {
            for (var i = 0, l = this.pages.length; i < l; i++) {
                var page = this.pages[i];
                if (page.name == index) return page;
            }
        }
    },
    getBodyEl: function () {
        return this._bodyEl;
    },
    getPageEl: function (index) {
        var page = this.getPage(index);
        if (!page) return null;
        var id = this._createPageId(page);
        var cs = this.el.getElementsByTagName("*");
        for (var i = 0, l = cs.length; i < l; i++) {
            var el = cs[i];
            if (el.id == id) return el;
        }
        return null;
    },
    getPageBodyEl: function (index) {
        var page = this.getPage(index);
        if (!page) return null;
        var id = this._createPageBodyId(page);
        var cs = this._bodyEl.childNodes;
        for (var i = 0, l = cs.length; i < l; i++) {
            var el = cs[i];
            if (el.id == id) return el;
        }
        return null;
    },
    getPageIPageEl: function (index) {
        var page = this.getPage(index);
        if (!page) return null;
        return page._ipageEl;
    },
    _createPageId: function (page) {
        return this.uid + "$" + page._id;
    },
    _createPageBodyId: function (page) {
        return this.uid + "$body$" + page._id;
    },
    _doScrollButton: function () {
        //        if (this.pagePosition == "top") {
        //            mini.removeClass(this._leftButtonEl, "mini-disabled");
        //            mini.removeClass(this._rightButtonEl, "mini-disabled");
        //            if (this._headerEl.scrollLeft == 0) {
        //                mini.addClass(this._leftButtonEl, "mini-disabled");
        //            }
        //            var pageEl = this.getPageEl(this.pages.length - 1);
        //            if (pageEl) {
        //                var pageBox = mini.getBox(pageEl);
        //                var scrollBox = mini.getBox(this._headerEl);
        //                if (pageBox.right <= scrollBox.right) {
        //                    mini.addClass(this._rightButtonEl, "mini-disabled");
        //                }
        //            }
        //        }
    },

    setActiveIndex: function (value, load) {

        var page = this.getPage(value);

        var acPage = this.getPage(this.activeIndex);

        var fire = page != acPage;

        if (page) {
            this.activeIndex = this.pages.indexOf(page);
        } else {
            this.activeIndex = -1;
        }
        var el = this.getPageBodyEl(this.activeIndex);
        if (el) el.style.display = "";

        var el = this.getPageEl(acPage);
        if (el) mini.removeClass(el, this._pageActiveCls);

        var el = this.getPageEl(page);
        if (el) mini.addClass(el, this._pageActiveCls);

        if (el && fire) {
            if (this.pagePosition == "bottom") {
                var tb = mini.findParent(el, "mini-pages-header");
                if (tb) {
                    jQuery(this._headerEl).prepend(tb);
                }
            } else if (this.pagePosition == "left") {
                var td = mini.findParent(el, "mini-pages-header").parentNode;
                if (td) {
                    td.parentNode.appendChild(td);
                }
            } else if (this.pagePosition == "right") {
                var td = mini.findParent(el, "mini-pages-header").parentNode;
                if (td) {
                    jQuery(td.parentNode).prepend(td);
                }
            } else {
                var tb = mini.findParent(el, "mini-pages-header");
                if (tb) {
                    this._headerEl.appendChild(tb);
                }
            }
            var scrollLeft = this._headerEl.scrollLeft;


            var acPage = this.getPage(this.activeIndex);
            var canLayout = acPage ? !acPage._layouted : false;
            var autoHeight = this.isAutoHeight();

            if (autoHeight || canLayout) {
                if (acPage) acPage._layouted = true;
                this.doLayout();
            }



            var rows = this.getPageRows();
            if (rows.length > 1) {

            } else {
                this._scrollToPage(this.activeIndex);


                this._doScrollButton();
            }

            for (var i = 0, l = this.pages.length; i < l; i++) {
                var pageEl = this.getPageEl(this.pages[i]);
                if (pageEl) {
                    mini.removeClass(pageEl, this._pageHoverCls);
                }
            }
        }
        var me = this;
        if (fire) {
            var e = {
                page: page,
                index: this.pages.indexOf(page),
                name: page ? page.name : ""
            };

            //            setTimeout(function () {



            me.fire("ActiveChanged", e);

            //            }, 1);
        }


        this._cancelLoadPages(page);
        if (load !== false) {
            if (page && page.url && !page.loadedUrl) {
                var me = this;


                me.loadPage(page.url, page);

            }
        } else {

        }

        if (me.canLayout()) {
            try {
                mini.layoutIPages(me.el);
            } catch (e) {
            }
        }
    },
    _scrollToPage: function (page) {
        //        var scrollLeft = this._headerEl.scrollLeft;
        //        if (this.pagePosition == "top") {
        //            this._headerEl.scrollLeft = scrollLeft;
        //            var pageEl = this.getPageEl(page);
        //            if (pageEl) {
        //                var sf = this;
        //                var pageBox = mini.getBox(pageEl);
        //                var scrollBox = mini.getBox(sf._headerEl);

        //                if (pageBox.x < scrollBox.x) {
        //                    sf._headerEl.scrollLeft -= (scrollBox.x - pageBox.x);
        //                } else if (pageBox.right > scrollBox.right) {
        //                    sf._headerEl.scrollLeft += (pageBox.right - scrollBox.right);
        //                }
        //            }
        //        }
    },
    getActiveIndex: function () {
        return this.activeIndex;
    },
    activePage: function (page) {
        this.setActiveIndex(page);
    },
    getActivePage: function () {
        return this.getPage(this.activeIndex);
    },
    getActiveIndex: function () {
        return this.activeIndex;
    },
    _tryActivePage: function (page) {
        page = this.getPage(page);
        if (!page) return;
        var index = this.pages.indexOf(page);
        if (this.activeIndex == index) return;
        var e = {
            page: page,
            index: index,
            name: page.name,
            cancel: false
        };
        this.fire("BeforeActiveChanged", e);
        if (e.cancel == false) {
            this.activePage(page);
        }
    },
    setBodyStyle: function (value) {
        this.bodyStyle = value;
        mini.setStyle(this._bodyEl, value);
        this.doLayout();
    },
    getBodyStyle: function () {
        return this.bodyStyle;
    },
    setMaskOnLoad: function (value) {
        this.maskOnLoad = value;
    },
    getMaskOnLoad: function () {
        return this.maskOnLoad;
    },
    getPageByEvent: function (e) {
        return this._getPageByEvent(e);
    },
    _getPageByEvent: function (e) {
        var el = mini.findParent(e.target, 'mini-page');
        if (!el) return null;
        var ids = el.id.split("$");
        if (ids[0] != this.uid) return null;
        var index = parseInt(jQuery(el).attr("index"));
        return this.getPage(index);
    },
    getAttrs: function (el) {
        var attrs = mini.ux.Pages.superclass.getAttrs.call(this, el);

        mini._ParseString(el, attrs,
            ["bodyStyle", "onactivechanged", "onbeforeactivechanged", "url",
                "onpageload", "onpagedestroy", "onbeforecloseclick", "oncloseclick", "onpagedblclick",
                "titleField", "urlField", "nameField", "loadingMsg", "buttons"
             ]
        );
        mini._ParseBool(el, attrs,
            ["allowAnim", "maskOnLoad", "async"]
        );
        mini._ParseInt(el, attrs,
            ["activeIndex"
             ]
        );

        var pages = [];
        var nodes = mini.getChildNodes(el);
        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];

            var o = {};
            pages.push(o);

            o.style = node.style.cssText;
            mini._ParseString(node, o,
                ["name", "title", "url", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle",
                    "onload", "ondestroy", "data-options"
                 ]
            );
            mini._ParseBool(node, o,
                ["newLine", "visible", "enabled", "showCloseButton", "refreshOnClick"
                 ]
            );

            o.bodyParent = node;

            var options = o["data-options"];
            if (options) {

                options = eval("(" + options + ")");
                if (options) {

                    mini.copyTo(o, options);
                }
            }
        }
        attrs.pages = pages;

        return attrs;
    }
});
mini.regClass(mini.ux.Pages, "ux.pages");

mini.ux.Comboboxtab = function () {

    this.data = [];
    mini.ux.Comboboxtab.superclass.constructor.call(this);

    mini.on(this._textEl, "mouseup", this.__OnMouseUp, this);

    this.on("showpopup", this.__OnShowPopup, this);

};
mini.extend(mini.ux.Comboboxtab, mini.PopupEdit, {
    allowInput: true,

    valueField: "id",
    textField: "text",
    delimiter: ',',

    multiSelect: false,

    data: [],
    tabs: null,
    grid: null,
    _destroyPopup: false,


    uiCls: "mini-ux-comboboxtab",
    destroy: function (removeEl) {

        if (this.tabs) {



            this.tabs = null;


        }
        mini.ux.Comboboxtab.superclass.destroy.call(this, removeEl);
    },
    setTabs: function (value) {

        if (typeof value == "string") {
            mini.parse(value);
            value = mini.get(value);
        }
        this.tabs = mini.getAndCreate(value);

        if (this.tabs) {

            this.tabs.on("beforeactivechanged", this.__OnBeforeActiveChanged, this);

        }


    },
    getTabs: function () {
        return this.tabs;
    },
    setValueField: function (valueField) {
        this.valueField = valueField;
    },
    getValueField: function () {
        return this.valueField;
    },
    setTextField: function (value) {

        this.textField = value;
    },
    getTextField: function () {
        return this.textField;
    },
    deselectAll: function () {
        this.data = [];
        this.setValue("");
        this.setText("");
    },
    _createData: function () {
        this.value = mini.isNull(this.value) ? "" : String(this.value);
        this.text = mini.isNull(this.text) ? "" : String(this.text);



        var data = [];
        var values = this.value.split(this.delimiter);
        var texts = this.text.split(this.delimiter);
        var len = values.length;

        if (this.value) {
            for (var i = 0, l = len; i < l; i++) {
                var row = {};
                var id = values[i];
                var text = texts[i];
                row[this.valueField] = id ? id : "";
                row[this.textField] = text ? text : "";
                data.push(row);
            }
        }
        this.data = data;

    },
    _getValueMaps: function (rows) {

        var vs = {};
        for (var i = 0, l = rows.length; i < l; i++) {
            var row = rows[i];
            var id = row[this.valueField];
            vs[id] = row;
        }
        return vs;
    },
    setValue: function (value) {

        mini.ux.Comboboxtab.superclass.setValue.call(this, value);
        this._createData();
    },
    setText: function (value) {
        mini.ux.Comboboxtab.superclass.setText.call(this, value);
        this._createData();
    },

    __OnShowPopup: function (e) {

        var vsb = String(this.value).split(this.delimiter);
        var vs = {};
        for (var i = 0, l = vsb.length; i < l; i++) {
            var v = vsb[i];
            vs[v] = 1;
        }

        this.tabs.activeTab(this.tabs.tabs[this.tabs.activeIndex]);


    },



    doUpdate: function () {
        mini.ux.Comboboxtab.superclass.doUpdate.call(this);
        this._textEl.readOnly = true;
        this.el.style.cursor = "default";

    },
    __OnInputKeyDown: function (e) {
        mini.ux.Comboboxtab.superclass.__OnInputKeyDown.call(this, e);

        switch (e.keyCode) {
            case 46:
            case 8:

                break;
            case 37:

                break;
            case 39:

                break;
        }







    },
    __OnMouseUp: function (e) {
        if (this.isReadOnly()) return;


        var rg = mini.getSelectRange(this._textEl);
        var start = rg[0], end = rg[1];


        var index = this._findTextIndex(start);


    },
    _findTextIndex: function (rgIndex) {
        var index = -1;
        if (this.text == "") return index;

        var texts = String(this.text).split(this.delimiter);
        var len = 0;
        for (var i = 0, l = texts.length; i < l; i++) {
            var text = texts[i];
            if (len < rgIndex && rgIndex <= len + text.length) {
                index = i;
                break;
            }
            len = len + text.length + 1;
        }
        return index;
    },


    getAttrs: function (el) {
        var attrs = mini.ux.Comboboxtab.superclass.getAttrs.call(this, el);

        mini._ParseString(el, attrs,
            ["tabs", "valueField", "textField"
             ]
        );
        mini._ParseBool(el, attrs,
            ["multiSelect"
             ]
        );

        return attrs;
    }
});
mini.regClass(mini.ux.Comboboxtab, 'ux.comboboxtab');






















































WebUploader.Uploader.register({
    'before-send': 'checkchunk',    /*大文件分片MD5验证*/
    'before-send-file': 'preupload' /* 上传文件MD5验证 */
}, {
    checkchunk: function (block) {
        var me = this, owner = this.owner;
        if (owner.options.chunked) {
            var fileBlocks = block.cuted.file.blocks;
            var file = block.cuted.file;
            var deferred = WebUploader.Deferred();

            owner.md5File(block.blob).fail(function () {// 如果读取出错了，则通过reject告诉webuploader文件上传出错。
                deferred.reject();
            })
			.then(function (md5) { // md5值计算完成
			    if (owner.options.chunkList && owner.options.chunkList[md5]) {
			        deferred.reject();
			    } else {
			        owner.options.formData.chunkmd5 = md5;
			        // 与服务安验证
			        if (block.chunk == 0 && block.chunks == 1) {
			            deferred.resolve();
			        } else {

			            $.ajax(owner.options.existChunkServer, {
			                type: "GET",
			                dataType: 'jsonp',
			                jsonp: "callback",
			                data: {
			                    chunk: block.chunk,
			                    chunks: block.chunks,
			                    start: block.start,
			                    end: block.end,
			                    total: block.total,
			                    fingerPrint: md5,
			                    uid: owner.options.formData.uid,
			                    businessCode: owner.options.formData.businessCode,
			                    appkey: owner.options.formData.appkey,
			                    prodID: owner.options.formData.prodID
			                },
			                success: function (response) {
			                    // 如果验证已经上传过
			                    if (response.exist) {
			                        deferred.reject();
			                    } else {
			                        deferred.resolve();
			                    }
			                }
			            });
			        }
			    }
			});
            return deferred.promise();
        }
    },
    preupload: function (file) {
        var me = this, owner = this.owner;
        var existFileServer = owner.options.existFileServer, deferred = WebUploader.Deferred();
        owner.md5File(file.source)
			.progress(function (percentage) {
			    if ($.isFunction(owner.options.onComputeFingerPrintProgress)) {
			        owner.options.onComputeFingerPrintProgress(percentage);
			    };
			})
			.fail(function () {// 如果读取出错了，则通过reject告诉webuploader文件上传出错。
			    deferred.reject();
			})
			.then(function (md5) {// md5值计算完成
			    owner.options.formData.md5 = md5;
			    file.md5 = md5;
			    $.ajax(existFileServer, {
			        type: "GET",
			        dataType: 'jsonp',
			        jsonp: "callback",
			        data: {
			            appKey: owner.options.formData.appKey,
			            prodID: owner.options.formData.prodID,
			            businessCode: owner.options.formData.businessCode,
			            fingerPrint: md5
			        },
			        success: function (response) {
			            if (response.exist) {// 如果验证已经上传过
			                owner.options.chunkList = response.chunklist;
			                file.fileID = response.message;
			                if (response.chunksallupload) {//分片全部上传完毕
			                    owner.skipFile(file);
			                };
			            } else {
			                file.fileID = null;
			                //文件上传成功后给fileID赋值。
			                mini.on(this._borderEl, "mousemove", this.__OnMouseMove, this);
			            }
			            deferred.resolve();
			        }
			    });
			});
        return deferred.promise();
    }
});


mini.ux.FileUpload = function (config) {
    this._initConfig();

    mini.ux.FileUpload.superclass.constructor.call(this, config);

    mini.on(this._closeEl, "click", this.__OnCloseClick, this);

    this.on("validation", this.__OnValidation, this);
};
mini.extend(mini.ux.FileUpload, mini.ButtonEdit, {

    businessCode: '',
    appKey: '',
    prodID: '',
    multiSelect: false,
    mimeTypes: "",

    buttonText: "浏览...",
    _buttonWidth: 56,

    limitTypeErrorText: "上传文件格式为：",
    readOnly: true,
    _cellSpacing: 0,

    limitSize: '',
    limitType: '',
    typesDescription: '上传文件格式',
    uploadLimit: 0,
    queueLimit: '',
    flashUrl: '',
    uploadUrl: '',
    showUploadProgress: true,
    postParam: null,

    showClose: true,
    uploadOnSelect: true,

    uiCls: "mini-ux-fileupload",
    _initConfig: function () {
        if (!this.pageController && window.pageController) {
            this.pageController = pageController;
            this.flashUrl = window.webSiteRootUrl + "resources/scripts/webUploader/uploader.swf";
            this.uploadUrl = this.pageController.fileUploadSettings.serviceUrl;
            this.postParam = {
                uid: WebUploader.guid(),
                appKey: this.pageController.fileUploadSettings.appKey,
                prodID: this.pageController.fileUploadSettings.prodID,
                businessCode: this.businessCode,
                ticket: this.pageController.ticket
            };
        };
    },
    _create: function () {
        //        this.el = document.createElement("div");
        //        this.el.className = "mini-toolbar";


        mini.ux.FileUpload.superclass._create.call(this);

        mini.addClass(this.el, "mini-htmlfile");

        this._textEl = this.getTextEl();
        this._textEl.style.display = "none";
        this._textEl = mini.append(this._borderEl, '<span class="mini-buttonedit-input"><table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:middle;"></td></tr></table></span>');
        this._textTdEl = this._textEl.firstChild.firstChild.firstChild.firstChild;
        //this._textTdEl.style.display = "none";

        var progressBar = new mini.ProgressBar();
        progressBar.set({
            width: "100%"
        });
        progressBar.render(this.el);
        progressBar.hide();
        this.progressBar = progressBar;

        mini.on(this._borderEl, "mousemove", this.__OnMouseMove, this);
    },
    __OnValidation: function (e) {
        if (e.isValid == false) return;
        if (this.required == false && e.value == "") return;
    },
    setValue: function (value, text) {
        this._initConfig();
        var me = this;
        if (value === null || value === undefined) value = "";
        var fire = this.value !== value;
        this.value = value;
        //this._valueEl.value = this.getFormValue();
        //this.setText(text);
        this._textTdEl.innerHTML = "";

        if (fw.fwObject.FWObjectHelper.hasValue(value)) {
            var innerHTML, fileUrl = this.getFileUrl();
            var downloadUrl = fw.fwUrl.FWUrlHelper.getAbsoluteUrl("web/fw/file/download.htm", me.pageController.webSiteRootUrl);
            downloadUrl = fw.fwUrl.FWUrlHelper.addParams(downloadUrl, {
                fileUrl: fileUrl
            });
            if (this.mimeTypes.toLowerCase().indexOf("image") > -1) {
                var maxWidth = $(me._textEl).width();
                var maxHeight = $(me._textTdEl).height();
                downloadUrl = fw.fwUrl.FWUrlHelper.addParams(downloadUrl, { fileExtension: "png" });
                innerHTML = '<a href="' + downloadUrl + '" target="_blank"><img src="' + fileUrl + '" style="max-width:' + maxWidth + 'px; max-height:' + maxHeight + 'px"></a>';
                if (maxWidth <= 0 || maxHeight <= 0) {
                    setTimeout(function () {
                        var maxWidth = $(me._textEl).width();
                        var maxHeight = $(me._textTdEl).height();
                        $("img", me._textTdEl).css({
                            "max-width": maxWidth + 'px'
                            , "max-height": maxHeight + 'px'
                        });
                    }, 2);
                };
            } else {
                innerHTML = '<a href="' + downloadUrl + '" target="_blank"><span>' + (!text ? "下载" : text) + '</span></a>';
                if (!text) {
                    $.ajax(this.__getQueryServer(), {
                        type: "GET",
                        dataType: 'jsonp',
                        jsonp: "callback",
                        data: {
                            appKey: this.postParam.appKey,
                            prodID: this.postParam.prodID,
                            businessCode: this.postParam.businessCode,
                            fileID: this.value
                        },
                        success: function (response) {
                            if (response.file) {
                                var aJQ = $(">a", me._textTdEl);
                                aJQ.attr("href", fw.fwUrl.FWUrlHelper.addParams(aJQ.attr("href"), { fileExtension: response.file.fileExtension }));
                                $(">span", aJQ).html(response.file.fileName);
                            };
                        }
                    });
                };
            };
            this._textTdEl.innerHTML = innerHTML;
        };
    },
    selectText: function () {
        //调用父类中该方法会报错，所以注释该代码，不受影响
        //this._textEl.select();
        if (this.webUploader) {
            //按钮文本需要还原到原控件
            this._buttonEl.innerHTML = this._buttonEl.innerText;
            if (this.webUploader) {
                try {
                    this.webUploader.destroy();
                } catch (ex) {
                };
                this.webUploader = null;
                delete this.webUploader;
            }
        };
    },
    _getButtonHtml: function () {
        var hover = 'onmouseover="mini.addClass(this, \'' + this._buttonHoverCls + '\');" '
                        + 'onmouseout="mini.removeClass(this, \'' + this._buttonHoverCls + '\');"';
        return '<span class="mini-buttonedit-button" ' + hover + '>' + this.buttonText + '</span>';
    },
    destroy: function (removeEl) {
        if (this._innerEl) {
            mini.clearEvent(this._innerEl);

            this._innerEl = null;
        }
        if (this.webUploader) {
            this.webUploader.destroy();
            this.webUploader = null;
        }
        delete this.pageController;
        delete this.progressBar;
        mini.ux.FileUpload.superclass.destroy.call(this, removeEl);
    },
    __OnCloseClick: function (evt) {
        if (!this.webUploader.options.pick.multiple) {
            var files = this.webUploader.getFiles();
            for (var i = 0; i < files.length; i++) {
                this.webUploader.removeFile(files[i]);
            };
            files = null;
        };
        var fileID = this.getValue();
        this.setValue("");
        this.setText("");
        if (fw.fwObject.FWObjectHelper.hasValue(fileID)) {
            $.ajax(this.__getRemoveServer(), {
                type: "GET",
                dataType: 'jsonp',
                jsonp: "callback",
                data: {
                    appKey: this.postParam.appKey,
                    prodID: this.postParam.prodID,
                    businessCode: this.postParam.businessCode,
                    fileID: fileID
                },
                success: function (response) {

                }
            });
        };
    }
    , getFileUrl: function () {
        var url = this.__getDownloadServer() + '?appKey=' + this.postParam.appKey + "&prodID=" + this.postParam.prodID + "&ticket=" + this.pageController.ticket + "&fileID=" + this.value;
        return url;
    }
    , __getExistFileServer: function () {
        return this.uploadUrl + 'service/sys/file/upload/existFile';
    }
    , __getExistChunkServer: function () {
        return this.uploadUrl + 'service/sys/file/upload/existChunk';
    }
    , __getUploadServer: function () {
        return this.uploadUrl + 'service/sys/file/upload/upload';
    }
    , __getQueryServer: function () {
        return this.uploadUrl + 'service/sys/file/upload/query';
    }
    , __getRemoveServer: function () {
        return this.uploadUrl + 'service/sys/file/upload/remove';
    }
    , __getDownloadServer: function () {
        return this.uploadUrl + 'service/sys/file/upload/download';
    },
    __OnMouseMove: function (evt) {
        this._initConfig();

        if (this.enabled == false) return;
        var sf = this;

        if (!this.webUploader) {
            var options = {
                formData: this.postParam,

                chunkList: [], //断点续传

                existFileServer: this.__getExistFileServer(),
                existChunkServer: this.__getExistChunkServer(),
                queryServer: this.__getQueryServer(),
                removeServer: this.__getRemoveServer(),
                downloadServer: this.__getDownloadServer(),
                onComputeFingerPrintProgress: mini.createDelegate(this.__on_computeFingerPrint_progress, this),

                pick: {
                    id: this._buttonEl,
                    multiple: this.multiSelect
                },
                accept: {
                    extensions: this.limitType
                    , mimeTypes: this.mimeTypes
                },
                swf: this.flashUrl,
                server: this.__getUploadServer(),
                chunked: true, 	//分片上传
                resize: false,
                compress: false, 	//不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                fileSingleSizeLimit: this.limitSize,
                onFileQueued: mini.createDelegate(this.__on_file_queued, this),
                onUploadError: mini.createDelegate(this.__on_upload_error, this),
                onUploadSuccess: mini.createDelegate(this.__on_upload_success, this),
                onUploadComplete: mini.createDelegate(this.__on_upload_complete, this),
                onUploadProgress: mini.createDelegate(this.__on_upload_progress, this),
                onError: mini.createDelegate(this.__on_file_queued_error, this)
            };
            var extensions = this.limitType;
            if (fw.fwObject.FWObjectHelper.hasValue(extensions)) {
                extensions = fw.fwString.FWStringHelper.replaceAll(extensions, "*", "");
                extensions = fw.fwString.FWStringHelper.replaceAll(extensions, ".", "");
                extensions = fw.fwString.FWStringHelper.replaceAll(extensions, ";", ",");
                options.accept.extensions = extensions;
            };
            //options.accept = {
            //    extensions: 'gif,jpg,jpeg,bmp,png',
            //    mimeTypes: 'image/*'
            //};
            var fileSingleSizeLimit = this.limitSize;
            if (fw.fwObject.FWObjectHelper.hasValue(fileSingleSizeLimit)) {
                fileSingleSizeLimit = fw.fwString.FWStringHelper.replaceAll(fileSingleSizeLimit, "GB", "*1024MB");
                fileSingleSizeLimit = fw.fwString.FWStringHelper.replaceAll(fileSingleSizeLimit, "MB", "*1024KB");
                fileSingleSizeLimit = fw.fwString.FWStringHelper.replaceAll(fileSingleSizeLimit, "KB", "*1024");
                eval("fileSingleSizeLimit=" + fileSingleSizeLimit);
                options.fileSingleSizeLimit = fileSingleSizeLimit;
            } else {
                delete options.fileSingleSizeLimit;
            };

            var webUploader = WebUploader.create(options);
            this.webUploader = webUploader;

            setTimeout(function () {
                $(">div>:file", sf._buttonEl).hide();
                $(">div", sf._buttonEl).css({
                    "z-index": 10,
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: "100%",
                    height: "100%"
                });
            }, 1);


            //            this.uploadEl.style.zIndex = 11;
            //            this.uploadEl.style.position = "absolute";
            //            this.uploadEl.style.left = "0px";
            //            this.uploadEl.style.top = "0px";
            //            this.uploadEl.style.width = "100%";
            //            this.uploadEl.style.height = this.getHeight() + "px";

            this.progressBar.setHeight(this.getHeight());
            $("div", this.progressBar.el).height(this.getHeight());

        } else {

        }
    },
    addPostParam: function (value) {
        mini.copyTo(this.postParam, value);
    },
    setPostParam: function (value) {
        this.addPostParam(value);
    },
    getPostParam: function () {
        return this.postParam;
    },
    setLimitType: function (value) {
        this.limitType = value;



        if (this.webUploader) this.webUploader.setFileTypes(this.limitType, this.typesDescription);
    },
    getLimitType: function () {
        return this.limitType;
    },
    setTypesDescription: function (str) {
        this.typesDescription = str;



        if (this.webUploader) this.webUploader.setFileTypes(this.limitType, this.typesDescription);
    },
    getTypesDescription: function () {
        return this.typesDescription;
    },
    setButtonText: function (value) {
        this.buttonText = value;
        this._buttonEl.innerHTML = value;
    },
    getButtonText: function () {
        return this.buttonText;
    },

    setUploadLimit: function (value) {
        this.uploadLimit = value;
    },

    setQueueLimit: function (value) {
        this.queueLimit = value;
    },
    setFlashUrl: function (value) {
        this.flashUrl = value;
    },

    setUploadUrl: function (value) {
        if (this.webUploader) {
            this.webUploader.setUploadURL(value);
        }
        this.uploadUrl = value
    },
    getUploadUrl: function () {
        return this.uploadUrl;
    },

    setName: function (value) {
        this.name = value;
    },

    startUpload: function (params) {
        var e = { cancel: false };
        this.fire("beforeupload", e);
        if (e.cancel == true) return;
        if (this.webUploader) {
            //this.webUploader.setPostParams(this.postParam);
            this.webUploader.upload();
        }
    },
    setShowUploadProgress: function (value) {
        this.showUploadProgress = value;
        this._progressbarEl.style.display = value ? "block" : "none";
    },
    getShowUploadProgress: function () {
        return this.showUploadProgress;
    },
    __on_computeFingerPrint_progress: function (complete) {
        if (this.showUploadProgress) {
            if (complete < 1) {
                this.progressBar.set({
                    format: "文件过大，安全校验中...{0}%"
                });
                var width = fw.fwNumber.FWNumberHelper.toString(complete * 100, "#.00");
                this.progressBar.setValue(width);
                this.progressBar.show();
            } else {
                this.progressBar.set({
                    format: "文件上传中...{0}%"
                });
            };
        };
    },
    __on_upload_progress: function (file, complete, total) {
        if (this.showUploadProgress) {
            if (complete < 1) {
                var width = fw.fwNumber.FWNumberHelper.toString(complete * 100, "#.00");
                this.progressBar.setValue(width);
                this.progressBar.show();
            } else {
                this.progressBar.hide();
            };
        };

        var e = { file: file, complete: complete, total: total };
        this.fire("uploadprogress", e);
    },

    __on_file_queued_error: function (file, code, msg) {
        var errorText;
        switch (file) {
            case "F_EXCEED_SIZE":
                errorText = "上传文件的大小不能大于" + fw.fwNumber.FWNumberHelper.toFileSize(code);
                break;
            case "Q_TYPE_DENIED":
                errorText = "上传文件的类型必须是" + this.webUploader.options.accept[0].extensions;
                break;
            default:
                errorText = "未知错误:" + file;
                break;
        };
        alert(errorText);
        var e = { file: file, code: code, msg: msg };
        this.fire("queuederror", e);
    },

    __on_file_queued: function (file) {

        if (!this.webUploader.options.pick.multiple) {
            var files = this.webUploader.getFiles();
            for (var i = 0; i < files.length; i++) {
                if (!(files[i].id == file.id)) {
                    this.webUploader.removeFile(files[i]);
                };
            };
            files = null;
        };


        var len = this.webUploader.getStats().queueNum;

        if (len > 1) {
            for (var i = 0; i < len - 1; i++) {
                this.webUploader.cancelUpload();
            }
        }

        var e = { file: file };




        if (this.uploadOnSelect) {
            this.startUpload();
        }
        this.setText(file.name);

        this.fire("fileselect", e);
    },
    __on_upload_success: function (file, serverData) {
        var me = this;
        //文件上传成功后给fileID赋值。最新一条附件时，判断是否返回fileID
        if (fw.fwObject.FWObjectHelper.hasValue(file.fileID)) {
            var e = { file: file, serverData: serverData };
        } else {
            file.fileID = serverData.message.fileID;
            var e = { file: file, serverData: serverData };
        }
        ////////////////////////////////////////////////////

        this.setValue(file.fileID || serverData.message.fileID, file.name);
        this.fire("uploadsuccess", e);

        if (fw.fwObject.FWObjectHelper.hasValue(file.fileID)) {
            this.progressBar.setValue(100);
            setTimeout(function () {
                me.progressBar.hide();
            }, 1024);
        } else {
            this.progressBar.hide();
        };
    },
    __on_upload_error: function (file, code, message) {
        if (message == "File Cancelled") return;

        //        this._progressbarEl.style.display = "none";

        var e = { file: file, code: code, message: message };

        this.fire("uploaderror", e);

        this.progressBar.hide();
    },
    __on_upload_complete: function (e) {
        this.fire("uploadcomplete", e);
    },
    __fileError: function () {

    },

    getAttrs: function (el) {
        var attrs = mini.ux.FileUpload.superclass.getAttrs.call(this, el);

        attrs.buttonText = "浏览...";
        attrs.showClose = true;

        mini._ParseString(el, attrs,
            ["limitType", "limitSize", "flashUrl", "uploadUrl", "uploadLimit", "buttonText", "showUploadProgress",
                "onuploadsuccess", "onuploaderror", "onuploadcomplete", "onfileselect", "onuploadprogress",
                "onqueuederror", "mimeTypes", "businessCode", "appKey", "prodID"
             ]
        );

        mini._ParseBool(el, attrs,
            ["uploadOnSelect", "multiSelect"
             ]
        );

        return attrs;
    }
});
mini.regClass(mini.ux.FileUpload, "ux.fileupload");
