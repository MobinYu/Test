dojo.require("esri.map");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.tasks.geometry");
dojo.require("esri.toolbars.draw");
dojo.require("dojo.number");
dojo.require("esri.dijit.InfoWindow");
dojo.require("esri.tasks.query");
dojo.require("esri.tasks.DataFile");
dojo.require("esri.tasks.RelationParameters");
dojo.require("esri.renderers.ClassBreaksRenderer");
dojo.require("esri.tasks.Geoprocessor");
dojo.require("esri.tasks.gp");
dojo.require("esri.layers.ImageParameters");
dojo.require("esri.InfoTemplate");
dojo.require("esri.renderers.HeatmapRenderer");
dojo.require("esri.geometry.Circle");

esri.config.defaults.io.corsDetection = false;

function MapAPI() {
    var _this = undefined;
    var _Enum = {
        Code__MapServiceLayerType: {
            "ImageService": "esri.layers.ArcGISImageServiceLayer",
            "TiledMapService": "esri.layers.ArcGISTiledMapServiceLayer",
            "DynamicMapService": "esri.layers.ArcGISDynamicMapServiceLayer",
            "TianDiTuImageService": "esri.layers.TianDiTuTiledMapServiceLayer_Image",
            "TianDiTuPlaceService": "esri.layers.TianDiTuTiledMapServiceLayer_PlaceName",
            "TianDiTuRoadNetService": "esri.layers.TianDiTuTiledMapServiceLayer_cia_c",
            "TianDiTuVectorService": "esri.layers.TianDiTuTiledMapServiceLayer_Vector"
        },
        Code__MapLayerTypeCode: {
            Map: "Map"//地图
            , Point: "Point" //点图层
            , Line: "Line" //线图层
            , Polygon: "Polygon" //面图层
        },
        Code__SymbolNames: {
            Point: "Point",
            Point_Picture: "Point_Picture",
            Point_Text: "Point_Text",
            Polyline: "Polyline",
            Polyline_Highlighte: "Polyline_Highlighte",
            Polygon: "Polygon",
            Polygon_Highlighte: "Polygon_Highlighte"
        },
        Code__MapGeometryType: {
            Point: "point" //点图层
            , Polyline: "polyline" //线图层
            , Polygon: "polygon" //面图层
            , Extent: "extent"
            , Multipoint: "multipoint"
        },
        Code__MapDrawToolCode: {
            "Arrow": "ARROW"
            , "Circle": "CIRCLE"
            , "Ellipse": "ELLIPSE"
            , "FreehandPolygon": "FREEHAND_POLYGON"
            , "FreehandPolyline": "FREEHAND_POLYLINE"
            , "Polygon": "POLYGON"
            , "Polyline": "POLYLINE"
            , "Point": "POINT"
            , "Line": "LINE"
            , "Extent": "EXTENT"
            , "Triangle": "TRIANGLE"
            , "MultiPoint": "MULTI_POINT"
        },
        Code__RenderType: {
            UniqueValueRenderer: "UniqueValueRenderer",
            ClassBreaksRenderer: "ClassBreaksRenderer",
            SimpleRenderer: "SimpleRenderer",
            HeatmapRenderer: "HeatmapRenderer",
            DotDensityRenderer: "DotDensityRenderer",
            BlendRenderer: "BlendRenderer"
        },
        Code__CustomEvent: {
            OnPanEndEvent: "onPanEndEvent",
            OnZoomEndEvent: "onZoomEndEvent",
            OnZoomStartEvent: "onZoomStartEvent",
            OnMapClickEvent: "onMapClickEvent",
            OnMouseMoveEvent: "onMouseMoveEvent",
            OnMouseOverEvent: "onMouseOverEvent",
            OnMouseOutEvent: "onMouseOutEvent",
            OnResizeEvent: "onResizeEvent"
        }
    };

    var mapAPI = {
        // arcgis所在的窗口
        window: window
        //arcgis地图对象
        , map: null
        , mapId: null
        , mapJQ: null
        //arcgis地图初始范围和坐标系
        , defaultExtent: null
        , geometryService: null
        , defaultZoomLevel: 0
        , defaultMaxLevel: 17
        , defaultzoomScale: 0
        , defaultZoomToPoint: null
        //初始化地图容器
        , initMap: function (properties) {
            _this = this;
            var settings = {
                mapId: ""
                ,
                displayGraphicsOnPan: true//地图拖动时图形是否移动
                ,
                defaultExtent: {
                    //初始化范围
                    xmin: 0,
                    ymin: 0,
                    xmax: 0,
                    ymax: 0,
                    wkid: 4326
                }
                , logo: false//是否显示Esri Logo
                , slider: false//是否显示水平级别
                , scaleBar: false
                , onLoaded: function (evt) { //完成加载后触发事件
                }
                , geometryServiceUrl: ""//几何服务地址
                , isZoomEffect: true
            };
            $.extend(settings, properties);
            var options = {};

            if (fw.fwObject.FWObjectHelper.hasValue(settings.defaultExtent)) {
                if (settings.defaultExtent.xmin != 0 && settings.defaultExtent.ymin != 0 && settings.defaultExtent.xmax != 0
                    && settings.defaultExtent.ymax != 0 && settings.defaultExtent.wkid != 0) {
                    options.extent = new esri.geometry.Extent(settings.defaultExtent.xmin, settings.defaultExtent.ymin, settings.defaultExtent.xmax, settings.defaultExtent.ymax, esri.SpatialReference({ wkid: settings.defaultExtent.wkid }));
                    _this.defaultExtent = options.extent;
                } else {
                    options.extent = new esri.geometry.Extent(settings.defaultExtent.xmin, settings.defaultExtent.ymin, settings.defaultExtent.xmax, settings.defaultExtent.ymax, esri.SpatialReference(settings.defaultExtent.spatialJson));
                    _this.defaultExtent = options.extent;
                }
                ;
            }
            if (fw.fwObject.FWObjectHelper.hasValue(settings.defaultCenter)) {
                options.center = settings.defaultCenter;
                options.zoom = settings.defaultZoom;
            }
            if (fw.fwObject.FWObjectHelper.hasValue(settings.defaultZoomLevel)) {
                _this.defaultZoomLevel = settings.defaultZoomLevel;
            }
            options.logo = settings.logo;
            options.slider = settings.slider;
            options.spatialReference = options.extent.spatialReference;
            _this.map = new esri.Map(settings.mapId, options);
            _this.Enum = _Enum;
            _this.mapId = settings.mapId;
            _this.mapJQ = $("#" + settings.mapId);
            _this.map.spatialReference = options.spatialReference;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.geometryServiceUrl)) {
                esri.config.defaults.io.proxyUrl = mSet.proxyUrl;// page.webSiteRootUrl + "resources/Maps/arcgis/FrameWork/proxy.ashx";
                esri.config.defaults.io.alwaysUseProxy = true;
                _this.geometryService = new esri.tasks.GeometryService(settings.geometryServiceUrl);
                esri.config.defaults.geometryService = _this.geometryService;
            };
            dojo.connect(_this.map, "onLoad", function () {

                settings.onLoaded(settings.e);
                if (settings.isZoomEffect) {
                    _this.Effects._zoomEffect._init();
                    dojo.connect(_this.map, "onMouseWheel", function (e) {
                        var level = _this.map.getLevel();
                        switch (e.value) {
                            case 1:
                                if (level < _this.defaultMaxLevel) { _this.Effects._zoomEffect._show(e.value, e.screenPoint); };
                                break;
                            case -1:
                                if (level > 0 && level <= _this.defaultMaxLevel) { _this.Effects._zoomEffect._show(e.value, e.screenPoint); };
                                break;
                        }
                    });
                }
            });

            dojo.connect(_this.map, "onClick", function (e) {
                if ($.isFunction(settings.onClick)) {
                    settings.onClick(e);
                }
            });
        },
        //添加地图事件
        addMapEvent: function (eventName, event) {
            switch (eventName) {
                case _Enum.Code__CustomEvent.OnPanStartEvent:
                    //定义拖动完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.panStartEvent)) {
                        dojo.disconnect(_this.map.panStartEvent);
                        _this.map.panStartEvent = null;
                    }
                    ;
                    _this.map.panStartEvent = dojo.connect(_this.map, "onPanStart", function (evt) {
                        event(evt);
                    });
                    break;
                case _Enum.Code__CustomEvent.OnPanEndEvent:
                    //定义拖动完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.panEndEvent)) {
                        dojo.disconnect(_this.map.panEndEvent);
                        _this.map.panEndEvent = null;
                    }
                    ;
                    _this.map.panEndEvent = dojo.connect(_this.map, "onPanEnd", function (evt) {
                        event(evt);
                    });
                    break;
                case _Enum.Code__CustomEvent.OnMapClickEvent:
                    //定义地图点击监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.clickEvent)) {
                        dojo.disconnect(_this.map.clickEvent);
                        _this.map.clickEvent = null;
                    }
                    ;
                    _this.map.clickEvent = dojo.connect(_this.map, "onClick", function (evt) {
                        event(evt);
                    });
                    break;
                case _Enum.Code__CustomEvent.OnZoomStartEvent:
                    //定义缩放完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.zoomStartEvent)) {
                        dojo.disconnect(_this.map.zoomStartEvent);
                        _this.map.zoomStartEvent = null;
                    }
                    ;
                    _this.map.zoomStartEvent = dojo.connect(_this.map, "onZoomStart", function (evt) {
                        event(evt);
                    });
                    break;
                case _Enum.Code__CustomEvent.OnZoomEndEvent:
                    //定义缩放完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.zoomEndEvent)) {
                        dojo.disconnect(_this.map.zoomEndEvent);
                        _this.map.zoomEndEvent = null;
                    }
                    ;
                    _this.map.zoomEndEvent = dojo.connect(_this.map, "onZoomEnd", function (evt) {
                        event(evt);
                    });
                    break;
                case _Enum.Code__CustomEvent.OnMouseMoveEvent:
                    //定义缩放完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.mouseMoveEvent)) {
                        dojo.disconnect(_this.map.mouseMoveEvent);
                        _this.map.mouseMoveEvent = null;
                    }
                    ;
                    _this.map.mouseMoveEvent = dojo.connect(_this.map, "onMouseMove", function (evt) {
                        event(evt);
                    });
                    break;
                case _Enum.Code__CustomEvent.OnResizeEvent:
                    //定义缩放完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.resizeEvent)) {
                        dojo.disconnect(_this.map.resizeEvent);
                        _this.map.resizeEvent = null;
                    }
                    ;
                    _this.map.resizeEvent = dojo.connect(_this.map, "onResize", function (evt) {
                        event(evt);
                    });
                    break;
            }
            ;
        },
        //移除地图事件
        removeMapEvent: function (eventName) {
            switch (eventName) {
                case _Enum.Code__CustomEvent.OnPanStartEvent:
                    //定义拖动完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.panStartEvent)) {
                        dojo.disconnect(_this.map.panStartEvent);
                        _this.map.panStartEvent = null;
                    }
                    ;
                    break;
                case _Enum.Code__CustomEvent.OnPanEndEvent:
                    //定义拖动完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.panEndEvent)) {
                        dojo.disconnect(_this.map.panEndEvent);
                        _this.map.panEndEvent = null;
                    }
                    ;
                    break;
                case _Enum.Code__CustomEvent.OnMapClickEvent:
                    //定义地图点击监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.clickEvent)) {
                        dojo.disconnect(_this.map.clickEvent);
                        _this.map.clickEvent = null;
                    }
                    ;
                    break;
                case _Enum.Code__CustomEvent.OnZoomEndEvent:
                    //定义缩放完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.zoomEndEvent)) {
                        dojo.disconnect(_this.map.zoomEndEvent);
                        _this.map.zoomEndEvent = null;
                    }
                    ;
                    break;
                case _Enum.Code__CustomEvent.OnZoomStartEvent:
                    //定义缩放完成监听事件
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.zoomStartEvent)) {
                        dojo.disconnect(_this.map.zoomStartEvent);
                        _this.map.zoomStartEvent = null;
                    }
                    ;
                    break;
                case _Enum.Code__CustomEvent.OnMouseMoveEvent:
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.mouseMoveEvent)) {
                        dojo.disconnect(_this.map.mouseMoveEvent);
                        _this.map.mouseMoveEvent = null;
                    }
                    ;
                    break;
                case _Enum.Code__CustomEvent.OnResizeEvent:
                    if (fw.fwObject.FWObjectHelper.hasValue(_this.map.resizeEvent)) {
                        dojo.disconnect(_this.map.resizeEvent);
                        _this.map.resizeEvent = null;
                    }
                    ;
                    break;
            }
            ;
        },
        /**************************************************************************
        //基本操作
        ***************************************************************************/
        //==========缩放与平移(定位)==========
        //定位到某一个点
        zoomToPoint: function (properties) {
            var settings = {
                posX: 0//经度X值，默认0，可选参数
                ,
                posY: 0//纬度Y值，默认0，可选参数
                ,
                geometry: null//图形地理位置对象
                ,
                layerName: ""//业务图层名称
                ,
                layerKeyFieldName: ""//图层关键字段名称
                ,
                businessCode: ""//业务编码
                ,
                zoomScale: 0//缩放比例，默认0，可选参数
                ,
                zoomLevel: _this.defaultZoomLevel//缩放级别，默认0，可选参数
                ,
                flashTime: ""//动画时间，默认10000毫秒
                ,
                bFlash: false//是否显示闪烁
                ,
                flashSize: 40//闪烁图片大小
                ,
                reorderIndex: 2//闪烁图层显示顺序
                , offset: null
            };
            $.extend(settings, properties);
            var mapPoint = null, symbol = null, falshLayer = null;
            var businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
            if (settings.bFlash) {
                falshLayer = _this.getOrCreateLayer({ layerName: "FalshLayer" });
                _this.map.reorderLayer("FalshLayer", settings.reorderIndex);

                falshLayer.clear();
                symbol = new esri.symbol.PictureMarkerSymbol(page.webSiteRootUrl + 'resources/scripts/fw.map/themes/default/images/Location.gif', settings.flashSize, settings.flashSize);
                symbol.setOffset(-4, -10);
            }
            if (fw.fwObject.FWObjectHelper.hasValue(settings.posX)
                && fw.fwObject.FWObjectHelper.hasValue(settings.posY)
                && settings.posX > 0 && settings.posY > 0) {
                mapPoint = new esri.geometry.Point(settings.posX, settings.posY);
                mapPoint.spatialReference = _this.map.spatialReference;
                if (settings.bFlash) {
                    falshLayer.add(new esri.Graphic(mapPoint, symbol));
                }
                if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomScale)
                    && settings.zoomScale > 0) {
                    _this.map.setScale(settings.zoomScale);
                    _this.map.centerAt(mapPoint);
                } else {
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomLevel)
                        && settings.zoomLevel > 0) {
                        setTimeout(function () { _this.map.centerAndZoom(mapPoint, settings.zoomLevel); }, 300);
                    } else {
                        _this.map.centerAt(mapPoint);
                    }
                }
            } else if (fw.fwObject.FWObjectHelper.hasValue(settings.geometry)) {
                mapPoint = settings.geometry;
                if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomScale)
                    && settings.zoomScale > 0) {
                    _this.map.setScale(settings.zoomScale);
                    _this.map.centerAt(mapPoint);
                } else {
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomLevel)
                        && settings.zoomLevel > 0) {
                        setTimeout(function () { _this.map.centerAndZoom(mapPoint, settings.zoomLevel); }, 300);
                    } else {
                        _this.map.centerAt(mapPoint);
                    }
                }
                ;
            } else {
                if (!fw.fwObject.FWObjectHelper.hasValue(settings.businessCode)) {
                    return;
                }
                var graphics = businessLayer.graphics;
                var isValitedClick = false,
                    geo;
                for (var i = 0; i < graphics.length; i++) {
                    //查找关注点
                    if (graphics[i].attributes[settings.layerKeyFieldName] == settings.businessCode) {
                        geo = { x: graphics[i].geometry.x, y: graphics[i].geometry.y };
                        if (fw.fwObject.FWObjectHelper.hasValue(settings.offset)) {
                            geo.x += settings.offset.x;
                            geo.y += settings.offset.y;
                        };
                        mapPoint = new esri.geometry.Point(geo.x, geo.y);
                        mapPoint.spatialReference = _this.map.spatialReference;
                        var clickScreenPoint = _this.map.toScreen(mapPoint);
                        var clickGraphic = graphics[i];
                        var evt = {
                            graphic: clickGraphic,
                            screenPoint: clickScreenPoint
                        };
                        if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.clickEvt)) {
                            dojo.disconnect(businessLayer.clickEvt);
                            businessLayer.clickEvt = null;
                        };

                        //                        businessLayer.clickEvt = dojo.connect(mapAPI.map, "onPanEnd", function (e) {
                        //                            if (evt) {
                        //                                businessLayer.onClick(evt);
                        //                            };
                        //                            evt = null;
                        //                        });
                        if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomScale)
                                    && settings.ZoomScale > 0) {
                            if (mapAPI.map.getScale() > settings.zoomScale) {
                                mapAPI.map.setScale(settings.zoomScale);
                                businessLayer.onClick(evt);
                            };
                            mapAPI.map.centerAt(mapPoint);
                        } else {
                            if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomLevel)) {
                                if (mapAPI.map.getLevel() < settings.zoomLevel) {
                                    mapAPI.map.setLevel(settings.zoomLevel);
                                    businessLayer.onClick(evt);
                                };
                                _this.map.centerAndZoom(mapPoint, settings.zoomLevel);
                                //mapAPI.map.centerAt(mapPoint);
                                //setTimeout(function () { _this.map.centerAndZoom(mapPoint, settings.zoomLevel); }, 300);
                            }
                            ;
                        };
                        isValitedClick = true;
                        break;
                    }
                }
            }
            if (fw.fwObject.FWObjectHelper.hasValue(settings.FlashTime) && fw.fwObject.FWObjectHelper.hasValue(falshLayer)) {
                setTimeout(function () { falshLayer.clear(); }, settings.flashTime);
            };
            if ($.isFunction(settings.callback)) {
                settings.callback();
            };
        },
        //定位到某一个线或面（中心点）
        zoomToPolygon: function (geometry, zoomLevel, onCompletedEvent) {
            var mapPoint = this.getPolygonCenter(geometry);
            if (fw.fwObject.FWObjectHelper.hasValue(zoomLevel)
                && zoomLevel > 0) {
                _this.map.centerAndZoom(mapPoint, zoomLevel);
            } else {
                _this.map.centerAt(mapPoint);
            }
            if ($.isFunction(onCompletedEvent)) {
                var ExtentChangeEvent = dojo.connect(_this.map, "onExtentChange", onCompletedEvent);
                _this.map.ExtentChangeEvent = ExtentChangeEvent;
            }
        },
        queryPolygon: function (properties) {
            var settings = {
                where: ""
                , sUrl: ""
                , symbol: ""
                , layerName: "highlightLayer"
                , xPixels: 0
                , yPixels: 0
            };
            $.extend(settings, properties);
            var query = new esri.tasks.Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            if (fw.fwObject.FWObjectHelper.hasValue(settings.where)) {
                query.where = settings.where;
            } else {
                query.where = "1=1";
            };
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.symbol)) {
                settings.symbol = mapAPI.getDefaultSymbolByName(mapAPI.Enum.Code__SymbolNames.Polyline_Highlighte);
            };
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.layer)) {
                settings.layer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
            };
            settings.layer.clear();
            if (!settings.layer.visible) {
                settings.layer.show();
            };
            query.outSpatialReference = _this.map.spatialReference;
            var queryTask = new esri.tasks.QueryTask(settings.sUrl);
            queryTask.execute(query, function (results) {
                if (results.features.length > 0) {
                    var polygon = new esri.geometry.Polygon(mapAPI.map.spatialReference);
                    for (var i = 0; i < results.features.length; i++) {
                        var feature = results.features[i];
                        for (var z = 0; z < feature.geometry.rings.length; z++) {
                            polygon.addRing(feature.geometry.rings[z]);
                        };
                        var polygonGraphic = new esri.Graphic(polygon, settings.symbol);
                        // polygonGraphic.setAttributes(feature.attributes);
                        settings.layer.add(polygonGraphic);
                        if (!settings.layer.visible) {
                            settings.layer.show();
                        };
                    };

                    if ($.isFunction(settings.callback)) {
                        settings.callback(polygon);
                    };

                };
            }, function (error) {
                console.log(error);
            });
        },
        zoomToExtent: function (properties) {
            var settings = {
                polygon: null
                , xPixels: 0
                , yPixels: 0
                , expandFactor: 1
            };
            $.extend(settings, properties);
            var extent = settings.polygon.getExtent();
            var iPerHeight = extent.getHeight() / mapAPI.map.height;
            var iPerWidth = extent.getWidth() / mapAPI.map.width;
            var dx = settings.xPixels * iPerWidth;
            var dy = settings.yPixels * iPerHeight;

            mapAPI.map.setExtent(extent.expand(settings.expandFactor).offset(dx, dy));
        }
        //设置地图切换到某一个区域
       , mapChangeExtent: function (newExtent) {
           _this.map.setExtent(newExtent);
       },
        //根据坐标定位到某个区域
        zoomToPosition: function (xmin, ymin, xmax, ymax) {
            var newExtent = new esri.geometry.Extent(xmin, ymin, xmax, ymax);
            _this.mapChangeExtent(newExtent);
        },
        getPolygonCenter: function (geometry) {
            return geometry.getExtent().getCenter();
        },
        //回到地图初始范围
        zoomToFullExtent: function () {
            if (fw.fwObject.FWObjectHelper.hasValue(_this.defaultZoomToPoint)) {
                _this.zoomToPoint({ posX: _this.defaultZoomToPoint.x, posY: _this.defaultZoomToPoint.y, zoomLevel: _this.defaultZoomToPoint.defaultZoomLevel });
            } else {
                _this.mapChangeExtent(_this.defaultExtent);
            }
            ;
        },
        //设置地图缩放到第几级别
        setZoom: function (level) {
            _this.map.setZoom(level);
        },
        //WGS84转百度
        wgs84tobd09: function (lonLat) {
            var wgs84togcj02 = coordtransform.wgs84togcj02(lonLat.x, lonLat.y);
            //国测局坐标转百度经纬度坐标
            var gcj02tobd09 = coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
            var newGeo = { x: gcj02tobd09[0], y: gcj02tobd09[1] };
            return newGeo;
        },
        //百度转WGS84
        bd09towgs84: function (lonLat) {
            var bd09togcj02 = coordtransform.bd09togcj02(lonLat.lng, lonLat.lat);
            var gcj02towgs84 = coordtransform.gcj02towgs84(bd09togcj02[0], bd09togcj02[1]);
            var newGeo = { x: gcj02towgs84[0], y: gcj02towgs84[1] };
            return newGeo;
        },
        /**************************************************************************
        //图层
        ***************************************************************************/
        //==========底图服务==========
        //加载底图，一般加载切片图、动态地图等
        addMapService: function (properties) {
            //添加地图
            var settings = {
                mapServiceLayerType: "esri.layers.ArcGISDynamicMapServiceLayer" //地图服务类型
                ,
                layerServiceUrl: "" //地图服务地址
                ,
                opacity: 1 //透明度
                ,
                layerName: ""//地图名称
                ,
                childLayerId: null//显示的子图层编号
                ,
                showAttribution: false//是否显示属性
                ,
                showMaxScale: 0,
                showMinScale: 0,
                isVisible: true//是否显示图层
                ,
                infoWindowsettings: null//消息窗对象
                ,
                callback: function () {
                    //加载完成后回调函数
                },
                legend: null//图例数组
                ,
                isSymbolHLClear: true//是否清除高亮显示的图形
            };
            $.extend(settings, properties);
            //如果有图例的则显示
            if (fw.fwObject.FWObjectHelper.hasValue(settings.legend)) {
                //图例
                var legendSettings = {
                    arcgisWindow: _this.arcgisWindow,
                    map: _this.map,
                    width: 150,
                    legend: settings.legend
                };
                $("#" + _this.map.id + "_Legend").LegendControl(legendSettings);
                $("#" + _this.map.id + "_Legend").show();
            }
            ;

            var layerIndex = _this.getLayerIndex(settings.layerName);
            var Layer = null;

            if (layerIndex >= 0) {
                Layer = _this.map.getLayer(settings.layerName);
            } else {
                Layer = _this.createLayer(settings.mapServiceLayerType, settings.layerServiceUrl);

            }
            ;

            if (fw.fwObject.FWObjectHelper.hasValue(settings.showMaxScale) && settings.showMaxScale > 0) {
                // Layer.maxScale = settings.showMaxScale;
                Layer.setMaxScale(settings.showMaxScale);
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.showMinScale) && settings.showMinScale > 0) {
                // Layer.minScale = settings.showMinScale;
                Layer.setMinScale(settings.showMinScale);
            }
            ;

            if (Layer != null) {
                Layer.mapServiceLayerType = settings.mapServiceLayerType;
                Layer.opacity = settings.opacity;
                Layer.visible = settings.isVisible;
                if (fw.fwObject.FWObjectHelper.hasValue(settings.id)) {
                    Layer.id = settings.id;
                } else {
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.layerName)) {
                        Layer.id = settings.layerName;
                    }
                }
                //控制显示的子图层编号
                if (fw.fwObject.FWObjectHelper.hasValue(settings.childLayerId)) {
                    Layer.setVisibleLayers([settings.childLayerId]);
                }
                ;


                var IsShowInfoWindow = false;
                var layerOnMouseClick = null;
                IsShowInfoWindow = false;
                if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings)
                    && fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.FieldArray)) {
                    for (var i = 0; i < settings.infoWindowsettings.FieldArray.length; i++) {
                        var entity = settings.infoWindowsettings.FieldArray[i];
                        if (fw.fwObject.FWObjectHelper.hasValue(entity.IsTitle) && entity.IsTitle) {
                            IsShowInfoWindow = true;
                        }
                        ;
                        if (fw.fwObject.FWObjectHelper.hasValue(entity.IsShow) && entity.IsShow) {
                            IsShowInfoWindow = true;
                        }
                        ;
                        if (IsShowInfoWindow) {
                            break;
                        }
                        ;
                    }
                    ;
                }
                ;

                if (IsShowInfoWindow || fw.fwObject.FWObjectHelper.hasValue(settings.SymbolHLColor)) {
                    layerOnMouseClick = function (evt) {
                        var geometry = new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y);

                        var settings = {
                            layerUrl: settings.layerServiceUrl,
                            geometry: geometry,
                            layerIds: settings.childLayerId,
                            onCompletedEvent: function (result) {
                                if (result.length > 0) {
                                    var g = result[0].feature;

                                    //如果需要高亮显示的
                                    if (fw.fwObject.FWObjectHelper.hasValue(settings.SymbolHLColor)) {
                                        //清空高亮显示的网格  
                                        if (settings.isSymbolHLClear) {
                                            _this.clearGraphicsLayer({ layerName: "GL" });
                                        }
                                        ;
                                        symbol = { lineColor: settings.SymbolHLColor, borderWidth: settings.SymbolBorderWidth, fillColor: settings.SymbolHLFillColor };
                                        var graphicSetting = {
                                            layerName: "GL",
                                            reorderLayerIndex: 10,
                                            geometryList: [{ Geometry: g.geometry, symbol: _this.getDefaultSymbolByName(_Enum.Code__SymbolNames.Polygon, symbol), Attributes: g.attributes }]
                                        };
                                        _this.addGraphicToLayer(graphicSetting);
                                    }
                                    ;
                                    if (IsShowInfoWindow) {
                                        infoEvent(g, geometry);
                                    }
                                    ;
                                }
                                ;
                            }
                        };
                        _this.taskIdentify(settings);

                        var infoEvent = function (g, geometry) {
                            var TitleHtml = "";
                            var ContentHtml = "";
                            var iRowCount = 0;
                            if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings)
                                && fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.FieldArray)) {
                                var Width = 350;
                                var Height = 140;
                                if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.Width)) {
                                    Width = settings.infoWindowsettings.Width;
                                }
                                ;
                                if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.Height)) {
                                    Height = settings.infoWindowsettings.Height;
                                }
                                ;
                                var divJQ = $("<div class=\"divMapInfoWindowContent\"></div>").width(Width).appendTo("body");
                                var divInfoJQ = $("<div class=\"divInfo\"></div>").appendTo(divJQ);
                                var data = { Ticket: $.page.ticket }; //跳转页面传参
                                for (var i = 0; i < settings.infoWindowsettings.FieldArray.length; i++) {
                                    var entity = settings.infoWindowsettings.FieldArray[i];
                                    if (fw.fwObject.FWObjectHelper.hasValue(entity.IsTitle) && entity.IsTitle) {
                                        TitleHtml = g.attributes[entity.FieldName];
                                    }
                                    ;
                                    if (fw.fwObject.FWObjectHelper.hasValue(entity.IsShow) && entity.IsShow) {
                                        if (!fw.fwObject.FWObjectHelper.hasValue(entity.ShowName)) {
                                            entity.ShowName = entity.FieldName;
                                        }
                                        ;
                                        if (fw.fwObject.FWObjectHelper.hasValue(g.attributes[entity.FieldName]) && jQuery.trim(g.attributes[entity.FieldName]) != "") {
                                            ContentHtml += "    <tr><td>" + entity.ShowName + ":</td><td>" + g.attributes[entity.FieldName] + "</td></tr>";
                                        }
                                        ;
                                    }
                                    ;
                                    if (fw.fwObject.FWObjectHelper.hasValue(entity.IsParameter) && entity.IsParameter) {
                                        if (!fw.fwObject.FWObjectHelper.hasValue(entity.ParameterName)) {
                                            entity.ParameterName = entity.FieldName;
                                        }
                                        ;
                                        data[entity.ParameterName] = g.attributes[entity.FieldName];
                                    }
                                    ;
                                }
                                ;
                                if (fw.fwObject.FWObjectHelper.hasValue(ContentHtml)) {
                                    ContentHtml = "<table style=\"width:auto;\">" + ContentHtml + "</table>";
                                    $(ContentHtml).appendTo(divInfoJQ);
                                }
                                ;

                                if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.DetailUrl)) {
                                    var divDetailInfoJQ = $("<div class=\"divDetailInfo\"></div>").appendTo(divJQ).bind("click", data[0], function (e) {
                                        var Opensettings = {
                                            TitleHtml: TitleHtml,
                                            IsHtmlPage: true,
                                            Url: page.webSiteRootUrl + settings.infoWindowsettings.DetailUrl,
                                            Data: data,
                                            Width: divJQ.outerWidth() + 20,
                                            Height: divJQ.outerHeight() + 10
                                        };
                                        fw.topWindow().jQueryExtension.UI.Open(Opensettings);
                                    });
                                }
                                ;
                                _this.mapInfoWindowShow({
                                    Title: TitleHtml,
                                    domNode: divJQ[0],
                                    evt: geometry,
                                    Width: 200,
                                    Height: 100
                                });
                                divJQ.parent().css("overflow", "hidden");
                            }
                        };


                    };
                    var clickHandler = dojo.connect(_this.map, "onClick", layerOnMouseClick);
                    _this.map.clickHandler = clickHandler;
                };
            }

            if (layerIndex < 0) {
                _this.map.addLayer(Layer);
            }
            ;
            return Layer;
        },
        //删除底图服务
        removeMapService: function (properties) {
            var settings = {
                layerName: ""
            };
            $.extend(settings, properties);
            var layerIndex = -1;
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.id)
                && fw.fwObject.FWObjectHelper.hasValue(settings.layerName)) {
                settings.id = settings.layerName;
            }
            for (var i = 0; i < _this.map.layerIds.length; i++) {
                if (_this.map.layerIds[i] == settings.id) {
                    layerIndex = i;
                    break;
                }

            }
            if (layerIndex < 0) return;

            var oldLayer = _this.map.getLayer(settings.id);
            _this.map.removeLayer(oldLayer);
            //点击事件
            //如果原来有点击事件的先清空
            if (fw.fwObject.FWObjectHelper.hasValue(_this.map.clickHandler)) {
                dojo.disconnect(_this.map.clickHandler);
                _this.map.clickHandler = null;
            }
        },
        //切换底图服务
        modiMapService: function (properties) { //修改地图服务地址
            //添加地图
            var settings = {
                mapServiceLayerType: "esri.layers.arcgisDynamicMapServiceLayer" //地图服务类型
                ,
                layerServiceUrl: ""//地图服务地址
                ,
                layerName: ""//图层名称
            };
            $.extend(settings, properties);
            var layerIndex = -1;
            for (var i = 0; i < _this.map.layerIds.length; i++) {
                if (_this.map.layerIds[i] == settings.layerName) {
                    layerIndex = i;
                    break;
                }

            }
            if (layerIndex < 0) {
                return
            };

            var oldLayer = _this.map.getLayer(settings.layerName);
            _this.map.removeLayer(oldLayer);
            var newLayer = this.createLayer(settings.mapServiceLayerType, settings.layerServiceUrl);
            if (newLayer != null) {
                newLayer.mapServiceLayerType = settings.mapServiceLayerType;
                newLayer.opacity = oldLayer.opacity;
                newLayer.visible = oldLayer.visible;
                newLayer.id = oldLayer.id;

                _this.map.addLayer(newLayer, layerIndex);
            }
        },
        //创建地图服务图层
        createLayer: function (mapServiceLayerType, layerServiceUrl, Options) {
            var Layer = null;
            switch (mapServiceLayerType) {
                case _Enum.Code__MapServiceLayerType.ImageService:
                    Layer = new esri.layers.ArcGISImageServiceLayer(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TiledMapService:
                    Layer = new esri.layers.ArcGISTiledMapServiceLayer(layerServiceUrl, Options);
                    break;
                case _Enum.Code__MapServiceLayerType.DynamicMapService:
                    Layer = new esri.layers.ArcGISDynamicMapServiceLayer(layerServiceUrl, Options);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuImageService:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_Image(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuPlaceService:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_PlaceName(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuRoadNetService:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_cia_c(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuVectorService:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_Vector(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.GoogleImageService:
                    Layer = new esri.layers.GoogleTiledMapServiceLayer_Image(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.GoogleVectorService:
                    Layer = new esri.layers.GoogleTiledMapServiceLayer_Vector(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.GoogleTerrainService:
                    Layer = new esri.layers.GoogleTiledMapServiceLayer_Terrain(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.BaiDuImageService:
                    Layer = new esri.layers.BaiDuTiledMapServiceLayer_Image(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.BaiDuVectorService:
                    Layer = new esri.layers.BaiDuTiledMapServiceLayer_Vector(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_img_c:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_img_c(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_vec_c:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_vec_c(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_cva_c:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_cva_c(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_ter_c:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_ter_c(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_cta_c:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_cta_c(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_NJDLG_DT_18_20N:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_NJDLG_DT_18_20N(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_NJDLG_ZJ_18_20N:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_NJDLG_ZJ_18_20N(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_NJDOM_ZJ_18_19_N:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_NJDOM_ZJ_18_19_N(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.TianDiTuService_NJDOM_DT_18_19_N:
                    Layer = new esri.layers.TianDiTuTiledMapServiceLayer_NJDOM_DT_18_19_N(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.Map512ImageTileLayer:
                    Layer = new esri.layers.Map512ImageTileLayer(layerServiceUrl);
                    break;
                case _Enum.Code__MapServiceLayerType.Map512VetorTileLayer:
                    Layer = new esri.layers.Map512VetorTileLayer(layerServiceUrl);
                    break;
            }
            ;
            return Layer;
        },
        //验证矢量图层是否存在
        checkExistMSLayer: function (layerName) {
            var layerIndex = this.getLayerIndex(layerName);
            return layerIndex == -1 ? false : true;
        },
        //==========动态2D地图服务==========
        //根据图层编号加载地图服务
        addMSLayerByLayerId: function (properties) {
            var settings = {
                isVisible: true//图层是否可见
                ,
                layerName: ""//图层名称
                ,
                childLayerId: ""//子图层编号
                ,
                mapServiceLayerType: _Enum.Code__MapServiceLayerType.DynamicMapService//地图服务类型
                ,
                layerServiceUrl: ""//地图服务地址
                ,
                reorderLayerIndex: ""//排序
                ,
                Opacity: 0.8//图层透明度
                ,
                showMaxScale: 0,
                showMinScale: 0,
                onClickEvent: function () {
                    //图层点击事件
                }
            };
            $.extend(settings, properties);
            var businessLayer = null;

            if (this.checkExistMSLayer(settings.layerName)) {
                businessLayer = _this.map.getLayer(settings.layerName);
            } else {
                businessLayer = this.createLayer(settings.mapServiceLayerType, settings.layerServiceUrl, { "id": settings.layerName });
                _this.map.addLayer(businessLayer);
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.reorderLayerIndex)) {
                _this.map.reorderLayer(businessLayer, settings.reorderLayerIndex);
            }
            ;
            businessLayer.setVisibility(settings.isVisible);
            //如果动态子图层不为空，则控制子图层显示
            if (settings.mapServiceLayerType == _Enum.Code__MapServiceLayerType.DynamicMapService) {
                if (fw.fwObject.FWObjectHelper.hasValue(settings.childLayerId)) {
                    //后期再考虑如果有多个的情况
                    //        for (var i = 0; i < settings.ChildLayerName.length; i++) {
                    //        };
                    //var index = GetQueryLayerIndex(settings.ChildLayerName);
                    // businessLayer.setVisibleLayers([index]);
                    businessLayer.setVisibleLayers([settings.childLayerId]);
                }
                ;
            }
            ;


            if (fw.fwObject.FWObjectHelper.hasValue(settings.Opacity)) {
                businessLayer.opacity = settings.Opacity;
            } else {
                businessLayer.opacity = 0.8;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.showMaxScale) && settings.showMaxScale > 0) {
                Layer.maxScale = settings.showMaxScale;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.showMinScale) && settings.showMinScale > 0) {
                Layer.minScale = settings.showMinScale;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.updateEndHandle)) {
                dojo.disconnect(businessLayer.updateEndHandle);
                businessLayer.updateEndHandle = null;
            }
            ;
            if ($.isFunction(settings.onCompletedEvent)) {
                var updateEndHandle = dojo.connect(businessLayer, "onUpdateEnd", settings.onCompletedEvent);
                businessLayer.updateEndHandle = updateEndHandle;
            }
            ;

            //图例部分_目前显示时变成无图例 
            //            var legend = new esri.dijit.legend({
            //                map: _this.map,
            //                layerInfos: businessLayer,
            //                arrangment: esri.dijit.legend.ALIGN_RIGHT,
            //                 autoUpdate: true
            //            }, "divLegend");
            //            legend.startup();

            //点击事件
            //如果原来有点击事件的先清空
            if (fw.fwObject.FWObjectHelper.hasValue(_this.map.clickHandler)) {
                dojo.disconnect(_this.map.clickHandler);
                _this.map.clickHandler = null;
            }
            if ($.isFunction(settings.onClickEvent)) {
                var clickHandler = dojo.connect(_this.map, "onClick", settings.onClickEvent);
                _this.map.clickHandler = clickHandler;
            }
            ;

        },
        toggleLayer: function (properties) {
            var settings = {
                layerName: "",
                isVisible: null
            };
            $.extend(settings, properties);
            var layer = _this.map.getLayer(settings.layerName);
            if (layer) {
                if (!fw.fwObject.FWObjectHelper.hasValue(settings.isVisible)) {
                    layer.setVisibility(!layer.visible);
                } else {
                    layer.setVisibility(settings.isVisible);
                };
                //点击事件
                //如果原来有点击事件的先清空
                if (fw.fwObject.FWObjectHelper.hasValue(_this.map.clickHandler)) {
                    dojo.disconnect(_this.map.clickHandler);
                    _this.map.clickHandler = null;
                }
            } else if (_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerName })) {
                var layer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
                if (!fw.fwObject.FWObjectHelper.hasValue(settings.isVisible)) {
                    layer.setVisibility(!layer.visible);
                } else {
                    layer.setVisibility(settings.isVisible);
                };
            }
        },
        //创建聚类函数
        addClusterLayer: function (properties) {
            var settings = {
                data: [],
                distance: 100, // The max number of pixels between points to group points in the same cluster. Default value is 50.
                layerName: "clusters",
                labelColor: "#fff",
                labelOffset: 10,
                showMinScale: 0,
                resolution: mapAPI.map.extent.getWidth() / mapAPI.map.width,
                singleColor: "#888",
                onClickEvent: undefined,
                onBeforeEvent: function () {
                },
                rendererSingleFuc: function (value) { },
                rendererSingleField: "industryWaterQuality"//重渲染聚类单个点位的样式
            };
            $.extend(settings, properties);
            if (_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerName })) {
                _this.map.getLayer("Business_" + settings.layerName).show();
            } else {
                var cL = new esri.ClusterLayer(settings);
                cL.id = "Business_" + settings.layerName;
                cL.name = settings.layerName;

                if ($.isFunction(settings.onBeforeEvent)) {
                    settings.onBeforeEvent(cL); //实际是需要先渲染完成后再添加至地图上
                }
                _this.map.addLayer(cL);
            }
        },
        //移除图层
        //非业务图层，目前包括Draw图层、聚类图层
        removeElementLayer: function (properties) {
            var settings = {
                layerName: ""
            };
            $.extend(settings, properties);
            if (_this.checkExistDynamicLayer({ layerName: settings.layerName })) {
                _this.map.removeLayer(arcgis_DynamicElementLayer[settings.layerName]);
                arcgis_DynamicElementLayer[settings.layerName] = null;
            }
            ;
        },
        //==========要素服务==========
        //添加业务图层
        businessLayerShow: function (properties) {
            var settings = {
                layerName: ""//业务图层名称layerName
                ,
                layerServiceUrl: ""//地图服务地址
                ,
                layerType: _Enum.Code__MapLayerTypeCode.Point //图层类型，一般有点图层、线图层和面图层，默认_Enum.Code__MapLayerTypeCode.Point
                ,
                symbol: null//图层渲染样式
                ,
                graphicList: null //自定义graphics列表
                ,
                geometryList: null,
                showLayeAttribution: false//是否显示图层属性
                ,
                showMaxScale: 0 //图层显示最大Scale
                ,
                showMinScale: 0 //图层显示最小Scale
                ,
                displayOnPan: true//图形在移动期间是否显示
                ,
                isBusinessLayer: true//是否为业务图层
                ,
                isRendererByType: false //是否根据特殊渲染器渲染
                ,
                isFromDB: false //是否是从数据库获取点
                , symbolArray: null//渲染器参数
                , where: ""//渲染过滤条件
                , opacity: null
                , bindInfoTemplate: false//绑定infoTemplate
                , infoTemplate: null,
                onCompletedEvent: function () {
                    //回调函数，返回图层对象
                },
                isCallback: true,
                onClickEvent: function (evt) { //点击事件
                }
                , onMouseOverEvent: function (evt) {
                    mapAPI.map.setMapCursor("pointer");
                    //  $.publicControl.getMouseOverEvent(evt);
                }
                , onMouseOutEvent: function (evt) {
                    mapAPI.map.setMapCursor("default");
                    // $.publicControl.getMouseOutEvent(evt);
                }
            };
            $.extend(settings, properties);


            var Layerbegin = "Business_";
            if (!settings.isBusinessLayer)
                Layerbegin = "";

            if (settings.isRendererByType) {
                this.rendererLayerByType(settings);
            } else {
                if (!_this.checkExistDynamicLayer({ layerName: Layerbegin + settings.layerName }) || fw.fwObject.FWObjectHelper.hasValue(settings.geometryList) || fw.fwObject.FWObjectHelper.hasValue(settings.graphicList)) {
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.layerServiceUrl)) {
                        _this.loadDynamicLayer(settings);
                    } else {
                        this.addGraphicToLayer(settings);
                    }
                    ;
                } else {
                    var businessLayer = _this.getOrCreateLayer({ layerName: Layerbegin + settings.layerName });
                    if (settings.layerType != _Enum.Code__MapLayerTypeCode.Point) {//10.1版本featurelayer的Bug处理
                        var ramd = Math.random();
                        businessLayer.setDefinitionExpression(ramd + "=" + ramd);
                    }
                    businessLayer.show();
                    if ($.isFunction(settings.onClickEvent)) {
                        settings.onCompletedEvent(businessLayer);
                    }
                    ;
                    return;
                }
                ;
            }
            ;
            var businessLayer = _this.getOrCreateLayer({ layerName: Layerbegin + settings.layerName });
            businessLayer.displayOnPan = settings.displayOnPan;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.showMaxScale) && settings.showMaxScale > 0) {
                businessLayer.maxScale = settings.showMaxScale;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.showMinScale) && settings.showMinScale > 0) {
                businessLayer.minScale = settings.showMinScale;
            }
            ;


            if ($.isFunction(settings.onMouseOverEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.mouseoverHandler)) {
                    dojo.disconnect(businessLayer.mouseoverHandler);
                    businessLayer.mouseoverHandler = null;
                }
                var mouseoverHandler = dojo.connect(businessLayer, "onMouseOver", settings.onMouseOverEvent);
                businessLayer.mouseoverHandler = mouseoverHandler;
            }
            ;
            if ($.isFunction(settings.onMouseOutEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.mouseoutHandler)) {
                    dojo.disconnect(businessLayer.mouseoutHandler);
                    businessLayer.mouseoutHandler = null;
                }
                var mouseoutHandler = dojo.connect(businessLayer, "onMouseOut", settings.onMouseOutEvent);
                businessLayer.mouseoutHandler = mouseoutHandler;
            }
            ;


            //显示默认弹出框
            var IsShowInfoWindow = false;
            var layerOnMouseClick = null;
            if (!IsShowInfoWindow && fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings)
                        && fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.FieldArray)) {
                for (var i = 0; i < settings.infoWindowsettings.FieldArray.length; i++) {
                    var entity = settings.infoWindowsettings.FieldArray[i];
                    if (fw.fwObject.FWObjectHelper.hasValue(entity.IsTitle) && entity.IsTitle) {
                        IsShowInfoWindow = true;
                    }
                    ;
                    if (fw.fwObject.FWObjectHelper.hasValue(entity.IsShow) && entity.IsShow) {
                        IsShowInfoWindow = true;
                    }
                    ;
                    if (IsShowInfoWindow) {
                        break;
                    }
                    ;
                }
                ;
            }
            ;
            if (IsShowInfoWindow) {
                // 点击显示
                layerOnMouseClick = function (evt) {
                    var TitleHtml = "";
                    var ContentHtml = "";
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings)
                                && fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.FieldArray)) {
                        var Width = 350;
                        var divJQ = $("<div class=\"divMapInfoWindowContent\"></div>").width(Width).appendTo("body");
                        var divInfoJQ = $("<div class=\"divInfo\"></div>").appendTo(divJQ);
                        var data = { Ticket: $.page.ticket }; //跳转页面传参
                        for (var i = 0; i < settings.infoWindowsettings.FieldArray.length; i++) {
                            var entity = settings.infoWindowsettings.FieldArray[i];
                            if (fw.fwObject.FWObjectHelper.hasValue(entity.IsTitle) && entity.IsTitle) {
                                TitleHtml = evt.graphic.attributes[entity.FieldName];
                            }
                            ;
                            if (fw.fwObject.FWObjectHelper.hasValue(entity.IsShow) && entity.IsShow) {
                                if (!fw.fwObject.FWObjectHelper.hasValue(entity.ShowName)) {
                                    entity.ShowName = entity.FieldName;
                                }
                                ;

                                if (fw.fwObject.FWObjectHelper.hasValue(evt.graphic.attributes[entity.FieldName]) && jQuery.trim(evt.graphic.attributes[entity.FieldName]) != "") {
                                    ContentHtml += "    <tr><td>" + entity.ShowName + ":</td><td>" + evt.graphic.attributes[entity.FieldName] + "</td></tr>";
                                }
                                ;
                            }
                            ;
                            if (fw.fwObject.FWObjectHelper.hasValue(entity.IsParameter) && entity.IsParameter) {
                                if (!fw.fwObject.FWObjectHelper.hasValue(entity.ParameterName)) {
                                    entity.ParameterName = entity.FieldName;
                                }
                                ;
                                data[entity.ParameterName] = evt.graphic.attributes[entity.FieldName];
                            }
                            ;
                        }
                        ;
                        if (fw.fwObject.FWObjectHelper.hasValue(ContentHtml)) {
                            ContentHtml = "<table style=\"width:auto;\">" + ContentHtml + "</table>";
                            $(ContentHtml).appendTo(divInfoJQ);
                        }
                        ;

                        if (fw.fwObject.FWObjectHelper.hasValue(settings.infoWindowsettings.DetailUrl)) {
                            var divDetailInfoJQ = $("<div class=\"divDetailInfo\"></div>").appendTo(divJQ).bind("click", data[0], function (e) {
                                var Opensettings = {
                                    TitleHtml: TitleHtml,
                                    IsHtmlPage: true,
                                    Url: page.webSiteRootUrl + settings.infoWindowsettings.DetailUrl,
                                    Data: data,
                                    Width: 900,
                                    Height: 600
                                };
                                fw.topWindow().jQueryExtension.UI.Open(Opensettings);
                            });
                        }
                        ;
                        _this.mapInfoWindowShow({
                            Title: TitleHtml,
                            domNode: divJQ[0],
                            evt: evt,
                            Width: divJQ.outerWidth(),
                            Height: divJQ.outerHeight()
                        });
                        divJQ.parent().css("overflow", "hidden");
                    }

                };
            }
            ;


            //点击事件
            if ($.isFunction(settings.onClickEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.clickHandler)) {
                    dojo.disconnect(businessLayer.clickHandler);
                    businessLayer.clickHandler = null;
                }
                var clickHandler = dojo.connect(businessLayer, "onClick", settings.onClickEvent);
                businessLayer.clickHandler = clickHandler;
            } else if (IsShowInfoWindow) {
                var clickHandler = dojo.connect(businessLayer, "onClick", layerOnMouseClick);
                businessLayer.clickHandler = clickHandler;
            }
            ;



            //加载图层完成事件
            if ($.isFunction(settings.onLoadEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.loadHandle)) {
                    dojo.disconnect(businessLayer.loadHandle);
                    businessLayer.loadHandle = null;
                }
                ;
                businessLayer.loadHandle = businessLayer.on("load", function () {
                    settings.onLoadEvent(businessLayer);
                });
            }


            //渲染完成回调事件
            if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.updateEndHandle)) {
                dojo.disconnect(businessLayer.updateEndHandle);
                businessLayer.updateEndHandle = null;
            }
            var updateEndHandle = dojo.connect(businessLayer, "onUpdateEnd", function () {
                // businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
                if ($.isFunction(settings.onCompletedEvent) && settings.isCallback) {
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.data)) {
                        settings.onCompletedEvent(settings.e, settings.data);
                    } else {
                        settings.onCompletedEvent(businessLayer);
                    }
                    ;
                }
                ;
                settings.isCallback = false;
            });
            businessLayer.updateEndHandle = updateEndHandle;



            return businessLayer;
        },
        //移除业务图层
        businessLayerRemove: function (properties) {
            var settings = {
                layerName: "",
                isBusinessLayer: true
            };
            $.extend(settings, properties);
            var businessLayer;
            if (settings.keyword) { settings.isBusinessLayer = false; };
            if (settings.isBusinessLayer) { settings.layerName = "Business_" + settings.layerName; }
            if (_this.checkExistDynamicLayer({ layerName: settings.layerName })) {
                businessLayer = _this.getOrCreateLayer({ layerName: settings.layerName });
                if (businessLayer) {
                    _this.map.removeLayer(businessLayer);
                };
            } else if (fw.fwObject.FWObjectHelper.hasValue(settings.keyword)) {
                var layerIds = _this.map.graphicsLayerIds;
                for (var i = 0; i < layerIds.length; i++) {
                    if (layerIds[i].indexOf(settings.keyword) != -1) {
                        businessLayer = _this.map.getLayer(layerIds[i]);
                        _this.map.removeLayer(businessLayer);
                    };
                };
            }
        },
        //隐藏关闭业务图层
        businessLayerHide: function (properties) {
            //隐藏关闭业务图层
            var settings = {
                layerName: ""//业务图层名称layerName
                ,
                layerNameArray: null//业务图层名称数组
                , isBusinessLayer: true
            };
            $.extend(settings, properties);
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.layerNameArray)) {
                settings.layerNameArray = [];
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.layerName)) {
                settings.layerNameArray.push(settings.layerName);
            }
            ;
            if (settings.layerNameArray.length <= 0
                && fw.fwObject.FWObjectHelper.hasValue(settings.layerName)) {
                settings.layerNameArray.push(settings.layerName);
            }

            if (settings.layerNameArray.length > 0) {
                for (var i = 0; i < settings.layerNameArray.length; i++) {
                    if (_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerNameArray[i] })) {
                        var businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerNameArray[i] });
                        businessLayer.hide();
                    }
                }
                ;
            } else {
                var arcgis_DynamicElementLayer = _this.map.graphicsLayerIds;
                for (var i = 0; i < _this.map.graphicsLayerIds.length; i++) {
                    var Layername = _this.map.graphicsLayerIds[i];
                    if (Layername.substring(0, 8) == "Business") {
                        if (_this.checkExistDynamicLayer({ layerName: Layername })) {
                            var businessLayer = this.map.getLayer(Layername);
                            businessLayer.hide();
                        }
                        //                  if (fw.fwObject.FWObjectHelper.hasValue($.LayersControl)) {
                        //                      $.LayersControl.SetLayerChecked({ Selector: divarcgisLayersControlJQ, layerName: Layername.substring(9), IsChecked: false });
                        //                  };
                        // SetLayerTreeChecked("hb", Layername.substring(9), "");
                    }
                    ;
                }
                ;
            }
            ;
            if ($.isFunction(settings.callback)) {
                settings.callback();
            }
            ;
        },
        //给要素图层添加过滤条件
        setFeatureLayerDefinition: function (properties) {
            var settings = {
                layer: null,
                layerName: null,
                where: ""//过滤条件
            };
            $.extend(settings, properties);
            if (!settings.layerName && !settings.layer) {
                return;
            }
            if (_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerName })) {
                settings.layer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
                settings.layer.setDefinitionExpression(settings.where);
            } else if (fw.fwObject.FWObjectHelper.hasValue(settings.layer)) {
                settings.layer.setDefinitionExpression(settings.where);
            }
        },
        //检查某个图层是否在数组arcgis_DynamicElementLayer中
        checkExistDynamicLayer: function (properties) {
            var settings = {
                layerName: ""//图层名称
            };
            $.extend(settings, properties);
            //if (arcgis_DynamicElementLayer[settings.layerName] == undefined && arcgis_DynamicElementLayer[settings.layerName] == null)
            if (!_this.map.getLayer(settings.layerName))
                return false;
            else
                return true;
        },
        //添加GraphicsLayer
        getOrCreateLayer: function (properties) {
            var settings = {
                layerName: ""//图层名称
                ,
                addLayer: ""//已创建图层名称
                ,
                showMaxScale: 0,
                showMinScale: 0//18035.741763839724 //图层显示最小Scale
            };
            $.extend(settings, properties);

            if (_this.map.getLayer(settings.layerName) == undefined) {
                if (!fw.fwObject.FWObjectHelper.hasValue(settings.addLayer)) {

                    settings.addLayer = new esri.layers.GraphicsLayer();
                }
                settings.addLayer.id = settings.layerName;

                if (fw.fwObject.FWObjectHelper.hasValue(settings.showMaxScale) && settings.showMaxScale > 0) {
                    settings.addLayer.setMaxScale(settings.showMaxScale);
                }
                ;
                if (fw.fwObject.FWObjectHelper.hasValue(settings.showMinScale) && settings.showMinScale > 0) {
                    settings.addLayer.setMinScale(settings.showMinScale);
                };
              
                    _this.map.addLayer(settings.addLayer, settings.layerIndex);
            } else {
                settings.addLayer = _this.map.getLayer(settings.layerName);
            };

            return settings.addLayer;
        },
        //移除某个图层的graphic
        removeGraphic: function (properties) {
            var settings = {
                layerName: ""//图层名称
                ,
                layerNameArray: []//图层名称数组
                ,
                Graphic: null//图形对象
                ,
                callback: function () { //回调函数
                }
            };
            $.extend(settings, properties);
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.LayerTypeCodeArray)) {
                settings.LayerTypeCodeArray = [];
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.layerName)) {
                settings.LayerTypeCodeArray.push(settings.layerName);
            }
            ;
            if (settings.LayerTypeCodeArray.length > 0) {
                for (var i = 0; i < settings.LayerTypeCodeArray.length; i++) {
                    if (_this.checkExistDynamicLayer({ layerName: "Business_" + settings.LayerTypeCodeArray[i] })) {
                        var businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.LayerTypeCodeArray[i] });
                        businessLayer.remove(settings.Graphic);
                    } else if (_this.checkExistDynamicLayer({ layerName: settings.LayerTypeCodeArray[i] })) {
                        var businessLayer = _this.getOrCreateLayer({ layerName: settings.LayerTypeCodeArray[i] });
                        businessLayer.remove(settings.Graphic);
                    }
                    ;
                }
                ;
            }
            if ($.isFunction(settings.callback)) {
                settings.callback();
            }
            ;
        },
        //以不同方式对图层进行渲染
        rendererLayerByType: function (properties) {
            var settings = {
                layerName: ""//图层名称
                ,
                layer: undefined //图层
                ,
                layerServiceUrl: ""//图层服务地址
                ,
                renderType: ""//渲染方式
                , renderParams: ""//渲染参数
                ,
                where: ""//渲染条件
                ,
                symbol: null//符号对象
                ,
                symbolArray: null//符号对象集合
                , infoTemplate: null
            };
            $.extend(settings, properties);

            var businessLayer = null;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.layer)) {
                businessLayer = settings.layer;
            } else {

                if (!_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerName })) {
                    var options = {
                        //MODE_SNAPSHOT MODE_ONDEMAND MODE_SELECTION
                        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                        infoTemplate: settings.infoTemplate,
                        showAttribution: settings.showLayeAttribution,
                        outFields: ["*"]
                    };
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.objectIdField)) {
                        options.objectIdField = settings.objectIdField;
                    }

                    businessLayer = new esri.layers.FeatureLayer(settings.layerServiceUrl, options);
                    businessLayer.spatialReference = _this.map.spatialReference;

                    //添加图层
                    _this.getOrCreateLayer({
                        layerName: "Business_" + settings.layerName,
                        addLayer: businessLayer,
                        layerIndex:settings.layerIndex
                    });
                } else {
                    businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
                }
            }
            ;

            if (fw.fwObject.FWObjectHelper.hasValue(settings.opacity)) {
                businessLayer.opacity = settings.opacity;
            };
            businessLayer.show();
            //如果有渲染条件
            if (fw.fwObject.FWObjectHelper.hasValue(settings.where)) {
                _this.setFeatureLayerDefinition({ layer: businessLayer, where: settings.where });
            }
            ;

            //添加渲染条件
            var renderer = null;
            switch (settings.renderType) {
                case _Enum.Code__RenderType.SimpleRenderer:
                    renderer = new esri.renderer.SimpleRenderer(settings.symbol);
                    break;
                case _Enum.Code__RenderType.UniqueValueRenderer:
                    var attrKey = settings.symbolArray.attrKey;
                    var renderer = new esri.renderer.UniqueValueRenderer(null, attrKey);
                    for (var i = 0; i < settings.symbolArray.attrValue.length; i++) {
                        var item = settings.symbolArray.attrValue[i];
                        var symbol = null;
                        if (fw.fwObject.FWObjectHelper.hasValue(item.symbolUrl)) {
                            picSymbolUrl = page.webSiteRootUrl + item.symbolUrl;
                            symbol = new esri.symbol.PictureMarkerSymbol(picSymbolUrl, settings.symbolArray.SymbolWidth, settings.symbolArray.SymbolHeight);
                        } else if (fw.fwObject.FWObjectHelper.hasValue(item.symbol)) {
                            symbol = item.symbol;
                        }
                        renderer.addValue(item.value, symbol);
                    }
                    break;
                case _Enum.Code__RenderType.ClassBreaksRenderer:
                    var attrKey = settings.symbolArray.attrKey;
                    renderer = new esri.renderer.ClassBreaksRenderer(null, attrKey);
                    for (var i = 0; i < settings.symbolArray.attrValue.length; i++) {
                        var item = settings.symbolArray.attrValue[i];
                        renderer.addBreak(item.begin, item.end, item.symbol);
                    }
                    ;
                    break;
                case _Enum.Code__RenderType.HeatmapRenderer:
                    renderer = new esri.renderer.HeatmapRenderer({
                        colors: ["rgba(173,216,230,0)", "rgba(0, 0, 255, 0)", "rgb(0, 0, 255)", "rgb(50,205,50)", "rgb(173,255,47)", "rgb(255,0,0)"]
                    });
                    break;
                case _Enum.Code__RenderType.BlendRenderer:
                    renderer = new esri.renderer.BlendRenderer(settings.renderParams);
                    break;
                case _Enum.Code__RenderType.DotDensityRenderer:
                    renderer = settings.render;
                    break;
            };

            if (fw.fwObject.FWObjectHelper.hasValue(renderer)) {
                businessLayer.setRenderer(renderer);
                businessLayer.refresh();
            }
            ;
            if (settings.isCallBack && $.isFunction(settings.callback)) {
                settings.callback(businessLayer);
            };
        },
        setRenderer: function (properties) {

            var settings = {
                layerName: "",
                layer: null
            };
            $.extend(settings, properties);

            if (!fw.fwObject.FWObjectHelper.hasValue(settings.layer)) {
                settings.layer = this.getOrCreateLayer({ layerName: settings.layerName });
            }
            if (fw.fwObject.FWObjectHelper.hasValue(settings.sizeInfo)) {
                var sizeInfo = {
                    field: "",
                    valueUnit: "meters",
                    valueRepresentation: "area"
                };
                $.extend(sizeInfo, settings.sizeInfo);
                settings.layer.renderer.setSizeInfo(sizeInfo);
            }

            if (fw.fwObject.FWObjectHelper.hasValue(settings.colorInfo)) {
                var colorInfo = {
                    field: "",
                    minDataValue: 1,
                    maxDataValue: 100,
                    colors: [
                        new dojo.Color("#ff0000"),
                        new dojo.Color("#ff4900"),
                        new dojo.Color("#ffdf00"),
                        new dojo.Color("#39AA00"),
                        new dojo.Color("#217100")
                    ]
                };
                $.extend(colorInfo, settings.colorInfo);
                settings.layer.renderer.setColorInfo(colorInfo);

            }
        },
        //定位到某一个点位
        addPointAndZoomTo: function (properties) {
            var settings = {
                layerName: ""
              , onMouseOverEvent: function (evt) {
                  if (evt.graphic.geometry.type == "point" && fw.fwObject.FWObjectHelper.hasValue(evt.graphic.symbol) && fw.fwObject.FWObjectHelper.hasValue(evt.graphic.symbol.url)) {
                      var sys = new esri.symbol.PictureMarkerSymbol(evt.graphic.symbol.url, evt.graphic.symbol.width + 4, evt.graphic.symbol.height + 4);
                      evt.graphic.setSymbol(sys);
                  };
                  mapAPI.map.setMapCursor("pointer");
              }
              , onMouseOutEvent: function (evt) {
                  if (evt.graphic.geometry.type == "point" && fw.fwObject.FWObjectHelper.hasValue(evt.graphic.symbol) && fw.fwObject.FWObjectHelper.hasValue(evt.graphic.symbol.url)) {
                      var sys = new esri.symbol.PictureMarkerSymbol(evt.graphic.symbol.url, evt.graphic.symbol.width - 4, evt.graphic.symbol.height - 4);
                      evt.graphic.setSymbol(sys);
                  };
                  mapAPI.map.setMapCursor("default");
              }
            };
            $.extend(settings, properties);
            settings.Layer = mapAPI.map.getLayer("Business_" + settings.layerName);
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.Layer)) {
                settings.Layer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
            } else {
                settings.Layer.clear();
                if (!settings.Layer.visible) {
                    settings.Layer.show();
                };
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.reorderLayerIndex)) {
                this.map.reorderLayer(settings.Layer, settings.reorderLayerIndex);
            }
            ;
            //点击事件
            if ($.isFunction(settings.onClickEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(settings.Layer.clickHandler)) {
                    dojo.disconnect(settings.Layer.clickHandler);
                    settings.Layer.clickHandler = null;
                }
                var clickHandler = dojo.connect(settings.Layer, "onClick", settings.onClickEvent);
                settings.Layer.clickHandler = clickHandler;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.data)) {
                var mapPoint = new esri.geometry.Point(parseFloat(settings.data[settings.itemFields.xField]), parseFloat(settings.data[settings.itemFields.yField]));
                if (fw.fwObject.FWObjectHelper.hasValue(settings.data.image)) {
                    settings.symbol = new esri.symbol.PictureMarkerSymbol(settings.data.image, settings.symbolWidth, settings.symbolHeight);
                } else if (fw.fwObject.FWObjectHelper.hasValue(settings.data.symbol)) {
                    settings.symbol = settings.data.symbol;
                } else {
                    settings.symbol = new esri.symbol.PictureMarkerSymbol(page.webSiteRootUrl + "web/maps/styles/images/map_marker.png", 36, 36);
                };

                var attributes;
                if (fw.fwObject.FWObjectHelper.hasValue(settings.data[settings.itemFields.attributes])) {
                    attributes = settings.data[settings.itemFields.attributes];
                }
                else {
                    attributes = settings.data;
                };
                var graphic = new esri.Graphic(mapPoint, settings.symbol, attributes);
                settings.Layer.add(graphic);
                var clickScreenPoint = mapAPI.map.toScreen(mapPoint);
                var evt = {
                    graphic: graphic,
                    screenPoint: clickScreenPoint
                };
                if (fw.fwObject.FWObjectHelper.hasValue(settings.Layer.clickEvt)) {
                    dojo.disconnect(settings.Layer.clickEvt);
                    settings.Layer.clickEvt = null;
                };

                settings.Layer.clickEvt = dojo.connect(mapAPI.map, "onPanEnd", function (e) {
                    if (evt) {
                        settings.Layer.onClick(evt);
                    };
                    evt = null;
                });
                if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomScale)
                                    && settings.ZoomScale > 0) {
                    if (mapAPI.map.getScale() > settings.zoomScale) {
                        mapAPI.map.setScale(settings.zoomScale);
                        settings.Layer.onClick(evt);
                    };
                    mapAPI.map.centerAt(mapPoint);
                } else {
                    if (fw.fwObject.FWObjectHelper.hasValue(settings.zoomLevel)) {
                        if (mapAPI.map.getLevel() < settings.zoomLevel) {
                            mapAPI.map.setLevel(settings.zoomLevel);
                            settings.Layer.onClick(evt);
                        };
                        mapAPI.map.centerAt(mapPoint);
                    }
                    ;
                };
            };
            if ($.isFunction(settings.onMouseOverEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(settings.Layer.mouseoverHandler)) {
                    dojo.disconnect(settings.Layer.mouseoverHandler);
                    settings.Layer.mouseoverHandler = null;
                }
                var mouseoverHandler = dojo.connect(settings.Layer, "onMouseOver", settings.onMouseOverEvent);
                settings.Layer.mouseoverHandler = mouseoverHandler;
            }
            ;
            if ($.isFunction(settings.onMouseOutEvent)) {
                if (fw.fwObject.FWObjectHelper.hasValue(settings.Layer.mouseoutHandler)) {
                    dojo.disconnect(settings.Layer.mouseoutHandler);
                    settings.Layer.mouseoutHandler = null;
                }
                var mouseoutHandler = dojo.connect(settings.Layer, "onMouseOut", settings.onMouseOutEvent);
                settings.Layer.mouseoutHandler = mouseoutHandler;
            }
            ;

            if (settings.isCallback) {
                if ($.isFunction(settings.callback)) {
                    settings.callback(settings.Layer);
                }
                ;
            };
        },
        //添加单个或列表图形到某个图层
        addGraphicToLayer: function (properties) {
            var settings = {
                itemFields: { xField: "x", yField: "y", attributes: "attributes" }
                , graphicList: []//坐标数组列表
                ,
                geometryList: []//图形数组列表
                ,
                layerName: ""//图层名称
                ,
                layer: null//图层对象
                ,
                symbol: null//图形对象
                ,
                symbolWidth: 20//图片宽度
                ,
                symbolHeight: 20//图片高度
                ,
                isCallback: true//是否有返回值
                ,
                reorderLayerIndex: null//排序
                ,
                opacity: 1,
                callback: function () {
                    //回调函数
                }
            };
            $.extend(settings, properties);

            //如果没有图层对象则查找
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.Layer)) {
                settings.Layer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
            }
            ;
            if (!settings.Layer.visible) {
                settings.Layer.show();
            };
            if (fw.fwObject.FWObjectHelper.hasValue(settings.opacity)) {
                settings.Layer.setOpacity(settings.opacity);
            };
            if (fw.fwObject.FWObjectHelper.hasValue(settings.reorderLayerIndex)) {
                this.map.reorderLayer(settings.Layer, settings.reorderLayerIndex);
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.graphicList)) {
                for (var i = 0; i < settings.graphicList.length; i++) {
                    var item = settings.graphicList[i];
                    var mapPoint = new esri.geometry.Point(item[settings.itemFields.xField], item[settings.itemFields.yField]);
                    if (fw.fwObject.FWObjectHelper.hasValue(item.image)) {
                        settings.symbol = new esri.symbol.PictureMarkerSymbol(item.image, settings.symbolWidth, settings.symbolHeight);
                    } else if (fw.fwObject.FWObjectHelper.hasValue(item.symbol)) {
                        settings.symbol = item.symbol;
                    }

                    var attributes;
                    if (fw.fwObject.FWObjectHelper.hasValue(item[settings.itemFields.attributes])) {
                        attributes = item[settings.itemFields.attributes];
                    }
                    else {
                        attributes = item;
                    }
                    var graphic = new esri.Graphic(mapPoint, settings.symbol, attributes);
                    settings.Layer.add(graphic);
                }
                ;
            } //图形列表
            else if (fw.fwObject.FWObjectHelper.hasValue(settings.geometryList)) {
                // settings.Layer.graphics = settings.geometryList;
                for (var i = 0; i < settings.geometryList.length; i++) {
                    var item = settings.geometryList[i];
                    var graphic = new esri.Graphic(item.geometry, item.symbol, item.attributes);
                    settings.Layer.add(graphic);
                }
                ;
            }
            ;

            if (settings.isCallback) {
                if ($.isFunction(settings.callback)) {
                    settings.callback(settings.Layer);
                }
                ;
            }
        },
        // 清空某个图层
        clearGraphicsLayer: function (properties) {
            var settings = {
                layerName: ""//图层名称
            };
            $.extend(settings, properties);
            var ClearGLayer = null;
            if (_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerName })) {
                ClearGLayer = _this.map.getLayer("Business_" + settings.layerName);
            } else {
                ClearGLayer = _this.map.getLayer(settings.layerName);
            }
            if (fw.fwObject.FWObjectHelper.hasValue(ClearGLayer)) {
                ClearGLayer.clear();
            }
            ;
        },
        //添加要素图层Label,3.14+
         addFeatureLayerLabel: function (properties) {
            var settings = {
                layerName: "LabelLayer",
                featureLayer: null//featurelayer图层
                ,
                labelName: null//要显示的字段
                ,
                showMaxScale: 0 //图层显示最大Scale
                ,
                showMinScale: 0 //图层显示最小Scale
                ,
                textJosn: {
                    type: "esriTS",
                    color: [0, 0, 0, 255],
                    backgroundColor: [246, 255, 197, 255],
                    borderLineColor: null,
                    verticalAlignment: "center",
                    horizontalAlignment: "left",
                    rightToLeft: false,
                    angle: 0,
                    xoffset: 0,
                    yoffset: 0,
                    text: "",
                    font: {
                        family: "黑体",
                        size: "14pt",
                        style: "normal",
                        weight: "bold",
                        decoration: "none"
                    }
                }
            };
            $.extend(settings, properties);

            if (!fw.fwObject.FWObjectHelper.hasValue(settings.featureLayer) || !fw.fwObject.FWObjectHelper.hasValue(settings.labelName)) {
                return;
            }
            ;
            if (!_this.checkExistDynamicLayer({ layerName: "Business_" + settings.layerName })) {
                var labelLayer = new esri.layers.LabelLayer({ "id": "Business_" + settings.layerName });
                var labelSys = new esri.symbol.TextSymbol(settings.textJosn);
                var labelRender = new esri.renderer.SimpleRenderer(labelSys);
                labelLayer.addFeatureLayer(settings.featureLayer, labelRender, "{" + settings.labelName + "}");
                _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName, addLayer: labelLayer, showMinScale: settings.showMaxScale, showMinScale: settings.showMinScale });
            } else {
                var businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName, addLayer: labelLayer, showMinScale: settings.showMaxScale, showMinScale: settings.showMinScale });
                businessLayer.show();
            }
        },
        //==========统计图服务==========
        showDivLayer: function (properties) {
           var settings = {

           };
           $.extend(settings, properties);
           _this.addDivLayer(settings, function (e) {
               {
                   if (e != undefined && e.layer != undefined) {
                       e.layer.visible = true;
                       e.layer.layerJQ.show();
                   };
                   if ($.isFunction(settings.callback)) {
                       settings.callback(e);
                   };
               }
           });
       },
        addDivLayer: function (properties, callback) {
            var settings = {
                layerName: "",
                data: null,
                templateFunction: function (graphic) {
                    //加载完成后执行
                },
                xField: "x",
                yField: "y",
                minScale: 0,
                maxScale: 0
            };
            $.extend(settings, properties);

            var divLayerJQ = _this.getOrCreateDivLayerJQ(settings);
            if (divLayerJQ.length > 0 && settings.data.length > 0) {
                var entity = null, graphicJQ;
                for (var i = 0; i < settings.data.length; i++) {
                    entity = settings.data[i];
                    var graphic = {
                        geometry: {
                            x: entity[settings.xField],
                            y: entity[settings.yField]
                        },
                        attributes: entity
                    };
                    graphicJQ = $("<div class=\"divGraphic\" style=\"position: absolute; top: 0px; left: 0px; \"></div>").
                    data("graphic", graphic).
                    appendTo(divLayerJQ);
                    graphic.graphicJQ = graphicJQ;
                    settings.templateFunction(graphic);
                }
                ;
                if ($.isFunction(callback)) {
                    callback({ layer: divLayerJQ.data("layer") });
                };
            };
            _this.refreshDivLayers();
        },
        getOrCreateDivLayerJQ: function (properties) {
            var settings = {
                layerName: null
            };
            $.extend(settings, properties);
            var divLayerJQ = _this.getDivLayerJQ(settings);
            if (divLayerJQ.length < 1) {
                var divLayersJQ = _this.getOrCreateDivLayersJQ(settings);
                var layer = {
                    layerId: settings.layerName,
                    visible: false
                };
                divLayerJQ = $("<div id=\"" + _this.mapId + "_divLayers" + "_" + settings.layerName + "\" style=\"position: absolute; top: 0px; left: 0px;\"></div>").data("layer", layer).appendTo(divLayersJQ).hide();
                layer.layerJQ = divLayerJQ;
            }
            ;
            return divLayerJQ;
        },
        getDivLayerJQ: function (properties) {
            var settings = {
                layerName: null
            };
            $.extend(settings, properties);

            var divLayerId = _this.mapId + "_divLayers_" + settings.layerName;
            return $("#" + divLayerId);
        },
        getDivLayersJQ: function (properties) {
            var settings = {};
            $.extend(settings, properties);

            var divLayersId = _this.mapId + "_divLayers";
            return $("#" + divLayersId);
        },
        getOrCreateDivLayersJQ: function (properties) {
            var settings = {};
            $.extend(settings, properties);
          
            var divLayersJQ = _this.getDivLayersJQ(settings);
            if (divLayersJQ.length < 1) {
                var divLayersId = _this.mapId + "_divLayers";
                divLayersJQ = $("<div id=\"" + divLayersId + "\" style=\"position: absolute; top: 0px; left: 0px;z-index:1\"></div>")
                    .appendTo("#" + _this.mapId + "_root");

                var mapTargetMoveHandle = function (obj1, obj2) {
                    var isValited = true;
                    //要求鼠标在移动对象上时不能移动
                    $(obj2).bind("mouseover", function (event) {
                        isValited = false;
                    });
                    $(obj2).bind("mouseout", function (event) {
                        isValited = true;
                    });
                    $(".infowindow").bind("mouseover", function (event) {
                        isValited = false;
                    });
                    $(".infowindow").bind("mouseout", function (event) {
                        isValited = true;
                    });
                    $(obj1).bind("mousedown", function (event) {
                        if (isValited) {
                            /* 获取需要拖动节点的坐标 */
                            // var offset_x = $(this)[0].offsetLeft; //x坐标
                            //var offset_y = $(this)[0].offsetTop; //y坐标
                            var offset_x = $(obj2)[0].offsetLeft; //x坐标
                            var offset_y = $(obj2)[0].offsetTop; //y坐标
                            /* 获取当前鼠标的坐标 */
                            var mouse_x = event.pageX;
                            var mouse_y = event.pageY;

                            /* 绑定拖动事件 */
                            /* 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素 */
                            $(document).bind("mousemove", function (ev) {
                                /* 计算鼠标移动了的位置 */
                                var _x = ev.pageX - mouse_x;
                                var _y = ev.pageY - mouse_y;

                                /* 设置移动后的元素坐标 */
                                var now_x = (offset_x + _x) + "px";
                                var now_y = (offset_y + _y) + "px";
                                /* 改变目标元素的位置 */
                                $(obj2).css({
                                    top: now_y,
                                    left: now_x
                                });


                            });
                        }
                        ;
                    });
                    /* 当鼠标左键松开，接触事件绑定 */
                    $(document).bind("mouseup", function () {
                        $(this).unbind("mousemove");
                    });
                };

                mapTargetMoveHandle($("#divArcgisMap_layers"), divLayersJQ);

                if (_this.map.zoomStartHandle) {
                    dojo.disconnect(_this.map.zoomStartHandle);
                    _this.map.zoomStartHandle = null;
                };
                _this.map.zoomStartHandle = dojo.connect(_this.map, "onZoomStart", function () {
                    divLayersJQ.hide();
                });

                if (_this.map.zoomEndHandle) {
                    dojo.disconnect(_this.map.zoomEndHandle);
                    _this.map.zoomEndHandle = null;
                };
                _this.map.zoomEndHandle = dojo.connect(_this.map, "onZoomEnd", function () {
                    mapPanAndZoomEvt();
                });

                if (_this.map.panStartHandle) {
                    dojo.disconnect(_this.map.panStartHandle);
                    _this.map.panStartHandle = null;
                };

                _this.map.panStartHandle = dojo.connect(_this.map, "onPanStart", function () {
                    divLayersJQ.hide()
                });

                if (_this.map.panEndHandle) {
                    dojo.disconnect(_this.map.panEndHandle);
                    _this.map.panEndHandle = null;
                };

                _this.map.panEndHandle = dojo.connect(_this.map, "onPanEnd", function () {
                    mapPanAndZoomEvt();
                });
            }
            ;
            function mapPanAndZoomEvt() {
                divLayersJQ.css({ left: "0px", top: "0px" });

                    var mapLevel = mapAPI.map.getLevel(),
                        mapScale = mapAPI.map.getScale();

                    if (settings.minLevel || settings.maxLevel) {
                        showByMapLevel(settings.minLevel, settings.maxLevel, mapLevel);
                    } else if (settings.minScale || settings.maxScale) {
                        showByMapScale(settings.minScale, settings.maxScale, mapScale);
                    };
                    _this.refreshDivLayers();

            };

            function showByMapScale(minScale, maxScale, currentScale) {
                if (minScale > 0 && maxScale > 0) {
                    if (currentScale >= maxScale && currentScale <= minScale) {
                        divLayersJQ.show();
                    }
                } else if (maxScale > 0) {
                    if (currentScale >= maxScale) {
                        divLayersJQ.show();
                    };
                } else if (minScale > 0) {
                    if (currentScale <= minScale) {
                        divLayersJQ.show();
                    };
                } else {
                    divLayersJQ.show();
                };
            };
            function showByMapLevel(minLevel, maxLevel, currentLevel) {
                if (minLevel > 0 && maxLevel > 0) {
                    if (currentLevel >= minLevel && currentLevel <= maxLevel) {
                        divLayersJQ.show();
                    }
                } else if (minLevel > 0) {
                    if (currentLevel >= minLevel) {
                        divLayersJQ.show();
                    };
                } else if (maxLevel > 0) {
                    if (currentLevel <= maxLevel) {
                        divLayersJQ.show();
                    };
                } else {
                    divLayersJQ.show();
                }
            };
            return divLayersJQ;
        },
        refreshDivLayers: function (properties) {
            var settings = {};
            $.extend(settings, properties);
            var divLayersJQ = _this.getDivLayersJQ(settings);
            if (divLayersJQ.length > 0) {
                divLayersJQ.each(function () {
                    var layer;
                    $(">*", this).each(function () {
                        layer = $(this).data("layer");
                        if (layer && layer.visible) {
                            _this.refreshDivLayer({ layerName: layer.layerId });
                        };
                    });
                });
            }
            ;
        },
        refreshDivLayer: function (properties) {
            var settings = {
                layerName: null
            };
            $.extend(settings, properties);

            var divLayerJQ = _this.getDivLayerJQ(settings);

            if (divLayerJQ.length > 0) {
                var extent = _this.map.extent;

                var divGraphicJQ;
                divLayerJQ.each(function () {
                    divGraphicJQ = $(">div.divGraphic", this);
                    divGraphicJQ.each(function () {
                        var thisJQ = $(this),
                            graphic = thisJQ.data("graphic"),
                            screenPt = _this.map.toScreen(graphic.geometry),
                            x = screenPt.x,
                            y = screenPt.y,
                            minScreenPt = _this.map.toScreen(new esri.geometry.Point(extent.xmin, extent.ymin)),
                            maxScreenPt = _this.map.toScreen(new esri.geometry.Point(extent.xmax, extent.ymax));

                        var left = _this.map.width * (x - minScreenPt.x) / (maxScreenPt.x - minScreenPt.x) - thisJQ.width() / 2,
                            top = _this.map.height * ((maxScreenPt.y - minScreenPt.y) - (y - minScreenPt.y)) / (maxScreenPt.y - minScreenPt.y) - thisJQ.height() / 2;
                        thisJQ.css({
                            left: left + "px",
                            top: top + "px"
                        });
                    });
                });
            };
        },
        removeDivLayer: function (properties) {
            var settings = {};
            $.extend(settings, properties);
            var divLayerJQ = _this.getDivLayerJQ(settings);
            if (divLayerJQ.length > 0) {
                divLayerJQ.remove();
            };
        },
        removeDivLayers: function (properties) {
            var settings = {};
            $.extend(settings, properties);
            var divLayerJQ = _this.getDivLayersJQ(settings);
            if (divLayerJQ.length > 0) {
                divLayerJQ.remove();
            };
        }
        //修改弹框大小
        , mapInfoWindowResize: function (properties) {
            var settings = {
                Width: 0,
                Height: 0
            };
            $.extend(settings, properties);
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.Width) || settings.Width <= 0) {
                settings.Width = _this.map.infoWindow.width;
            }
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.Height) || settings.Height <= 0) {
                settings.Height = _this.map.infoWindow.height;
            }
            _this.map.infoWindow.resize(settings.Width + 7, settings.Height + 28 + 9);
        }
        // 显示地图弹框
        , mapInfoWindowShow: function (properties) {
            var settings = {
                Title: "",
                domNode: null,
                Html: "",
                Width: 0,
                Height: 0,
                evt: null
            };
            $.extend(settings, properties);

            if (fw.fwObject.FWObjectHelper.hasValue(settings.Width) && settings.Width > 0
                            && fw.fwObject.FWObjectHelper.hasValue(settings.Height) && settings.Height > 0) {
                _this.map.infoWindow.resize(settings.Width + 7, settings.Height + 28 + 9);
            }
            _this.map.graphics.clear(); //移除3.14默认的高亮标注
            _this.map.infoWindow.setTitle(settings.Title);
            if (fw.fwObject.FWObjectHelper.hasValue(settings.domNode)) {
                _this.map.infoWindow.setContent(settings.domNode);
            } else {
                var cp2 = new dijit.layout.ContentPane({
                    title: "MapTip"
                }, dojo.create('div'));
                cp2.set('content', settings.Html);

                _this.map.infoWindow.setContent(cp2.domNode);
            }

            var g;
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.evt)) {
                return;
            }
            if (fw.fwObject.FWObjectHelper.hasValue(settings.evt) && settings.evt.declaredClass == "esri.Graphic") {
                g = settings.evt;
            } else if (fw.fwObject.FWObjectHelper.hasValue(settings.evt) && settings.evt.declaredClass == "esri.geometry.Point") {
                _this.map.infoWindow.show(settings.evt);
                return;
            }
            else if (!fw.fwObject.FWObjectHelper.hasValue(settings.evt.graphic)) {
                g = settings.evt;
            }
            else {
                g = settings.evt.graphic;
            }
            ;


            if (!fw.fwObject.FWObjectHelper.hasValue(g)) {
                return;
            }

            if (g.geometry.type == _Enum.Code__MapGeometryType.Point) {
                if (fw.fwObject.FWObjectHelper.hasValue(settings.screenOffset)) {
                    var pos = _this.map.toScreen(g.geometry);
                    pos.x = pos.x + settings.screenOffset.x;
                    pos.y = pos.y + settings.screenOffset.y;
                    _this.map.infoWindow.show(_this.map.toMap(pos));
                } else {
                    _this.map.infoWindow.show(g.geometry);
                }
            }
            else if (g.geometry.type == _Enum.Code__MapGeometryType.Polygon || g.geometry.type == _Enum.Code__MapGeometryType.Polyline) {
                _this.map.infoWindow.show(_this.getPolygonCenter(g.geometry));
            }
            else {
                _this.map.infoWindow.show(settings.evt.screenPoint, _this.map.getInfoWindowAnchor(settings.evt.screenPoint));
            }
            ;
        }
        //隐藏地图弹框
        , mapInfoWindowHide: function () {
            _this.map.infoWindow.hide();
        },
        /**************************************************************************
        //其它
        ***************************************************************************/
        //改变地图容器大小后，地图刷新
        mapResize: function (e) {
            if (fw.fwObject.FWObjectHelper.hasValue(mapAPI.resizeTimer)) {
                clearTimeout(mapAPI.resizeTimer);
            }
            ;
            console.log(e)
            mapAPI.resizeTimer = setTimeout(function () {
                _this.map.resize();
                _this.map.reposition();
            }, 500);
        },
        //改变图层的显示顺序
        reOrderLayer: function (properties) {
            var settings = {
                layerName: ""//图层名称
                ,
                Layer: null//图层对象
                ,
                reorderLayerIndex: null//排序  
            };
            $.extend(settings, properties);

            //如果没有图层对象则查找
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.Layer)) {
                settings.Layer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.reorderLayerIndex)) {
                _this.map.reorderLayer(settings.Layer, settings.reorderLayerIndex);
            }
            ;
        },
        //根据图层编号获取矢量图层索引
        getLayerIndex: function (mapId) {
            var layerIndex = -1;
            for (var i = 0; i < _this.map.layerIds.length; i++) {
                if (_this.map.layerIds[i] == mapId) {
                    layerIndex = i;
                    break;
                }
                ;
            }
            ;
            return layerIndex;
        }
        //阻止父级事件冒泡
        , stopBaseEvent: function (event) {
            dojo._base.event.stop(event);
        }
        //设置鼠标样式
        , setMapCursor: function (obj) {
            var cursorCss = ["help", "default", "pointer", "wait", "progress", "cell", "crosshair", "text", "vertical-text"]; //cell:粗十字,crosshair:细十字vertical-text:放倒的I
            if (cursorCss.indexOf(obj) != -1) {
                _this.map.setMapCursor(obj);
            } else {
                //自定义图标
                _this.map.setMapCursor("url(" + obj + "),auto");
            }
            ;
        }
        //获取点位坐标工具
        , getMapPoint: function (properties) {
            var settings = {
                callback: null
            };
            $.extend(settings, properties);
            var toolbars = new esri.toolbars.Draw(this.map);
            toolbars.activate(esri.toolbars.Draw["POINT"]);
            dojo.connect(toolbars, "onDrawEnd", function (event) {
                toolbars.deactivate();
                _this.removeMapEvent(_Enum.Code__CustomEvent.OnMouseMoveEvent);
                settings.callback(event);
            });
            _this.addMapEvent(_Enum.Code__CustomEvent.OnMouseMoveEvent, function (event) {
                $(".tooltip").html("经度：" + fw.fwNumber.FWNumberHelper.toString(event.mapPoint.x, "0.00000#") + " , 纬度：" + fw.fwNumber.FWNumberHelper.toString(event.mapPoint.y, "0.00000#")).css("width", 230);
            });
        }
        /*************************************************************************
        //查询
        **************************************************************************/
        //QueryTask从已有的Geometry中搜索,并创建图层
        , taskQueryByGeometry: function (properties) {
            var settings = {
                geometry: null,
                layerName: "",
                layerServicesUrl: "",
                onCompletedEvent: function (evt) {
                    //evt返回featureList
                }
            };
            $.extend(settings, properties);
            var businessLayer = null;
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.geometry)) {
                return;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.layerServicesUrl)) {
                businessLayer = new esri.layers.FeatureLayer(settings.layerServicesUrl, {
                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                    showAttribution: true,
                    opacity: 0.8,
                    outFields: ["*"]
                });
            } else {
                if (!fw.fwObject.FWObjectHelper.hasValue(settings.layerName)) {
                    return;
                }
                ;
                businessLayer = _this.getOrCreateLayer({ layerName: "Business_" + settings.layerName });
            }
            ;
            if (businessLayer.declaredClass == "esri.layers.FeatureLayer") {
                dojo.connect(businessLayer, "onSelectionComplete", function (features) {
                    if ($.isFunction(settings.onCompletedEvent)) {
                        settings.onCompletedEvent(features);
                    }
                    ;
                });
                var selectQuery = new esri.tasks.Query();
                selectQuery.geometry = settings.geometry;
                businessLayer.selectFeatures(selectQuery, esri.layers.FeatureLayer.SELECTION_NEW);
            } else {
                var graphics = businessLayer.graphics;
                var bFrist = true;
                var features = [];
                for (var i = 0; i < graphics.length; i++) {
                    if (graphics[i].visible && settings.Geometry.contains(graphics[i].geometry)) {
                        features.push(graphics[i]);
                    }
                    ;
                }
                ;
                if ($.isFunction(arcgis_Toolbars.Drawsettings.onCompletedEvent)) {
                    settings.onCompletedEvent(features);
                }
                ;
            }
            ;
        },
        //QueryTask查询，不创建图层，返回features对象
        taskQueryReturnFeatures: function (properties) {
            var settings = {
                layerUrl: ""//图层服务地址
                ,
                where: ""//查询条件
                ,
                geometry: null//空间查询图形
                ,
                spatialRelationship: esri.tasks.Query.SPATIAL_REL_CONTAINS//空间查询类别
                ,
                onCompletedEvent: function () {
                    //完成回调事件
                }
            };
            $.extend(settings, properties);

            var queryTask = new esri.tasks.QueryTask(settings.layerUrl);
            var query = new esri.tasks.Query();
            query.returnGeometry = true;
            query.outSpatialReference = _this.map.spatialReference;
            query.outFields = ["*"];
            if (fw.fwObject.FWObjectHelper.hasValue(settings.where)) {
                query.where = settings.where;
            } else {
                if (fw.fwObject.FWObjectHelper.hasValue(settings.geometry)) {
                    query.geometry = settings.geometry;
                } else {
                    query.where = "1=1";
                }
                ;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.geometry)) {
                query.geometry = settings.geometry;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.spatialRelationship)) {
                query.spatialRelationship = settings.spatialRelationship;
            }
            ;

            dojo.connect(queryTask, "onComplete", function (featureSet) {
                settings.onCompletedEvent(featureSet);
            });
            dojo.connect(queryTask, "onError", function (err) {
                //alert("函数taskQueryReturnFeatures出错：" + err.details);
            });
            queryTask.execute(query);
        },
        //IdentifyQuery空间查询
        taskIdentify: function (properties) {
            var settings = {
                geometry: null//空间查询对象
                ,
                layerUrl: ""//图层服务地址
                ,
                layerIds: ""//查询子图层编号
                ,
                tolerance: 1//允许像素容差
                ,
                paramOption: "all",
                onCompletedEvent: function () {
                    //查询完成回调函数
                }
            };
            $.extend(settings, properties);

            //        var pGeometryService = new esri.tasks.GeometryService(STGeometryUrl);
            //        var params = new esri.tasks.BufferParameters();
            //        params.distances = [2];
            //        params.outSpatialReference = _this.map.spatialReference;
            //        params.bufferSpatialReference = new esri.SpatialReference(4326);
            //        params.geometries = [settings.geometry];
            //        pGeometryService.buffer(params, function (geometries) {

            var IdentifyTask = new esri.tasks.IdentifyTask(settings.layerUrl);
            var params = new esri.tasks.IdentifyParameters();
            params.tolerance = settings.tolerance;
            params.returnGeometry = true;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.layerIds)) {
                if (fw.fwObject.FWObjectHelper.isArray(settings.layerIds)) {
                    params.layerIds = settings.layerIds;
                } else {
                    params.layerIds = [settings.layerIds];
                }
                ;
            }
            ;
            switch (settings.paramOption) {
                case "all":
                    params.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
                    break;
                case "visible":
                    params.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
                    break;
            }
            ;

            params.width = _this.map.width;
            params.height = _this.map.height;
            params.mapExtent = _this.map.extent;
            params.geometry = settings.geometry;
            IdentifyTask.execute(params, function (idResults) {
                settings.onCompletedEvent(idResults);
            });
            //        }, function () { alert("错误！") });


        },
        //FindTask属性查询
        taskFind: function (properties) {
            var settings = {
                layerUrl: ""//图层服务地址
                ,
                layerIds: ""//查询子图层编号
                ,
                searchFields: ""//查询属性列名
                ,
                searchText: ""//查询关键字
                ,
                onCompletedEvent: function () {
                    //完成回调事件
                }
            };
            $.extend(settings, properties);

            FindTask = new esri.tasks.FindTask(settings.layerUrl);
            findParams = new esri.tasks.FindParameters();
            findParams.returnGeometry = true;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.layerIds)) {
                findParams.layerIds = [settings.layerIds];
            }
            findParams.searchFields = [settings.searchFields];
            findParams.searchText = settings.searchText;
            FindTask.execute(findParams, function (idResults) {
                settings.onCompletedEvent(idResults);
            });
        },
        //获取图层上所有图像信息（属性、图形）
        getLayerFields: function (properties) {
            var settings = {
                MapServicesUrl: "",
                callback: function (e) {

                }
            };
            $.extend(settings, properties);
            var queryTask = new esri.tasks.QueryTask(settings.MapServicesUrl);
            var query = new esri.tasks.Query();
            query.returnGeometry = true;
            query.where = '1=1';
            query.outFields = ["*"];
            // query.outSpatialReference = _this.map.spatialReference;
            dojo.connect(queryTask, "onComplete", function (featureSet) {

                var oRes = {
                    fieldAliases: featureSet.fieldAliases,
                    fields: featureSet.fields,
                    features: featureSet.features,
                    geometryType: featureSet.geometryType
                };
                if ($.isFunction(settings.callback)) {
                    settings.callback(oRes);
                }
            });

            dojo.connect(queryTask, "onError", function (err) {
                if ($.isFunction(settings.callback)) {
                    settings.callback(null);
                }
            });
            queryTask.execute(query);
        },
        //生成缓冲区
        geometryBuffer: function (properties) {
            var settings = {
                geometry: []//几何图形的经纬度值
                ,
                wkid: 102100//生成缓冲区的坐标系代码 102100
                ,
                spatialReference: null// 坐标系空间参考
                ,
                distances: [1]//缓冲区距离
                ,
                unit: esri.tasks.GeometryService.UNIT_KILOMETER//缓冲区单位
                ,
                symbol: ""//样式
                ,
                callback: function () {
                    //加载完成后触发
                },
                reorderIndex: 0,
                isBuffer: false//true以缓冲显示范围
                ,
                geodesic: false//false为圆
                ,
                layerName: "bufferLayer"
            };
            $.extend(settings, properties);

            var bufferLayer = _this.getOrCreateLayer({ layerName: settings.layerName, isBusinessLayer: false });

            bufferLayer.clear();
            bufferLayer.show();

            var params = new esri.tasks.BufferParameters();
            params.distances = settings.distances;
            if (fw.fwObject.FWObjectHelper.hasValue(settings.spatialReference)) {
                params.bufferSpatialReference = settings.spatialReference;
            } else {
                params.bufferSpatialReference = new esri.SpatialReference({ wkid: settings.wkid });
            }
            params.outSpatialReference = _this.map.spatialReference;
            params.unit = settings.unit;
            var symbol = "";
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.symbol)) {
                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([55, 142, 214]), 1), new dojo.Color([55, 142, 214, 0.2]));
            } else {
                symbol = settings.symbol;
            }
            ;
            showBuffer = function (evt) {
                for (var i = evt.length - 1; i >= 0; i--) {
                    for (var z = 0; z < evt[i].rings.length; z++) {
                        var polygon = new esri.geometry.Polygon();
                        polygon.addRing(evt[i].rings[z]);
                        var polygonGraphic = new esri.Graphic(polygon, symbol);
                        bufferLayer.add(polygonGraphic);
                        if ($.isFunction(settings.callback)) {
                            settings.callback(polygon);
                        }
                        ;
                    }
                    ;
                }
                ;
            };
            showErr = function (err) {
                alert(err.message);
            };
            if (settings.geometryType == _Enum.Code__MapGeometryType.Polygon) {
                var outSR = new esri.SpatialReference({ wkid: settings.wkid });
                _this.geometryService.project(settings.geometry, outSR, function (outgeometry) {
                    _this.geometryService.simplify(outgeometry, function (simplifiedGeometries) {
                        params.geometries = simplifiedGeometries;
                        _this.geometryService.buffer(params, showBuffer, showErr);
                    }, showErr);
                }, showErr);
            } else if (settings.geometryType == _Enum.Code__MapGeometryType.Polyline) {
                params.geometries = settings.geometry;
                _this.geometryService.buffer(params, showBuffer, showErr);
            } else if (settings.geometryType == _Enum.Code__MapGeometryType.Point) {
                if (settings.isBuffer) {
                    params.geometries = settings.geometry; //[settings.geometry];
                    params.unionResults = true;
                    _this.geometryService.buffer(params, showBuffer, showErr);
                } else {
                    var settings = {
                        radius: settings.distances * 1000//圆的半径，单位为米
                        ,
                        layerName: settings.layerName//图层名称
                        ,
                        symbol: symbol,
                        geometry: settings.geometry,
                        geodesic: settings.geodesic,
                        callback: settings.callback,
                        layer: bufferLayer
                    };
                    this.drawCircle(settings);
                }
                ;
            }
            ;
            _this.map.reorderLayer(bufferLayer, settings.reorderIndex);
        },
        /*************************************************************************
        //GP服务
        **************************************************************************/
        //插值服务
        idwGPServer: function (properties) {
            var settings = {
                data: null,
                dataField: "dataList",
                xField: "x",
                yField: "y",
                valueField: "monitorValue",
                modelField: "Id3",
                serverUrl: null,
                params: { input: "point", output: "resultLayer" },
                callback: function () {
                }
            };
            $.extend(settings, properties);
            var layersettingsList = settings.data;
            if (fw.fwObject.FWObjectHelper.hasValue(layersettingsList) && layersettingsList.length > 0) {
                var layersettings, entityList, entity, point, graphic, model, features;
                var callBackCount = 0;
                for (var i = 0; i < layersettingsList.length; i++) {
                    layersettings = layersettingsList[i];
                    entityList = layersettings[settings.dataField];
                    if (entityList.length > 0) {
                        features = [];
                        for (var j = 0; j < entityList.length; j++) {
                            entity = entityList[j];
                            point = new esri.geometry.Point(entity[settings.xField], entity[settings.yField]);
                            model = {};
                            model[settings.modelField] = entity[settings.valueField];
                            graphic = new esri.Graphic(point, null, model);
                            features.push(graphic);
                        };
                        var ServerHelper = {
                            index: i
                                , features: features
                                , start: function () {
                                    var serverHelper = this;
                                    var featureset = new esri.tasks.FeatureSet();
                                    featureset.features = serverHelper.features;
                                    featureset.spatialReference = _this.map.spatialReference;
                                    var gp = new esri.tasks.Geoprocessor(settings.serverUrl);
                                    var param = {};
                                    param[settings.params.input] = featureset;
                                    var dataFile = new esri.tasks.DataFile({ url: "D:\\airIdw2-1.lyr" }); //D:\\airIdw6-1.lyr
                                    param["idwCSS"] = dataFile;
                                    gp.submitJob(param, function (jobinfo) {



                                        //                                        gp.getResultData(jobinfo.jobId, settings.params.output, function (gpLayer) {
                                        //                                        debugger
                                        //                                            mapAPI.map.addLayer(gpLayer);
                                        //                                        }, function (aa) {debugger });

                                        var imgParam = new esri.layers.ImageParameters();
                                        imgParam.format = "png32";
                                        imgParam.transparent = true;
                                        imgParam.layerIds = [0];
                                        imgParam.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
                                        imgParam.imageSpatialReference = _this.map.spatialReference;
                                        gp.getResultImageLayer(jobinfo.jobId, settings.params.output, imgParam, function (gpLayer, f, g) {
                                            layersettingsList[serverHelper.index].layer = gpLayer;
                                            callBackCount++;
                                        }, function (e) { debugger });

                                    }, function (suc, g, h) {
                                        //callBackCount++;
                                    }, function (err, j, k) {
                                        console.log(err);
                                        callBackCount++;
                                    });
                                }
                        };
                        ServerHelper.start();
                    } else {
                        callBackCount++;
                    };
                };
                var setIntervalFunction = setInterval(function () {
                    if (callBackCount == settings.data.length) {
                        clearInterval(setIntervalFunction);
                        if ($.isFunction(settings.progress)) { settings.progress(layersettingsList, callBackCount); };
                        if ($.isFunction(settings.callback)) { settings.callback(layersettingsList); };
                    } else {
                        if ($.isFunction(settings.progress)) { settings.progress(layersettingsList, callBackCount); };
                    };
                }, 1000);
            } else {
                if ($.isFunction(settings.callback)) { settings.callback(layersettingsList); };
            };
        },
        /*************************************************************************
        //绘图
        **************************************************************************/
        //画图工具
        DrawTool: {
            _drawToolbar: null
            , init: function (properties) {
                if (!fw.fwObject.FWObjectHelper.hasValue(this._drawToolbar)) {
                    this._drawToolbar = new esri.toolbars.Draw(_this.map);
                    dojo.connect(this._drawToolbar, "onDrawEnd", _this.DrawTool.drawEndEvent);
                }
                _this.isDrawing = true;
                var drawLayer = _this.getOrCreateLayer({ layerName: "DrawLayer" });
                _this.map.reorderLayer(drawLayer, 0);
                var settings = {
                    mapDrawToolCode: _Enum.Code__MapDrawToolCode.Circle,
                    onCompletedEvent: function (evt) {
                        //evt返回BusinessLayerTypeCodeList
                    },
                    isDrag: false,
                    onDragEndEvent: function (evt) {
                        _this.DrawTool.clear();
                        _this.drawAddToMap(evt.graphic.geometry);
                    }
                };
                $.extend(settings, properties);
                if (fw.fwObject.FWObjectHelper.hasValue(settings.onClickEvent) && $.isFunction(settings.onClickEvent)) {
                    if (fw.fwObject.FWObjectHelper.hasValue(drawLayer.clickHandler)) {
                        dojo.disconnect(drawLayer.clickHandler);
                        drawLayer.clickHandler = null;
                    }
                    var clickHandler = dojo.connect(drawLayer, "onClick", function (evt) {
                        settings.onClickEvent(evt);
                    });
                    drawLayer.clickHandler = clickHandler;
                }
                if (drawLayer.graphicsOnMouseDown != null) {
                    dojo.disconnect(drawLayer.graphicsOnMouseDown);
                    drawLayer.graphicsOnMouseDown = null;
                }
                this._drawToolbar.activate(esri.toolbars.Draw[settings.mapDrawToolCode]);
                this._drawToolbar.drawsettings = settings;
                _this.map.hideZoomSlider();

                if (settings.isDrag) {
                    drawLayer.graphicsOnMouseDown = dojo.connect(drawLayer, "onMouseDown", graphicsOnMouseDown);
                    if (drawLayer.graphicsOnMouseUp != null) {
                        dojo.disconnect(drawLayer.graphicsOnMouseUp);
                        drawLayer.graphicsOnMouseUp = null;
                    }
                    drawLayer.graphicsOnMouseUp = dojo.connect(drawLayer, "onMouseUp", graphicsOnMouseUp);


                    if (drawLayer.mouseDragEvent != null) {
                        dojo.disconnect(drawLayer.mouseDragEvent);
                        drawLayer.mouseDragEvent = null;
                    }
                    var oldLoc = null;
                    var paraLoc = null;
                    var pointsDis = [];

                    function graphicsOnMouseDown(evt) {
                        _this.map.disableMapNavigation(); //禁止地图拖动
                        if (drawLayer.mouseDragEvent != null) {
                            dojo.disconnect(drawLayer.mouseDragEvent);
                        }
                        oldLoc = evt.mapPoint;
                        paraLoc = evt.mapPoint;
                        if (evt.graphic.geometry.type == "polyline") {
                            var temp = evt.graphic.geometry.paths[0];
                            pointsDis = [];
                            for (var i = 0; i < temp.length; i++) {
                                pointsDis.push([temp[i][0] - oldLoc.x, temp[i][1] - oldLoc.y]);
                            }
                        } else if (evt.graphic.geometry.type == "polygon") {
                            var temp = evt.graphic.geometry.rings[0];
                            pointsDis = [];
                            for (var i = 0; i < temp.length; i++) {
                                pointsDis.push([temp[i][0] - oldLoc.x, temp[i][1] - oldLoc.y]);
                            }
                        }
                        ;
                        drawLayer.mouseDragEvent = dojo.connect(drawLayer, "onMouseDrag", graphicsOnMouseDrag);
                    }


                    function graphicsOnMouseUp(evt) {
                        if (drawLayer.mouseDragEvent != null) {
                            dojo.disconnect(drawLayer.mouseDragEvent);
                            _this.map.enableMapNavigation();
                            var moveLoc = evt.mapPoint;
                            moveLoc.setSpatialReference(_this.map.spatialReference);
                            if (evt.graphic.geometry.type == "point") {
                                evt.graphic.setGeometry(moveLoc);
                            } else if (evt.graphic.geometry.type == "polyline") {
                                var temp = [];
                                for (var i = 0; i < pointsDis.length; i++) {
                                    temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                                }
                                var geometry = new esri.geometry.Polyline();
                                geometry.paths = [temp];
                                evt.graphic.setGeometry(geometry);
                            } else if (evt.graphic.geometry.type == "polygon") {
                                var temp = [];
                                for (var i = 0; i < pointsDis.length; i++) {
                                    temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                                }
                                var geometry = new esri.geometry.Polygon();
                                geometry.rings = [temp];
                                evt.graphic.setGeometry(geometry);
                            }
                            ;
                            //结束时返回对象
                            settings.onDragEndEvent(evt);
                        }
                    }

                    function graphicsOnMouseDrag(evt) {
                        if (drawLayer.mouseDragEvent != null) {
                            var moveLoc = evt.mapPoint;
                            // var geoPt = esri.geometry.webMercatorToGeographic(evt.mapPoint);
                            moveLoc.setSpatialReference(_this.map.spatialReference);
                            if (evt.graphic.geometry.type == "point") {
                                evt.graphic.setGeometry(moveLoc);
                            } else if (evt.graphic.geometry.type == "polyline") {
                                var temp = [];
                                for (var i = 0; i < pointsDis.length; i++) {
                                    temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                                }
                                var geometry = new esri.geometry.Polyline();
                                geometry.paths = [temp];
                                evt.graphic.setGeometry(geometry);
                            } else if (evt.graphic.geometry.type == "polygon") {
                                var temp = [];
                                for (var i = 0; i < pointsDis.length; i++) {
                                    temp.push([pointsDis[i][0] + moveLoc.x, pointsDis[i][1] + moveLoc.y]);
                                }
                                var geometry = new esri.geometry.Polygon();
                                geometry.rings = [temp];
                                evt.graphic.setGeometry(geometry);
                            }
                            ;
                        }
                    }
                }
            }
            //用户DrawEnd操作后
            , drawEndEvent: function (geometry) {
                if (_this.DrawTool._drawToolbar != null) {
                    _this.DrawTool._drawToolbar.deactivate();
                    _this.isDrawing = false;
                }
                _this.map.showZoomSlider();
                switch (geometry.type) {
                    case "point": //STYLE_CIRCLE,STYLE_CROSS,STYLE_DIAMOND,STYLE_PATH,STYLE_SQUARE,STYLE_X	
                        var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.8]));
                        break;
                    case "polyline":
                        var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 3);
                        break;
                    case "polygon":
                        var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 0, 0, 0.1]));
                        break;
                    case "extent":
                        var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
                        break;
                    case "multipoint":
                        var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.5]));
                        break;
                }
                ;
                geometry.GUID = fw.guid();
                var graphic = new esri.Graphic(geometry, symbol);
                //  m_DrawLastGeometry = geometry;
                var drawLayer = _this.getOrCreateLayer({ layerName: "DrawLayer" });
                drawLayer.add(graphic);
                //  m_CaclDistancegeometry = geometry;

                if (!fw.fwObject.FWObjectHelper.hasValue(_this.DrawTool._drawToolbar.drawsettings)) {
                    return;
                }
                ;
                var settings = _this.DrawTool._drawToolbar.drawsettings;
                if (settings.isCalculate) {
                    switch (geometry.type) {
                        case "point":
                            if ($.isFunction(settings.onCompletedEvent)) {
                                var data = {};
                                data.geometry = geometry;
                                data.ResultText = "经度:" + dojo.number.format(geometry.x, { places: 6 }) + ",纬度:" + dojo.number.format(geometry.y, { places: 6 });
                                if (fw.fwObject.FWObjectHelper.hasValue(settings.showText) && settings.showText) {
                                    var textSymbol = _this.getDefaultSymbolByName(_Enum.Code__SymbolNames.Point_Text, { text: data.ResultText, color: [0, 0, 0, 255], font: { "size": "14px", "weight": "bold" } });
                                    var graphic = new esri.Graphic(geometry, textSymbol);
                                    drawLayer.add(graphic);
                                }
                                settings.onCompletedEvent(data);
                            }
                            break;
                        case "polyline":
                            _this.Calculate.calcGeometry({
                                geometry: geometry,
                                onCompletedEvent: function (result) {
                                    if (fw.fwObject.FWObjectHelper.hasValue(settings.showText) && settings.showText) {
                                        result.resultText = "总长:" + dojo.number.format(result.length, { places: 2 }) + "千米";
                                        var iindex = Math.ceil(result.geometry.paths[result.geometry.paths.length - 1].length / 2);
                                        var mappoint = geometry.getPoint(0, iindex - 1);
                                        var textSymbol1 = _this.getDefaultSymbolByName(_Enum.Code__SymbolNames.Point_Text, { text: result.resultText, color: [0, 0, 0, 255], font: { "size": "14px", "weight": "bold" } });
                                        var graphic1 = new esri.Graphic(mappoint, textSymbol1);
                                        drawLayer.add(graphic1);
                                    }
                                    settings.onCompletedEvent(data, geometry);
                                }
                            });
                            break;
                        case "polygon":
                            _this.Calculate.calcGeometry({
                                geometry: geometry,
                                onCompletedEvent: function (result) {
                                    if (fw.fwObject.FWObjectHelper.hasValue(settings.showText) && settings.showText) {
                                        result.resultText = "周长:" + dojo.number.format(result.length, { places: 2 }) + "km";
                                        result.resultText += "\n  \n面积：" + dojo.number.format(result.area, { places: 2 }) + "km²";
                                        var mappoint = _this.getPolygonCenter(geometry);
                                        var textSymbol1 = _this.getDefaultSymbolByName(_Enum.Code__SymbolNames.Point_Text, { text: result.resultText, color: [0, 0, 0, 255], font: { "size": "14px", "weight": "bold" } });
                                        var graphic1 = new esri.Graphic(mappoint, textSymbol1);
                                        drawLayer.add(graphic1);
                                    }
                                    settings.onCompletedEvent(data, geometry);
                                }
                            });
                            break;
                    }
                    ;
                }
                else {
                    if ($.isFunction(settings.onCompletedEvent)) {
                        var data = {};
                        data.ResultText = [];
                        data.geometry = geometry;

                        switch (geometry.type) {
                            case "polyline":
                                for (var i = 0; i < geometry.paths[0].length; i++) {
                                    var x = fw.fwString.FWStringHelper.toNumber(fw.fwNumber.FWNumberHelper.toString(parseFloat(geometry.paths[0][i][0]), "0.00000#"));
                                    var y = fw.fwString.FWStringHelper.toNumber(fw.fwNumber.FWNumberHelper.toString(parseFloat(geometry.paths[0][i][1]), "0.00000#"));
                                    data.ResultText.push(x + "," + y);
                                }
                                break;
                            case "polygon":
                                for (var i = 0; i < geometry.rings[0].length; i++) {
                                    var x = fw.fwString.FWStringHelper.toNumber(fw.fwNumber.FWNumberHelper.toString(parseFloat(geometry.rings[0][i][0]), "0.00000#"));
                                    var y = fw.fwString.FWStringHelper.toNumber(fw.fwNumber.FWNumberHelper.toString(parseFloat(geometry.rings[0][i][1]), "0.00000#"));
                                    data.ResultText.push(x + "," + y);
                                }
                                break;
                        }
                        ;

                        settings.onCompletedEvent(data);
                    }
                }
            }
            , deactivate: function () {
                if (_this.DrawTool._drawToolbar != null) {
                    _this.DrawTool._drawToolbar.deactivate();
                    _this.isDrawing = false;
                }
                _this.map.showZoomSlider();
            }
            , clear: function () {
                var drawLayer = _this.getOrCreateLayer({ layerName: "DrawLayer" });
                drawLayer.clear();
            }
        }
        //画圆
        , drawCircle: function (properties) {
            var settings = {
                radius: 1000, //圆的半径，单位为米
                layerName: "circles", //图层名称
                layer: null,
                symbol: null, //圆的样式
                geometry: null,
                geodesic: false,
                callback: null
            };
            $.extend(settings, properties);
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.layer)) {
                settings.layer = _this.getOrCreateLayer({ layerName: settings.layerName });
                settings.layer.clear();
                settings.layer.show();
            }
            if (!fw.fwObject.FWObjectHelper.hasValue(settings.symbol)) {
                settings.symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 0, 0, 0.25]));
            }
            ;

            var circle = new esri.geometry.Circle({
                center: settings.geometry,
                geodesic: settings.geodesic, //当geodesic值设置为false时，结果是圆
                radius: settings.radius
            });
            var graphic = new esri.Graphic(circle, settings.symbol);
            settings.layer.add(graphic);
            if ($.isFunction(settings.callback)) {
                settings.callback(circle);
            }
            ;
        }
        //热力图
        , addHeatMap: function (properties) {
            var setting = {
                layerUrl: ""
                , layerName: "heatMap"
                , maxPixelIntensity: 500
                , minPixelIntensity: 0
                , blurRadius: 10
                , showMinScale: 0
                , showMaxScale: 0
                , colorStops: [{ ratio: 0, color: "rgba(180,216,152, 0)" },
                { ratio: 0.2, color: "rgba(193,217,128, 0.5)" },
                { ratio: 0.4, color: "rgba(217,225,102, 0.8)" },
                { ratio: 0.5, color: "rgba(246,215,65, 0.8)" },
                { ratio: 0.6, color: "rgba(249,193,88, 0.8)" },
                { ratio: 0.7, color: "rgba(244,164,82, 1)" },
                { ratio: 0.8, color: "rgba(240,132,55, 1)" },
                { ratio: 1, color: "rgba(234,85,50, 1)" }]
                , reorderLayerIndex: 99
            };
            $.extend(setting, properties);

            var Layerbegin = "Business_";
            if (!setting.isBusinessLayer) {
                Layerbegin = "";
            };

            var businessLayer = _this.map.getLayer(Layerbegin + setting.layerName);
            if (businessLayer) {
                businessLayer.show();
                if ($.isFunction(setting.onCompletedEvent)) {
                    setting.onCompletedEvent(businessLayer);
                }
                return ;
            };

            var heatmapFeatureLayerOptions = {
                mode: esri.layers.FeatureLayer.MODE_ONDEMAND
            };
            var heatmapFeatureLayer = null;
            if (setting.layerUrl) {
                heatmapFeatureLayer = new esri.layers.FeatureLayer(setting.layerUrl, heatmapFeatureLayerOptions);
            } else {
                var layerDefinition = {
                    "geometryType": "esriGeometryPoint",
                    "fields": [{
                        "name": "ID",
                        "type": "esriFieldTypeInteger",
                        "alias": "ID"
                    }
                    ]
                };

                var featureCollection = {
                    layerDefinition: layerDefinition,
                    featureSet: null
                };
                heatmapFeatureLayer = new esri.layers.FeatureLayer(featureCollection, heatmapFeatureLayerOptions);
            };
            businessLayer = _this.getOrCreateLayer({
                layerName: Layerbegin + setting.layerName
            , addLayer: heatmapFeatureLayer
            , layerIndex: setting.reorderLayerIndex
            });
            if (fw.fwObject.FWObjectHelper.hasValue(setting.showMaxScale) && setting.showMaxScale > 0) {
                businessLayer.maxScale = setting.showMaxScale;
            }
            ;
            if (fw.fwObject.FWObjectHelper.hasValue(setting.showMinScale) && setting.showMinScale > 0) {
                businessLayer.minScale = setting.showMinScale;
            }
            ;
            if (setting.opacity) {
                businessLayer.opacity=setting.opacity;
            };

            var heatmapRenderer = new esri.renderer.HeatmapRenderer({
                field:setting.field||"",
                blurRadius: setting.blurRadius,
                maxPixelIntensity: setting.maxPixelIntensity,
                minPixelIntensity: setting.minPixelIntensity,
                colorStops: setting.colorStops
            });

            businessLayer.setRenderer(heatmapRenderer);
            businessLayer.show();

            if (setting.reorderLayerIndex) {
                _this.map.reorderLayer(businessLayer, setting.reorderLayerIndex);
            };

            //if (fw.fwObject.FWObjectHelper.hasValue(businessLayer.updateEndHandle)) {
            //    dojo.disconnect(businessLayer.updateEndHandle);
            //    businessLayer.updateEndHandle = null;
            //};
            //if ($.isFunction(setting.onCompletedEvent)) {
            //    var updateEndHandle = dojo.connect(businessLayer, "onUpdateEnd",function(){
            //        setting.onCompletedEvent(businessLayer)
            //    });
            //    businessLayer.updateEndHandle = updateEndHandle;
            //};
            if ($.isFunction(setting.onCompletedEvent)) {
                setting.onCompletedEvent(businessLayer);
            };
        }
        , getLayer: function (layerName, isBusinessLayer) {
            var layerBegin = "",
                layerObj = null;

            if (isBusinessLayer) {
                layerBegin = "Business_";
            };

            layerObj = mapAPI.map.getLayer(layerBegin + layerName);
            if (!layerObj) {
                //console.log("不存在图层:" + layerBegin + layerName)
            }
            return layerObj;
        }
        , setMapCenter: function (properties) {
            var setting = {
                zoom: 0,
                sr: { wkid: 4326 }
            };
            $.extend(setting, properties);
            if (!setting.x || !setting.y) {
                return;
            };
            var point = new esri.geometry.Point(setting.x, setting.y, new esri.SpatialReference(setting.sr));
            if (setting.zoom) {
                _this.map.centerAndZoom(point, setting.zoom);
            } else {
                _this.map.centerAt(point);
            };

            if (_this.panEndId) {
                dojo.disconnect(_this.panEndId);
                _this.panEndId = null;
            };
          _this.panEndId=  dojo.connect(_this.map, "onPanEnd", function (e) {
                if ($.isFunction(setting.onPanEndEvt)) {
                    setting.onPanEndEvt(e);
                };
          });

          if (_this.zoomEndId) {
              dojo.disconnect(_this.zoomEndId);
              _this.zoomEndId = null;
          };
          _this.zoomEndId=dojo.connect(_this.map, "onZoomEnd", function (e) {
                if ($.isFunction(setting.onZoomEndEvt)) {
                    setting.onZoomEndEvt(e);
                };
            })
        }
        , getLevel: function () {
            return _this.map.getLevel();
        },
        getScale: function () {
            return _this.map.getScale();
        },
        getPoint: function (properties) {
            var setting = {
                x: 0,
                y: 0,
                sr: { wkid: 4326 }
            };
            $.extend(setting, properties);

            var point = new esri.geometry.Point(setting.x, setting.y, new esri.SpatialReference(setting.sr));

            return point;

        },
        createGraphic: function (properties) {
            var setting = {
                geometry: null,
                symbol: null,
                attributes:null
            };
            $.extend(setting, properties);
            var g = new esri.Graphic(setting.geometry, setting.symbol, setting.attributes);
            return g;
        }
    };
    // _this = mapAPI;
    //添加动态点位
    mapAPI.loadDynamicLayer = function (properties) {
        var settings = {

        };
        $.extend(settings, properties);
        var fillColor = "";
        var borderColor = "";
        var borderWidth = 1;
        var fillStyle = esri.symbol.SimpleFillSymbol.STYLE_NULL;
        var lineStyle = esri.symbol.SimpleLineSymbol.STYLE_NULL;
        if (fw.fwObject.FWObjectHelper.hasValue(settings.symbolFillColor) && settings.symbolFillColor != "") {
            fillColor = settings.SymbolFillColor;
            fillStyle = esri.symbol.SimpleFillSymbol.STYLE_SOLID;
        }
        if (fw.fwObject.FWObjectHelper.hasValue(settings.symbolBorderColor) && settings.symbolBorderColor != "") {
            borderColor = settings.SymbolBorderColor;
            lineStyle = esri.symbol.SimpleLineSymbol.STYLE_SOLID;
        }
        if (fw.fwObject.FWObjectHelper.hasValue(settings.symbolBorderWidth) && settings.symbolBorderWidth > 0) {
            borderWidth = settings.SymbolBorderWidth;
        }
        if (fw.fwObject.FWObjectHelper.hasValue(fillColor) || fw.fwObject.FWObjectHelper.hasValue(borderColor) || fw.fwObject.FWObjectHelper.hasValue(settings.symbolWidth)) {
            settings.renderType = _Enum.Code__RenderType.SimpleRenderer;
        }
        //面
        if (settings.layerType == _Enum.Code__MapLayerTypeCode.Polygon) {
            if (fillColor != "" && borderColor != "") {
                settings.symbol = new esri.symbol.SimpleFillSymbol(fillStyle,
                        new esri.symbol.SimpleLineSymbol(lineStyle, new dojo.Color(borderColor), borderWidth), new dojo.Color(fillColor));
            }
        }
            //线
        else if (settings.layerType == _Enum.Code__MapLayerTypeCode.Line) {
            if (borderColor != "") {
                settings.symbol = new esri.symbol.SimpleLineSymbol(lineStyle, new dojo.Color(borderColor), borderWidth);
            }
        }
            //点
        else {
            if (fw.fwObject.FWObjectHelper.hasValue(settings.symbolWidth) && fw.fwObject.FWObjectHelper.hasValue(settings.symbolHeight)) {
                var picSymbolUrl = null;
                if (fw.fwObject.FWObjectHelper.hasValue(settings.symbolUrl)) {
                    picSymbolUrl = page.webSiteRootUrl + settings.symbolUrl;
                    settings.symbol = new esri.symbol.PictureMarkerSymbol(picSymbolUrl, settings.symbolWidth, settings.symbolHeight);
                }

            }
            ;
        }
        ;
        _this.rendererLayerByType(settings);
    };


    //获取基本注记符号
    mapAPI.getDefaultSymbolByName = function (name, settings) {
        var symbol = null;
        switch (name) {
            case _Enum.Code__SymbolNames.Point: //STYLE_CIRCLE,STYLE_SQUARE
                symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#000000"), 1), new dojo.Color([0, 255, 0, 1]));
                break;
            case _Enum.Code__SymbolNames.Point_CheckPoint: //STYLE_CIRCLE,STYLE_SQUARE
                symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, settings.size, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color("#fff"), 1), new dojo.Color(settings.fillColor));
                break;
            case _Enum.Code__SymbolNames.Point_Picture:
                var options = { width: 24, height: 24 };
                $.extend(options, settings);
                symbol = new esri.symbol.PictureMarkerSymbol(options.image, options.width, options.height);
                ;
                break;
            case _Enum.Code__SymbolNames.Point_Text:
                if (fw.fwObject.FWObjectHelper.hasValue(settings)) {
                    var TextJosn = {
                        "type": "esriTS",
                        "color": [255, 255, 255, 255],
                        "backgroundColor": [246, 255, 197, 255],
                        "borderLineColor": null,
                        "verticalAlignment": "center",
                        "horizontalAlignment": "left",
                        "rightToLeft": false,
                        "align": "left",
                        "rotate": 0,
                        "angle": 0,
                        "xoffset": 0,
                        "yoffset": 10,
                        "text": "",
                        "font": {
                            "family": "Microsoft YaHei",
                            "size": "12px",
                            "style": "normal",
                            "weight": "bold",
                            "decoration": "none"
                        }
                    };
                    $.extend(TextJosn, settings);
                    symbol = new esri.symbol.TextSymbol(TextJosn);

                }
                ;
                break;
            case _Enum.Code__SymbolNames.Polyline:
                if (fw.fwObject.FWObjectHelper.hasValue(settings)) {
                    symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(settings.lineColor), settings.borderWidth);
                } else {
                    symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 255, 90]), 2);
                }
                ;
                break;
                //网格                                                                                   
            case _Enum.Code__SymbolNames.Polyline_WG:
                symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1);
                break;
            case _Enum.Code__SymbolNames.Polyline_Highlighte:
                //            symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#ffff00"), 3), new dojo.Color([255, 244, 91, 0]));
                symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#00FFFF"), 3);
                break;
            case _Enum.Code__SymbolNames.Polygon:
                var options = { style: esri.symbol.SimpleFillSymbol.STYLE_SOLID, lineColor: "#FFFF00", borderWidth: 1, fillColor: [255, 255, 0, 0] };
                $.extend(options, settings);
                //STYLE_DASHDOT----虚线
                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(options.style, new dojo.Color(options.lineColor), options.borderWidth), new dojo.Color(options.fillColor));
                break;
            case _Enum.Code__SymbolNames.Polygon_Highlighte:
                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#6BDEFC"), 3), new dojo.Color([255, 244, 91, 0.5]));
                break;
        }
        ;
        return symbol;
    };

    //验证图形相互关系
    mapAPI.checkGeometryRelation = {
        isWithIn: function (geometry1, geometry2) {
            if (geometry2.contains(geometry1)) {
                return true;
            } else {
                return false;
            }
        },
        isWithInByService: function (geometry1, geometry2, callback) {
            var relationParams = new esri.tasks.RelationParameters();
            relationParams.geometries1 = geometry2;
            relationParams.geometries2 = geometry1;
            relationParams.relation = esri.tasks.RelationParameters.SPATIAL_REL_WITHIN;
            _this.geometryService.relation(relationParams, function (relations) {
                if (relations.length > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
                ;
            }, function (e) {
                console.log(e);
            });
        }
    };

    //计算
    mapAPI.Calculate = {
        _rad: function (d) {
            var PI = Math.PI;
            return d * PI / 180.0;
        },
        _cross: function (o, a, b) {//外包络用
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
        },
        //获取两点之间距离
        getDistance: function (fromLongitude, fromLatitude, toLongitude, toLatitude, format) {
            var latitude = 0, longitude = 0, s = 0;
            latitude = _this.Calculate._rad(fromLatitude) - _this.Calculate._rad(toLatitude);
            longitude = _this.Calculate._rad(fromLongitude) - _this.Calculate._rad(toLongitude);
            s = 2 * Math.asin(Math.sqrt(Math.pow(Math.asin(latitude / 2), 2) + Math.cos(_this.Calculate._rad(fromLatitude)) * Math.cos(_this.Calculate._rad(toLatitude)) * Math.pow(Math.asin(longitude / 2), 2)));
            s = s * 6378.137;
            s = Math.round(s * 10000, 2) / 10000;
            s = s * 1000;

            if (fw.fwObject.FWObjectHelper.hasValue(format)) {
                s = fw.fwString.FWStringHelper.toNumber(fw.fwNumber.FWNumberHelper.toString(s, format));
            }
            ;
            return s;
        },
        //根据图形对象计算图形面积或长度
        calcGeometry: function (properties) {
            var settings = {
                geometry: null,
                onCompletedEvent: null
            };
            $.extend(settings, properties);
            if (!fw.fwObject.FWObjectHelper.hasValue(_this.geometryService))
                return;
            switch (settings.geometry.type) {
                case "polyline":
                    var lengthParams = new esri.tasks.LengthsParameters();
                    lengthParams.polylines = [settings.geometry];
                    lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;

                    if (_this.map.spatialReference.wkid == 4326) {
                        lengthParams.geodesic = true;
                    } else {
                        lengthParams.geodesic = false;
                    }
                    ;
                    _this.geometryService.lengths(lengthParams, function (distance) {
                        if ($.isFunction(settings.onCompletedEvent)) {
                            var data = {};
                            data.geometry = settings.geometry;
                            data.geometryType = settings.geometry.type;
                            data.length = distance.lengths[0];
                            settings.onCompletedEvent(data);
                        }
                        ;
                    });
                    break;
                case "polygon":
                    var data = {};
                    var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();
                    areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
                    areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_KILOMETERS;

                    if (_this.map.spatialReference.wkid == 4326) {
                        var outSR = new esri.SpatialReference({ wkid: 102113 });
                        _this.geometryService.project([settings.geometry], outSR, function (outgeometry) {

                            _this.geometryService.simplify(outgeometry, function (simplifiedGeometries) {
                                areasAndLengthParams.polygons = simplifiedGeometries;
                                if (areasAndLengthParams.polygons[0].rings.length > 1) {
                                    data.isSelfInsect = true;
                                }
                                _this.geometryService.areasAndLengths(areasAndLengthParams, function (result) {
                                    if ($.isFunction(settings.onCompletedEvent)) {
                                        data.geometry = settings.geometry;
                                        data.geometryType = settings.geometry.type;
                                        data.length = result.lengths[0];
                                        data.area = result.areas[0];
                                        if (data.area < 0) {
                                            data.isSelfInsect = true;
                                        }
                                        settings.onCompletedEvent(data);
                                    }
                                    ;
                                });

                            });
                        }, function (err) {
                        });
                    } else {
                        areasAndLengthParams.polygons = [settings.geometry];
                        areasAndLengthParams.geodesic = false;
                        if (areasAndLengthParams.polygons[0].rings.length > 1) {
                            data.isSelfInsect = true;
                        }
                        _this.geometryService.areasAndLengths(areasAndLengthParams, function (result) {
                            if ($.isFunction(settings.onCompletedEvent)) {
                                data.geometry = settings.geometry;
                                data.geometryType = settings.geometry.type;
                                data.length = result.lengths[0];
                                data.area = result.areas[0];
                                if (data.area < 0) {
                                    data.isSelfInsect = true;
                                }
                                settings.onCompletedEvent(data);
                            }
                            ;
                        });
                    }
                    ;

                    break;
            }
            ;

        }
    };

    mapAPI.Effects = {
        _zoomEffect: {
            _init: function () {
                var a = document.createElement("div");
                a.style.cssText = "width:108px;height:73px;overflow:hidden;position:absolute;visibility:hidden;z-index:200";

                var b = [];
                b.push('<div style="width:6px;height:4px;overflow:hidden;border-right:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:0;top:0;"></div>');
                b.push('<div style="width:6px;height:4px;overflow:hidden;border-left:#F00 solid 2px;border-bottom:#F00 solid 2px;position:absolute;left:100px;top:0;"></div>');
                b.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-left:#F00 solid 2px;position:absolute;left:100px;top:67px;"></div>');
                b.push('<div style="width:6px;height:4px;overflow:hidden;border-top:#F00 solid 2px;border-right:#F00 solid 2px;position:absolute;left:0;top:67px;"></div>');
                a.innerHTML = b.join("");
                this.va = a;
                $(a).appendTo(_this.mapJQ);
            }
            , _show: function (a, p) {
                var b = this.va;
                if (p.x < 5 || p.y < 5 || p.x > this.width - 5 || p.y > this.height - 5 || p.V == !1)
                    p.x = this.width / 2,
                p.y = this.height / 2;
                b.style.left = p.x - 54 + "px";
                b.style.top = p.y - 36.5 + "px";
                var c = 0
               , d = this;
                window.clearInterval(d.v);
                d.v = a > 0 ? setInterval(function () {
                    var a = 9.5 * (4 - c)
                  , g = 5.75 * (4 - c);
                    b.children[2].style.left = a + "px";
                    b.children[2].style.top = g + "px";
                    b.children[3].style.left = 108 - a - 9 + "px";
                    b.children[3].style.top = g + "px";
                    b.children[0].style.left = 108 - a - 9 + "px";
                    b.children[0].style.top = 63 - g + "px";
                    b.children[1].style.left = a + "px";
                    b.children[1].style.top = 63 - g + "px";
                    c >= 5 ? (window.clearInterval(d.v),
                b.style.visibility = "hidden") :
                b.style.visibility = "visible";
                    c++
                }, 80) : setInterval(function () {
                    var a = 9.5 * c
                  , g = 5.375 * c;
                    b.children[0].style.left = a + "px";
                    b.children[0].style.top = g + "px";
                    b.children[1].style.left = 99 - a + "px";
                    b.children[1].style.top = g + "px";
                    b.children[2].style.left = 99 - a + "px";
                    b.children[2].style.top = 64 - g + "px";
                    b.children[3].style.left = a + "px";
                    b.children[3].style.top = 64 - g + "px";
                    c >= 5 ? (window.clearInterval(d.v),
                b.style.visibility = "hidden") : b.style.visibility = "visible";
                    c++
                }, 120)
            }
        }

    }
    mapAPI.Enum = _Enum;
    return mapAPI;
};