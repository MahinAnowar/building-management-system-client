import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Apartment from "../pages/Apartment/Apartment";
import Dashboard from "../layouts/Dashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembers";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";

import MyProfile from "../pages/Dashboard/Common/MyProfile";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import MakePayment from "../pages/Dashboard/Member/MakePayment";
import Announcements from "../pages/Dashboard/Common/Announcements";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "apartment",
                element: <Apartment></Apartment>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            // Admin Routes
            {
                path: "adminProfile",
                element: <AdminProfile></AdminProfile>
            },
            {
                path: "manageMembers",
                element: <ManageMembers></ManageMembers>
            },
            {
                path: "agreementRequests",
                element: <AgreementRequests></AgreementRequests>
            },
            {
                path: "manageCoupons",
                element: <ManageCoupons></ManageCoupons>
            },
            {
                path: "makeAnnouncement",
                element: <MakeAnnouncement></MakeAnnouncement>
            },
            // Common/Member Routes
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "announcements",
                element: <Announcements></Announcements>
            },
            {
                path: "makePayment",
                element: <MakePayment></MakePayment>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            }
        ]
    }
]);
