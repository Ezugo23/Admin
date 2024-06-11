import React, { useState } from 'react';
import Menu from '../../Component/FoodMenu/Menu';
import Personal from '../../Component/FoodMenu/Personal';
import Password from '../../Component/FoodMenu/Password';
import { Routes, Route, useParams } from 'react-router-dom';
import Discount from '../../Component/FoodMenu/Discount';
export default function Test() {
  const { id } = useParams();
  return (
    <>
       <div className="flex" style={{justifyContent:'space-between'}}>
      {/* Render the Menu component */}
      <Menu id={id} />
      <Routes>
      {/* Render the Personal component */}
      <Route path="personal/:id" element={<Personal />} />
        <Route path="password/:id" element={<Password />} /> 
        <Route path="discount/:id" element={<Discount />} /> 
      </Routes>
    </div>
    </>
  );
}