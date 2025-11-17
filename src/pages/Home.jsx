import React from 'react'
import { useSelector } from 'react-redux';
import ResponsiveDrawer from '../components/ResponsiveDrawer';

const Home = () => {
  const { token, userId, email, name } = useSelector(state => state.auth);
  
  return (
    <div>
      <ResponsiveDrawer/>
    </div>
  )
}

export default Home