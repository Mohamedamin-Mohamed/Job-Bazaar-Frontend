import NavBar from "./NavBar";
import Ribbon from "./Ribbon";
import Activity from "./Activity";
import Tasks from "./Tasks";
import Interests from "./Interests";
import Explore from "./Explore";
import {useMediaQuery} from "react-responsive";

const CareerHub = () => {
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens
    const smallScreen = useMediaQuery({minWidth: 200})

    return (
        <>
            <NavBar />
            <Ribbon/>
            <div className={`flex ${isMediumScreen ? "gap-x-6" : "flex-col gap-y-6"} justify-center mt-6`}>
                {isMediumScreen ? (
                    <>
                        <div className="flex flex-col">
                            <Tasks/>
                            <Activity/>
                        </div>
                        <div className="flex flex-col">
                            <Interests/>
                                <Explore/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={"flex flex-col justify-center items-center"}>
                            <div className="mx-4">
                                <Interests/>
                            </div>
                                <Explore/>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Tasks/>
                            <Activity/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default CareerHub