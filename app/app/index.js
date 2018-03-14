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

let direction = document.getElementById("direction");
let directionDot = document.getElementById("direction-dot");

let delta = document.getElementById("delta");

let accel = new Accelerometer();
let bar = new Barometer();
let hrm = new HeartRateSensor();

var count = 14;
var points = [220,220,220,220,220,220,220,220,220,220,220,220,220,220];

//graph-data-range
let graphRange = [50,75,100,125,150,175,200]

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

let bgType = true;

let ERRORNoData = document.getElementById("ERROR-no-data");

let gdr1 = document.getElementById("gdr1")
let gdr2 = document.getElementById("gdr2")
let gdr3 = document.getElementById("gdr3")
let gdr4 = document.getElementById("gdr4")
let gdr5 = document.getElementById("gdr5")
let gdr6 = document.getElementById("gdr6")
let gdr7 = document.getElementById("gdr7")

let targetRangeTop = document.getElementById("target-range-top")
let targetRangeBottom = document.getElementById("target-range-bottom")



let multiplier = 0
let hasApplied = false

function addSecond() {
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
  console.log('Message is received from phone')
  try{
    bgType = JSON.parse(evt.data).type
    console.log('BGTYPE SET', evt.data)
    console.log(bgType)

  }catch(e){}
    
  //default graph data range 
  gdr1.text = 200
  gdr2.text = 175   
  gdr3.text = 150 
  gdr4.text = 125   
  gdr5.text = 100   
  gdr6.text = 75   
  gdr7.text = 50 
    
  updategraph(evt.data)

};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};


function updategraph(data){
  let graphPoints = document.getElementsByClassName('graph-point'); 
 // let graphRangeClass = document.getElementsByClassName('graph-data-range'); 
  console.log('updategraph')
  console.log(data)  
  
  graphData.text = data.sgv;
  points.push(data.sgv)
   
  //check if over 180 bg 
  if(points[14] > 180) {
    graphData.style.fill = "#ef5350"
    targetRangeTop.style.fill = "transparent"
    targetRangeBottom.style.fill = "#ef5350"
    targetRangeBottom.y1=107
    targetRangeBottom.y2=107
    
    multiplier = 50
    console.log('change Multiplier')
    gdr1.text = parseInt(gdr1.text) + multiplier  
    gdr2.text = parseInt(gdr2.text) + multiplier  
    gdr3.text = parseInt(gdr3.text) + multiplier  
    gdr4.text = parseInt(gdr4.text) + multiplier  
    gdr5.text = parseInt(gdr5.text) + multiplier  
    gdr6.text = parseInt(gdr6.text) + multiplier  
    gdr7.text = parseInt(gdr7.text) + multiplier  
  } else if (points[14] < 180 ) {
    graphData.style.fill = "white"
    multiplier = 0
    targetRangeTop.style.fill = "#a27b27"
    targetRangeBottom.style.fill = "#a27b27"
    targetRangeBottom.y1=130
    targetRangeBottom.y2=130
  }
 
  
  graphPoints[0].cy = (200 - points[14]) - 5 + multiplier;
  graphPoints[1].cy = (200 - points[13]) - 5 + multiplier;
  graphPoints[2].cy = (200 - points[12]) - 5 + multiplier;
  graphPoints[3].cy = (200 - points[11]) - 5 + multiplier;
  graphPoints[4].cy = (200 - points[10]) - 5 + multiplier;
  graphPoints[5].cy = (200 - points[9]) - 5 + multiplier;
  graphPoints[6].cy = (200 - points[8]) - 5 + multiplier;
  graphPoints[7].cy = (200 - points[7]) - 5 + multiplier;
  graphPoints[8].cy = (200 - points[6]) - 5 + multiplier;
  graphPoints[9].cy = (200 - points[5]) - 5 + multiplier;
  graphPoints[10].cy = (200 - points[4]) - 5 + multiplier;
  graphPoints[11].cy = (200 - points[3]) - 5 + multiplier;
  graphPoints[12].cy = (200 - points[2]) - 5 + multiplier;
  graphPoints[13].cy = (200 - points[1]) - 5 + multiplier;
  graphPoints[14].cy = (200 - points[0]) - 5 + multiplier;

  //set the delta value 
  delta.text = Math.round( data.delta ) + " mg/dl"
  
  // temp fix while direction is not working
  if(data.delta <= 3 || data.delta >= -3){
    data.direction = 'Flat'
  } 
  if(data.delta > 3) {
    data.direction = 'FortyFiveUp'
  }
  if(data.delta >= 7) {
    data.direction = 'SingleUp'
  }
  if(data.delta < -3) {
    data.direction = 'FortyFiveDown'
  }
  if(data.delta <= -7) {
    data.direction = 'SingleDown'
  }
  
  // check the direction of bgs 
  if (data.direction === 'FortyFiveUp') {
    direction.x1 = 300
    direction.x2 = 326
    
    direction.y1 = 100
    direction.y2 = 80
    
    directionDot.cx = 326
    directionDot.cy = 80
  } else if (data.direction === 'SingleUp') {
    direction.x1 = 313
    direction.x2 = 313
  
    direction.y1 = 100
    direction.y2 = 130
    
    directionDot.cx = 313
    directionDot.cy = 100
  } else if (data.direction === 'FortyFiveDown') {
    direction.x1 = 300
    direction.x2 = 326
    
    direction.y1 = 100
    direction.y2 = 120
    
    directionDot.cx = 326
    directionDot.cy = 120
  } else if (data.direction === 'SingleDown') {
    direction.x1 = 313
    direction.x2 = 313
  
    direction.y1 = 100
    direction.y2 = 130 
        
    directionDot.cx = 313
    directionDot.cy = 130
  } else { //  if (data.direction === 'Flat')
    direction.x1 = 300
    direction.x2 = 326
   
    direction.y1 = 100    
    direction.y2 = 100
    
    directionDot.cx = 326
    directionDot.cy = 100
    
  }
 
  console.log(JSON.stringify(points))
  points.shift()
  totalSeconds = 0;
  addSecond();  
  
  //check if time is over 5 mins
  console.log('date time check ')
  let currentTime = new Date();
  let lastBGTime = new Date(data.dateString); // The 0 there is the key, which sets the date to the epoch
  
  console.log(currentTime.toISOString())//.
  console.log((data.dateString)) //.getUTCMinutes())


  if (pad(parseInt(totalSeconds / 60)) >= "10") {
    ERRORNoData.y = 92;
  } else {
    ERRORNoData.y = 300;
  }

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
   addSecond();
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
  steps.text =( stepCount || 0)
   
}




refreshData();
setInterval(refreshData, 1000);




