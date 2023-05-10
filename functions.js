function calcDelay(s1hrs, s1min, s2hrs, s2min) {
    var s1Time = (s1hrs * 60) + s1min;
    var s2Time = (s2hrs * 60) + s2min;
    var delayMin = s2Time - s1Time;

    if (compareIfDelay(this.getField("On Surv Briefed").value, this.getField("On Surv1").value) === -1) {
        event.value = "";
    } else if (compareIfDelay(this.getField("On Surv Briefed").value, this.getField("On Surv1").value) === 0) {
        event.value = "";
    } else {
        event.value = delayMin;
    }
}

function setFieldStr(fieldString1, fieldString2) {
    var s1 = this.getField(fieldString1).value.toString();
    var s2 = this.getField(fieldString2).value.toString();
    return {
        's1': s1,
        's2': s2
    };
}

function initCalc(fieldString1, fieldString2) {
    timeObj = sliceTime(setFieldStr(fieldString1, fieldString2).s1, setFieldStr(fieldString1, fieldString2).s2);
    validateTime(timeObj.s1hrs, timeObj.s1min, timeObj.s2hrs, timeObj.s2min);
}

function sliceTime(s1, s2) {
    var s1hrs = parseInt(("00" + s1.slice(0, -2).substr(-2, 2)));
    var s1min = parseInt(s1.slice(-2));
    var s2hrs = parseInt(("00" + s2.slice(0, -2).substr(-2, 2)));
    var s2min = parseInt(s2.slice(-2));
    return {
        's1hrs': s1hrs,
        's1min': s1min,
        's2hrs': s2hrs,
        's2min': s2min
    };
}

function validateTime(s1hrs, s1min, s2hrs, s2min) {
    if (s1hrs < 0 || s1hrs > 23 || s1min < 0 || s1min > 59) {
        return event.value = "";
    }
    if (s2hrs < 0 || s2hrs > 23 || s2min < 0 || s2min > 59) {
        return event.value = "";
    }
}

function calcFltTime(f1, f2) {
    initCalc(f1, f2);
    return decTimeSum(timeObj.s1hrs, timeObj.s1min, timeObj.s2hrs, timeObj.s2min);
}

function calcTimeDiff(s1hrs, s1min, s2hrs, s2min) {
    var timeDiffMins;
    if (s1min > s2min) {
        timeDiffMins = 60 + s2min - s1min;
        hrsR = s2hrs - 1 - s1hrs;
    } else {
        timeDiffMins = s2min - s1min;
        hrsR = s2hrs - s1hrs;
    }
    var timeDiffHrs = hrsR < 0 ? hrsR + 24 : hrsR;
    return event.value = timeDiffHrs * 60 + timeDiffMins;
}

function compareIfDelay(time1, time2) {
    var [hours1, minutes1] = time1;
    var [hours2, minutes2] = time2;
    var date1 = new Date();
    var date2 = new Date();
    date1.setHours(hours1, minutes1);
    date2.setHours(hours2, minutes2);

    if (date1 > date2) {
        return 1;
    } else if (date1 < date2) {
        return -1;
    } else {
        return 0;
    }
}

function decTime(s1hrs, s1min, s2hrs, s2min) {
    if (s1min > s2min) {
        var minR = 60 + s2min - s1min;
        var hrsR = s2hrs - 1 - s1hrs;
    } else {
        var minR = s2min - s1min;
        var hrsR = s2hrs - s1hrs;
    }

    if (hrsR < 0) {
        var hrsShift = hrsR + 24;
    } else var hrsShift = hrsR;
    event.value = hrsShift + (minR / 60) + 0.016;
}

function decTimeSum(s1hrs, s1min, s2hrs, s2min) {
    if (s1min > s2min) {
        var minR = 60 + s2min - s1min;
        var hrsR = s2hrs - 1 - s1hrs;
    } else {
        var minR = s2min - s1min;
        var hrsR = s2hrs - s1hrs;
    }

    if (hrsR < 0) {
        var hrsShift = hrsR + 24;
    } else var hrsShift = hrsR;
    return hrsShift + (minR / 60) + 0.016;
}
