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

    var bootPATH = __CreateJSPath("boot.js");

    window.webSiteRootUrl = bootPATH.replace("resources/scripts/", "");

    //debugger
    mini_debugger = true;

    //流量统计
    document.write('<div style="display:none">');
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan id='cnzz_stat_icon_1262013760'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1262013760%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
    document.write('</div>');
    //miniui

    document.title = '苏州市环境综合监管平台';
    document.write('<link href="' + bootPATH + 'miniui-3.7/themes/icons.css" rel="stylesheet" type="text/css" />');
    document.write('<link href="' + bootPATH + 'miniui-3.7/themes/default/miniui.css" rel="stylesheet" type="text/css" />');
    document.write('<link href="' + bootPATH + 'miniui-3.7/themes/icons.css" rel="stylesheet" type="text/css" />');
    document.write('<link href="' + bootPATH + 'fw/themes/default/fw.css" rel="stylesheet" type="text/css" />');

    //document.write('<script src="' + bootPATH + 'jquery-1.6.2.min.js" type="text/javascript"></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'jquery/jquery-1.8.3.js" type="text/javascript"></sc' + 'ript>');
    //document.write('<script src="' + bootPATH + 'jquery-2.1.3.js" type="text/javascript"></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'jquery/jquery.tmpl.js" type="text/javascript"></sc' + 'ript>');

    document.write('<script src="' + bootPATH + 'miniui-3.7/miniui.js" type="text/javascript" ></sc' + 'ript>');
    //document.write('<script src="' + bootPATH + 'miniui-3.7/miniui-source.js" type="text/javascript" ></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'fw/fw.js" type="text/javascript" ></sc' + 'ript>');

    //document.write('<script src="' + bootPATH + 'webUploader/webuploader.min.js" type="text/javascript" ></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'webUploader/webuploader.js" type="text/javascript" ></sc' + 'ript>');

    document.write('<script src="' + bootPATH + 'fw/fw.fwMiniControl.js" type="text/javascript" ></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'fw/fw.fwMiniControl2.js" type="text/javascript" ></sc' + 'ript>');
    document.write('<script src="' + bootPATH + 'js.RSA.js" type="text/javascript" ></sc' + 'ript>');


    //mode
    var mode = getCookie("miniuiMode");
    mode = "h32";
    if (mode) {
        document.write('<link href="' + bootPATH + 'miniui-3.7/themes/default/' + mode + '-mode.css" rel="stylesheet" type="text/css" />');
    }


    //skin
    var skin = getCookie("miniuiSkin");
    //skin = "bootstrap";
    skin = "mlsc-chiyou";
    if (skin) {
        document.write('<link href="' + bootPATH + 'miniui-3.7/themes/' + skin + '/skin.css" rel="stylesheet" type="text/css" />');
    }


    /*加载 begin  vue  js的脚本顺序不能变*/
//    document.write('<script src="' + bootPATH + 'assets/js/vue.min.js" type="text/javascript" ></sc' + 'ript>');
//    document.write('<script src="' + bootPATH + 'assets/js/iview.min.js" type="text/javascript" ></sc' + 'ript>');
//    document.write('<link href="' + bootPATH + 'assets/css/iview.css" rel="stylesheet" type="text/css" />');
    /*加载 end  vue*/


    ////////////////////////////////////////////////////////////////////////////////////////
    function getCookie(sName) {
        var aCookie = document.cookie.split("; ");
        var lastMatch = null;
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0]) {
                lastMatch = aCrumb;
            }
        }
        if (lastMatch) {
            var v = lastMatch[1];
            if (v === undefined) return v;
            return unescape(v);
        }
        return null;
    }


    window.console = window.console || (function () {
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
	= c.clear = c.exception = c.trace = c.assert = function () { };
        return c;
    })();


    window.isBootloaded = true;
};