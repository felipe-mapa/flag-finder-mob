# FLAG FINDER MOBILE APP

A React Native App to search engine to filter country flags by their characteristics and to give the user some information about each country and flag. Most of the code is shared with [Flag Finder App Website](http://flagfinderapp.com/) which is a React Web App.

On version 2.0.0 I also added a flag quiz game with score hanking. 

## URL

__[Google Play](https://ply.gl/com.pavanela.flag_finder)__

## Database
The headless database is retrieved from the same database as [Flag Finder Website](http://flagfinderapp.com/) using Redux and Thunk for management.
To be able to store data in the device I used SQLite, where I created a table to save the favorites countries and the top scores of the game.

## Reflections

- The reason I developed this app was to use my React Native knowledge acquired through online courses into a mobile app and develop new mobile development skills. Also, to have always in my pocket an tool that allows me to find out about flags I see on the streets.
- For my first independent React Native project, I decided to reuse some of the code from Flag Finder Web App and the content to develop a mobile app. However, the mobile app has got some extra features, for example the user can check where the country is in the globe, save flags to favorites and also play a flag quiz.
- The app was developed with React Native and built with Expo
- Expo brings a lot functionalities which helped me to build the project.
1. Easy build for Android and IOS;
2. Native packages out of the box such as permissions, image picker and mail composer;
3. Integration with SQLite and AdMob.
