import {useSelector} from "react-redux";

const Ribbon = ()=>{
    const usr = useSelector(state => state.userInfo)
    return(
        <div className="relative mx-20 h-60 flex items-center justify-center overflow-hidden mt-0.5">
            <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full bg-[#ffde00]" style={{clipPath: 'polygon(0 0, 100% 0, 0 100%'}}></div>
                <div className="w-1/2 h-full bg-[#367c2b]" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%'}}></div>
            </div>
            <div className="relative z-10 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-[#367c2b] flex items-center justify-center text-white text-xl font-bold">
                    MM
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Hi Mohamedamin</h1>
                    <p className="text-[#757575] font-bold text-sm">Welcome to your Career Hub</p>
                </div>
            </div>
        </div>
    )
}
export default Ribbon