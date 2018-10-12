﻿//定义变量
var ArcGIS_MapWindow = null;
var divBodyJQ = null;
var divLogoJQ = null;
var divFootJQ = null;
var liSystemSetJQ = null;
var liSystemMenuJQ = null;
var liLayersManageJQ = null;
var divFunctionToggleJQ = null;
var divModuleToggleJQ = null;
var divDataSynchronizationStatusToggleJQ = null;
var divModuleListJQ = null;
var divModuleList2JQ = null;
var divModuleJQ = null;
var divArcGISExtentControlJQ = null;
var divArcGISToolsControlJQ = null;
var divArcGISLayersControlJQ = null;
var divArcGISDALayersControlJQ = null;
var divArcGISJQ = null;
var divSearchAndConcernJQ = null;
var divMouseFollowJQ = null;
var divDataSynchronizationStatusJQ = null;
var divDataSynchronizationStatusIframeJQ = null;
var iframeDataSynchronizationStatusJQ = null;
var divCantonStatisticsJQ = null;
var divOpenMenuFunctionDevelopJQ = null;
var divMenuFunctionDevelopWindowJQ = null;
var divArcGISCarRouteJQ = null;
var divArcGISDrawControlJQ = null;
var divArcGISLocateControlJQ = null;
var divSliderControlJQ = null;
var divArcGISLegendJQ = null;
var divArcGISSearchJQ = null;
var divPopUpFrameBoxJQ = null;
var divPopUpFrameBoxSearchJQ = null;
var divSliderTDControlJQ = null;
var divArcGISPrintButtonControlJQ = null;
var divArcGISSoilFatPowerJQ = null;
var divArcGISRiskLayersControlJQ = null;
var divArcGISFlowRiskWarningJQ = null;
var divArcGISTechnologyLayersControl = null;
var divWaterSurveyDatamanagementJQ = null;
function GetMap_Div() {
    divBodyJQ = $("#divBody");
    divLogoJQ = $("#divLogo");
    divFootJQ = $("#divFoot");
    liSystemSetJQ = $("#liSystemSet").bind("click", function () { API.Open({ TitleHtml: "系统设置", Url: API.webSiteRootUrl + "Web/SystemSet.htm", Data: { Ticket: $.page.ticket} }); });
    liSystemMenuJQ = $("#liSystemMenu").bind("click", function () { API.Open({ TitleHtml: "系统设置", Url: API.webSiteRootUrl + "Web/SystemManage/System_Menu__List.htm", Data: { Ticket: $.page.ticket} }); });
    liLayersManageJQ = $("#liLayersManage").bind("click", function () { API.Open({ TitleHtml: "图层管理", Url: API.webSiteRootUrl + "Web/Maps/ArcGIS/LayersManage.htm", Data: { Ticket: $.page.ticket} }); });
    divFunctionToggleJQ = $("div.divFunctionToggle", divLogoJQ);
    divModuleToggleJQ = $("#divModuleToggle").bind("click", function () { API.ModuleListToggle(); });
    
    divMouseFollowJQ = $("#divMouseFollow");
    divArcGISExtentControlJQ = $("#divArcGISExtentControl");
    divArcGISToolsControlJQ = $("#divArcGISToolsControl");
    divArcGISLayersControlJQ = $("#divArcGISLayersControl");
    divArcGISDALayersControlJQ = $("#divDALayersControl");
    divArcGISJQ = $("#divArcGIS");
    divSearchAndConcernJQ = $("#divSearchAndConcern");
    divDataSynchronizationStatusJQ = $("#divDataSynchronizationStatus");
    divDataSynchronizationStatusIframeJQ = $("#divDataSynchronizationStatusIframe");
    divDataSynchronizationStatusToggleJQ = $("#divDataSynchronizationStatusToggle").bind("click", function () { API.DataSynchronizationStatusToggle(); });
    iframeDataSynchronizationStatusJQ = $("#iframeDataSynchronizationStatus");
    divOpenMenuFunctionDevelopJQ = $("#divOpenMenuFunctionDevelop").bind("click", function () {
        divMenuFunctionDevelopWindowJQ.toggle();
    });
    divMenuFunctionDevelopWindowJQ = $("#divMenuFunctionDevelopWindow");
    divPopUpFrameBoxJQ = $("#divPopUpFrameBox");
    divPopUpFrameBoxSearchJQ = $("#divPopUpFrameBoxSearch");
    divSliderControlJQ = $("#divSliderControl");
    divArcGISLegendJQ = $("#divLegendControl");
    divArcGISSearchJQ = $("#divArcGISSearch");
    divArcGISCarRouteJQ = $("#divArcGISCarRoute");
    divArcGISDrawControlJQ = $("#divArcGISDrawControl");
    divArcGISLocateControlJQ = $("#divArcGISLocateControl");
    divSliderTDControlJQ = $("#divSliderTDControl");
    divArcGISPrintButtonControlJQ = $("#divArcGISPrintButtonControl");
    divArcGISSoilFatPowerJQ = $("#divArcGISSoilFatPower");
    divArcGISRiskLayersControlJQ = $("#divArcGISRiskLayersControl");
    divArcGISFlowRiskWarningJQ = $("#divArcGISFlowRiskWarning");
    divArcGISTechnologyLayersControlJQ = $("#divArcGISTechnologyLayersControl");
    divWaterSurveyDatamanagementJQ = $("#divWaterSurveyDatamanagement");
    //by MHQ
    if (fw.fwObject.FWObjectHelper.hasValue(window.boot.frames)) {
        divModuleListJQ = $("#divMenuSystem");
        divModuleList2JQ = $("#divMenuSystem_1");
        divModuleToggleJQ.hide();
    } else {
        divModuleListJQ = $("#divModuleList");
        $("#divMenuSystem").remove();
        $("#divMenuSystem_1").remove();
    };
    
    divModuleJQ = $("#divModule");
}