import { settingsStorage } from "settings";
import * as messaging from "messaging";
console.log("Companion Started");

let renderAllPoints = true
let url = null;
let BgDataType = false;
 
// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
  renderAllPoints = true;
  test();
};  

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("Companion Socket Closed");
};


const test = () => {
  console.log('Test called')
  if(url) {
    fetch(url,{
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        "Content-Type": 'application/json; charset=utf-8'
      })
    })
      .then(response => {
        console.log('Get Data On Phone => response');
        response.text().then(data => {
          console.log('fetched Data from API');
          console.log(data)
          sendVal(data);


        })
        .catch(responseParsingError => {
          console.log('fetchError');
          console.log(responseParsingError.name);
          console.log(responseParsingError.message);
          console.log(responseParsingError.toString());
          console.log(responseParsingError.stack);
        });
      }).catch(fetchError => {
        console.log('fetchError');
        console.log(fetchError.name);
        console.log(fetchError.message);
        console.log(fetchError.toString());
        console.log(fetchError.stack);
      })
  } else {
    url = "http://127.0.0.1:17580/sgv.json"
    test();
  }
};



// A user changes settings
settingsStorage.onchange  = evt => {
  console.log(evt.key)
  if(evt.key === "restURL") {
    console.log('REST URL RECIEVED ')    
    let data = {
      key: evt.key,
      newValue: evt.newValue
    };
    restoreSettings();
    test()
    renderAllPoints = true;
  }
  // sendVal(data)
  
  if(evt.key === "dataType" ) {
     console.log('Data type was selected ')
     BgDataType = evt.newValue;
     let data = {
        key: evt.key,
        newValue: evt.newValue
      };
    restoreSettings();

  }
  
  if(evt.key === "refreshWatch") {
      console.log('refreshWatch')    
    let data = {
      key: evt.key,
      newValue: evt.newValue
    };
    restoreSettings();
    test()
    renderAllPoints = true;
  }
  console.log('key pressed')
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {

    let key = settingsStorage.key(index);
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key),
        dataType: true
      };
      

      if(key === "restURL") {
        console.log('restURL')
        console.log(JSON.parse(settingsStorage.getItem(key)).name)
        url = JSON.parse(settingsStorage.getItem(key)).name;
      }else if(key === "dataType") {
        console.log('dataType')
        console.log(JSON.parse(settingsStorage.getItem(key)))
        BgDataType = JSON.parse(settingsStorage.getItem(key))
      }
  }
}
// Send data to device using Messaging API
function sendVal(data) {
  console.log('in sendVal')
  console.log(data)
    // send BG Data type first 
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // messaging.peerSocket.send( '{"type":'+BgDataType+'}');
    console.log('in IF of sendval ')
    console.log(JSON.parse(data).length)
    if(renderAllPoints) {
      for(let index = JSON.parse(data).length-1; index >= 0; index--) {
        console.log( JSON.stringify(JSON.parse(data)[index]))
        console.log('Sending Values')
        messaging.peerSocket.send(JSON.parse(data)[index]); 
      }
      renderAllPoints = false;
    } else {
        console.log('only send one data point')
        messaging.peerSocket.send(JSON.parse(data)[0]); 
    }
  }
}

setInterval(test,  300000); // test again 5 min later


