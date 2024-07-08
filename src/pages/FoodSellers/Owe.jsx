// OverViewPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Filter from "../../Component/FoodMenu/oweamount/filter";
import Succeed from "../../Component/FoodMenu/oweamount/Paid";
import Failed from "../../Component/FoodMenu/oweamount/Pending";
import All from "../../Component/FoodMenu/oweamount/Failed";

export default function OverViewPage() {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <main> 
      <Filter setActiveLink={setActiveLink} />
      {/* <Header /> */}
      <div className={`${activeLink === 0 ? "block" : "hidden"}`}>
        <Succeed />
      </div>
      <div className={`${activeLink === 1 ? "block" : "hidden"}`}>
        <Failed />
      </div>
      <div className={`${activeLink === 2 ? "block" : "hidden"}`}>
        <All />
      </div>
    </main>
  );
}