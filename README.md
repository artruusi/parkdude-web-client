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
  - install depencies ```npm install```
  - run program in develoment mode  ```npm start```
  - create a production build  ```npm run build```
  
  ### Tests:
- Jest is used for testing the application
- run tests: ```npm test```

### Linter:
- run linter: ```npm run lint```
- fix linting errors: ```npm run fix```

## Documentation

### Components

Each page has it's own component, expect employees and customers. They share Persons component and use the same data from the store. The only difference  is that the data is filtered differently. For example, if someone wants to modify tables' content it is easily  done by changing filtering.

Routing uses PrivateRoute from helpers folder to prevent unauthorized users to see the page. After PrivateRoute routing uses Layout component which adds Header component add page component to screen. 

Data is fetched from the server every time when a user navigates to different page. After creating  a new parking spot or user data is refreshed from the server by getting all parking spots/users. Only time when data is not refreshed after an action is delete selected items from the tables, then deleted items are removed from the store but not getting new values from the server. Delete multiple  items is also only non-atomic operation in database.

### Environment variables

Following environment variables needs to excist in some .env file. 
- ```REACT_APP_API_URL``` back-end server root route 
- ```REACT_APP_GOOGLE_LOG_IN``` back-end server's route which starts google auth0 log in
- ```REACT_APP_COMPANY_EMAIL``` email which is used in front end to separate customers and employys

## Known bugs

User dropdown in header doesn't close when the mouse is moved out from the dropdown from above.