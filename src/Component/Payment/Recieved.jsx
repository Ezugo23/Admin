export default function Received({ data }) {
  // Destructure data object
  const { invoiceId, date, amountMoved } = data;

  return (
    <div className="grid py-2 grid-cols-4">
      {/* Render invoiceId, date, amountMoved, and a placeholder for status */}
      <div className="center">
        <p className="capitalize">#{invoiceId}</p>
      </div>
      <div className="center">
        <p>{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="center">
        <p>₦{amountMoved.toLocaleString()}</p>
      </div>
      <div className="center">
        <p className="text-green-500 font-semibold">SUCCESFUL</p>
      </div>
    </div>
  );
}
