var scrollLock = false;
var dialDataHeight = 0;
$('#invitation').carousel({
  interval  : false,
  keyboard  : false,
  ride      : false,
  wrap      : false
})

$('.what-tabs .question .nav-link').on('click', () => $('.what-tabs .question').css({'margin-left': '10%'}));
$('.rsvp-tabs .question .nav-link').on('click', () => $('.rsvp-tabs .question').css({'margin-left': '18%'}));

$(document).ready( function() {
  var bodyElement = document.getElementsByTagName('body')[0];
  if (bodyElement.addEventListener){
    // IE9, Chrome, Safari, Opera
    bodyElement.addEventListener("mousewheel", MouseWheelHandler, false);
    // Firefox
    bodyElement.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
  }
  else{
    // IE 6/7/8
    bodyElement.attachEvent("onmousewheel", MouseWheelHandler);
  }

  function MouseWheelHandler(e){
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    changePage(delta);
    return false;
  }

  $('.timespan').on('mouseover', function () {
    var startTime = Number($(this).attr('start-at'));
    $(this).addClass('active');
    timeSpanMouseOver(startTime);
  });

  $('.timespan').on('mouseout', function () {
    var startTime = Number($(this).attr('start-at'));
    if ($(this).attr('page-active')) {
    }else{
      $(this).removeClass('active');
      timeSpanMouseOut(startTime);
    }
    startTime = Number($('.timespan[page-active=true]').attr('start-at'));
    timeSpanMouseOver(startTime);
  });

  $('[time=10] , [time=11]').on('mouseover', () => {
    $('.cls-3').trigger('mouseover');
  });
  $('[time=12] , [time=1]').on('mouseover', () => {
    $('.cls-8').trigger('mouseover');
  });
  $('[time=2] , [time=3]').on('mouseover', () => {
    $('.cls-7').trigger('mouseover');
  });
  $('[time=4]').on('mouseover', () => {
    $('.cls-6').trigger('mouseover');
  });
  $('[time=5]').on('mouseover', () => {
    $('.cls-5').trigger('mouseover');
  });
  $('[time=6], [time=7]').on('mouseover', () => {
    $('.cls-4').trigger('mouseover');
  });
  $('.cls-9').on('mouseout', () => {
    $('.timespan').trigger('mouseout');
  });

});

function timeSpanMouseOut(startTime) {
  switch (startTime) {
    case 10 :
    $('[time=11]').removeClass('active');
    $('[time=12]').removeClass('active');
    $('[time=10]').removeClass('active');
    break;

    case 12 :
    $('[time=12]').removeClass('active');
    $('[time=1]').removeClass('active');
    $('[time=2]').removeClass('active');
    break;

    case 2  :
    $('[time=2]').removeClass('active');
    $('[time=3]').removeClass('active');
    $('[time=4]').removeClass('active');
    break;

    case 4  :
    $('[time=4]').removeClass('active');
    $('[time=5]').removeClass('active');
    break;

    case 5  :
    $('[time=5]').removeClass('active');
    $('[time=6]').removeClass('active');
    break;

    case 6  :
    $('[time=6]').removeClass('active');
    $('[time=7]').removeClass('active');
    break;

    case 7  :
    // $('[time=10]').removeClass('active');
    break;
    default:
  }
  $('.timed-info[start-at='+startTime+']').removeClass('active');
  $('.timed-info[page-active=true]').addClass('active');
}

function timeSpanMouseOver(startTime) {
  switch (startTime) {
    case 10 :
      $('[time=11]').addClass('active');
      $('[time=12]').addClass('active');
      $('[time=10]').addClass('active');
      $('.timed-info.active').removeClass('active');
    break;

    case 12 :
      $('[time=12]').addClass('active');
      $('[time=1]').addClass('active');
      $('[time=2]').addClass('active');
      $('.timed-info.active').removeClass('active');
    break;

    case 2  :
      $('[time=2]').addClass('active');
      $('[time=3]').addClass('active');
      $('[time=4]').addClass('active');
      $('.timed-info.active').removeClass('active');
    break;

    case 4  :
      $('[time=4]').addClass('active');
      $('[time=5]').addClass('active');
      $('.timed-info.active').removeClass('active');
    break;

    case 5  :
      $('[time=5]').addClass('active');
      $('[time=6]').addClass('active');
      $('.timed-info.active').removeClass('active');
    break;

    case 6  :
      $('[time=6]').addClass('active');
      $('[time=7]').addClass('active');
      $('.timed-info.active').removeClass('active');
    break;

    case 7  :
      // $('[time=10]').addClass('active');
    break;

    default:
  }
  $('.timed-info[start-at='+startTime+']').addClass('active');

}

$('.list-view').on('click', function() {
  $('.circular-view').parent().css({opacity:0.5});
  $('.list-view').parent().css({opacity:1});
  $('.agenda-pie').addClass('d-none');
  $('.agenda-list').removeClass('d-none');
});

$('.circular-view').on('click', function() {
  $('#notes').css({display:'none'});
  $('.circular-view').parent().css({opacity:1});
  $('.list-view').parent().css({opacity:0.5});
  $('.agenda-pie').removeClass('d-none');
  $('.agenda-list').addClass('d-none');
  dialDataHeight = ($('#svg-parent').width() * 65) / 100;
  $('.agenda-pie .dial-data').css({'height': dialDataHeight, 'width': dialDataHeight});
});

$('.agenda-timeline li').on('click', function() {
  startTime = Number($(this).attr('start-at'));
  $('.agenda-timeline li.active').removeClass('active');
  $('.open-timeline-data p.active').removeClass('active');
  $('.agenda-timeline li[start-at='+startTime+']').addClass('active');
  $('.open-timeline-data p[start-at='+startTime+']').addClass('active');
  $('.timespan[start-at='+startTime+']').trigger('click');
});

$('.timespan').on('click', function () {
  startTime = Number($(this).attr('start-at'));
  $('#notes').removeClass('fadeIn').addClass('fadeOut');
  $('text.active').removeClass('active');
  $('.timespan.active').removeClass('active');
  $('.dial-info p.active').removeClass('active');
  $('.timespan[page-active=true]').removeAttr('page-active');
  $(this).addClass('active');
  $(this).attr('page-active', 'true');
  var timelineTime = Number($('.agenda-timeline li.active').attr('start-at'));
  if (startTime != timelineTime) {
    $('.agenda-timeline li[start-at='+startTime+']').trigger('click');
  }
  timeSpanMouseOver(startTime);
  changeAgendaSelection(startTime);
});

function changeAgendaSelection(startTime) {
  $('.theme .slideInDown').removeClass('slideInDown').addClass('slideOutUp');
  $('.theme .slideInUp').removeClass('slideInUp').addClass('slideOutDown');
  $('.dial-info p[start-at='+startTime+']').addClass('active');
  setTimeout(function () {
    switch (startTime) {
      case 10:
        if (false) {
          break;
        }else {
          $('.top-left > img').attr('src','assets/images/agenda/plant-min.png')
                              .attr('class','plant');
          $('.top-right > img').attr('src','assets/images/agenda/tablet-min.png')
                               .attr('class','agenda-tab');
          $('.bottom-left > img').attr('src','assets/images/agenda/tacks-and-pencil-min.png')
                               .attr('class','tacks');
          $('.bottom-right > img').attr('src','assets/images/agenda/planton-min.png')
                               .attr('class','planton');
        }
        break;
      case 12:
        $('.top-left > img').attr('src','assets/images/ideat-and-design/plant-min.png')
                            .attr('class','idea-plant');
        $('.top-right > img').attr('src','assets/images/ideat-and-design/drawing-min.png')
                             .attr('class','drawing');
        $('.bottom-left > img').attr('src','')
                             .attr('class','');
        $('.bottom-right > img').attr('src','assets/images/ideat-and-design/tablet-min.png')
                             .attr('class','idea-tab');
        break;
      case 2:
        $('.top-left > img').attr('src','assets/images/lunch/tomato-min.png')
                            .attr('class','tomato');
        $('.top-right > img').attr('src','assets/images/lunch/pizza-min.png')
                             .attr('class','pizza');
        $('.bottom-left > img').attr('src','assets/images/lunch/pepper-min.png')
                             .attr('class','pepper');
        $('.bottom-right > img').attr('src','')
                             .attr('class','');
        break;
      case 4:
        $('.top-left > img').attr('src','assets/images/design/sketches-min.png')
                            .attr('class','sketches');
        $('.top-right > img').attr('src','assets/images/design/plant-min.png')
                             .attr('class','design-plant');
        $('.bottom-left > img').attr('src','')
                             .attr('class','');
        $('.bottom-right > img').attr('src','assets/images/design/keyboard-and-mouse-min.png')
                             .attr('class','keyboard');
        break;
      case 5:
        $('.top-left > img').attr('src','assets/images/presentation/ipad-min.png')
                            .attr('class','ipad');
        $('.top-right > img').attr('src','assets/images/presentation/usb-drive-min.png')
                             .attr('class','usb-drive');
        $('.bottom-left > img').attr('src','')
                             .attr('class','');
        $('.bottom-right > img').attr('src','assets/images/presentation/plant-min.png')
                             .attr('class','presentation-plant');
        break;
      case 6:
        $('.top-left > img').attr('src','assets/images/dinner/eye-glasses-min.png')
                            .attr('class','eye-glasses');
        $('.top-right > img').attr('src','')
                             .attr('class','');
        $('.bottom-left > img').attr('src','assets/images/dinner/herb-min.png')
                             .attr('class','dinner-herb');
        $('.bottom-right > img').attr('src','assets/images/dinner/cutlery-and-tomatto-min.png')
                             .attr('class','cutlery');
        break;
      default:

    }
  }, 800);

  setTimeout(function() {
    $('.theme .slideOutUp').removeClass('slideOutUp').addClass('slideInDown');
    $('.theme .slideOutDown').removeClass('slideOutDown').addClass('slideInUp');
  }, 850)
}

function changePage(delta) {
  if (!scrollLock) {
    scrollLock = !scrollLock;
    if(delta < 0){
      $('#invitation').carousel('next');
    }else if (delta > 0) {
      $('#invitation').carousel('prev');
    }
    setTimeout(function () {
      scrollLock = !scrollLock;
    }, 550);
  }
}
// slide Move Completed
$('#invitation').on('slid.bs.carousel	', function (event) {
  // clear open tabs, we left them
  if (event.from == 0) {
    $('.what-tabs .question').removeAttr('style');
    $('.what-tabs .question .active').removeClass('active show');
    $('.what-tabs .answer .active').removeClass('active show');
  }

  if (event.from == 1) {
    // Clear Pie Selection
    $('text.active').removeClass('active');
    $('.timed-info.active').removeClass('active');
    $('.timespan.active').removeClass('active');
    $('.timespan[page-active=true]').removeAttr('page-active');
    $('.timed-info[start-at=0]').addClass('active').attr('page-active','true');
    $('.dial-info p.active').removeClass('active');
    $('#notes').removeClass('fadeOut').addClass('fadeIn');
    $('#notes').removeAttr('style');
    // CLear List Selection
    $('.agenda-timeline li.active').removeClass('active');
    $('.agenda-timeline li[start-at=10]').addClass('active');
  }

  if (event.from == 2) {
    $('.rsvp-tabs .question').removeAttr('style');
    $('.rsvp-tabs .question .active').removeClass('active show');
    $('.rsvp-tabs .answer .active').removeClass('active show');
  }

  // New Page? Change Images and Animate new Toys
  setTimeout(function () {
    if (event.to === 0) {
      $('.top-left > img').attr('src','assets/images/event-and-organisers/tree-min.png')
                          .attr('class','tree');
      $('.top-right > img').attr('src','assets/images/event-and-organisers/mac-book-min.png')
                           .attr('class','mac-book');
      $('.bottom-left > img').attr('src','assets/images/event-and-organisers/plane-min.png')
                           .attr('class','plane');
      $('.bottom-right > img').attr('src','assets/images/event-and-organisers/coffee-cup-min.png')
                           .attr('class','coffee');
    }else if(event.to === 1) {
      $('.top-left > img').attr('src','assets/images/agenda/plant-min.png')
                          .attr('class','plant');
      $('.top-right > img').attr('src','assets/images/agenda/tablet-min.png')
                           .attr('class','agenda-tab');
      $('.bottom-left > img').attr('src','assets/images/agenda/tacks-and-pencil-min.png')
                           .attr('class','tacks');
      $('.bottom-right > img').attr('src','assets/images/agenda/planton-min.png')
                           .attr('class','planton');
      // Animate Dial
      setTimeout(function () {
        $('#Numbers text').each(function functionName(){
          $(this).animate({opacity: 0.1}, 900, function() {
            $(this).removeAttr("style")
          }).removeClass('animated fadeIn');
        });
        $('.cls-2 path').each(function functionName(){
          $(this).animate({opacity: 0.3}, 900, function() {
            $(this).removeAttr("style")
          }).removeClass('animated fadeIn');
        });
      }, 1500);

      // Animate Slide changes fast on second load
      setTimeout(function () {
        $('#notes').addClass('anim-fast');
        $('.agenda .title').addClass('anim-fast');
        $('.view-changers img').addClass('anim-fast');
        $('.dial-data').addClass('anim-fast');
      }, 2000);

      // Fix Content Data BOX
      var dialDataHeight = ($('#svg-parent').width() * 65) / 100;
      $('.agenda-pie .dial-data').css({'height': dialDataHeight, 'width': dialDataHeight});

    }else if(event.to === 2) {
      $('.top-left > img').attr('src','')
                          .attr('class','d-none');
      $('.top-right > img').attr('src','assets/images/rsvp/plant-min.png')
                           .attr('class','rsvp-plant');
      $('.bottom-left > img').attr('src','assets/images/rsvp/envelop-min.png')
                           .attr('class','envelop');
      $('.bottom-right > img').attr('src','')
                           .attr('class','d-none');
    }
    $('.theme .slideOutUp').removeClass('slideOutUp').addClass('slideInDown');
    $('.theme .slideOutDown').removeClass('slideOutDown').addClass('slideInUp');
  }, 100);


});

// Slide is going to move
$('#invitation').on('slide.bs.carousel', function (event) {

  // reflect in Navbar
  $('.nav-item.active').removeClass('active');
  $('.nav-item')[event.to].classList.add('active');

  // Remove Toys from desk
  $('.theme .slideInDown').removeClass('slideInDown').addClass('slideOutUp');
  $('.theme .slideInUp').removeClass('slideInUp').addClass('slideOutDown');
  // Add New Toys
});

var guestDataTemplate = '<div class="row">'+
                          '<div class="col-12">'+
                              '<h5>GUEST INFO</h5>'+
                          '</div>'+
                          '<div class="col-6">'+
                            '<input type="text" name="guest1-fname" value="" placeholder="First Name" autocomplete="name">'+
                          '</div>'+
                          '<div class="col-6">'+
                            '<input type="text" name="guest1-lname" value="" placeholder="Last Name" autocomplete="">'+
                          '</div>'+
                          '<div class="col-6">'+
                            '<input type="text" name="guest2-fname" value="" placeholder="First Name" autocomplete="name">'+
                          '</div>'+
                          '<div class="col-6">'+
                            '<input type="text" name="guest2-lname" value="" placeholder="Last Name" autocomplete="">'+
                          '</div>'+
                        '</div>';

var acceptRsvpMessage = '<p>Thank you for registering RSVP, we have sent a confirmation and an agenda to the email you provided. We look forward to seeing you on the day.</p>';

$('#add-guest').on('click', ()=> {
  $('#guest-data').html(guestDataTemplate);
  // $('.rsvp-tabs').addClass('mt-0');
  $('.add-guest').addClass('d-none');
});

$('#rsvp-accept-btn').on('click', ()=> {
  // send rsvp then do flash
  $('#rsvp-accept').html(acceptRsvpMessage);
  $('.rsvp-tabs').removeClass('mt-0');
});

$(document).ready(function() {
  if (sessionStorage.getItem('rsvpRedirect') === String('true')) {
    $('#invitation').carousel(2);
    sessionStorage.setItem('rsvpRedirect','');
    setTimeout(function () {
      $('#rsvp-accept-tab').trigger('click');
    }, 500);
  }
});
