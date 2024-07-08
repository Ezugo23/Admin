import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { fetchUserProfile, getPaymentDetails } from "../../../util/http";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentMethods({id}) {
    const [showFirstImage, setShowFirstImage] = useState(true);
    
    const {data, isPending, isError} = useQuery({
        queryKey: ['payments'],
        queryFn: () => getPaymentDetails(id),
      });

      const {data: dataCard, isPending: isPendingCard, isError: isErrorCard} = useQuery({
        queryKey: ['cardInfo', id],
        queryFn: () => fetchUserProfile(id),
      })

        const handleToggle = () => {
            setShowFirstImage(!showFirstImage);
        };
        const handleCopy = () => {
            navigator.clipboard.writeText(dataCard.wallet.accountNumber);
            toast.success('Account number copied to clipboard');
        };

    return(
        <div className="col-span-2 bg-white shadow p-4 rounded-sm pr-[5rem]">
            <ToastContainer position="bottom-center" />
            {isPendingCard && <div className='absolute mt-5 left-[70%] -translate-x-[50%] text-black text-5xl'><i class="fa-solid fa-spinner fa-spin"></i></div>}
            {isErrorCard && <p className="mt-5 text-center absolute left-[55%] bg-red-400 text-white p-6 text-md">Failed to fetch card details. Please try again.</p>}
            {dataCard && <div className="flex justify-between">
                <div className="bg-[#4CAF50] text-white rounded-3xl p-4 flex gap-7 justify-between">
                <div>
                    <p className="flex items-center gap-3 cursor-pointer" onClick={handleToggle}>Balance {showFirstImage ? <span><IoEyeOutline /></span> : <span><IoEyeOffOutline /></span>}</p>
                    {showFirstImage ? <h3 className="font-bold text-xl tracking-wide">₦{dataCard.wallet?.balance.toLocaleString()}</h3> : <h3 className="font-bold text-xl">XXXX</h3>}
                    <button className="px-5 py-2 rounded-md mt-[1rem] text-xs hover:bg-gray-300 bg-white text-[#4CAF50]">Add Money</button>
                </div>
                <div className="text-center">
                    <p className="flex items-center gap-3 text-slate-200">Account Number <span onClick={handleCopy} className="cursor-pointer"><img src="/copy-logo.svg" alt="" /></span></p>
                    <h3>{dataCard.wallet.accountNumber}</h3>
                    <h6 className="text-xs mt-1">{dataCard.wallet.accountName}</h6>
                    <h2 className="font-medium">{dataCard.wallet.bankName}</h2>
                </div>
            </div>
            
{/* 
            <div className="bg-[#4CAF50] text-white rounded-3xl w-[42%] p-4">
                <div className="flex justify-between">
                    <img src="/mastercard-logo.svg" alt="" />
                    <img src="/check-mark.svg" alt="" />
                </div>
                <h3 className="font-bold text-xl tracking-wide my-2">1234 XXXX XXXX XXXX</h3>
                <div className="flex justify-between">
                   <p>Chimelu</p>
                   <div>
                    <p>Expiry</p>
                    <p>11/26</p>
                   </div>
                   <div>
                    <p>cvv</p>
                    <p>235</p>
                   </div>
                </div>
            </div> */}
            </div>}
            {isPending && <div className='absolute mt-5 left-[70%] top-[50%] -translate-x-[50%] text-black text-5xl'><i class="fa-solid fa-spinner fa-spin"></i></div>}
            {isError && <p className="mt-5 text-center absolute left-[55%] top-[50%] bg-red-400 text-white p-6 text-md">Failed to fetch transaction history. Please try again.</p>}
            <p className="font-medium my-5 mt-[3rem]">Recent transactions</p>
            {data && data.length > 0 ? data.map(transaction => (
                <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`rounded-full h-3 w-3 ${transaction.transactionName === 'Topup' ? 'bg-[#4CAF50]' : 'bg-[#FF5252]'}`}></div>
                        <div>
                            <p className="font-medium">{transaction.transactionName || 'Order'} {transaction.transactionName === 'Order' ? '#' + transaction.orderId : ''}</p>
                            <p className="text-xs mt-1">{new Date(transaction.timestamp).toLocaleString('en', {hour: '2-digit', minute: '2-digit'})} {new Date(transaction.timestamp).toLocaleString('en', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</p>
                        </div>
                    </div>
                    <p className={`font-medium ${transaction.transactionName === 'Topup' ? 'text-[#4CAF50]' : 'text-[#FF5252]'}`}>&#8358;{transaction.amount}</p>
                </div>
            )) : <p className="text-center text-gray-500 text-xl flex justify-center items-center">No transaction history available</p>}
        </div>
    )
}