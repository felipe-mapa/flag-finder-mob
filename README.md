# FLAG FINDER MOBILE APP

A React Native App to find flags by their characteristics + a game to select the name of a flag. Most of the code is shared with [Flag Finder Website](http://flagfinderapp.com/) which is a React WebApp.

## URL

Android: https://play.google.com/store/apps/details?id=com.pavanela.flag_finder

## Database
The headless database is retrieved from the same database as [Flag Finder Website](http://flagfinderapp.com/) using Redux and Thunk for management.
To be able to store data in the device I used expo-sqlite, where I created a table to save the favorites countries and the top scores of the game.

## Credits

App developed with React Native and Expo