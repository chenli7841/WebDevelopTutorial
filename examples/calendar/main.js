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



function onSelectYearAndMonth() {
    let selection = document.getElementById('year_month_select').value;
    const parts = selection.split('-')
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const tableElement = generateTableBody(year, month);
    document.getElementById('new-table-body').innerHTML = tableElement;
}

onSelectYearAndMonth();

function generateTableBody(year, month) {
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

        courses.forEach(c => {
            tableElement = `${tableElement} <div> ${c.name}: ${c.from}-${c.to}</div>`;
        });
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


