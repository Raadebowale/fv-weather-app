const months = [
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

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthYear = document.querySelector("#month-year");
const date = document.querySelector("#date");

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const day = currentDate.getDate();
const dayofTheWeek = currentDate.getDay();

console.log(year);
console.log(month);
console.log(day);

monthYear.textContent = `${months[month]} ${year}`;
date.textContent = `${days[dayofTheWeek]}, ${monthsShort[month]} ${day}, ${year}`;
