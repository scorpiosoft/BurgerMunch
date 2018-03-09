$(document).ready(function()
{
  $(".munch").on("click", function(event)
  {
    var id = $(this).data("id");

    var obj =
    {
      munched: true
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id,
    {
      type: "PUT",
      data: obj
    }).then(
      function()
      {
        console.log("burger", id, "munched");
        // reload the page to update the list
        location.reload();
      }
    );
  });

  $(".burger_add").on("submit", function(event)
  {
    // Make sure to preventDefault on a submit event.
    // event.preventDefault();

    var newburger =
    {
      name: $("#bn").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers",
    {
      type: "POST",
      data: newburger
    }).then(
      function()
      {
        console.log("created new burger");
        // reload the page to update the list
        location.reload();
      }
    );
  });
});
