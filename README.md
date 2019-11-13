# MoJ D&T - Circle Radiator

Circle Radiator is an internal-facing service designed to display a build radiator for projects using CircleCI.

The radiator is based on a *Development > Pre-Production > Production* pipeline for multiple projects.

The radiator is designed to run full-screen on a 1080p display with a maximum number of 5 projects. 

## Prerequisites

The radiator requires project configuration JSON data

```
./src/data/projects.json
```

An example file is provided.

```json
{
  "projects": [
    {
      "project": "Your project name",
      "username": "ministryofjustice",
      "reponame": "your-project",
      "preprodjob": "deploy_preprod",
      "prodjob": "deploy_prod",
      "ignoreCancelled": false
    },
    {
      "project": "Your 2nd project name",
      "username": "ministryofjustice",
      "reponame": "your-project-2",
      "preprodjob": "deploy_preprod",
      "prodjob": "deploy_prod",
      "ignoreCancelled": false
    },
    {
      "project": "Your 3rd project name",
      "username": "ministryofjustice",
      "reponame": "your-project-3",
      "preprodjob": "deploy_preprod",
      "prodjob": "deploy_prod",
      "ignoreCancelled": false
    }
  ]
}
```

Build states are based on existing CircleCI colours.

Cancelled jobs can be ignored by setting the *ignoreCancelled* flag if required.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
