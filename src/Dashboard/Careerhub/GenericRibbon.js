import NavBar from "./NavBar";

const GenericRibbon = ({text}) => {
    return (
            <div>
                <NavBar/>
                <div className={`relative mx-10 h-[200px] flex overflow-hidden mt-0.5`}>
                    <div className="absolute inset-0 flex">
                        <div className="w-1/2 h-full bg-[#ffde00]"
                             style={{clipPath: 'polygon(0 0, 100% 0, 0 100%'}}></div>
                        <div className="w-1/2 h-full bg-[#367c2b]"
                             style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%'}}></div>
                    </div>
                    <div className="ml-6 mt-14 z-50">
                        <h1 className="text-3xl font-mono font-bold">{text}</h1>
                    </div>
                </div>
            </div>
    )
}
export default GenericRibbon