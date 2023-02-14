

// function lastFiveWorkingDaysCalulator(inputDate,publicHolidaysforCompany2023) {
  
//   const listOfMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];  
//   let lastFiveWorkingDays = {};
//   let counter = 0;

//   while (counter < 5) {

//     if ( inputDate.getDay() !== 0 && inputDate.getDay() !== 6 && 
//     !(publicHolidaysforCompany2023[listOfMonths[inputDate.getMonth()]].includes(inputDate.getDate())) ) 
//     {
//       counter++;
//       lastFiveWorkingDays[`LastWorkingDay${counter}`] = inputDate.toDateString();
//     }

//     inputDate.setDate(inputDate.getDate() - 1);
//   }

//   return lastFiveWorkingDays;

// }


// //Sample input date
// const inputDate = new Date("2023-03-09");

// // holiday's data for a sample company     
// const publicHolidaysforCompany2023 = {
//     January : [1,26],
//     February : [],
//     March : [8,22],
//     April : [7],
//     May : [1],
//     June : [29],
//     July : [],
//     August : [15],
//     September : [19],
//     October:[2,24],
//     November : [12,13],
//     December : [25]
// };


// const lastFiveWorkingDays = lastFiveWorkingDaysCalulator(inputDate,publicHolidaysforCompany2023);

// console.log(lastFiveWorkingDays);




const listOfMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


function generateNWorkingDaysList(publicHolidaysforCompany2023, weekend) {
  let workingDays = {};
  let date = new Date(2023, 0, 1);
  while (date.getFullYear() != 2024) {
    if (
      !publicHolidaysforCompany2023[listOfMonths[date.getMonth()]].includes(
        date.getDate()
      ) &&
      ((date.getDay() == 0 && !weekend.sunOff) ||
        (date.getDay() == 6 && !weekend.satOff) ||
        (date.getDay() != 0 && date.getDay() != 6))
    )
     {
      if (!workingDays[listOfMonths[date.getMonth()]]) {
        workingDays[listOfMonths[date.getMonth()]] = [];
      } else {
        workingDays[listOfMonths[date.getMonth()]].push(date.getDate());
      }
    }
    date.setDate(date.getDate() + 1);
  }
  console.log('working days for 2023', workingDays)
  return function (inputDate, numberOfDaysToConsider) {
    let result = [],counter = -1;
    while (numberOfDaysToConsider != 0) {
      let info = {};
      if (
        workingDays[listOfMonths[inputDate.getMonth()]].includes(
          inputDate.getDate()
        )
      ) {
        info.date = inputDate.toISOString();
        info.delta = counter--;
        result.push(info);
        numberOfDaysToConsider++;
      }
      inputDate.setDate(inputDate.getDate() - 1);
    }
    return result;
  };
}


const publicHolidaysforCompany2023 = {
  January: [1, 26],
  February: [],
  March: [8, 22],
  April: [7],
  May: [1],
  June: [29],
  July: [],
  August: [15],
  September: [19],
  October: [2, 24],
  November: [12, 13],
  December: [25],
};

const inputDate = new Date("2023-01-27");

let getWorkingDayList = generateNWorkingDaysList(publicHolidaysforCompany2023, {
  satOff: false,
  sunOff: true,
});

const numberOfWorkingDays = -10;

let out = getWorkingDayList(inputDate, numberOfWorkingDays);

console.log(`Last ${Math.abs(numberOfWorkingDays)} working days are`, out);