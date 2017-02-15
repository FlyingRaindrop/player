var SecondPage = (function(){ 

	var count, 
	display = [false, false, false, false]; 

	var init = function(){ 
		_accordion(); 
		_menu(); 
		_categories(); 
		_allData(); 
		_changeVideo(); 
		$(window).on('load resize',_windowSize); 
	}; 

	//===========Accordion============= 
	var _accordion = function(){ 
		var contentAccor = $('.inserted__list'), 
		accoItem = $('.acco__item-wrap');

		accoItem.on('click', function(e){ 
			var _this = $(this); 
			for(var i=0; i<accoItem.length; i++){ 
				if(accoItem[i]==this){ 
					count = i; 
				} 
			} 
			if(display[count]==false){ 
				//показываем список 
				_showList(_this,e); 
				display[count]=true; 
			}else if(display[count]==true){ 
				//прячем список 
				_hideList(_this,e); 
				display[count]=false; 
			}
		}); 

		var _showList = function(_this,e){ 
			e.preventDefault(); 
			$(_this).next(contentAccor).stop(true,true).slideDown(200); 
			$(_this).next(contentAccor).addClass('inserted__list_active'); 
			$(_this).find('.acco__icon') 
			.find('i') 
			.removeClass('pe-7s-angle-down') 
			.addClass('pe-7s-angle-up'); 
		}; 

		var _hideList = function(_this,e){ 
			e.preventDefault(); 
			$(_this).next(contentAccor).stop(true,true).slideUp(200); 
			$(_this).next(contentAccor).removeClass('inserted__list_active'); 
			$(_this).find('.acco__icon') 
			.find('i') 
			.removeClass('pe-7s-angle-up') 
			.addClass('pe-7s-angle-down'); 
		}; 
	}; 

	// =========Menu view change========= 
	var _menu = function(){ 
		// $('.header__menu-icon').on('click', function(){ 
		// 	$('.menu').removeClass('full').addClass('small'); 
		// 	$('.full-category').css({'width': '95%'});
		// 	$('.player__item').css({'width': '95%'});
		// }); 
		// $('.footer__icon').on('click', function(){ 
		// 	$('.menu').removeClass('small').addClass('full'); 
		// 	$('.full-category').css({'width': '75%'}); 
		// 	$('.player__item').css({'width': '75%'}); 
		// }); 
		$('.footer__icon').toggle( 
			function(e){ 
				$('.menu').removeClass('full').addClass('small'); 
				$('.full-category').css({'width': '95%'});
				$('.player__item').css({'width': '95%'});
			},
			function(e){
				$('.menu').removeClass('small').addClass('full'); 
				$('.full-category').css({'width': '75%'}); 
				$('.player__item').css({'width': '75%'}); 
			});
	}; 

	// ========Menu view change when window resizing occurs========= 
	var _windowSize = function(){ 
		if ($(window).width() < '1200'){ 
			$('.full-category').removeAttr('style');
			$('.player__item').removeAttr('style');
			$('.menu').removeClass('full').addClass('small'); 
		}else{
			$('.menu').removeClass('small').addClass('full'); 
		} 
	};

	// ========Аll video on the selected category======= 
	var _categories = function(){ 
		$('.inserted__icon').toggle( 
			function(e){ 
				$('.full-category').fadeIn(300) 
			}, 
			function(e){ 
				$('.full-category').fadeOut(300); 
			} 
		); 
	}; 

	// =============To the first page============= 
	var _allData = function(){ 
		$('.footer__button').on('click', function(){ 
			var contentAccor = $('.inserted__list'); 
			$(this).closest('.footer').prev('.menu__page').find(contentAccor).stop(true,true).slideUp(200); 
			$('.acco__item-wrap').find('.acco__icon') 
			.find('i') 
			.removeClass('pe-7s-angle-up') 
			.addClass('pe-7s-angle-down'); 

			display = [false, false, false, false]; 

			$('.all-data').show(); 
		}); 
	}; 

	// ========Video change======= 
	var _changeVideo = function(){ 
		var category = $('.acco__item'), 
		titleContent = $('.video__title'), 
		videoContent = $('.video__content'), 
		system = ['ERP','EAM','AMM','BI']; 

		var change = function(e){ 
			var item = $(this).find('.inserted__text'), 
			itemSmall = $(this).find('.inserted__item'), 
			idSmall = $(this).find('.inserte__id'), 
			src; 

			var innerChange = function(i, src){ 
				var textList = $(item[i]).text();
				titleContent.html(textList); 
				$('video').attr('src', src); 
				videoContent.attr('src', src); 
				console.log(src); 
				console.log(count); 
			}; 

			for(var i=0; i<item.length; i++){ 
				src = 'content/video/' + system[count] + '/'+ system[count] + (i+1) +'.mp4'; 
				if(e.target === item[i]){ 
					innerChange(i, src); 
				}else if(e.target === itemSmall[i]){ 
					innerChange(i, src); 
				}else if(item[i] === idSmall[i]){ 
					innerChange(i, src); 
				} 
			} 
		}; 
		change(); 
		$('.inserted__list').on('click', change); 
	}; 

	return{ 
		init: init, 
		// changeVideo: changeVideo 
	}; 
})(); 
SecondPage.init();