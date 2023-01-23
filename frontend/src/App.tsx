import './styles/global.css'
import './lib/dayjs'

import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { useQuery } from '@tanstack/react-query'
import { api } from './services/api'

export function App() {
  const { data, isLoading } = useQuery(['summary'], () => api.get('/summary'), {
    staleTime: Infinity,
    retry: false
  })

  if(isLoading){
    return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold'>Carregando...</div>
  }

  const summary = data?.data || []

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className='w-full max-w-5xl px-4 flex flex-col gap-16'>

        <Header />
        <SummaryTable summary={summary} />
      </div>
    </div>
  )
}