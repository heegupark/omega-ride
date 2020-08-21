# o-ride

> - Maintained by: `Heegu Park`

## Functionality Overview
### Client
- A client requests to search keywords in pickup or dropoff inputbox to search address and shows up some predictions based on the search keyword.
- A client displays the route(direction) from origin to destination on map.
- A client displays the list of rides with estimates.
- A client displays the route(direction) from rider's position to origin on map.
### Server
- A server processes the request from a client to return address search keyword.
- A server processes the request from a client to return coordinate result based on the address.
- A server processes the request from a client to return the distance between two locations.

## Features
1. Heavily used React to create all HTML elements(virtual DOM) to dynamically display ride request information on top of Google Map
2. Mainly used Material UI
3. Primarily used React Hooks
4. Used Google Map for basic map data
5. Used Express to run the API server
6. Used AWS EC2 for web and API server
7. Support most of mobile devices(iPad - Landsacpe/Portrait, iPhone X - Landsacpe/Portrait, iPhone 6s/7s/8s - Landsacpe/Portrait, iPhone 6/7/8 - Landsacpe/Portrait, and so on)

## Planned Features
1. User can request a ride.
2. User can view the origin and destination.
3. User can view the route(direction) from origin to destination.
4. User can choose the vehicle size.
5. User can request a rider.
6. User can view the way that the rider comes from.

## Lessons Learned
1. Various ways of dynamically displaying data using React virtual DOM functions
2. Experienced to deal with various functions of React Hooks
3. Experienced to effectively use Material UI to display data
4. React and JavaScript Object Oriented Programming for better functionalities and to increase the re-usage of codes
5. Experienced to create API server using node.js to process the data with communicating with other clients and pass the data to client
6. Experienced to deploy the web and API server into AWS EC2

## Live Site
* You can see and test the live version here: <a href="https://ride.heegu.net" target="blank">ride.heegu.net</a>

## Screen shot
[Desktop]

![Omega Ride](https://github.com/heegupark/omega-ride/blob/master/ride-ss-001.gif)
