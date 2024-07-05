import { queryClient, suspendOrActivate } from "../../../util/http"
import { useMutation } from "@tanstack/react-query"

export default function SuspendModal({setOpenModal, userID, isActive}) {
    const { mutate, isPending, isError } = useMutation({
        mutationFn: suspendOrActivate,
        onSuccess: () => {
            queryClient.invalidateQueries(['users', userID]);
            setOpenModal(false);
        }
    });

    const handleSus = () => {
        mutate(userID);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75">
            <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center w-[25%]">
                <img src="/suspend.svg" alt="" />
                <h4 className="text-2xl">Are you sure?</h4>
                {isActive === true ? <p className="pb-5 pt-2 text-center">Do you really want to suspend this user? This process cannot be undone.</p> : <p className="pb-5 pt-2 text-center">Do you really want to activate this user?</p>}
                <div className="flex">
                    <button className="px-10 py-1 mx-1 rounded hover:bg-gray-300 border border-black" onClick={() => setOpenModal(close)}>NO</button>
                    {isPending ? <button className="px-10 py-1 mx-1 rounded hover:bg-gray-300 bg-[#FF5252] text-white"><i class="fa-solid fa-spinner fa-spin"></i></button> : <button className="px-10 py-1 mx-1 rounded hover:bg-gray-300 bg-[#FF5252] text-white" onClick={handleSus}>YES</button>}
                </div>
            </div>
        </div>
        </div>
    )
}
