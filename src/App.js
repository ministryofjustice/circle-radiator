import React, { Fragment } from 'react'
import { projects } from './data/projects'

import Header from './components/Header'
import Project from './components/Project'
import Footer from './components/Footer'

function App () {
  return (
    <Fragment>
      <Header/>
      <div className="govuk-width-container">
        <main id="main-content">

          {projects.map(($item, $key) =>
            <Project key={$key} data={$item}/>
          )}

        </main>
      </div>
      <Footer/>
    </Fragment>
  )
}

export default App
