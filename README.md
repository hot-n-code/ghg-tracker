### AUTHORS:
- [Anna Campainha](https://github.com/annacampainha)
- [Chak Hon Lam](https://github.com/chakhon)
- [Daphne Tapia](https://github.com/dmtapia)
- [Jackie Wong](https://github.com/jackiewong99)
- [Michael Gainey](https://github.com/micgainey)
- [Sophia Cruz](https://github.com/sophiaelizecruz)
- [Timothy Huo](https://github.com/timothyhuo1)
- [Khyla Rabang](https://github.com/vrabang)
- [Yiwen Chen](https://github.com/yiwenc22)

---

### Overview:
GHG Tracker is a web application designed to track the carbon footprint that residents of Hawai’i produce and reduce. Our focus is on Greenhouse Gas Emissions (GHG) and how it is everyone’s responsibility. This web app focuses on tackling GHG from Transportation. Climate change has the potential to increase the severity and frequency of hurricanes, flooding, and droughts, and is expected to lead to increasing sea level rise. GHG is the most significant factor in climate change.

This app allows users to update their daily mode of transportation and track the effect of each time they use a mode of transportation. The user will have a custom profile by adding their cars, alternative modes of transportation (bike, walk, bus, etc.), personal goals, and a history of their data. By using real data from all models and makes of cars, as the user continues to use the app, it will update and calculate the total amount of carbon produced, reduced, fuel saved and total miles traveled.

---

### CHANGELOG:

---

### Install:
First, [install Meteor](https://www.meteor.com/install).

Second, go to [https://github.com/hot-n-code/ghg-tracker](https://github.com/hot-n-code/ghg-tracker), click the "Code" button, and download "ghg-tracker-master.zip" as a ZIP file. Once downloaded, unzip in local machine and open with JS IDE of choice.

Third, cd into the app/ directory of your local copy of the repo, and install third party libraries with:

```
meteor npm install
```

Finally, you need to [install MongoDB Database Tools](https://docs.mongodb.com/database-tools/installation/installation/), this will allow you to populate the vehicle database during startup.

---

### Running the Application
Once the libraries are installed, you can run the application by invoking the "start" script in the [package.json file](https://github.com/athleticheck/athleticheck/blob/master/app/package.json):

```
meteor npm run start
```

The first time you run the app, it will create some default users and data. Here is the output:

```
meteor npm run start

> meteor-application-template-react@ start /Users/annacampainha/GitHub/ghg-tracker/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/GitHub/ghg-tracker/app ]]]]]          

=> Started proxy.                             
=> Started MongoDB.                           
W20210331-19:23:40.111(-7)? (STDERR) Note: you are using a pure-JavaScript implementation of bcrypt.
W20210331-19:23:40.156(-7)? (STDERR) While this implementation will work correctly, it is known to be
W20210331-19:23:40.156(-7)? (STDERR) approximately three times slower than the native implementation.
W20210331-19:23:40.156(-7)? (STDERR) In order to use the native implementation instead, run
W20210331-19:23:40.156(-7)? (STDERR) 
W20210331-19:23:40.157(-7)? (STDERR)   meteor npm install --save bcrypt
W20210331-19:23:40.157(-7)? (STDERR) 
W20210331-19:23:40.157(-7)? (STDERR) in the root directory of your application.
I20210331-19:23:42.223(-7)? Creating the default user(s)
I20210331-19:23:42.223(-7)?   Creating user admin@foo.com.
I20210331-19:23:42.499(-7)?   Creating user test@gmail.com.
I20210331-19:23:42.731(-7)?   Creating user john@foo.com.
I20210331-19:23:42.980(-7)? Creating default data.
I20210331-19:23:42.981(-7)?   Adding: Basket (john@foo.com)
I20210331-19:23:43.023(-7)?   Adding: Bicycle (john@foo.com)
I20210331-19:23:43.026(-7)?   Adding: Banana (admin@foo.com)
I20210331-19:23:43.027(-7)?   Adding: Boogie Board (admin@foo.com)
I20210331-19:23:43.030(-7)? Creating default data.
I20210331-19:23:43.030(-7)?   Defining Daily User Data on: 2019-11-13
I20210331-19:23:43.066(-7)?   Defining Daily User Data on: 2019-11-14
I20210331-19:23:43.067(-7)?   Defining Daily User Data on: 2019-11-15
I20210331-19:23:43.070(-7)? Creating default Vehicle.
I20210331-19:23:43.070(-7)?   Defining vehicle test@gmail.com
I20210331-19:23:43.108(-7)?   Defining vehicle test@gmail.com
I20210331-19:23:43.110(-7)?   Defining vehicle test@gmail.com
I20210331-19:23:43.113(-7)? Creating the default profiles
I20210331-19:23:43.113(-7)?   Defining profile test@gmail.com
I20210331-19:23:43.188(-7)?   Defining profile john@foo.com
I20210331-19:23:43.195(-7)? Creating default make.
I20210331-19:23:43.196(-7)?   Defining make Nissan
I20210331-19:23:43.228(-7)?   Defining make Honda
I20210331-19:23:43.230(-7)?   Defining make Toyota
I20210331-19:23:43.231(-7)?   Defining make Tesla
I20210331-19:23:43.234(-7)?   Defining make Ford
I20210331-19:23:43.236(-7)?   Defining make Volkswagen
I20210331-19:23:43.388(-7)? Monti APM: completed instrumenting the app
=> Started your app.

=> App running at: http://localhost:3000/
```

After running the application you must populate the vehicle database that holds MPG for most vehicles. To do this, run:

```
meteor npm run populate
```

You should get the following message:

```
> meteor-application-template-react@ populate /home/michael/Documents/GitHub/ghg-tracker/app
> mongoimport --host 127.0.0.1:3001 --db meteor --collection AllVehicleCollection --file ../config/vehicle_data.json

2021-03-31T18:01:22.488-1000	connected to: 127.0.0.1:3001
2021-03-31T18:01:23.086-1000	imported 1 document

```
NOTE: if you skip this step adding vehicles will not work or give you an error.

---
### Note Regarding "bcrypt warning":

You will also get the following message when you run this application:

```
Note: you are using a pure-JavaScript implementation of bcrypt.
While this implementation will work correctly, it is known to be
approximately three times slower than the native implementation.
In order to use the native implementation instead, run

  meteor npm install --save bcrypt

in the root directory of your application.
```

On some operating systems (particularly Windows), installing bcrypt is much more difficult than implied by the above message. Bcrypt is only used in Meteor for password checking, so the performance implications are negligible until your site has very high traffic. You can safely ignore this warning without any problems during initial stages of development.

---

### Viewing the Running Application

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000).  You can login using the credentials in [settings.development.json](https://github.com/athleticheck/athleticheck/blob/master/config/settings.development.json), or else register a new account.

---
### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```
---



![ci-badge](https://github.com/ics-software-engineering/meteor-application-template-react/workflows/ci-meteor-application-template-react/badge.svg)

For details, please see http://ics-software-engineering.github.io/meteor-application-template-react/
