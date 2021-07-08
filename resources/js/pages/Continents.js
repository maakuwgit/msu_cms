import cms from '../cms.json'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Headline from '../components/Headline'
import { Table } from 'antd'

class Continents extends Component {

  componentDidUpdate() {
    this.props.getPage('continents')
  }

  render() {
    return (
      <article key="article__cms.continents." className={cms.theme.article}>
        <Headline key="cms.continents.__headline" 
        hStyle={cms.components.headline.style + ' bg-white'}
        headline={cms.continents.headline} copy={cms.continents.description}/>
        { this.props.continents &&
        <Table dataSource={this.props.continents} className={cms.components.table.style} 
          loading={this.props.continents.length ? false : true}
          rowKey={(record) => {
            return `cms.continents.__table__row--${record.id}`
          }}
          columns={[
            {
              title: 'Continents',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: 'Countries',   
              className:'inline-list',
              dataIndex: 'countries',
              key: 'countries',
              render: (countries, record) => {
                let arr = this.props.countries.filter(c => record.id === c.continent_id)
                let links = arr.map((anchor,a) => {
                  if(anchor.enabled === 'on') {
                    return <Link key={`country--${a}`} to={`/admin/countries/${anchor.slug}`}>{anchor.name}</Link>
                  }else{
                    return <span key={`country--${a}`}>{anchor.name}</span>
                  }
                })
                return <nav className="d-flex flex-wrap w-100">{links}</nav>
              }
            }
          ]}
          pagination={false}/>
        }
      </article>
    )
  }
}

export default Continents