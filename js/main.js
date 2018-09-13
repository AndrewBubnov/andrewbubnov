window.onload = function() {

//***********************Our services section**************************************************
    let services = document.querySelector(".service-menu-list");
    let pictureOfService = document.querySelector(".service-image");

    $('.service-menu-list').on('click', changePictureOfService);

    function changePictureOfService(e) {
        let service = e.target.id;
        switch (service) {
            case "webDesign":
                pictureOfService.style.backgroundImage = 'url("../src/img/web-design.jpg")';
                $('.service-text').load('txt/web-design.txt');
                break;
            case "graphicDesign":
                pictureOfService.style.backgroundImage = 'url("../src/img/graphic-design.jpg")';
                $('.service-text').load('txt/graphic-design.txt');
                break;
            case "onlineSupport":
                pictureOfService.style.backgroundImage = 'url("../src/img/online-support.jpg")';
                $('.service-text').load('txt/online-support.txt');
                break;
            case "appDesign":
                pictureOfService.style.backgroundImage = 'url("../src/img/app-design.jpg")';
                $('.service-text').load('txt/app-design.txt');
                break;
            case "onlineMarketing":
                pictureOfService.style.backgroundImage = 'url("../src/img/online-marketing.jpg")';
                $('.service-text').load('txt/online-marketing.txt');
                break;
            case "seoService":
                pictureOfService.style.backgroundImage = 'url("../src/img/seo-ready.jpg")';
                $('.service-text').load('txt/seo-service.txt');
                break;

        }
    }

//*******************Smooth scroll*************************************************************

    let scrollLink = $('.nav-item').children(0);
    scrollLink.on('click', function (e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: $(this.hash).offset().top + 40
        }, 1000);
    });

// ********************Slider section***********************************************************

    let leftButton = document.querySelector("#left");
    let rightButton = document.querySelector("#right");
    let element = document.getElementsByClassName("slider-box");
    let viewWindow = document.querySelector(".view-window");
    let container = document.querySelector(".slider-container");
    let wrapper = document.querySelector(".slider-wrapper");
    let bigPhoto = document.querySelector(".big-photo");
    let innerWrapper = document.querySelector(".inner-wrapper");
    let employeeName = document.querySelector("#employee-name");
    let employeeRole = document.querySelector("#employee-role");
    let circle = element[0].firstChild;
    let image = circle.firstChild;
    let clientWidth = image.clientWidth;
    let clientHeight = image.clientHeight;
    let viewWidth = (clientWidth + 10) * 3;
    let array = [];
    viewWindow.style.width = viewWidth + "px";
    wrapper.style.width = viewWidth + 91 + "px";
    innerWrapper.style.height = clientHeight + "px";
    container.style.width = (clientWidth + 10) * element.length + "px";
    container.style.marginLeft = -(clientWidth + 10) * 2 + "px";
    bigPhoto.style.width = clientWidth + "px";
    bigPhoto.style.height = clientHeight + "px";


    let employee = [["Daria Algernon", "designer"], ["Cleo Dean", "photographer"], ["Ike Giffard", "web-designer"],
        ["Anderson Kiera", "photographer"], ["Mansel Greyson", "developer"], ["Pam Kaylynn", "project manager"],
        ["Jayson Kev", "team leader"]];


    for (let i = 0; i < element.length; i++) {
        element[i].style.width = clientWidth + "px";
        array[i] = i;
        element[i].style.transform = "translateX(" + i * (clientWidth + 10) + "px)";
        let circle = element[i].firstChild;

        if (i !== 3) {
            circle.classList.add("common-scaled");
        } else circle.classList.add("centered-scaled");
    }

    leftButton.addEventListener('click', function () {
        for (let i = 0; i < element.length; i++) {
            element[i].style.display = "";
        }
        for (let i = element.length - 1; i >= 0; i--) {
            let currentStyle = element[i].style;
            scaled(i, currentStyle, 2);
            if (array[i] === element.length - 1) {
                array[i] = 0;
                element[i].style.transform = "";
                element[i].style.display = "none";
                element[i].style.transform = "translateX(0px)";
            } else {
                array[i]++;
                let previous = parseInt(currentStyle.transform.match(/\d/g).join(""));
                element[i].style.transform = "translateX(" + (previous + clientWidth + 10) + "px)";
            }
        }
    });


    rightButton.addEventListener('click', function () {
        for (let i = 0; i < element.length; i++) {
            element[i].style.display = "";
        }
        for (let i = element.length - 1; i >= 0; i--) {
            let currentStyle = element[i].style;
            scaled(i, currentStyle, 4);
            if (array[i] === 0) {
                array[i] = element.length - 1;
                element[i].style.transform = "";
                element[i].style.display = "none";
                element[i].style.transform = "translateX(" + (element.length - 1) * (clientWidth + 10) + "px)";
            } else {
                array[i]--;
                let previous = parseInt(currentStyle.transform.match(/\d/g).join(""));
                element[i].style.transform = "translateX(" + (previous - clientWidth - 10) + "px)";
            }
        }
    });

    function scaled(i, currentStyle, n) {
        let image = element[i].firstChild;
        if (currentStyle.transform === "translateX(" + n * (clientWidth + 10) + "px)") {
            image.classList.remove("common-scaled");
            image.classList.add("centered-scaled");
        } else {
            image.classList.remove("centered-scaled");
            image.classList.add("common-scaled");
        }
    }

    let shown = false;
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener("click", function () {

            if (array[i] === 2) {
                leftButton.click();
                shown = false;
            } else if (array[i] === 4) {
                rightButton.click();
                shown = false;
            }

            let image = element[i].firstChild;
            image.classList.remove("centered-scaled");
            image.classList.add("common-scaled");

            if (shown === true) {
                let currentPhoto = parseInt(bigPhoto.innerHTML.match(/\d/g).join(""));

                if (currentPhoto !== i + 1) {
                    show(i);
                } else {
                    minify();
                }
            }
            else {
                show(i);
            }
        });
    }

    bigPhoto.addEventListener("click", function () {
        minify();
    });

    function minify() {
        if (bigPhoto.innerHTML !== "") {
            setTimeout(function () {
                bigPhoto.innerHTML = "";
                employeeName.innerHTML = "";
                employeeRole.innerHTML = "";
            }, 300);
            let photo = bigPhoto.firstChild;
            photo.classList.add("minify");
            shown = false;
        }
    }

    function show(i) {
        bigPhoto.innerHTML = "<div class='green-circle enlarge'><img class='clip-circle ' src = 'img/employee-photo-" + (i + 1) + ".jpg'></div>";
        employeeName.innerHTML = employee[i][0];
        employeeRole.innerHTML = employee[i][1];
        shown = true;
    }

// *************************Our amazing works section*******************************************

    let activeWork = "all";
    let set = new Set();
    let loadNumber = 1;
    let worksImage = $('.works-image');

    function allWorks() {
        let randomArray = Array.from(setFill(loadNumber));
        let arrayIndex = (loadNumber - 1) * 3;
        let suffix = (loadNumber - 1) * 12;
        worksImageFill(suffix + 1, suffix + 3, "graphic-design", randomArray, arrayIndex);
        worksImageFill(suffix + 4, suffix + 6, "web-design", randomArray, arrayIndex);
        worksImageFill(suffix + 7, suffix + 9, "landing-page", randomArray, arrayIndex);
        worksImageFill(suffix + 10, suffix + 12, "wordpress", randomArray, arrayIndex);
    }

    function setFill(setSize) {
        if (setSize === 1) set = new Set();
        while (true) {
            set.add(Math.floor(Math.random() * 12));
            if (set.size >= 3 * setSize) break;
        }
        return set;
    }

    function worksImageFill(start, end, name, array, arrayIndex) {
        worksImage = $('.works-image');
        for (let i = start - 1, j = arrayIndex; i < end; i++, j++) {
            worksImage[i].style.backgroundImage = 'url("img/' + name + '/' + name + (array[j] + 1) + '.jpg")';
        }
    }

    allWorks();

    let draftArray = [];
    for (let i = 0; i < 12; i++) {
        draftArray.push(i);
    }

    $('.works-tab').on('click', function (e) {
        if (this.id === 'all') {
            allWorks();
        } else {
            worksImageFill(1, 12, e.target.id, draftArray, 0);
        }
        $(this).addClass('works-active');
        $(this).siblings().removeClass('works-active');
        activeWork = this.id;
    });


    $('#loadMore').on('click', function () {
        if ($($('#loadMore'))[0].textContent === "+Load more") {
            for (let i = 0; i < 12; i++) {
                let newDiv = $('<div></div>');
                newDiv.on('mouseenter', onWorksHover);
                newDiv.addClass('works-image').appendTo($('.works-container'));
            }

            if (loadNumber < 3) {
                let startNumber = 12 * loadNumber + 1;
                let endNumber = startNumber + 11;
                loadNumber++;
                if (loadNumber === 3) {
                    $($('#loadMore'))[0].textContent = 'Hide';
                }
                switch (activeWork) {
                    case ("all"):
                        allWorks();
                        break;
                    case ("graphic-design"):
                        activeWork = "web-design";
                        worksImageFill(startNumber, endNumber, activeWork, draftArray, 0);
                        break;
                    case ("web-design"):
                        activeWork = "landing-page";
                        worksImageFill(startNumber, endNumber, activeWork, draftArray, 0);
                        break;
                    case ("landing-page"):
                        activeWork = "wordpress";
                        worksImageFill(startNumber, endNumber, activeWork, draftArray, 0);
                        break;
                    case ("wordpress"):
                        activeWork = "graphic-design";
                        worksImageFill(startNumber, endNumber, activeWork, draftArray, 0);
                        break;
                }
            }
        } else {
            $('.works-image-on-hover').addClass('invisible').appendTo('body');
            for (let i = $('.works-image').length - 1; i >=12 ; i--) {
                $($('.works-image'))[i].remove();
            }
            loadNumber = 1;
            $($('#loadMore'))[0].textContent = '+Load more';
            $('body, html').animate({
                scrollTop: $('#work').offset().top + 80
            }, 1000);
        }
    });

    $(worksImage).on('mouseenter', onWorksHover);

    function onWorksHover(e) {
        let currentImage = e.target.style.backgroundImage;
        $('.works-image-on-hover').removeClass('invisible').appendTo($(this));
        let name = currentImage.split("/")[1].split("-").join(" ");
        $($('.works-image-on-hover-type'))[0].textContent = name[0].toUpperCase() + name.substring(1);
    }

    $('.works-image-on-hover').on('mouseleave', function () {
        $(this).addClass('invisible');
    });

//***************************************** Masonry gallery *********************************************

    $('.masonry-gallery').imagesLoaded(function () {
        $('.masonry-gallery').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            percentPosition: true
        });
    });


//****************************************** Modal window ***********************************************
$('.purchase-button').on('click', function () {
    let height = $(window).height();
    let position = $(document).scrollTop() + Math.floor(height/2) - 185;
    let darkModal = $('<div></div>');
    darkModal.on('click', removeModal);
    darkModal.addClass('dark-modal').css("height", (position + 220 + height/2) + "px").appendTo('body');
    $('.modal').removeClass('invisible').css("transform", "translate(-50%," + position + "px)");
    $('body').addClass('hidden');
});


function removeModal() {
    $('body').removeClass('hidden');
    $(this).remove();
    $('.modal').addClass('invisible');
    }
}


