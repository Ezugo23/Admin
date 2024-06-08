import Menu from '../../Component/FoodMenu/Menu';
import Personal from '../../Component/FoodMenu/Personal';
import Password from '../../Component/FoodMenu/Password';
import { Routes, Route, Link } from 'react-router-dom';
export default function Test() {
  return (
    <>
       <div className="flex" style={{justifyContent:'space-between'}}>
      {/* Render the Menu component */}
      <Menu />
      <Routes>
      {/* Render the Personal component */}
      <Route path="personal" element={<Personal />} />
        <Route path="password" element={<Password />} />
      </Routes>
    </div>
    </>
  );
}