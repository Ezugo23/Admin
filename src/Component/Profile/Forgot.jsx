import React, { useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { GiPadlock } from 'react-icons/gi'; //

export default function Forgot({ onClose }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [restaurantId, setRestaurantId] = useState('');

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = () => {
    console.log('handleSubmit called');
    const storedRestaurantId = localStorage.getItem('adminId');
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }
    axios
      .post(
        `https://delivery-chimelu-new.onrender.com/api/v1/admin/changepassword/${storedRestaurantId}`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      )
      .then((response) => {
        console.log('Password changed successfully:', response.data);
        setSuccessMessage('Password changed successfully');
        setTimeout(() => {
          onClose(); // Close modal after a delay
        }, 2000);
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        setError('Incorrect Password.');
        setTimeout(() => {
          setError(''); // Clear the error message after 3 seconds
        }, 1000);
      });
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: '267px',
            height: 'fit-content',
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            padding: '16px',
            gap: '20px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IoIosArrowBack
              size={20}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '4px',
                border: '1px solid #D0D5DD',
                cursor: 'pointer',
              }}
              onClick={onClose}
            />
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '19.36px',
                marginLeft: '10px',
              }}
            >
              Change Password
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="Vector.svg" alt="Vector" />
            {/* <img src="/Vector.svg" alt="Key" style={{ marginLeft: '5px' }} /> */}
          </div>
          {/* Success Message */}
          {successMessage && (
            <p style={{ color: 'green', textAlign: 'center' }}>
              {successMessage}
            </p>
          )}

          <div style={{ position: 'relative', marginTop: '20px' }}>
            <GiPadlock
              size={20}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#64748B',
              }}
            />
            <input
              type="password"
              style={{
                width: '235px',
                height: '40px',
                borderRadius: '4px',
                border: '1px solid #D0D5DD',
                padding: '8px',
                paddingLeft: '40px',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '13px',
                lineHeight: '15.73px',
                color: 'black',
              }}
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => handleChange(e, setOldPassword)}
            />
          </div>
          <div style={{ position: 'relative', marginTop: '20px' }}>
            <GiPadlock
              size={20}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#64748B',
              }}
            />
            <input
              type="password"
              style={{
                width: '235px',
                height: '40px',
                borderRadius: '4px',
                border: '1px solid #D0D5DD',
                padding: '8px',
                paddingLeft: '40px',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '13px',
                lineHeight: '15.73px',
                color: 'black',
              }}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => handleChange(e, setNewPassword)}
            />
          </div>
          <div style={{ position: 'relative', marginTop: '20px' }}>
            <GiPadlock
              size={20}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#64748B',
              }}
            />
            <input
              type="password"
              style={{
                width: '235px',
                height: '40px',
                borderRadius: '4px',
                border: '1px solid #D0D5DD',
                padding: '8px',
                paddingLeft: '40px',
                boxSizing: 'border-box',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '13px',
                lineHeight: '15.73px',
                color: 'black',
              }}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => handleChange(e, setConfirmPassword)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                width: '90px',
                height: '30px',
                borderRadius: '9px',
                padding: '16px',
                backgroundColor: '#4CAF50',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '14px',
                lineHeight: '2px',
                letterSpacing: '-0.2px',
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              Confirm
            </button>
          </div>
          {error && (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          )}
        </div>
      </div>
    </>
  );
}
