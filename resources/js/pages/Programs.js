import cms from '../cms.json'
import {closeModal, updateBodyStyle} from '../functions'
import React, {Component} from 'react'
import Button from '../components/Button'
import Headline from '../components/Headline'
import { Table } from 'antd'

class Programs extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      selectedPrograms: []
    })

    this.deleteAll = this.deleteAll.bind(this)
  }

  //Parse the multi-selected list of programs, strip out the id, then find the Program in our list
  deleteAll() {
    let rows = this.state.selectedPrograms.map(r => {
      let row = r.substr(r.search('--') + 2)
      let entry = this.props.programs.filter(p => p.id === parseFloat(row))
      return entry[0]
    })
    this.props.deletePrograms(rows)
    this.setState({selectedPrograms: []})
  }

  componentMount() {
    updateBodyStyle()
  }

  componentDidUpdate() {
    updateBodyStyle()
  }

  render() {
    return (
      <article key="article__programs" className={cms.theme.article}>
        <Headline key="programs__headline"  add_new={{
          slug: 'New',
          callback: () => {
            this.props.createModal(`New Program`, '',[
            {
              label: 'Name',
              id: 'name',
              type: 'text', 
              required: true, 
              style: 'col-md-6'
            },{
              label: 'Semester',
              id: 'semester',
              type: 'text', 
              required: true, 
              style: 'col-md-6'
            },{
              label: 'Country',
              id: 'country_id',
              type: 'select', 
              required: true, 
              options: this.props.countries.map(co => {
                return { 
                  label: co.name,
                  value: co.id
                }
              }),
              style: 'mt-2 col-md-6'
            },{
              label: 'Suspended/Open',
              id: 'suspended',
              type: 'checkbox', 
              style: 'mt-2 col-md-6', 
              description: <span>This program is <span className="checked">suspended</span><span className="unchecked">open</span></span>, 
            }
          ],(obj) => {
            closeModal(this.props.resetModal)
            setTimeout(() => this.props.postProgram(obj), 3600)
            })
          }
        }}
        has_selected={this.state.selectedPrograms.length > 0 ? 'program' : false} num_selected={this.state.selectedPrograms ? this.state.selectedPrograms.length : 0} 
        hStyle={cms.components.headline.style+' bg-white'}
        headline={cms.programs.headline} copy={cms.programs.description}
        has_search={true} searchSubmit={this.props.searchSubmit}
        use_programs={true} deleteAll={this.deleteAll}/>
        <Table dataSource={this.props.programs} className={cms.components.table.style} 
          loading={this.props.programs.length ? false : true}
          rowKey={(record) => {
            return `programs__table__row--${record.id}`
          }}
          rowSelection={{
            onChange: rows => {
              this.setState({ selectedPrograms: rows })
            }
          }}
          rowClassName={(record) => {
            let style = "ant-table-clickable"
            if(record.suspended === 'on') {
              style += ' suspended'
            }
            return style
          }}
          columns={[
            {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
              align: 'center', 
              width: '1rem', 
              defaultSortOrder: 'descend',
              sorter: (a,b) => a.id - b.id
            },{
              title: 'Semester',
              dataIndex: 'semester',
              key: 'semester', 
              width: '7rem', 
              sorter: (a,b) => a.semester - b.semester
            },{
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter: (a,b) => a.name - b.name
            },{
              title: 'Country',
              dataIndex: 'countries',
              key: 'countries',
              render: (country) => {
                if( country.length ) {
                  return country[0].name
                }else{
                  return 'Uh oh! Looks like you have a program assigned to a country with that doesn\'t exist!'
                }
              }
            },{
              title: 'Action',
              dataIndex: 'Action',
              key: 'Action',
              align: 'center',
              width: '2rem',
              render: (text, record, index) => {
                return (
                <Button type="dropdown" is_enabled={true} 
                 ctas={[
                  {
                    label: 'Edit', 
                    target: '#main__modal_window', 
                    callback: () => {
                      this.props.editModal(`Edit Program #${record.id}`, '',[
                      {
                        label: 'id',
                        id: 'id',
                        type: 'hidden',
                        value: record.id
                      },{
                        label: 'Name',
                        id: 'name',
                        type: 'text', 
                        required: true, 
                        style: 'col-12', 
                        value: record.name
                      },{
                        label: 'Semester',
                        id: 'semester',
                        type: 'text', 
                        required: true, 
                        style: 'mt-2 col-md-6', 
                        value: record.semester
                      },{
                        label: 'Country',
                        id: 'countries',
                        type: 'select', 
                        required: true, 
                        multiple: true, 
                        options: this.props.countries.map(co => {
                          return { 
                            label: co.name,
                            value: co.id
                          }
                        }),
                        style: 'mt-2 col-md-6',
                        value: record.countries
                      },{
                        label: 'Suspended/Open',
                        id: 'suspended',
                        type: 'checkbox', 
                        style: 'mt-2 col-12', 
                        description: <span>This program is <span className="checked">suspended</span><span className="unchecked">open</span></span>, 
                        value: record.suspended === 'on' ? true : false
                      }
                    ],(obj) => {
                      closeModal(this.props.resetModal)
                      obj = this.props.parseProgram(obj)
                      this.props.editProgram(obj)
                      })
                    }
                  },{
                    label: 'Delete',
                    target: '#main__modal_window', 
                    style: 'text-danger',
                    callback: () => {
                      this.props.deleteModal(`Delete "${record.name}"`, '',[
                        {
                          label: 'id',
                          id: 'id',
                          type: 'hidden',
                          value: record.id
                        }
                      ],() => {
                        closeModal(this.props.resetModal)
                        setTimeout(() => {this.props.deleteProgram(record.id)}, 3600)
                      })
                    }
                  }]}/>
                )
              }
            }
          ]}
          pagination={'bottom'}/>
      </article>
    )
  }
}

export default Programs