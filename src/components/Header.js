import React, { Fragment } from 'react'

import { ReactComponent as Logo } from '../assets/moj-logotype-crest.svg'

function Header () {
  return (
    <Fragment>

      <a href="#main-content" className="govuk-skip-link">Skip to main content</a>

      <header className="moj-header" role="banner">
        <div className="moj-header__container">
          <div className="moj-header__logo">

            <Logo className="moj-header__logotype-crest govuk-header__logotype-crown"/>
            <span className="moj-header__link">
              <span className="moj-header__link moj-header__link--organisation-name">MoJ D&amp;T</span>&nbsp;
              <span className="moj-header__link moj-header__link--service-name">Probation in court</span>
            </span>

          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default Header
