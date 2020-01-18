# Parkdude web client

## Folder structure

- `/src` source code folder
  - `/components` all components which are rendered into the view
  - `/helpers` helper functions and components which contain only small logic and aren't rendered into the view
  - `/store` Redux folder
    - `/actions` all action creators are here and they handle async code
    - `/reducers` each file is a peace of global state and they are merged into one global state in index.tsx file. They handle also functionality to modify the state
    - types.ts file includes the types and interfaces for the Redux folder.
  

## Setup instructions

### Required:
- install node
- install tslint extension for code editor (VSCode for example)

### Build & run:
  - clone this repository
  - ```cd parkdude-web-client```
  - install depencies ```npm install```
  - run program  ```npm start```
  
  ### Tests:
- Jest is used for testing the application
- run tests: ```npm test```

### Linter:
- run linter: ```npm run lint```
- fix linting errors: ```npm run fix```
