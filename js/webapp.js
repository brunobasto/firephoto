(function (window, document, undefined) {
    var record = document.querySelector("#btn-camera");

    record.addEventListener('click', function(e) {
        var rec = new MozActivity({
            name: "record" // Possibly capture in future versions
        });

        rec.addEventListener('success', function(e) {
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(this.result.blob);
            var imagePresenter = document.querySelector("#image-presenter");
            imagePresenter.appendChild(img);
            imagePresenter.style.display = "block";
        });

        rec.addEventListener('error', function(e) {
            alert("No taken picture returned");
        });
    });
})(window, document);