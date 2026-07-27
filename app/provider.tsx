"use client"
import { makeStore } from '@/redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const Provider = ({children}:{children:React.ReactNode}) => {

    const [query] = useState(()=> new QueryClient());
    const [reduxprovider] = useState(()=> makeStore)
  return (
    <QueryClientProvider client={query}>
       <ReduxProvider store={reduxprovider}>
        {children}
        </ReduxProvider>
    </QueryClientProvider>
  )
}

export default Provider