import Image from "../../../../../Images/no_application_banner.svg"

const NoApplication = ()=>{
    return(
        <div className="flex flex-col justify-center items-center w-full h-[348px]">
            <img src={Image} alt="" />
            <p>You have no applications</p>
        </div>
    )
}
export default NoApplication