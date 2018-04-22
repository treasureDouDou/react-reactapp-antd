import React, { Component } from 'react'
import styles from './404.less'
export default class NotFound extends Component {
    render() {
        return (
            <div className={styles['not-found']}>
                找不到该路径，您进入了网络异次元
            </div>
        )
    }
}