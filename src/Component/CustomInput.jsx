export default function CustomInput({label, ...props}) {
    return(
        <div>
            <label className="block mb-1">{label}</label>
            <input {...props} className="inline-block w-[100%] mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#40C4FF] focus:border-[#40C4FF]"/>
        </div>
    )
}