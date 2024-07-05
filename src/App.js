import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import EmailLookup from "./Authentication/EmailLookup";
import PasswordReset from "./Authentication/PasswordReset";
import Home from "./LandingPage/Home";
import CareerHub from "./Dashboard/Careerhub/CareerHub";
import Profile from "./Dashboard/Profile/Profile";
import MyReferrals from "./Dashboard/Referrals/MyReferrals";
import Refer from "./Dashboard/Referrals/Refer";
import Feedback from "./Dashboard/Feedback/Feedback";
import NotFound from "./NotFound/NotFound";
import NotFound2 from "./NotFound/NotFound2";
import Settings from "./Dashboard/Settings/Settings";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="accounts">
                <Route path="login" element={<Login/>}/>
                <Route path="login/email-lookup" element={<EmailLookup/>}/>
                <Route path="login/password-reset" element={<PasswordReset/>}/>
                <Route path="signup" element={<Signup/>}/>
            </Route>
            <Route path="careerhub">
                <Route index element={<CareerHub/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="myreferrals" element={<MyReferrals/>}/>
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="refer" element={<Refer/>}/>
            <Route path="feedback">
                <Route path="dashboard" element={<Feedback/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route path="*" element={<NotFound2/>}/>
        </Route>
    )
)
const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default App
