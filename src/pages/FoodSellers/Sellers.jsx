import React from 'react';
import '../../style/user.css';
import Menu from '../../Component/FoodMenu/Menu';
import Personal from '../../Component/FoodMenu/Personal';
import Table from '../../Component/FoodMenu/tableMenu';
import Test from './test'
import { Routes, Route, Link } from 'react-router-dom';

export default function Sellers() {
  return (
    <>

      {/* Define routes for Menu and Personal components */}
      <Routes>
        {/* Route for the Menu component */}
        <Route path="/" element={<Table />} />
        
        <Route path="/personal" element={<Test />} />
        
        {/* Route for the Personal component */}
        <Route path="personal" element={<Personal />} />
      </Routes>
    </>
  );
}