import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Order.css';

const Reciept = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false);
  const [cancelingOrder, setCancelingOrder] = useState(false);
  const [reassigningRider, setReassigningRider] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleAcceptOrder = async () => {
    try {
      setAcceptingOrder(true);
      const response = await axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/restaurant/confirmorder/${orderId}`);
      
      if (response.status === 200) {
        toast.success("Order accepted successfully");
        setOrder(prevOrder => ({
          ...prevOrder,
          orderStatus: 'CONFIRMED'
        }));
      } else {
        throw new Error('Failed to confirm order');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setAcceptingOrder(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setCancelingOrder(true);
      const response = await axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/restaurant/declineorder/${orderId}`);
      
      if (response.status === 200) {
        toast.error("Order declined ❌");
        setOrder(prevOrder => ({
          ...prevOrder,
          orderStatus: 'DECLINED'
        }));
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setCancelingOrder(false);
    }
  };

  const handleReassignRider = async () => {
    try {
      setReassigningRider(true);
      const response = await axios.put(`https://delivery-chimelu-new.onrender.com/api/v1/driver/cancel/${orderId}`);
      
      if (response.status === 200) {
        toast.success("Rider reassigned successfully");
        setOrder(prevOrder => ({
          ...prevOrder,
          orderStatus: 'CONFIRMED'
        }));
      } else if (response.status === 400 && response.data.error === 	'Driver cannot cancel order, it is already on the way') {
        toast.error("Order can't be reassigned, it's already on the way");
      } else {
        throw new Error('Failed to reassign rider');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setReassigningRider(false);
    }
  };


  if (!order) {
    return <div>Loading...</div>;
  }

  if (!order.orderItems) {
    return <div>No items available</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0 }}>Invoice Layout</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/ordersHistory" style={{ textDecoration: 'none' }}>
            <p style={{
              boxSizing: 'border-box',
              width: '4rem',
              height: '2rem',
              border: 'solid #F9F9F9 0.5px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              margin: 0,
              lineHeight: '2rem',
              color: 'black'
            }}>
              Back
            </p>
          </Link>
        </div>
      </div>
      <div style={{ backgroundColor: 'white', height: 'auto', marginTop: "70px" }} className='w-full'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "40px" }}>
          <div style={{ marginLeft: "40px" }}>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '40px',
              lineHeight: '48.88px',
              color: '#3B5998',
              marginBottom: '90px',
              marginTop: '30px'
            }}>INVOICE</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#3B5998',
              marginTop: '30px'
            }}>Customer Details</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '23.44px',
              color: '#3B5998'
            }}>{order.userId?.username || 'N/A'}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black'
            }}>{order.userId?.email || 'N/A'} {order.userId?.phoneNumber || 'N/A'}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black',
              marginBottom: '70px'
            }}>{order.deliveryAddress?.address || 'N/A'}</p>
          </div>
          <div style={{ marginRight: "40px" }}>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '23.44px',
              color: '#3B5998'
            }}>{order.restaurantId?.restaurantName || 'N/A'}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#3B5998'
            }}>{order.restaurantId?.email || 'N/A'} {order.restaurantId?.phoneNumber || 'N/A'}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#3B5998',
              marginBottom: '90px'
            }}>{order.restaurantId?.address || 'N/A'}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '23.44px',
              color: '#3B5998'
            }}>Receipt</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#3B5998'
            }}>#{order.orderId}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black',
              marginBottom: "70px"
            }}>{new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
        </div>
        <hr className="border-#979797" style={{ border: 'solid #979797 0.2px' }} />
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ marginLeft: "20px" }}>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black'
            }}>DESCRIPTION</p>
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black'
            }}>QTY</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black'
            }}>PRICE (NGN)</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black'
            }}>SUBTOTAL</p>
          </div>
        </div>
        <hr className="border-#979797" style={{ border: 'solid #979797 0.2px' }} />
        {order.orderItems.map((item, index) => (
          <div key={index} style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
   <div>
  <p style={{
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: '17px',
    lineHeight: '16.58px',
    color: 'black',
    marginRight: '115px'
  }}>
    {item.foodId.title} (₦{item.foodId.price}) 
    {item.foodId.discount ? ` - Discounted Price: ₦${item.foodId.price * (1 - item.foodId.discount)}` : ''}
  </p>
  
  <p style={{
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '16.58px',
    color: 'black',
    marginLeft: '20px'
  }}>Side Items: <span>{item.additives.map(additive => `${additive.name} (₦${additive.price})`).join(', ')}</span></p>

</div>


<div style={{ display: 'flex', gap: '85px', marginLeft: '10px' }}>
  <p style={{ textAlign: 'center' }}>{item.quantity}</p>
  <p style={{ textAlign: 'center' }}>
      {item.foodId.price * (1 - item.foodId.discount || 0) + item.additives.reduce((total, additive) => total + additive.price, 0)}
    </p>
    <p style={{ marginRight: '40px' }}>
      {item.quantity * (item.foodId.price * (1 - item.foodId.discount || 0) + item.additives.reduce((total, additive) => total + additive.price, 0))}
    </p>
</div>



          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "50px" }}>
          <div>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              marginLeft: '20px',
              marginBottom: '20px'
            }}>
              <button
                className="btn btn-primary"
                onClick={handleAcceptOrder}
                disabled={order.orderStatus === 'CONFIRMED' || acceptingOrder}
                style={{
                  boxSizing: 'border-box',
                  width: '6rem',
                  height: '2rem',
                  border: 'solid #3B5998 0.5px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'white'
                }}
              >
                {acceptingOrder ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Accept"
                )}
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCancelOrder}
                disabled={order.orderStatus === 'DECLINED' || cancelingOrder}
                style={{
                  boxSizing: 'border-box',
                  width: '6rem',
                  height: '2rem',
                  border: 'solid #FF5252 0.5px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#FF5252',
                  color: 'white'
                }}
              >
                {cancelingOrder ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Refund"
                )}
              </button>
              <button
              className="btn btn-warning"
              onClick={handleReassignRider}
              disabled={reassigningRider}
              style={{
                boxSizing: 'border-box',
                width: '8rem',
                height: '2rem',
                border: 'solid #FFC107 0.5px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#FFC107',
                color: 'white'
              }}
            >
              {reassigningRider ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Reassign Rider"
              )}
            </button>
            </div>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black',
              marginLeft: "20px"
            }}>Rider: {order.assignedDriver?.username  || 'N/A'} ({order.driverFee  || 'N/A'} NGN)</p>              
          </div>
          <div>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black',
              marginBottom: '20px'
            }}>Delivery Fee: NGN {order.deliveryFee}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black',
              marginBottom: '20px'
            }}>Service Fee: NGN {order.serviceFee}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#3B5998',
              marginTop: '20px'
            }}>Total Amount</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '23.44px',
              color: '#3B5998'
            }}>NGN {order.grandTotal}</p>
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Reciept;
