import React, { Component } from 'react'
import styles from './admin.less'
import { Breadcrumb } from 'antd'
class App extends Component {
  render() {
    const extraBreadcrumbItems = this.props.breadcrumb.map((el, index) => {
      return <Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
    })
    return (
      <div className={styles.content}>
        <div className={styles.breadcrumb}>
          <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
        </div>
        <div className={styles['show-view']}>
        {this.props.children}
        </div>
      </div>
    )
  }
}
export default App
