(function (window, undefined) {

    var _page = window.page;
    page = {
        webSiteRootUrl: window.webSiteRootUrl,
        serviceSiteRootUrl: window.webSiteRootUrl,
        params: {},
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            ;
            return null;
        },
        encode: function (value) {
            if (fw.fwObject.FWObjectHelper.hasValue(value)) {
                value = page.fwString.FWStringHelper.replaceAll(encodeURIComponent(value), "%3D", "%3d");
            }
            ;
            return value;
        },
        decode: function (value) {
            if (fw.fwObject.FWObjectHelper.hasValue(value)) {
                value = decodeURIComponent(value);
            }
            ;
            return value;
        },
        FWResultStatus: {
            ValidateError: -4 // 业务验证错误
            ,
            Error: -3  // 出错 
            ,
            NoRight: -2 // 没有权限 
            ,
            LoginOut: -1  // 登入超时（未登入） 
            ,
            Failure: 0  // 失败 
            ,
            Success: 1  // 成功 
            ,
            Frequently: 2  //频繁操作
        }
        //#region Json  序列化
        ,
        JsonFormatMode: {
            ToString: 0 // Json字符串（单行）。      
            ,
            ToFormatString: 1 // Json字符串（有换行符的格式化）。     
            ,
            ToHTML: 2  //HTML字符串。
            ,
            ToXML: 3  // XML字符串。
        },
        JsonMode: {
            View: 0    //     查看模式。 
            ,
            Edit: 1   //     修改模式。
        },
        _SerializeObject: function (Properties) {
            /// <summary>
            ///     把对象序列化为Json字符串
            ///     1: page.fwJson.FWJsonHelper._SerializeObject(value)。
            /// </summary>
            /// <param type="Object" name="value">对象</param>
            /// <param type="Boolean" name="IsUseCustomFormat">是否使用自定义格式化</param>
            ///	<returns type="String">Json字符串</returns>
            var Settings = {
                Value: null,
                IsUseCustomFormat: false,
                FormatMode: this.JsonFormatMode.ToString,
                Level: 0
            };
            if (!fw.fwObject.FWObjectHelper.hasValue(Properties)) {
                Properties = {};
            }
            ;
            $.extend(Settings, Properties);
            var value = Settings.Value;
            var IsUseCustomFormat = Settings.IsUseCustomFormat
            var FormatMode = Settings.FormatMode;
            var Level = Settings.Level;

            var Space = "";
            var Space_Plus1 = "";
            switch (FormatMode) {
                case this.JsonFormatMode.ToFormatString:
                    for (var i = 0; i < Level; i++) {
                        Space += "    ";
                    }
                    ;
                    for (var i = 0; i < Level + 1; i++) {
                        Space_Plus1 += "    ";
                    }
                    ;
                    break;
                case this.JsonFormatMode.ToHTML:
                    for (var i = 0; i < Level; i++) {
                        Space += "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                    ;
                    for (var i = 0; i < Level + 1; i++) {
                        Space_Plus1 += "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                    ;
                    break;
            }
            ;

            switch (Object.prototype.toString.apply(value)) {
                case "[object String]":
                    if (IsUseCustomFormat && value.indexOf("/Date(") > -1) {
                        return "\"" + value.ToDate().ToString("yyyy-MM-dd HH:mm:ss") + "\"";
                    } else if (value.indexOf("/Date(") == 0 && value.lastIndexOf(")/") == (value.length - 2) && value.length == 21) {
                        return "\"" + value.replace(/\//g, "\\/") + "\"";
                    } else {
                        return "\"" + value.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
                            var a = arguments[0];
                            return (a == "\n") ? "\\n" : (a == "\r") ? "\\r" : (a == "\t") ? "\\t" : ""
                        }) + "\"";
                    }
                    ;
                case "[object Number]":
                    return value;
                case "[object Boolean]":
                    return value;
                case "[object Date]":
                    return "\"" + moment(value).format('YYYY-MM-DD hh:mm:ss ') + "\"";
                case "[object Object]":
                    if (value == undefined || value == null) {
                        return null;
                    } else {
                        var valueArray = [];
                        for (var i in value) {
                            switch (FormatMode) {
                                case this.JsonFormatMode.ToString:
                                    valueArray.push("\"" + i + "\":" + this._SerializeObject({
                                        Value: value[i],
                                        IsUseCustomFormat: IsUseCustomFormat,
                                        FormatMode: FormatMode,
                                        Level: Level + 1
                                    }));
                                    break;
                                case this.JsonFormatMode.ToFormatString:
                                    valueArray.push(Space_Plus1 + "\"" + i + "\": " + this._SerializeObject({
                                        Value: value[i],
                                        IsUseCustomFormat: IsUseCustomFormat,
                                        FormatMode: FormatMode,
                                        Level: Level + 1
                                    }));
                                    break;
                                case this.JsonFormatMode.ToHTML:
                                    valueArray.push("<br /><span>" + Space_Plus1 + "</span><span class=\"TL_Json_Property\">\"" + i + "\"</span><span class=\"TL_Json_Colon\">: </span><span class=\"TL_Json_Value\">"
                                + this._SerializeObject({
                                    Value: value[i],
                                    IsUseCustomFormat: IsUseCustomFormat,
                                    FormatMode: FormatMode,
                                    Level: Level + 1
                                }) + "</span>");
                                    break;
                            }
                            ;
                        }
                        ;
                        if (valueArray.length > 0) {
                            switch (FormatMode) {
                                case this.JsonFormatMode.ToString:
                                    return '{' + valueArray.join(',') + '}';
                                    break;
                                case this.JsonFormatMode.ToFormatString:
                                    return '{\n' + valueArray.join(',\n') + '\n' + Space + '}';
                                    break;
                                case this.JsonFormatMode.ToHTML:
                                    return '<span class=\"TL_Json_Braces\">{</span><span class=\"TL_Json_NodeToggle\"></span><span class=\"TL_Json_Nodes\">' + valueArray.join('<span class=\"TL_Json_Comma\">,</span>') + '</span><br /><span>' + Space + '</span><span class=\"TL_Json_Braces\">}</span>';
                                    break;
                            }
                            ;
                        } else {
                            switch (FormatMode) {
                                case this.JsonFormatMode.ToString:
                                    return '{}';
                                    break;
                                case this.JsonFormatMode.ToFormatString:
                                    return '{}';
                                    break;
                                case this.JsonFormatMode.ToHTML:
                                    return '<span class=\"TL_Json_Braces\">{</span><span class=\"TL_Json_Braces\">}</span>';
                                    break;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                case "[object Array]":
                    var valueArray = [];
                    for (var i = 0; i < value.length; i++) {
                        switch (FormatMode) {
                            case this.JsonFormatMode.ToString:
                                valueArray.push(this._SerializeObject({
                                    Value: value[i],
                                    IsUseCustomFormat: IsUseCustomFormat,
                                    FormatMode: FormatMode,
                                    Level: Level + 1
                                }));
                                break;
                            case this.JsonFormatMode.ToFormatString:
                                valueArray.push(Space_Plus1 + this._SerializeObject({
                                    Value: value[i],
                                    IsUseCustomFormat: IsUseCustomFormat,
                                    FormatMode: FormatMode,
                                    Level: Level + 1
                                }));
                                break;
                            case this.JsonFormatMode.ToHTML:
                                valueArray.push("<br /><span>" + Space_Plus1 + "</span>" + this._SerializeObject({
                                    Value: value[i],
                                    IsUseCustomFormat: IsUseCustomFormat,
                                    FormatMode: FormatMode,
                                    Level: Level + 1
                                }));
                                break;
                        }
                        ;
                    }
                    ;
                    if (valueArray.length > 0) {
                        switch (FormatMode) {
                            case this.JsonFormatMode.ToString:
                                return "[" + valueArray.join(',') + "]";
                                break;
                            case this.JsonFormatMode.ToFormatString:
                                return "[\n" + valueArray.join(',\n') + "\n" + Space + "]";
                                break;
                            case this.JsonFormatMode.ToHTML:
                                return "<span class=\"TL_Json_Brackets\">[</span><span class=\"TL_Json_NodeToggle\"></span><span class=\"TL_Json_Nodes\">" + valueArray.join('<span class=\"TL_Json_Comma\">,</span>') + "</span><br /><span>" + Space + "</span><span class=\"TL_Json_Brackets\">]</span>";
                                break;
                        }
                        ;
                    } else {
                        switch (FormatMode) {
                            case this.JsonFormatMode.ToString:
                                return "[]";
                                break;
                            case this.JsonFormatMode.ToFormatString:
                                return "[]";
                                break;
                            case this.JsonFormatMode.ToHTML:
                                return "<span class=\"TL_Json_Brackets\">[</span><span class=\"TL_Json_Brackets\">]</span>";
                                break;
                        }
                        ;
                    }
                    ;
                case "[object Null]":
                    return null;
                case "[object Undefined]":
                    return null;
                case "[object Function]":
                    return null;
                case "[object DOMWindow]":
                    return null;
                case "[object global]":
                    return null;
                default:
                    alert(value.toString() + "_SerializeObject发现未知类型！" + Object.prototype.toString.apply(value));
                    break;
            }
            ;
        },
        __SerializeObject: function (Properties) {
            /// <summary>
            ///     把对象序列化为Json字符串
            ///     1: page.fwJson.FWJsonHelper._SerializeObject(value)。
            /// </summary>
            /// <param type="Object" name="value">对象</param>
            /// <param type="Boolean" name="IsUseCustomFormat">是否使用自定义格式化</param>
            ///	<returns type="String">Json字符串</returns>
            var Settings = {
                Value: null,
                IsUseCustomFormat: false,
                FormatMode: this.JsonFormatMode.ToString
            };
            if (!fw.fwObject.FWObjectHelper.hasValue(Properties)) {
                Properties = {};
            }
            ;
            $.extend(Settings, Properties);
            var value = Settings.Value;
            var IsUseCustomFormat = Settings.IsUseCustomFormat;
            var FormatMode = Settings.FormatMode;

            switch (Object.prototype.toString.apply(value)) {
                case "[object String]":
                    if (IsUseCustomFormat && value.indexOf("/Date(") > -1) {
                        return "\"" + value.ToDate().ToString("yyyy-MM-dd HH:mm:ss") + "\"";
                    } else if (value.indexOf("/Date(") == 0 && value.lastIndexOf(")/") == (value.length - 2) && value.length == 21) {
                        return "\"" + value.replace(/\//g, "\\/") + "\"";
                    } else {
                        return "\"" + value.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
                            var a = arguments[0];
                            return (a == "\n") ? "\\n" : (a == "\r") ? "\\r" : (a == "\t") ? "\\t" : ""
                        }) + "\"";
                    }
                    ;
                case "[object Number]":
                    return value;
                case "[object Boolean]":
                    return value;
                case "[object Object]":
                    if (value == undefined || value == null) {
                        return null;
                    } else {
                        var valueArray = [];
                        for (var i in value) {
                            valueArray.push("\"" + i + "\":" + this._SerializeObject({
                                Value: value[i],
                                IsUseCustomFormat: IsUseCustomFormat,
                                FormatMode: FormatMode
                            }));
                        }
                        ;
                        return '{' + valueArray.join(',') + '}';
                    }
                    ;
                case "[object Array]":
                    var valueArray = [];
                    for (var i = 0; i < value.length; i++) {
                        valueArray.push(this._SerializeObject({
                            Value: value[i],
                            IsUseCustomFormat: IsUseCustomFormat,
                            FormatMode: FormatMode
                        }));
                    }
                    ;
                    return "[" + valueArray.join(',') + "]";
                case "[object Null]":
                    return null;
                case "[object Undefined]":
                    return null;
                case "[object Function]":
                    return null;
                case "[object DOMWindow]":
                    return null;
                case "[object global]":
                    return null;
                default:
                    alert(value.toString() + "_SerializeObject发现未知类型！" + Object.prototype.toString.apply(value));
                    break;
            }
            ;
        },
        serializeObject: function (value, IsUseCustomFormat, FormatMode) {
            /// <summary>
            ///     把对象序列化为Json字符串
            ///     1: page.fwJson.FWJsonHelper.SerializeObject(value)。
            /// </summary>
            /// <param type="Object" name="value">对象</param>
            /// <param type="Boolean" name="IsUseCustomFormat">是否使用自定义格式化</param>
            /// <param type="Number" name="FormatMode">格式化方式</param>
            ///	<returns type="String">Json字符串</returns>
            if (!fw.fwObject.FWObjectHelper.hasValue(IsUseCustomFormat)) {
                IsUseCustomFormat = false;
            }
            ;
            if (!fw.fwObject.FWObjectHelper.hasValue(FormatMode)) {
                FormatMode = this.JsonFormatMode.ToString;
            }
            ;
            return this._SerializeObject({
                Value: value,
                IsUseCustomFormat: IsUseCustomFormat,
                FormatMode: FormatMode
            });
        },
        deserializeObject: function (value, CatchValue) {
            /// <summary>
            ///     Json字符串反序列化为对象
            ///     1: page.fwJson.FWJsonHelper.DeserializeObject(value)。
            /// </summary>
            /// <param type="String" name="value">对象Json字符串</param>
            /// <param type="Object" name="CatchValue">反序列化失败时，返回的值</param>
            ///	<returns type="Object">对象</returns>
            if (fw.fwObject.FWObjectHelper.hasValue(CatchValue) && !fw.fwObject.FWObjectHelper.hasValue(value)) {
                value = CatchValue;
            }
            ;
            try {
                value = eval("(" + value + ")");
            } catch (ex) {
            }
            ;
            return value;
        },
        copyObject: function (value) {
            /// <summary>
            ///     对象复制
            ///     1: page.fwJson.FWJsonHelper.CopyObject(value)。
            /// </summary>
            /// <param type="Object" name="value">对象</param>
            ///	<returns type="Object"></returns>
            return this.deserializeObject(this.serializeObject(value));
        }
        //#endregion
        ,
        getDomain: function (value) {
            if (value.indexOf("file:///") == 0) {
                return "file:///";
            } else {
                var reg = new RegExp("^((http|https)://[^/]+).([/])");
                return value.match(reg)[0];
            }
            ;
        },
        getParams: function (url, c) {
            if (!url) {
                url = location.href;
            }
            ;
            if (!c) {
                c = "?";
            }
            ;
            if (url.indexOf(c) == -1) {
                url = url.split(c)[0];
            } else {
                url = url.split(c)[1];
            }
            ;
            this.params = {};
            if (url) {
                var us = url.split("&");
                for (var i = 0, l = us.length; i < l; i++) {
                    var ps = us[i].split("=");
                    this.params[this.decode(ps[0])] = this.decode(ps[1]);
                }
                ;
            }
            ;
            return this.params;
        },
        getAjaxSettings: function (properties) {
            var me = this;
            var settings = {
                serviceType: "",
                serviceName: "",
                methodName: "",
                data: null,
                success: function () {
                }
            };
            $.extend(settings, properties);
            switch (settings.serviceType) {
                case "crossDomainCall":
                    settings.serviceSiteRootUrl = this.serviceSiteRootUrl;
//                    settings.url = this.serviceSiteRootUrl + "service/" + settings.serviceName + "/" + settings.methodName;
                    settings.type = settings.type ? settings.type : "GET";
                    settings.dataType = settings.dataType ? settings.dataType : "jsonp";
                    settings.jsonp = settings.jsonp ? settings.jsonp : "callback";
                    settings.data = settings.data;
                    //settings.data.ticket = this.ticket;
                    for (var item in settings.data) {
                        var type = Object.prototype.toString.apply(settings.data[item]);
                        if (type == "[object Object]" || type == "[object Array]") {
                            settings.data[item] = this.serializeObject(settings.data[item]);
                        }
                        ;
                    }
                    ;
                    if (this.getDomain(this.serviceSiteRootUrl) == this.getDomain(this.webSiteRootUrl)) {
                        settings.type = "POST";
                        delete settings.dataType;
                    }
                    ;
                    break;
                default:
                    if ($.pageCustomer != null && $.isFunction($.pageCustomer.getCustomerAjaxSettings)) {
                        settings = $.pageCustomer.getCustomerAjaxSettings(settings);
                    }
                    ;
                    break;
            }
            ;
            return settings;
        },
        ajax: function (ajaxSettings) {
            if ($.isFunction(ajaxSettings.beforeSend)) {
                ajaxSettings.uiBeforeSend = ajaxSettings.beforeSend;
                delete ajaxSettings.beforeSend;
            }
            ;
            if ($.isFunction(ajaxSettings.success)) {
                ajaxSettings.uiSuccess = ajaxSettings.success;
                delete ajaxSettings.success;
            }
            ;
            if ($.isFunction(ajaxSettings.error)) {
                ajaxSettings.uiError = ajaxSettings.error;
                delete ajaxSettings.error;
            }
            ;
            if ($.isFunction(ajaxSettings.complete)) {
                ajaxSettings.uiComplete = ajaxSettings.complete;
                delete ajaxSettings.complete;
            }
            ;
            $.ajax(ajaxSettings);
        },
        ajaxUrl: function (properties) {
            var settings = {
                url: "",
                data: null,
                success: function () {
                }
            };
            $.extend(settings, properties);
            settings.type = settings.type ? settings.type : "GET";
            settings.dataType = settings.dataType ? settings.dataType : "jsonp";
            settings.jsonp = settings.jsonp ? settings.jsonp : "callback";
            settings.data = settings.data;
            //settings.data.ticket = this.ticket;
            for (var item in settings.data) {
                var type = Object.prototype.toString.apply(settings.data[item]);
                if (type == "[object Object]" || type == "[object Array]") {
                    settings.data[item] = this.serializeObject(settings.data[item]);
                }
                ;
            }
            ;
            if (this.getDomain(this.serviceSiteRootUrl) == this.getDomain(this.webSiteRootUrl)) {
                settings.type = "POST";
                delete settings.dataType;
            }
            ;
            this.ajax(settings);
        },
        timeFormat: function (data, formatSytle, defaultValue) {
            if (!fw.fwObject.FWObjectHelper.hasValue(data)) return defaultValue || "--";
            formatSytle = formatSytle || "YYYY-MM-DD hh:mm";
            return moment(data).format(formatSytle);
        },
        replaceAll: function (value, StringReplace, StringReplaceTo) {
            /// <summary>
            ///     替换字符串中所有需要替换的字符串
            ///      1: " 字符串 ".Trim() 结果为 "字符串"
            /// </summary>
            /// <param name="StringReplace" type="string">
            ///     想要替换的字符串
            /// </param>
            /// <param name="StringReplaceTo" type="string">
            ///     用于替换的字符串
            /// </param>
            ///	<returns type="string"></returns>
            if (fw.fwObject.FWObjectHelper.hasValue(value)) {
                var _RegExp = new RegExp(StringReplace.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
                value = value.replace(_RegExp, StringReplaceTo);
            }
            ;
            return value;
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
                    }
                    ;
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
                type: layType,  //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: pageConfig.title,
                shadeClose: true,
                maxmin: true,
                shade: 0.8,
                area: [settings.width, settings.height],
                content: (layType == 2) ? settings.url : settings.content
            });

            /*
            if (fw.fwObject.FWObjectHelper.hasValue(pageParam.url)) {
            if (fw.fwObject.FWObjectHelper.hasValue(data)) {
            pageParam.url = fw.fwUrl.FWUrlHelper.addParams(fw.fwUrl.FWUrlHelper.getAbsoluteUrl(pageParam.url, $.page.webSiteRootUrl), data);
            } else {
            pageParam.url = fw.fwUrl.FWUrlHelper.getAbsoluteUrl(pageParam.url, $.page.webSiteRootUrl);
            }
            //打开窗口
            mini.open({
            url: pageParam.url,
            title: pageParam.title, //标题
            showMaxButton: pageParam.showMaxButton, //最大化
            showMinButton: pageParam.showMinButton, //最小化
            showModal: pageParam.showModal,//遮罩
            allowResize: pageParam.allowResize, //是否允许调整尺寸
            width: pageParam.width, //宽度
            height: pageParam.height, //长度
            onload: function () {
            //                 var iframe = this.getIFrameEl();
            //                 iframe.contentWindow;
            //                 if (fw.fwObject.FWObjectHelper.hasValue(pageParam.cantonCodeArray)) {
            //                     
            //                 }
            },
            ondestroy: function () {
            if ($.isFunction(callBack)) {
            var iframe = this.getIFrameEl();
            callBack(iframe.contentWindow.callbackData);
            }
            }
            });
            }*/

        },
        pageOpenWithCancel: function (pageConfig) {
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
                    }
                    ;
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
                type: layType,  //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                title: pageConfig.title,
                shadeClose: true,
                maxmin: true,
                shade: 0.8,
                area: [settings.width, settings.height],
                content: (layType == 2) ? settings.url : settings.content,
                cancel: pageConfig.cancel
            });

        },
        UrlHelper: {
            parser: function (Url) {
                var UrlInfo = null;
                if (Url != undefined && Url != null) {
                    var Regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
                    var RegexArray = Regex.exec(Url);
                    if (RegexArray != undefined && RegexArray != null && RegexArray.length) {
                        UrlInfo = {};
                        var FieldChineseNameArray = ["地址", "", "协议", "", "用户名", "密码", "主机", "端口", "路径", "查询字符串", "锚点"];
                        var FieldNameArray = ["Url", "", "ProtocolName", "UsernamePassword", "Username", "Password", "Hostname", "Port", "Pathname", "QueryString", "Fragment"];
                        for (var i = 0; i < RegexArray.length; i++) {
                            UrlInfo[FieldNameArray[i]] = RegexArray[i];
                        }
                        ;
                        if (UrlInfo.UsernamePassword == undefined || UrlInfo.UsernamePassword == null) {
                            UrlInfo.UsernamePassword = "";
                        }
                        ;
                        UrlInfo.Protocol = UrlInfo.ProtocolName + ":";
                        UrlInfo.Host = UrlInfo.Hostname + ":" + UrlInfo.Port;
                        UrlInfo.Hash = "#" + UrlInfo.Fragment;
                        UrlInfo.Search = "?" + UrlInfo.QueryString;
                    }
                    ;
                }
                ;
                return UrlInfo;
            },
            getDomain: function (value) {
                if (value.indexOf("file:///") == 0) {
                    return "file:///";
                } else {
                    var reg = new RegExp("^((http|https)://[^/]+).([/])");
                    return value.match(reg)[0];
                }
                ;
            },
            encode: function (value) {
                if (fw.fwObject.FWObjectHelper.hasValue(value)) {
                    value = page.replaceAll(encodeURIComponent(value), "%3D", "%3d");
                }
                ;
                return value;
            },
            decode: function (value) {
                if (fw.fwObject.FWObjectHelper.hasValue(value)) {
                    value = decodeURIComponent(value);
                }
                ;
                return value;
            },
            getParams: function (url, c) {
                if (!url) {
                    url = location.href;
                }
                ;
                if (!c) {
                    c = "?";
                }
                ;
                if (url.indexOf(c) == -1) {
                    url = url.split(c)[0];
                } else {
                    url = url.split(c)[1];
                }
                ;
                this.params = {};
                if (url) {
                    var us = url.split("&");
                    for (var i = 0, l = us.length; i < l; i++) {
                        var ps = us[i].split("=");
                        this.params[this.decode(ps[0])] = this.decode(ps[1]);
                    }
                    ;
                }
                ;
                return this.params;
            },
            param: function (data) {
                var resultData = {};
                var objValue;
                for (var i in data) {
                    objValue = data[i];
                    if (!fw.fwObject.FWObjectHelper.hasValue(objValue)) objValue = "";
                    if (fw.fwObject.FWObjectHelper.hasValue(objValue) && !_.isString(objValue)) objValue = page.serializeObject(objValue);
                    resultData[i] = objValue;
                }
                ;
                //字符串里面有空格会变成+号
                return page.replaceAll($.param(resultData), "+", " ");
            },
            addParams: function (url, data, c) {
                if (!url) {
                    url = location.href;
                }
                ;
                if (!c) {
                    c = "?";
                }
                ;
                var us = url.split(c);
                var url = us[0];
                var paramsString = us[1];
                var params = {};
                if (paramsString) {
                    var pss = paramsString.split("&");
                    for (var i = 0, l = pss.length; i < l; i++) {
                        var ps = pss[i].split("=");
                        params[page.UrlHelper.decode(ps[0])] = page.UrlHelper.decode(ps[1]);
                    }
                    ;
                }
                ;
                for (var i in data) {
                    params[i] = data[i];
                }
                ;
                return url + c + page.UrlHelper.param(params);
            },
            getAbsoluteUrl: function (url, webSiteRootUrl) {
                if (url != undefined && url != null) {
                    if (url.toString().toLowerCase().indexOf("http://") > -1 || url.toString().toLowerCase().indexOf("https://") > -1) {
                    } else {
                        url = webSiteRootUrl + url;
                    }
                    ;
                }
                ;
                return url;
            }
        }
        , getFileUrl: function (defaults) {
            var type = Object.prototype.toString.apply(defaults);
            if (type == "[object String]") {
                defaults = { fileID: defaults };
            };
            var options = $.extend({ appKey: this.fileServer.appKey, prodID: this.fileServer.prodID, ticket: this.ticket }, defaults);
            var url = fw.fwUrl.FWUrlHelper.addParams(this.fileServer.serviceUrl + 'service/sys/file/upload/download', options);
            return url;
        }
         , __getQueryServer: function () {
             return this.fileServer.serviceUrl + 'service/sys/file/upload/query';
         }
        , getFileName: function (itemInfo, onSuccess) {
            $.ajax(this.__getQueryServer(), {
                type: "GET",
                dataType: 'jsonp',
                jsonp: "callback",
                data: {
                    appKey: this.fileServer.appKey,
                    prodID: this.fileServer.prodID,
                    businessCode: "",
                    fileID: itemInfo.diagramID
                },
                success: function (response) {
                    if (response.file) {
                        var fileInfo = response.file;
                        if (typeof onSuccess == 'function') {
                            onSuccess(itemInfo, fileInfo);
                        }
                    };
                }
            });
        }
        , addCSS: function (cssText) {
            var style = document.createElement('style'), //创建一个style元素
                head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
            style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
            if (style.styleSheet) { //IE
                var func = function () {
                    try { //防止IE中stylesheet数量超过限制而发生错误
                        style.styleSheet.cssText = cssText;
                    } catch (e) {

                    };
                };
                //如果当前styleSheet还不能用，则放到异步中则行
                if (style.styleSheet.disabled) {
                    setTimeout(func, 10);
                } else {
                    func();
                };
            } else { //w3c
                //w3c浏览器中只要创建文本节点插入到style元素中就行了
                var textNode = document.createTextNode(cssText);
                style.appendChild(textNode);
            };
            head.appendChild(style); //把创建的style元素插入到head中    
        }
        , _windowLoad: function (driverType, driverData) {
			if (!fw.fwObject.FWObjectHelper.hasValue(this.webSiteRootUrl)) {
				var me = this;
	            if (!me.page) {
	                driverType = "window";
	            };
                this.webSiteRootUrl = window.webSiteRootUrl;
            };
            if (!fw.fwObject.FWObjectHelper.hasValue(this.serviceSiteRootUrl)) {
                this.serviceSiteRootUrl = this.webSiteRootUrl;
            };
		}
    };

    $.ajaxSetup({
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded"
        /* net项目使用 contentType : "application/json;charset=utf-8" */,
        cache: false,
        async: true,
        timeout: 300000,
        error: function (jqXHR, textStatus, errorThrown) {
            if ($.isFunction(this.uiError)) {
                this.uiError(jqXHR, textStatus, errorThrown);
            };
            console.log({
                jqXHR: jqXHR,
                textStatus: textStatus,
                errorThrown: errorThrown
            });
        },
        beforeSend: function (jqXHR, settings) {
            //发送请求之前
            if ($.isFunction(this.uiBeforeSend)) {
                this.uiBeforeSend(jqXHR, settings);
            };
        },
        success: function (data, textStatus, jqXHR) {
            //请求成功
            switch (this.serviceType) {
                case "crossDomainCall":
                    data = page.deserializeObject(data);
                    break;
            };
            if ($.isFunction(this.uiSuccess)) {
                this.uiSuccess(data, textStatus, jqXHR);
            };
            try {
                var info = "";
                for (var i = 0; i < data.infoList.length; i++) {
                    info += data.infoList[i] + "\n\r";
                };
                switch (Number(data.status)) {
                    //-4 业务验证错误                                                                                                  
                    case page.FWResultStatus.ValidateError:
                        info = "出错：" + "\n\r" + info;
                        console.error(info);
                        break;
                    //-3 出错                                                                                                                     
                    case page.FWResultStatus.Error:
                        info = "出错：" + "\n\r" + info;
                        console.error(info);
                        break;
                    // -2 没有权限                                                                                                                            
                    case page.FWResultStatus.NoRight:
                        info = "没有权限：" + "\n\r" + info;
                        console.warn(info);
                        this.goLogin();
                        break;
                    // -1 未登入                                                                                                                  
                    case page.FWResultStatus.LoginOut:
                        info = "未登入：" + "\n\r" + info;
                        console.warn(info);
                        this.goLogin();
                        break;
                    // 0  失败                                                                                                              
                    case page.FWResultStatus.Failure:
                        info = "失败：" + "\n\r" + info;
                        console.error(info);
                        break;
                    // 2  频繁操作                                                                                                        
                    case page.FWResultStatus.Frequently:
                        info = "频繁操作：" + "\n\r" + info;
                        console.warn(info);
                        break;
                    default:
                        break;
                };
            } catch (e) {
            };
        },
        complete: function (jqXHR, textStatus) {
            //完成请求
            if ($.isFunction(this.uiComplete)) {
                this.uiComplete(jqXHR, textStatus);
            };
        },
        goLogin: function () {
            if (this.isSSO) {
                fw.fwCookie.FWCookieHelper("fwSSO", null);
                fw.fwCookie.FWCookieHelper("fwAutoLogin", null);
                fw.fwCookie.FWCookieHelper("login_isRememberUserName", null);
                fw.fwCookie.FWCookieHelper("login_isRememberUserNamePassword", null);
                fw.fwCookie.FWCookieHelper("login_isAutoLogin", null);
                fw.fwCookie.FWCookieHelper("login_userName", null);
                fw.fwCookie.FWCookieHelper("login_password", null);
                window.location.reload();
            } else {
                fw.fwCookie.FWCookieHelper("fwAutoLogin", null);
                fw.fwCookie.FWCookieHelper("login_isRememberUserName", null);
                fw.fwCookie.FWCookieHelper("login_isRememberUserNamePassword", null);
                fw.fwCookie.FWCookieHelper("login_isAutoLogin", null);
                fw.fwCookie.FWCookieHelper("login_userName", null);
                fw.fwCookie.FWCookieHelper("login_password", null);
                var loginUrl = webSiteRootUrl + "web/loginFile/login.html";
                //var moduleUrl = window.location.href.match(/[\s\S]+?\/web\/([\s\S]+?)\//)[0];
                //                $.get(moduleUrl + "login/login.htm", function (html) {
                //                    if (fw.fwObject.FWObjectHelper.hasValue(html)) {
                //                        loginUrl = moduleUrl + "login/login.htm";
                //                    };
                //                }, "html");
                setTimeout(function () {
                    loginUrl = fw.fwUrl.FWUrlHelper.addParams(loginUrl, {
                        referrerURL: window.top.location.href
                    });
                    window.top.location.replace(loginUrl);
                }, 500);
            };
        }
    });

    //#region 添加用户自定义扩展
    $.ajax({
        type: "GET"
        , dataType: "script"
        , contentType: "text/javascript;charset=utf-8"
        , async: false
        , url: __CreateJSPath("pageVue.js") + "pageVueCustomer.js"
    });
    
    
    _page = window.page = page;
    page._windowLoad(page.driverType);
})(window);