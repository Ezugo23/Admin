import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import Add from "./Add"; // Assuming the Add component is in the same directory
import Edit from "./Edit";
import { Spinner } from "react-bootstrap";
// import DeleteConfirmationModal from '../Others/DeleteConfirmationModal';
import "./style.css";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [showAddDiscount, setShowAddDiscount] = useState(false);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editDiscountDetails, setEditDiscountDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);

  const fetchDiscounts = async () => {
    try {
      const storedRestaurantId = localStorage.getItem('userId')
      if (!storedRestaurantId) {
        navigate('/signin');
        return;
      }
      const response = await fetch(`https://swifdropp.onrender.com/api/v1/restaurant/${storedRestaurantId}/restaurantDiscount`);
      const data = await response.json();
      setDiscounts(data.data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (discountId) => {
    setSelectedDiscountId(discountId);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    const discountId = selectedDiscountId;

    try {
      const response = await fetch(
        `https://swifdropp.onrender.com/api/v1/restaurant/delete-discount/${discountId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // Remove the deleted discount from the UI
        const updatedDiscounts = discounts.filter(
          (item) => item._id !== discountId
        );
        setDiscounts(updatedDiscounts);
      } else {
        throw new Error('Failed to delete discount');
      }
    } catch (error) {
      console.error('Error deleting discount:', error);
      alert('Failed to delete discount');
    }

    setShowDeleteModal(false);
  };

  // Sort discounts according to criteria: ongoing first, applied false next, expired last
  const sortedDiscounts = discounts.sort((a, b) => {
    if (a.applied && !a.ended && (!b.applied || b.ended)) {
      return -1; // a comes first
    } else if ((!a.applied || a.ended) && b.applied && !b.ended) {
      return 1; // b comes first
    } else {
      // Both discounts have the same status or neither is ongoing
      // Sort by createdAt date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleAddDiscountClick = () => {
    setShowAddDiscount(true);
  };

  const handleEditDiscountClick = (discount) => {
    setEditDiscountDetails(discount); 
    setShowEditDiscount(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusText = (discount) => {
    const endDate = formatDate(discount.endDate);
    const startDate = formatDate(discount.startDate);
    if (discount.ended) {
      return `Expired on ${endDate}`;
    } else if (discount.applied) {
      return `Ongoing till ${endDate}`;
    } else {
      return `From ${startDate} to ${endDate}`;
    }
  };

  const getDescriptionText = (discount) => {
    const percent = (discount.discount * 100).toFixed(0);
    if (discount.discountType === 'allMenu') {
      return `${percent}% off on all menu`;
    } else {
      const menuNames = discount.selectedMenuItems.map(item => item.name).join(", ");
      return `${percent}% off on  ${menuNames}`;
    }
  };

  const isDiscountExpired = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    return now > end;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-80">
        <Spinner className='spinner-green' animation="grow" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex p-3 overflow-x-auto text-sm font-semibold items-center mt-5 justify-between" style={{ backgroundColor: "#3B503C" }}>
        <p className="text-lg font-semibold text-white">Discounts</p>
        <p
          onClick={handleAddDiscountClick}
          className="px-2 py-1 shadow-md cursor-pointer rounded-md bg-white text-sm font-semibold text-green-500"
        >
          Add Discount
        </p>
      </div>
      {sortedDiscounts.map((discount) => (
        <div key={discount._id} className="discount-container">
          <div className="discount-details">
            <p className="font-semibold text-base">{getDescriptionText(discount)}</p>
            <p className="text-sm">{getStatusText(discount)}</p>
          </div>
          <div className="discount-percentage">
            <p className="font-semibold text-base">{(discount.discount * 100).toFixed(0)}%</p>
          </div>
          <div className="discount-actions">
            <BsTrash
              className="text-red-500 text-lg cursor-pointer"
              onClick={() => handleDeleteClick(discount._id)} // Pass discount ID to handleDeleteClick
            />
            <BiEdit
              className={`text-xl ${isDiscountExpired(discount.endDate) ? "text-gray-400 cursor-not-allowed" : "text-green-500 cursor-pointer"}`}
              onClick={() => !isDiscountExpired(discount.endDate) && handleEditDiscountClick(discount)}
            />
          </div>
        </div>
      ))}

      {showAddDiscount && <Add onClose={() => setShowAddDiscount(false)} />}
      {showEditDiscount && <Edit onClose={() => setShowEditDiscount(false)} discount={editDiscountDetails} />} 
      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Discount;
