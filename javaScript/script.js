//Mudar cor do menu
jQuery(function ($) {
  var $navbar = $("nav");
  $(window).scroll(function (event) {
    var $current = $(this).scrollTop();
    if ($current > 0) {
      $navbar.addClass("cor-menu");
    } else {
      $navbar.removeClass("cor-menu");
    }
  });
});

//Script base dos slides
$(".slides").slick({
  centerMode: true,
  centerPadding: "60px",
  slidesToShow: 3,
  prevArrow: $("#arrow-prev"),
  nextArrow: $("#arrow-next"),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
});

//Seletor do slide do meio
$(".slides").on(
  "beforeChange",
  function (event, { slideCount: count }, currentSlide, nextSlide) {
    let selectors = [nextSlide, nextSlide - count, nextSlide + count]
      .map((n) => `[data-slick-index="${n}"]`)
      .join(", ");
    $(".slick-now").removeClass("slick-now");
    $(selectors).addClass("slick-now");
  }
);

$('[data-slick-index="0"]').addClass("slick-now");

//Seletor dos slides anteriores
$(".slides")
  .on("afterChange init", function (event, slick, direction) {
    // console.log('afterChange/init', event, slick, slick.$slides);
    // remove all prev/next
    slick.$slides.removeClass("prevSlide").removeClass("nextSlide");

    // find current slide
    for (var i = 0; i < slick.$slides.length; i++) {
      var $slide = $(slick.$slides[i]);
      if ($slide.hasClass("slick-current")) {
        // update DOM siblings
        $slide.prev().addClass("prevSlide");
        $slide.next().addClass("nextSlide");
        break;
      }
    }
  })
  .on("beforeChange", function (event, slick) {
    // optional, but cleaner maybe
    // remove all prev/next
    slick.$slides.removeClass("prevSlide").removeClass("nextSlide");
  });
