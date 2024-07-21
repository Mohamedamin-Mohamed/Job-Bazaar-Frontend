const FixedButtons = ({ handleClear, handleOpen, handleSave })=>{
    return (
        <div className="flex mt-6">
            <div>
                <button
                    className="text-[#367c2b] w-[60px] h-[36px] border hover:bg-[#367c2b] hover:text-white border-[#367c2b] font-semibold" onClick={handleClear}>Clear
                </button>
            </div>
            <div className="space-x-4 ml-auto">
                <button
                    className="text-[#367c2b] w-[72px] h-[36px] border hover:bg-[#367c2b] hover:text-white border-[#367c2b] font-semibold" onClick={handleOpen}>Cancel
                </button>
                <button
                    className="w-[56px] h-[36px] border hover:bg-[#367c2b] hover:text-white bg-[#ffde00] font-semibold" onClick={handleSave}>Save
                </button>
            </div>
        </div>
    )
}
export default FixedButtons