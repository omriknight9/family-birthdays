
var family = [];
var counter = 1;
var familyNum;
var lang = 1;

var valid;
var d = new Date();
var currentYear = d.getFullYear();

$(document).ready(function (event) {

    if (window.location.href.indexOf("shalevs") > -1) {
        loadJson('./lists/shalevs.txt');
    } else if (window.location.href.indexOf("waizingers") > -1) {
        loadJson('./lists/waizingers.txt');
    } else if (window.location.href.indexOf("alayevs") > -1) {
        loadJson('./lists/alayevs.txt');
    } else {
        loadJson('./lists/shalevs.txt');
        familyNum = 1;
    }

    $('#langBtnHe').click(function () {
        changeToHeb();
    })

    $('#langBtnEn').click(function () {
        changeToEng();
    })

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        scrollBtn();
    }

    $('.Xbtn').click(function () {
        $(this).parent().parent().hide();
    })

    setTimeout(function () {
        $('.spinnerWrapper').hide();
        $('.searchContainer').show();
        $('.btnWrapper').css('opacity', 1);
    }, 1500);

    $('#search').on('input', function () {
        window.scrollTo(0, 0);
        $.each($('.personWrapper'), function (key, value) {
            for (var i = 0; i < $(this).length; i++) {
                var personName = $($(this)[i]).attr('name').toLowerCase();
                var searchVal = $('#search').val();
                var searchValCapitalized = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);

                if (personName.includes(searchValCapitalized) || personName.includes(searchValCapitalized.toLowerCase())) {
                    $($(this)[i]).show();
                } else {
                    $($(this)[i]).hide();
                }
            }
        });
    })
});

function changeToHeb() {

    lang = 2;
    $('#langBtnHe').css('pointer-events', 'none');
    $('#langBtnEn').css('pointer-events', 'all');

    $("head").append("<link rel='stylesheet' type='text/css' href='css/main_he.css' id='hebCss'/>");
    $('title').html('ימי הולדת - משפחה');

    $('h1').hide().html('ימי הולדת - משפחה').fadeIn('slow');
    $('#search').hide().attr('placeholder', 'חפש במשפחה').fadeIn('slow');

    $('.shalevsBtn').hide().html('משפחת שלו').fadeIn('slow');
    $('.waizingersBtn').hide().html('משפחת ויזינגר').fadeIn('slow');
    $('.alayevsBtn').hide().html('משפחת אלייב').fadeIn('slow');

    $('.ageSortsBtn').hide().html('סדר לפי גיל').fadeIn('slow');
    $('.nameSortsBtn').hide().html('סדר לפי שם').fadeIn('slow');
    $('.groupSortBtn').hide().html('סדר לפי קבוצה').fadeIn('slow');

    $('.hebCaneldar').show();
    $('.engCaneldar').hide();

    $('.popupBtn').hide().html('סגור').fadeIn('slow');


    switch (familyNum) {
        case 1:
            showFamily(1);
            break;
        case 2:
            showFamily(2);
            break;
        case 3:
            showFamily(3);
            break;
    }
}

function changeToEng() {
    lang = 1;
    $('#langBtnEn').css('pointer-events', 'none');
    $('#langBtnHe').css('pointer-events', 'all');

    $('#hebCss').remove();
    $('title').html('Family Birthdays');
    $('h1').hide().html('Family Birthdays').fadeIn('slow');
    $('#search').hide().attr('placeholder', 'Search A Family Member').fadeIn('slow');

    $('.shalevsBtn').hide().html('Shalevs').fadeIn('slow');
    $('.waizingersBtn').hide().html('Waizingers').fadeIn('slow');
    $('.alayevsBtn').hide().html('Alayevs').fadeIn('slow');

    $('.ageSortsBtn').hide().html('Sort By Age').fadeIn('slow');
    $('.nameSortsBtn').hide().html('Sort By Name').fadeIn('slow');
    $('.groupSortBtn').hide().html('Sort By Group').fadeIn('slow');

    $('.hebCaneldar').hide();
    $('.engCaneldar').show();

    $('.popupBtn').hide().html('Close').fadeIn('slow');

    switch (familyNum) {
        case 1:
            showFamily(1);
            break;
        case 2:
            showFamily(2);
            break;
        case 3:
            showFamily(3);
            break;
    }
}

function showFamily(num) {
    $('.container').empty();
    family = [];
    counter = 1;
    $('.btnWrapper').css('opacity', 0);
    $('.spinnerWrapper').show();

    setTimeout(function () {
        switch (num) {
            case 1:
                if (lang == 1) {
                    loadJson('./lists/shalevs.txt');
                } else {
                    loadJson('./lists/‏‏shalevsHeb.txt');
                }
                
                familyNum = 1;
                break;
            case 2:
                if (lang == 1) {
                    loadJson('./lists/waizingers.txt');
                } else {
                    loadJson('./lists/‏‏waizingersHeb.txt');
                }
                familyNum = 2;
                break;
            case 3:
                if (lang == 1) {
                    loadJson('./lists/alayevs.txt');
                } else {
                    loadJson('./lists/alayevs_heb.txt');
                }
                familyNum = 3;
                break;
        }
    }, 500);
}

function loadJson(textFile) {
    $.get(textFile, function (data) {
        family.push(JSON.parse(data));
        setTimeout(function () {
            buildPeople('familyWrapper', $('.container'), family);
            $('body').css('background-color', '#3fe09b');
        }, 500);
    });
}

function goToDiv(div) {
    if ($(window).width() > 550) {
        $('html, body').animate({ scrollTop: $(div).position().top }, 'slow');
    } else {
        $('html, body').animate({ scrollTop: $(div).position().top }, 'slow');
    }
    setTimeout(function () {
        $('.header').css('margin-top', '-100rem');
    }, 700);
}

function buildPeople(div, wrapper, arr) {

    var people = arr[0].family;
    var date = new Date();
    var year = date.getFullYear();
    var birthday;

    for (var i = 0; i < people.length; i++) {

        var groupStr = JSON.stringify(people[i].group);
        var group = groupStr.substring(0, groupStr.indexOf('.'));

        var groupWrapper;

        if ($(groupWrapper).hasClass("group" + group)) {

        } else {
            groupWrapper = $('<div>', {
                class: "group" + group + ' groupWrapper'
            }).appendTo(wrapper);

            if (group % 2 == 0) {
                $(groupWrapper).addClass('evenGroup');
            } else {
                $(groupWrapper).addClass('oddGroup');
            }
        }

        var personWrapper = $('<div>', {
            class: 'personWrapper' ,
            'birthday': people[i].birthday,
            'birthdayText': people[i].birthdayText,
            'name': people[i].name,
            'group': people[i].group,
            'img': people[i].image,
            'colorGroup': people[i].colorGroup,
            'gender': people[i].gender,
            'facebook': people[i].facebook,
            'instagram': people[i].instagram,
            'calendar': people[i].calendar,
            click: function () {

                if ($(this).attr('facebook') == 'null') {
                    $('#facebookLink').hide();
                } else {
                    $('#facebookLink').show();
                    $('#facebookLink').attr('href', 'https://www.facebook.com' + $(this).attr('facebook'));
                }

                if ($(this).attr('instagram') == 'null') {
                    $('#instagramLink').hide();
                } else {
                    $('#instagramLink').show();
                    $('#instagramLink').attr('href', 'https://www.instagram.com' + $(this).attr('instagram'));
                }
                
                $('.personNamePop').html($(this).attr('name'));
                $('#personCover').attr('src', ('./images/people' + $(this).attr('img')));
                $('.start').html($(this).attr('calendar') + '08:00 AM');
                $('.end').html($(this).attr('calendar') + '10:00 AM');
                $('.title').html($(this).attr('name') + "'s Birthday");
                $('.location').html($(this).attr('name') + "'s Home");
                if (lang == 1) {
                    $('.nextBirthday').html('Next Birthday Will Be On ' + $(this).attr('nextBirthday'));
                } else {
                    $('.nextBirthday').html('היומולדת הבאה תהיה ביום ' + $(this).attr('nextBirthday'));
                }

                $('#personDetails').fadeIn(150);

                if ($(this).attr('gender') == 1) {
                    $('#personDetails .popupCont').css('background-color', 'lightblue');
                } else {
                    $('#personDetails .popupCont').css('background-color', 'pink');
                }

            }
        }).appendTo(groupWrapper);

        var gender;

        if ($(personWrapper).attr('gender') == 1) {
            gender = 'male.png';
        } else {
            gender = 'female.png';
        }
        
        if (lang == 1) {
            birthday = 'Birthday: ';
        } else {
            birthday = 'יומולדת: '
        }

        var genderImg = $('<img>', {
            class: 'genderImg',
            src: './images/' + gender,
            alt: 'gender img'
        }).appendTo(personWrapper);

        if ($(personWrapper).attr('colorGroup') % 2 == 0) {
            $(personWrapper).addClass('odd');
        } else {
            $(personWrapper).addClass('even');
        }

        var selectedDate = new Date($(personWrapper).attr('calendar') + '/' + year);

        if (selectedDate < d) {
            $(personWrapper).attr('calendar', $(personWrapper).attr('calendar') + '/' + Number(year + 1));
        } else {
            $(personWrapper).attr('calendar', $(personWrapper).attr('calendar') + '/' + year);
        }

        var personName = $('<p>', {
            class: 'personName',
            text: people[i].name
        }).appendTo(personWrapper);



        var personBirthday = $('<p>', {
            class: 'personBirthday',
            text: birthday + people[i].birthdayText
        }).appendTo(personWrapper);

        var personImgWrapper = $('<div>', {
            class: 'personImgWrapper',
        }).appendTo(personWrapper);

        var personImg = $('<img>', {
            class: 'personImg',
            alt: 'personImg',
            src: './images/people' + people[i].image
        }).appendTo(personImgWrapper);
    }

    setTimeout(function () {
        checkAge();
        $('.btnWrapper').css('opacity', 1);
        $('.spinnerWrapper').hide();
    }, 0);
}

function checkAge() {
    $.each($('.personWrapper'), function (key, value) {
        getAge($(this), $(this).attr('birthday'), $(this).attr('calendar'));
    });
}

function getAge(div, dateString, calendar) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var calendarBirthday = new Date(calendar);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var ageText;

    var daysEng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var daysHeb = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        if (lang == 1) {
            $(div).attr('nextBirthday', daysEng[calendarBirthday.getDay()]);
        } else {
            $(div).attr('nextBirthday', daysHeb[calendarBirthday.getDay()]);
        }
        
        age--;
    } else {
        calendarBirthday.setFullYear(calendarBirthday.getFullYear() + 1);
        if (lang == 1) {
            $(div).attr('nextBirthday', daysEng[calendarBirthday.getDay()]);
        } else {
            $(div).attr('nextBirthday', daysHeb[calendarBirthday.getDay()]);
        }

    }

    if (age == 0) {
        age = today.getMonth() - (birthDate.getMonth() + 1) + ' Months';
    }

    $(div).attr('age', age);

    if (lang == 1) {
        ageText = 'Age: ';
    } else {
        ageText = 'גיל: ';
    }

    var personAge = $('<p>', {
        class: 'personAge',
        text: ageText + age
    }).insertBefore($(div).find($('.personImgWrapper')));

    return age;
}

function goToTop() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

function scrollBtn() {

    if ($(this).scrollTop() > 550) {
        $('.goToTopBtn').fadeIn();
    }
    else {
        $('.goToTopBtn').fadeOut();
    }
}

function sortFamily(elem1, kind) {

    $('.groupWrapper').removeClass('oddGroup');
    $('.groupWrapper').removeClass('evenGroup');

    if ($('.btnWrapper').attr('kind') == kind) {

    } else {
        $('.btnWrapper').attr('kind', kind);
        counter = 1;
    }

    if (kind == 3) {
        $('.container').empty();
    }

    $.each($('.container'), function (key, value) {
        var ids = [], obj, i, len;
        var children = $(this).find('.personWrapper');
        for (i = 0, len = children.length; i < len; i++) {
            obj = {};
            obj.element = children[i];
            var elem2 = $(children[i]).attr(elem1);
            switch (kind) {
                case 1:
                    obj.idNum = new Date(elem2);
                    break;
                case 2:
                    obj.idNum = elem2;
                    break;
                case 3:
                    obj.idNum = parseInt(elem2.replace(/[^\d]/g, ""), 10);
                    break;
            }
            ids.push(obj);
        }

        switch (kind) {
            case 1:
                switch (counter) {
                    case 1:
                        ids.sort(function (a, b) { return (b.idNum - a.idNum); });
                        counter = 2;
                        break;
                    case 2:
                        ids.sort(function (a, b) { return (a.idNum - b.idNum); });
                        counter = 1;
                        break;
                }
                $('.btnWrapper').attr('kind', kind);
                $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 2:
                switch (counter) {
                    case 1:
                        ids.sort(function (a, b) {
                            if (a.idNum > b.idNum) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });

                        counter = 2;
                        break;

                    case 2:
                        ids.sort(function (a, b) {
                            if (a.idNum < b.idNum) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });
                        counter = 1;
                        break;
                }
                $('.btnWrapper').attr('kind', kind);
                $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 3:
                $('.spinnerWrapper').show();
                $('.btnWrapper').css('opacity', 0);
                $('.groupSortBtn').css('pointer-events', 'none');
                showFamily(familyNum);
                setTimeout(function () {
                    $('.btnWrapper').css('opacity', 1);
                    $('.spinnerWrapper').hide();
                }, 500);
                break;
        }

        for (i = 0; i < ids.length; i++) {
            $(this).append(ids[i].element);
        }
    });
}

function removePopup(container) {

    $(document).mouseup(function (e) {
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            e.stopPropagation();
            $(document).off('mouseup');
        }
    })
}

function closeCurrentPopup(that) {
    $($(that)[0].parentElement.parentElement.parentElement).hide();
}
