import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from 'projectData/routes'

// Pages
import Home from 'atomicDesign/pages/Home/Home'
import Edit from 'atomicDesign/pages/Edit/Edit'

const App = () => {
  const routeList = [
    {
      exact: true,
      path: routes.add,
      component: Edit
    },
    {
      exact: true,
      path: routes.edit,
      component: Edit
    },
    {
      exact: true,
      path: routes.remove,
      component: Edit
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
            <Route key={`${route}.idx`} exact {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
