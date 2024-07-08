import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { AiOutlineCloseCircle, AiOutlineReload } from 'react-icons/ai'; // Import icons from react-icons

export default function Modal({ isOpen, onClose }) {
  const [amount, setAmount] = useState(''); // State to hold the amount input value
  const [file, setFile] = useState(null); // State to hold the selected file
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview
  const [error, setError] = useState(null); // State to hold error message
  const [success, setSuccess] = useState(false); // State to indicate successful submission
  const [loading, setLoading] = useState(false); // State to indicate loading state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview image and resize if necessary
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 200; // Max width for image preview
          const maxHeight = 200; // Max height for image preview
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
    if (!file || !amount) {
      setError('Please select a file and enter an amount.');
      return;
    }

    setLoading(true); // Set loading state to true

    // Prepare form data to send
    const formData = new FormData();
    formData.append('image', file);
    formData.append('amountSent', amount);

    try {
      // Make POST request to your API endpoint
      const response = await axios.post('https://delivery-chimelu-new.onrender.com/api/v1/restaurantWallet/send-restaurant-bal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle success response
      console.log('Response:', response.data);
      setSuccess(true);
      setError(null);
      setLoading(false); // Set loading state to false
      // Clear form data after successful payment
      setFile(null);
      setAmount('');
      setImagePreview(null);
      // Optionally handle success actions like closing modal
      setTimeout(() => {
        onClose();
      }, 1500); // Close modal after 1.5 seconds on success
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setError('Failed to send payment. Please try again.');
      setSuccess(false);
      setLoading(false); // Set loading state to false on error
      // Optionally handle error actions like showing error message to user
    }
  };

  const handleCloseModal = () => {
    // Clear form data when closing modal
    setFile(null);
    setAmount('');
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null; // Don't render if the modal is not open

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
        <div style={second}>
          <label style={type2}>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={amountBoxStyles}
          />
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

// Styles (for simplicity)
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
  position: 'absolute',
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

const amountBoxStyles = {
  width: '18rem',
  height: '48.31px',
  border: '1px solid #FFFFFF', // The original border specification
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};
const second = {
  marginTop:'15px'
}
const type2 = {
   marginRight:'200px'
}

const errorStyles = {
  color: 'red',
  marginTop: '10px'
};

const successStyles = {
  color: 'green',
  marginTop: '10px'
};
