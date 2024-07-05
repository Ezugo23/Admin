import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineCloseCircle, AiOutlineReload } from 'react-icons/ai';

export default function Modal({ isOpen, onClose, withdrawalId }) {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 200;
          const maxHeight = 200;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);

          setImagePreview(canvas.toDataURL('image/jpeg'));
        };
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const handleReselectImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.put(`https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/withdrawals/${withdrawalId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Payment failed.');
      }
    } catch (error) {
      setError('Error sending payment.');
    } finally {
      setLoading(false);
      setFile(null);
      setImagePreview(null);
    }
  };

  const handleCloseModal = () => {
    setFile(null);
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" style={modalBackdropStyles}>
      <div className="modal-content" style={modalContentStyles}>
        <div className="close-icon" onClick={handleCloseModal} style={closeIconStyles}>
          <AiOutlineCloseCircle size={30} />
        </div>
        <div className="background-2" style={background2}>
          <input type="file" onChange={handleFileChange} />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          )}
          {!imagePreview && (
            <p className='text' style={text}>
              Drag Files Here Or<span style={{color:"#4AA9DE"}}> Browse</span>
            </p>
          )}
          {imagePreview && (
            <button onClick={handleReselectImage} style={editButton}><AiOutlineReload size={20} /> Reselect Image</button>
          )}
        </div>
        {error && (
          <div style={errorStyles}>{error}</div>
        )}
        {success && (
          <div style={successStyles}>Payment sent successfully!</div>
        )}
        <button onClick={handleSubmit} style={loading ? { ...payButton, backgroundColor: '#CCC' } : payButton}>
          {loading ? 'Sending...' : 'Pay'}
        </button>
      </div>
    </div>
  );
}

const modalBackdropStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: 'white',
  position :'relative',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
  width: '30rem',
  height: '25rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const background2 = {
  backgroundColor: '#F4F4F4',

  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
  width: '20rem',
  height: '25rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const closeIconStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer'
};

const payButton = {
  borderStyle:'border-box',
  marginTop: '10px',
  width: '10rem',
  height: '4rem',
  backgroundColor: '#4CAF50',
  color: "white",
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '21.79px',
  cursor: 'pointer'
};

const editButton = {
  borderStyle:'border-box',
  marginTop: '5px',
  width: '8rem',
  height: '3rem',
  backgroundColor: '#FF5733',
  color: "white",
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '21.79px',
  cursor: 'pointer'
};

const text = {
  fontFamily: 'inter',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '24px',
  letterSpacing: '0.6%',
  marginTop: "25px",
  color: 'black'
};

const errorStyles = {
  color: 'red',
  marginTop: '10px'
};

const successStyles = {
  color: 'green',
  marginTop: '10px'
};
