import React from "react";

export default function Withdrawal({ withdrawal, openModal }) {
  const { transactionId, date, withdrawalAmount, status, image } = withdrawal;
  const statusText = getStatusText(status);
  const statusColor = getStatusColor(status);

  return (
    <div className="grid py-2 grid-cols-4">
      <div className="center">
        {image ? (
          <p
            className="capitalize text-green-500 cursor-pointer"
            onClick={() => openModal(image)}
          >
            #{transactionId}
          </p>
        ) : (
          <p className="capitalize">#{transactionId}</p>
        )}
      </div>
      <div className="center">
        <p className="capitalize">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="center">
        <p className="capitalize">₦{withdrawalAmount.toLocaleString()}</p>
      </div>
      <div className={`center ${statusColor}`}>
        <p className="capitalize">{statusText}</p>
      </div>
    </div>
  );
}

function getStatusText(status) {
  switch (status) {
    case "sent":
      return "SUCCESSFUL";
    case "reversed":
      return "REVERSED";
    case "pending":
      return "PENDING";
    default:
      return status.toUpperCase();
  }
}

function getStatusColor(status) {
  switch (status) {
    case "sent":
      return "text-green-500 font-semibold";
    case "reversed":
      return "text-red-500 font-semibold";
    case "pending":
      return "text-orange-500 font-semibold";
    default:
      return "text-gray-500 font-semibold";
  }
}
