define(['jquery'],function($){
	var Window=function(){};
	Window.prototype={
		old:{title:'提示框',
		closeBtn:false,
		content:'RequireJS默认假定所有的依赖资源都是js脚本，因此无需在module ID上再加".js"后缀，RequireJS在进行module ID到path的解析时会自动补上后缀。你可以通过paths config设置一组脚本，这些有助于我们在使用脚本时码更少的字。所有的依赖资源都是js脚本，因此无需在module ID上再加".js"后缀，RequireJS在进行module ID到path的解析时会自动补上后缀。你可以通过paths config设置一组脚本，这些有助于我们在使用脚本时码更少的字。',
		btn1:'OK',
		closeBtn:'false',
		mask:'true'
	},
		alert:function(content){
			var $content=$.extend({},this.old,content)
			var $alert_pop=$('<div class="alert_pop"></div>'),
				$alert_title=$('<p></p>').html($content.title).on('selectstart',function(){return false;}),
				$alert_header=$('<div class="alert_header"></div>'),
				$alert_closeBtn=$('<a class="alert_closeBtn" href="javascript:void(0)">X</a>'),
				$alert_content=$('<p></p>').html($content.content),
				$alert_body=$('<div class="alert_body"></div>'),
				$alert_footer=$('<div class="alert_footer"></div>'),
				$alert_btn1=$('<button></button>').addClass("alert_btn1").html($content.btn1),
				$alert_mask=$('<div class="alert_mask"></div>');

				$alert_header.append($alert_title);
				$alert_pop.append($alert_header);
				$alert_body.append($alert_content);
				$alert_pop.append($alert_body);
				$alert_footer.append($alert_btn1);
				$alert_pop.append($alert_footer);
				$alert_pop.appendTo("body");
			if($content.closeBtn)
			{
				$alert_header.append($alert_closeBtn);
				$alert_closeBtn.on('click',function(){
					$alert_pop.remove();
					$(".alert_mask")&&$(".alert_mask").remove();
				});
			};
			if($content.mask)
			{
				console.log(1244)
				$alert_mask.insertBefore($alert_pop).on('click',function(){
					$(this).toggleClass("alert_mask2");
				});
			}
			$alert_btn1.on('click',function(){
				$alert_pop.remove();
				$(".alert_mask")&&$(".alert_mask").remove();
			});

		}

	};
	return {
		Window:Window
	}
})



