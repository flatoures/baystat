## BayStat Dashboards

#### Causes and Solutions

Dashboards built to visualize causes of and solutions to pollution in Maryland's Chesapeake Bay for the [BayStat](http://www.baystat.maryland.gov/) program. 

- Solutions: http://baystat.maryland.gov/solutions-map/
- Causes: http://baystat.maryland.gov/causes-of-the-problems-map/

#### Technology

* Data hosted on Socrata at [https://data.maryland.gov](https://data.maryland.gov/profile/ESRGC/2ryv-bq8b)
* Charts built with the ESRGC [GeoDash](https://github.com/esrgc/geodash) charting library 
* Maps built with [Leaflet.js](https://github.com/Leaflet/Leaflet)

##### Browser Support

* Chrome
* Firefox
* Safari
* IE 8+

##### Build

To build:

* Install Node.JS and NPM
* `npm install`
* `grunt dev` for developing
* `grunt deploy` for deployment
