"use strict";

function register()
{
    $("#register").hide();
    $("#touch").show();

    u2f.register([request], [], function (yubiKeyData)
    {
        $("#touch").hide();

        if (yubiKeyData.errorCode)
            $("#failure").show();
        else
        {
            $.ajax({
                type:        "POST",
                url:         "/manage",
                data:        JSON.stringify(yubiKeyData),
                contentType: "application/json",
                success:     function () { $("#success").show(); },
                error:       function () { $("#failure").show(); }
            });
        }
    });
}

function unregister()
{
    $.ajax({
        type: "POST",
        url: "/manage/unregister",
        data: JSON.stringify({}),
        contentType: "application/json",
        success: function(){location.reload(true)},
        error: function(){location.reload(true) }
    })
}