import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import EmailLookup from "./Authentication/EmailLookup";
import PasswordReset from "./Authentication/PasswordReset";
import Home from "./LandingPage/Home";
import CareerHub from "./Dashboard/CareerHub";
import Profile from "./Dashboard/Profile/Profile";
import ReferralsRibbon from "./Dashboard/Referrals/ReferralsRibbon";
import MyReferrals from "./Dashboard/Referrals/MyReferrals";
import Refer from "./Dashboard/Referrals/Refer";
import Feedback from "./Dashboard/Feedback";

const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/accounts/login" element={<Login />} />
                <Route index path="accounts/login/email-lookup" element={<EmailLookup />} />
                <Route path="accounts/login/password-reset" element={<PasswordReset />} />
                <Route path="accounts/signup" element={<Signup />} />
                <Route path="/careerhub" element={<CareerHub />} />
                <Route path="careerhub/profile" element={<Profile />} />
                <Route path="/careerhub/myreferrals" element={<MyReferrals />} />
                <Route path="/refer" element={<Refer />} />
                <Route path="/feedback/dashboard" element={<Feedback />} />
            </Route>

        )
)
const App = ()=>{
    return(
        <RouterProvider router={router} />
    )
}
export default App
