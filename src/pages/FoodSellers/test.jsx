import Menu from '../../Component/FoodMenu/Menu';
import Personal from '../../Component/FoodMenu/Personal';
import { Routes, Route, Link } from 'react-router-dom';
export default function Test() {
  return (
    <>
       <div className="flex" style={{justifyContent:'space-between'}}>
      {/* Render the Menu component */}
      <Menu />
      
      {/* Render the Personal component */}
      <Personal />
    </div>
    </>
  );
}