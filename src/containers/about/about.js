import React, { Component } from 'react'
import styles from './about.less'
import doudou from '../../assets/imgs/doudou.jpg'
export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.about}>
        <img alt="" className={styles.img} src={doudou} />
        <br />
        一个菜鸡前端：兜兜
        <br />
        我的git地址:
        <br />
        <a href="https://github.com/treasureDouDou">
          https://github.com/treasureDouDou
        </a>
      </div>
    )
  }
}
