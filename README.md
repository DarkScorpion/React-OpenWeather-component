## React OpenWeather component

React component that implements the basic functions of weather display on the user's location and the selected cities.

For build use commands
```sh
$ npm i
$ npm run build
```

#### Struct of config.js
```javascript
module.exports = {
  "appID": "you OpenWeather appID"
}
```
#### Different branches of the project:

* [m] [m-branch]: The first branch of the project includes the implementation of a standard javascript with Strict Mode.  
* [es6] [es6-branch]: Component is written using standard ES2015. (parent: m)  
* [webpack] [webpack-branch]: Used npm module: webpack. To create an assembly that will work without additional libraries.  (parent: es6)  
* [redux] [redux-branch]: Component rewritten for architecture Flux and using her standard implementation Redux. (parent: webpack)  

[m-branch]: <https://github.com/DarkScorpion/React-OpenWeather-component/tree/m>  
[es6-branch]: <https://github.com/DarkScorpion/React-OpenWeather-component/tree/es6>  
[webpack-branch]: <https://github.com/DarkScorpion/React-OpenWeather-component/tree/webpack>  
[redux-branch]: <https://github.com/DarkScorpion/React-OpenWeather-component/tree/redux>  
