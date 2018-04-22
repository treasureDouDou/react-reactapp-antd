import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import styles from './admin.less'
import Header from './children/header'
import Content from './children/content'
import Footer from './children/footer'
import { routers } from '../../routers/router.config'
import { initRouters } from '../../routers/router.config'

const SubMenu = Menu.SubMenu

class Admin extends Component {
  rootSubmenuKeys = JSON.parse(JSON.stringify(initRouters))
  state = {
    collapsed: false,
    openKeys: [], // 打开的菜单
    selectedKeys: [], // 选中的菜单
    breadcrumb: [] // 面包屑
  }

  initShowMenu(pathname) {
    let selectedKeys = []
    let indexList = []
    this.rootSubmenuKeys.forEach((item, index) => {
      let result = this.findKeyFunc(item, pathname, index)
      if (
        result &&
        Object.prototype.toString.call(result) === '[object Object]'
      ) {
        selectedKeys = [result.findKey]
        indexList = result.indexList
      }
    })
    this.setState({ selectedKeys })
    const deepIndexList = (item, list, parentList) => {
      if (list.length > 2) {
        let index = list.shift()
        return deepIndexList(item[index].children, list, item[index])
      } else if (!list.length) {
        return parentList.menuName
      } else if (list.length === 1) {
        return item[list[0]].menuName
      }
    }
    // 根据当前需要高亮的序号，把其他不高亮的移除
    const deepIndex = (list, indexList) => {
      if (indexList.length === 1) {
        list.forEach(item => {
          item.isOpen = false
        })
        list[indexList.shift()].isOpen = true
      } else if (indexList.length > 1) {
        list.forEach((item, index) => {
          if (index !== indexList[0]) {
            item.isOpen = false
          } else {
            item.isOpen = true
          }
        })
        deepIndex(list[indexList.shift()].children, indexList)
      }
    }
    deepIndex(this.rootSubmenuKeys, indexList)
    if (!this.state.collapsed) {
      let openKeys = this.deepEachOpenKey()
      this.setState({ openKeys })
    }
  }

  componentDidMount() {
    this.initShowMenu(this.props.location.pathname)
    this.getBreadcrumb(this.props.location.pathname)
  }
  toggleCollapsed = () => {
    if (!this.state.collapsed) {
      // 重置菜单，全部关闭
      this.rootSubmenuKeys = JSON.parse(JSON.stringify(initRouters))
    }
    this.setState({
      collapsed: !this.state.collapsed,
      openKeys: []
    })
  }
  // 如果菜单是收缩状态
  onOpenChange = menu => {
    if (this.state.collapsed) {
      this.setState({
        openKeys: menu
      })
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.initShowMenu(nextProps.location.pathname)
      this.getBreadcrumb(nextProps.location.pathname)
    }
  }
  // 找到这个菜单属于哪个位置
  findKeyFunc(item, findKey, index, indexList = []) {
    if (item.children && item.children.length) {
      if (item.menuName === findKey) {
        indexList.push(index)
        // 点击的菜单节点,如一级菜单（包含子菜单）
        return indexList
      } else {
        if (item.children && item.children.length) {
          indexList.push(index)
        }
        // 点击的菜单节点,如二级菜单（包含子菜单）
        let retrunResult = []
        item.children.forEach((el, _index) => {
          let result = this.findKeyFunc(
            el,
            findKey,
            _index,
            JSON.parse(JSON.stringify(indexList))
          )
          if (
            result &&
            (result.length ||
              Object.prototype.toString.call(result) === '[object Object]')
          ) {
            retrunResult = result
          }
        })
        return retrunResult
      }
    } else if (item.path === findKey) {
      // 点击的路由页面菜单（不包含菜单）
      return {
        findKey,
        indexList
      }
    } else {
      return null
    }
  }
  menuClick({ key }) {
    this.getBreadcrumb(key)
    this.props.history.push(key)
  }
  // 获得面包屑
  getBreadcrumb = key => {
    let findKey = ''
    let indexList = []
    this.rootSubmenuKeys.forEach((item, index) => {
      let result = this.findKeyFunc(item, key, index)
      if (result && result.findKey) {
        findKey = result.findKey
        indexList = result.indexList
      }
    })
    if (!indexList.length) {
      let oData = this.rootSubmenuKeys.find(el => el.path === findKey)
      if (oData) {
        this.setState({
          breadcrumb: [oData.menuName]
        })
      }
    } else {
      let menuList = null
      let breadcrumb = []
      const deep = list => {
        if (list.length) {
          menuList =
            (menuList && menuList.children[list.shift()]) ||
            this.rootSubmenuKeys[list.shift()]
          breadcrumb.push(menuList.menuName)
          if (list.length) {
            deep(list)
          }
        }
      }
      deep(indexList)
      let lastMenuName = menuList.children.find(el => el.path === findKey)
        .menuName
      breadcrumb.push(lastMenuName)
      this.setState({
        breadcrumb
      })
    }
  }
  // 遍历对应的菜单栏进行,同等级的菜单关闭
  deepEach(list, indexList) {
    if (indexList.length > 1) {
      let nextIndex = indexList.shift()
      this.deepEach(list[nextIndex].children, indexList)
    } else if (indexList.length === 1) {
      let lastIndex = indexList.pop()
      let oldIsOpem = list[lastIndex].isOpen
      list.forEach(item => {
        item.isOpen = false
      })
      list[lastIndex].isOpen = !oldIsOpem
    }
  }
  // 遍历对应的菜单，筛选打开的菜单并且返回
  deepEachOpenKey() {
    const deepMenu = (item, list = []) => {
      if (item.children && item.children.length) {
        if (item.isOpen) {
          list.push(item.menuName)
        }
        item.children.forEach(el => {
          deepMenu(el, list)
        })
      }
    }
    let openKeysList = []
    this.rootSubmenuKeys.forEach(item => {
      deepMenu(item, openKeysList)
    })
    return openKeysList
  }
  setOpenKeys(key) {
    let getIndexList = []
    this.rootSubmenuKeys.forEach((item, index) => {
      let result = this.findKeyFunc(item, key, index)
      if (result && result.length) {
        getIndexList = result
      }
    })
    this.deepEach(this.rootSubmenuKeys, getIndexList)
  }
  // 点击多级菜单
  onTitleClick = ({ key }) => {
    if (!this.state.collapsed) {
      this.setOpenKeys(key)
      let openKeys = this.deepEachOpenKey()
      this.setState({ openKeys })
    }
  }
  render() {
    // 递归路由
    const mapRouters = item => {
      if (item.children && item.children.length) {
        // 存在子集
        return (
          <SubMenu
            onTitleClick={this.onTitleClick}
            key={item.menuName}
            title={
              <span>
                <Icon type={item.menuIco} />
                <span>{item.menuName}</span>
              </span>
            }
          >
            {item.children.map(child => mapRouters(child))}
          </SubMenu>
        )
      } else {
        // 没有子集
        return (
          <Menu.Item key={item.path}>
            <span>{item.menuName}</span>
          </Menu.Item>
        )
      }
    }
    // 只能同时打开一个
    return (
      <div className={styles.admin}>
        <div
          className={styles['left-menu']}
          style={{ width: this.state.collapsed ? '80px' : '200px' }}
        >
          <a className={styles.github} href="https://github.com/treasureDouDou">
            <svg
              aria-hidden="true"
              height="32"
              version="1.1"
              viewBox="0 0 16 16"
              width="32"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {this.state.collapsed ? '' : <span>兜兜里有糖 </span>}
          </a>
          <Menu
            /**
             * 这里openKeys如果inlineCollapsed是收缩的时候，会出现bug,最新版本尚未解决，所以收缩的时候暂时做如下简单处理,
             * https://github.com/ant-design/ant-design/issues/8587
             *
             * 收缩时，清空openKeys，菜单树isOpen重置， 根据onOpenChange回调判断当前显示
             * 注：不需要同时打开一个，删掉openKeys={this.state.openKeys}这句话
             */
            openKeys={this.state.openKeys}
            selectedKeys={this.state.selectedKeys}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            onOpenChange={this.onOpenChange}
            onClick={event => this.menuClick(event)}
          >
            {routers.map(item => {
              if (!item.children) {
                return (
                  <Menu.Item key={item.path}>
                    <Icon type={item.menuIco} />
                    <span>{item.menuName}</span>
                  </Menu.Item>
                )
              } else {
                return mapRouters(item)
              }
            })}
          </Menu>
        </div>
        <div
          className={styles['right-content']}
          style={{ marginLeft: this.state.collapsed ? '80px' : '200px' }}
        >
          <Header
          { ...this.props }
            toggleCollapsed={this.toggleCollapsed}
            collapsed={this.state.collapsed}
          />
          {
            <Content { ...this.props } breadcrumb={this.state.breadcrumb}>
              {this.props.children}
            </Content>
          }
          <Footer  />
        </div>
      </div>
    )
  }
}
export default Admin
