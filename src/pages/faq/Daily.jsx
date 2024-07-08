
import { Routes, Route, useNavigate } from 'react-router-dom';
import Resturant from '../../Component/Daily/resturant'
import Driver from "../../Component/Daily/driverTrans"
import { useEffect } from 'react';

const Daily = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      navigate('/Login');
    }
  }, [navigate]);
  return(
  <>
  <Routes>
<Route path='/*' element={<Resturant/>}/>
<Route path='driver' element={<Driver/>}/>
</Routes>
</>
);
};

export default Daily;
