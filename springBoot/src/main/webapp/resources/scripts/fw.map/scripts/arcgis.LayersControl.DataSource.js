var LayersControlDataSource = [
    {
        "LayerTypeName": "GeographicInformation"
        , "LayerTypeTitle": "地理信息"
        , "Width": null
        , "Layers":
            [
//                {
//                    "LayerName": "ImageMap"
//                    , "LayerTitle": "影像"
//                    , "Layers":
//                        [
//                            {
//                                "MapServiceLayerType": "esri.layers.TianDiTuTiledMapServiceLayer_Image"
//                                , "LayerName": "TDT_Img"
//                                , "LayerTitle": "天地图影像"
//                                , "ServiceUrl": ""
//                                , "InfoWindowSettings":
//                                    {
//                                        "FieldArray":
//                                            [

//                                            ]
//                                    }
//                                , "LayerType": "Map"
//                                , "SymbolUrl": ""
//                                , "SymbolColor": "#F70909"
//                                , "SymbolWidth": "20"
//                                , "SymbolHeight": "20"
//                                , "SymbolBorderColor": ""
//                                , "SymbolFillColor": ""
//                                , "opacity": "1"
//                                , "layerIndex": ""
//                                , "ShowminScale": "0"
//                                , "ShowmaxScale": "0"
//                            }
//                            , {
//                                "MapServiceLayerType": "esri.layers.ArcGISTiledMapServiceLayer"
//                                , "LayerName": "ST_Img"
//                                , "LayerTitle": "卫星影像"
//                                , "ServiceUrl": "http://10.32.200.51/ArcGIS/rest/services/jsyxdt/MapServer"
//                                , "InfoWindowSettings":
//                                    {
//                                        "FieldArray":
//                                            [

//                                            ]
//                                    }
//                                , "LayerType": "Map"
//                                , "SymbolUrl": ""
//                                , "SymbolColor": "#F70909"
//                                , "SymbolWidth": "20"
//                                , "SymbolHeight": "20"
//                                , "SymbolBorderColor": ""
//                                , "SymbolFillColor": ""
//                                , "opacity": "1"
//                                , "layerIndex": "1"
//                                , "ShowminScale": "0"
//                                , "ShowmaxScale": "0"
//                            }
//                        ]
//                }
//                , {
//                    "LayerName": "ElectronicMap"
//                    , "LayerTitle": "电子地图"
//                    , "Layers":
//                        [
//                            {
//                                "LayerName": "ST_DX"
//                                , "LayerTitle": "电子地图"
//                                , "ServiceUrl": "http://10.32.200.51/ArcGIS/rest/services/jsdem2/MapServer"
//                                , "InfoWindowSettings":
//                                    {
//                                        "FieldArray":
//                                            [

//                                            ]
//                                    }
//                                , "LayerType": "Map"
//                                , "MapServiceLayerType": "esri.layers.ArcGISTiledMapServiceLayer"
//                                , "SymbolUrl": ""
//                                , "SymbolColor": "#F70909"
//                                , "SymbolWidth": "20"
//                                , "SymbolHeight": "20"
//                                , "SymbolBorderColor": ""
//                                , "SymbolFillColor": ""
//                                , "opacity": "1"
//                                , "layerIndex": "2"
//                                , "ShowminScale": "0"
//                                , "ShowmaxScale": "0"
//                            }
//                              , {
//                                  "MapServiceLayerType": "esri.layers.TianDiTuTiledMapServiceLayer_Vector"
//                                , "LayerName": "TDT_DZ"
//                                , "LayerTitle": "天地图电子地图"
//                                , "ServiceUrl": ""
//                                , "InfoWindowSettings":
//                                    {
//                                        "FieldArray":
//                                            [

//                                            ]
//                                    }
//                                , "LayerType": "Map"
//                                , "SymbolUrl": ""
//                                , "SymbolColor": "#F70909"
//                                , "SymbolWidth": "20"
//                                , "SymbolHeight": "20"
//                                , "SymbolBorderColor": ""
//                                , "SymbolFillColor": ""
//                                , "opacity": "1"
//                                , "layerIndex": ""
//                                , "ShowminScale": "0"
//                                , "ShowmaxScale": "0"
//                              }, {
//                                  "MapServiceLayerType": "esri.layers.TianDiTuTiledMapServiceLayer_PlaceName"
//                                , "LayerName": "TDT_PlaceName"
//                                , "LayerTitle": "天地图标注"
//                                , "ServiceUrl": ""
//                                , "InfoWindowSettings":
//                                    {
//                                        "FieldArray":
//                                            [

//                                            ]
//                                    }
//                                , "LayerType": "Map"
//                                , "SymbolUrl": ""
//                                , "SymbolColor": "#F70909"
//                                , "SymbolWidth": "20"
//                                , "SymbolHeight": "20"
//                                , "SymbolBorderColor": ""
//                                , "SymbolFillColor": ""
//                                , "opacity": "1"
//                                , "layerIndex": ""
//                                , "ShowminScale": "0"
//                                , "ShowmaxScale": "0"
//                              }
//                        ]
//                },
                 {
                    "LayerTitle": "边界",
                    "LayerName": "边界",
                    "ServiceUrl": "",
                    "Layers":
                    [
                    {
                        "LayerTitle": "太湖流域边界",
                        "LayerName": "Bj",
                        "ServiceUrl": "",
                        "dataList":arcgis_layer_bound,
                        "InfoWindowSettings":
                        {
                            "FieldArray":
                            [
                            ]
                        },
                        "LayerType": "Polygon",
                        "MapServiceLayerType": "",
                        "SymbolUrl": "",
                        "SymbolColor": "",
                        "SymbolWidth": "20",
                        "SymbolHeight": "20",
                        "SymbolBorderColor": "#FFFF00",
                        "SymbolBorderWidth":"2",
                        "SymbolFillColor": [255, 255, 0, 0],
                        "opacity": "1",
                        "layerIndex": "99",
                        "ShowminScale": "0",
                        "ShowmaxScale": "0",
                        "isBusinessLayer":false
                    }
                    , {
                        "LayerTitle": "太湖边界",
                        "LayerName": "THBj",
                        "ServiceUrl": "",
                        "dataList": arcgis_layer_th,
                        "InfoWindowSettings":
                        {
                            "FieldArray":
                            [
                            ]
                        },
                        "LayerType": "Polygon",
                        "MapServiceLayerType": "",
                        "SymbolUrl": "",
                        "SymbolColor": "",
                        "SymbolWidth": "20",
                        "SymbolHeight": "20",
                        "SymbolBorderColor": "#ffff00",//"#009DDA",
                        "SymbolBorderWidth": "2",
                        "SymbolFillColor": [255, 255, 0, 0],
                        "opacity": "1",
                        "layerIndex": "99",
                        "ShowminScale": "0",
                        "ShowmaxScale": "0",
                        "isBusinessLayer": false
                    }
                    , {
                        "LayerTitle": "行政区区县边界",
                        "LayerName": "Canton",
                        "ServiceUrl": CantonLayerUrl,
                        "InfoWindowSettings":
                        {
                            "FieldArray":
                            [
                            ],
                            "DetailUrl": ""
                        },
                        "LayerType": "Map",
                        "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                        "SymbolUrl": "",
                        "SymbolColor": "#F70909",
                        "SymbolWidth": "20",
                        "SymbolHeight": "20",
                        "SymbolBorderColor": "",
                        "SymbolFillColor": "",
                        "opacity": "1",
                        "layerIndex": "99",
                        "ShowminScale": "0",
                        "ShowmaxScale": "0"
                    }, {
                        "LayerTitle": "行政区乡镇边界",
                        "LayerName": "CantonTown",
                        "ServiceUrl": CantonTownLayerUrl,
                        "InfoWindowSettings":
                        {
                            "FieldArray":
                            [
                            ]
                        },
                        "LayerType": "Map",
                        "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                        "SymbolUrl": "",
                        "SymbolColor": "#F70909",
                        "SymbolWidth": "20",
                        "SymbolHeight": "20",
                        "SymbolBorderColor": "",
                        "SymbolFillColor": "",
                        "opacity": "1",
                        "layerIndex": "99",
                        "ShowminScale": "0",
                        "ShowmaxScale": "0"
                    },
                        {
                            "LayerName": "WaterEco",
                            "LayerTitle": "水生态功能分区",
                            "ServiceUrl": WG49LayerUrl,
                            "InfoWindowSettings":
                            {
                                "Height": 100,
                                "FieldArray":
                                [
                                //                                {
                                //                                    "FieldName": "命名",
                                //                                    "IsTitle": true,
                                //                                    "IsShow": false,
                                //                                    "ShowName": "",
                                //                                    "IsParameter": false,
                                //                                    "ParameterName": ""
                                //                                },
                                //                                {
                                //                                    "FieldName": "分类管理",
                                //                                    "IsTitle": false,
                                //                                    "IsShow": true,
                                //                                    "ShowName": "类别",
                                //                                    "IsParameter": false,
                                //                                    "ParameterName": ""
                                //                                },
                                //                                    {
                                //                                        "FieldName": "主导功能",
                                //                                        "IsTitle": false,
                                //                                        "IsShow": true,
                                //                                        "ShowName": "主导功能",
                                //                                        "IsParameter": false,
                                //                                        "ParameterName": ""
                                //                                    }
                                ],
                                "DetailUrl": ""
                            },
                            "LayerType": "Map",
                            "MapServiceLayerType": "esri.layers.ArcGISTiledMapServiceLayer",
                            "SymbolUrl": "",
                            "SymbolColor": "#F70909",
                            "SymbolWidth": "20",
                            "SymbolHeight": "20",
                            "SymbolBorderColor": "",
                            "SymbolFillColor": "",
                            "opacity": "0.7",
                            "layerIndex": "99",
                            "ShowminScale": "0",
                            "ShowmaxScale": "0",
                            "SymbolHLColor": "#FFFF00",
                            "SymbolBorderWidth": "3",
                            "SymbolHLFillColor": [0, 0, 0, 0]
                            //   , "Legend": [{ name: "生态Ⅰ类区", color: "#A9D78F" }, { name: "生态Ⅱ类区", color: "#CCEE84" }, { name: "生态Ⅲ类区", color: "#FFFB97" }, { name: "生态Ⅳ类区", color: "#FDC58D"}]

                        }
                    ]
                }
            ]
    }
    , {
        "LayerTypeName": "EnvironmentalInformation",
        "LayerTypeTitle": "环境信息",
        "Width": null,
        "Layers":
        [
            {
                "LayerName": "CheckPoint",
                "LayerTitle": "调查点位",
                "ServiceUrl": CheckPointLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "经度",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "纬度",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "点位",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "枯水期",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "枯水期",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "平水期",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "平水期",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "丰水期",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "丰水期",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水质_COD",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "水质_COD",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水质_氨氮",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "水质_氨氮",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水质_总磷",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "水质_总磷",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水质_综合",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "水质_综合",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Point",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolArray":
                {
                    "SymbolWidth": 25,
                    "SymbolHeight": 25,
                    "attrKey": "分类",
                    "attrValue":
                    [
                        {
                            "symbolUrl": "Web/maps/Images/symbols/CheckPoint.png",
                            "value": "0"
                        }, {
                            "symbolUrl": "Web/maps/Images/symbols/CheckPoint2.png",
                            "value": "1"
                        }
                    ]
                },
                "SymbolColor": "#F70909",
                "SymbolWidth": "24",
                "SymbolHeight": "24",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0"
            }, {
                "LayerName": "PolluteWater",
                "LayerTitle": "污水厂",
                "ServiceUrl": PolluteWaterLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "类别",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "类别",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "区县",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "区县",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Point",
                "MapServiceLayerType": "",
                "SymbolUrl": "Web/maps/Images/symbols/PolluteWater.png",
                "SymbolColor": "#F70909",
                "SymbolWidth": "24",
                "SymbolHeight": "24",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0"
            }, {
                "LayerName": "ImportantEntAll",
                "LayerTitle": "重点企业",
                "ServiceUrl": ImpEntPLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "FID",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "XZQDM",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "XZQMC",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "TJNF",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "QYMC",
                            "IsTitle": true,
                            "IsShow": true,
                            "ShowName": "企业名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "X",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "Y",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "XXDZ1",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "市",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "XXDZ2",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "区（县)",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "XXDZ3",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "街道",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "XXDZ4",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "村",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "SJGNQ",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "HYLBMC",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "行业类别",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "HYLB",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "PSQXDM",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "PSQX",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "SNSTDM",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "SNSTMC",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "GYZCZ_w_",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "FSPFL_t_",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "COD_t_",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "NH3_N_t_",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "TN_t_",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "TP_t_",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Point",
                "MapServiceLayerType": "esri.layers.ArcGISImageServiceLayer",
                "SymbolUrl": "Web/maps/Images/symbols/ImportantEnt.png",
                "SymbolColor": "#F70909",
                "SymbolWidth": "24",
                "SymbolHeight": "24",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "IsClusterLayer": true,
                "flareLimit": 50,
                "flareDistanceFromCenter": 50,
                "ClusterItemList":
                [
                    {
                        "Key": "single",
                        "Size": "15",
                        "Color": "[0, 199, 255]"
                    }
                ]
            }, {
                "LayerName": "importantRiver",
                "LayerTitle": "入湖河流",
                "ServiceUrl": importantRiverUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "Name",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "riverType",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "河流类型",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水功能",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Line",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "20",
                "SymbolHeight": "20",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "SymbolHLColor": [213, 243, 4, 0.8],
                "SymbolBorderWidth": "3"
            }, {
                "LayerName": "RiverControlUnit",
                "LayerTitle": "地表水_河流",
                "ServiceUrl": RiverLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "水功能",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水环境",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "流域",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水系",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "河流",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "河段",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "控制断面",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "控制重点城",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "控制重点城市",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Line",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "20",
                "SymbolHeight": "20",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "SymbolHLColor": [213, 243, 4, 0.8],
                "SymbolBorderWidth": "3"
            }, {
                "LayerName": "LakeControlUnit",
                "LayerTitle": "地表水_湖泊",
                "ServiceUrl": LakeLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "水功能",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水环境",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "流域",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "水系",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "河流",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "河段",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "控制断面",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "控制重点城",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "控制重点城市",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Polygon",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolColor": "#F70909",
                "SymbolHLColor": "#0000FF",
                "SymbolWidth": "20",
                "SymbolHeight": "20",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "SymbolHLFillColor": [213, 243, 4, 0.8],
                "SymbolBorderWidth": "1",
                "opacity": "0.8",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0"
            }, {
                "LayerName": "LimitDevelop",
                "LayerTitle": "限制开发区域",
                "ServiceUrl": LimitDevelopLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Polygon",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "SymbolBorderWidth": "",
                "opacity": "0.8",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0"
            }, {
                "LayerName": "OptimizeDevelop",
                "LayerTitle": "优化开发区域",
                "ServiceUrl": OptimizeDevelopLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Polygon",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "SymbolBorderWidth": "",
                "opacity": "0.8",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0"
            }, {
                "LayerTitle": "太湖三级保护区",
                "LayerName": "ThreePro",
                "ServiceUrl": LinePolygonLayer,
                "InfoWindowSettings":
                {
                    "Width": "100",
                    "IsScreenPoint": true,
                    "FieldArray":
                    [
                        {
                            "FieldName": "grade",
                            "IsTitle": true,
                            "IsShow": true,
                            "ShowName": "名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ]
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolHLColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "SymbolBorderWidth": "",
                "SymbolHLFillColor": "",
                "opacity": "0.8",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "ChildLayerId": 6
            }, {
                "LayerTitle": "省级以上开发区",
                "LayerName": "DevelopeCanton",
                "ServiceUrl": DevelopeLayerUrl,
                "InfoWindowSettings":
                {
                    "Width": "500",
                    "Height": "200",
                    "FieldArray":
                    [
                        {
                            "FieldName": "KFQMC",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "开发区名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                        {
                            "FieldName": "KFQJB",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "开发区级别",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                        {
                            "FieldName": "SLSJ",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "设立时间",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                        {
                            "FieldName": "GLJG",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "管理机构",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                        {
                            "FieldName": "SPTDZMJ",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "审批土地面积",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                         {
                             "FieldName": "TDKFL",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "土地开发率",
                             "IsParameter": false,
                             "ParameterName": ""
                         },
                        {
                            "FieldName": "ZDCY",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "主导产业",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ]
                },
                "LayerType": "Polygon",
                "MapServiceLayerType": "",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "1",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "SymbolBorderWidth": "1",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "SymbolHLColor": "#FFFF00",
                "SymbolHLFillColor": [213, 243, 4, 0.8],
                "IsSymbolHLClear": false
            }, {
                "LayerTitle": "生态红线",
                "LayerName": "RedPolygon",
                "ServiceUrl": redPolygonLayerUrl,
                "InfoWindowSettings":
                {
                    "FieldArray":
                    [
                        {
                            "FieldName": "OBJECTID",
                            "IsTitle": false,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "名称_1",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "",
                            "IsParameter": false,
                            "ParameterName": ""
                        }, {
                            "FieldName": "管控区",
                            "IsTitle": false,
                            "IsShow": true,
                            "ShowName": "管控区类别",
                            "IsParameter": false,
                            "ParameterName": ""
                        }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "0.8",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "IsReorderLayer": true,
                "ReorderLayerIndex": 0,
                "isBusinessLayer": false,
                "SymbolHLColor": "#FFFF00",
                "SymbolHLFillColor": [255, 126, 126, 0],
                "SymbolBorderWidth": "2"
            }, {
                "LayerTitle": "物种保护",
                "LayerName": "SpeciesPro",
                "ServiceUrl": SpeciesProUrl,
                "InfoWindowSettings":
                {
                    "Width": "350",
                    "Height": "100",
                    "FieldArray":
                    [
                        {
                            "FieldName": "Name",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                         {
                             "FieldName": "Current",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "现状分布",
                             "IsParameter": false,
                             "ParameterName": ""
                         },
                         {
                             "FieldName": "Potential",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "潜在分布",
                             "IsParameter": false,
                             "ParameterName": ""
                         }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "0.8",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "isBusinessLayer": false,
                "Legend": [{ name: "调查分布范围", color: "#FF0000" }, { name: "潜在分布范围", color: "#38A800"}]
            }, {
                "LayerTitle": "一级分区",
                "LayerName": "oneControlUnit",
                "ServiceUrl": OneTwoThreeLayerUrl,
                "InfoWindowSettings":
                {
                    "Width": "350",
                    "Height": "100",
                    "FieldArray":
                    [
                        {
                            "FieldName": "Name",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                         {
                             "FieldName": "一级编码",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "",
                             "IsParameter": false,
                             "ParameterName": ""
                         }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "isBusinessLayer": false,
                "ChildLayerId": 0
            }, {
                "LayerTitle": "二级分区",
                "LayerName": "twoControlUnit",
                "ServiceUrl": OneTwoThreeLayerUrl,
                "InfoWindowSettings":
                {
                    "Width": "350",
                    "Height": "100",
                    "FieldArray":
                    [
                        {
                            "FieldName": "Name",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                         {
                             "FieldName": "一级编码",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "",
                             "IsParameter": false,
                             "ParameterName": ""
                         }, {
                             "FieldName": "二级编码",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "",
                             "IsParameter": false,
                             "ParameterName": ""
                         }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "isBusinessLayer": false,
                "ChildLayerId": 1
            }, {
                "LayerTitle": "三级分区",
                "LayerName": "threeControlUnit",
                "ServiceUrl": OneTwoThreeLayerUrl,
                "InfoWindowSettings":
                {
                    "Width": "350",
                    "Height": "100",
                    "FieldArray":
                    [
                        {
                            "FieldName": "Name",
                            "IsTitle": true,
                            "IsShow": false,
                            "ShowName": "名称",
                            "IsParameter": false,
                            "ParameterName": ""
                        },
                         {
                             "FieldName": "一级编码",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "",
                             "IsParameter": false,
                             "ParameterName": ""
                         }, {
                             "FieldName": "二级编码",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "",
                             "IsParameter": false,
                             "ParameterName": ""
                         }, {
                             "FieldName": "三级编码",
                             "IsTitle": false,
                             "IsShow": true,
                             "ShowName": "",
                             "IsParameter": false,
                             "ParameterName": ""
                         }
                    ],
                    "DetailUrl": ""
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISDynamicMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "0.5",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "isBusinessLayer": false,
                "ChildLayerId": 2
            }, {
                "LayerTitle": "控制单元",
                "LayerName": "controlUnitLayer",
                "ServiceUrl": controlUnitLayerUrl,
                "InfoWindowSettings":
                {
                    "Width": "350",
                    "Height": "100",
                    "FieldArray": [],
                    "DetailUrl": ""
                },
                "LayerType": "Map",
                "MapServiceLayerType": "esri.layers.ArcGISTiledMapServiceLayer",
                "SymbolUrl": "",
                "SymbolColor": "",
                "SymbolWidth": "",
                "SymbolHeight": "",
                "SymbolBorderColor": "",
                "SymbolFillColor": "",
                "opacity": "1",
                "layerIndex": "99",
                "ShowminScale": "0",
                "ShowmaxScale": "0",
                "isBusinessLayer": false
            }
        ]
    }
];
var LayersControlRiskDataSource = [
 {
     "LayerTypeName": "",
     "LayerTypeTitle": "",
     "Width": null,
     "Layers": [{
         "LayerTitle": "流域总量排放合并",
         "LayerName": "FlowTotal",
         "callback": function () { },
         "Layers": [{ "LayerTitle": "总量排放核定",
             "LayerName": "Current_Flow",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }
         , { "LayerTitle": "总量动态监控",
             "LayerName": "Daily_DischargeAmount_fullyear",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }]
     }, { "LayerTitle": "总量监控月报",
         "LayerName": "MonthReportDownLoad",
         "callback": function (LayerName, LayerTitle) {
             openRiskLayersControlUrl(LayerName, LayerTitle);
         }
     }, {
         "LayerTitle": "竺山湖蓝藻预警",
         "LayerName": "bluegreenAlgae",
         "callback": function () { },
         "Layers": [{ "LayerTitle": "预警分级",
             "LayerName": "AlgaeLevel",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }
         , { "LayerTitle": "实时预警",
             "LayerName": "RealAlgaeLevel",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }, { "LayerTitle": "历史查询",
             "LayerName": "AlgaeLevelChart",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }]
     }, {
         "LayerTitle": "基础数据库",
         "LayerName": "baseData",
         "callback": function () { },
         "Layers": [{ "LayerTitle": "蓝藻预警分级",
             "LayerName": "dataquery_HIS_MEASURAND_Algae_Level",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }
         , { "LayerTitle": "站点信息表",
             "LayerName": "dataquery_MEASURAND_STATION",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }, { "LayerTitle": "采样数据表",
             "LayerName": "dataquery_HIS_MEASURAND_Data",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }, { "LayerTitle": "月排放量表",
             "LayerName": "dataquery_HIS_MEASURAND_AverageFlow_Month",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }, { "LayerTitle": "日排放量表",
             "LayerName": "dataquery_HIS_MEASURAND_DischargeAmount_Day",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }, { "LayerTitle": "日均流量表",
             "LayerName": "dataquery_HIS_MEASURAND_AverageFlow_Day",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }, { "LayerTitle": "日密度表",
             "LayerName": "dataquery_HIS_MEASURAND_Data_Day",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle);
             }
         }]
     }]
 }
];

var LayersControlHelathkDataSource = [
 {
     "LayerTypeName": "",
     "LayerTypeTitle": "",
     "Width": null,
     "Layers": [{
         "LayerTitle": "太湖流域水生态健康评估",
         "LayerName": "waterNow",
         "callback": function (LayerName, LayerTitle) {
             drainFlowNetPoint_show(LayerName);
         },
         "outCallback": function () {
             divArcGISLegendJQ.hide();
             API.ArcGISAPI.hideMSLayer({ LayerName: "waterNow" });

         }
     }, {
         "LayerTitle": "示范区水生态健康评估",
         "LayerName": "DAWaterHealth",
         "callback": function (LayerName, LayerTitle) {
             $.LayersControl.SetLayerChecked({ Selector: divArcGISLayersControlJQ, LayerName: "DA_BJ" });
             divArcGISSoilFatPowerJQ.AnalyseWaterHealthPower({
                 ArcGISWindow: API.ArcGISAPI.ArcGISWindow
               , ArcGISMap: API.ArcGISAPI.ArcGISMap
             });
         },
         "outCallback": function () {
             DAWaterHealth_hide();
         }
     }
     , {
         "LayerTitle": "水生态健康长期变化分析",
         "LayerName": "waterEcosystemHealth",
         "Layers": [{
             "LayerTitle": "水生生物健康变化分析评价（调查数据）",
             "LayerName": "aquaticHealthChangeAnalysis",
             "Layers": [
         { "LayerTitle": "水质及五参数",
             "LayerName": "waterQualityFiveParameters2",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "浮游生物",
             "LayerName": "plankton2",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "浮游动物",
             "LayerName": "zooplankter2",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "底栖动物",
             "LayerName": "benthonicAnimal2",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }]
         }
         , {
             "LayerTitle": "水生生境健康变化分析评价（调查数据）",
             "LayerName": "aquaticHabitatHealthChangeAnalysis",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , {
             "LayerTitle": "水生态功能区健康变化分析评价（调查数据）",
             "LayerName": "waterEcologicalFunctionAreaHealthChangeAnalysis",
             "Layers": [
         { "LayerTitle": "河流湖库水质指数",
             "LayerName": "riverLakeWaterQualityIndex",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "浮游藻类完整性指数",
             "LayerName": "planktonicAlgaeIntegrityIndex",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "底栖动物完整性指数",
             "LayerName": "benthicIndexOfBioticIntegrity",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "水生态健康指数",
             "LayerName": "waterEcosystemHealthIndex",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }]
         }
         ]
     }]
 }
];


var LayersControlPolicyDataSource = [{
    "LayerTypeName": "",
    "LayerTypeTitle": "",
    "Width": null,
    "Layers": [{
        "LayerTitle": "健康监测与评价方法",
        "LayerName": "FlowTotal",
        "callback": function () { },
        "Layers": [{ "LayerTitle": "术语定义",
            "LayerName": "termDefinition",
            "callback": function (LayerName, LayerTitle) {
                openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
            }
        }
         , { "LayerTitle": "指标体系",
             "LayerName": "targetSystem",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "评估方法",
             "LayerName": "assessmentMethod",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }
         , { "LayerTitle": "水生态监测",
             "LayerName": "waterEcologicalMonitoring",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISRiskLayersControlJQ);
             }
         }]
    }]
}];

var LayersControlTechnologyDataSource = [{
    "LayerTypeName": "",
    "LayerTypeTitle": "",
    "Width": null,
    "Layers": [{
        "LayerTitle": "技术库",
        "LayerName": "",
        "callback": function () { },
        "Layers": [{ "LayerTitle": " 容量计算",
            "LayerName": "volumetricCalculation",
            "callback": function (LayerName, LayerTitle) {
                openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISTechnologyLayersControlJQ);
            }
        }
         , { "LayerTitle": "排污权分配",
             "LayerName": "pollutionRight",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISTechnologyLayersControlJQ);
             }
         }
         , { "LayerTitle": "初始排污量核定",
             "LayerName": "initialPollution",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISTechnologyLayersControlJQ);
             }
         }
         , { "LayerTitle": "水生态健康评估",
             "LayerName": "waterHealthAssessment",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divArcGISTechnologyLayersControlJQ);
             }
         }]
    }]
}];
var LayersControlWaterSurverDataSource = [{
    "LayerTypeName": "",
    "LayerTypeTitle": "",
    "Width": null,
    "Layers": [{
        "LayerTitle": "水生态调查数据管理",
        "LayerName": "WaterSurveyDatamanagement",
        "callback": function () { },
        "Layers": [
         { "LayerTitle": " 采样点查询",
             "LayerName": "samplePointQuery",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }
         , { "LayerTitle": "采样点信息维护",
             "LayerName": "samplePointInformationMaintenance",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }
         , { "LayerTitle": "采样任务信息",
             "LayerName": "initialPollution2",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }
         , { "LayerTitle": "任务采样点信息",
             "LayerName": "samplingTaskInformation",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }, { "LayerTitle": "采样点生境录入",
             "LayerName": "samplePointHabitat",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }, { "LayerTitle": "检测结果录入",
             "LayerName": "waterHealthAssessment",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }, { "LayerTitle": "监测结果审核",
             "LayerName": "reviewMonitoringResults",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }]
    }
    , {
        "LayerTitle": "水生态调查数据宗查",
        "LayerName": "waterSurveyDataCheck",
        "callback": function () { },
        "Layers": [
         { "LayerTitle": "水质及五参数",
             "LayerName": "waterQualityFiveParameters",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }
         , { "LayerTitle": "浮游生物",
             "LayerName": "plankton",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }
         , { "LayerTitle": "浮游动物",
             "LayerName": "zooplankter",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }
         , { "LayerTitle": "底栖动物",
             "LayerName": "benthonicAnimal",
             "callback": function (LayerName, LayerTitle) {
                 openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
             }
         }]
    }, {
        "LayerTitle": "水生态物种资源库",
        "LayerName": "waterEcologicalSpeciesResource",
        "callback": function () { },
        "callback": function (LayerName, LayerTitle) {
            openRiskLayersControlUrl(LayerName, LayerTitle, true, divWaterSurveyDatamanagementJQ);
        }
    }]
}];