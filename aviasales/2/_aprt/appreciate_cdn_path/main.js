'use strict';

window.onload = () => {
    //
    var tracked;
    document.getElementById('_ssbc').addEventListener('touchstart', function (e) {
        if (tracked) return;
        tracked = true;
        var trackUrl = c_url;
        var landingUrl = '';
        if (trackUrl.includes("mopubnativebrowser://navigate?url=")) {
            trackUrl = decodeURIComponent(trackUrl.split("mopubnativebrowser://navigate?url=")[1]);
            landingUrl = "mopubnativebrowser://navigate?url=" + encodeURIComponent(l_url);
        }
        (new Image).src = trackUrl;
        c_url = landingUrl;
    }, true);

//

    const countryNames = document.querySelectorAll('.countryName');
    const countryChoosing = document.querySelector('.countryChoosing');
    const restOptions = document.querySelector('.restOptions');
    let prevItemIndex = 0;

    const changeCountryName = (event) => {
        countryNames[prevItemIndex].classList.remove('show');
        prevItemIndex = event.item.index;
        countryNames[prevItemIndex].classList.add('show');
    };

    const owl = $('.owl-carousel').owlCarousel({
        items: 1,
        nav: false,
        dots: false,
    });

    $(document).ready(owl.owlCarousel());

// Listen to owl events:
    owl.on('changed.owl.carousel', event => {
        changeCountryName(event);
    });


    $('.prev').click(() => {
        owl.trigger('prev.owl.carousel');
    });

    $('.next').click(() => {
        owl.trigger('next.owl.carousel');
    });

    $(() => {
        $("#draggable").draggable({
            stop: () => {
                countryChoosing.style.transform = 'translateY(100%)';
                restOptions.style.transform = 'translateY(0)';
            }
        });
    });


// for second screen
    const bg = document.querySelector(".bg");

    function convertX(value) {
        return bg.width * value / 100
    }

    function convertY(value) {
        return bg.height * value / 100
    }

    const styleNode = document.createElement('style');

    styleNode.setAttribute('id', 'styleForThumb');
    styleNode.innerHTML = `
        input::-webkit-slider-thumb,
        input::-moz-range-thumb,
        input::-ms-thumb {
            width: ${Math.round(convertX(4))}px;
            height: ${Math.round(convertX(4))}px;
        }
`;

    document.head.appendChild(styleNode);

    document.querySelector('.done').addEventListener('click', () => {
        document.querySelector('.lastScr').style.transform = 'none';
        document.querySelector('.download').style.display = 'block';

        document.querySelector('#_ssbc').addEventListener('click', function () {
            openLandingPage();
        });
    });
};
