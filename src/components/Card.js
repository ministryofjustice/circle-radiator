import React, { Fragment } from 'react'
import moment from 'moment'

function Card ({ title, data: { lifecycle, status, user = {}, build_num, queued_at, workflows = {}, committer_name, vcs_revision = '' } = {} }) {

  function getInitials ($name = '') {
    return !user.avatar_url && $name ? $name.match(/\b(\w)/g).join('').toUpperCase() : ''
  }

  function getJobName ($job) {
    return $job ? $job.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') : ''
  }

  return (
    <Fragment>
      <div className="app-card--header">
        <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0 app-text-right app-text-grey">
          {status ? `${vcs_revision.substring(0, 7).toUpperCase()} - ${moment(queued_at).format('DD/MM/YYYY, HH:mm')}` : ' '}
        </p>
        <p className="govuk-heading-s govuk-!-margin-bottom-0">{status ? title : ' '}</p>
      </div>
      <div className={`app-card app-card--${status}`}>
        <table className="app-card-table" role="presentation">
          <tbody>
          <tr>
            <td>
              <p className="govuk-heading-l govuk-!-margin-0">{build_num}</p>
            </td>
            <td>
              <p className="govuk-!-margin-0">
                {status !== 'success' && status !== 'canceled' ? getJobName(workflows.job_name) : ''}
              </p>
            </td>
            <td>
              <p className="app-initials"
                 style={{ 'backgroundImage': `url(${user.avatar_url}` }}>{getInitials(committer_name)}</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default Card
