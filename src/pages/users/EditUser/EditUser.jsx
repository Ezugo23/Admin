import { useEffect, useState } from "react";
import axios from 'axios'
import ChangePassword from "./ChangePassword";
import UsersInfo from "./UsersInfo";
import PaymentMethods from "./PaymentMethods";
import './EditUser.css'
import OrderHistory from "./OrderHistory";
import { useNavigate, useParams } from "react-router-dom";
import {fetchUserProfile, queryClient} from "../../../util/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { updateUserInfo } from "../../../util/http";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function EditUser() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [activePage, setActivePage] = useState('Personal Info');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [values, setValues] = useState({
        id: 'id',
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        country: '',
        state: '',
        code: '',
        address: '',
        image: ''
    })
    
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['users', id],
        queryFn: () => fetchUserProfile(id)
    })
    useEffect(() => {
        if (data) {
            setValues({
                id: data.id || '',
                firstname: data.firstname || '',
                lastname: data.lastname || '',
                email: data.email || '',
                username: data.username || '',
                phoneNumber: data.phoneNumber || '',
                code: data.latestAddress && data.latestAddress.code || '',
                state: data.latestAddress && data.latestAddress.state || '',
                country: data.latestAddress && data.latestAddress.country || '',
                address: data.latestAddress && data.latestAddress.address || '',
                image: data.image || '',
                totalOrders: data.totalOrders,
                totalPaid: data.totalPaid
            });
        }
    }, [data]);
    

    // const {mutate} = useMutation({
    //     mutationFn: updateUserInfo,
    //     onSuccess: (response) => {
    //         queryClient.invalidateQueries(['users', id]);
    //         console.log('Update success:', response);
    //         navigate('/users/allusers');
    //     },
    // })
   
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(values.firstname);
    //     mutate({id, user: {values}});
    //     console.log(values.firstname)
        
    //   }
    const handleChangePassword = async (e) => {
        setLoadingPassword(true)
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
                setLoadingPassword(false)
                setNewPassword('')
                setMessage('Password changed successfully!');
                setIsSuccess(true)
                setTimeout(() => {
                    setMessage(false)
                }, 2000);
            } else {
                setMessage('Failed to change password. Please try again.');
                setLoadingPassword(false)
                setIsSuccess(false)
                setTimeout(() => {
                    setMessage(false)
                }, 2000);
            }
        } catch (error) {
            setLoadingPassword(false)
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
            setIsSuccess(false);
            setTimeout(() => {
                setMessage(false)
            }, 2000);
        }
    };
    
        function handleImage(e) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
        }
        function handleImageChange(){
            setLoading(true)
            const formData = new FormData()
            formData.append('image', image)
            axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/user/${id}/update-profile-picture`, formData).then((res) => {
                // console.log('Success:', res);
                setLoading(false)
                toast.success(res.data.message);
                if (res.data && res.data.user.image) {
                    setValues((prevValues) => ({
                        ...prevValues,
                        image: res.data.user.image
                    }));
                }
            })
            .catch((error) => {
                // console.error('Error:', error);
                setLoading(false)
                toast.error('Please upload image and try again.')
            });
        }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoadingUpdate(true)
        axios.patch(`https://delivery-chimelu-new.onrender.com/api/v1/user/profile/update/byId/${id}`, values)
        .then(res => {
            setLoadingUpdate(false)
            toast.success(res.data.message);

        })
        .catch(err => {
            // console.log(err);
            setLoadingUpdate(false);
            toast.error('Failed to update data. Please try again.');
        });
    }
    return(
        <div>
            <p className="font-bold text-2xl">Edit User</p>
            <ToastContainer position="top-center" />
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
                                <p className="text-[#4DB6AC] font-semibold">{values.totalOrders}</p>
                                <h4>Success Orders</h4>
                            </div>
                            <div className="text-center">
                                <p className="text-[#FF5252] font-semibold">{values.totalPaid}</p>
                                <h4>Total Paid</h4>
                            </div>
                        </div>
                        </div>
                        
                        {activePage === 'Personal Info' && data &&  <div className="mt-[3rem] bg-white h-[30%] shadow p-4 rounded-sm flex flex-col items-center">
                            <img src={values.image} alt="Profile" style={{ maxWidth: '50%', maxHeight: '50%' }} />
                            <input type="file" id="fileInput" onChange={handleImage} className="hidden"/>
                            {loading ? <p className="px-5 py-1 rounded bg-[#4CAF50] mt-[2rem]"><i class="fa-solid fa-spinner fa-spin"></i></p> : <button className="px-5 py-1 mt-[2rem] rounded hover:bg-gray-300 bg-[#4CAF50]" onClick={handleImageChange}>Change photo</button>}
                        </div>
                        }
                        <button onClick={() => document.getElementById('fileInput').click()} className="btn">Choose an image</button>
                </div>
                {activePage === 'Personal Info' && <UsersInfo values={values} setValues={setValues} handleSubmit={handleSubmit} data={!!data} isPending={isPending} isError={isError} error={error} loading={loadingUpdate} />}
                {activePage === 'Change Password' && <ChangePassword isSuccess={isSuccess} message={message} newPassword={newPassword} setNewPassword={setNewPassword} handleChangePassword={handleChangePassword} loading={loadingPassword}/>}
                {activePage === 'Payment Methods' && <PaymentMethods id={id} />}
                {activePage === 'Order History' && <OrderHistory id={id}/>}
            </div>
        </div>
    )
}