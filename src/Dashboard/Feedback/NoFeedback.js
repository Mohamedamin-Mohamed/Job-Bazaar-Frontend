import Chat from "../../Images/empty_self_chat.svg";

const NoFeedback = () => {
    return (
        <div className="flex justify-center items-center text-[#69717f] mt-4 w-full">
            <div className="flex flex-col text-center mt-3">
                <img src={Chat} alt="" className="h-[120px]"/>
                <h1 className="font-semibold mt-4 text-lg">No feedback requests</h1>
                <p>There are no requests</p>
                <p>Matching your search criteria</p>
            </div>
        </div>
    )
}
export default NoFeedback