if(localStorage.getItem("Name")!==null) {
   var selfclicker = document.getElementById("but1");
   selfclicker.click();
   if(localStorage.getItem("Target")!==null){
     var selfclicker1 = document.getElementById("but2");
     selfclicker1.click();

     if(localStorage.getItem("foodItem")!==null){
      var foodItems = localStorage.getItem("foodItem").split(';');
      foodItems.forEach(function(item){

        var li = document.createElement("li");
        var t = document.createTextNode(item);
        li.appendChild(t);
        document.getElementById("list-food").appendChild(li);

      })
     }
   }
 }

 function bmrcal() {
  var cal;
  if(gender=="female"){
    bmr= 10*(weight) + 6.25*(height) - 5*age - 161;
    document.getElementById('User-Image').innerHTML='<img id="fempic" src="user-female.png">';
    document.getElementById('fempic').style.width="200px";
  }
  else{
    bmr= 10*(weight) + 6.25*(height) - 5*age +5;
    document.getElementById('User-Image').innerHTML='<img id="malepic" src="user-male.png">';
    document.getElementById('malepic').style.width="200px";
  }
  bmr*=1.55;
  console.log(bmr);
  document.getElementById('form1').style.display='none';
  document.getElementById('font1').style.display='none';
  document.getElementById('but1').style.display='none';
  document.getElementById('wel-text').innerHTML="Hello "+name+"! Your daily calorie requirement is approximately "+bmr+" KCalories.<br><br> Set your Target accordingly!";
  document.getElementById('but2').style.display="block";
  document.getElementById('targetCal').style.display="block";
  document.getElementById('wel-text').style.margin="20px";

}

function save(){

 if(localStorage.getItem("Name")===null)
 {
   name=document.getElementById("Name").value;
   age=document.getElementById("age").value;
   height=document.getElementById("height").value;
   weight=document.getElementById("Weight").value;
   gender="unknown";
   var x = document.getElementById("male").checked;
   var y = document.getElementById("female").checked;
   if(x==true){
    gender="male";}
    else if(y==true){
      gender="female";}

      if(name===""||age===""||height===""||weight==""|| gender==="unknown")
        {alert("Enter all the details!");}

      else{
        window.alert("Hello "+name+" Age:"+age);
        localStorage.setItem("Name",name);
        localStorage.setItem("Age",age);
        localStorage.setItem("Height",height);
        localStorage.setItem("Weight",weight);
        localStorage.setItem("Gender",gender);
        bmrcal();
      }
    }
    else{
      name=localStorage.getItem("Name");
      age=localStorage.getItem("Age");
      height=localStorage.getItem("Height");
      weight=localStorage.getItem("Weight");
      gender=localStorage.getItem("Gender");
      bmrcal();
    }
  }

  function DailyDiet(){

    if(localStorage.getItem("ConsumedCal")===null)
      cal=0;
    else
      cal=parseFloat(localStorage.getItem("ConsumedCal"));
    if(localStorage.getItem("Target")===null)
    {
      targetCal=document.getElementById('targetCal').value;
      if (targetCal === '') {
        alert("Set the Target to continue..");
      } else {

        document.getElementById('wel-text').style.display='none';
        document.getElementById('User-Image').style.display='none';
        document.getElementById('head-text').style.display='none';
        document.getElementById('but2').style.display='none';
        document.getElementById('targetCal').style.display='none';
        document.getElementById('Intro-text').innerHTML="Dashboard";
        document.getElementById('Intro-text').style.color="#0900c3";
        document.getElementById('list-food').style.display="block";
        document.getElementById('form2').style.display="block";
        document.getElementById('form3').style.display="block";
        document.getElementById('bluebtn').style.display="block";
        document.getElementById('redbtn').style.display="block";
        document.getElementById('clock').style.display="block";


        localStorage.setItem("Target",targetCal);

      //Have to Add function to increment cal consumed..
      document.getElementById('cal').innerHTML="Your Calorie Intake till now is : "+cal+" KCal / "+targetCal+" KCal";
    }
  }
  else
  {
    targetCal=localStorage.getItem("Target");

    document.getElementById('wel-text').style.display='none';
    document.getElementById('User-Image').style.display='none';
    document.getElementById('head-text').style.display='none';
    document.getElementById('but2').style.display='none';
    document.getElementById('targetCal').style.display='none';
    document.getElementById('Intro-text').innerHTML="Dashboard";
    document.getElementById('Intro-text').style.color="#0900c3";
    document.getElementById('list-food').style.display="block";
    document.getElementById('form2').style.display="block";
    document.getElementById('form3').style.display="block";
    document.getElementById('bluebtn').style.display="block";
    document.getElementById('redbtn').style.display="block";
    document.getElementById('clock').style.display="block";

    document.getElementById('cal').innerHTML="Your Calorie Intake till now is : "+cal+" KCal / "+targetCal+" KCal";
  }
}

function addintake(){
  if(localStorage.getItem("ConsumedCal")===null)
    cal=0;
  else
    cal=parseFloat(localStorage.getItem("ConsumedCal"));

  food=document.getElementById("food").value;
  carb=document.getElementById("carb").value;
  fat=document.getElementById("fat").value;
  protein=document.getElementById("protein").value;

  var calo= 4*carb + 4*protein + 9*fat;
  cal=cal+(calo/1000);
  localStorage.setItem("ConsumedCal",cal);
  document.getElementById('cal').innerHTML="Your Calorie Intake till now is : "+cal+" KCal / "+targetCal+" KCal";
  if(cal>targetCal)
    alert("You have crossed your calorie limit for today!!!");
  // Check the remaining part

  var li = document.createElement("li");
  var inputValue = document.getElementById("food").value;
  var liText = inputValue+" - "+calo+" Calories"
  var t = document.createTextNode(liText);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Enter the details of food consumed..");
  }
  else {
    document.getElementById("list-food").appendChild(li);

    if(localStorage.foodItem){
      console.log('aaa')
      console.log('aaa')
      localStorage.foodItem = localStorage.foodItem + ";" + liText;
    }else{
      localStorage.foodItem = liText
    }
  }



  document.getElementById("food").value = "";
  document.getElementById("carb").value = "";
  document.getElementById("fat").value = "";
  document.getElementById("protein").value = "";
}

function logout(){
  localStorage.clear();
  location.reload();
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var t;
  m = checkTime(m);
  s = checkTime(s);
  if(h>12){
    h=h-12;
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s+ " PM";
    t = setTimeout(startTime, 500);
  }
  else{
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s+ " AM";
    t = setTimeout(startTime, 500);
  }

  //if (s=="00")
//  alert("You should drink 0.125 L within this hour!");
}
function checkTime(i) {
  if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
  return i;
}
