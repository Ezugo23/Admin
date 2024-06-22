import UsersInfo from "./UsersInfo";

export default function EditUser() {
    return(
        <div>
            <p className="font-bold text-2xl">Edit User</p>
            <div className="grid gap-5 grid-cols-3 my-6">
                <div className="grid-col-1">
                    <div className="bg-white shadow p-4 rounded-sm mb-[3rem]">
                        <div className="flex gap-4 items-center mb-2">
                            <img src="/Linda.svg" alt="" className="w-[2.5rem] h-[2.5rem] rounded-full"/>
                            <div>
                                <p>Amelia</p>
                                <p>Lopes</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <button className="flex items-center gap-3 bg-[#40C4FF] text-white w-full p-1 my-1 rounded"><span><img src="/user.svg" alt="" /></span> Personal Information</button>
                            <button className="flex items-center gap-3 w-full p-1"><span><img src="/password.svg" alt="" /></span>Change Password</button>
                            <button className="flex items-center gap-3 w-full p-1 my-1"><span><img src="/payment.svg" alt="" /></span>Payment Methods</button>
                            <button className="flex items-center gap-3 w-full p-1"><span><img src="/orderHistory.svg" alt="" /></span>Order History</button>
                        </div>
                        <hr className="my-3"/>
                        <div className="flex justify-around items-center">
                            <div className="text-center">
                                <p className="text-[#4DB6AC] font-semibold">17</p>
                                <h4>Success Orders</h4>
                            </div>
                            <div className="text-center">
                                <p className="text-[#FF5252] font-semibold">$1,125.38</p>
                                <h4>Total Paid</h4>
                            </div>
                        </div>
                        </div>

                        <div className="bg-white h-[30%] shadow p-4 rounded-sm flex flex-col items-center">
                            <div className="relative bg-stone-200 h-[60%] w-[40%] rounded-sm mx-auto">
                                <p className="absolute -top-2 -right-1 text-sm w-[15%] h-[15%] flex justify-center rounded-full bg-[#FF5252]">x</p>
                                <img src="" alt="" />
                            </div>
                            <button className="px-5 py-1 mt-5 rounded hover:bg-gray-300 bg-[#4CAF50]">Change photo</button>
                        </div>
                </div>
                <UsersInfo />
            </div>
        </div>
    )
}