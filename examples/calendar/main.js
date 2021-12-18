/*************** data  ***************/
const courses = [
    {
        name: "Function",
        from: 9,
        to: 10
    },
    {
        name: "Physics",
        from: 10,
        to: 11
    },
    {
        name: "Chemistry",
        from: 13,
        to: 14
    }
]

const acitivites = [
    {
        name: "Piano Concert",
        from: 10,
        to: 11,
        date: new Date("2021-12-18")
    },
    {
        name: "Math Exam",
        from : 13,
        to: 14,
        date: new Date("2021-12-20")
    },
    {
        name: "Biology Lab",
        from : 14,
        to: 15,
        date: new Date("2021-12-20")
    },
    {
        name: "Physics Mid-term",
        from : 10,
        to: 11,
        date: new Date("2021-11-05")
    },
    {
        name: "Math Assignments 2 Due",
        from : 9,
        to: 10,
        date: new Date("2021-11-30")
    }
]



function onSelectYearAndMonth(selectorId, tableBodyId, page) {
    let selection = document.getElementById(selectorId).value;
    const parts = selection.split('-')
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const tableElement = generateTableBody(year, month, page);
    document.getElementById(tableBodyId).innerHTML = tableElement;
}

onSelectYearAndMonth('timetable-year-month-select', 'timetable-table-body', 'timetable');
onSelectYearAndMonth('activities-year-month-select', 'activities-table-body', 'activities');

function generateTableBody(year, month, page) {
    const firstDayOfMonth = new Date(year + "-" + month + "-1");
    let currentDate = firstDayOfMonth;

    let tableElement = '';

    while (currentDate.getMonth() === month - 1) {
        const dayOfWeek = currentDate.getDay();

        // do something special for the month first day.
        if (currentDate.getDate() === 1) {
            tableElement = tableElement + '<tr>'
            if (currentDate.getDay() === 0) {
                // happens to be Sunday, then good, it's the first column in the row
                tableElement = tableElement + '<td>' + currentDate.getDate() + '</td>';
            } else {
                // not Sunday, we have to prepend a few empty columns in the rows before this day
                // how many to prepend?
                for (let i = 0; i < currentDate.getDay(); i++) {
                    tableElement = tableElement + '<td></td>';
                }
                tableElement = tableElement + '<td>' + currentDate.getDate() + '</td>';
            }
            currentDate = addOneDay(currentDate);
            continue;
        }

        // start a new row only when it's Sunday (the 1st column in a row)
        if (dayOfWeek === 0) {
            tableElement = tableElement + '<tr>';
        }

        tableElement = tableElement + '<td>' + currentDate.getDate();

        if (page === 'timetable') {
            courses.forEach(c => {
                tableElement = `${tableElement} <div class='contentLine'> ${c.name}: ${c.from}-${c.to}</div>`;
            });
        } else if (page === 'activities') {
            acitivites.forEach(a => {
                activityDate = a.date;
                if (currentDate.getUTCFullYear() === activityDate.getUTCFullYear() && currentDate.getUTCMonth() === activityDate.getUTCMonth() && currentDate.getUTCDate() === activityDate.getUTCDate()) {
                    tableElement = `${tableElement} <div class='contentLine'> ${a.name}: ${a.from}-${a.to}</div>`;
                }
            });
        }
        tableElement = tableElement + '</td>';

        // end the row when it's Saturday (the last column in a row)
        if (dayOfWeek === 6) {
            tableElement = tableElement + '</tr>';
        }

        currentDate = addOneDay(currentDate);
    }

    tableElement = tableElement + '</tr>'
    return tableElement;
}

function addOneDay(oldDate) {
    oldDate.setDate(oldDate.getDate() + 1);
    return oldDate;
}

function getUTCFormatDate(year, month, dayOfMonth) {
    let outputText = year + '-';
    if (month < 10) {
        outputText = outputText + '0' + month + '-';
    } else {
        outputText = outputText + month + '-';
    }
    if (dayOfMonth < 10) {
        outputText = outputText + '0' + dayOfMonth;
    } else {
        outputText = outputText + dayOfMonth;
    }
    return outputText;
}

function navigate(location) {
    if (location === 'timetable') {
        document.getElementById('timetable_section').style.display = '';
        document.getElementById('acitivites_section').style.display = 'none';
        document.getElementById('navBar_timetable_button').style.backgroundColor = '#444';
        document.getElementById('navBar_activities_button').style.backgroundColor = '';
    } else if (location === 'activities') {
        document.getElementById('timetable_section').style.display = 'none';
        document.getElementById('acitivites_section').style.display = '';
        document.getElementById('navBar_timetable_button').style.backgroundColor = '';
        document.getElementById('navBar_activities_button').style.backgroundColor = '#444';
    }
}


