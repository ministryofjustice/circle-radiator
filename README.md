# MoJ D&T - Circle Radiator

Circle Radiator is an internal-facing service designed to display a build radiator for projects using CircleCI.

The radiator is based on a *Development > Pre-Production > Production* pipeline for multiple projects.

The radiator is designed to run full-screen on a 1080p display with a maximum number of 5 projects. 

## Prerequisites

The radiator requires configuration JSON data

```
./src/data/config.json
```

An example file is provided.

```json
{
  "org": "Ministry of Justice",
  "team": "Your team name",
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

### Ignore changes to config file

The configuration JSON is required in order to run tests and build from GitHub so it cannot be omitted. 

Ignore your local changes to the configuration file:

```
git update-index --skip-worktree src/data/config.json
```
