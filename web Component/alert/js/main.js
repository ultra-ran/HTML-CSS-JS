require.config({
	paths:{
		"jquery": "lib/jquery-1.12.3",
		"alert" : "app/alert"
	}
});//paths 中路径是相对于main.js
require(['jquery','alert'],function($,w){
	$('#mybtn').on('click',function(){
		new w.Window().alert({
		title:'提示框super',
		closeBtn:true,
		content:123,
		btn1:'OK'
		})
	})

})
