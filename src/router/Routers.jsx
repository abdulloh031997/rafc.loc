import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { NotFound } from '../components/NotFound'
import { Dashboard } from '../layout/Dashboard'
import { Login } from '../pages/auth/Login'
import { Main } from '../pages/Dashboard'

export const Routers = () => {
  return (
    <div>
        <Routes>
              <Route path='/'>
                <Route index element={<Login/>}/>
              </Route>  
              <Route
                element={
                    <Dashboard>
                        <Outlet/>
                    </Dashboard>
                }>
                <Route path='/dashboard'>
                    <Route path='main'>
                        <Route index element={<Main/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}
