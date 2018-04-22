import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initRouters } from './router.config'
import Bundle from './bundle'
// 404组件
import NotFound from '../containers/notFound/notFound'
// 加载中
import { Spin } from 'antd'

// 后台主页
const Admin = props => (
  <Bundle {...props} load={() => import('../containers/admin/admin.js')}>
    {Comp => {
      return Comp ? <Comp {...props} /> : <div>加载中...</div>
    }}
  </Bundle>
)

// 登录
const Login = props => (
  <Bundle {...props} load={() => import('../containers/login/login.js')}>
    {Comp => {
      return Comp ? <Comp {...props} /> : <div>加载中...</div>
    }}
  </Bundle>
)

class router extends Component {
  static propTypes = {
    isLogin: PropTypes.any,
    loading: PropTypes.bool
  }
  constructor(prop) {
    super(prop)
    initRouters.forEach(item => {
      this.deepAdminChildren(item, this.props)
    })
  }
  adminChildren = []

  // 找到admin下的菜单，便于404功能
  deepAdminChildren(item) {
    if (!item.children && item.component) {
      this.adminChildren.push(item)
    } else {
      item.children.map(el => this.deepAdminChildren(el))
    }
  }
  deepItem(item, props) {
    if (!item.children && item.component) {
      item.props = props
      return <Route key={item.path} {...item} />
    } else {
      return item.children.map(el => this.deepItem(el, props))
    }
  }
  render() {
    return (
      <Router>
        <Spin tip="拼命加载中..." spinning={this.props.loading}>
          <div
            style={{
              height: '100%'
            }}
          >
            {/* 监听路由变化 */}
            <Authverify {...this.props} adminChildren={this.adminChildren} />
            <Route path="/login" component={Login} />
            <Route
              path="/admin"
              render={item => (
                <Admin {...item} { ...this.props }>
                  {initRouters.map(el => this.deepItem(el, { ...this.props, ...item}))}
                </Admin>
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="/" component={Login} />
          </div>
        </Spin>
      </Router>
    )
  }
}

let beforeRouterName = ''

// 登录验证
const Authverify = withRouter(props => {
  const { location } = props
  const { pathname } = location
  if (beforeRouterName === pathname ) {
    return null 
  }
  if (!props.isLogin) {
    if (location.pathname === '/login') {
      return null
    }
    beforeRouterName = '/login'
    return <Redirect to="/login" />
  } else if (pathname !== '/login' && pathname !== '/not-found') {
    if (pathname === '/admin') {
      beforeRouterName = '/not-found'
      return <Redirect  to="/not-found" />
    } else {
      let findView = props.adminChildren.find(el => el.path === pathname)
      if (!findView) {
        beforeRouterName = '/not-found'
        return <Redirect  to="/not-found" />
      }
    }
  }
  beforeRouterName = pathname
  return <Redirect  to={ pathname } />
})

const mapState = state => {
  return {
    isLogin: state.verifyUser.isLogin,
    loading: state.loading.show
  }
}

export default connect(mapState)(router)
