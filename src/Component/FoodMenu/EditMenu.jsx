import { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from 'axios';
import { FiX } from 'react-icons/fi';

export default function EditFood({ closeModal, selectedMenu, handleEditUpdate }) {
    const [menuName, setMenuName] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (selectedMenu) {
            setMenuName(selectedMenu.name);
        }
    }, [selectedMenu]);

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/menu/editmenu/${selectedMenu._id}`, {
                name: menuName
            });

            if (response.status === 200) {
                window.location.reload();
                handleEditUpdate(response.data);
                setShowSuccessMessage(true);
                window.location.reload();
                closeModal();
            } else {
                throw new Error('Failed to update menu');
            }
        } catch (error) {
            console.error('Error updating menu:', error);
            alert('Failed to update menu');
        }
    };

    console.log("Menu Name:", menuName); // Add console log

    return (
        <div className="popup">
            <div className="popup-content">
            <FiX className="popup-close " onClick={closeModal} />
                <div className="w-72 p-5 flex items-center flex-col rounded-2xl border-2">
                    <p className="text-lg font-bold">Edit Menu</p>
                    <div className="w-full mt-7">
                        <p className="text-11 mb-[2px]">Menu Name</p>
                        <input type="text" className='border-2 rounded-md w-full h-10 px-3' value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                    </div>
                    <div className="w-full center">
                        <button className="bg-green-500 text-white rounded-md px-5 shadow-md py-2 mt-6" onClick={handleSubmit}>Save</button>
                    </div>
                    {showSuccessMessage && (
                        <div className="mt-4 text-green-500">Menu edited successfully!</div>
                    )}
                </div>
            </div>
        </div>
    );
}