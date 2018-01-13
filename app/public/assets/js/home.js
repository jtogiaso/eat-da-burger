

$(document).ready(() => {
    $("#burger-maker").on("click", () => {
        let burger_name = $("#new-burger-name").val().trim();
        $("#new-burger-name").val('');
        if (burger_name !== '') {
            $.ajax("/burger", {
                type: "POST",
                data: { burger_name: burger_name }
            }).then(function(results) {
            	location.reload();
            });
        }
    });

    $(".devour").on("click", (e) => {
        let id = $(e.target).attr('burger-id');
        $.ajax("/eat", {
            type: "POST",
            data: { id: id }
        }).then(function(results) {
            location.reload();
        });
    });
});