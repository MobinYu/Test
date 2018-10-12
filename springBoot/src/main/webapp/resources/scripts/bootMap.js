__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("bootMap.js");

window.webSiteRootUrl = bootPATH.replace("resources/scripts/", "");

document.write('<script src="' + bootPATH + 'fw.map/scripts/baiduToWGS84.js" type="text/javascript"></sc' + 'ript>');
//document.write('<link href="' + bootPATH + '../Maps/ArcGIS/FrameWork/ags319/jsapi/arcgis/3.19/js/esri/css/esri.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + layerUrl.apiCssUrl + '" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'fw.map/themes/default/arcgis.Home.css" rel="stylesheet" type="text/css" />');
//document.write('<script src="' + bootPATH + '../Maps/ArcGIS/FrameWork/ags319/jsapi/index.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + layerUrl.apiIndexUrl + '" type="text/javascript"></sc' + 'ript>');


//document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.LayerUrl.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.API.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.TDTLayer.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.multiLineTextSymbol.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.measure.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.clusterLayer.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'fw.map/scripts/arcgis.MapCustom.js" type="text/javascript"></sc' + 'ript>');