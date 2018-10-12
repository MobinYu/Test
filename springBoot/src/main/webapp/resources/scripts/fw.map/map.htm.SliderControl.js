//左下角滑动控件
function SlideControlBind(properties) {
    if (typeof (properties) == "undefined") {
        properties = {};
    };
    var Settings = {
        Selector: null
        , OnChange: null
        , API: null
        , BusinessEvent: null//指定业务模块
    };
    $.extend(Settings, properties);

    $(Settings.Selector).each(function () {
        var SliderControlJQ = $(this);
        var ControlData = SliderControlJQ.data("ControlData");

        //判断Scroll有没缓存数据，有表示已经加载控件，无表示控件第一次加载
        if (!fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
            ControlData = {
                IsTouch: jQueryExtension.IsTouch()
                , IsTouchModel: (fw.fwObject.FWObjectHelper.hasValue(fw.fwCookie.FWCookieHelper("IsTouchModel")) && (fw.fwCookie.FWCookieHelper("IsTouchModel").toLowerCase() == "true" || fw.fwCookie.FWCookieHelper("IsTouchModel").toLowerCase() == "1"))
                , ControlJQs: {}
            };
            if (ControlData.IsTouch) {
                ControlData.IsTouchModel = true;
            };
            SliderControlJQ.addClass("divCantonStatistics").data("ControlData", ControlData).empty();

            var Html = "";
            Html += "<table id=\"SilderControlTable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
            Html += "    <tr>";
            Html += "        <td>";
            Html += "            <div class=\"divCantonStatisticsContainer\">";
            Html += "                <div class=\"divCantonStatisticsTitle\">";
            Html += "                    <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: 100%; height:100%;\">";
            Html += "                        <tr>";
            Html += "                            <td class=\"tdCantonStatisticsHide\"></td>";
            //                        Html += "                            <td style=\"width: 10px;\">";

            //                        Html += "                           abcdefg";
            //                        Html += "                            </td>";
            Html += "                            <td style=\"display: none;\">";
            Html += "                                <div class=\"divConcernCantonList\">";
            Html += "                                    <ul class=\"ulConcernCantonList\"></ul>";
            Html += "                                </div>";
            Html += "                            </td>";
            Html += "                            <td>";
            Html += "                                <div class=\"divConditionExtension\"></div>";
            Html += "                            </td>";
            Html += "                        </tr>";
            Html += "                    </table>";
            Html += "                </div>";
            Html += "                <div class=\"divCantonStatisticsList\"></div>";
            Html += "            </div>";
            Html += "        </td>";
            Html += "        <td class=\"tdCantonStatisticsToggle ToLeft\">";
            Html += "            <div class=\"divCantonStatisticsToggle\"></div>";
            Html += "        </td>";
            Html += "    </tr>";
            Html += "</table>";
            $(Html).appendTo(SliderControlJQ);

            //ControlData.IsTouch = true;
            ControlData.ControlJQs.SliderControlJQ = SliderControlJQ;
            ControlData.ControlJQs.SelectorJQ = SliderControlJQ;
            ControlData.ControlJQs.SliderControlContainerJQ = $("#SilderControlTable div.divCantonStatisticsContainer", ControlData.ControlJQs.SelectorJQ);
            ControlData.ControlJQs.SliderControlTitleJQ = $(">div.divCantonStatisticsTitle", ControlData.ControlJQs.SliderControlContainerJQ);
            ControlData.ControlJQs.SliderControlHideJQ = $("td.tdCantonStatisticsHide", ControlData.ControlJQs.SliderControlContainerJQ);
            //ControlData.ControlJQs.CantonCodeJQ = $("select.selectCantonCode", ControlData.ControlJQs.CantonStatisticsTitleJQ);
            ControlData.ControlJQs.ConcernCantonListJQ = $("ul.ulConcernCantonList", ControlData.ControlJQs.SliderControlContainerJQ);
            ControlData.ControlJQs.ConditionExtensionJQ = $("div.divConditionExtension", ControlData.ControlJQs.SliderControlContainerJQ);
            ControlData.ControlJQs.SliderControlListJQ = $(">div.divCantonStatisticsList", ControlData.ControlJQs.SliderControlContainerJQ);
            ControlData.ControlJQs.SliderControlToggleJQ = $("td.tdCantonStatisticsToggle", ControlData.ControlJQs.SelectorJQ);

            var CriticalWidth = 1;

            //=====控件显示/隐藏操作 开始=====
            Settings.API.SliderControlContentHide = function () {
                ControlData.ControlJQs.SliderControlContainerJQ.hide();
            };
            Settings.API.SliderControlSlideDown = function () {
                var CurrentWidth = ControlData.ControlJQs.SliderControlContainerJQ.width();
                var MaxWidth = ControlData.ControlJQs.SliderControlContainerJQ.css("width", "auto").width();
                //alert("Down" + CurrentWidth);
                if (CurrentWidth < MaxWidth) {
                    //ControlData.ControlJQs.CantonCodeJQ.show();
                    ControlData.ControlJQs.SliderControlHideJQ.show();
                    ControlData.ControlJQs.ConditionExtensionJQ.show();
                    ControlData.ControlJQs.SliderControlListJQ.show();
                    //                    ControlData.ControlJQs.SliderControlContainerJQ.width(CriticalWidth).show().animate({ width: MaxWidth + "px" }, 300, function () {
                    //                        ControlData.ControlJQs.SliderControlContainerJQ.css("width", "auto");
                    //                        ControlData.ControlJQs.SliderControlToggleJQ.addClass("ToLeft"); 
                    //                        ControlData.Settings.ConcernCantonResizeFunction(); });
                    ControlData.ControlJQs.SliderControlContainerJQ.width(CriticalWidth).show();
                    ControlData.ControlJQs.SliderControlContainerJQ.css("width", "auto");
                    ControlData.ControlJQs.SliderControlToggleJQ.addClass("ToLeft");
                    ControlData.Settings.ConcernCantonResizeFunction();

                };
            };
            Settings.API.SliderControlSlideUp = function () {

                var CurrentWidth = ControlData.ControlJQs.SliderControlContainerJQ.width();
                //alert("Up" + CurrentWidth);
                if (CurrentWidth > CriticalWidth) {


                    // ControlData.ControlJQs.CantonCodeJQ.hide();
                    ControlData.ControlJQs.SliderControlHideJQ.hide();
                    ControlData.ControlJQs.SliderControlListJQ.hide();
                    ControlData.ControlJQs.ConditionExtensionJQ.hide();
                    ControlData.ControlJQs.SliderControlContainerJQ.show().animate({ width: CriticalWidth + "px" }, 300, function () { ControlData.ControlJQs.SliderControlToggleJQ.removeClass("ToLeft"); });
                    ControlData.Settings.ConcernCantonResizeFunction();
                };
            };
            Settings.API.SliderControlSlideToggle = function () {
                var CurrentWidth = ControlData.ControlJQs.SliderControlContainerJQ.width();

                if (CurrentWidth == CriticalWidth) {
                    Settings.API.SliderControlSlideDown();
                } else {
                    Settings.API.SliderControlSlideUp();
                };
            };
            Settings.API.SliderControlShow = function () {
                ControlData.ControlJQs.SliderControlJQ.show();
            };
            Settings.API.SliderControlHide = function () {
                ControlData.ControlJQs.SliderControlJQ.hide();
            };
            Settings.API.SliderControlToggle = function () {
                if (divSliderControlListJQ.is(":hidden")) {
                    Settings.API.SliderControlShow();
                } else {
                    Settings.API.SliderControlHide();
                };
            };
            //=====控件显示/隐藏操作 结束=====


            Settings.API.SliderControlUnbind = function () {
                var ControlData = API._divSliderControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
                    ControlData.ControlJQs.SliderControlListJQ.empty();
                    //ControlData.ControlJQs.CantonCodeJQ.val(ControlData.ControlJQs.CantonCodeJQ[0][0].value);
                    ControlData.Settings.OnChange = null;
                    ControlData.ControlJQs.ConditionExtensionJQ.empty();


                    API.SliderControlSlideUp();
                    API.SliderControlHide();
                };
            };
            Settings.API.SliderControlConditionExtensionJQ = ControlData.ControlJQs.ConditionExtensionJQ;

            Settings.API.SliderControlListBind = function (properties) {
                var Settings = {
                    ConditionExtensionInit: function () { }
                    , OnChange: function (e) { }
                };
                $.extend(Settings, properties);

                var ControlData = API._divSliderControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
                    API.SliderControlUnbind();

                    ControlData.Settings.ConditionExtensionInit = Settings.ConditionExtensionInit;
                    ControlData.Settings.ConditionExtensionInit();

                    ControlData.Settings.OnChange = Settings.OnChange;
                    // ControlData.ControlJQs.CantonCodeJQ.change();

                    API.SliderControlShow();
                };
            };


            Settings.API.SliderControlChange = function (properties) {
                var Settings = {
                    CantonCode: null
                };
                $.extend(Settings, properties);

                var ControlData = API._divSliderControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
                    //                    if (Settings.CantonCode == null) {
                    //                        Settings.CantonCode = ControlData.ControlJQs.CantonCodeJQ.val();
                    //                    };
                    //                    ControlData.ControlJQs.CantonCodeJQ.val(Settings.CantonCode)
                    //                    ControlData.ControlJQs.CantonCodeJQ.change();

                    API.SliderControlShow();
                };
            };

            //按钮模块内容绑定
            Settings.API.SliderControlAdd = function (properties) {
                var Settings = {
                    TextFieldName: "Text"
                    , IconUrlFieldName: "IconUrl"
                    , ColorFieldName: "Color"
                    , DataSource: []
                    , TemplateFunction: function (Entity, Index) { return Entity[this.TextFieldName]; }
                    , RowOnClick: function (Entity) { }
                };
                $.extend(Settings, properties);

                var ControlData = API._divSliderControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {

                    if ($.isFunction(Settings.BusinessEvent)) {
                        Settings.titleJQ = ControlData.ControlJQs.ConditionExtensionJQ;
                        Settings.contentJQ = ControlData.ControlJQs.SliderControlListJQ;
                        Settings.BusinessEvent(Settings);
                    };
                    ControlData.Settings.ConcernCantonResizeFunction();
                };
            };

            ControlData.ControlJQs.SliderControlHideJQ.bind("click", function () {
                ControlData.ControlJQs.SliderControlToggleJQ.click();
            });
            ControlData.ControlJQs.SliderControlToggleJQ.bind("click", function () { Settings.API.SliderControlSlideToggle(); });

        };
        ControlData.Settings = Settings;

        ControlData.Settings.ConcernCantonResizeFunction = function () {
            ControlData.ControlJQs.ConcernCantonListJQ.width(0);
            //ControlData.ControlJQs.ConcernCantonListJQ.width(ControlData.ControlJQs.SliderControlTitleJQ.width() - ControlData.ControlJQs.CantonCodeJQ.width() - 16);
            ControlData.ControlJQs.ConcernCantonListJQ.width(ControlData.ControlJQs.SliderControlTitleJQ.width() - 16);
        };

        if (ControlData.Settings.DataSource == undefined || ControlData.Settings.DataSource == null) {
            ControlData.Settings.DataSource = [];
        };
        ControlData.ControlJQs.ConcernCantonListJQ.empty();
        ControlData.Settings.API.SliderControlSlideUp();
        ControlData.Settings.API.SliderControlHide();
    });
    return this;
};

//上下滑动控件
function SlideTDControlBind(properties) {
    if (typeof (properties) == "undefined") {
        properties = {};
    };
    var Settings = {
        Selector: null
        , Top: 100
        , Left:290
        , Width: 100
        , API: null
    };
    $.extend(Settings, properties);

    $(Settings.Selector).each(function () {
        var SlideTDControlJQ = $(this);
        var ControlData = SlideTDControlJQ.data("ControlData");

        //判断Scroll有没缓存数据，有表示已经加载控件，无表示控件第一次加载
        if (!fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
            ControlData = {
                IsTouch: jQueryExtension.IsTouch()
                , IsTouchModel: (fw.fwObject.FWObjectHelper.hasValue(fw.fwCookie.FWCookieHelper("IsTouchModel")) && (fw.fwCookie.FWCookieHelper("IsTouchModel").toLowerCase() == "true" || fw.fwCookie.FWCookieHelper("IsTouchModel").toLowerCase() == "1"))
                , ControlJQs: {}
            };
            if (ControlData.IsTouch) {
                ControlData.IsTouchModel = true;
            };
            SlideTDControlJQ.addClass("divSlideTDControl").data("ControlData", ControlData).empty();
            if (SlideTDControlJQ.css("position").toLowerCase() != "absolute") {
                SlideTDControlJQ.css("position", "relative");
            };
            var Html = "";
            Html += "<div class=\"divSlideTDControlTitle\" style='height:70px;'>";
            Html += "    <div class=\"divSlideTDControlContainer\" style='text-indent: 0px;height:32px; '>";
            Html += "        <div class=\"divButton\" style='width:100%;text-align:center;line-height:32px;'></div>";
            Html += "    </div>";
            Html += "</div>";
            Html += "<div class=\"divSlideTDControlContent\" style=\"height:100px;width:200px;margin-top:2px;\"></div>";
            $(Html).appendTo(SlideTDControlJQ);

            //ControlData.IsTouch = true;

            ControlData.ControlJQs.SlideTDControlJQ = SlideTDControlJQ;
            ControlData.ControlJQs.SelectorJQ = SlideTDControlJQ;
            ControlData.ControlJQs.SlideTDControlTitleJQ = $(">div.divSlideTDControlTitle", ControlData.ControlJQs.SelectorJQ);
            ControlData.ControlJQs.SlideTDControlContainerJQ = $(">div.divSlideTDControlContainer", ControlData.ControlJQs.SlideTDControlTitleJQ);
            ControlData.ControlJQs.SlideTDControlContentJQ = $(">div.divSlideTDControlContent", ControlData.ControlJQs.SelectorJQ);
            ControlData.ControlJQs.ButtonJQ = $(">div.divButton", ControlData.ControlJQs.SlideTDControlContainerJQ);

            var MarginTop = 36;
            var Height = -36;
            jQueryExtension.UI.Layout({
                Selector: ControlData.ControlJQs.SlideTDControlJQ
                , HorizontalAlignment: jQueryExtension.Data.HorizontalAlignment.Left
                , VerticalAlignment: jQueryExtension.Data.VerticalAlignment.Top
                , Top: Settings.Top - MarginTop
                , Right: 0
                , Bottom: 0
                , Left: Settings.Left
                , Width: Settings.Width
                , MinWidth: -1
                , Height: Height
                , MinHeight: -1
                , IsEventResize: true
                , CallBack: function () { }
                , IsForeverLayout: true
            });
           // ControlData.ControlJQs.SlideTDControlTitleJQ.height(Height);
            ControlData.ControlJQs.SlideTDControlContainerJQ.css("margin-top", MarginTop + "px");
            ControlData.ControlJQs.SlideTDControlContainerJQ.css({ "margin-top": (0 - Height) + "px", "margin-right": (MarginTop / 2) + "px" });


            Settings.API.SlideTDControlSlideDown = function () {
                ControlData.ControlJQs.SlideTDControlContentJQ.slideDown();
            };
            Settings.API.SlideTDControlSlideUp = function () {
                ControlData.ControlJQs.SlideTDControlContentJQ.slideUp();
            };
            Settings.API.SlideTDControlSlideToggle = function () {
                if (ControlData.ControlJQs.SlideTDControlContentJQ.is(":hidden")) {
                    Settings.API.SlideTDControlSlideDown();
                } else {
                    Settings.API.SlideTDControlSlideUp();
                };
            };
            Settings.API.SlideTDControlShow = function () {
                ControlData.ControlJQs.SlideTDControlJQ.show();
            };
            Settings.API.SlideTDControlHide = function () {
                ControlData.ControlJQs.SlideTDControlJQ.hide();
            };
            Settings.API.SlideTDControlContentHide = function () {
                ControlData.ControlJQs.SlideTDControlContentJQ.hide();
            };


            /// <summary>
            ///     搜索和关注取消绑定（关闭）
            /// </summary>
            Settings.API.SlideTDControlUnbind = function () {
                var ControlData = API._divSliderTDControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
                    ControlData.ControlJQs.ButtonJQ.unbind("click");
                    ControlData.ControlJQs.SlideTDControlContentJQ.removeData("TypeCode");
                    API.SlideTDControlContentHide();
                    API.SlideTDControlHide();
                };
            };

            /// <summary>
            ///     搜索和关注取消绑定（打开）
            /// </summary>
            Settings.API.SlideTDControlBind = function (properties) {
                var Settings = {
                    SearchButtonOnClick: function (e) { }
                    , Options: null
                };
                $.extend(Settings, properties);
                var ControlData = API._divSliderTDControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {
                    API.SlideTDControlUnbind();

                    ControlData.ControlJQs.ButtonJQ.unbind("click").bind("click", function (e) {
                        if (ControlData.ControlJQs.SlideTDControlContentJQ.is(":hidden")) {
                            ControlData.ControlJQs.SlideTDControlContentJQ.removeData("TypeCode");
                        };
                        var TypeCode = ControlData.ControlJQs.SlideTDControlContentJQ.data("TypeCode");
                        if (TypeCode != "Search") {
                            API.SlideTDControlSlideDown();
                            ControlData.ControlJQs.SlideTDControlContentJQ.data("TypeCode", "Search");
                        } else {
                            API.SlideTDControlSlideUp();
                            ControlData.ControlJQs.SlideTDControlContentJQ.removeData("TypeCode");
                        };
                    });

                    API.SlideTDControlShow();
                    API.SlideTDControlContentBind(Settings);

                    //更新属性信息
                    if (fw.fwObject.FWObjectHelper.hasValue(Settings.Options.Title)) {
                        ControlData.ControlJQs.ButtonJQ.html(Settings.Options.Title);
                    };
                    if (fw.fwObject.FWObjectHelper.hasValue(Settings.Options.ContentWidth)) {
                        ControlData.ControlJQs.SlideTDControlContentJQ.width(Settings.Options.ContentWidth);
                    };
                    if (fw.fwObject.FWObjectHelper.hasValue(Settings.Options.ContentHeight)) {
                        ControlData.ControlJQs.SlideTDControlContentJQ.height(Settings.Options.ContentHeight);
                    };
                };
            };
            /// <summary>
            ///     搜索和关注结果内容绑定
            /// </summary>
            Settings.API.SlideTDControlContentBind = function (properties) {
                var Settings = {
                    TextFieldName: "Text"
                    , IconUrlFieldName: "IconUrl"
                    , ColorFieldName: "Color"
                    , DataSource: []
                    , TemplateFunction: function (Entity, Index) { return Entity[this.TextFieldName]; }
                    , RowOnClick: function (Entity) { }
                };
                $.extend(Settings, properties);

                var ControlData = API._divSliderTDControlJQ.data("ControlData");
                if (fw.fwObject.FWObjectHelper.hasValue(ControlData)) {

                    if ($.isFunction(Settings.BusinessEvent)) {
                        Settings.contentJQ = ControlData.ControlJQs.SlideTDControlContentJQ;
                        Settings.BusinessEvent(Settings);
                    };
                };
            };
        };
        ControlData.Settings = Settings;

        ControlData.Settings.API.SlideTDControlContentHide();
        ControlData.Settings.API.SlideTDControlHide();
    });
    return this;   
};
var isValited = true;
