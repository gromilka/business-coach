jQuery(document).ready(function(){
    if(jQuery("#active_menu").length>0){ // если есть активный пункт меню, то позиционируем двигающуюся плашку на нем
        var menuWidth = jQuery("#active_menu").outerWidth(); // определяем ширину активного пункта меню
        var menuLeft = jQuery("#active_menu").position().left + 11.5; // определяем смещение активного пункта меню слева
        jQuery("#activeMenu").stop().animate({ // анимируем движущуюся плашку
            left: menuLeft+'px',
            width: menuWidth+'px'
        }, 500, 'linear');
    }
    jQuery("#topMenu a.mainlevel").mouseover(function(){ // поведение движущейся плашки при наведении на любой пункт меню. Все тоже самое, что и при наличии активного пункта, только позиция плашки определяется относительно пункта, на который произошло наведение курсора мыши
            var menuWidth = jQuery(this).outerWidth() + 10;
            var menuLeft = jQuery(this).position().left - 5;
            jQuery("#activeMenu").stop().animate({
                left: menuLeft+'px',
                width: menuWidth+'px'
            }, 300, 'linear');      
    });
    jQuery("#topMenu").mouseleave(function(){ // поведение плашки при окончании события наведения мыши на пункт меню (выход курсора мыши на пределы блока, в котором содержится меню)
        if(jQuery("#active_menu").length<=0){ // если активного пункта нет, то перемещаем плашку за границу экрана
            jQuery("#activeMenu").stop().animate({
                left: '0px',
                width: '0px'
            }, 500, 'linear');
        }
        else{ // иначе, если есть активный пункт меню – возвращаем плашку на него
            var menuWidth = jQuery("#active_menu").outerWidth() + 10;
            var menuLeft = jQuery("#active_menu").position().left - 5;
            jQuery("#activeMenu").stop().animate({
                left: menuLeft+'px',
                width: menuWidth+'px'
            }, 500, 'linear');
        }
    });

    $('.flexslider').flexslider({
		animation: "slide",
		controlNav: false,              
		directionNav: true,
	});

    var content = $('.content'); // выщитывания элементов контента
	var contentPosition = content.position().top;
	var contentHeight = content.outerHeight();
	var slideBarHeight = $('aside').outerHeight();// действия над правым баром
	var proportion = contentPosition + contentHeight - slideBarHeight - 20; // выщитывается пропорция остановки плавующего окна
	slideBarScroll();

	$(document).scroll(function() {
		slideBarScroll();
	});

	function slideBarScroll() {
		var scrollTop = $(document).scrollTop();// скролинг значение
		$(document).scroll(function() {
			if (scrollTop > contentPosition && scrollTop < proportion) {
				$('aside > div').css({
					'position': 'fixed',
					'top': 10,
					'width': '210px'
				});
			} else if (scrollTop < contentPosition) {
				$('aside > div').css({
					'position': 'relative',
					'top':'auto'
				});
			} else if (scrollTop > proportion) {
				$('aside > div').css({
					'position': 'absolute',
					'top': proportion+'px'
				});
			};
		});
	}
	

	$('.open-pop').on('click',function(){
		var data_name = $(this).attr('data-name');
		var popWidth = $('#pop.'+data_name).outerWidth() / 2;
		var popHeight = $('#pop.'+data_name).outerHeight() / 2;
		$('#pop.'+ data_name).addClass('active').css({
			'margin-top': '-'+popHeight+'px',
			'margin-left': '-'+popWidth+'px',
			'display':'block'
		});
		var myDiv = $('<div>').attr({'id':'cap'});
		$('footer').after(myDiv);
		return false;
	});
	$('#close-pop').on('click',function(){
		$('#pop.active').hide().removeClass('active');
		$('#cap').remove();
		return false;
	});
	

});