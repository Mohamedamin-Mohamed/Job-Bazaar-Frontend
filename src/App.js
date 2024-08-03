import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
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
import CareerInterests from "./Dashboard/Profile/CareerInterests/CareerInterests";
import Experience from "./Dashboard/Profile/Experience/Experience";
import Jobs from "./Dashboard/Careerhub/Jobs/Upload/Jobs";
import SavedJobs from "./Dashboard/Careerhub/Jobs/Saved/SavedJobs";
import UploadedJobs from "./Dashboard/Careerhub/Jobs/Uploaded/UploadedJobs";
import JobDetails from "./Dashboard/Careerhub/Jobs/Details/JobDetails";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="accounts">
                <Route path="login">
                    <Route index element={<Login />}/>
                    <Route path="email-lookup" element={<EmailLookup/>}/>
                    <Route path="password-reset" element={<PasswordReset/>}/>
                </Route>
                <Route path="signup" element={<Signup/>}/>
            </Route>
            <Route path="careerhub">
                <Route index element={<CareerHub/>}/>
                <Route path="profile" element={<Profile/>}>
                    <Route path="career" element={<CareerInterests/>}/>
                    <Route path="experience" element={<Experience/>}/>
                </Route>
                <Route path="myreferrals" element={<MyReferrals/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="jobs/upload" element={<Jobs />}/>
                <Route path="my/jobs">
                    <Route path="uploaded" element={<UploadedJobs/>}>
                        {/*<Route index element={<Navigate to=":jobId"/>} />*/}
                        <Route path=":jobId" element={<JobDetails />} />
                    </Route>
                    <Route path="saved" element={<SavedJobs/>}/>
                </Route>
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
