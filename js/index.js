document.addEventListener( "DOMContentLoaded", function() {
    function enterFullscreen() {

        var element = document.body;

        // Check which implementation is available
        var requestMethod = element.requestFullScreen ||
            element.webkitRequestFullscreen ||
            element.webkitRequestFullScreen ||
            element.mozRequestFullScreen ||
            element.msRequestFullScreen;

        if (requestMethod) {
            requestMethod.apply(element);
        }

    }

    function toggleQr() {
        var container = byId("qr-container");
        if (container.style.display != "block") {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
        event.preventDefault();
    }
    var byId = function(id) {
        return document.getElementById(id);
    };

    new QRCode(byId("qrcode"), 'http://{$ip}:{$port}');

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 70) {
            enterFullscreen();
            event.preventDefault();
        } else if (event.keyCode === 81) {
            toggleQr();
        }
    }, false);

    window.Impress = impress();
    Impress.init();

    var socket = io.connect('http://{$ip}:{$port}');
    socket.on('control', function(data) {
        console.log(data);
        if (data === 'left') {
            impress().prev();
        } else if (data === 'right') {
            impress().next();
        } else if (data === 'home') {
            impress().goto('overview');
        }
    });

}, false);