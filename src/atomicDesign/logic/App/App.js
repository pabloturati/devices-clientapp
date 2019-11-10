import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from 'projectData/routes'
import Layout from 'atomicDesign/logic/Layout/Layout'
import Home from 'atomicDesign/pages/Home/Home'
import CRUDPage from 'atomicDesign/pages/CRUDPage/CRUDPage'

const App = () => {
  const routeList = [
    {
      exact: true,
      path: routes.add,
      component: CRUDPage
    },
    {
      exact: true,
      path: `${routes.edit}/:deviceId`,
      component: CRUDPage
    },
    {
      component: Home
    }
  ]
  return (
    <div className='App'>
      <BrowserRouter>
        <Layout>
          <Switch>
            {routeList.map((route, idx) => (
              <Route key={`${route}.${idx}`} exact {...route} />
            ))}
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
