import React from 'react'
import Bundle from './bundle'

const routers = [
  {
    menuName: '主页',
    menuIco: 'home',
    component: 'home/home.js', // 主页
    path: '/admin/home' // 主页
  },
  {
    menuName: '用户',
    menuIco: 'user',
    children: [
      {
        menuName: '用户列表',
        component: 'user/list.js', // 主页
        path: '/admin/user/list' // 主页
      }
    ]
  },
  {
    menuName: '多级菜单',
    menuIco: 'setting',
    children: [
      {
        menuName: '多级菜单2',
        children: [
          {
            menuName: '菜单',
            component: 'user/list.js', // 主页
            path: '/admin/user/list3' // 主页
          }
        ]
      }
    ]
  },
  {
    menuName: '关于我',
    menuIco: 'smile-o',
    component: 'about/about.js', // 主页
    path: '/admin/about' // 主页
  }
]

// 递归路由
const mapRouters = item => {
  if (item.children && item.children.length) {
    // 存在子集
    item.children = item.children.map(child => mapRouters(child))
  } else {
    // 不存在子集
    let component = item.component
    item.props = {}
    item.component = function(props){
      return (
      <Bundle { ...props } load={() => import('../containers/' + component)}>
        {Comp => {
          return Comp ? <Comp {...props} { ...item.props } /> : <div>加载中...</div>
        }}
      </Bundle>
      )
    }
    }
    return item
  }

const initRouters = routers.map(item => {
  return mapRouters(item)
})
export { initRouters, routers }
