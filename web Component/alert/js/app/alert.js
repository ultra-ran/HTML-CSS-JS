define(['jquery', 'widget'], function($, mywidget) {
    var pop = function() {
        this.initData = {
            closeBtn: false,
            closeBtnHanderl: function() {
                alert('关闭 1')
            },
            okBtnHanderl: function() {
                alert('ok 0')
            },
            content: 'RequireJS默认假定所有的依赖资源都是js脚本，因此无需在module ID上再加".js"后缀，RequireJS在进行module ID到path的解析时会自动补上后缀。你可以通过paths config设置一组脚本，这些有助于我们在使用脚本时码更少的字。所有的依赖资源都是js脚本，因此无需在module ID上再加".js"后缀，RequireJS在进行module ID到path的解析时会自动补上后缀。你可以通过paths config设置一组脚本，这些有助于我们在使用脚本时码更少的字。',
            mask: 'true',
            width: '500',
            height: '200'
        };
        this.handler = {};
    }
    ;
    var proto = {
        renderUI: function(data) {
            // console.log(data)
            $(window).resize(function() {
                $('div.alert-pop').css({
                    'width': data.width,
                    'height': data.height,
                    'top': data.top || (window.innerHeight - data.height) / 2,
                    'left': data.top || (window.innerWidth - data.width) / 2
                }).fadeIn()
            }).trigger("resize");
            data.mask && $('div.alert-mask').show();
        },
        bindUI: function(data) {
            var that = this;
            if (data.closeBtnHanderl) {
                this.on('close', data.closeBtnHanderl)
            }
            ;if (this.okBtnHanderl) {
                this.on('ok', data.okBtnHanderl)
            }
            ;$('.alert-pop').on('click', '.alert-Btn1', function() {
                that.fire('ok');
                that.destroy();
            });
            $('.alert-pop').on('click', '.alert-closeBtn', function() {
                that.fire('close');
                that.destroy();
            })
        },
        destructor: function() {
            $('.alert-pop').hide().off();
            $(".alert-mask") && $(".alert-mask").hide();
        },
        alert: function(content) {
            var data = $.extend({}, this.initData, content);
            this.render(data);
            return this;
        }
    }
    pop.prototype = $.extend({}, new mywidget.widget(), proto);
    return {
        pop: pop
    }
})
