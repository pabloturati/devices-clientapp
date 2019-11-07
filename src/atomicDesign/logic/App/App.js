import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from 'projectData/routes'

// Pages
import Home from 'atomicDesign/pages/Home/Home'

const App = () => {
  const routeList = [
    {
      exact: true,
      route: routes.add,
      component: Home
    },
    {
      exact: true,
      route: routes.edit,
      component: Home
    },
    {
      exact: true,
      route: routes.remove,
      component: Home
    },
    {
      component: Home
    }
  ]

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          {routeList.map((route, idx) => (
            <Route key={idx} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
