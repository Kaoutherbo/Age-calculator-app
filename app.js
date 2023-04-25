// For the input date
  const day=document.getElementById('day');
  const month=document.getElementById('month');
  const year=document.getElementById('year');
//To display the output results in their places
  const labels=document.getElementsByTagName('label');
  const error=document.getElementsByClassName('error');
  const submitButton=document.getElementById('submit');
  const spans=document.getElementsByTagName('span');

const date = new Date();//Function defined in java script that determin the current date from the device

//Variables for the current day and month and year
let currentDay= date.getDate();
let currentMonth= date.getMonth()+1;
let currentYear= date.getFullYear();

//An array for the errrors messages
const typeOferror=[
  "",
  "This field is required",
  "Must be a valid month",
  "Must be a valid year",
  "Must be a valid day",
  "Must be a valid date",
];

//Function that determines and display the error state 
const errorState = (numberofError,typeofDate,typeOferror,color)=>{
  error[numberofError].innerHTML=typeOferror;
  labels[numberofError].style.color=color;
  typeofDate.style.borderColor=color;
}

//Function that checks if it is a leap year or not 
const  isLeapYear = (day,month,year)=>{
month--;
const fullDate=new Date(year,month,day);
if(day==fullDate.getDate() && month==fullDate.getMonth() && year==fullDate.getFullYear()){
  return true;
}
else{
  return false;
}
}

//Function that calculates the age 
const CalculateAge = ()=>{
  let newYear=Math.abs(Number(currentYear) - Number(year.value));

  let newMonth=0;
  if(currentMonth > month.value){
    newMonth=Number(currentMonth)-Number(month.value);
  }
  else if(currentMonth ==month.value && currentDay >= day.value){
    newMonth=11;
  }
  else{
    newYear--;
    newMonth=12+Number(currentMonth)-Number(month.value);
  }
  let newDay=0;
  if(currentDay >= day.value){
    newDay=Number(currentDay)-Number(day.value);
  }else{
    newMonth--;
    if(isLeapYear(day.value,month.value,year.value)){
      newDay=30+Number(currentDay)-Number(day.value);
    }
    else{
     
      newDay = Number(currentDay)-Number(day.value);
    }
  }
  spans[0].innerHTML=newYear;
  spans[1].innerHTML=newMonth;
  spans[2].innerHTML=newDay;
}

//Function that checks if it is a valid day
const isCorrectDay = ()=>{
  if(day.value==""){
    errorState(0,day,typeOferror[1],"#ff5757");
    return false;
  }
  else if(day.value <= 0|| day.value > 31){
    errorState(0,day,typeOferror[4],"#ff5757");
    return false;
  }
  else if(isLeapYear(day.value,month.value,year.value)==false){
    errorState(0,day,typeOferror[5],"#ff5757");
    return false;
  }else{
    errorState(0,day,typeOferror[0],"");
    return true;
  }
}

//Function that checks if it is a valid month
const isCorrectMonth = () => {
  if (month.value == "") {
    errorState(1, month, typeOferror[1], "#ff5757");
    return false;
  } else if (month.value <= 0 || month.value > 12) {
    errorState(1, month, typeOferror[2], "#ff5757");
    return false;
  }else {
    errorState(1, month, typeOferror[0], "");
    return true;
  }
}

//Function that checks if it is a valid year
const isCorrectYear = () => {
  if (year.value == "") {
    errorState(2, year, typeOferror[1], "#ff5757");
    return false;
  } else if (year.value > currentYear || year.value < 0) {
    errorState(2, year, typeOferror[3], "#ff5757");
    return false;
  } else if (year.value == currentYear && month.value > currentMonth) {
    errorState(1, month, typeOferror[2], "#ff5757");
    return false;
  } else if (year.value == currentYear && day.value > currentDay) {
    errorState(0, month, typeOferror[4], "#ff5757");
    return false;
  }else {
    errorState(2, year, typeOferror[0], "");
    return true;
  }
}

//Check the errors and display the results 
submitButton.addEventListener('click',()=>{
    isCorrectDay();
    isCorrectMonth();
    isCorrectYear();
    if(isCorrectDay() && isCorrectMonth() && isCorrectYear() ){
      CalculateAge();
  }   
})