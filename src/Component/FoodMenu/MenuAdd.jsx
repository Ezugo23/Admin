import React, { useState, useEffect, useRef } from 'react';
import './sty.css';
import { FiX } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

export default function AddMenu({ onClose, refreshMenus }) {
    const [menuName, setMenuName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showMessageBeforeClose, setShowMessageBeforeClose] = useState(false);
    const popupRef = useRef(null);
    const { id } = useParams();

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleSubmit = async () => {
        if (!menuName.trim()) {
            setErrorMessage('Menu name is required');
            return;
        }
    
        setLoading(true);
        setErrorMessage('');
    
        try {
            const response = await fetch(`https://delivery-chimelu-new.onrender.com/api/v1/menu/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: menuName })
            });
    
            if (!response.ok) {
                throw new Error('Failed to add menu');
            }
    
            setShowSuccessMessage(true);
            setMenuName('');
            refreshMenus(); // Refresh menu list
    
            // Close modal after a brief delay
            setTimeout(() => {
                onClose(); // Close modal
            }, 1000); // 1 second delay before closing modal
        } catch (error) {
            console.error('Error adding menu:', error);
            setErrorMessage('Failed to add menu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-25"></div>
            <div ref={popupRef} className="bg-white p-5 rounded-lg shadow-lg relative z-50">
                <FiX className="popup-close" onClick={onClose} />
                <div className="w-72 p-5 flex items-center flex-col rounded-2xl border-2">
                    <p className="text-lg font-bold">Add New Menu</p>
                    <div className="w-full mt-7">
                        <p className="text-11 mb-[2px]">Menu Name</p>
                        <input
                            type="text"
                            className="border-2 rounded-md w-full h-10 px-3"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                        {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                    </div>
                    <div className="w-full center">
                        <button
                            className={`bg-green-500 text-white rounded-md px-5 shadow-md py-2 mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                    {showSuccessMessage && (
                        <div className="mt-4 text-green-500">Menu added successfully!</div>
                    )}
                </div>
            </div>
        </div>
    );
}