import {useMediaQuery} from "react-responsive";

const FixedButtons = ({ handleClear, handleOpen, handleSave, disabled })=>{
    const mediaQuery = useMediaQuery({minWidth: "1160px"})

    return (
        <div className={`flex ${mediaQuery ? "justify-center" : "ml-12"} mt-6`}>
            <div className="ml-24">
                <button
                    className="text-[#367c2b] w-[60px] h-[36px] border hover:bg-[#367c2b] hover:text-white border-[#367c2b] font-semibold" disabled={disabled} onClick={handleClear}>Clear
                </button>
            </div>
            <div className="space-x-4 ml-16">
                <button
                    className="text-[#367c2b] w-[72px] h-[36px] border hover:bg-[#367c2b] hover:text-white border-[#367c2b] font-semibold" disabled={disabled} onClick={handleOpen}>Cancel
                </button>
                <button
                    className="w-[56px] h-[36px] border hover:bg-[#367c2b] hover:text-white bg-[#ffde00] font-semibold" disabled={disabled} onClick={handleSave}>Save
                </button>
            </div>
        </div>
    )
}
export default FixedButtons