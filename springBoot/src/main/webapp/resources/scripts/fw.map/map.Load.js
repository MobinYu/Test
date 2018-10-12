function MapLoaded(MapTypeCode) {
    if (MapTypeCode == "ArcGIS") {
        API.ArcGISAPI.IsArcGISLoaded = true;
        API.ArcGISAPI = ArcGIS_MapWindow.ArcGISAPI;
        var Settings = {
            displayGraphicsOnPan: true,
            DefaultExtent: API.ArcGISAPI.DefaultData.Extent_JS_1984,
            logo: false,
            slider: false,
            onLoaded: function (evt) {
            },
            GeometryServiceUrl: null
        };
        switch (window.MapFrom) {
            case 0:
                Settings.GeometryServiceUrl = GeometryUrl;
                break;
            case 1:
                Settings.GeometryServiceUrl = GeometryUrl;
                break;
        };
        ArcGIS_MapWindow.ArcGISAPI.initMap(Settings);
        API.ArcGISAPI.ArcGISWindow = ArcGIS_MapWindow;
        API.ArcGISAPI.ArcGISMap = ArcGIS_MapWindow.ArcGIS_Map;
        //        divArcGISExtentControlJQ.ExtentControl({
        //            ArcGISWindow: API.ArcGISAPI.ArcGISWindow
        //                    , ArcGISMap: API.ArcGISAPI.ArcGISMap
        //                    , FullExtent: API.ArcGISAPI.getFullExtent()
        //        });

        divArcGISLayersControlJQ.LayersControl({
            ArcGISWindow: API.ArcGISAPI.ArcGISWindow
                            , ArcGISMap: API.ArcGISAPI.ArcGISMap
        });

        divArcGISToolsControlJQ.ToolsControl({
            ArcGISWindow: API.ArcGISAPI.ArcGISWindow
                            , ArcGISMap: API.ArcGISAPI.ArcGISMap
        });
        setDefaultLayerChecked(); //加载图层
        $("#divFullExtent").bind("click", function () {
            homeInit();
            // ArcGISAPI.zoomToFullExtent();
        });
    };
};

function ArcGISMapInit() {
    ArcGIS_MapDivID = "divArcGISMap";
    ArcGIS_MapJS = document.getElementById(ArcGIS_MapDivID);
    ArcGIS_MapJQ = $(ArcGIS_MapJS);
    try {
        ArcGIS_MapWindow = window;
        MapLoaded("ArcGIS");
    }
    catch (ex) {
    };
};

//默认加载图层
function setDefaultLayerChecked() {
    var MapServiceLayerType_Vec, MapServiceLayerType_Img, MapServiceUrl_Vec, MapServiceUrl_Img;
    switch (window.MapFrom) {
        case 0:
            MapServiceLayerType_Img = "esri.layers.TianDiTuTiledMapServiceLayer_Image";
            MapServiceLayerType_Vec = "esri.layers.TianDiTuTiledMapServiceLayer_Vector";
            var setMap = {
                MapServiceLayerType: MapServiceLayerType_Img
            , ServiceUrl: "" //地图服务地址
            , opacity: 1 //透明度
            , LayerName: "diTu"//地图名称
            };
            ArcGISAPI.addMapService(setMap);
            //            var setting_bj = {
            //                "LayerName": "Bj",
            //                "ServiceUrl": "",
            //                "dataList": arcgis_layer_bound,
            //                "LayerType": "Polygon",
            //                "SymbolBorderColor": "#FFFF00",
            //                "SymbolBorderWidth": "3",
            //                "SymbolFillColor": [255, 255, 0, 0],
            //                "opacity": "1",
            //                "isBusinessLayer": false
            //            };
            //            ArcGISAPI.showDynamicLayer(setting_bj);
            //            var setting_thbj = {
            //                "LayerName": "THBj",
            //                "ServiceUrl": "",
            //                "dataList": arcgis_layer_th,
            //                "LayerType": "Polygon",
            //                "SymbolBorderColor": "#FFFF00",
            //                "SymbolBorderWidth": "3",
            //                "SymbolFillColor": [255, 255, 0, 0],
            //                "opacity": "1",
            //                "isBusinessLayer": false
            //            };
            //            ArcGISAPI.showDynamicLayer(setting_thbj);
            //$.LayersControl.SetLayerChecked({ Selector: divArcGISLayersControlJQ, LayerName: "TDT_PlaceName" });
            $.LayersControl.SetLayerChecked({ Selector: divArcGISLayersControlJQ, LayerName: "Bj" });
            $.LayersControl.SetLayerChecked({ Selector: divArcGISLayersControlJQ, LayerName: "THBj" });
            break;
        case 1:
            MapServiceLayerType_Vec = "esri.layers.ArcGISTiledMapServiceLayer";
            MapServiceLayerType_Img = "esri.layers.ArcGISTiledMapServiceLayer";
            MapServiceUrl_Vec = "http://10.32.200.51/ArcGIS/rest/services/jsdem2/MapServer";
            MapServiceUrl_Img = "http://10.32.200.51/ArcGIS/rest/services/jsyxdt/MapServer";
            var setMap = {
                MapServiceLayerType: MapServiceLayerType_Img
            , ServiceUrl: MapServiceUrl_Img //地图服务地址
            , opacity: 1 //透明度
            , LayerName: "diTu"//地图名称
            };
            ArcGISAPI.addMapService(setMap);
            $.LayersControl.SetLayerChecked({ Selector: divArcGISLayersControlJQ, LayerName: "Bj" });
            $.LayersControl.SetLayerChecked({ Selector: divArcGISLayersControlJQ, LayerName: "THBj" });
            break;
    };
    //***********底图加载切换***************//
    //    $("#mapTypeDiv").unbind("mouseover").bind("mouseover", function (e) {
    //        $("#mapTypeDiv").css({ "width": "212px" });
    //        $("#terTypeDiv").css({ "display": "block" });
    //        $("#glbTypeDiv").css({ "display": "block" });
    //    });
    //    $("#mapTypeDiv").unbind("mouseout").bind("mouseout", function (e) {
    //        $("#mapTypeDiv").css({ "width": "70px" });
    //        $("#terTypeDiv").css({ "display": "none" });
    //        $("#glbTypeDiv").css({ "display": "none" });
    //    });

    $("#imgTypeDiv").unbind("click").bind("click", function (e) {
        $("#vecTypeDiv").show();
        $("#imgTypeDiv").hide();
        var settings = {
            MapServiceLayerType: MapServiceLayerType_Img //地图服务类型
            , MapServiceUrl: MapServiceUrl_Img//地图服务地址
            , LayerName: "diTu"//图层名称
        };
        ArcGISAPI.modiMapService(settings);
    });
    $("#vecTypeDiv").unbind("click").bind("click", function (e) {
        $("#vecTypeDiv").hide();
        $("#imgTypeDiv").show();
        var settings = {
            MapServiceLayerType: MapServiceLayerType_Vec
            , MapServiceUrl: MapServiceUrl_Vec
            , LayerName: "diTu"
        };
        ArcGISAPI.modiMapService(settings);
    });
    var placeNameLyer;
    $(".switch").change(function (e) {
        if ($(".switch").is(":checked")) {
            if (!placeNameLyer) {
                var setMap = {
                    MapServiceLayerType: "esri.layers.TianDiTuTiledMapServiceLayer_PlaceName"
                    , opacity: 1
                    , LayerName: "placeName"
                };
                ArcGISAPI.addMapService(setMap);
                placeNameLyer = ArcGIS_Map.getLayer("placeName");
            } else {
                placeNameLyer.show();
            };
        } else {
            if (placeNameLyer) {
                placeNameLyer.hide();
            };
        };
    })

};




