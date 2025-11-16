import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const { token, userId, email, name } = useSelector(state => state.auth);

  console.log(token, userId, email, name);
  return (
    <div>Home</div>
  )
}

export default Home