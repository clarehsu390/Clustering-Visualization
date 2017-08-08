let controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
    duration: 1000,
    offset: 50
})

.setPin("#title")
.addTo(controller);