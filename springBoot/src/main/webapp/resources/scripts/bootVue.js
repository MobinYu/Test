
if (!window.isBootloaded) {
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

    var bootPATH = __CreateJSPath("bootVue.js");
    window.webSiteRootUrl = bootPATH.replace("resources/scripts/", "");
    //iview-styles 
    //document.write('<link href="' + bootPATH + 'iview-2.0.0/styles/iview.css" rel="stylesheet" type="text/css" />');
    document.write('<link href="' + bootPATH + 'iview-2.9.2/styles/iview.css" rel="stylesheet" type="text/css" />');
    //弹出层layer-styles 
    document.write('<link href="' + bootPATH + 'layer-3.0.3/skin/default/layer.css" rel="stylesheet" type="text/css" />');
    //jquery
    document.write('<script src="' + bootPATH + 'jquery/jquery-1.8.3.js" type="text/javascript"></sc' + 'ript>');
    //vue-类库
    document.write('<script src="' + bootPATH + 'vue-2.2.1/vue.js" type="text/javascript"></sc' + 'ript>');
    //公司帮助类
    document.write('<script src="' + bootPATH + 'fw/fw.js" type="text/javascript"></sc' + 'ript>');
    //iview-js   
    //document.write('<script src="' + bootPATH + 'iview-2.0.0/iview.min.js" type="text/javascript"></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'iview-2.9.2/iview.min.js" type="text/javascript"></sc' + 'ript>');
    //公共类库   
    document.write('<script src="' + bootPATH + 'underscore/underscore-1.8.3.min.js" type="text/javascript"></sc' + 'ript>');
    //时间处理   
    document.write('<script src="' + bootPATH + 'moment/moment-2.17.1.min.js" type="text/javascript"></sc' + 'ript>');
    //弹出层layer-js 
    document.write('<script src="' + bootPATH + 'layer-3.0.3/layer.js" type="text/javascript"></sc' + 'ript>');
    //linqjs
    document.write('<script src="' + bootPATH + 'linqjs/jquery.linq.min.js" type="text/javascript"></sc' + 'ript>');
    
    window.console = window.console || (function () {
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
	= c.clear = c.exception = c.trace = c.assert = function () { };
        return c;
    })();
    window.isBootloaded = true;
};