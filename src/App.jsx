
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import LoginPage from "./pages/Login";
import ResidentHomePage from "./pages/ResidentHomePage";
import StaffHomePage from "./pages/StaffHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";


function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: (
  //       <div>
  //         <ul className="flex justify-evenly items-center">
  //           <li>
  //             <Link to="/admin/test">Test</Link>
  //           </li>
  //           <li>
  //             <Link to="/resident/home">Student</Link>
  //           </li>
  //           <li>
  //             <Link to="/staff/home">Staff</Link>
  //           </li>
  //           <li>
  //             <Link to="/admin/home">Admin</Link>
  //           </li>
  //         </ul>
  //         <LoginPage />
  //       </div>
  //     ),
  //   },
  //   {
  //     path: "/resident/home",
  //     element: (
        
  //         <>
  //           <ul className="flex justify-evenly items-center">
  //             <li>
  //               <Link to="/admin/test">Test</Link>
  //             </li>
  //             <li>
  //               <Link to="/resident/home">Student</Link>
  //             </li>
  //             <li>
  //               <Link to="/staff/home">Staff</Link>
  //             </li>
  //             <li>
  //               <Link to="/admin/home">Admin</Link>
  //             </li>
  //           </ul>
  //           <ProtectedRoute>
  //             <ResidentHomePage />
  //           </ProtectedRoute>
  //         </>
        
  //     ),
  //   },
  //   {
  //     path: "/staff/home",
  //     element: (
        
  //         <>
  //           <ul className="flex justify-evenly items-center">
  //             <li>
  //               <Link to="/admin/test">Test</Link>
  //             </li>
  //             <li>
  //               <Link to="/resident/home">Student</Link>
  //             </li>
  //             <li>
  //               <Link to="/staff/home">Staff</Link>
  //             </li>
  //             <li>
  //               <Link to="/admin/home">Admin</Link>
  //             </li>
  //           </ul>
  //           <ProtectedRoute>
  //             <StaffHomePage />
  //           </ProtectedRoute>
  //         </>
        
  //     ),
  //   },
  //   {
  //     path: "/admin/home",
  //     element: (
        
  //         <>
  //           <ul className="flex justify-evenly items-center">
  //             <li>
  //               <Link to="/admin/test">Test</Link>
  //             </li>
  //             <li>
  //               <Link to="/resident/home">Student</Link>
  //             </li>
  //             <li>
  //               <Link to="/staff/home">Staff</Link>
  //             </li>
  //             <li>
  //               <Link to="/admin/home">Admin</Link>
  //             </li>
  //           </ul>
  //           <ProtectedRoute>
  //             <AdminHomePage />
  //           </ProtectedRoute>
  //         </>
        
  //     ),
  //   },
  //   {
  //     path: "/admin/test",
  //     element: (
  //       <>
  //         <ul className="flex justify-evenly items-center">
  //           <li>
  //             <Link to="/">Home</Link>
  //           </li>
  //           <li>
  //             <Link to="/resident/home">Student</Link>
  //           </li>
  //           <li>
  //             <Link to="/staff/home">Staff</Link>
  //           </li>
  //           <li>
  //             <Link to="/admin/home">Admin</Link>
  //           </li>
  //         </ul>
  //         <ProtectedRoute>
  //           <>test page</>
  //         </ProtectedRoute>
  //       </>
  //     ),
  //   },
  // ]);

  
  return (
    
    <Router>
      <AuthProvider> 
        <Navbar /> 
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<ProtectedRoute pageRole="login"><LoginPage /></ProtectedRoute>} />
          <Route path="/resident/home" element={<ProtectedRoute pageRole="resident"><ResidentHomePage /></ProtectedRoute>} />
          <Route path="/staff/home" element={<ProtectedRoute pageRole="staff"><StaffHomePage /></ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute pageRole="admin"><AdminHomePage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
