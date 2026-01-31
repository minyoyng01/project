$(document).ready(function () {
  // Add item
  $("#add-btn").click(function () {
    var toAdd = $("#todo-input").val();
    if (toAdd.trim() !== "") {
      $("#todo-list").append(
        "<li>" +
          $("<div>").text(toAdd).html() +
          ' <button class="del-btn">삭제</button></li>'
      );
      $("#todo-input").val("").focus();
    }
  });

  // Enter key adds item
  $("#todo-input").keyup(function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      $("#add-btn").click();
    }
  });

  // Delete item
  $(document).on("click", ".del-btn", function (e) {
    e.stopPropagation();
    $(this).parent().remove();
  });

  // Optional: clear input on focus
  $("#todo-input").focus(function () {
    $(this).val("");
  });

  // Add initial items (as in the image)
  var initial = ["영화보기", "독서하기", "장보기", "청소하기", "요리하기"];
  for (var i = 0; i < initial.length; i++) {
    $("#todo-list").append(
      "<li>" + initial[i] + ' <button class="del-btn">삭제</button></li>'
    );
  }
});
