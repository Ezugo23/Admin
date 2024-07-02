import { useEffect, useState } from "react";
import axios from 'axios'
import ChangePassword from "./ChangePassword";
import UsersInfo from "./UsersInfo";
import PaymentMethods from "./PaymentMethods";
import './EditUser.css'
import OrderHistory from "./OrderHistory";
import { useParams } from "react-router-dom";

export default function EditUser() {
    const {id} = useParams();
    const [activePage, setActivePage] = useState('Personal Info');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [values, setValues] = useState({
        id: 'id',
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        phoneNumber: '',
        code: '',
        state: '',
        country: '',
        address: '',
        image: ''
    })
    useEffect(() => {
        axios.get(`https://delivery-chimelu-new.onrender.com/api/v1/user/profile/${id}`)
        .then(res => {
            const data= res.data.data;
            setValues({
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phoneNumber: data.phoneNumber,
                code: data.latestAddress ? data.latestAddress.code : 'NIL',
                state: data.latestAddress ? data.latestAddress.state : 'NIL',
                country: data.latestAddress ? data.latestAddress.country : 'NIL',
                address: data.latestAddress ? data.latestAddress.address : 'NIL',
                image: data.image
        });
        })
        .catch(err => console.log(err))
    }, [id])
    
    useEffect(() => {
        if(message) {
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }
    }, [message])

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://delivery-chimelu-new.onrender.com/api/v1/user/changepassword/verifyadmin/${id}`, {
                newPassword: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setNewPassword('')
                setMessage('Password changed successfully!');
                setIsSuccess(true)
            } else {
                setMessage('Failed to change password.');
                setIsSuccess(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred.');
            setIsSuccess(false);
        }
    };
    const handleSubmit = () => {
        
      }
    return(
        <div>
            <p className="font-bold text-2xl">Edit User</p>
            <div className="grid gap-5 grid-cols-3 my-6">
                <div className="grid-col-1">
                    <div className="bg-white shadow p-4 rounded-sm">
                        <div className="flex gap-4 items-center mb-2">
                            <img src={values.image} alt="" className="w-[2.5rem] h-[2.5rem] rounded-full"/>
                            <div>
                                <p>{values.firstname}</p>
                                <p>{values.lastname}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <button onClick={() => setActivePage('Personal Info')} className={`flex items-center gap-2 w-full my-1 rounded ${activePage === 'Personal Info' ? 'active' : 'p-1'}`}><span><img src="/user.svg" alt="" /></span> Personal Information</button>
                            <button onClick={() => setActivePage('Change Password')} className={`flex items-center gap-2 w-full ${activePage === 'Change Password' ? 'active' : 'p-1'}`}><span><img src="/password.svg" alt="" /></span>Change Password</button>
                            <button onClick={() => setActivePage('Payment Methods')} className={`flex items-center gap-2 w-full my-1 ${activePage === 'Payment Methods' ? 'active' : 'p-1'}`}><span><img src="/payment.svg" alt="" /></span>Payment Methods</button>
                            <button onClick={() => setActivePage('Order History')} className={`flex items-center gap-2 w-full ${activePage === 'Order History' ? 'active' : 'p-1'}`}><span><img src="/orderHistory.svg" alt="" /></span>Order History</button>
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

                        {activePage === 'Personal Info' ? <div className="mt-[3rem] bg-white h-[30%] shadow p-4 rounded-sm flex flex-col items-center">
                            <div className="relative bg-stone-200 h-[60%] w-[40%] rounded-sm mx-auto">
                                <p className="absolute -top-2 -right-1 text-sm w-[15%] h-[15%] flex justify-center rounded-full bg-[#FF5252]">x</p>
                                <img src="" alt="" />
                            </div>
                            <button className="px-5 py-1 mt-5 rounded hover:bg-gray-300 bg-[#4CAF50]">Change photo</button>
                        </div> 
                        : undefined
                        }
                </div>
                {activePage === 'Personal Info' && <UsersInfo values={values} setValues={setValues} handleSubmit={handleSubmit}/>}
                {activePage === 'Change Password' && <ChangePassword isSuccess={isSuccess} message={message} newPassword={newPassword} setNewPassword={setNewPassword} handleChangePassword={handleChangePassword} />}
                {activePage === 'Payment Methods' && <PaymentMethods />}
                {activePage === 'Order History' && <OrderHistory />}
            </div>
        </div>
    )
}