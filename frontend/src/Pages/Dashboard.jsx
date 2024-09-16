import React from 'react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast';



const Dashboard = () => {

  const { logout,error } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout Successful")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button className='w-full p-3 bg-purple-500 hover:bg-purple-900 text-white font-bold rounded-lg' onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Dashboard