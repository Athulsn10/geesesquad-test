import axios from 'axios'
import React, { useEffect } from 'react'

function Dashboard() {
  const getCompany = async()=>{
    const result =  axios.get("./cars.json")
    console.log(result);
  }
 

  return (
    <>
    <h2 className='text-center'>Dashboard</h2>

    </>
  )
}

export default Dashboard