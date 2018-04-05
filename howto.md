 
# Steps
- go to [studio.fitbit.com](studio.fitbit.com) and create an account
- Click `new project` 
![click new project](https://image.ibb.co/eQsGKx/1.png "step 1")

- Then give the project a `name` (sensors in my case) and select  `Empty Project`  then click `create`
![Name the project](https://image.ibb.co/cQ3vCH/2.png "step 2")

- This will bring you to the fitbit studio. 
![click clone or download](https://image.ibb.co/b4Rtzx/3.png "step 3")

- Go to  [github.com/Rytiggy/api-watchface](https://github.com/Rytiggy/api-watchface) and click the green `clone and download` button. 
- Click `Download ZIP`
![click clone or download](https://image.ibb.co/gDryXH/4.png "step 4")

- Open the ZIP and extract the `app folder` to your desktop. then open the `app folder` 
![app folder](https://image.ibb.co/f5KACH/5.png "step 5")

- Copy the `contents` of the folder to `fitbit studio`
![files on fitbit studio](https://image.ibb.co/j8XDXH/6.png "step 6")
- You now need to turn on the `Developer Bridge` in the `Fitbit mobile app` and the `Developer Bridge` menu on your `Fitbit device`.
- `Fitbit app:` To enable the Developer Bridge. On the phone app, click the fitbit watch icon in the top right hand corner. Click Developer Menu then enable the Developer Bridge.
- `Fitbit device:` To enable the Developer Bridge. On the watch, go to Settings and tap Developer Bridge, then wait until it says Connected to Server.
- `Connect` the `watch` and the `phone` to fitbit studio. Then click `run`. 
![connect to fitbit studio](https://image.ibb.co/fe0Wmc/7.png "step 7")
- You should now see the watch face on yout watch.

# xDrip app
- In the xDrip navigate to `Settings` -> `Inter-App settings` -> `xDrip Web Service` -> `ON` 
- You should now be able to open your phone browser and go to `http://127.0.0.1:17580/sgv.json`
![json blob](https://image.ibb.co/bZAE6c/65.png "step 8")
---
you should now be able to see the blood sugars on the watch.

# Resourses
- This is a great resorese for genereal fitbit studio/SDK answers.  https://dev.fitbit.com/getting-started/
- If your Fitbit device is unable to connect to the developer bridge, ensure that wifi is configured correctly, and that you are using the same Fitbit user account on your mobile device, and in Fitbit Studio.
