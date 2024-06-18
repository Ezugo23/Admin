
import { Routes, Route } from 'react-router-dom';
import Resturant from '../../Component/Daily/resturant'

const Daily = () => {
  return(
  <>
  <Routes>
<Route path='/*' element={<Resturant/>}/>
</Routes>
</>
);
};

export default Daily;
