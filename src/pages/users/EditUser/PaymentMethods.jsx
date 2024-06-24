import { IoEyeOutline } from "react-icons/io5";
import { PaymentMethodsData } from "./PaymentMethodsData";
export default function PaymentMethods() {
    return(
        <div className="col-span-2 bg-white shadow p-4 rounded-sm pr-[5rem]">
            <div className="flex justify-between">
            <div className="bg-[#4CAF50] text-white rounded-3xl p-4 flex gap-7 justify-between">
                <div>
                    <p className="flex items-center gap-3">Balance <span><IoEyeOutline /></span></p>
                    <h3 className="font-bold text-xl tracking-wide">#6,000.00</h3>
                    <button className="px-5 py-2 rounded-md mt-[1rem] text-xs hover:bg-gray-300 bg-white text-[#4CAF50]">Add Money</button>
                </div>
                <div className="text-center">
                    <p className="flex items-center gap-3">Account Number <span><img src="/copy-logo.svg" alt="" /></span></p>
                    <h3>1234567890</h3>
                    <h2 className="font-medium">Swifty Microfinance Bank</h2>
                </div>
            </div>

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
            </div>
            </div>
            <p className="font-medium my-5">Recent transactions</p>
            {PaymentMethodsData.map(transaction => (
                <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`rounded-full h-3 w-3 ${transaction.name === 'Top Up' ? 'bg-[#4CAF50]' : 'bg-[#FF5252]'}`}></div>
                        <div>
                            <p>{transaction.name}</p>
                            <p className="text-xs mt-1">{transaction.time}</p>
                        </div>
                    </div>
                    <p className={`font-medium ${transaction.name === 'Top Up' ? 'text-[#4CAF50]' : 'text-[#FF5252]'}`}>{transaction.amount}</p>
                </div>
            ))}
        </div>
    )
}