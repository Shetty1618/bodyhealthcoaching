jQuery.noConflict();
jQuery(document).ready(function($){

	"use strict";

	Pace.on("done", function(){
		$("#loader-wrapper").fadeOut(500);
		$(".pace").remove();
	});

	//Sticky Header...
	$("#header-wrapper").sticky({ topSpacing: 0 });

	//One Pag Nav...
	if($('.dt-onepage-menu #main-menu').length) {
		$('.dt-onepage-menu #main-menu').onePageNav({
			currentClass : 'current_page_item',
			filter		 : ':not(.external)',
			scrollSpeed  : 750,
			scrollOffset : 89
		});
		$('.dt-onepage-menu #main-menu').meanmenu({
			meanMenuContainer :  $('#menu-container'),
			meanRevealPosition:  'right',
			meanScreenWidth   :  767
		});
	}

	//NICE SCROLL...
	$("html").niceScroll({ zindex: 999999, cursorborder: "1px solid #424242" });
	
	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ? true : false;
	var $px, currentWidth;

	 if($(".dt-sc-tooltip-top-carousel").length){
		 $(".dt-sc-tooltip-top-carousel").each(function(){ $(this).tipTip({maxWidth: "250px",defaultPosition: "top"}); });
	 }
	
	//Sticky Navigation
	if( navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) || 
		navigator.userAgent.match(/Android/i)||
		navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || 
		navigator.userAgent.match(/iPod/i)) {
			if( mytheme_urls.stickynav === "enable") {
				$("#header").sticky({ topSpacing: 0 });
			}
	} else {
		if( mytheme_urls.stickynav === "enable") {
			$("#header").sticky({ topSpacing: 0 });
		}
	}//Sticky Navigation End
	
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
		if (scroll >= 90) {
			$("#header-sticky-wrapper").addClass("ha-header-color");
		} else {
			$("#header-sticky-wrapper").removeClass("ha-header-color");
		}
	});
	
	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		var $menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
	});

	$(".dt-menu-expand").click(function(){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(300);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(300);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
			}
		}
		
		$(this).toggleClass("dt-mean-clicked");
		return false;
	});
	//Mobile Menu End
//Menu End

	//Parallax Sections...
	$('.dt-sc-paralax').bind('inview', function (event, visible) {
		if(visible === true) {
			$(this).parallax("50%", 0.5);
		} else {
			$(this).css('background-position', '');
		}
	});

	//Selection Box...
	$("select").each(function(){
		if($(this).css('display') != 'none') {
			$(this).wrap( '<div class="selection-box"></div>' );
		}
	});
	
	/* To Top */
	$().UItoTop({ easingType: 'linear' });
	
	// Tabs Shortcodes
	if($('ul.dt-sc-tabs').length > 0) {
	  $('ul.dt-sc-tabs').tabs('> .dt-sc-tabs-content', {
		  effect: 'fade'
	  });
	}
	
	if($('ul.dt-sc-tabs-frame').length > 0){
	  $('ul.dt-sc-tabs-frame').tabs('> .dt-sc-tabs-frame-content', {
		  effect: 'fade'
	  });
	}
	
	if($('.dt-sc-tabs-vertical-frame').length > 0){
	  
	  $('.dt-sc-tabs-vertical-frame').tabs('> .dt-sc-tabs-vertical-frame-content', {
		  effect: 'fade'
	  });
	  
	  $('.dt-sc-tabs-vertical-frame').each(function(){
		$(this).find("li:first").addClass('first').addClass('current');
		$(this).find("li:last").addClass('last');
	  });
	  
	  $('.dt-sc-tabs-vertical-frame li').click(function(){
		$(this).parent().children().removeClass('current');
		$(this).addClass('current');
	  });
	  
	}/*Tabs Shortcode Ends*/

	$(window).load(function() {
		$('a[href*="#"]').on('click', function(e) {
			e.preventDefault()
	
			$('html, body').animate(
			{
			scrollTop: $($(this).attr('href')).offset().top,
			},
			500,
			'linear'
			)
		});		
	});

	if($(".dt-sc-testimonial-carousel").length) {
		$('.dt-sc-testimonial-carousel').carouFredSel({
		  responsive: true,
		  auto: false,
		  width: '100%',
		  height: 'variable',
		  prev: '.testimonial-prev',
		  next: '.testimonial-next',
		  pagination: '.testimonial-pagination',
		  scroll: 1,				
		  items: {
			width:1170,
			height: 'variable',
			visible: {
			  min: 1,
			  max: 3
			}
		  }				
		});			
	}
		  
	if($(".dt_carousel").length) {
		$('.dt_carousel').carouFredSel({
		  responsive: true,
		  auto: false,
		  width: '100%',
		  height: 'variable',
		  prev: '.prev-arrow',
		  next: '.next-arrow',
		  scroll: 1,				
		  items: {
			width: $(this).find('.column').width(),
			height: 'variable',
			visible: {
			  min: 1,
			  max: 3
			}
		  }				
		});
	}

	//BMI Form Validation...
	$('form[name="frmbmi"]').validate({
		rules: { 
			txtfeet: { required: true },
			txtinches: { required: true },
			txtlbs: { required: true }
		},
		errorPlacement: function(error, element) { }
	});

	//BMI Calculation...
	$('form[name="frmbmi"]').submit(function(){
		var This = $(this);
		if($(This).valid()) {
			var fet = $('input[name="txtfeet"]').val();
			var inc = $('input[name="txtinches"]').val();
			var tinc = ( parseInt(fet) * 12 ) + parseInt(inc);
			
			var lbs = $('input[name="txtlbs"]').val();
			
			var bmi = ( parseFloat(lbs) / (tinc * tinc) ) * 703;
			
			$('input[name="txtbmi"]').val(parseFloat(bmi).toFixed(1));
		}
		return false;
	});
	
	//BMI View...
	if($("a.fancyInline").length) {
		$("a.fancyInline").fancybox({
			scrolling: 'no',
			width: 'auto',
			height: 'auto'
		});
	}

});

// animate css + jquery inview configuration
(function ($) {
	"use strict";
	
	$(".animate").each(function () {
		$(this).bind('inview', function (event, visible) {
			var $delay = "";
			var $this = $(this),
				$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
			$delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;

			if (visible === true) {
				   setTimeout(function () { $this.addClass($animation); }, $delay);
		   } else {
				   setTimeout(function() { $this.removeClass('animate'); } );
		   }
		});
	});
})(jQuery);

//MeanMenu Custom Scroll...
function funtoScroll(x, e) {
	"use strict";
	var str = new String(e.target);
	var pos = str.indexOf('#');
	var t = str.substr(pos);
	
	var eleclass = jQuery(e.target).prop("class");
	
	if(eleclass == "external") {
		window.location.href = e.target;	
	} else {
		jQuery.scrollTo(t, 750, { offset: { top: -53 }});
	}
	
	jQuery(x).parent('.mean-bar').next('.mean-push').remove();		
	jQuery(x).parent('.mean-bar').remove();

	jQuery('.dt-onepage-menu #main-menu').meanmenu({
		meanMenuContainer :  jQuery('#menu-container'),
		meanRevealPosition:  'right',
		meanScreenWidth   :  767	
	});
	
	e.preventDefault();
}(jQuery);