import Order from '../../Component/History/Order';
import { Routes, Route } from 'react-router-dom';
import Reciept from '../../Component/History/Reciept'

const History = () => {
  return(
  <>
<Routes>
<Route path='/' element={<Order/>}/>
  <Route path='invoice' element={<Reciept/>}/>
</Routes>
</>
)
};

export default History;
