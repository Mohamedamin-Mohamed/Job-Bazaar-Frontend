import {ReactTyped} from "react-typed";
import {CiMenuFries} from "react-icons/ci";
import {TfiClose} from "react-icons/tfi";
import {BsBoxArrowInRight} from "react-icons/bs";
import {useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import Community from "./Community";
import Jobs from "./Jobs";
import Companies from "./Companies";

const NavBar = ()=>{
    const[navShow, setNavShow] = useState(false)
    const isMediumScreen = useMediaQuery({ minWidth:1000 }); // Set the breakpoint for md screens
    const navigate = useNavigate()
    const[community, setCommunity] = useState(false)
    const[jobs, setJobs] = useState(false)
    const[companies, setCompanies] = useState(false)
    const handleNavigation = (path)=>{
        if(path === 'login')
        navigate('/accounts/login')
        else
            navigate('/accounts/signup')
    }
    const handleHover = (text)=>{
        if(text === 'community') {
            setCommunity(true);
            setJobs(false);
            setCompanies(false)
        }
        else if(text === 'jobs'){
            setJobs(true)
            setCommunity(false)
            setCompanies(false)
        }
        else{
            setCompanies(true)
            setJobs(false)
            setCommunity(false)
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between pb-4 border-b">
                <ReactTyped className="mt-8 mx-16 font-bold text-[#00A264] text-4xl" strings={['Job Bazaar']}
                            typeSpeed={90}/>
                <nav className="hidden md:flex list-none space-x-12 mt-10 font-medium text-lg hover:cursor-pointer">
                    <li className="hover:underline" onMouseEnter={()=> handleHover('community')}>Community</li>
                    <li className="hover:underline" onMouseEnter={()=> handleHover('jobs')}>Jobs</li>
                    <li className="hover:underline" onMouseEnter={()=> handleHover('companies')}>Companies</li>
                </nav>
                <div className="md:hidden flex">
                    {!navShow ? <CiMenuFries size={30} className="hover:cursor-pointer mt-5"
                                             onClick={() => setNavShow(true)}/> : null}
                </div>
                {!isMediumScreen && navShow && (
                    <TfiClose size={30} className="absolute right-0 top-0 hover:cursor-pointer"
                              onClick={() => setNavShow(false)}/>
                )}
                <div className={`${isMediumScreen ? "flex flex-row gap-x-8 mx-4 font-medium text-lg" : navShow ? "flex flex-col space-y-4  py-1 px-3 h-[120px] mt-7" : "hidden"} 
                mt-8 relative`}>
                    <button className="hover:underline" onClick={()=>handleNavigation('signup')}>Join now</button>
                    <div className="flex bg-black w-[120px] h-[42px] justify-center hover:bg-[#00A264] rounded-md" onClick={()=>handleNavigation('login')}>
                        <BsBoxArrowInRight className="mt-2.5 mr-4 hover:cursor-pointer" color="white" size={25}/>
                        <button className="text-white mr-3" >Sign in</button>
                    </div>
                </div>
            </div>
            { community && <Community setCommunity={setCommunity}/>}
            { jobs && <Jobs setJobs={setJobs} /> }
            { companies && <Companies setCompanies={setCompanies} />}
        </div>
    )
}
export default NavBar