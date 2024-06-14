import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Order.css';

const Reciept = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://swifdropp.onrender.com/api/v1/orders/${orderId}`);
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
          <button style={{
            boxSizing: 'border-box',
            width: '4rem',
            height: '2rem',
            border: 'solid #F9F9F9 0.5px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#3B5998',
            color: 'white'
          }}>Print</button>
          <p style={{
            boxSizing: 'border-box',
            width: '2rem',
            height: '2rem',
            border: 'solid #F9F9F9 0.5px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'white'
          }}>+</p>
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
            }}>{order.userId?.email || 'N/A'} {order.userId?.phoneNumber|| 'N/A'}</p>
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
            }}>{order.restaurantId?.email || 'N/A'}</p>
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
              }}>{item.foodId.title}</p>
              <p style={{
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '16.58px',
                color: 'black',
                marginLeft: '20px'
              }}>Side Items: <span>{item.additives.map(additive => additive.name).join(', ')}</span></p>
            </div>
            <div style={{ display: 'flex', gap: '85px' }}>
              <p style={{ textAlign: 'center' }}>{item.quantity}</p>
              <p style={{ textAlign: 'center' }}>{item.price}</p>
              <p style={{ marginRight: '40px' }}>{item.quantity * item.price}</p>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "50px" }}>
          <div>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '23.44px',
              color: '#3B5998',
              marginLeft: "20px"
            }}>Food city</p>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
              marginLeft: '20px',
              marginBottom: '20px'
            }}>
              <p style={{
                boxSizing: 'border-box',
                width: '6rem',
                height: '2rem',
                border: 'solid #FF5252 0.5px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}>Decline</p>
              <p style={{
                boxSizing: 'border-box',
                width: '6rem',
                height: '2rem',
                border: 'solid #FF5252 0.5px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#FF5252',
                color: 'white'
              }}>Refund</p>
            </div>
          </div>
          <div>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#3B5998',
              marginTop: '30px'
            }}>Total Amount</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '23.44px',
              color: '#3B5998'
            }}>NGN {order.grandTotal}</p>
            <p style={{
              fontFamily: 'Roboto',
              fontWeight: '300',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: 'black',
              marginBottom: '20px'
            }}>VAT included</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reciept;
