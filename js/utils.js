const hasClass = (elem, className) => {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

const addClass = (elem, className) => {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

const toggleClass = (elem, className) => {
    let newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

const chosenMonth = (day, month) => {
    
    switch(month) {
        case '01': case 01:
            if (day < 20) {
                return '/capricorn.png';
            } else {
                return '/aquarius.png';
            }
        case '02': case 02:
            if (day < 19) {
                return '/aquarius.png';
            } else {
                return '/pisces.png';
            }
        case '03': case 03:
            if (day < 21) {
                return '/pisces.png';
            } else {
                return '/aries.png';
            }
        case '04': case 04:
            if (day < 20) {
                return '/aries.png';
            } else {
                return '/taurus.png';
            }
        case '05': case 05:
            if (day < 21) {
                return '/taurus.png';
            } else {
                return '/gemini.png';
            }
        case '06': case 06:
            if (day < 21) {
                return '/gemini.png';
            } else {
                return '/cancer.png';
            }
        case '07': case 07:
            if (day < 23) {
                return '/cancer.png';
            } else {
                return '/leo.png';
            }
        case '08': case 08:
            if (day < 23) {
                return '/leo.png';
            } else {
                return '/virgo.png';
            }
        case '09': case 09:
            if (day < 23) {
                return '/virgo.png';
            } else {
                return '/libra.png';
            }
        case '10': case 10:
            if (day < 23) {
                return '/libra.png';
            } else {
                return '/scorpio.png';
            }
        case '11': case 11:
            if (day < 22) {
                return '/scorpio.png';
            } else {
                return '/sagittarius.png';
            }
        case '12': case 12:
            if (day < 22) {
                return '/sagittarius.png';
            } else {
                return '/capricorn.png';
            }
    }
}
