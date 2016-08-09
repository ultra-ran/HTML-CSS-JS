define(function() {
    function widget() {
        // this.boundingBox = {};
    }
    ;widget.prototype = {
        on: function(type, fn) {
            if (typeof this.handler[type] == 'undefined')
                this.handler[type] = [];
            this.handler[type].push(fn);
            return this;
        },
        fire: function(type, data) {
            if (this.handler[type] != 'undefined') {
                var hand = this.handler[type];
                for (var i = 0; i < hand.length; i++) {
                    hand[i](data);
                }
            }
            return this;
        },
        renderUI:function(){},
        bindUI:function(){},
        syncUI:function(){},
        render:function(data){
        	this.renderUI(data);
        	this.handler={};
        	this.bindUI(data);
        	this.syncUI();
        	// $(container||document.body).append(this.boundingBox)
        	 },
        destructor:function(){},
        destroy:function(){
        	this.destructor();
        }

    };
    return {
        widget: widget
    }
})
