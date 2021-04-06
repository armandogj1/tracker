# Ticket Tracker Using TypeScript | Node | React | MongoDB

## Setup

Backend has it's own tsconfig
Frontend config is handle by create-react-app template
Both ends are kept isolated to ensure proper compilation and to prevent conflicts with globals like jest. Create react app threw errors on first attempt, jest install in backend caused an error
Tests are run without having to run `tsc` thanks to `ts-jest`
Had to include separate file to parse env variables to provide types
App's listen invocation had to be done in separate file to facilitate testing

## API

### `/board` Endpoint

- Arguments can be passed as a JSON payload
- Include board_id, title, description, statuses
- Returns JSON object with board values

### `/ticket` Endpoint

- Arguments can be passed as a JSON payload
- Include board_id, title, description, status, link
- Returns JSON object with board values

## Client

### API requests

- Will be done through helpers to ensure field validation before submit
- Drag and drop will be done with custom implementation
- State will be centralized using context and useReducer
- Plan to keep state updates top level, board is returned by most queries
- I could remove single ticket, will first implement version that rerenders whole board
- On main page select the board to use or create one
- In board tickets can be created through a modal or directly in the lists

### Tracking data

- On status change add a time stamp
- Use it to display progress on an application basis
- For the purpose of the chart only display their current status time stamp

### Notification

- Implement notifications
- Make Helpers to trigger notifications every day to remind outstanding tasks
- Possible have a dashboard to set the time of notifications
- posibly take user to the tickets
-
