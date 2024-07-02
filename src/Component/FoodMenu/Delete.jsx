// DeleteConfirmationModal.js
import React from "react";

export default function DeleteConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 border border-gray-400 rounded-lg" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
