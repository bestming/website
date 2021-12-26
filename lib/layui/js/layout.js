layui.config({
	base: 'lib/layui/js/'
}).use(['element', 'layer', 'navbar', 'tab'], function() {
	var element = layui.element()
	$ = layui.jquery,
		layer = layui.layer,
		navbar = layui.navbar(),
		tab = layui.tab({
			elem: '.admin-nav-card', //设置选项卡容器
			contextMenu:true
		});

	//iframe自适应
	$(window).on('resize', function() {
		var $content = $('.admin-nav-card .layui-tab-content');
		$content.height($(this).height() - 140);
		$content.find('iframe').each(function() {
			$(this).height($content.height());
		});
	}).resize();

	var $menu = $('#menu');
	$menu.find('.layui-nav-item').each(function() {
		var $this = $(this);
		//绑定一级导航的点击事件
		$this.on('click', function() {
			//获取设置的模块ID
			var id = $this.find('a').attr('module-id');
			//这里的数据源只是演示时用的，实际需求可能通过远程读取（根据模块ID来获取对应模块的信息）
			var url ;// = 'asserts/datas/nav_content.json';
			//console.log("id:" + id);
			switch(id) {
				case "1":
					url = 'index.do?method=resources&menu=1';
					break;
				case "2":
					url = 'index.do?method=resources&menu=2';
					break;
				case "3":
					url = 'index.do?method=resources&menu=3';
					break;
				default:
					break;
			}
			//设置数据源有两个方式。
			//第一：在此页面通过ajax读取设置  举个栗子：
			//---------这是第一个栗子----------
			/*$.getJSON('/api/xxx',{moduleId:id},function(data){
				navbar.set({
					elem: '#side',
					data: data
				});
				navbar.render();
				navbar.on('click(side)', function(data) {
					tab.tabAdd(data.field);
				});
			});*/
			//------------栗子结束--------------
			//第二：设置url
			//---------这是第二个栗子----------
			/*navbar.set({
				elem: '#side',
				url: '/api/xxx?moduleId='+id
			});
			navbar.render();
			navbar.on('click(side)', function(data) {
				tab.tabAdd(data.field);
			});*/
			//------------栗子结束--------------	

			//设置navbar
			navbar.set({
				elem: '#admin-navbar-side', //存在navbar数据的容器ID
				url: url
			});
			//渲染navbar
			navbar.render();
			//监听点击事件
			navbar.on('click(side)', function(data) {
				//layer.msg(data.field.href);
				tab.tabAdd(data.field);
			});
		});

	});
	//模拟点击内容管理
	$('#menu .layui-nav-item').find('a[module-id="1"]').click();

	element.on('nav(user)', function(data) {
		var $a = data.children('a');
		if($a.data('tab') !== undefined && $a.data('tab')) {
			tab.tabAdd({
				title: $a.children('cite').text(),
				//icon: 'fa-user',
				href: $a.data('url')
			});
		}
	});
	// 菜单栏收缩
	$('.admin-side-toggle').on('click', function () {
        var sideWidth = $('#admin-side').width();
        if (sideWidth === 200) {
            $('#admin-body').animate({
                left: '0'
            }); //admin-footer
            $('#admin-footer').animate({
                left: '0'
            });
            $('#admin-side').animate({
                width: '0'
            });
        } else {
            $('#admin-body').animate({
                left: '200px'
            });
            $('#admin-footer').animate({
                left: '200px'
            });
            $('#admin-side').animate({
                width: '200px'
            });
        }
    });
	$('.admin-side-full').on('click', function () {
        var docElm = document.documentElement;
        //W3C  
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        //FireFox  
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        //Chrome等  
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        layer.msg('按Esc即可退出全屏');
    });
    //手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade');
    treeMobile.on('click', function () {
        $('body').addClass('site-mobile');
    });
    shadeMobile.on('click', function () {
        $('body').removeClass('site-mobile');
    });
});