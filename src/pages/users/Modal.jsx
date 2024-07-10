import React, { useEffect, useState } from 'react';
import axios from 'axios';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '100%',
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

const addButtonStyle = {
  ...buttonStyle,
  background: '#4CAF50',
  color: 'white',
};

const closeButtonStyle = {
  ...buttonStyle,
  background: '#f44336',
  color: 'white',
};

const roleListStyle = {
  listStyleType: 'none',
  padding: '0',
};

const roleItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 0',
};

const removeButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#f44336',
  cursor: 'pointer',
};

const Modal = ({ selectedAdmin, handleCloseModal, handleSaveRole }) => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [adminRoles, setAdminRoles] = useState(selectedAdmin.roles);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/admin/get/roles');
        setRoles(response.data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleAddRole = () => {
    if (newRole && !adminRoles.includes(newRole)) {
      setAdminRoles([...adminRoles, newRole]);
      setNewRole('');
    }
  };

  const handleRemoveRole = (role) => {
    setAdminRoles(adminRoles.filter((r) => r !== role));
  };

  const handleSave = () => {
    handleSaveRole({ roles: adminRoles });
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Edit Role for {selectedAdmin.firstname} {selectedAdmin.lastname}</h2>
        <ul style={roleListStyle}>
          {adminRoles.map((role, index) => (
            <li key={index} style={roleItemStyle}>
              {role}
              <button style={removeButtonStyle} onClick={() => handleRemoveRole(role)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <select style={selectStyle} value={newRole} onChange={handleRoleChange}>
          <option value="">Select a role</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
        <button style={addButtonStyle} onClick={handleAddRole}>Add Role</button>
        <div style={buttonContainerStyle}>
          <button style={closeButtonStyle} onClick={handleCloseModal}>Close</button>
          <button style={addButtonStyle} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
