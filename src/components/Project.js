import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import Card from './Card'

function Project ({ data: { vcs = 'gh', username, reponame, project, preprodjob, prodjob, ignoreCancelled } }) {

  const [data, setData] = useState({ dev: {}, preprod: {}, prod: {} })
  const fetchDataCallback = useCallback(fetchData, [])
  const fastPollRateSeconds = 10
  const pollRateSeconds = 30

  async function fetchData () {
    const result = await axios.get(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${reponame}`)
    configureData(result.data)
  }

  function configureData ($data) {
    const devJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name !== preprodjob && $item.workflows.job_name !== prodjob
    }).shift()

    const preprodJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name === preprodjob
    }).shift()

    const prodJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name === prodjob
    }).shift()

    function isWatchedBuild ($item) {
      return $item.branch === 'master' && $item.hasOwnProperty('workflows') && (!ignoreCancelled || $item.status !== 'canceled')
    }

    function shouldFastPoll () {
      const fastPollStatuses = ['running', 'queued', 'not_running']
      return (devJobData && fastPollStatuses.some(el => devJobData.status.includes(el))) ||
        (preprodJobData && fastPollStatuses.some(el => preprodJobData.status.includes(el))) ||
        (prodJobData && fastPollStatuses.some(el => prodJobData.status.includes(el)))
    }

    setData({ dev: devJobData, preprod: preprodJobData, prod: prodJobData })
    setTimeout(fetchData, (shouldFastPoll() ? fastPollRateSeconds : pollRateSeconds) * 1000)
  }

  useEffect(() => {
    fetchDataCallback()
  }, [fetchDataCallback])

  return (
    <section className="govuk-!-margin-top-8">
      <h2
        className="govuk-heading-m govuk-!-text-colour-white govuk-!-margin-bottom-2">{project}</h2>

      <div className="govuk-grid-row">
        <section className="govuk-grid-column-one-third">

          <Card title="DEV" data={data.dev} downstream={data.preprod && data.preprod.hasOwnProperty('status')}/>

        </section>
        <div className="govuk-grid-column-one-third">

          <Card title="PRE-PROD" data={data.preprod} downstream={data.prod && data.prod.hasOwnProperty('status')}/>

        </div>
        <div className="govuk-grid-column-one-third">

          <Card title="PROD" data={data.prod}/>

        </div>
      </div>
    </section>
  )
}

export default Project
