# devices-clientapp

## Background and general information.

This project is a small frontend CRUD application for Devices containing: Device name, OS type and HDD capacity.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses visual elementes from [Reactstrap](https://reactstrap.github.io/) and [material-ui](https://material-ui.com/).

Project automated testing uses the following frameworks: [cypress][https://www.cypress.io/] for functional testing and [Jest](https://jestjs.io/) with [Enzime](https://www.npmjs.com/package/enzyme) for unit testing.

Continuous deployment uses [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) for integration and testing using Github. Visit [this link](https://dev.azure.com/pabloturati/devices-clientapp/_build?definitionId=2) to see the project pipelines. 

This project was built upon request by [ninjarmm](https://www.ninjarmm.com/).

## Quick start guide

To run the project's server:

1. Clone [devicesTask_serverApp](https://github.com/NinjaMSP/devicesTask_serverApp) repo to a local directory.

2. Navigate to the repo directory and install dependencies using `npm install`.

3. Once installed, start the server using the following script `npm start`.  The server will run by default in [http://localhost:3000/](http://localhost:3000/).

Refer the repo [devicesTask_serverApp](https://github.com/NinjaMSP/devicesTask_serverApp) readme file for further information.

Once the server is running, to run the frontend single application project [devices-clientapp](https://github.com/pabloturati/devices-clientapp), follow the next steps:

1. Clone the frontend project repo [devices-clientapp](https://github.com/pabloturati/devices-clientapp) into a local folder.

2. Navigate to the repository directory and run `npm install`

3. To start the project, use the command `npm start`.  Project will be served in port 5000. If the default browser does not open, navigate to [http://localhost:5000/](http://localhost:5000/).

## Testing 

#### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run cypress:open`

Launches the functional testing with the Cypress test runner in the interactive watch mode.

#### `npm run cypress`

Runs all the functional tests using the Cypress API in the console.

## Available Scripts

In the project directory, you can run:

### Development

#### `npm start`

IMPORTANT:  This project is setup to run by default in PORT 5000.  This change from the usual PORT 3000 was implemented to have the API [devicesTask_serverApp](https://github.com/NinjaMSP/devicesTask_serverApp) that uses port 3000. <br />

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run lint`

Code quality linting is installed using [StandardJS guidelines](https://standardjs.com/). `npm run lint` will perfomr and deep Standard JS lint and display code quality problems and errors. Configuration .eslintrc.json file may be found at the root folder.

#### `npm run generate-docs`

To generate (update) project code documentation files.  Uses self documentation with JSDoc.  Project documentation files can be found in the /Docs directory.  For rerefence visit `/docs/index.html`

### Production

#### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Continuous Deployment

### Production pipelines
Continuous deployment uses [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) for integration and testing using Github.

Visit [this link](https://dev.azure.com/pabloturati/devices-clientapp/_build?definitionId=2) to see the project pipelines. 

