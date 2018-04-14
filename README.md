
## Code has been moved to https://github.com/Rytiggy/Glance This repo is inactive. Please visit the new repo for updates! 
Notice:
Please keep in mind that this is a very early stage of this watchface and updates will come.  
#### Current Features:
- Graph view of bgs over last hour and 15 mins 
- view current bg ( updates every 5 mins )
- Minutes sense last pull
- Trending direction 
- Delta value 
- Heart rate
- Step couter
- Time



# api-watchface
Fitbit Ionic watch face for viewing and displaying points on a graph. 

![watch face image](https://image.ibb.co/j1MTvH/senssor4_screenshot_3.png)
![High bg watch face image](https://image.ibb.co/hVFXqH/highalert.png)


# Requirments
- An API endpoint with data formated like so. 
```
{
  "_id":"ae710bda-edb5-4d00-aee5-4c876b625d9b",
  "device":"Other App",
  "date":1515679627108,
  "dateString":"2018-01-11T09:07:07.108-0500",
  "sysTime":"2018-01-11T09:07:07.108-0500",
  "sgv":135,
  "delta":1.001,
  "direction":"Flat",
  "noise":1,
  "filtered":135000,
  "unfiltered":135000,
  "rssi":100,
  "type":"sgv"
}
```
#### required endpoint data points 
 "sgv", "delta", "direction"
 
## Software
- [Nightscout 600 Series Android Uploader](https://github.com/pazaan/600SeriesAndroidUploader/wiki) - [Download APK](https://github.com/pazaan/600SeriesAndroidUploader/releases/)
- [xDrip](http://stephenblackwasalreadytaken.github.io/xDrip/) - [Download APK](https://github.com/NightscoutFoundation/xDrip/releases/)

## Instructions
- how to install https://github.com/Rytiggy/api-watchface/blob/master/howto.md
---
1. follow the instuctions below for nightscout on your phone and in addition enable in settings/send To xDrip+ 
[Nightscount setup](https://github.com/pazaan/600SeriesAndroidUploader/wiki/Android-Uploader-Installation)
2. set up xdrip on your phone following the below instuctions and in xdrip go to settings/inner-app settings/ and enable broadcast locally .<br>
[Xdrip setup](https://github.com/NightscoutFoundation/xDrip/releases)
3. Once you have your end point set it should be https://127.0.0.1:17580/sgv.json and you should be able to go to it on your phone. confirm that you can see json in your phones web browser.
4. Go into the Fitbit companion app and go into settings, and enter https://127.0.0.1:17580/sgv.json into the REST API url
5. After that you are good to go, you should start seeing readings on the graph with in 5-10 minutes 
![companion app settings](https://image.ibb.co/maTLE6/26781740_10210968578590514_156639173_o.png)

