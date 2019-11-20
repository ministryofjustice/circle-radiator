/* globals beforeEach, describe, it, expect */
import React from 'react'
import { shallow } from 'enzyme'

import { jobData } from '../data/job-data.test'
import Card from './Card'

describe('Circle Radiator - Card component', () => {

  let component

  beforeEach(() => {
    component = shallow(<Card title="DEV" data={jobData}/>)
  })

  it('displays the card title', () => {
    const buildNum = component.find('.qa-title').text()
    expect(buildNum).toBe('DEV')
  })

  it('displays the build number', () => {
    const buildNum = component.find('.govuk-heading-l').text()
    expect(buildNum).toBe('308')
  })

  it('displays the truncated commit reference, build date and time', () => {
    const buildNum = component.find('.qa-date-time').text()
    expect(buildNum).toBe('380A578 - 13/11/2019, 14:27')
  })
})
