import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
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
import Jobs from "./Dashboard/Careerhub/Jobs/UploadJob/Jobs";
import Applied from "./Dashboard/Careerhub/Jobs/DisplayJobsAppliedTo/Applied";
import UploadedJobs from "./Dashboard/Careerhub/Jobs/UploadedJobs/UploadedJobs";
import JobDetails from "./Dashboard/Careerhub/Jobs/Details/JobDetails";
import AvailableJobs from "./Dashboard/Careerhub/Jobs/AvailableJobs/AvailableJobs";
import Display404EmployerOrApplicant
    from "./Dashboard/Careerhub/Jobs/DisplayJobsAppliedTo/Display404EmployerOrApplicant";
import ApplicationDescription
    from "./Dashboard/Careerhub/Jobs/DisplayJobsAppliedTo/Job Description/ApplicationDescription";
import ViewApplication from "./Dashboard/Careerhub/Jobs/DisplayJobsAppliedTo/View Application/ViewApplication";
import Management from "./Dashboard/Careerhub/Management/Management";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home/>}/>
            <Route path="accounts">
                <Route path="login">
                    <Route index element={<Login/>}/>
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
                <Route path="jobs/upload" element={<Jobs/>}/>
                <Route path="my/jobs">
                    <Route path="uploaded" element={<UploadedJobs/>}>
                        <Route path=":jobId" element={<JobDetails/>}/>
                    </Route>
                    <Route path="applied" element={<Applied/>}/>
                </Route>
                <Route path="Job_Bazaar_Careers">
                    <Route path="job/:position" element={<ApplicationDescription/>}/>
                    <Route path="viewApplication/:jobId" element={<ViewApplication/>}/>
                </Route>
                <Route path="explore/jobs" element={<AvailableJobs/>}>
                    <Route path=":jobId" element={<JobDetails/>}/>
                    <Route path="*" element={<Display404EmployerOrApplicant />}/>
                </Route>
                <Route path="employer/management" element={<Management/>}/>
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
