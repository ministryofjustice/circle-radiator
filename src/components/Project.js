import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import Card from './Card'

function Project ({ data: { vcs = 'gh', username, reponame, project, preprodjob, prodjob, health = {}, ignoreCancelled } }) {

  const [data, setData] = useState({ dev: {}, preprod: {}, prod: {} })
  const fetchDataCallback = useCallback(fetchData, [])
  const fastPollRateSeconds = 10
  const pollRateSeconds = 30

  async function fetchData () {
    try {
      const result = await axios.get(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${reponame}`)
      configureData(result.data)
    } catch (e) {
      configureData({ status: e.status || 418 })
    }
  }

  async function fetchHealthData ($deployment, $status) {
    if (($status !== 'success' && $status !== 'fixed') || !$deployment) {
      return Promise.resolve({})
    }
    try {
      return await axios.get(`http://localhost:3030/health/${$deployment}`)
    } catch (e) {
      return Promise.resolve({ status: e.status || 418 })
    }
  }

  async function configureData ($data = []) {

    let devJobData
    let preprodJobData
    let prodJobData

    devJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name !== preprodjob && $item.workflows.job_name !== prodjob
    }).shift()

    preprodJobData = $data.filter($item => {
      return isWatchedBuild($item) && $item.workflows.job_name === preprodjob
    }).shift()

    prodJobData = $data.filter($item => {
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

    devJobData = devJobData || await axios.get(`http://localhost:3030/build/dev-${reponame}`)
    preprodJobData = preprodJobData || await axios.get(`http://localhost:3030/build/preprod-${reponame}`)
    prodJobData = prodJobData || await axios.get(`http://localhost:3030/build/prod-${reponame}`)

    if (devJobData) {
      if (health) {
        devJobData.health = await fetchHealthData(health.dev, devJobData.status)
      }
      await axios.put('http://localhost:3030/build', { type: 'dev', data: devJobData })
    }
    if (preprodJobData) {
      if (health) {
        preprodJobData.health = await fetchHealthData(health.preprod, preprodJobData.status)
      }
      await axios.put('http://localhost:3030/build', { type: 'preprod', data: preprodJobData })
    }
    if (prodJobData) {
      if (health) {
        prodJobData.health = await fetchHealthData(health.prod, prodJobData.status)
      }
      await axios.put('http://localhost:3030/build', { type: 'prod', data: prodJobData })
    }

    setData({ dev: devJobData, preprod: preprodJobData, prod: prodJobData })
    setTimeout(fetchData, ($data && shouldFastPoll() ? fastPollRateSeconds : pollRateSeconds) * 1000)
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
