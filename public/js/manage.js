'use strict';

var request = null;

setTimeout(function() {
    if(request === null){
        return;
    }
    u2f.register([request], [],
        function(data) {
            var form = document.getElementById('form');
            var reg = document.getElementById('tokenResponse');
            if(data.errorCode) {
                alert("U2F failed with error: " + data.errorCode);
                return;
            }
            reg.value=JSON.stringify(data);
            form.submit();
        });
}, 1000);