import React from 'react'
import moment from 'moment'

function Card ({ title, downstream, data: { status, user = {}, build_num, queued_at, workflows = {}, committer_name, vcs_revision = '', health = {} } = {} }) {

  function getInitials ($name = '') {
    return !user.avatar_url && $name ? $name.match(/\b(\w)/g).join('').toUpperCase() : ''
  }

  function getJobName ($job) {
    return $job ? $job.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') : ''
  }

  return (
    <section>
      <div className="app-card--header">
        <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0 app-text-right">
          {status && (
            <span className="qa-date-time app-text-grey">
              {`${vcs_revision.substring(0, 7).toUpperCase()} - ${moment(queued_at).format('DD/MM/YYYY, HH:mm')}`}
            </span>
          )}
          {(status === 'success' || status === 'fixed') && downstream && (
            <mark className="app-mark govuk-!-margin-left-2">⇨</mark>
          )}
        </p>
        <p className="qa-title govuk-heading-s govuk-!-margin-bottom-0">{status ? title : ' '}</p>
      </div>
      <div className={`app-card app-card--${status}`}>
        <table className="app-card-table" role="presentation">
          <tbody>
          <tr>
            <td>
              <p className="govuk-heading-l govuk-!-margin-0 app-text-overlay">{build_num}</p>
            </td>
            <td>
              <p className="govuk-!-margin-0 app-text-overlay">
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
      {!!health.status && (
        <div
          className={`app-card app-card--small app-card--${!health.status ? '' : health.status === 200 ? 'success' : 'failed'}`}>
          <p
            className="govuk-heading-s app-text-overlay govuk-!-margin-bottom-0 govuk-!-margin-top-1">{!health.status ? '' : health.status === 200 ? 'Healthy' : 'Error'}</p>
        </div>
      )}
    </section>
  )
}

export default Card
