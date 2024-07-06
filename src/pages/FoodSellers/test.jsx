import React, { useState } from 'react';
import Menu from '../../Component/FoodMenu/Menu';
import Personal from '../../Component/FoodMenu/Personal';
import Password from '../../Component/FoodMenu/Password';
import { Routes, Route, useParams } from 'react-router-dom';
import Discount from '../../Component/FoodMenu/Discount';
import Side from '../../Component/SideItems/Main'
import Main from '../../Component/FoodMenu/Info'
import Edit from '../../Component/FoodMenu/EditFood'
import Food from '../../Component/FoodMenu/foodMenu'
import History from '../../Component/FoodMenu/HistoryOrder'
import MainPayment from '../../Component/Payment/Main'
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
        <Route path="side-items/:id" element={<Side />} /> 
        <Route path="resturant-information/:id" element={<Main />} />
        <Route path="add-menu/:id" element={<Edit />} />
        <Route path="food-menu/:menuId/:foodname" element={<Food />} />
        <Route path="order-history/:id" element={<History />} />
        <Route path="payout-management/:id" element={<MainPayment />} />
      </Routes>
    </div>
    </>
  );
}