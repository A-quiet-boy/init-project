/**
 * @fileOverview 通用浮出层
 */

var popup = (function () {
    var arr = navigator.userAgent.match(/MSIE (\d+)\.\d+;/);
    var INPUT_EVENT = arr && arr[1] < 9 ? 'propertychange' : 'input';

    function success(msg, second, fn) {
        if (second == null) {
            second = 5;
        }
        layer.msg(msg, second, {
            type: 1,
            shade: false,
            rate: 'left'
        });

        setTimeout(function () {
            fn && fn();
        }, second * 950);
    }

    function failure(msg, second) {
        if (second == null) {
            second = 5;
        }
        layer.msg(msg, second, {
            type: 0,
            shade: false,
            rate: 'left'
        });
    }

    function ask(msg, yes, no) {
        $.layer({
            area: ['300px', 'auto'],
            border: [0], //去掉默认边框
            shade: [0.5, '#000000'],
            closeBtn: [0, false], //去掉默认关闭按钮
            shift: 'top',
            dialog: {
                msg: msg,
                btns: 2,
                type: 4,
                btn: ['确定', '取消'],
                yes: function () {
                    yes();
                },
                no: function () {
                    no && no();
                }
            }
        });
    }

    function error(msg, second) {
        if (second == null) {
            second = 5;
        }
        layer.msg(msg, second, {
            type: 5,
            shade: false,
            rate: 'left'
        });
    }

    function close(id) {
        if (id == undefined) {
            layer.close(layer.index);
        } else {
            layer.close(id);
        }
    }

    function loading(msg, second) {
        if (second == null) {
            second = 15;
        }
        return layer.load(msg || '正在加载，请稍后...', second);
    }

    return {
        success: success,
        error: error,
        close: close,
        ask: ask,
        loading: loading,
        failure: failure
    };

})();

