### AUTHOR: [Hot-N-Code](https://hot-n-code.github.io/)

---

### Overview:
GHG Tracker is a web application designed to track the carbon footprint that residents of Hawai’i produce and reduce. Our focus is on Greenhouse Gas Emissions (GHG) and how it is everyone’s responsibility. This web app focuses on tackling GHG from Transportation. Climate change has the potential to increase the severity and frequency of hurricanes, flooding, and droughts, and is expected to lead to increasing sea level rise. GHG is the most significant factor in climate change.

This app allows users to update their daily mode of transportation and track the effect of each time they use a mode of transportation. The user will have a custom profile by adding their cars, alternative modes of transportation (bike, walk, bus, etc.), personal goals, and a history of their data. By using real data from all models and makes of cars, as the user continues to use the app, it will update and calculate the total amount of carbon produced, reduced, fuel saved and total miles traveled.

For more information about this project, please visit our organization's webpage: [Hot-N-Code](https://hot-n-code.github.io/)

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

> meteor-application-template-react@ start /Users/dmtapia/Desktop/ghg-tracker/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/Desktop/ghg-tracker/app ]]]]]          

=> Started proxy.                             
=> Started MongoDB.                           
W20210422-16:05:58.849(-10)? (STDERR) Note: you are using a pure-JavaScript implementation of bcrypt.
W20210422-16:05:58.870(-10)? (STDERR) While this implementation will work correctly, it is known to be
W20210422-16:05:58.870(-10)? (STDERR) approximately three times slower than the native implementation.
W20210422-16:05:58.870(-10)? (STDERR) In order to use the native implementation instead, run
W20210422-16:05:58.870(-10)? (STDERR) 
W20210422-16:05:58.870(-10)? (STDERR)   meteor npm install --save bcrypt
W20210422-16:05:58.871(-10)? (STDERR) 
W20210422-16:05:58.871(-10)? (STDERR) in the root directory of your application.
I20210422-16:06:04.444(-10)? Initializing database!
I20210422-16:06:09.327(-10)?    users: 22 accounts
I20210422-16:06:24.432(-10)?    AllVehicleCollection: 28334 vehicles
I20210422-16:06:24.657(-10)?    MakeCollection: 80 makes
I20210422-16:06:24.799(-10)?    UserCollection: 21 profiles
I20210422-16:06:24.956(-10)?    UserSavedDistanceCollection: 63 saved distances
I20210422-16:06:25.159(-10)?    UserVehicleCollection: 49 vehicles
I20210422-16:06:26.298(-10)?    DailyUserDataCollection: 1951 daily user data
I20210422-16:06:26.931(-10)? Monti APM: completed instrumenting the app
=> Started your app.

=> App running at: http://localhost:3000/
```
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

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can log-in as:
* Test User: test@gmail.com (foo);
* Admin User: admin@foo.com (changeme);
* Any of the emails on the User List (log-in as admin to access) using the same password as Test User;
* Or, by creating your own account (Note: Because this application is still being developed, please use a fake email for your safety.)

---
### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```
---

![ci-badge](https://github.com/hot-n-code/ghg-tracker/workflows/hot-n-code-ghg-tracker/badge.svg)

For details, please see http://ics-software-engineering.github.io/meteor-application-template-react/
