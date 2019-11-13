import React, { Fragment, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import Card from './Card'

function Project ({ data: { vcs = 'gh', username, reponame, project, preprodjob, prodjob, ignoreCancelled } }) {

  const [data, setData] = useState({ dev: {}, preprod: {}, prod: {} })
  const fetchDataCallback = useCallback(fetchData, [])

  async function fetchData () {
    const result = await axios(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${reponame}`)
    configureData(result.data)
  }

  function configureData ($data) {

    function isWatchedBuild ($item) {
      return $item.hasOwnProperty('all_commit_details') && $item.all_commit_details.length && $item.all_commit_details[0].branch === 'master' && (!ignoreCancelled || $item.status !== 'canceled')
    }

    const devJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name !== preprodjob && $item.workflows.job_name !== prodjob
    }).shift()

    const preprodJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name === preprodjob
    }).shift()

    const prodJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name === prodjob
    }).shift()

    setData({ dev: devJobData, preprod: preprodJobData, prod: prodJobData })
    setTimeout(fetchData, 30 * 1000)
  }

  useEffect(() => {
    fetchDataCallback()
  }, [fetchDataCallback])

  return (
    <Fragment>
      <h2
        className="govuk-heading-m govuk-!-margin-top-8 govuk-!-text-colour-white govuk-!-margin-bottom-2">{project}</h2>

      <div className="govuk-grid-row">
        <section className="govuk-grid-column-one-third">

          <Card title="DEV" data={data.dev}/>

        </section>
        <div className="govuk-grid-column-one-third">

          <Card title="PRE-PROD" data={data.preprod}/>

        </div>
        <div className="govuk-grid-column-one-third">

          <Card title="PROD" data={data.prod}/>

        </div>
      </div>
    </Fragment>
  )
}

export default Project
