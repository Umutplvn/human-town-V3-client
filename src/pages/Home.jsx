import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const { token, userId, email, name } = useSelector(state => state.auth);
  
  return (
    <div>Home</div>
  )
}

export default Home