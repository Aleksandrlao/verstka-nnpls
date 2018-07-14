jQuery(document).ready(function($) {

// fancybox
	$('.fancybox').fancybox();



// loop sertificat
  var sertLoop = '';
  for (var i = 1; i <= 12; i++) {
    sertLoop += '<div class="c_sertif-item"><a href="i/sert/sert'+i+'_1.jpg" data-fancybox="sert"><img src="i/sert/sert'+i+'_1.jpg" alt="sert"></a><a href="i/sert/sert'+i+'_2.jpg" data-fancybox="sert"><img src="i/sert/sert'+i+'_2.jpg" alt="sert"></a></div>';
  }
  $('.c_sertif-list').html(sertLoop);


  var rewLoop = '';
  for (var i = 1; i <= 10; i++) {
    rewLoop += '<a href="i/rewiews/'+i+'.jpg" class="c_client-item" data-fancybox="client"><img src="i/rewiews/'+i+'.jpg" alt="rewiews">';
  }
  $('.c_client-list').html(rewLoop);


// Slider
	$('.c_sertif-list').slick({
		slidesToShow: 10, slidesToScroll: 1, arrows: true, infinite: false, autoplay: true, autoplaySpeed: 8000,
    responsive: [
      { breakpoint: 1300, settings: { slidesToShow: 9 } },
      { breakpoint: 1150, settings: { slidesToShow: 8 } },
      { breakpoint: 1000, settings: { slidesToShow: 7 } },
      { breakpoint: 850, settings: { slidesToShow: 6 } },
      { breakpoint: 700, settings: { slidesToShow: 5 } },
      { breakpoint: 600, settings: { slidesToShow: 4 } },
      { breakpoint: 500, settings: { slidesToShow: 3 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } }
    ]
	});

// Action
  $('.c_client-list').slick({
    slidesToShow: 4, slidesToScroll: 1, arrows: true, infinite: false, focusOnSelect: true,
    responsive: [
      { breakpoint: 1150, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1 } }
    ]
  });



// scroll to
	$("body").on('click', '.goto', function(e){
		var scrollTo = $(this).data('scroll');
		$('html,body').stop().animate({ scrollTop: $('#'+scrollTo).offset().top }, 1000);
		e.preventDefault();
	});


//  
// Работа с попап
//  
  $('.overlay, .popup-close').on('click', function(){
    $('.popup').fadeOut(); 
    $('.overlay').fadeOut();
  });
  $('.action').on('click', function(){
    var event = $(this).data('event'),
    eventTitle = $(this).data('name');
    $('input[name="input_type"]').val(eventTitle);
    $('.overlay').fadeIn();
    $('.popup-' + event).centered_popup(); 
    $('.popup-' + event).fadeIn(); 
    return false;
  });
  
// Маска для телефона
  $("[type=tel]").mask("+7(999) 999-99-99");
    
// Обработка форм на AJAX
  $.validator.addMethod("minlenghtphone", function (value, element) {
      return value.replace(/\D+/g, '').length > 10;
  },
  "Введите полный номер.");
  
  $(".c_form").each(function(){
      $(this).validate({
          rules: {
              name: {
                required: true
              },
              tel: {
                required: true,
                minlenghtphone: true
              }
          },
          submitHandler: function(form, event){
              event = event || window.event;
              $('.overlay').fadeOut(300);
              $('.popup').fadeOut();

              $(form).ajaxSubmit({
                  error: function(){
                    // После ошибки
                  },
                  success: function(responseText, statusText, xhr){
                            // Цель на отправку формы
                            /****  Поменять номер счетчика ****/
                            //yaCounterxxxxxx.reachGoal('ORDER');
                        
                            // Очистка форм после отправки
                            $('.form-input').val('');
                        
                            // Появление "спасибо"                        
							$('.popup').fadeOut();							
							$('.popup-thy').centered_popup();
							$('.overlay').fadeIn();
							$('.popup-thy').fadeIn();
                        
                            // Через 5 сек скрываем "спасибо" 
							setTimeout(function(){
								$('.popup-thy').fadeOut(500);
								$('.overlay').fadeOut(500);
							}, 5 * 1000)
                  }
              });
              return false;
         }
      });
  });
  //
});



// Центрируем эелемент
$.fn.centered_popup = function(top) {
    this.css('position', 'absolute');
    this.css('left', ($(window).outerWidth() - this.outerWidth()) / 2 + $(window).scrollLeft() + 'px');
    if( top == 1 )
        this.css('top', $(window).scrollTop() + 'px');
    else
        this.css('top', ($(window).outerHeight() - this.outerHeight()) / 2 + $(window).scrollTop() + 'px');
}