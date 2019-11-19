/* globals jest, beforeEach, describe, it, expect */
import React from 'react'
import { shallow } from 'enzyme'

import { projects } from '../data/config.example'

import Project from './Project'
import Card from './Card'

jest.mock('axios')

describe('Circle Radiator - Card component', () => {

  let component

  beforeEach(() => {
    component = shallow(<Project data={projects[0]}/>)
  })

  it('renders the component with the correct heading', () => {
    expect(component.find('.govuk-heading-m').text()).toBe('Your project name')
  })

  it('renders three Card components', () => {
    expect(component.find(Card)).toHaveLength(3)
  })

})
