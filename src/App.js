
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Routes} from "react-router-dom";
import HomeTile from "./HomeTile";
import Login from "./Login";
import Signup from "./Signup";
import EmailLookup from "./EmailLookup";
import PasswordReset from "./PasswordReset";
import Home from "./Home";

const router = createBrowserRouter(
        createRoutesFromElements(
            //
            //     <Route path="/" element={<Home />}>
            //     <Route path="/accounts" element={<HomeTile />}/>
            //         <Route path="/accounts/login" element={<Login />} />
            //     <Route path="/accounts/signup" element={<Signup />} />
            //         <Route index path="/login/email-lookup" element={<EmailLookup />} />
            //     <Route path="/login/password-reset" element={<PasswordReset />} />
            // </Route>
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/accounts/login" element={<Login />} />
                <Route index path="accounts/login/email-lookup" element={<EmailLookup />} />
                <Route path="accounts/login/password-reset" element={<PasswordReset />} />
                <Route path="accounts/signup" element={<Signup />} />
            </Route>

        )
)
const App = ()=>{
    return(
        <RouterProvider router={router} />
    )
}
export default App
