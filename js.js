// function animate(draw, duration) {
//     let start = performance.now();
//
//     requestAnimationFrame(function animate(time) {
//         let timePassed = time - start;
//         console.log(timePassed);
//         if (timePassed > duration) {
//             timePassed = duration;
//         }
//
//         draw(timePassed);
//
//         if (timePassed < duration) {
//             requestAnimationFrame(animate);
//         }
//     })
// }
// function scroll() {
//    let pageY = window.pageYOffset || document.documentElement.scrollTop;
//
// }
// function revers(scroll) {
//     console.log(pageY);
//    return function (scroll) {
//       return 1- scroll;
//    }
// }
// var rev = revers(scroll);
// window.addEventListener('scroll',function (e) {
//    rev();
// });
var pageYLabel = 0;
const fix = document.querySelector('.fix');
const cube = document.querySelector('.cube');
fix.addEventListener('click', function (e) {
    var pageY = window.pageYOffset || document.documentElement.scrollTop;
    if (this.classList.contains('up')) {
        pageYLabel = pageY;
        animate({
            duration: 3000,
            timing: function (timeFraction) {
                return timeFraction;
            },

            draw: function (progress) {
                window.scrollBy(0,-progress * 5 )
            }
        });
    } else if (this.classList.contains('down')) {

    }

});
window.addEventListener('scroll', function (e) {
    var pageY = window.pageYOffset || document.documentElement.scrollTop;
    if (pageY > 500) {
        fix.classList.add('up')
        if (fix.classList.contains('down')) {
            fix.classList.remove('down')
        }

    } else {
        fix.classList.add('down')

        if (fix.classList.contains('up')) {
            fix.classList.remove('up')
        }
    }
});

function makeEaseOut(timing) {
    return function (timeFraction) {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}

function bounce(timeFraction) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

var bounceEaseOut = makeEaseOut(bounce);

cube.addEventListener('click', function () {
    animate({
        duration: 3000,
        timing: bounceEaseOut,

        draw: function (progress) {
            cube.style.left = progress * 500 + 'px';
        }
    });
});

function animate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }

        // текущее состояние анимации
        var progress = options.timing(timeFraction)
        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}