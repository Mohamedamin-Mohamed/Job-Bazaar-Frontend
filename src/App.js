import Home from "./Home";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import HomeTile from "./HomeTile";
import Login from "./Login";
import Signup from "./Signup";
import EmailLookup from "./EmailLookup";
import PasswordReset from "./PasswordReset";

const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/accounts" element={<HomeTile />} />
                    <Route path="/login" element={<Login />} />
                    <Route index path="/login/email-lookup" element={<EmailLookup />} />
                <Route path="/login/password-reset" element={<PasswordReset />} />
                    <Route path="/signup" element={<Signup />} />
            </Route>

        )
)
const App = ()=>{
    return(
        <RouterProvider router={router} />
    )
}
export default App
