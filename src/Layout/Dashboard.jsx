
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useHR from "../Hooks/useHR";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    
    const [isAdmin] = useAdmin();
    const [isHR] = useHR();
    // const isAdmin = true;
    return (
        <>
        <Helmet>
        <title>Employ Ease | Dashboard</title>
      </Helmet>
        <div className="flex">
            <div className="w-64 min-h-screen bg-blue-500 dark:text-white">
                {/* dashboard side bar */}
                <ul className="menu p-4">
                    {
                        isAdmin && (<>
                        
                        <li><NavLink to="/dashboard/all-employee-list">All Employee</NavLink></li>
                        <li><NavLink to={`/dashboard/admin-home/`}>Admin Home</NavLink></li>
                        <li><NavLink to='/dashboard/messages'>Messages</NavLink></li>
                        <li><NavLink to="/">Home</NavLink></li>
                        </> 

                    )

                    }
                    {
                        isHR && (<>
                        <li><NavLink to="/dashboard/employee-list">Employee list</NavLink></li>
                        <li><NavLink to="/dashboard/payment-history">Payment History</NavLink></li>
                        <li><NavLink to="/dashboard/progress">Progress</NavLink></li>
                        <li><NavLink to="/">Home</NavLink></li>
                        </>)
                    }
                    {
                        !isAdmin && !isHR && (
                            <>
                            <li><NavLink to="/dashboard/work-sheet">Work Sheet</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history">Payment History</NavLink></li>
                            <li><NavLink to="/">Home</NavLink></li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
        </>
    );
};

export default Dashboard;


// {isAdmin ? (<>
//     <li><NavLink to="/dashboard/all-employee-list">All Employee</NavLink></li>
//     <li><NavLink to={`/dashboard/admin-home/`}>Admin Home</NavLink></li>
//     <li><NavLink to="/">Home</NavLink></li>
// </>) : 
// (<>
// <li><NavLink to="/dashboard/employee-list">Employee list</NavLink></li>
// <li><NavLink to="/dashboard/payment-history">Payment History</NavLink></li>
// <li><NavLink to="/dashboard/progress">Progress</NavLink></li>
// <li><NavLink to="/">Home</NavLink></li>
// </>) 
// }
// {
//     isHR ? 
//     <>
//     <li><NavLink to="/dashboard/employee-list">Employee list</NavLink></li>
//     <li><NavLink to="/dashboard/progress">Progress</NavLink></li>
//     <li><NavLink to="/">Home</NavLink></li>
//     </> : 
//     <>
//     <li><NavLink to="/dashboard/work-sheet">Work Sheet</NavLink></li>
//     <li><NavLink to="/dashboard/payment-history">Payment History</NavLink></li>
//     <li><NavLink to="/">Home</NavLink></li>
//     </>
// }