import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import EmailLookup from "./Authentication/EmailLookup";
import PasswordReset from "./Authentication/PasswordReset";
import Home from "./LandingPage/Home";

const router = createBrowserRouter(
        createRoutesFromElements(
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
