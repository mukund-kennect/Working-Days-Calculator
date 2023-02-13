

function lastFiveWorkingDaysCalulator(inputDate,publicHolidaysforCompany2023) {
  
  const listOfMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];  
  let lastFiveWorkingDays = {};
  let counter = 0;

  while (counter < 5) {

    if ( inputDate.getDay() !== 0 && inputDate.getDay() !== 6 && 
    !(publicHolidaysforCompany2023[listOfMonths[inputDate.getMonth()]].includes(inputDate.getDate())) ) 
    {
      counter++;
      lastFiveWorkingDays[`LastWorkingDay${counter}`] = inputDate.toDateString();
    }

    inputDate.setDate(inputDate.getDate() - 1);
  }

  return lastFiveWorkingDays;

}


//Sample input date
const inputDate = new Date("2023-03-09");

// holiday's data for a sample company     
const publicHolidaysforCompany2023 = {
    January : [1,26],
    February : [],
    March : [8,22],
    April : [7],
    May : [1],
    June : [29],
    July : [],
    August : [15],
    September : [19],
    October:[2,24],
    November : [12,13],
    December : [25]
};


const lastFiveWorkingDays = lastFiveWorkingDaysCalulator(inputDate,publicHolidaysforCompany2023);

console.log(lastFiveWorkingDays);
