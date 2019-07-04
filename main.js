;(function () {
    'use strict';
    let requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    const menu = document.querySelector('.menu'),
        items = document.querySelectorAll('span'),
        containers = document.querySelectorAll('.wrap > div');
    var pageHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    menu.addEventListener('click', function (e) {

        if (e.target.tagName !== 'SPAN') return;
        let current = switchLinks(e.target);
        selectContainer(current);
    });

    function switchLinks(el) {
        let current;

        [].forEach.call(items, function (item, index) {
            item.classList.remove('active');

            if (item === el) {
                item.classList.add('active');

                current = index;
            }
        });
        return current;
    }

    function selectContainer(current) {

        Array.prototype.forEach.call(containers, function (container, index) {
            console.log(container);
            if (index === current) {
                let startY = container.getBoundingClientRect().top - 96,
                    direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;
                if (direction === 0) return;

                scroll(container, direction);
            }
        })
    }

    function scroll(el, direction) {
        let duration = 2000,
            start = new Date().getTime();

        let fn = function () {
            let top = el.getBoundingClientRect().top - 96,
                now = new Date().getTime() - start,
                result = Math.round(top * now / duration);
            result = (result > direction * top) ? top : (result === 0) ? direction : result;

            if(direction * top > 0 && (pageHeight - window.pageYOffset)>direction * document.documentElement.clientHeight){
                window.scrollBy(0,result);
                requestAnimationFrame(fn);
            }

        }
        requestAnimationFrame(fn);
    }
      var isScrolling = false;

    window.addEventListener("scroll", throttleScroll, false);

    function throttleScroll(e) {
      if (isScrolling == false) {
        window.requestAnimationFrame(function() {
          scrolling(e);
          isScrolling = false;
        });
      }
      isScrolling = true;
    }

    document.addEventListener("DOMContentLoaded", scrolling, false);
    //
    // var listItems = document.querySelectorAll("#mainContent ol li");
    // var firstBox = document.querySelector("#firstBox");
    // var secondBox = document.querySelector("#secondBox");

    function scrolling(e) {

      // if (isPartiallyVisible(firstBox)) {
      //   firstBox.classList.add("active");
      //
      //   document.body.classList.add("colorOne");
      //   document.body.classList.remove("colorTwo");
      // } else {
      //   document.body.classList.remove("colorOne");
      //   document.body.classList.remove("colorTwo");
      // }
      //
      // if (isFullyVisible(secondBox)) {
      //   secondBox.classList.add("active");
      //
      //   document.body.classList.add("colorTwo");
      //   document.body.classList.remove("colorOne");
      // }

      containers.forEach(listItem=>{
        if (isPartiallyVisible(listItem)) {
          listItem.classList.add("active");
        } else {
          listItem.classList.remove("active");
        }
      })
    }

    function isPartiallyVisible(el) {
      var elementBoundary = el.getBoundingClientRect();

      var top = elementBoundary.top;
      var bottom = elementBoundary.bottom;
      var height = elementBoundary.height;

      return ((top + height >= 0) && (height + window.innerHeight >= bottom));
    }

    function isFullyVisible(el) {
      var elementBoundary = el.getBoundingClientRect();

      var top = elementBoundary.top;
      var bottom = elementBoundary.bottom;

      return ((top >= 0) && (bottom <= window.innerHeight));
    }
})();