//自定义方法
$.mapPageCustomer = {
    isMapDragValited: true,
    isDrawing: false,
    mapTargetMoveHandle: function (obj1, obj2) {

        //要求鼠标在移动对象上时不能移动
        $(obj2).bind("mouseover", function (event) {
            $.mapPageCustomer.isMapDragValited = false;
        });
        $(obj2).bind("mouseout", function (event) {
            if (!$.mapPageCustomer.isDrawing) {
                $.mapPageCustomer.isMapDragValited = true;
            }
        });
        $(".infowindow").bind("mouseover", function (event) {
            $.mapPageCustomer.isMapDragValited = false;
        });
        $(".infowindow").bind("mouseout", function (event) {
            if (!$.mapPageCustomer.isDrawing) {
                $.mapPageCustomer.isMapDragValited = true;
            }
        });
        $(obj1).bind("mousedown", function (event) {
            if ($.mapPageCustomer.isMapDragValited) {
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
    },
    removeEndChar: function (str, character) {
        var result = "";
        if (str.substring(str.length - 1, str.length) == character) {
            result = str.substring(0, str.length - 1);
        } else {
            result = str;
        }
        return result;
    }
    
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};