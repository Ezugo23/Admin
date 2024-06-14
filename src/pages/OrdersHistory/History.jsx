// History.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Order from '../../Component/History/Order';
import Reciept from '../../Component/History/Reciept';

const History = ({ socket }) => {
  return (
    <Routes>
      <Route path="/" element={<Order socket={socket} />} />
      <Route path="receipt/:orderId" element={<Reciept socket={socket} />} />
    </Routes>
  );
};

export default History;
