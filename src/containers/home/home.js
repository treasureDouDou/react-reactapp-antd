import React, { Component } from 'react'
import { Card, Row, Col, Icon, Timeline, Table } from 'antd'
import styles from './home.less'
import { loading } from '../../actions/rootActions'
const { Column } = Table;
const labelStyle = {
  fontSize: `10px`,
  fontWeight: `600`,
  padding: `3px 8px`,
  textShadow: `none`,
  borderRadius: `2px`,
  color: `#fff`
}

const Label = props => {
  return (
    <span style={{ ...labelStyle, backgroundColor: props.color }}>
      {props.children}
    </span>
  )
}

class Home extends Component {
  render() {
    const data = [
      {
        title: '防盗门',
        date: '2014.9.15',
        money: '483',
        key: 1
      },
      {
        title: '衣柜',
        date: '2014.9.15',
        money: '327.',
        key: 2
      },
      {
        title: '橱柜',
        date: '2014.9.15',
        money: '483',
        key: 3
      },
      {
        title: '手机',
        date: '2014.9.15',
        money: '483',
        key: 4
      },
      {
        title: '显示器',
        date: '2014.9.15',
        money: '483',
        key: 5
      }
    ]
    return (
      <div className={styles.home}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Card title="收入" extra={<Label color="#1c84c6">月</Label>}>
              <div className={styles.box}>
                <h1 className={styles.number}>40 886,200</h1>
                <div className={styles.percentage} style={{ color: `#1c84c6` }}>
                  98%{' '}
                  <Icon
                    type="star"
                    style={{ fontSize: 14, color: '#1c84c6' }}
                  />
                </div>
                <small>总收入</small>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card title="订单" extra={<Label color="#23c6c8">全年</Label>}>
              <div className={styles.box}>
                <h1 className={styles.number}>275,800</h1>
                <div className={styles.percentage} style={{ color: `#23c6c8` }}>
                  35%{' '}
                  <Icon
                    type="arrow-up"
                    style={{ fontSize: 14, color: '#23c6c8' }}
                  />
                </div>
                <small>新订单</small>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card title="访客" extra={<Label color="#1ab394">今天</Label>}>
              <div className={styles.box}>
                <h1 className={styles.number}>106,120</h1>
                <div className={styles.percentage} style={{ color: `#1ab394` }}>
                  18%{' '}
                  <Icon
                    type="arrow-up"
                    style={{ fontSize: 14, color: '#1ab394' }}
                  />
                </div>
                <small>新访客</small>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              title="活跃用户"
              extra={<Label color="#ed5565">最近一个月</Label>}
            >
              <div className={styles.box}>
                <h1 className={styles.number}>80,600</h1>
                <div className={styles.percentage} style={{ color: `#ed5565` }}>
                  38%{' '}
                  <Icon
                    type="arrow-down"
                    style={{ fontSize: 14, color: '#ed5565' }}
                  />
                </div>
                <small>12月</small>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: 15 }}>
          <Col className="gutter-row" span={8}>
            <Card title="项目进度">
              <Timeline>
                <Timeline.Item dot={<Icon type="loading" />}>
                  <strong>服务器已彻底崩溃</strong>{' '}
                  <p style={{ margin: `5px 0` }}>还未检查出错误</p>
                  <p style={{ margin: `5px 0` }}>12:00</p>
                </Timeline.Item>
                <Timeline.Item>
                  <strong>喝水、上厕所、做测试</strong>{' '}
                  <p style={{ margin: `5px 0` }}>
                    喝了4杯水，上了3次厕所，控制台输出出2324个错误，神啊，带我走吧{' '}
                  </p>
                  <p style={{ margin: `5px 0` }}>11:00</p>
                </Timeline.Item>
                <Timeline.Item>
                  <strong>项目经理打电话来了</strong>{' '}
                  <p style={{ margin: `5px 0` }}>
                    TMD，项目经理居然还没有起床！！！
                  </p>
                  <p style={{ margin: `5px 0` }}>10:00</p>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
          <Col className="gutter-row" span={16}>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                <Card title="交易详情">
                  <Table dataSource={data}>
                    <Column title="交易" dataIndex="title" key="title" />
                    <Column title="日期" dataIndex="date" key="date" />
                    <Column title="销售额" dataIndex="money" key="money" />
                  </Table>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
