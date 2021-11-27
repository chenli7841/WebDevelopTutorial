function onSelectYearAndMonth() {
    let selection = document.getElementById('year_month_select').value;
    console.log("You selected", selection);
    if (selection === '2021-11') {
        document.getElementById('table-2021-11').style.display = ''; // show
        document.getElementById('table-2021-12').style.display = 'none'; // hide
    } else if (selection === '2021-12') {
        document.getElementById('table-2021-11').style.display = 'none'; // hide
        document.getElementById('table-2021-12').style.display = ''; // show
    }
}

function generateTableBody(year, month) {
    const firstDayOfMonth = new Date(year + "-" + month + "-1");
    // use a loop to go through each day in the month
    // figure out the Day Of Week, and decide where to insert it in the table
    // a bit challenging
}