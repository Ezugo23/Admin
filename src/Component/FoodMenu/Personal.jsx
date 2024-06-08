import React from 'react';
import '../../style/user.css';
import { IoMdCloseCircle } from "react-icons/io";

export default function Personal() {
 return (
    <> 
    <div className="flex justify-center " style={{marginTop:'2%', marginLeft:'20px'}}>
    <div className="w-[100%] max-w-4xl">
      <form>
        <div className="border-none bg-white shadow-md"> {/* Fixed width for the background */}
          <div className="bg-white p-4 border-b border-gray-200">
                Restaurant Information
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col items-start">
                    <label htmlFor="uploadImage" className="font-medium text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <div className=" my-10 p-10 flex flex-col items-center" style={{marginTop:'-30px'}}>
                      <img src='https://bit.ly/dan-abramov' className="w-50 h-40 mb-4" alt="Upload" />
                      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Change Photo
                      </button>
                      {/* <input type="file" value="Change Image" /> */}
                    </div>
                    <div className=" flex flex-col items-center" style={{marginTop:'-40px'}}> {/* Adjusted padding */}
                      <img src='https://bit.ly/dan-abramov' className="w-[272px] h-[114px] mb-4" alt="Upload" />
                      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Change Photo
                      </button>
                      {/* <input type="file" value="Change Image" /> */}
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1" style={{ marginTop:'-2px'}}>
                    <div className="grid grid-cols-1 ">
                      <div className="col-span-1">
                        <label htmlFor="firstName" className="block mb-2">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          className="input border border-gray-300 p-2 rounded"
                          name="firstName"
                          placeholder="Enter First Name"
                          style={{width:'80%'}}
                        />
                      </div>
                      <div className="col-span-1" style={{marginTop:'20px'}}>
                        <label htmlFor="lastname" className="block mb-2">last Name</label>
                        <input
                          id="lastname"
                          type="text"
                          className="input border border-gray-300 p-2 rounded w-full"
                          name="lastname"
                          placeholder="Enter Last Name"
                          style={{width:'80%'}}
                        />
                      </div>
                      <div className="col-span-1" style={{marginTop:'20px'}}>
                        <label htmlFor="phonenumber" className="block mb-2">Phone Number</label>
                        <input
                          id="phonenumber"
                          type="number"
                          className="input border border-gray-300 p-2 rounded w-full"
                          name="phonenumber"
                          placeholder="Enter Phone Number"
                          style={{width:'80%'}}
                        />
                      </div>
                      <div className="col-span-1" style={{marginTop:'20px'}}>
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                          id="email"
                          type="text"
                          className="input border border-gray-300 p-2 rounded w-full"
                          name="phoneNumber"
                          placeholder="Enter Email Address"
                          style={{width:'80%'}}
                        />
                      </div>
                    </div>
                    <button type="submit" className=" text-white py-2 px-20 rounded" style={{marginTop:'20px', backgroundColor:'#4DB6AC', display:'flex', marginRight:'220px'}}>
  Submit
</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}