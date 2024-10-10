import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../common'

interface LayoutProps {
  demoMode?: boolean
}

const Layout: React.FC<LayoutProps> = ({ demoMode = false }) => {
  return (
    <>
      <Header demoMode={demoMode} />
      <Outlet />
    </>
  )
}

export const DemoLayout: React.FC = () => <Layout demoMode />
export const ProtectedLayout: React.FC = () => <Layout />
