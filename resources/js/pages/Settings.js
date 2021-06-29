import cms from '../cms.json'
import {updateBodyStyle} from '../functions'
import React, {Component} from 'react'
import Headline from '../components/Headline'

class Settings extends Component {
  componentDidMount() {
    updateBodyStyle('settings')
  }

  componentDidUpdate() {
    updateBodyStyle('settings')
  }

  render() {
    return (
      <article key="settings__article" className={cms.theme.article}>
        <Headline key="settings__headline"
        hStyle={cms.components.headline.style+' bg-white'}
        headline={cms.settings.headline} copy={cms.settings.description} />
        <form id="settings__form" className="mb-0">
        { cms.settings.options &&
        <fieldset>
          { cms.settings.options.map( setting => {
              return (
            <div className="mb-3" key={`setting__${setting.name}`}>
              <label className="form-label" htmlFor={setting.name}>{setting.name}</label>
              <input readOnly aria-readonly id={setting.name} name={setting.name} defaultValue={setting.value} className="form-control"/>
            </div>
            )
          }) }
        </fieldset>
        }
        <fieldset>
          <div className="mb-3" key="theme__primary">
            <label className="form-label" htmlFor="theme__primary">Primary Color</label>
            <input readOnly aria-readonly id="theme__primary" name="theme__primary" defaultValue={cms.theme.primary} className="form-control"/>
          </div>
          <div className="mb-3" key="theme__secondary">
            <label className="form-label" htmlFor="theme__secondary">Secondary Color</label>
            <input readOnly aria-readonly id="theme__secondary" name="theme__secondary" defaultValue={cms.theme.secondary} className="form-control"/>
          </div>
          <div className="mb-3" key="theme__tertiary">
            <label className="form-label" htmlFor="theme__tertiary">Tertiary Color</label>
            <input readOnly aria-readonly id="theme__tertiary" name="theme__tertiary" defaultValue={cms.theme.tertiary} className="form-control"/>
          </div>
        </fieldset>
        <p>Additional colors are available via CSS variable names. They cannot be changed, but they can be used with the 'var(--color_name)' syntax.</p>
        </form>
      </article>
    )
  }
}

export default Settings