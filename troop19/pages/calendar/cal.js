// JavaScript source code
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var d = new Date();
var cmo = d.getMonth();
var mo = d.getMonth();
var y = d.getFullYear();
var day = d.getDate();
var firstDayElem;
var moFD = new Date(y, mo, 1);
var hide = "hide";
var cSday = "wed";
var prevSelBtn = 1;
var selectedBtn = day;
var buttons = new Array();


window.onload = function () {
    firstDayElem = document.getElementById("startday");
    update();
    for (var i = 1; i < 32; i++) {
        buttons[i] = document.getElementById(i);
    }
    for (var i = 1; i < 32; i++) {
        buttons[i].addEventListener("click", btnOnclick(i));
    }
    getEvents(2019, 8);
}
function btnOnclick(i) {
    return function () {
        selectedBtn = i;
        update();
    };
}

function incrementMonth() {
    mo++;
    if (mo > 11) {
        mo = 0;
    }
    update();
}
function decrementMonth() {
    mo--;
    if (mo < 0) {
        mo = 11;
    }
    update();
}
function incrementYear() {
    y++;
    update();
}
function decrementYear() {
    y--;
    update();
}

function update() {
    if (selectedBtn != prevSelBtn) {
        removeClass(document.getElementById(prevSelBtn), "selectedBtn");
        addClass(document.getElementById(selectedBtn), "selectedBtn");
        prevSelBtn = selectedBtn;
    }
    document.getElementById("monthName").innerHTML = months[mo];
    document.getElementById("year").innerHTML = y;
    if (lengths[mo] == 31) {
        removeClass(document.getElementById(29), hide);
        removeClass(document.getElementById(30), hide);
        removeClass(document.getElementById(31), hide);
    }
    if (lengths[mo] == 30) {
        addClass(document.getElementById(31), hide);
        removeClass(document.getElementById(29), hide);
        removeClass(document.getElementById(30), hide);
    }
    if (lengths[mo] == 28) {
        addClass(document.getElementById(31), hide);
        addClass(document.getElementById(30), hide);
        addClass(document.getElementById(29), hide);
        if ((y - 2020) % 4 == 0) {
            removeClass(document.getElementById(29), hide);
        }
    }
    for (var i = 0; i < 7; i++) {
        removeClass(firstDayElem, cSday);
    }
    moFD = new Date(y, mo, 1);
    addClass(firstDayElem, days[moFD.getDay()]);
    cSday = days[moFD.getDay()];
    if (mo == cmo) {

        addClass(document.getElementById(day), "todayBtn");
    } else {
        removeClass(document.getElementById(day), "todayBtn");
    }
    if (moFD.getDay() + lengths[mo] > 35) {
        var all = document.getElementsByClassName("cButton");
        for (var i = 0; i < all.length; i++) {
            all[i].style.height = "15%";
        }
    }
    else {
        var all = document.getElementsByClassName("cButton");
        for (var i = 0; i < all.length; i++) {
            all[i].style.height = "18%";
        }
    }
    document.getElementById("day").innerHTML = "";
    var event = getEvents(y, mo + 1);
    console.log(mo);
    for (var i = 1; i < 32; i++) {
        removeClass(document.getElementById(i), "specialEvent");
    }
    for (var i = 0; i < event.length; i++) {
        if (hasClass(event[i], "d" + selectedBtn)) {
            if (hasClass(event[i], "d" + day)) {
                var addText = "<div class=\"todayEvent\"><div class=\"header\">" + event[i].querySelector("#title").innerHTML +  
                    "<\/div>" + "<div class=\"eventDay\" style=\"font-size:15px\">today<\/div>" + "<div class=\"content text_box\">" + event[i].querySelector("#content").innerHTML + "<\/div><\/div>";
            } else {
                var addText = "<div class=\"todayEvent\"><div class=\"header\">" + event[i].querySelector("#title").innerHTML +
                    "<\/div>" + "<div class=\"eventDay\" style=\"font-size:27px; padding:0; height:35px\">" + selectedBtn + "<\/div>" + "<div class=\"content text_box\">" + event[i].querySelector("#content").innerHTML + "<\/div><\/div>";
            }
            console.log(addText);
            document.getElementById("day").innerHTML += addText;
        }
        for (var j = 1; j < 32; j++) {
            if (hasClass(event[i], "d" + j)) {
                addClass(document.getElementById(j), "specialEvent");
            }
        }
    }
}

function getEvents(year, month) {
    var events = document.getElementsByClassName("event " + year + " m" + month);
    return events;
}


function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className)
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}