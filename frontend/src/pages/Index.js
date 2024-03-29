import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import TopMenu from '../common/TopMenu'
import Login from './Login'

const Index = () => {
  return <>
    <TopMenu />
    <Route path="/" exact={true} component={Home} />
    <Route path="/login" component={Login} />
  </>

}

export default Index
