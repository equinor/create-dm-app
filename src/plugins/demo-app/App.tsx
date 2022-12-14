// @ts-nocheck

import React, { ReactNode, useContext } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import Routes from './Routes'
import {
  ApplicationContext,
  FSTreeProvider,
} from '@development-framework/dm-core'
import Content from './layout/Content'
import Menu from './layout/Menu'
import { Header } from './layout/Header'
import { TApplicationSettings } from './Types'

const MainLayout = (props: {
  content: ReactNode
  settings: TApplicationSettings
}) => {
  const { content, settings } = props
  return (
    <>
      <Header appName={settings.label ?? settings.name} />
      <Layout>
        <Menu />
        <Content settings={settings} content={content} />
      </Layout>
    </>
  )
}

const App = (): JSX.Element => {
  const settings: TApplicationSettings = useContext(ApplicationContext)

  return (
    <FSTreeProvider visibleDataSources={settings.dataSources}>
      <Router>
        <Switch>
          {Routes.map((route) => {
            return (
              <Route path={route.path} exact key={route.path}>
                <MainLayout
                  content={route.content}
                  settings={settings}
                  allApps={[]}
                />
              </Route>
            )
          })}
          <Route path="*">
            <div style={{ textAlign: 'center', padding: '10%' }}>
              Undefined route. Please go back.
            </div>
          </Route>
        </Switch>
      </Router>
    </FSTreeProvider>
  )
}

export default App
