

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="modal-backdrop" style={modalBackdropStyles}>
      <div className="modal-content" style={modalContentStyles}>
        <div className="background-2" style={background2}>
          <img src='../../../Asset/Vector (2).svg' alt='image'/>
          <p className='text' style={text}>Drag Files Here Or<span style={{color:"#4AA9DE"}}> Browse</span></p>
        </div>
        <div style={second}>
          <label style={type2}>Amount</label>
          <div style={amountBoxStyles}>amount</div>
        </div>
        <button onClick={onClose} style={closeButton}>Close</button>
        <button style={closeButton}>Pay</button>
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

const closeButton = {
  borderStyle:'border-box',
  marginTop: '25px',
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