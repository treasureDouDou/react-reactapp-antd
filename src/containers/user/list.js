import React, { Component } from 'react'
import { Input, Row, Col, Button, Table } from 'antd'
import styles from './list.less'
import Dialog from './DialogAdd'
const Search = Input.Search

class Home extends Component {
  state = {
    name: '',
    list: [],
    filterList: [],
    visibel: false
  }
  componentWillMount = () => {
    let list = []
    for (let i = 0; i < 100; i++) {
      list.push({
        name: `张三${i}`,
        age: i,
        key: i,
        sex: Math.random() > 0.5 ? '男' : '女'
      })
    }
    this.setState({
      list,
      filterList: list
    })
  }

  onchange = e => {
    this.setState({
      name: e.target.value
    })
  }
  filterHandler = _ => {
    let name = this.state.name
    if (!name || name === '0') {
      this.setState({
        filterList: this.state.list
      })
      return false
    } else {
      let filterList = this.state.list.filter(el => {
        return el.name === name
      })
      this.setState({
        filterList
      })
    }
  }
  handleCancel = _ => {
    this.setState({
      visibel: false
    })
  }
  handleOk = value => {
    value.key = this.state.list.length + 1
    this.state.list.unshift(value)
    this.setState({
      visibel: false,
      list: this.state.list
    })
    this.filterHandler()
  }
  handleAdd = _ => {
    this.setState({
      visibel: true
    })
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={4}>
            <Search
              placeholder="姓名"
              onChange={this.onchange}
              value={this.state.name}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.filterHandler}>
              查询
            </Button>
          </Col>
          <Col span={4} offset={12}>
            <Button style={{ float: `right` }} onClick={this.handleAdd}>
              新增
            </Button>
          </Col>
        </Row>
        <div className={styles.table}>
          <Table
            dataSource={this.state.filterList}
            pagination={{ pageSize: 6 }}
          >
            <Table.Column title="姓名" dataIndex="name" />
            <Table.Column title="性别" dataIndex="sex" />
            <Table.Column title="年龄" dataIndex="age" />
          </Table>
        </div>
        <Dialog
          visibel={this.state.visibel}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        />
      </div>
    )
  }
}

export default Home
