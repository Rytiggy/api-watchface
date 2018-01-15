import document from "document";
import * as messaging from "messaging";
import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { today } from "user-activity";

import * as util from "./util";

console.log("App Started");


let graphData = document.getElementById("graph-data");
let accelData = '';//document.getElementById("accel-data");
let barData = '';//document.getElementById("bar-data");
let hrmData = document.getElementById("hrm-data");
let time = document.getElementById("time-data");
let steps = document.getElementById("step-count");

let accel = new Accelerometer();
let bar = new Barometer();
let hrm = new HeartRateSensor();

var count = 14;
var points = [220,220,220,220,220,220,220,220,220,220,220,220,220,220];

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

let bgType = true;


function setTime() {
  totalSeconds++;
  secondsLabel.text = pad(totalSeconds % 60);
  minutesLabel.text = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


function mmol( bg ) {
    let mmolBG = Math.round( (0.0555 * bg) * 10 ) / 10;
  return mmolBG;
}



// // Message is received from phone 
  messaging.peerSocket.onmessage = evt => {
  console.log('Message is received from phone ')
  try{
    console.log( JSON.parse(evt.data).type)
    bgType = JSON.parse(evt.data).type
  }catch(e){}
   // bgType = evt.data[evt.data.type];
//     if(bgType) {
    if(evt.data[evt.data.type]) {       
      updategraph(evt.data[evt.data.type])
    }

//     } else {
//          updategraph(mmol(evt.data[evt.data.type]))

//     }
  
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};


function updategraph(graphPoint){
  let graphPoints = document.getElementsByClassName('graph-point'); 
  console.log('updategraph')
  console.log(JSON.stringify(graphPoint))  
  if(bgType) {
    graphData.text = graphPoint;
  } else {
    graphData.text = mmol(graphPoint);  
  }
  points.push(graphPoint)  


  graphPoints[0].cy = (200 - points[14]) - 5;
  graphPoints[1].cy = (200 - points[13]) - 5;
  graphPoints[2].cy = (200 - points[12]) - 5;
  graphPoints[3].cy = (200 - points[11]) - 5;
  graphPoints[4].cy = (200 - points[10]) - 5;
  graphPoints[5].cy = (200 - points[9]) - 5;
  graphPoints[6].cy = (200 - points[8]) - 5;
  graphPoints[7].cy = (200 - points[7]) - 5;
  graphPoints[8].cy = (200 - points[6]) - 5;
  graphPoints[9].cy = (200 - points[5]) - 5;
  graphPoints[10].cy = (200 - points[4]) - 5;
  graphPoints[11].cy = (200 - points[3]) - 5;
  graphPoints[12].cy = (200 - points[2]) - 5;
  graphPoints[13].cy = (200 - points[1]) - 5;
  graphPoints[14].cy = (200 - points[0]) - 5;


  console.log(JSON.stringify(points))
  points.shift()
  totalSeconds = 0;
  setTime();
    

}




//accel.start();
//bar.start();
hrm.start();

  var data = {
    accel: {
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    },
    bar: {
      pressure: bar.pressure ? parseInt(bar.pressure) : 0
    },
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };
 
function refreshData() {
   setTime();
   data = {
    accel: {
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    },
    bar: {
      pressure: bar.pressure ? parseInt(bar.pressure) : 0
    },
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };  

  var timeNow= new Date();
  let hh = timeNow.getHours();  
  let mm = timeNow.getMinutes();
  let ss = timeNow.getSeconds();
     
  if(mm < 10) {
    mm = '0' + mm;
  }  
     
  let formatAMPM = (hh >= 12?'PM':'AM');
  hh = hh % 12 || 12;
  
  if(hh < 10) {
    hh = '0' + hh;
  }
  time.text = (hh + ':' + mm);
 
  let stepCount = (today.local.steps || 0)+"";
  if(stepCount >= 999) {
    stepCount = stepCount.substring(0, 1);
    stepCount.trim();
    stepCount += "k"
  } else if(stepCount >= 9999) {
    stepCount = stepCount.substring(0, 2);
    stepCount.trim();
    stepCount += "k"
  }
    
  
  hrmData.text = data.hrm.heartRate;
  steps.text =(stepCount || 0)
   
}




refreshData();
setInterval(refreshData, 1000);




