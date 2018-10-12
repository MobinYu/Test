//***********mlscMapAPI**************//
mlscMapAPI = {
    map: null
    , view: null
    , is3DView: true
    , isPView: false//平视 
    , popupTrigger: null
    , pt3DSize: 1
    , offset: 0
    , geometryServiceUrl: "http://192.168.253.51:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"
    , corsEnabledServers: ["125.32.96.149:9080", "t0.tianditu.com", "t1.tianditu.com", "t2.tianditu.com", "t3.tianditu.com", "t4.tianditu.com", "t5.tianditu.com", "t6.tianditu.com"]
    , tdt_subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6"]
    , fullExtent: null
    , initExtent: {
        xmin: mlscMapAPI.xmin //1.2106227542243911E7
    , ymin: mlscMapAPI.ymin //4346391.375304661
    , xmax: mlscMapAPI.xmax //1.2124252542243911E7
    , ymax: mlscMapAPI.ymax//4361041.375304661
    , wkid: mlscMapAPI.wkid
    , wkt: mlscMapAPI.wkt
    }
     , layerTypeName: {
         TileLayer: "TileLayer"
      , MapImageLayer: "MapImageLayer"
      , ImageryLayer: "ImageryLayer"
      , FeatureLayer: "FeatureLayer"
      , GraphicsLayer: "GraphicsLayer"
      , ElevationLayer: "ElevationLayer"
      , CSVLayer: "CSVLayer"
      , WebTileLayer: "WebTileLayer"
      , TDTLayer_Vector: "TDTLayer_Vector"
      , TDTLayer_Img: "TDTLayer_Img"
      , TDTLayer_PlaceName: "TDTLayer_PlaceName"
      , TDTLayer_Vector_Project: "TDTLayer_Vector_Project"
      , TDTLayer_Img_Project: "TDTLayer_Img_Project"
      , TDTLayer_PlaceName_Project: "TDTLayer_PlaceName_Project"
     }
     , rendererLayerType: {
         SimpleRenderer: "SimpleRenderer"
         , UniqueValueRenderer: "UniqueValueRenderer"
         , ClassBreaksRenderer: "ClassBreaksRenderer"
     }
    , initView: function (properties) {
        var settings = {
            mapOptions: {
                basemap: "streets"
            }
            , is3DView: false
            , mapViewOptions: {
                container: "viewDiv"
                , map: null
                , extent: null
                , center: null
                , isClippingArea: false
                , constraints: {
                    collision: {
                        enabled: false//false时允许导航到地下模式
                    },
                    tilt: {
                        max: 179.99
                    }
                }
                , environment: {
                    atmosphere: null, //控制夜间模式 还是白天模式
                    starsEnabled: false,
                    lighting: {
                        date: null
                    , directShadowsEnabled: false
                    }
                }
            }
            , onClickEvt: null
        };
        $.extend(settings, properties);
        //mlscMapAPI.Config.request.corsDetection = false;
        //        for (var i = 0; i < mlscMapAPI.corsEnabledServers.length; i++) {
        //            mlscMapAPI.Config.request.corsEnabledServers.push(mlscMapAPI.corsEnabledServers[i]);
        //        };
        if (mlscMapAPI.geometryServiceUrl) {
            mlscMapAPI.Config.geometryServiceUrl = mlscMapAPI.geometryServiceUrl;
        };
        mlscMapAPI.Config.request.proxyUrl = window.webSiteRootUrl + "resources/Maps/ArcGIS/FrameWork/proxy.ashx";
        //        mlscMapAPI.urlUtils.addProxyRule({
        //            urlPrefix: "192.168.253.51:6080",
        //            proxyUrl: window.webSiteRootUrl + "resources/Maps/ArcGIS/FrameWork/proxy.ashx"
        //        });
        mlscMapAPI.map = new mlscMapAPI.Map(settings.mapOptions);
        settings.mapViewOptions.map = mlscMapAPI.map;
        if (this.initExtent.xmin && this.initExtent.ymin && this.initExtent.xmax && this.initExtent.ymax) {
            mlscMapAPI.fullExtent = new mlscMapAPI.Extent(this.initExtent.xmin, this.initExtent.ymin, this.initExtent.xmax, this.initExtent.ymax);
            if (this.initExtent.wkid) {
                mlscMapAPI.fullExtent.spatialReference = new mlscMapAPI.SpatialReference({ wkid: this.initExtent.wkid });
            } else if (this.initExtent.wkt) {
                mlscMapAPI.fullExtent.spatialReference = new mlscMapAPI.SpatialReference({ wkt: this.initExtent.wkt });
            };
            if (settings.mapViewOptions.isClippingArea) {
                settings.mapViewOptions.clippingArea = mlscMapAPI.fullExtent;
            };
        };
        if (settings.is3DView) {
            mlscMapAPI.view = new mlscMapAPI.SceneView(settings.mapViewOptions);
        } else {
            mlscMapAPI.view = new mlscMapAPI.MapView(settings.mapViewOptions);
        };
        mlscMapAPI.view.then(function (e) {
            mlscMapAPI.view.goTo(mlscMapAPI.fullExtent);
        });

        if ($.isFunction(settings.onClickEvt)) {
            mlscMapAPI.view.on("click", function (e) {
                settings.onClickEvt(e)
            });
        };
        if ($.isFunction(settings.onCallBack)) {
            settings.onCallBack();
        };
    }
    , getLayer: function (id) {
        return mlscMapAPI.map.findLayerById(id);
    }
    , addMapLayer: function (properties) {
        var settings = {
            layerType: ""
        , url: ""
        , id: ""
        , minScale: ""
        , maxScale: ""
        , opacity: "1"
        , index: ""
        , visible: true
        , popupTemplate: {
            title: null
        , content: null
        , actions: null
        }
        };
        $.extend(settings, properties);
        var layer = null;
        layer = this.getLayer(settings.id);
        if (layer) {
            if (!layer.visible) {
                layer.visible = true;
            };
        } else {
            layer = this.creatLayer(settings);
        };
        if (fw.fwObject.FWObjectHelper.hasValue(settings.minScale)) {
            layer.minScale = settings.minScale;
        };
        if (fw.fwObject.FWObjectHelper.hasValue(settings.maxScale)) {
            layer.maxScale = settings.maxScale;
        };
        if (fw.fwObject.FWObjectHelper.hasValue(settings.opacity)) {
            layer.opacity = settings.opacity;
        };
        if (fw.fwObject.FWObjectHelper.hasValue(settings.visible)) {
            layer.visible = settings.visible;
        };
        if (settings.outFields) {
            layer.outFields = settings.outFields;
        } else {
            layer.outFields = ["*"];
        };
        layer.labelsVisible = settings.labelsVisible;
        if (layer.labelsVisible && settings.labelingInfo) {
            var symbol = mlscMapAPI.createSymbol(settings.labelingInfo);
            var LabelClass = new mlscMapAPI.LabelClass({
                labelExpressionInfo: { value: settings.labelingInfo.value },
                labelPlacement: settings.labelingInfo.labelPlacement,
                maxScale: settings.labelingInfo.maxScale,
                minScale: settings.labelingInfo.minScale,
                symbol: symbol
            });
            layer.labelingInfo = [LabelClass];
        };
        layer.popupEnabled = settings.popupEnabled;
        if (settings.popupTemplate) {
            if (settings.popupTemplate.content || $.isFunction(settings.popupTemplate.content)) {
                layer.popupTemplate = settings.popupTemplate;
            };
        };
        if ($.isFunction(settings.onClickEvt)) {
            if (layer.clickEvt) {
                layer.clickEvt.remove();
                layer.clickEvt = null;
            };
            layer.onClickEvt = settings.onClickEvt;
            layer.clickEvt = mlscMapAPI.view.on("click", function (e) {
                settings.onClickEvt(e);
            });
        };

        if (fw.fwObject.FWObjectHelper.hasValue(settings.index)) {
            mlscMapAPI.map.add(layer, settings.index);
        } else {
            if (settings.layerType == "ElevationLayer") {
                mlscMapAPI.map.ground = new mlscMapAPI.Ground({
                    layers: [layer]
                })
            } else {
                mlscMapAPI.map.add(layer);
            };
        };


        if ($.isFunction(settings.onCallBack)) {
            settings.onCallBack(layer);
        };
    }
    , hideMapLayer: function (properties) {
        var settings = {
            id: ""
          , ids: []
        };
        $.extend(settings, properties);
        var layer = null;
        if (settings.ids && settings.ids.length > 0) {
            for (var i = 0; i < settings.ids.length; i++) {
                var id = settings.ids[i];
                layer = mlscMapAPI.map.findLayerById(id);
                if (layer && layer.visible) {
                    layer.visible = false;
                };
            };
        } else if (settings.id) {
            layer = mlscMapAPI.map.findLayerById(settings.id);
            if (layer && layer.visible) {
                layer.visible = false;
            };
        };
    }
    , removeMapLayer: function (properties) {
        var settings = {
            id: ""
          , ids: []
        };
        $.extend(settings, properties);
        var layer = null;
        if (settings.ids && settings.ids.length > 0) {
            for (var i = 0; i < settings.ids.length; i++) {
                var id = settings.ids[i];
                layer = mlscMapAPI.map.findLayerById(id);
                if (layer) {
                    mlscMapAPI.map.remove(layer);
                };
            };
        } else if (settings.id) {
            layer = mlscMapAPI.map.findLayerById(settings.id);
            if (layer) {
                mlscMapAPI.map.remove(layer);
            };
        };
    }
    , creatLayer: function (properties) {
        var settings = {
            layerType: ""
        , url: ""
        , id: ""
        };
        $.extend(settings, properties);
        var layer = null;
        switch (settings.layerType) {
            case this.layerTypeName.TileLayer:
                layer = new mlscMapAPI.TileLayer({ url: settings.url, id: settings.id });
                break;
            case this.layerTypeName.MapImageLayer:
                layer = new mlscMapAPI.MapImageLayer({ url: settings.url, id: settings.id });
                if (settings.sublayers) {
                    layer.sublayers = settings.sublayers;
                };
                break;
            case this.layerTypeName.ImageryLayer:
                var renderingRule = new mlscMapAPI.RasterFunction({
                    functionName: settings.functionName || "None"
                });
                layer = new mlscMapAPI.ImageryLayer({
                    url: settings.url
                , id: settings.id
                , pixelFilter: settings.pixelFilter
                , renderingRule: renderingRule
                });
                break;
            case this.layerTypeName.FeatureLayer:
                if (settings.url) {
                    layer = new mlscMapAPI.FeatureLayer({ url: settings.url, id: settings.id });
                } else {
                    layer = new mlscMapAPI.FeatureLayer({ id: settings.id,
                        source: settings.source,
                        objectIdField: settings.objectIdField,
                        fields: settings.fields,
                        geometryType: settings.geometryType
                    });
                };
                if (settings.definitionExpression) {
                    layer.definitionExpression = settings.definitionExpression;
                };
                if (settings.elevationInfo) {
                    layer.elevationInfo = settings.elevationInfo;
                };
                if (settings.renderer) {
                    layer.renderer = settings.renderer;
                };
                layer.returnZ = settings.returnZ;

                break;
            case this.layerTypeName.GraphicsLayer:
                layer = new mlscMapAPI.GraphicsLayer({ id: settings.id });
                if (settings.dataSource && settings.dataSource.length > 0) {
                    var graphicList = [];
                    for (var i = 0; i < settings.dataSource.length; i++) {
                        var data = settings.dataSource[i];
                        var set = {
                            data: data
                            , symbol: settings.symbol
                            , xField: settings.xField
                            , yField: settings.yField
                            , zField: settings.zField
                            , symbolField: settings.symbolField
                            , geometryType: settings.geometryType
                            , symbolLayersType: settings.symbolLayersType
                            , textField: settings.textField
                            , spatialReferenceValue: settings.spatialReferenceValue
                        };
                        var graphic = mlscMapAPI.createGraphic(set);
                        graphicList.push(graphic);
                    };
                    layer.addMany(graphicList);
                } else if (settings.geometryList && settings.geometryList.length > 0) {
                    for (var i = 0; i < settings.geometryList.length; i++) {
                        var g = settings.geometryList[i];
                        var graphic = new mlscMapAPI.Graphic(g, settings.symbol);
                        layer.add(graphic);
                    };
                };
                break;
            case this.layerTypeName.CSVLayer:
                layer = new mlscMapAPI.CSVLayer({ url: settings.url, id: settings.id });
                if (settings.latitudeField) {
                    layer.latitudeField = settings.latitudeField;
                };
                if (settings.longitudeField) {
                    layer.longitudeField = settings.longitudeField;
                };
                break;
            case this.layerTypeName.ElevationLayer:
                layer = new mlscMapAPI.ElevationLayer({ url: settings.url, id: settings.id });
                break;
            case this.layerTypeName.WebTileLayer:
                layer = new mlscMapAPI.WebTileLayer({ urlTemplate: settings.url, id: settings.id, subDomains: settings.subDomains });
                break;
            case this.layerTypeName.TDTLayer_Vector_Project:
                layer = new mlscMapAPI.WebTileLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=vec_w&x={col}&y={row}&l={level}"//"http://{subDomain}.tianditu.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles"
                , id: settings.id
                , subDomains: mlscMapAPI.tdt_subDomains
                });
                break;
            case this.layerTypeName.TDTLayer_Img_Project:
                layer = new mlscMapAPI.WebTileLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}"//"http://{subDomain}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles"
                , id: settings.id
                , subDomains: mlscMapAPI.tdt_subDomains
                });
                break;
            case this.layerTypeName.TDTLayer_PlaceName_Project:
                layer = new mlscMapAPI.WebTileLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cva_w&x={col}&y={row}&l={level}"//"http://{subDomain}.tianditu.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles"
                , id: settings.id
                , subDomains: mlscMapAPI.tdt_subDomains
                });
                break;
            case this.layerTypeName.TDTLayer_Vector:
                layer = new mlscMapAPI.TDTLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}"//"http://{subDomain}.tianditu.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles"
                , id: settings.id
                , subDomains: mlscMapAPI.tdt_subDomains
                });
                break;
            case this.layerTypeName.TDTLayer_Img:
                layer = new mlscMapAPI.TDTLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=img_c&x={col}&y={row}&l={level}"//"http://{subDomain}.tianditu.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles"
                , id: settings.id
                , subDomains: mlscMapAPI.tdt_subDomains
                });
                break;
            case this.layerTypeName.TDTLayer_PlaceName:
                layer = new mlscMapAPI.TDTLayer({
                    urlTemplate: "http://{subDomain}.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}"//"http://{subDomain}.tianditu.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles"
                , id: settings.id
                , subDomains: mlscMapAPI.tdt_subDomains
                });
                break;
            //三维  http://t4.tianditu.cn/DataServer?T=img_w&X=854&Y=418&L=10                                                                                                                          
            //地形 http://t3.tianditu.cn/cta_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cta&tileMatrixSet=c&TileMatrix=11&TileRow=381&TileCol=1677&style=default&format=tiles                                                                                                                         
            default:
                break;
        };
        return layer;
    }
    , createGraphic: function (properties) {
        var settings = {
            data: null
            , symbol: null
            , xField: "posX"
            , yField: "posY"
            , zField: "z"
            , symbolField: "symbol"
            , geometryType: "Point"
            , spatialReferenceValue: 4326
            , symbolLayersType: "ObjectSymbol3DLayer"
        };
        $.extend(settings, properties);
        var graphic = null;
        var grometry = null;
        var symbol = null;
        var attributes = null;
        var data = settings.data;
        var spatialReference = new mlscMapAPI.SpatialReference({ wkid: settings.spatialReferenceValue });
        if (settings.geometryType == "Point") {
            if (data[settings.xField] && data[settings.yField]) {
                grometry = new mlscMapAPI.Point(data[settings.xField], data[settings.yField], data[settings.zField], spatialReference);
                if (settings.symbol) {
                    symbol = settings.symbol;
                } else if (data[settings.symbolField]) {
                    symbol = data[settings.symbolField];
                } else {

                    //                    symbol = new mlscMapAPI.SimpleMarkerSymbol({
                    //                        size: 12,
                    //                        color: "blue",
                    //                        style: "circle",
                    //                        outline: {
                    //                            width: 0.5,
                    //                            color: "white"
                    //                        }
                    //                    });
                    symbol = this.createSymbol({ symbolType: settings.symbolField, symbolLayersType: settings.symbolLayersType, text: data[settings.textField] })
                };
                attributes = data;
                graphic = new mlscMapAPI.Graphic(grometry, symbol);
                graphic.attributes = data;
            } else {
                return;
            };
        }
        return graphic;
    }
    , createSymbol: function (properties) {
        var settings = {
            symbolType: "SimpleMarkerSymbol"
            , size: 12
            , color: "blue"
            , style: "circle"//circle  square  cross  x  kite
            , outline: {
                width: 1
            , color: "white"
            }
            , primitive: "sphere"//sphere  cylinder  cube  cone  inverted-cone  diamond  tetrahedron
        };
        $.extend(settings, properties);
        var symbol = null;
        switch (settings.symbolType) {
            case "SimpleMarkerSymbol":
                symbol = new mlscMapAPI.SimpleMarkerSymbol({
                    size: settings.size,
                    color: settings.color,
                    style: settings.style,
                    outline: {
                        width: settings.outline.width,
                        color: settings.outline.color
                    }
                });
                break;
            case "PointSymbol3D":
                var symbolLayers = null;
                switch (settings.symbolLayersType) {
                    case "ObjectSymbol3DLayer":
                        symbolLayers = [new mlscMapAPI.ObjectSymbol3DLayer({  // renders points as volumetric objects
                            width: settings.width || 1,  // diameter of the object from east to west in meters
                            height: settings.height || 1,  // height of the object in meters
                            depth: settings.depth || 1,  // diameter of the object from north to south in meters
                            resource: { primitive: settings.primitive },
                            material: { color: settings.color }
                        })];
                        break;
                    case "IconSymbol3DLayer":
                        symbolLayers = [new mlscMapAPI.IconSymbol3DLayer({
                            size: settings.size,
                            resource: { primitive: settings.style },
                            material: { color: settings.color }
                        })];
                        break;
                    case "TextSymbol3DLayer":
                        symbolLayers = [new mlscMapAPI.TextSymbol3DLayer({
                            material: { color: settings.color },
                            size: settings.size
                        })]
                };
                symbol = new mlscMapAPI.PointSymbol3D({
                    symbolLayers: symbolLayers
                });
                break;
            case "TextSymbol":
                                symbol = new mlscMapAPI.TextSymbol({
                //                    xoffset: settings.xoffset || 30,
                                    //                    yoffset: settings.yoffset || 30,
                                    align: mlscMapAPI.Font.ALIGN_END,
                                    color: settings.fontColor || "black",
                                    haloSize: settings.haloSize || 0,
                                    haloColor: settings.haloColor || "",
                                    text: settings.text,
                                    verticalAlignment: "top",
                                    horizontalAlignment: "left",
                                    //backgroundColor: settings.backgroundColor, //This property is only supported for MapImageLayer.
                                    font: {
                                        size: settings.fontSize || 12,
                                        family: settings.fontFamily || "黑体",
                                        weight: settings.fontWeight || "bolder"
                                    }
                                });
                break;
            case "LabelSymbol3D":
                var symbolLayers = null;
                symbol = new mlscMapAPI.LabelSymbol3D({
                    symbolLayers: [new mlscMapAPI.TextSymbol3DLayer({
                        material: { color: settings.color },
                        size: settings.size
                    })]
                });
                break;
            case "SimpleFillSymbol":
                symbol = new mlscMapAPI.SimpleFillSymbol({
                    style: settings.style || "solid",
                    color: settings.color || [255, 255, 255, 0.5],
                    outline: {
                        style: settings.outline.style || "solid",
                        color: settings.outline.color || [0, 0, 0],
                        width: settings.outline.width || 2
                    }
                })
                break;
        }
        return symbol;
    }
    , renderer: function (properties) {
        var settings = {
            rendererType: ""
          , id: ""
          , symbol: new mlscMapAPI.SimpleMarkerSymbol({
              size: 12,
              color: "red",
              style: "circle",
              outline: {
                  width: 0.5,
                  color: "white"
              }
          })
          , visualVariables: [{
              type: "color",
              field: "z",
              stops: [{
                  value: -1000,
                  color: "#B52E1A"
              },
                                {
                                    value: -2000,
                                    color: "#FD9027"
                                }
                                , {
                                    value: -3000,
                                    color: "#E3DF1E"
                                }
                            ]
          }, {
              type: "size",
              field: "speed",
              axis: "all",
              stops: [
                                  {
                                      value: 2,
                                      size: 10
                                  },
                                  {
                                      value: 50,
                                      size: 20
                                  }]
          }]
        };
        $.extend(settings, properties);
        var renderer = null;
        switch (settings.rendererType) {
            case this.rendererLayerType.SimpleRenderer:
                renderer = new mlscMapAPI.SimpleRenderer({ symbol: settings.symbol, visualVariables: settings.visualVariables });
                break;
            case this.rendererLayerType.UniqueValueRenderer:
                renderer = new mlscMapAPI.UniqueValueRenderer({ field: settings.field,
                    defaultSymbol: settings.symbol,
                    uniqueValueInfos: settings.uniqueValueInfos,
                    visualVariablesObject: settings.visualVariablesObject
                });
                break;
            case this.rendererLayerType.ClassBreaksRenderer:
                renderer = new mlscMapAPI.ClassBreaksRenderer({ field: settings.field,
                    classBreakInfos: settings.classBreakInfos,
                    visualVariables: settings.visualVariables
                });
                break;
            default:
                break;
        };
        return renderer;
    }
    , zoomtoPt: function (properties) {
        var settings = {
            posX: null
        , posY: null
        , scale: null//24000
        , zoom: 8
        , layerName: ""
        , keyCode: null
        , keyCodeName: null
        , isFlash: false
        , flashTime: 10000
        };
        $.extend(settings, properties);
        var flashSymbol = new mlscMapAPI.PictureMarkerSymbol({
            url: window.webSiteRootUrl + 'web/map4.2/css/images/Location.gif',
            width: "36px",
            height: "36px"
        });
        getFlashPt = function (data) {
            var flashLayer = mlscMapAPI.getLayer("flashLayer");
            if (flashLayer) {
                flashLayer.removeAll();
                if (!flashLayer.visible) {
                    flashLayer.visible = true;
                };
                var set = {
                    data: data[0]
                    , symbol: flashSymbol
                    , xField: "posX"
                    , yField: "posY"
                    , geometryType: "Point"
                    , spatialReferenceValue: mlscMapAPI.initExtent.wkid
                }
                var g = mlscMapAPI.createGraphic(set);
                flashLayer.add(g);
                setTimeout(function () {
                    flashLayer.visible = false;
                }, settings.flashTime);
            } else {
                var settingTextLayer = {
                    layerType: "GraphicsLayer"
                    , dataSource: data
                    , xField: "posX"
                    , yField: "posY"
                    , zField: "z"
                    , spatialReferenceValue: mlscMapAPI.initExtent.wkid
                    , symbol: flashSymbol
                    , id: "flashLayer"
                    , geometryType: "Point"
                    , returnZ: true
                    , index: 1
                    , onCallBack: function (layer) {
                        setTimeout(function () {
                            layer.visible = false;
                        }, settings.flashTime);
                    }
                }
                mlscMapAPI.addMapLayer(settingTextLayer);
            };

        };
        if (settings.posX && settings.posY) {
            if (settings.isFlash) {
                var data = [{ posX: settings.posX, posY: settings.posY, z: settings.z}];
                getFlashPt(data);
            };
            if (settings.scale) {
                mlscMapAPI.view.goTo({
                    center: [settings.posX, settings.posY, settings.z]
              , scale: settings.scale
                });
            } else if (settings.zoom) {
                mlscMapAPI.view.goTo({
                    center: [settings.posX, settings.posY, settings.z]
              , zoom: settings.zoom
                });
            };
        } else if (settings.Camera) {
            mlscMapAPI.view.goTo(settings.Camera);
        } else if (settings.geometry) {
            mlscMapAPI.view.goTo(settings.geometry);
        } else if (settings.graphics) {
            mlscMapAPI.view.goTo(settings.geometry);
        } else if (settings.layerName) {
            var layer = mlscMapAPI.map.findLayerById(settings.layerName);

            if (!layer) {
                return;
            };
            var graphics = layer.graphics;
            if (layer.declaredClass == "esri.layers.FeatureLayer") {
                if (layer.source && layer.source.length > 0) {
                    graphics = layer.source.items;
                };
                if (graphics && graphics.length > 0) {
                    mlscMapAPI.zoomtoPtHandle({
                        scale: settings.scale
                          , zoom: settings.zoom
                          , animateSpeed: settings.animateSpeed
                          , tilt: settings.tilt
                          , layer: layer
                          , graphics: graphics
                          , keyCode: settings.keyCode
                          , keyCodeName: settings.keyCodeName
                    })
                } else {
                    mlscMapAPI.queryLayer({ layer: layer }).then(function (results) {
                        var graphics = results.features;
                        layer.graphics = graphics;
                        mlscMapAPI.zoomtoPtHandle({
                            scale: settings.scale
                          , zoom: settings.zoom
                          , animateSpeed: settings.animateSpeed
                          , tilt: settings.tilt
                          , layer: layer
                          , graphics: graphics
                           , keyCode: settings.keyCode
                          , keyCodeName: settings.keyCodeName
                        });
                        if (settings.isFlash) {
                            var data = [{ posX: graphics[0].geometry.x, posY: graphics[0].geometry.y, z: graphics[0].geometry.z}];
                            getFlashPt(data);
                        };
                    }, function (err) {
                        console.log(layer);
                    });
                }
            } else {
                if (!graphics || !graphics.items) {
                    return;
                };
                this.zoomtoPtHandle({
                    scale: settings.scale
                          , zoom: settings.zoom
                          , animateSpeed: settings.animateSpeed
                          , tilt: settings.tilt
                          , layer: layer
                          , graphics: graphics.items
                          , keyCode: settings.keyCode
                          , keyCodeName: settings.keyCodeName
                })
            };
        };
    }
    , zoomtoPtHandle: function (properties) {
        var settings = {
            scale: ""
          , zoom: ""
          , tilt: ""
          , animateSpeed: ""
          , geometry: null
          , layer: ""
          , graphics: null
        };
        $.extend(settings, properties);
        for (var i = 0; i < settings.graphics.length; i++) {
            var entity = settings.graphics[i];
            if (entity.attributes[settings.keyCodeName] == settings.keyCode) {
                var g = entity.geometry.clone();
                //                if (mlscMapAPI.pt3DSize && g && g.z) {
                //                     g.z = g.z + mlscMapAPI.pt3DSize*3 ;
                //                };
                if (settings.scale) {
                    mlscMapAPI.view.goTo({
                        center: g
                  , scale: settings.scale
                  , tilt: settings.tilt
                    }, settings.animateSpeed).then(function () {

                        mlscMapAPI.viewPpopupOpen({ location: g, feature: entity });
                    });
                } else if (settings.zoom) {
                    mlscMapAPI.view.animateTo({
                        center: g
                      , zoom: settings.zoom
                    }, settings.animateSpeed).then(function () {

                        mlscMapAPI.viewPpopupOpen({ location: g, feature: entity });
                    });
                };
                return;
            }
        };
    }
    , viewPpopupOpen: function (properties) {
        var settings = {
            title: "GraphicsLayer_Popup"
            , location: null
            , content: null
            , actions: []
            , width: null
        };
        $.extend(settings, properties);
        if (settings.width) {
            $(".esri-popup__main-container").css({ width: settings.width });
        };
        mlscMapAPI.view.popup.open({
            title: settings.title,
            content: settings.content,
            actions: settings.actions,
            location: settings.location,
            features: [settings.feature]
        });

    }
    , viewPpopupClose: function (properties) {
        var settings = {};
        $.extend(settings, properties);
        mlscMapAPI.view.popup.close();
    }
    , createBuffer: function (properties) {
        var settings = {
            pointSym: null
        , polySym: null
        , id: "bufferLayer"
        , radius: 1000
        , unit: "meters"
        , bufferPt: { x: 120, y: 31 }
        , areaUnit: "square-meters"
        , isCalArea: false
        , onCallBack: null
        };
        $.extend(settings, properties);
        var bufferPt = new mlscMapAPI.Point(settings.bufferPt.x, settings.bufferPt.y);
        if (!settings.pointSym) {
            settings.pointSym = mlscMapAPI.createSymbol({
                symbolType: "SimpleMarkerSymbol"
            });
        };
        if (!settings.polySym) {
            settings.polySym = mlscMapAPI.createSymbol({
                symbolType: "SimpleFillSymbol"
              , color: [255, 0, 0, 0.1]
              , outline: {
                  color: [255, 0, 0]
                , width: 1
              }
            });
        };
        var layer = new mlscMapAPI.GraphicsLayer();
        mlscMapAPI.map.add(layer);
        layer.id = settings.id;
        // The GeometryEngine has two methods for buffering geometries client-side: buffer and geodesicBuffer. 
        //Use caution when deciding which method to use. As a general rule,
        // use geodesicBuffer if the input geometries have a spatial reference of either WGS84 (wkid: 4326) or Web Mercator. 
        //Only use buffer (this method) when attempting to buffer geometries with a projected coordinate system other than Web Mercator.
        // If you need to buffer geometries with a geographic coordinate system other than WGS84 (wkid: 4326), use GeometryService.buffer().
        mlscMapAPI.geometryEngineAsync.geodesicBuffer(bufferPt, settings.radius, settings.unit)
          .then(addGraphics)
          .then(callback)
        //.then(zoomTo)
        //.then(calculateArea)
        //.then(printArea);
        function addGraphics(buffer) {
            layer.add(new mlscMapAPI.Graphic({
                geometry: bufferPt,
                symbol: settings.pointSym
            }));
            layer.add(new mlscMapAPI.Graphic({
                geometry: buffer,
                symbol: settings.polySym
            }));
            return buffer;
        };
        function callback(geometry) {
            if ($.isFunction(settings.onCallBack)) {
                settings.onCallBack(geometry);
            };
        };
        //        function zoomTo(geom) {
        //            return mlscMapAPI.view.then(function () {
        //                return mlscMapAPI.view.goTo({
        //                    target: geom,
        //                    scale: 24000,
        //                    tilt: 0,
        //                    heading: 0
        //                });
        //            }).then(function () {
        //                return geom;
        //            });
        //        };
        //        function calculateArea(polyGeom) {
        //            if (settings.isCalArea) {
        //                return mlscMapAPI.geometryEngineAsync.geodesicArea(polyGeom, settings.areaUnit);
        //            };
        //        };
        //        function printArea(area) {
        //            if ($.isFunction(settings.onCallBack)) {
        //                settings.onCallBack(area);
        //            };
        //        };

    }
    , queryLayer: function (properties) {
        var settings = {
            layer: null
            , where: "1=1"
            , geometry: null
            , spatialRelationship: ""
        };
        $.extend(settings, properties);
        var query = settings.layer.createQuery();
        query.where = settings.where;
        query.geometry = settings.geometry;
        query.spatialRelationship = settings.spatialRelationship;
        return settings.layer.queryFeatures(query);
    }
};