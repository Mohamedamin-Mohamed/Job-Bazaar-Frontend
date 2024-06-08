import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import EmailLookup from "./Components/EmailLookup";
import PasswordReset from "./Components/PasswordReset";
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
