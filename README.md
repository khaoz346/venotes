# venotes

## Pre-req
- Node.js
- npm
- mysql 8.0.17 +

## Setup
- Clone repo
#### API
- `cd api`
- `npm i` to install dependencies
- `cd docker`
- `docker-compose up` to run mysql container. `docker-compose ps` to check if it is up and running. `docker-compose down` if you want to remove container.
- Open new terminal tab and `npm run server`
- Open new terminal tab and `cd ../../client` to begin client setup
#### CLIENT
- `npm i` to install dependencies
- `npm run start` to start react app

## Workflow

Develop in typescript and use `npm run tsc` script to compile to js. 
tbd
