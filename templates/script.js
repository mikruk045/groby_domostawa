$(document).on("scroll", function () {
  const scrollValues = $(this).scrollTop();

  if (scrollValues > 100) {
    $(".btn1").addClass("active");
  }
  if (scrollValues < 100) {
    $(".btn1").removeClass("active");
  }
});

//powrot do poczatku

$(function () {
  $(".btn1").click(function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
  });
});
