/* globals jest, beforeEach, describe, it, expect */
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import Header from './components/Header'
import Project from './components/Project'

jest.mock('./data/config.json', () => ({
  'org': 'Ministry of Justice',
  'team': 'Your team name',
  'projects': [
    {
      'project': 'Your project name',
      'username': 'ministryofjustice',
      'reponame': 'your-project',
      'preprodjob': 'deploy_preprod_job',
      'prodjob': 'deploy_prod_job',
      'ignoreCancelled': false
    },
    {
      'project': 'Your 2nd project name',
      'username': 'ministryofjustice',
      'reponame': 'your-project-2',
      'preprodjob': 'deploy_preprod_job',
      'prodjob': 'deploy_prod_job',
      'ignoreCancelled': false
    },
    {
      'project': 'Your 3rd project name',
      'username': 'ministryofjustice',
      'reponame': 'your-project-3',
      'preprodjob': 'deploy_preprod_job',
      'prodjob': 'deploy_prod_job',
      'ignoreCancelled': false
    }
  ]
}))

describe('Circle Radiator - App', () => {

  let component

  beforeEach(() => {
    component = shallow(<App/>)
  })

  it('renders with Header component', () => {
    expect(component.find(Header)).toHaveLength(1)
  })

  it('renders with a number of Project components based on config data', () => {
    expect(component.find(Project)).toHaveLength(3)
  })

})
