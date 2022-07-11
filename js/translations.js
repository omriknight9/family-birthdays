
const changeToHeb = (type) => {
    lang = 2;
    $('#birthdayToday').empty();
    $('.closestBirth, .birthdayWish').remove();
    $('#langBtnHe').css({'pointer-events': 'none', 'opacity': '.7'});
    $('#langBtnEn').css({'pointer-events': 'all', 'opacity': '1'});
    $('#langBtnHe span').html('עברית');
    $('#langBtnEn span').html('אנגלית');
    $("head").append("<link rel='stylesheet' type='text/css' href='css/main_he.css' id='hebCss'/>");
    $('title').html('ימי הולדת - משפחה');
    $('h1').hide().html('ימי הולדת - משפחה').fadeIn('slow');
    $('#search').hide().attr('placeholder', 'חפש/י במשפחה').fadeIn('slow');
    $('#closestBirth').html('');
    $('#BirthdayWish').html('');
    $('.sortBtn').hide().html('מיין/מייני').fadeIn('slow');
    $('.ageSortBtn').hide().html('לפי גיל').fadeIn('slow');
    $('.nameSortBtn').hide().html('לפי שם').fadeIn('slow');
    $('.groupSortBtn').hide().html('לפי קבוצה').fadeIn('slow');
    $('.calendarSortBtn').hide().html('לפי תאריך').fadeIn('slow');
    $('#checkBirthdaysLink').hide().html('בדוק/בדקי באיזה יום נופל היומולדת בשנים הקרובות').fadeIn('slow');
    $('.hebCaneldar').show();
    $('.engCaneldar').hide();
    $('.popupBtn').hide().html('סגור/סגרי').fadeIn('slow');
    $('#langMenuHeader').html('שפה');
    $('#familyMenuHeader').html('משפחה');
    $('#shalevsLi span').html('משפחת שלו');
    $('#waizingersLi span').html('משפחת ויזינגר');
    $('#alayevsLi span').html('משפחת אלייב');

    if (type == 1) {
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
}

const changeToEng = () => {
    lang = 1;
    $('#birthdayToday').empty();
    $('.closestBirth, .birthdayWish').remove();
    $('#langBtnEn').css({'pointer-events': 'none', 'opacity': '.7'});
    $('#langBtnHe').css({'pointer-events': 'all', 'opacity': '1'});
    $('#langBtnHe span').html('Hebrew');
    $('#langBtnEn span').html('English');
    $('#hebCss').remove();
    $('title').html('Family Birthdays');
    $('h1').hide().html('Family Birthdays').fadeIn('slow');
    $('#search').hide().attr('placeholder', 'Search A Family Member').fadeIn('slow');
    $('#closestBirth').html('');
    $('#BirthdayWish').html('');
    $('.sortBtn').hide().html('Sort').fadeIn('slow');
    $('.ageSortBtn').hide().html('By Age').fadeIn('slow');
    $('.nameSortBtn').hide().html('By Name').fadeIn('slow');
    $('.groupSortBtn').hide().html('By Group').fadeIn('slow');
    $('.calendarSortBtn').hide().html('By Date').fadeIn('slow');
    $('#checkBirthdaysLink').hide().html('Check What Day Is The Birthday For Upcoming Years').fadeIn('slow');
    $('.hebCaneldar').hide();
    $('.engCaneldar').show();
    $('.popupBtn').hide().html('Close').fadeIn('slow');
    $('#langMenuHeader').html('Lang');
    $('#familyMenuHeader').html('Family');
    $('#shalevsLi span').html('Shalevs');
    $('#waizingersLi span').html('Waizingers');
    $('#alayevsLi span').html('Alayevs');
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
