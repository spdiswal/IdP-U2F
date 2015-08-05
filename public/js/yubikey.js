"use strict";

u2f.sign([request], function (yubiKeyData)
{
    $("#touch").hide();

    if (yubiKeyData.errorCode)
        $("#failure").show();
    else
    {
        $.ajax({
            type:        "POST",
            url:         "/yubikey",
            data:        JSON.stringify(yubiKeyData),
            contentType: "application/json",
            success:     function ()
                         {
                             $("#success").show();
                             setTimeout(function () { window.location.href = "/"; }, 500)
                         },
            error:       function () { $("#failure").show(); }
        });
    }
});
