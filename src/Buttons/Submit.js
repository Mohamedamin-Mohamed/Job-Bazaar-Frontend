import {useSelector} from "react-redux";

const Login = (props)=>{
    const usr = useSelector(state => state.userInfo)

    return (
        <button
           disabled={props.disabled} className={`flex items-center bg-blue-600  gap-1 px-4 py-2 cursor-pointer text-white font-semibold tracking-widest rounded-md ${props.disabled ? '' : 'hover:gap-x-6 hover:translate-x-3' }duration-300 `}
        >
            {props.text}
            <svg
                className="w-5 h-5"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >

                <path
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                ></path>

            </svg>

        </button>

    )

}
export default Login
