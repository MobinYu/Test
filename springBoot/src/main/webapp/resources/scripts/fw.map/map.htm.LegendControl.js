//图例控件
$.fn.extend({
    LegendControl: function (properties) {
        var Settings = {
            ArcGISWindow: null
               , ArcGISMap: null
               , LayerName: ""
               , AttrName: ""//属性名称
               , LayerArray: []//图层数组
               , width: 180
               , width_li: ""
               , isColumn: false //是否以多列形式显示
               , legend: null   //图例列表
        };
        $.extend(Settings, properties);
        var SelectorJQ = $(this);
        SelectorJQ.empty();
        if (!jQueryExtension.IsUndefinedOrNullOrEmpty(Settings.ArcGISWindow) && !jQueryExtension.IsUndefinedOrNullOrEmpty(Settings.ArcGISMap)) {
            SelectorJQ.each(function () {
                var LegendControlJQ = $(this);
                var ControlData = null;
                //判断SearchControl有没缓存数据，有表示已经加载控件，无表示控件第一次加载
                if (jQueryExtension.IsUndefinedOrNullOrEmpty(ControlData)) {
                    ControlData = {
                        IsTouch: jQueryExtension.IsTouch()
                            , IsTouchModel: (jQueryExtension.Cookie("IsTouchModel").toLowerCase() == "true" || jQueryExtension.Cookie("IsTouchModel").toLowerCase() == "1")
                            , ScrollLeft: 0
                            , ScrollTop: 0
                            , ControlJQs: {
                                IsInit: true
                            }
                            , IsResize: false
                            , MapCurrentLevel: -1
                    };
                    if (ControlData.IsTouch) {
                        ControlData.IsTouchModel = true;
                    };
                    LegendControlJQ.empty().data("ControlData", ControlData);
                    if (LegendControlJQ.css("position").toLowerCase() != "absolute") {
                        LegendControlJQ.css("position", "relative");
                    };

                    var Html = "";
                    Html += " <div id=\"ControlLegend\" style=\"width: 100% !important;\">";
                    Html += " <div class=\"windowimg_xx\" style=\"width: 100% !important;\">";
                    Html += "<table style='width:100%;' border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
                    Html += " <tr><td width=\"10px\" align=\"center\" valign=\"middle\"></td>"; //<img src=\"Maps/ArcGIS/Styles/Images/windowimg/tic2.png\" width=\"16\" height=\"16\" />
                    Html += "<td style=\"width: 180px !important;\" class=\"windowimg_xx_name\">图例</td>";
                    Html += "<td><div class=\"title_hide\" id=\"t1_hide\" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></td>";
                    Html += "<td><div class=\"title_Add\" id=\"t1_toggle\" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></td> </tr>";
                    Html += "</table>";
                    Html += "</div>";
                    Html += "<div id=\"ControlLevel\" class=\"list\"  >";
                    Html += "<ul>";

                    for (var i = 0; i < Settings.legend.length; i++) {
                        var item = Settings.legend[i];
                        if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.color)) {
                            if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.size)) {
                                var height = item.size + 6;
                                var cy = height / 2;
                                Html += "<li id=\"controlLevel1\"><svg width='35' height='" + height + "' version='1.1'><circle cx='20' cy='" + cy + "' r='" + item.size / 2 + "' stroke=\"black\" stroke-width=\"1\" fill='" + item.color + "'/></svg>&nbsp;" + item.name + "</li>";
                            } else {
                                if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.count)) {
                                    Html += "<li id=\"controlLevel1\"  controltype=\"" + item.type + "\"><a  style=\"text-decoration: none;vertical-align:bottom;line-height:26px;\" ><span class=\"Icon\" style=\"background-color:" + item.color + ";border:1px solid #eee;\"></span>&nbsp;" + item.name + "(" + item.count + ")</a></li>";
                                } else {
                                    Html += "<li class=\"controlLevel1\"  controltype=\"" + item.type + "\"><a style=\"text-decoration: none;vertical-align:bottom;line-height:26px;\"><span class=\"Icon\" style=\"background-color:" + item.color + ";border:1px solid #eee;\"></span>&nbsp;" + item.name + "</a></li>";
                                };
                            }
                            ;
                        }
                        else if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.image)) {
                            var _imgwidth = 25, _imgheight = 25;
                            if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.width)) {
                                _imgwidth = item.width;
                                _imgheight = item.height;
                            }
                            if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.count)) {
                                Html += "<li id=\"controlLevel1\"  controltype=\"" + item.type + "\"><a  style=\"text-decoration: none;vertical-align:middle;line-height:26px;\" ><img  src=\"" + item.image + "\" style='margin-right:3px;width:" + _imgwidth + "px;height:" + _imgheight + "px;vertical-align:middle;' />" + item.name + "(" + item.count + ")</a></li>";
                            } else if (!jQueryExtension.IsUndefinedOrNullOrEmpty(item.minValue) && !jQueryExtension.IsUndefinedOrNullOrEmpty(item.maxValue)) {
                                Html += "<li id=\"controlLevel1\"  controltype=\"" + item.type + "\"><a  style=\"text-decoration: none;vertical-align:middle;line-height:26px;\" ><img  src=\"" + item.image + "\" style='width:" + _imgwidth + "px;height:" + _imgheight + "px;vertical-align:middle;' />"
                                Html += "</br>";
                                Html += "<span style=\"text-align:left;\">" + item.minValue + "</span><span style=\"text-align:right;margin-left:120px\">" + item.maxValue + "</span></a></li>";
                            }
                            else {
                                Html += "<li id=\"controlLevel1\"  controltype=\"" + item.type + "\"><a  style=\"text-decoration: none;vertical-align:middle;line-height:26px;\" ><img  src=\"" + item.image + "\" style='width:" + _imgwidth + "px;height:" + _imgheight + "px;vertical-align:middle;padding-bottom:10px;' />" + item.name + "</a></li>";
                            };
                        }
                        else {
                            Html += "<li controltype=\"" + item.type + "\" style='width:100%;'><b style='cursor:pointer;'>" + item.name + "</b></li>";
                        }
                        ;
                    };
                    Html += "</ul>";
                    Html += "</div>";
                    Html += "</div>";
                    LegendControlJQ.empty();
                    $(Html).appendTo(LegendControlJQ);
                    ControlData.ControlJQs.ToggleJQ = $(".title_Add", ControlData.ControlJQs.LegendControlJQ);
                    ControlData.ControlJQs.HideJQ = $(".title_hide", ControlData.ControlJQs.LegendControlJQ);
                    if (fw.fwObject.FWObjectHelper.hasValue(Settings.width_li)) {
                        $("#ControlLevel li.controlLevel1").width(Settings.width_li);
                    };
                    //关闭
                    ControlData.ControlJQs.HideJQ.bind("click", function (e) {
                        ControlData.ControlJQs.LegendControlJQ.hide();
                    });
                    //收缩
                    ControlData.ControlJQs.ToggleJQ.bind("click", function (e) {
                        // ControlData.ControlJQs.LegendControlJQ.hide();
                        var thisJQ = $(this);
                        if (thisJQ.is(".title_Add")) {
                            thisJQ.removeClass("title_Add");
                            thisJQ.addClass("title_Close");
                        } else {
                            thisJQ.addClass("title_Add");
                            thisJQ.removeClass("title_Close");
                        };
                        $("#ControlLevel").toggle();
                    });
                    //是否按类别控制显示
                    if (!jQueryExtension.IsUndefinedOrNullOrEmpty(Settings.LayerName) || !jQueryExtension.IsUndefinedOrNullOrEmpty(Settings.LayerArray)) {
                        if (!jQueryExtension.IsUndefinedOrNullOrEmpty(Settings.LayerName)) {
                            Settings.LayerArray.push({ LayerName: Settings.LayerName, Attr: Settings.AttrName });
                            Settings.LayerName = "";
                        }
                        ;

                        // var entity = Settings.LayerArray[i];
                        $("#ControlLevel li").bind("click", function (e) {
                            for (var i = 0; i < Settings.LayerArray.length; i++) {
                                var data = Settings.LayerArray[i];
                                API.ArcGISAPI.mapInfoWindowHide();
                                var type = $(this).attr("controltype");
                                for (var n = 0; n < layerNames.length; n++) {
                                    var layer = API.ArcGISAPI.getOrCreateLayer({ layerName: "Business_" + Settings.layerName });
                                    var list = layer.graphics;
                                    for (var m = 0; m < list.length; m++) {
                                        var attr = layer.graphics[m].attributes[data.AttrName];
                                        if (attr == type) {
                                            layer.graphics[m].show();
                                        } else {
                                            layer.graphics[m].hide();
                                        }
                                        ;
                                    }
                                }
                                ;
                            };
                        });
                    }

                    ControlData.ControlJQs.LegendControlJQ = LegendControlJQ;
                    ControlData.ControlJQs.CloseJQ = $(".title_close_", ControlData.ControlJQs.LegendControlJQ);
                    //关闭
                    ControlData.ControlJQs.CloseJQ.bind("click", function (e) {
                        ControlData.ControlJQs.LegendControlJQ.hide();
                    });
                    if (Settings.isColumn) {
                        $("#divLegendControl #ControlLevel ul li").css("float", "left");
                    };
                    if (!jQueryExtension.IsUndefinedOrNullOrEmpty(Settings.width)) {
                        ControlData.ControlJQs.LegendControlJQ.css("width", Settings.width);
                    }
                    ;
                } else {
                    ControlData.ControlJQs.IsInit = false;
                };

                LegendControlJQ.show();

            });

        };
        return SelectorJQ;
    }
});