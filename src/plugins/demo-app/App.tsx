// @ts-nocheck

import React, { useContext } from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { Layout } from 'antd'
import Routes from './Routes'
import { ApplicationContext, FSTreeProvider, TLayout } from '@development-framework/dm-core'
import Content from './layout/Content'
import Menu from './layout/Menu'
import { Header } from "./layout/Header";

const MainLayout = (props: TLayout) => {
  const { content, settings } = props
  return (
    <>
      <Header appName={settings.label ?? settings.name}/>
      <Layout>
        <Menu />
        <Content settings={settings} content={content} />
      </Layout>
    </>
  )
}

const App = (): JSX.Element => {
  const settings = useContext(ApplicationContext)

  return (
    <FSTreeProvider visibleDataSources={settings.dataSources}>
    <Router>
      <Switch>

      {Routes.map((route) => (
        <Route
          exact
          path={route.path}
          key={route.path}
          render={() => (
            <MainLayout
              content={route.content}
              settings={settings}
            />
          )}
        />
      ))}
      </Switch>
    </Router>
    </FSTreeProvider>
  )
}

export default App
