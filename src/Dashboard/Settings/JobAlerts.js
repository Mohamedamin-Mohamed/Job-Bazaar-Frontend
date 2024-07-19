import {IoIosSearch} from "react-icons/io";
import Image from '../../Images/empty_self_chat.svg'
import {useNavigate} from "react-router-dom";
const JobAlerts = ()=>{
    const navigate = useNavigate()
    const handleNavigation = ()=>{
        navigate('/careerhub/explore/jobs')
    }
    return(
          <div className="flex justify-center items-center mt-8">
              <div className="flex flex-col justify-center pl-4 md:w-[840px] mx-2 w-[450px] h-[460px] border mb-10">
                  <div className="flex ml-2">
                      <IoIosSearch size={20} color="gray" className="mt-1.5"/>
                      <h1 className="font-semibold text-xl ml-2">Job alerts you created</h1>
                  </div>
                  <p className="border-b pb-8 ml-3 text-gray-500">Emails you receive about new job postings that match these searches.</p>
                  <div className="flex flex-col justify-center items-center">
                      <img src={Image} alt="" className="h-[200px]"/>
                      <p className="my-4">No job searches saved yet</p>
                      <button className="text-[#367c2b] bg-[#e6f0e1] border px-3 py-2 font-semibold rounded" onClick={handleNavigation}>Search Jobs</button>
                  </div>
              </div>
      </div>
    )
}
export default JobAlerts