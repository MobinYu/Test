$.fn.extend({
    LocatePointControl: function (Properties) {
        var Settings = {
            ArcGISWindow: null
            , ArcGISMap: null
        };
        $.extend(Settings, Properties);

        var SelectorJQ = $(this);
        if (fw.fwObject.FWObjectHelper.hasValue(Settings.ArcGISWindow) && fw.fwObject.FWObjectHelper.hasValue(Settings.ArcGISMap)) {

            SelectorJQ.each(function () {
                var SearchPointJQ = $(this);
                var ControlData = SearchPointJQ.data("ControlData");
                //判断MeasureControl有没缓存数据，有表示已经加载控件，无表示控件第一次加载
                if (!fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
                    ControlData = {
                        IsTouch: jQueryExtension.IsTouch()
                            , IsTouchModel: (fw.fwObject.FWObjectHelper.hasValue(fw.fwCookie.FWCookieHelper("IsTouchModel")) && (fw.fwCookie.FWCookieHelper("IsTouchModel").toLowerCase() == "true" || fw.fwCookie.FWCookieHelper("IsTouchModel").toLowerCase() == "1"))
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
                    SearchPointJQ.empty().data("ControlData", ControlData);
                    if (SearchPointJQ.css("position").toLowerCase() != "absolute") {
                        SearchPointJQ.css("position", "relative");
                    };
                    var Html = "", background_color, border_color;
                    if (skin == "default") {
                        background_color = "#666";
                        border_color = "#000";
                    } else {
                        background_color = "#5797D5";
                        border_color = "#E6E6E6";
                    };
                    Html += "<div class=\"jQE_Container_Absolute\">";
                    Html += "<div class=\"title\">";
                    Html += "<div class=\"title_tit\">定位</div>";
                    Html += "<div class=\"title_close\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>"
                    Html += "</div>"
                    Html += "<div  id=\"SearchPoint\" class=\"jQE_Container_Content\" style=\" height:60px;text-align:center\">"
                    Html += " 经度:<input id=\"PosX\" type=\"text\" style='width:70px; border-width:2px;margin:4px auto 2px 2px;'/>&nbsp;&nbsp;纬度:<input id=\"PosY\" type=\"text\" style='width:70px;border-width:2px; margin:2px auto 2px 2px;'/>";
                    Html += "<div style=\"margin-top:4px;\"><input id=\"LocatePoint\" type=\"button\" style=\"border:1px solid  " + border_color + ";color:#fff; padding:1px 2px 1px 2px; background:" + background_color + "\"  value=\"定位\" /><input id=\"ClearPoint\" type=\"button\" style=\"border:1px solid " + border_color + ";color:#fff; padding:1px 2px 1px 2px; margin-left:20px;background:" + background_color + "\" value=\"清空\" /></div>";
                    Html += "</div>";
                    $(Html).appendTo(SearchPointJQ);

                    ControlData.ControlJQs.SearchPointJQ = SearchPointJQ.addClass('divArcGISLocateControl');
                    ControlData.ControlJQs.CloseJQ = $("div.title_close", ControlData.ControlJQs.SearchPointJQ);
                    ControlData.ControlJQs.LocatePointJQ = $("#LocatePoint", ControlData.ControlJQs.SearchPointJQ);
                    ControlData.ControlJQs.ClearPointJQ = $("#ClearPoint", ControlData.ControlJQs.SearchPointJQ)
                    //关闭
                    ControlData.ControlJQs.CloseJQ.bind("click", function (e) {
                        if (fw.fwObject.FWObjectHelper.hasValue(Settings.ArcGISWindow)) {
                            Settings.ArcGISWindow.ArcGISAPI.clearMapDrawGraphics();
                        };
                        ControlData.ControlJQs.ClearPointJQ.click();
                        ControlData.ControlJQs.SearchPointJQ.hide();

                    });
                    //定位
                    ControlData.ControlJQs.LocatePointJQ.bind("click", function () {
                        var PosX = $("#PosX").val();
                        var PosY = $("#PosY").val();
                        if (LocatePointLayer == null) {
                            LocatePointLayer = ArcGISAPI.getOrCreateLayer({ LayerName: "LocatePointLayer " });
                        }
                        //   LocatePointLayer.clear();
                        var symbol = new esri.symbol.PictureMarkerSymbol(window.webSiteRootUrl + 'resources/scripts/fw.map/themes/default/images/LocatePoint.png', 24, 24);
                        var mapPoint = new esri.geometry.Point(PosX, PosY);
                        LocatePointLayer.add(new esri.Graphic(mapPoint, symbol));
                        var ShowText = "经度:" + PosX + "\n纬度:" + PosY;
                        var TextJosn = {
                            "type": "esriTS",
                            "color": [0, 0, 0, 255],
                            "backgroundColor": [246, 255, 197, 255],
                            "borderLineColor": null,
                            "verticalAlignment": "center",
                            "horizontalAlignment": "left",
                            "rightToLeft": false,
                            "angle": 0,
                            "xoffset": -ShowText.length,
                            "yoffset": 20,
                            "text": ShowText,
                            "font": {
                                "size": "11pt",
                                "style": "normal",
                                "weight": "bold",
                                "decoration": "none"
                            }
                        };
                        LocatePointLayer.add(new esri.Graphic(mapPoint, new esri.symbol.TextSymbol(TextJosn)));
                        ArcGIS_Map.setLevel(ZoomLevel + 2);
                        ArcGIS_Map.centerAt(mapPoint);
                    })
                    //清空
                    ControlData.ControlJQs.ClearPointJQ.bind("click", function () {
                        $("#PosX").val("");
                        $("#PosY").val("");
                        if (LocatePointLayer != null) {
                            LocatePointLayer.clear();
                        }

                    })

                } else {
                    ControlData.ControlJQs.IsInit = false;
                };
                SearchPointJQ.show();
            });

        };
        return SelectorJQ;
    }
});