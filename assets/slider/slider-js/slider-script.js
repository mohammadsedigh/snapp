$('.owl-carousel-main').owlCarousel({
    rtl: true,
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1.4
        },
        576: {
            items: 1.75
        },
        768: {
            items: 2.5
        },
        991: {
            items: 3.5
        },
        1200: {
            items: 4.5
        }
    }
})