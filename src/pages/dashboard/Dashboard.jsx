import React from 'react'
import './dashboard.scss'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import LoadingSpinner from './components/LoadingSpinner'
import OrdersTable from './components/OrdersTable'
import { useNavigateTop } from '../../global-components/custom-hooks/useNavigateTop'

const Dashboard = () => {
  
  useNavigateTop()
  const { id , email } = useSelector(  state => state.login )
  
  const fetcher = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}api/customer-orders.php?customer-id=${id}&customer-email=${email}`)
    const data = await res.json() 
    return data ;
  }      

  const {  data } = useSWR( 'customer-orders', fetcher )

  return (
    <section className='dashboard-page mt-md-3 py-2 py-md-3 px-1 px-md-2 mx-md-3 mx-xl-5'>
         <h5 className='mb-md-3 mt-2'> My Orders </h5>
          {  
            ( data ) ?  <OrdersTable products = { data } /> : <LoadingSpinner />
          }
    </section>
  )
}

export default Dashboard