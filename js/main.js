
let family = [];
let counter = 1;
let familyNum;
let lang = 1;
let now = new Date()
let currentYear = now.getFullYear();
let birthdayArr = [];
let birthdayToday = false;
let searchVal;
let lastChar;

const hebCalendarUrl = 'https://www.hebcal.com/converter?cfg=json';

$(document).ready(() => {
    if (window.location.href.indexOf("shalevs") > -1) {
        loadJson('./lists/shalevs.txt');
    } else if (window.location.href.indexOf("waizingers") > -1) {
        loadJson('./lists/waizingers.txt');
        familyNum = 2;
    } else if (window.location.href.indexOf("alayevs") > -1) {
        loadJson('./lists/alayevs.txt');
        familyNum = 3;
    } else {
        loadJson('./lists/shalevs.txt');
        familyNum = 1;
    }

    if (window.location.href.indexOf("lang=he") > -1) {
        setTimeout(() => {
            changeToHeb(2);
            window.history.pushState('page2', 'Title', 'index.html');
        }, 600)
    }

    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    }

    window.onscroll = () => {
        scrollBtn();
    }

    $('.Xbtn').click(function () {
        $(this).parent().parent().fadeOut(150);
    })

    setTimeout(() => {
        $('.spinnerWrapper').hide();
        $('.searchContainer').show();
    }, 1500);

    $('#search').on('input', () => {
        searchVal = $('#search').val();
        lastChar = searchVal.substr(searchVal.length - 1);

        if (lastChar == ' ') {
            return; 
        } else {
            $('#searchResults').empty();
            $('#searchResults').hide();
        }

        $.each($('.container .personWrapper'), function (key, value) {
            let familyNumId = $(value).attr('numId');
            showResult($(this), familyNumId);
        });
    })
});

const menuItemClicked = (type) => {
    switch (type) {
        case 1:
            changeToEng();
            $('#search').val('');
            $('#searchResults').hide();
            if (birthdayToday) {
                $('.personWrapper').first().remove();
            }
            break;
        case 2:
            changeToHeb(1);
            $('#search').val('');
            $('#searchResults').hide();
            if (birthdayToday) {
                $('.personWrapper').first().remove();
            }
            break;
    }
} 

const showResult = (that, resultNum) => {
    for (let i = 0; i < $(that).length; i++) {
        let personName = $($(that)[i]).attr('name').toLowerCase();
        let personNameHeb = $($(that)[i]).attr('nameHeb');
        let personImg = $($(that)[i]).attr('img');
        let searchVal = $('#search').val();
        let searchValCapitalized = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);
        let cap;
        let serachFinal;

        try {
            if (lang == 1) {
                cap = capitalize(personName);
            } else {
                cap = personNameHeb;
            }
            
            serachFinal = capitalize(searchValCapitalized);
        } catch (error) {
            return;
        }
    
        if (cap.includes(serachFinal) || cap.includes(serachFinal.toLowerCase()) || personNameHeb.includes(serachFinal)) {
            let result = $('<div>', {
                class: 'result',
                id: resultNum,
                click: function() {
                    let that = this;
                    let pickedId = $(that).attr('id');
                    $.each($('.container .personWrapper'), function (key, value) {

                        if ($(this).attr('numId') == pickedId) {
                            $('body').css('pointer-events', 'none');
                            let selectedDiv = this;
                            $('#searchResults').hide();
                            $('#search').val('');

                            if ($(this).attr('isParent') == 1) {
                                goToDiv($(this).parent().parent());
                            } else {
                                goToDiv($(this).parent());
                            }

                            setTimeout(function() {
                                $(selectedDiv).click();
                                $('body').css('pointer-events', 'all');
                            }, 500)
                        }
                    });
                }
            }).appendTo($('#searchResults'));

            let resultImgWrapper = $('<div>', {
                class: 'resultImgWrapper',
            }).appendTo(result);

            $('<img>', {
                class: 'resultImg',
                src: './images/people' + personImg
            }).appendTo(resultImgWrapper);

            $('<p>', {
                class: 'resultName',
                text: cap
            }).appendTo(result);
        }

        if (searchVal.length == 0 || $('.result').length < 1 || searchVal == '') {
            $('#searchResults').hide();
        } else {
            $('#searchResults').show();
        }
    }
}

const showFamily = (num, type) => {
    if (familyNum == num && type == 1) {
        return;
    }
    
    $('.familyLi').css({'pointer-events': 'all', 'opacity': '1'});
    $('.closestBirth, .birthdayWish').remove();

    if (birthdayToday) {
        $('.personWrapper').first().remove();
    }

    $('.container').empty();
    family = [];
    counter = 1;
    birthdayToday = false;
    $('.spinnerWrapper').show();

    setTimeout(() => {
        switch (num) {
            case 1:
                loadJson('./lists/shalevs.txt');
                $('#shalevsLi').css({'pointer-events': 'none', 'opacity': '.7'});
                familyNum = 1;
                break;
            case 2:
                loadJson('./lists/waizingers.txt');
                $('#waizingersLi').css({'pointer-events': 'none', 'opacity': '.7'});
                familyNum = 2;
                break;
            case 3:
                loadJson('./lists/alayevs.txt');
                $('#alayevsLi').css({'pointer-events': 'none', 'opacity': '.7'});
                familyNum = 3;
                break;
        }
    }, 500);
}

const loadJson = (textFile) => {
    $.get(textFile, (data) => {
        family.push(JSON.parse(data));
        setTimeout(() => {
            buildPeople($('.container'), family);
        }, 500);
    });
}

const goToDiv = (div) => {
    $('html, body').animate({ scrollTop: $(div).position().top -170 }, 500);
}

const buildPeople = (wrapper, arr) => {
    let people = arr[0].family;
    let date = new Date();
    let year = date.getFullYear();
    let birthday;
    let deathday;
    let peopleGroupArr = [];

    for (let i = 0; i < people.length; i++) {
        if (!peopleGroupArr.includes(people[i].group)) {
            peopleGroupArr.push(people[i].group);
            var groupWrapper = $('<div>', {
                class: 'groupWrapper'
            }).appendTo(wrapper);

            var parentDiv = $('<div>', {
                class: 'parentDiv'            
            }).appendTo(groupWrapper);
        }

        let nameToShow;

        if (lang == 1) {
            nameToShow = people[i].name;
        } else {
            nameToShow = people[i].nameHeb;
        }

        let dateNow = new Date();
        let yearNow = dateNow.getFullYear();
        let date2 = new Date(people[i].birthday);
        let day = date2.getDate();
        let month = date2.getMonth() + 1;
        let yearToShow = date2.getFullYear();

        if (day < 10) {
            day = '0' + day
        } else {
            day = day;
        }

        if (month < 10) {
            month = '0' + month
        } else {
            month = month;
        }

        let deathdate = new Date(people[i].deathDate);
        let deathDayForShow = deathdate.getDate();
        let deathMonth = deathdate.getMonth() + 1;
        let deathYear = deathdate.getFullYear();

        if (deathDayForShow < 10) {
            deathDayForShow = '0' + deathDayForShow
        } else {
            deathDayForShow = deathDayForShow;
        }

        if (deathMonth < 10) {
            deathMonth = '0' + deathMonth
        } else {
            deathMonth = deathMonth;
        }

        let calendar = month + '/' + day;;
        let dateForShow = day + '/' + month + '/' + yearToShow;
        let deathdDateForShow = deathDayForShow + '/' + deathMonth + '/' + deathYear;

        let personWrapper = $('<div>', {
            class: 'personWrapper',
            'numId': people[i].id,
            'birthday': people[i].birthday,
            'name': people[i].name,
            'familyName': people[i].familyName,
            'nameHeb': people[i].nameHeb,
            'familyNameHeb': people[i].familyNameHeb,
            'group': people[i].group,
            'img': people[i].image,
            'isParent': people[i].parent,
            'married': people[i].married,
            'gender': people[i].gender,
            'facebook': people[i].facebook,
            'instagram': people[i].instagram,
            'calendar': calendar,
            'year': yearToShow,
            'deathDate': people[i].deathDate,
            'afterSunset': people[i].afterSunset,
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

                $('#checkBirthdaysLink').attr('href', 'https://omriknight9.github.io/birthdays' + '?name=' + $(this).attr('name') + '&day=' + $(this).attr('day') + '&month=' + $(this).attr('month'));

                if (lang == 1) {
                    $('.personNamePop').html($(this).attr('name'));
                } else {
                    $('.personNamePop').html($(this).attr('nameHeb'));
                }

                $('#personCover').attr('src', ('./images/people' + $(this).attr('img')));
                $('.start').html($(this).attr('calendar') + '08:00 AM');
                $('.end').html($(this).attr('calendar') + '10:00 AM');
                if (lang == 1) {
                    if ($(this).attr('deathDate') == "null") {
                        $('.nextBirthday').html('Next Birthday Will Be On ' + $(this).attr('nextBirthday')).show();
                    } else {
                        $('.nextBirthday').hide();
                    }
                    $('.title').html($(this).attr('name') + "'s Birthday");
                    $('.location').html($(this).attr('name') + "'s Home");

                } else {
                    if ($(this).attr('deathDate') == "null") {
                        $('.nextBirthday').html('Next Birthday Will Be On ' + $(this).attr('nextBirthday')).show();
                    } else {
                        $('.nextBirthday').hide();
                    }
                    $('.title').html('יומולדת ל' + $(this).attr('nameHeb'));
                    $('.location').html('הבית של ' + $(this).attr('nameHeb'));
                }

                $('.hebBirthday').html('');

                switch($(this).attr('afterSunset')) {
                    case 'true':
                        $.get(hebCalendarUrl + `&gy=${$(this).attr('year')}&gm=${$(this).attr('month')}&gd=${$(this).attr('day')}&2h=1&gs=on`, function (data) {
                            $('.hebBirthday').html(data.hebrew);
                        });
                        break;
                    case 'false':
                        $.get(hebCalendarUrl + `&gy=${$(this).attr('year')}&gm=${$(this).attr('month')}&gd=${$(this).attr('day')}&2h=1`, function (data) {
                            $('.hebBirthday').html(data.hebrew);
                        });
                        break;
                    case 'null':
                        $.get(hebCalendarUrl + `&gy=${$(this).attr('year')}&gm=${$(this).attr('month')}&gd=${$(this).attr('day')}&2h=1`, function (data) {
                            $('.hebBirthday').html(data.hebrew);
                        });
                        $.get(hebCalendarUrl + `&gy=${$(this).attr('year')}&gm=${$(this).attr('month')}&gd=${$(this).attr('day')}&2h=1&gs=on`, function (data) {
                            $('.hebBirthday').append('/' + data.hebrew);
                        });
                        break;
                }
                
                $('#personDetails').fadeIn(150);

                if ($(this).attr('gender') == 1) {
                    $('#personDetails .popupCont').css('background-color', 'lightblue');
                } else {
                    $('#personDetails .popupCont').css('background-color', 'pink');
                }
            }
        })

        let gender;
        let newDay;
        let newMonth;

        if ($(personWrapper).attr('gender') == 1) {
            gender = 'male.png';
            $(personWrapper).addClass('boy');

            if (day.toString().charAt(0) == '0') {
                newDay = day.replace('0', '');
            } else {
                newDay = day;
            }

            if (month.toString().charAt(0) == '0') {
                newMonth = month.replace('0', '');
            } else {
                newMonth = month;
            }

            if (newDay == now.getDate() && (now.getMonth() + 1) == newMonth) {
                $(personWrapper).addClass('boyBornToday');
            }

        } else {
            gender = 'female.png';
            $(personWrapper).addClass('girl');

            if (day.toString().charAt(0) == '0') {
                newDay = day.replace('0', '');
            } else {
                newDay = day;
            }

            if (month.toString().charAt(0) == '0') {
                newMonth = month.replace('0', '');
            } else {
                newMonth = month;
            }

            if (newDay == now.getDate() && (now.getMonth() + 1) == newMonth) {
                $(personWrapper).addClass('girlBornToday');
            }
        }
        
        if (lang == 1) {
        if (people[i].deathDate !== 'null') {
            deathday = 'Death Date: '
        }
            birthday = 'Birthday: ';
        } else {
            if (people[i].deathDate !== 'null') {
                deathday = 'תאריך פטירה: '
            }
            birthday = 'יומולדת: '
        }

        $('<img>', {
            class: 'genderImg',
            src: './images/' + gender,
            alt: 'gender img'
        }).appendTo(personWrapper);

        $('<img>', {
            class: 'zodiacImg',
            src: './images/zodiac' + chosenMonth(day, month),
            alt: 'zodiac img'
        }).appendTo(personWrapper);

        let age = yearNow - yearToShow;

        if ($(personWrapper).attr('isParent') == 1) {
            $(personWrapper).appendTo(parentDiv);
            if ($(personWrapper).attr('gender') == 1) {
                $(personWrapper).addClass('suit');
                buildCloths('suit', 'suit img', personWrapper);
            } else {
                buildCloths('dress', 'dress img', personWrapper);
            }
        } else {
            if ($(personWrapper).attr('gender') == 1) {
                if (age < 5) {
                    buildCloths('babyBoy', 'baby boy img', personWrapper);
                } else {
                    if ($(personWrapper).attr('married') == 1) {
                        buildCloths('suit', 'suit img', personWrapper);
                    } else {
                        buildCloths('boy', 'boy img', personWrapper);
                    }
                }
            } else {
                if (age < 5) {
                    buildCloths('babyGirl', 'baby girl img', personWrapper);
                } else {
                    if ($(personWrapper).attr('married') == 1) {
                        buildCloths('dress', 'dress img', personWrapper);
                    } else {
                        buildCloths('girl', 'girl img', personWrapper);
                    }
                }
            }

            $(personWrapper).appendTo(groupWrapper);
        }

        let selectedDate = new Date($(personWrapper).attr('calendar') + '/' + year);

        if (selectedDate < now) {
            $(personWrapper).attr('calendar', $(personWrapper).attr('calendar') + '/' + Number(year + 1));
        } else {
            $(personWrapper).attr('calendar', $(personWrapper).attr('calendar') + '/' + year);
        }

        let personImgWrapper = $('<div>', {
            class: 'personImgWrapper',
        }).appendTo(personWrapper);

        $('<img>', {
            class: 'personImg',
            alt: 'personImg',
            src: './images/people' + people[i].image
        }).appendTo(personImgWrapper);

        let personDetailsWrapper = $('<div>', {
            class: 'personDetailsWrapper',
        }).appendTo(personWrapper);

        $('<p>', {
            class: 'personName',
            text: nameToShow
        }).appendTo(personDetailsWrapper);

        $('<p>', {
            class: 'personBirthday',
            text: birthday + dateForShow
        }).appendTo(personDetailsWrapper);

        if (people[i].deathDate !== 'null') {
            $('<p>', {
                class: 'personDeathDay',
                text: deathday + deathdDateForShow
            }).appendTo(personDetailsWrapper);
        }
    }

    setTimeout(() => {
        checkAge();
        checkClosest();
        $('.spinnerWrapper').hide();
    }, 0);
}

const checkClosest = () => {
    let year;
    birthdayArr = [];
    
    for (let i = 0; i < $('.groupWrapper .personWrapper').length; i++) {
        let name = $($('.groupWrapper .personWrapper')[i]).attr('name');
        let familyName = $($('.groupWrapper .personWrapper')[i]).attr('familyName');
        let nameHeb = $($('.groupWrapper .personWrapper')[i]).attr('nameHeb');
        let familyNameHeb = $($('.groupWrapper .personWrapper')[i]).attr('familyNameHeb');
        let birthdayDay = $($('.groupWrapper .personWrapper')[i]).attr('day');
        let birthdayMonth = $($('.groupWrapper .personWrapper')[i]).attr('month');
        let gender = $($('.groupWrapper .personWrapper')[i]).attr('gender');
        let img = $($('.groupWrapper .personWrapper')[i]).attr('img');
        let date = new Date(now.getFullYear() + '/' + birthdayMonth + '/' + birthdayDay);

        if (now.getDate() == birthdayDay && now.getMonth() + 1 == birthdayMonth) {
            year = now.getFullYear();
            birthdayToday = true;
        } else if (date < now) {
            year = now.getFullYear() + 1;
        } else {
            year = now.getFullYear();
        }
        
        let finalDate = new Date(year + '/' + birthdayMonth + '/' + birthdayDay);

        if ($($('.groupWrapper .personWrapper')[i]).attr('deathDate') == 'null') {
            birthdayArr.push({name: name, familyName: familyName, gender: gender, nameHeb: nameHeb, familyNameHeb: familyNameHeb, date: finalDate, img: img});
        }
    }
    
    setTimeout(() => {
        birthdayArr.sort((a, b) => {
            let distancea = Math.abs(now - a.date);
            let distanceb = Math.abs(now - b.date);
            return distancea - distanceb;
        });

        if (lang == 1) {
            if (birthdayToday) {
                $.each($('.personWrapper'), (key, value) => {
                    if ($(value).attr('month') == now.getMonth() + 1 && $(value).attr('day') == now.getDate()) {
                        $(value).clone().appendTo($('#birthdayToday'));
                    }
                });

                $.each($('#birthdayToday .personWrapper'), (key, value) => {
                    let closest = $('<p>',{
                        class: 'closestBirth',
                        text: "It's "
                    }).insertAfter($('.spinnerWrapper'));

                    let closestSpanName = $('<span>',{
                        class: 'birthdayColor',
                        text: birthdayArr[key].name + ' ' + birthdayArr[key].familyName
                    }).appendTo(closest);
                    
                    $('<span>',{
                        class: 'closestSpan',
                        text: "'s" + " Birthday Today!"

                    }).appendTo(closest);

                    let birthdayWish = $('<p>', {
                        class: 'birthdayWish'
                    }).insertAfter(closest);

                    if ($(value).attr('facebook') !== 'null') {
                        let birthdayText;
                        if (birthdayArr[key].gender == 1) {
                            birthdayText = 'Wish Him Happy Birthday';
                        } else {
                            birthdayText = 'Wish Her Happy Birthday';
                        }

                        $('<a>', {
                            href: 'https://www.facebook.com' + $(value).attr('facebook'),
                            target: '_blank',
                            text: birthdayText
                        }).appendTo(birthdayWish);
                    }

                    $(value).click(() => {
                        goToBirthdayPerson($(value).attr('numid'));
                    })

                    if (birthdayArr[key].gender == 1) {
                        $(closestSpanName).css('color', 'lightblue');
                    } else {
                        $(closestSpanName).css('color', 'pink');
                    }
                });
            } else {
                let closest = $('<p>',{
                    class: 'closestBirth',
                    text: 'Closest Birthday: '
                }).insertAfter($('.spinnerWrapper'));

                $('<span>', {
                    class: 'birthdayColor',
                    text: birthdayArr[0].name + ' ' + birthdayArr[0].familyName
                }).appendTo(closest);

                if (birthdayArr[0].gender == 1) {
                    $('.birthdayColor').css('color', 'lightblue');
                } else {
                    $('.birthdayColor').css('color', 'pink');
                }

                if ($(window).width() > 765) {
                    $('.closestBirth').mouseenter(() => {
                        if (!$('#searchResults').is(':visible')) {
                            let hoverImgContainer = $('<div>', {
                                class: 'hoverImgContainer',
                            }).hide().appendTo($('.closestBirth')).fadeIn();
                            
                            let hoverImgWrapper = $('<div>', {
                                class: 'hoverImgWrapper',
                            }).appendTo(hoverImgContainer);
            
                            $('<img>', {
                                class: 'hoverImg',
                                src: './images/people' + birthdayArr[0].img
                            }).appendTo(hoverImgWrapper)
                        }
                    });
                 
                    $('.closestBirth').mouseleave(() => {
                        $('.hoverImgContainer').fadeOut(400);
                        $('.closestBirth').css('pointer-events', 'none');
                        setTimeout(() => {
                            $('.hoverImgContainer').remove();
                            $('.closestBirth').css('pointer-events', 'all');
                        }, 600);
                    }).mouseleave()
                }
            }
        } else {
            if (birthdayToday) {
                $.each($('.personWrapper'), (key, value) => {
                    if ($(value).attr('month') == now.getMonth() + 1 && $(value).attr('day') == now.getDate()) {
                        $(value).clone().appendTo($('#birthdayToday'));
                    }
                });

                $.each($('#birthdayToday .personWrapper'), (key, value) => {
                    let closest = $('<p>',{
                        class: 'closestBirth',
                    }).insertAfter($('.spinnerWrapper'));

                    let closestSpanName = $('<span>',{
                        class: 'birthdayColor',
                        text: birthdayArr[key].nameHeb + ' ' + birthdayArr[key].familyNameHeb
                    }).appendTo(closest);

                    let celebrateText;
                    let wishText;

                    if ($(value).attr('gender') == 1) {
                        celebrateText = ' חוגג היום!';
                        wishText = 'אחל/י לו יום הולדת שמח';
                    } else {
                        celebrateText = ' חוגגת היום!';
                        wishText = 'אחל/י לה יום הולדת שמח';
                    }
                    
                    $('<span>',{
                        class: 'closestSpan',
                        text: celebrateText
                    }).appendTo(closest);

                    let birthdayWish = $('<p>', {
                        class: 'birthdayWish'
                    }).insertAfter(closest);

                    if ($(value).attr('facebook') !== 'null') {
                        $('<a>', {
                            href: 'https://www.facebook.com' + $(value).attr('facebook'),
                            target: '_blank',
                            text: wishText
                        }).appendTo(birthdayWish);
                    }

                    $(value).click(() => {
                        goToBirthdayPerson($(value).attr('numid'));
                    })

                    if (birthdayArr[key].gender == 1) {
                        $(closestSpanName).css('color', 'lightblue');
                    } else {
                        $(closestSpanName).css('color', 'pink');
                    }
                });
            } else {

                let finalBirthdayText;

                if (birthdayArr[0].gender == 1) {
                    finalBirthdayText = 'החוגג הקרוב: ';
                } else {
                    finalBirthdayText = 'החוגגת הקרובה: ';
                }

                let closest = $('<p>',{
                    class: 'closestBirth',
                    text: finalBirthdayText
                }).insertAfter($('.spinnerWrapper'));

                $('<span>', {
                    class: 'birthdayColor',
                    text: birthdayArr[0].nameHeb + ' ' + birthdayArr[0].familyNameHeb
                }).appendTo(closest);

                if (birthdayArr[0].gender == 1) {
                    $('.birthdayColor').css('color', 'lightblue');
                } else {
                    $('.birthdayColor').css('color', 'pink');
                }

                if ($(window).width() > 765) {
                    $('.closestBirth').mouseenter(() => {
                        if (!$('#searchResults').is(':visible')) {
                            let hoverImgContainer = $('<div>', {
                                class: 'hoverImgContainer',
                            }).hide().appendTo($('.closestBirth')).fadeIn();
                            
                            let hoverImgWrapper = $('<div>', {
                                class: 'hoverImgWrapper',
                            }).appendTo(hoverImgContainer);
            
                            $('<img>', {
                                class: 'hoverImg',
                                src: './images/people' + birthdayArr[0].img
                            }).appendTo(hoverImgWrapper)
                        }
                    });
                 
                    $('.closestBirth').mouseleave(() => {
                        $('.hoverImgContainer').fadeOut(400);
                        $('.closestBirth').css('pointer-events', 'none');
                        setTimeout(() => {
                            $('.hoverImgContainer').remove();
                            $('.closestBirth').css('pointer-events', 'all');
                        }, 600);
                    }).mouseleave()
                }
            }
        }
    }, 1000);
}

const goToBirthdayPerson = (id) => {
    $.each($('.container .personWrapper'), (key, value) => {
        if ($(value).attr('numId') == id) {
            $(value).click();
        }
    });
}

const checkAge = () => {
    $.each($('.personWrapper'), (key, value) => {
        if ($(value).attr('deathDate') == 'null') {
            getAge($(value), $(value).attr('birthday'), $(value).attr('calendar'));
        } else {
            getDeathAge($(value), $(value).attr('deathdate'), $(value).attr('birthday'));
        }
    });
}

const buildCloths = (img, alt, wrapper) => {
    $('<img>', {
        class: 'clothesImg',
        id: img,
        src: './images/' + img + '.png',
        alt: alt
    }).appendTo(wrapper);
}

const getDeathAge = (div, death, birth) => {
    let deathDate = new Date(death);
    let birthDate = new Date(birth);
    let age = deathDate.getFullYear() - birthDate.getFullYear();
    let m = deathDate.getMonth() - birthDate.getMonth();

    let month = birthDate.getMonth() + 1;
    let day = birthDate.getDate();

    let ageText;

    if (lang == 1) {
        ageText = 'Died: ' + age;
    } else {
        if ($(div).attr('gender') == 1) {
            ageText = ' נפטר בגיל: ' + age;
        } else {
            ageText = ' נפטרה בגיל: ' + age;
        }
    }

    $('<p>', {
        class: 'personAge',
        text: ageText
    }).appendTo($(div).find($('.personDetailsWrapper')));

    $(div).attr('age', age);
    $(div).attr('month', month);
    $(div).attr('day', day);
}

const getAge = (div, dateString, calendar) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let calendarBirthday = new Date(calendar);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let ageText;
    let month = calendarBirthday.getMonth() + 1;
    let day = calendarBirthday.getDate();
    let daysEng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let daysHeb = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        if (lang == 1) {
            $(div).attr('nextBirthday', daysEng[calendarBirthday.getDay()]);
        } else {
            $(div).attr('nextBirthday', daysHeb[calendarBirthday.getDay()]);
        }
        
        age--;

    } else {
        calendarBirthday.setFullYear(calendarBirthday.getFullYear());
        if (lang == 1) {
            $(div).attr('nextBirthday', daysEng[calendarBirthday.getDay()]);
        } else {
            $(div).attr('nextBirthday', daysHeb[calendarBirthday.getDay()]);
        }
    }

    if (age == 0) {
        let finalAge;
        let finalMonth;
        let finalDay;

        if (today.getMonth() + 1 < 10) {
            finalMonth = '0' + Math.round(today.getMonth() + 1);
        } else {
            finalMonth = today.getMonth() + 1;
        }

        if (today.getDate() < 10) {
            finalDay = '0' + Math.round(today.getDate());
        } else {
            finalDay = today.getDate();
        }

        let infantAge = finalMonth + '/' + finalDay + '/' + today.getFullYear();
        const date1 = new Date(dateString);
        const date2 = new Date(infantAge);

        finalAge = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());

        if (lang == 1) {
            age = finalAge + ' Months';
        } else {
            age = finalAge + ' חודשים';
        }
    }

    $(div).attr('age', age);
    $(div).attr('month', month);
    $(div).attr('day', day);

    if (lang == 1) {
        ageText = 'Age: ';
    } else {
        ageText = 'גיל: ';
    }

    $('<p>', {
        class: 'personAge',
        text: ageText + age
    }).appendTo($(div).find($('.personDetailsWrapper')));

    return age;
}

const goToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
}

function scrollBtn() {
    if ($(this).scrollTop() > 550) {
        $('#goToTopBtn').fadeIn();
    }
    else {
        $('#goToTopBtn').fadeOut();
    }
}

const sortFamily = (elem1, kind) => {
    resetIcons();

    if (kind !== 2 && $('.sortWrapper').attr('kind') !== kind.toString()) {
        $('.sortWrapper').attr('kind', kind);
        counter = 1;
    }

    if (kind == 4) {
        $('.container').empty();
    }

    if (lang == 2 && kind == 3) {
        elem1 = 'nameHeb';
    }

    $.each($('.container'), function (key, value) {
        let ids = [], obj, i, len;
        let children = $(this).find('.personWrapper');
        for (i = 0, len = children.length; i < len; i++) {
            obj = {};
            obj.element = children[i];
            let elem2 = $(children[i]).attr(elem1);
            switch (kind) {
                case 1: case 2:
                    obj.idNum = new Date(elem2);
                    break;
                case 3:
                    obj.idNum = elem2;
                    break;
                case 4:
                    obj.idNum = parseInt(elem2.replace(/[^\d]/g, ""), 10);
                    break;
            }
            ids.push(obj);
        }

        switch (kind) {
            case 1:
                switch (counter) {
                    case 1:
                        ids.sort((a, b) => { return (b.idNum - a.idNum); });
                        $('.ageSortBtn').attr('class', 'ageSortBtn fa-solid fa-arrow-down-1-9');
                        counter = 2;
                        break;
                    case 2:
                        ids.sort((a, b) => { return (a.idNum - b.idNum); });
                        $('.ageSortBtn').attr('class', 'ageSortBtn fa-solid fa-arrow-down-9-1');
                        counter = 1;
                        break;
                }
                $('.sortWrapper').attr('kind', kind);
                $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 2:
                    switch (counter) {
                        case 1:
                            ids.sort((a, b) => { return (b.idNum - a.idNum); });
                            counter = 2;
                            break;
                        case 2:
                            ids.sort((a, b) => { return (a.idNum - b.idNum); });
                            counter = 1;
                            break;
                    }
                    $('.sortWrapper').attr('kind', kind);
                    $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 3:
                switch (counter) {
                    case 1:
                        ids.sort((a, b) => {
                            return a.idNum.localeCompare(b.idNum);
                        });
                        $('.nameSortBtn').attr('class', 'nameSortBtn fa-solid fa-arrow-down-a-z');
                        counter = 2;
                        break;
                    case 2:
                        ids.sort((a, b) => {
                            return b.idNum.localeCompare(a.idNum);
                        });
                        $('.nameSortBtn').attr('class', 'nameSortBtn fa-solid fa-arrow-down-z-a');
                        counter = 1;
                        break;
                }
                $('.sortWrapper').attr('kind', kind);
                $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 4:
                $('.closestBirth').html('');
                $('.birthdayWish').html('');

                if (birthdayToday) {
                    $('.personWrapper').first().remove();
                }
                
                $('.spinnerWrapper').show();
                $('.groupSortBtn').css('pointer-events', 'none');
                showFamily(familyNum, 2);
                setTimeout(() => {
                    $('.spinnerWrapper').hide();
                }, 500);
                break;
        }

        for (i = 0; i < ids.length; i++) {
            $(this).append(ids[i].element);
        }
    });
}

const resetIcons = () => {
    $('.ageSortBtn').attr('class', 'ageSortBtn fa-solid fa-arrow-down-9-1');
    $('.nameSortBtn').attr('class', 'nameSortBtn fa-solid fa-arrow-down-z-a');
}

const removePopup = (container) => {
    $(document).mouseup((e) => {
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            e.stopPropagation();
            $(document).off('mouseup');
        }
    })
}

const closeCurrentPopup = (that) => {
    $($(that)[0].parentElement.parentElement.parentElement).fadeOut(150);
}

const capitalize = (str) => {
    str = str.split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
