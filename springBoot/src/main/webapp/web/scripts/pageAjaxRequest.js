(function (window, undefined) {

    var _page = window.page;
    
    page = {
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
        },
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
                case "defaultCall":
                    settings.type = settings.type ? settings.type : "GET";
                    settings.dataType = settings.dataType ? settings.dataType : "json";
                    settings.jsonp = settings.jsonp ? settings.jsonp : "callback";
                    settings.data = settings.data;
                    for (var item in settings.data) {
                        var type = Object.prototype.toString.apply(settings.data[item]);
                        if (type == "[object Object]" || type == "[object Array]") {
                            settings.data[item] = this.serializeObject(settings.data[item]);
                        }
                    }
                    break;
                case "crossDomainCall":
                    settings.serviceSiteRootUrl = this.serviceSiteRootUrl;
                    settings.url = this.serviceSiteRootUrl + "service/" + settings.serviceName + "/" + settings.methodName;
                    settings.type = settings.type ? settings.type : "GET";
                    settings.dataType = settings.dataType ? settings.dataType : "jsonp";
                    settings.jsonp = settings.jsonp ? settings.jsonp : "callback";
                    settings.data = settings.data;
                    
                    for (var item in settings.data) {
                        var type = Object.prototype.toString.apply(settings.data[item]);
                        if (type == "[object Object]" || type == "[object Array]") {
                            settings.data[item] = this.serializeObject(settings.data[item]);
                        };
                    }
                    
                    settings.type = "POST";
                    delete settings.dataType;
                    
                    break;
                default:
                    if ($.pageCustomer != null && $.isFunction($.pageCustomer.getCustomerAjaxSettings)) {
                        settings = $.pageCustomer.getCustomerAjaxSettings(settings);
                    }
                    break;
            }
            return settings;
        },
        ajax: function (ajaxSettings) {
            if ($.isFunction(ajaxSettings.beforeSend)) {
                ajaxSettings.uiBeforeSend = ajaxSettings.beforeSend;
                delete ajaxSettings.beforeSend;
            }
            if ($.isFunction(ajaxSettings.success)) {
                ajaxSettings.uiSuccess = ajaxSettings.success;
                delete ajaxSettings.success;
            }
            if ($.isFunction(ajaxSettings.error)) {
                ajaxSettings.uiError = ajaxSettings.error;
                delete ajaxSettings.error;
            }
            if ($.isFunction(ajaxSettings.complete)) {
                ajaxSettings.uiComplete = ajaxSettings.complete;
                delete ajaxSettings.complete;
            }
            $.ajax(ajaxSettings);
        },
        serializeObject: function (value, IsUseCustomFormat, FormatMode) {
            /**
             * <summary>把对象序列化为Json字符串 1: page.fwJson.FWJsonHelper.SerializeObject(value)。</summary>
             * <param type="Object" name="value">对象</param>
             * <param type="Boolean" name="IsUseCustomFormat">是否使用自定义格式化</param>
             * <param type="Number" name="FormatMode">格式化方式</param>
             * <returns type="String">Json字符串</returns>
             */
            if (!fw.fwObject.FWObjectHelper.hasValue(IsUseCustomFormat)) {
                IsUseCustomFormat = false;
            }
            
            if (!fw.fwObject.FWObjectHelper.hasValue(FormatMode)) {
                FormatMode = this.JsonFormatMode.ToString;
            }
            
            return this._SerializeObject({
                Value: value,
                IsUseCustomFormat: IsUseCustomFormat,
                FormatMode: FormatMode
            });
        },
        deserializeObject: function (value, CatchValue) {
            /**
             * <summary>Json字符串反序列化为对象 1: page.fwJson.FWJsonHelper.DeserializeObject(value)。</summary>
             * <param type="String" name="value">对象Json字符串</param>
             * <param type="Object" name="CatchValue">反序列化失败时，返回的值</param>
             * <returns type="Object">对象</returns>
             */
            if (fw.fwObject.FWObjectHelper.hasValue(CatchValue) && !fw.fwObject.FWObjectHelper.hasValue(value)) {
                value = CatchValue;
            }
            
            try {
                value = eval("(" + value + ")");
            } catch (ex) {
                
            }
            
            return value;
        },
        _SerializeObject: function (Properties) {
            /**
             * <summary>把对象序列化为Json字符串 1: page.fwJson.FWJsonHelper._SerializeObject(value)。</summary>
             * <param type="Object" name="value">对象</param>
             * <param type="Boolean" name="IsUseCustomFormat">是否使用自定义格式化</param>
             * 
             * <returns type="String">Json字符串</returns>
             */
            var Settings = {
                Value: null,
                IsUseCustomFormat: false,
                FormatMode: this.JsonFormatMode.ToString,
                Level: 0
            };
            if (!fw.fwObject.FWObjectHelper.hasValue(Properties)) {
                Properties = {};
            }
            
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
                    for (var i = 0; i < Level + 1; i++) {
                        Space_Plus1 += "    ";
                    }
                    break;
                case this.JsonFormatMode.ToHTML:
                    for (var i = 0; i < Level; i++) {
                        Space += "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                    for (var i = 0; i < Level + 1; i++) {
                        Space_Plus1 += "&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                    break;
            }
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
                        }
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
                        }
                    }
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
                    }
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
                    }
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
                case "defaultCall":
                	data = page.deserializeObject(data);
                	break;
            };
            if ($.isFunction(this.uiSuccess)) {
                this.uiSuccess(data, textStatus, jqXHR);
            };
        },
        complete: function (jqXHR, textStatus) {
            //完成请求
            if ($.isFunction(this.uiComplete)) {
                this.uiComplete(jqXHR, textStatus);
            };
        }
    });
    
    _page = window.page = page;
    
})(window);
