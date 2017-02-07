var FirstPage = (function(){ 
	var count; 

	var init = function(){ 
		_setUpListners(); 
		_selectCategory(); 
		_changeContent();
	}; 

	var _setUpListners = function(){ 
		$('.category__full-content').toggle( 
		function(e){ 
			$('.category_big').animate({width: "79%"}, 500); 
			$('.category_small').hide(500); 
			$('.category_mid.categore_even-column').hide(500); 
			}, 
		function(e){ 
			$('.category_small').show(500); 
			$('.category_mid.categore_even-column').show(500); 
			$('.category_big').css({'width':'44%'}); 
			} 
		); 
	}; 

	// =======Смена списков Видеозаписи и Материалы при выборе категории======= 
	var _selectCategory = function(){ 
		var categoryList = $('#category').find('.category__list'), 
		categoryItem = $('#category').find('.category__list').find('.category__item').find('.category__text'), 
		videoList = $('#video').find('.category__list'), 
		docList = $('#document').find('.category__list'), 
		wrap = $('#category').find('.category__list').find('.category__item-wrap'), 
		downloadList = $('.download'); 

		$(downloadList[0]).addClass('active'); 

		$(categoryItem[0]).addClass('active'); 

		wrap.on('click', function(e){ 
			$(docList).removeClass('active'); 
			$(videoList).removeClass('active'); 
			$(categoryItem).removeClass('active'); 
		}); 

		categoryList.on('click', function(e){ 
			for(var i=0; i<categoryItem.length; i++){ 
				if(e.target === categoryItem[i]){ 
					count = i; 
					$(categoryItem[count]).addClass('active'); 
					$(videoList[count]).addClass('active'); 
					$(docList[count]).addClass('active'); 
				} 
			} 

			$(downloadList).removeClass('active'); 
			for(var i=0; i<downloadList.length; i++){ 
				if(count === undefined){ 
					count = 0; 
				}else if(count === i){ 
					$(downloadList[count]).addClass('active'); 
				} 
			} 
		}); 
	}; 

	var _changeContent = function(){ 
		var videoList = $('#video').find('.category__list'), 
		docList = $('#document').find('.category__list'), 
		system = ['ERP','EAM','AMM','BI']; 

		var _changeDocument = function(i){ 

		var src = 'content/' + system[count] + '/'+ system[count] + (i+1) +'.pdf'; 

		$('.content__wrap').hide(); 
		$('.iframe').remove(); 
		$('.iframe-wrap').append('<embed src="' + src + 
		'" internalinstanceid="11" class="iframe">'); 
		$('.iframe-wrap').show(); 
	}; 

	var _changeVideo = function(i){ 

		var src = 'images/content/' + system[count] + '/'+ system[count] + (i+1) +'.jpg'; 
		var container = $('.contant__container'), 
		contentVideo = $(container[count]).find('.content__text-wrap'), 
		content = $('.content__text-wrap'); 

		$('.content__image').attr('src', src) 
		.attr('alt', system[count] + i); 
		$('.iframe').hide(); 
		$('.content__wrap').show(); 

		content.removeClass('active'); 
		$(contentVideo[i]).addClass('active'); 
	}; 

	var _watchVideo = function(i, textList){ 
		var videoContent = $('.video__content'), 
		title = $('.video__title'); 
		if(count === undefined){ 
			count = 0; 
		} 
		$('.all-data').hide(); 
		src = 'content/video/' + system[count] + '/'+ system[count] + (i+1) +'.mp4'; 
		$('video').attr('src', src); 
		videoContent.attr('src', src); 
		title.html(textList); 
	}; 

	var _changeTitle = function(e){ 
		var title = $(this).find('.category__item').find('.category__text'), 
		item = $(this).find('.category__item'); 
		titleContent = $('.category_big').find('.category__title'); 
		buttonOpen = $('#document').find(this).find('.category__button'), 
		buttonWatch = $('#video').find(this).find('.category__button'); 

		var _innerChangeContent = function(i, that){ 
			titleContent.html(textList); 
			item.removeClass('active'); 
			$(item[i]).addClass('active'); 
			if(count === undefined){ 
				count = 0; 
			} 
			if(that === docList[count]){ 
				_changeDocument(i); 
			} 
			if(that === videoList[count]){
				_changeVideo(i); 
			} 
		}; 

		for(var i=0; i<item.length; i++){ 
			var that = this; 

			if(e.target === title[i]){ 
				var textList = $(title[i]).text(); 
				_innerChangeContent(i, that); 
			}else if(e.target === buttonOpen[i]){ 
				var textList = $(e.target).parent('.category__button-wrap') 
				.prev(title).text(); 
				_innerChangeContent(i, that); 
			}else if(e.target === item[i]){ 
				var textList = $(item[i]).find(title).text(); 
				_innerChangeContent(i, that); 
			}else if(e.target === buttonWatch[i]){ 
				var textList = $(e.target).parent('.category__button-wrap') 
				.prev(title).text(); 
				_watchVideo(i, textList); 
			} 
		} 
	}; 

		videoList.on('click', _changeTitle); 
		docList.on('click', _changeTitle); 
		buttonWatch.on('click', _changeTitle); 
	}; 

	return{ 
		init: init 
	}; 
})(); 

FirstPage.init();