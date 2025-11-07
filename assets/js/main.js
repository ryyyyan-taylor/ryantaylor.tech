// Simplified main JavaScript - only essential features
$(document).ready(function() {

  // Smooth scrolling for navigation links
  $('[data-animate="scrolling"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this).data('target') || $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);
  });

  // Back to top button
  var backTop = $('.btn-back_to_top');

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    } else {
      backTop.css('visibility', 'hidden');
    }
  });

  backTop.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });

  // Sticky navigation
  var navbar = $('.navbar.sticky');
  if (navbar.length) {
    var navbarOffset = navbar.data('offset') || 500;

    $(window).on('scroll', function() {
      var scrollTop = $(window).scrollTop();

      if (scrollTop > navbarOffset) {
        navbar.addClass('floating').css('position', 'fixed');
      } else {
        navbar.removeClass('floating').css('position', 'absolute');
      }

      // Update active nav item based on scroll position
      updateActiveNavItem();
    });
  }

  // Update active navigation item based on scroll position
  function updateActiveNavItem() {
    var scrollPos = $(window).scrollTop() + 100;

    $('.navbar-nav .nav-link').each(function() {
      var target = $(this).attr('href');
      if ($(target).length) {
        var targetTop = $(target).offset().top;
        var targetBottom = targetTop + $(target).outerHeight();

        if (scrollPos >= targetTop && scrollPos < targetBottom) {
          $('.navbar-nav .nav-item').removeClass('active');
          $(this).parent().addClass('active');
        }
      }
    });
  }

  // Bootstrap tooltip initialization
  $('[data-toggle="tooltip"]').tooltip();

  // Navbar collapse on mobile after click
  $('.navbar-nav .nav-link').on('click', function() {
    if ($(window).width() < 992) {
      $('.navbar-collapse').collapse('hide');
    }
  });

  // Simple fade-in animation on scroll
  $(window).on('scroll load', function() {
    $('.wow').each(function() {
      var elementTop = $(this).offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();

      if (viewportBottom > elementTop + 100) {
        $(this).addClass('animated');
      }
    });
  });

  // Trigger animations on page load
  $(window).trigger('scroll');
});
