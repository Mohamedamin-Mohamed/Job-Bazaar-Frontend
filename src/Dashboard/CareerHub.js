import NavBar from "./NavBar";
import Ribbon from "./Ribbon";
import Activity from "./Activity";
import Tasks from "./Tasks";
import Interests from "./Interests";
import Explore from "./Explore";
import {useMediaQuery} from "react-responsive";

const CareerHub = ()=>{
    const isMediumScreen = useMediaQuery({ minWidth:998 }); // Set the breakpoint for md screens

    return(
        <>
          <NavBar />
          <Ribbon />
            <div className="flex gap-x-6">
                <div className="flex flex-col">
                    <Tasks />
                    <Activity />
                </div>
                <div className="flex flex-col">
                   <Interests />
                    <Explore />
                </div>
            </div>
        </>
    )
}
export default CareerHub