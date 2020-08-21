# o-ride

> - Maintained by: `Heegu Park`

## Functionality Overview
### Client
- A client requests to create a username to a server(If a user doesn't input the username, it will generate random username.)
- A client requests to create a room to a server(If a user doesn't input the room name, it will generate random room name.)
- A client receives the list of rooms from a server and displays it in real time.
- A client receives the list of player from a server and displays it where the user is in real time.
- A client lets the user to play alone with a computer or play with other player
- A client displays what other player plays in real time
### Server
- A server processes the request from a client to create username.
- A server processes the request from a client to create room and returns the list of rooms to the client using socket communication.
- A server processes the request from a client that a user enters a room and returns the result to the client using socket communication.
- A server processes the request from a client that a user starts a game with a computer or other player and returns the result to the client using socket communication.
- A server processes the request from a client that a user plays and returns the result to the other player's client via socket communication.

## Features
1. Heavily used React to create all HTML elements(virtual DOM) to dynamically sync all data using socket.io via API server created by using Node.js
2. Used Express to run the API server
3. Used AWS EC2 for web and API server
4. Used socket.io to broadcast all activites in real time
5. Support most of mobile devices(iPad - Landsacpe/Portrait, iPhone X - Landsacpe/Portrait, iPhone 6s/7s/8s - Landsacpe/Portrait, iPhone 6/7/8 - Landsacpe/Portrait, and so on)

## Planned Features
1. User can create a username.
2. User can create a room.
3. User can view the list of rooms.
4. User can enter a room.
5. User can view the list of players.
6. User can check the status of other player.
7. User can play alone.
8. User can play with other player.
9. User can view how other player plays.

## Lessons Learned
1. Various ways of dynamically displaying data using React virtual DOM functions
2. Experienced to deal with various functions of React virtual DOM
3. Experienced to effectively use React and Bootstrap for displaying data
4. React and JavaScript Object Oriented Programming for better functionalities and to increase the re-usage of codes
5. Experienced to create API server using node.js to process the data with communicating with other clients and pass the data to client
6. Experienced to use socket.io to broadcast all memos from other users in real time
7. Experienced to deploy the web and API server into AWS EC2

## Live Site
* You can see and test the live version here: <a href="https://ride.heegu.net" target="blank">ride.heegu.net</a>

## Screen shot
[Desktop]

![Omega Ride](https://github.com/heegupark/omega-ride/dist/public/images/ride-ss-001.gif)
