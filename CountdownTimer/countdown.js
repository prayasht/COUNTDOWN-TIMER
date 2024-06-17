let intervalID=0;
let intervals=[];

function showDate(input) { //alows only one input per time.
    input.disabled = true;
}


function showCountdown(start) { //start the coundown along with the animantion circle.
    let presentContainer= start.closest('#container');
    let a=new Date(presentContainer.querySelector(`[id^="target-date"]`).value);
    let presentRemainingdiv = presentContainer.querySelector(`[id^="remaining-time"]`);
    let thistitle=presentContainer.querySelector("#chtitle").innerText;
    let day=presentRemainingdiv.querySelector("#days");
    let hour=presentRemainingdiv.querySelector("#hours");
    let mins=presentRemainingdiv.querySelector("#minutes");
    let secs=presentRemainingdiv.querySelector("#seconds");

    if(a!=null){
    let Remaining = a - new Date();

    if (Remaining >= 0 ) { //allows to start a countdown for valid date (future date).
      const lefttime = setInterval(() => {
            let timeRemaining = a - new Date(); //calculate the remaining time with interval of 1sc
            let colorpercent = timeRemaining/Remaining;
            countanimation(presentContainer, colorpercent);
            let da = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            let ho = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minut = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            let secon = Math.floor((timeRemaining % (1000 * 60)) / 1000);
           day.innerText = `${da}` ;
           hour.innerText=`${ho}`;          //updare the remaining time countdown.
           mins.innerText=`${minut}`;
           secs.innerText=`${secon}`;

           if (timeRemaining <= 800) {           //when timer reaches 0.
            clearCustomInterval(lefttime);
            var audio = new Audio('countdown-finished-sound.mpeg'); //audio play
            audio.play().then(() => {
                clearInterval(lefttime);
                if(confirm(thistitle+" Arrived...")){
                    clearCountdown(start);     //audio stops when pressede ok.
                    audio.pause();
                    audio.currentTime=0;
                }
            }).catch(error => console.error('Error playing audio:', error));
        }
        
        }, 1000);

        intervalID++;
        const currentIntervalId = intervalID;
        presentContainer.querySelector(`[id^="clear-button"]`).addEventListener('click', () =>{
        clearCustomInterval(currentIntervalId); //after the timer reaches 0 it clears the intervals.
        });

    }
    else
    alert("Please enter a Valid Date"); 
}
}


function countanimation(presentContain , percentage){  //perform the coundown animation on circle.
 let circle = presentContain.querySelector('.base-timer__path-elapsed');
  let circumference = 2 * Math.PI * 45; 
  let offset = circumference - percentage*circumference;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;

  if (percentage < 0.3) {    //when the persentage reaches less than 30%. it makes the color red
    circle.style.stroke = '#ff2727';
  } else {
    circle.style.stroke = '#3bfe06';
  }
}


function clearCountdown(clear) {        //clears all the value and reset to original condition.
    let presentContainer= clear.closest('#container');
    let presentRemainingdiv = presentContainer.querySelector(`[id^="remaining-time"]`);
    a=null;
    let day=presentRemainingdiv.querySelector("#days");
    let hour=presentRemainingdiv.querySelector("#hours");
    let mins=presentRemainingdiv.querySelector("#minutes");
    let secs=presentRemainingdiv.querySelector("#seconds");
    day.innerText = '00' ;
    hour.innerText= '00';
    mins.innerText= '00';
    secs.innerText= '00';

    presentContainer.querySelector(`[id^="target-date"]`).value="";
    presentContainer.querySelector(`[id^="target-date"]`).disabled=false;

    let circle = presentContainer.querySelector('.base-timer__path-elapsed');
  let circumference = 2 * Math.PI * 45; 
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference+circumference+circumference+circumference;  
    circle.style.stroke= 'gray';

    presentContainer.querySelector("#chtitle").innerText='Set title for countdown';  


}
function clearCustomInterval(clearId){  //clears the interval that present on the sekected container.
    clearInterval(clearId);
}

function deletediv(component){      //remove the container.
    let presentContainer= component.closest('#container');
    presentContainer.remove();
}

function changetitle(chtitlebtn){       //changes and set title for the timer.
    let presentContainer= chtitlebtn.closest('#container');
    let thislable=presentContainer.querySelector('#chtitle');
    thislable.innerHTML=prompt('Enter the title for coundown: '); 
}

function addTimer() {  //append a new container dynamically.
    let maindiv = document.getElementById("main");

    let settimerdiv = document.createElement('div');
    settimerdiv.className = 'settimer';

    let label = document.createElement('label');
    label.textContent = 'Set target time and date:';

    let lable1 =document.createElement('label');
    lable1.innerHTML=`Set title for countdown `;
    lable1.id='chtitle';

    let ruler=document.createElement('hr');

    let changebtn=document.createElement('button');
    changebtn.id='chbtn';
    changebtn.innerHTML='<i class="ri-edit-2-fill"></i>';
    changebtn.addEventListener('click', ()=>{
        changetitle(changebtn);
    }
    );

    let input = document.createElement('input');
    input.type = 'datetime-local';
    input.id = 'target-date';
    input.addEventListener('change', () => {
        showDate(input);
    });
    settimerdiv.appendChild(label);
    settimerdiv.appendChild(input);

    let startButton = document.createElement('button');
    startButton.id = 'start-button';
    startButton.textContent = 'Start Countdown';
    startButton.addEventListener('click', () => {
        showCountdown(startButton);
    });

    let clearbutton = document.createElement('button');
    clearbutton.id = 'clear-button';
    clearbutton.textContent = 'Clear Countdown';
    clearbutton.addEventListener('click', () => {
        clearCountdown(clearbutton);
    });

    let dltbutton = document.createElement('button');
    dltbutton.id = 'delete-button';
    dltbutton.textContent = 'Delete Component';
    dltbutton.addEventListener('click', () => {
        deletediv(dltbutton);
    });

    let buttondiv = document.createElement('div');
    buttondiv.className = 'buttons';
    buttondiv.appendChild(startButton);
    buttondiv.appendChild(clearbutton);
    buttondiv.appendChild(dltbutton);

    let remainingTimeDiv = document.createElement('div');
    remainingTimeDiv.id = 'remaining-time';
    remainingTimeDiv.innerHTML = `Time Left:
        <p>
        <span id="days">00</span> days :
        <span id="hours">00</span> hours :
        <span id="minutes">00</span> minutes :
        <span id="seconds">00</span> seconds 
      </p>`;
      

    let contain = document.createElement('div');
    contain.id = 'container';



    let basetimediv = document.createElement('div');
    basetimediv.id = 'base-timer';
    basetimediv.innerHTML = `<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
    </g>        
  </svg>`;
  basetimediv.appendChild(buttondiv);
  basetimediv.appendChild(remainingTimeDiv);
  

    basetimediv.appendChild(settimerdiv); 
    contain.appendChild(lable1);
    contain.appendChild(ruler);
    contain.appendChild(changebtn);
    contain.appendChild(basetimediv); 
    contain.appendChild(settimerdiv);
    maindiv.appendChild(contain);
}
