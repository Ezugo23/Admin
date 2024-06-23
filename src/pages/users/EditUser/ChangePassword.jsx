import CustomInput from "../../../Component/CustomInput/CustomInput";

export default function ChangePassword() {
    return (
        <div className="col-span-2 bg-white shadow p-4 rounded-sm">
            <p className="font-medium">Change Password</p>
            <hr className="my-4"/>
            <CustomInput label='Add Password' type='text' value='FD$#54^*@#Vdfg#ed%*&'/>
            <button className="px-10 py-2 mx-1 rounded hover:bg-gray-300 bg-[#4DB6AC] text-white mt-3">SAVE PASSWORD</button>
        </div>
    )
}