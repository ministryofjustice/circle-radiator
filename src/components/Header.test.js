/* globals beforeEach, describe, it, expect */
import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

describe('Circle Radiator - Header component', () => {

  let component

  beforeEach(() => {
    component = shallow(<Header org="Your org" team="Your team name"/>)
  })

  it('renders the header component with the organisation name', () => {
    expect(component.find('.moj-header__link--organisation-name').text()).toBe('Your org')
  })

  it('renders the header component with the team name', () => {
    expect(component.find('.moj-header__link--service-name').text()).toBe('Your team name')
  })

})
