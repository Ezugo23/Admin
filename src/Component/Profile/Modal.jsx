import { FaCircleCheck } from 'react-icons/fa6';
import { TbFaceIdError } from 'react-icons/tb';
import { useEffect } from 'react';

export default function Modal({ onClose, showModal, success }) {
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500); // Set timeout to close the modal after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showModal, onClose]);


  const modalTextStyle = {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    fontSize: '4em',
  };

  const modalIconStyle = {
    fontSize: '6em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      {showModal && (
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
              borderRadius: '10px',
              padding: '16px',
              gap: '20px',
              position: 'relative',
            }}
          >
            <h1
              style={{ ...modalIconStyle, color: success ? 'green' : 'red' }}
            >
              {success ? <FaCircleCheck /> : <TbFaceIdError />}
            </h1>
            <p style={modalTextStyle}>
              {success ? 'Done' : 'Opps!!!'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}