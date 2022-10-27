import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Icon from '../design/Icons'
import './Menu.css'

const { Sider } = Layout

const AppMenu = (): JSX.Element => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const iconSize: 24 | 16 | 32 | 40 | 48 | undefined = 24
  return (
    <Sider
      style={{ borderRight: '#E6E6E6 1px solid', minHeight: '100vh' }}
      theme="light"
      width="250"
      collapsible
      //@ts-ignore
      collapsed={collapsed}
      //@ts-ignore
      onCollapse={(collapsed: boolean) => setCollapsed(collapsed)}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
      >
        <Menu.Item key={"1"} icon={<Icon name="home" size={iconSize} />}>
          <Link to={{ pathname: '/' }}>Overview</Link>
        </Menu.Item>
        <Menu.Item key={"2"}>
          <Link to={{ pathname: 'jobs' }}>Job example</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default AppMenu
