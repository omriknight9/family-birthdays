function changeToHeb() {
    $('#birthdayToday').empty();
    $('.closestBirth, .birthdayWish').remove();

    lang = 2;
    $('#langBtnHe').css('pointer-events', 'none');
    $('#langBtnEn').css('pointer-events', 'all');

    $("head").append("<link rel='stylesheet' type='text/css' href='css/main_he.css' id='hebCss'/>");
    $('title').html('ימי הולדת - משפחה');

    $('h1').hide().html('ימי הולדת - משפחה').fadeIn('slow');
    $('#search').hide().attr('placeholder', 'חפש במשפחה').fadeIn('slow');

    $('#closestBirth').html('');
    $('#BirthdayWish').html('');

    $('.sortBtn').hide().html('מיין').fadeIn('slow');
    $('.shalevsBtn').hide().html('משפחת שלו').fadeIn('slow');
    $('.waizingersBtn').hide().html('משפחת ויזינגר').fadeIn('slow');
    $('.alayevsBtn').hide().html('משפחת אלייב').fadeIn('slow');

    $('.ageSortBtn').hide().html('לפי גיל').fadeIn('slow');
    $('.nameSortBtn').hide().html('לפי שם').fadeIn('slow');
    $('.groupSortBtn').hide().html('לפי קבוצה').fadeIn('slow');
    $('.calendarSortBtn').hide().html('לפי תאריך').fadeIn('slow');

    $('#checkBirthdaysLink').hide().html('בדוק באיזה יום נופל היומולדת בשנים הקרובות').fadeIn('slow');

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
    $('#birthdayToday').empty();
    $('.closestBirth, .birthdayWish').remove();
    
    lang = 1;
    $('#langBtnEn').css('pointer-events', 'none');
    $('#langBtnHe').css('pointer-events', 'all');

    $('#hebCss').remove();
    $('title').html('Family Birthdays');
    $('h1').hide().html('Family Birthdays').fadeIn('slow');
    $('#search').hide().attr('placeholder', 'Search A Family Member').fadeIn('slow');

    $('#closestBirth').html('');
    $('#BirthdayWish').html('');

    $('.sortBtn').hide().html('Sort').fadeIn('slow');
    $('.shalevsBtn').hide().html('Shalevs').fadeIn('slow');
    $('.waizingersBtn').hide().html('Waizingers').fadeIn('slow');
    $('.alayevsBtn').hide().html('Alayevs').fadeIn('slow');

    $('.ageSortBtn').hide().html('By Age').fadeIn('slow');
    $('.nameSortBtn').hide().html('By Name').fadeIn('slow');
    $('.groupSortBtn').hide().html('By Group').fadeIn('slow');
    $('.calendarSortBtn').hide().html('By Date').fadeIn('slow');

    $('#checkBirthdaysLink').hide().html('Check What Day Is The Birthday For Upcoming Years').fadeIn('slow');

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
