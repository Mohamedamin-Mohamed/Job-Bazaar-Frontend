import {useSelector} from "react-redux";

const ColorGrid = ()=>{
    const usr = useSelector(state => state.userInfo)
    return(
           <div className="flex flex-col justify-center items-center bg-[#367c2b] border h-[250px] mx-8">
                   <h1 className="text-xl font-medium text-[#292929]">Hi {usr.usrEmail}</h1>
                   <p className="text-[#757575] bg-white">Welcome to your Career Hub</p>
           </div>
    )
}
export default ColorGrid