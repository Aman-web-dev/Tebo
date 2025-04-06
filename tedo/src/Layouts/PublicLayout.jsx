import React from 'react'
import { Route, Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <div>
        <main>
        <Outlet/>
        </main>
    </div>
  )
}

export default PublicLayout
