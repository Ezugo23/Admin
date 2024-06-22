
import { Routes, Route } from 'react-router-dom';
import Resturant from '../../Component/Daily/resturant'
import Driver from "../../Component/Daily/driverTrans"

const Daily = () => {
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
