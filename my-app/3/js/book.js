$(document).ready(function () {
  // 여러 개의 bookblock을 각각 초기화
  $(".bb-bookblock").each(function (idx, el) {
    var $bookBlock = $(el);
    $bookBlock.bookblock({
      speed: 800,
      shadowSides: 0.8,
      shadowFlip: 0.7,
    });

    var bbId = $bookBlock.attr("id").replace("bb-bookblock-", "");
    var $container = $bookBlock.closest(".bb-container");
    var $navPrev = $container.find(".bb-prev");
    var $navNext = $container.find(".bb-next");
    var $navFirst = $container.find(".bb-first");
    var $navLast = $container.find(".bb-last");
    var $slides = $bookBlock.children();

    $navNext.on("click touchstart", function () {
      $bookBlock.bookblock("next");
      return false;
    });
    $navPrev.on("click touchstart", function () {
      $bookBlock.bookblock("prev");
      return false;
    });
    $navFirst.on("click touchstart", function () {
      $bookBlock.bookblock("first");
      return false;
    });
    $navLast.on("click touchstart", function () {
      $bookBlock.bookblock("last");
      return false;
    });

    // add swipe events
    $slides.on({
      swipeleft: function (event) {
        $bookBlock.bookblock("next");
        return false;
      },
      swiperight: function (event) {
        $bookBlock.bookblock("prev");
        return false;
      },
    });
  });
});
