export default function Password() {
  return(
    <>
     <div className="w-full max-w-4xl mx-auto">
    <div className='border-none bg-white shadow-md mb-8 p-6' style={{marginTop:'30px'}}>
    <div className="mb-4">
      <p className="font-roboto font-bold text-lg leading-6 text-black">Change Password</p>
    </div>
    <hr className="mb-4 border-black" />
    <div className="mb-4">
      <label className='font-roboto font-sm-bold text-small leading-6 text-black'>Old Password</label>
    </div>
      <input
        id="password"
        type="password"
        className="w-[100%] h-12 border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm mr-4"
        placeholder="Enter your new password"
      />
       <div className="mb-4 mt-4">
      <label className='font-roboto font-sm-bold text-small leading-6 text-black'>New Password</label>
    </div>
      <input
        id="password"
        type="password"
        className="w-[100%] h-12 border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm mr-4"
        placeholder="Enter your new password"
      />
       <div className="mb-4 mt-4">
      <label className='font-roboto font-sm-bold text-small leading-6 text-black'>Confirm New Password</label>
    </div>
      <input
        id="password"
        type="password"
        className="w-[100%] h-12 border-gray-100 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm mr-4"
        placeholder="Enter your new password"
      />
      <div>
    <button className="w-[219px] h-[45px] bg-[#4DB6AC] text-white font-roboto font-normal text-base leading-[17.58px] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      SAVE PASSWORD
    </button>
    </div>
    </div>
    </div>
  </>
  )
}