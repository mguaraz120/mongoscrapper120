$(".save").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/saved/" + thisId
    }).then(function(data) {
        window.location = "/"
    })
});