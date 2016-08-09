require.config({
    paths: {
        "jquery": "lib/jquery-1.12.3",
        "alert": "app/alert",
        "widget": "app/widget"
    }
});
//paths 中路径是相对于main.js
require(['jquery', 'alert'], function($, w) {
    $('#mybtn').on('click', function() {
        var ale = new w.pop();
        ale.alert({
            closeBtn: true,
            content: 123,
        });
        ale.on('ok', function() {
            alert('ok 1')
        }).on('ok', function() {
            alert('ok 2')
        }).on('close', function() {
            alert('关闭 2')
        });
    })
})
