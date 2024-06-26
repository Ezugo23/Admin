import CustomInput from "../../../Component/CustomInput/CustomInput";

export default function ChangePassword({ isSuccess, newPassword, setNewPassword, message, handleChangePassword }) {

    return (
        <div className="col-span-2 bg-white shadow p-4 rounded-sm">
            {message && <p className={`text-center ${isSuccess ? 'text-green-500' : 'text-red-700'}`}>{message}</p>}
            <form onSubmit={handleChangePassword}>
                <p className="font-medium">Change Password</p>
                <hr className="my-4"/>
                <CustomInput label='Add Password' type='text' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <button className="px-10 py-2 mx-1 rounded hover:bg-gray-300 bg-[#4DB6AC] text-white mt-3">SAVE PASSWORD</button>
            </form>
        </div>
    )
}