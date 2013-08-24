(function (window, document, undefined) {

    function Firephoto() {}

    Firephoto.prototype = {
        MIME_TYPES: [ 'image/png', 'image/jpg', 'image/jpeg' ],
        TRACKING_BODY_PART: 'human',
        TRACKING_TYPE: 'frontal_face',

        // Lifecycle -----------------------------------------------------------
        initializer: function() {
            var instance = this;

            return instance;
        },

        bindUI: function() {
        },

        renderUI: function() {
        },

        syncUI: function() {
        },

        // Methods -------------------------------------------------------------
        pickPhoto: function(opt_callback, opt_err_callback) {
            var instance = this,
                activity;

            activity = new MozActivity({
                name: 'pick',
                data: {
                    type: instance.MIME_TYPES
                }
            });

            activity.onerror = opt_err_callback;
            activity.onsuccess = opt_callback;
        },

        createImageFromBlob: function(blob, opt_callback) {
            var instance = this,
                image = new Image();

            image.addEventListener('load', function() {
                opt_callback && opt_callback.call(instance, image);
            }, false);

            image.src = window.URL.createObjectURL(blob);
        },

        findImageFaces: function(image, opt_callback, opt_width, opt_height) {
            var instance = this,
                canvas;

            canvas = instance.getImageCanvas(image, opt_width, opt_height);

            instance.trackHuman_({
                canvas: canvas,
                data: instance.TRACKING_TYPE,
                onFound: opt_callback,
                type: instance.TRACKING_BODY_PART
            });
        },

        getImageCanvas: function(image, opt_width, opt_height) {
            var canvas;

            canvas = new tracking.Canvas({
                height: opt_height || 512,
                width: opt_width || 512,
                visible: false
            });

            canvas.render();
            canvas.context.drawImage(image, 0, 0, opt_width, opt_height);

            return canvas;
        },

        takePicture: function() {
            var instance = this,
                activity;

            activity = new MozActivity({
                name: 'activityord' // Possibly capture in future versions
            });

            activity.addEventListener('success', function() {
                var img = document.createElement('img'),
                    imagePresenter;

                imagePresenter = instance.createImageFromBlob(
                    this.result.blob);

                // TODO
            });

            activity.addEventListener('error', function() {
                alert('No taken picture returned');
            });
        },

        trackHuman_: function(config) {
            tracking.type.HUMAN.track(config);
        }
    };

    window.firephoto = new Firephoto().initializer();

})(window, document);