import {useSelector} from "react-redux";

const Submit = ({text, disabled, hovered})=>{
    const usr = useSelector(state => state.userInfo)

    return (
        <button
           disabled={disabled} className={`flex items-center gap-1 px-4 text-${hovered ?"white" : "[#367c2b]"} py-2 cursor-pointer font-semibold tracking-widest rounded-md ${disabled ? '' : 'hover:gap-x-6 hover:translate-x-3' }duration-300 `}
        >
            {text}
            <svg
                className="w-5 h-5"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >

                <path
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                ></path>

            </svg>

        </button>

    )

}
export default Submit
