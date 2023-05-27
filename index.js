/* Your Code Here */
//populate employee data fields
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

//create + assign
function createEmployeeRecords(newEmpData) {
    return newEmpData.map(function (employeeData) {
        return createEmployeeRecord(employeeData);
    });
}

//clock in record
function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this;
}

//add object+keys to time out event
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this;
}

//find hours worked by date
function hoursWorkedOnDate(dateWorked) {
    let timeInEvent = this.timeInEvents.find(function(e) {
        return e.date === dateWorked
    })
    let timeOutEvent = this.timeOutEvents.find(function(e) {
        return e.date === dateWorked
    })
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

//find wages earned by date
function wagesEarnedOnDate(dateEarned) {
    let wage = hoursWorkedOnDate.call(this, dateEarned) * this.payPerHour;
    return parseFloat(wage.toString())
}

//calculate all hours worked and then turn into overall wages
function calculatePayroll(fullPayroll) {
    return fullPayroll.reduce(function(totalPayroll, record) {
        return totalPayroll + allWagesFor.call(record)
    }, 0)
}


function findEmployeeByFirstName(eventObj, firstNameString) {
    return eventObj.find(function(eventObj) {
        return eventObj.firstName === firstNameString
    })
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

