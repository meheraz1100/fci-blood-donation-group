import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ContactUs from "../Pages/Shared/ContactUs/ContactUs";
import Dashboard from "../Layout/Dashboard";
import AllEmployee from "../Pages/Dashboard/AllEmployee/AllEmployee";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import EmployeeList from "../Pages/Dashboard/EmployeeList/EmployeeList";
import Progress from "../Pages/Dashboard/Progress/Progress";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import WorkSheet from "../Pages/Dashboard/WorkSheet/WorkSheet";
import EmployeeDetails from "../Pages/Dashboard/EmployeeList/EmployeeDetails";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Profile from "../Pages/Profile/Profile";
import Messages from "../Pages/Dashboard/Messages/Messages";
import AllVolunteers from "../Pages/Shared/AllVOlunteers/AllVolunteers";
import PendingVolunteers from "../Pages/Dashboard/PendingVolunteers/PendingVolunteers";
import VerifiedVolunteers from "../Pages/Dashboard/VerifiedVolunteers/VerifiedVolunteers";
import Feedback from "../Pages/Dashboard/Feedback/Feedback";
import AddAchivement from "../Pages/Dashboard/AddAchivement/AddAchivement";
import Achivements from "../Pages/Dashboard/Achivements/Achivements"
import AddDonatingMoment from "../Pages/Dashboard/AddDonatingMoment/AddDonatingMoment";
import DonationMoments from "../Pages/Dashboard/DonationMoments/DonationMoments";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>
        },
        {
          path: "/contact",
          element: <ContactUs></ContactUs>
        },
        {
          path: "/all-volunteers",
          element: <AllVolunteers></AllVolunteers>,
          loader: () => fetch('https://fci-blood-donation-group.vercel.app/volunteers')
        },
        {
          path: "/profile",
          element: <Profile></Profile>
        },
        {
          path: "/pending-volunteers",
          element: <PendingVolunteers></PendingVolunteers>,
          loader: () => fetch('https://fci-blood-donation-group.vercel.app/pending-volunteers')
        },
        {
          path: "/verified-volunteers",
          element: <VerifiedVolunteers></VerifiedVolunteers>,
          loader: () => fetch('https://fci-blood-donation-group.vercel.app/verified-volunteers')
        },
        {
          path: "/feedbacks",
          element: <Feedback></Feedback>,
          loader: () => fetch('https://fci-blood-donation-group.vercel.app/feedbacks')
        },
        {
          path: "/addAchivement",
          element: <AddAchivement></AddAchivement>
        },
        {
          path: "/achivements",
          element: <Achivements></Achivements>,
          loader: () => fetch('https://fci-blood-donation-group.vercel.app/achivements')
        },
        // add-donating-moment
        {
          path: "/add-donating-moment",
          element: <AddDonatingMoment></AddDonatingMoment>
        },
        {
          path: "/donation-moments",
          element: <DonationMoments></DonationMoments>,
          loader: () => fetch('https://fci-blood-donation-group.vercel.app/donating-moments')
        }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // admin route only
      {
        path: 'all-employee-list',
        element: <AllEmployee></AllEmployee>
      },
      {
        path: 'admin-home',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'messages',
        element: <Messages></Messages>,
        loader: () => fetch('https://fci-blood-donation-group.vercel.app/messages')
      },
      // hr route only
      {
        path: 'employee-list',
        element: <EmployeeList></EmployeeList>
      },
      {
        path: 'employee-list/employee-details/:id',
        element: <EmployeeDetails></EmployeeDetails>,
        loader: ({params}) => fetch(`https://fci-blood-donation-group.vercel.app/employee-details/${params.id}`)
      },
      {
        path: 'employee-list/payment/:id',
        element: <Payment></Payment>,
        loader: ({params}) => fetch(`https://fci-blood-donation-group.vercel.app/payment/${params.id}`)
      },
      {
        path: 'progress',
        element: <Progress></Progress>,
        loader: () => fetch('https://fci-blood-donation-group.vercel.app/worksheet')
      },
      // employee route only
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'work-sheet',
        element: <WorkSheet></WorkSheet>
      }
    ]
  }
]);