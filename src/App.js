import React, { Fragment } from 'react'

import { org, team, projects } from './data/config.json'

import Header from './components/Header'
import Project from './components/Project'

function App () {
  return (
    <Fragment>
      <Header org={org} team={team}/>
      <div className="govuk-width-container govuk-!-padding-bottom-8">
        <main id="main-content">

          {projects.map(($item, $key) =>
            <Project key={$key} data={$item}/>
          )}

        </main>
      </div>
    </Fragment>
  )
}

export default App
