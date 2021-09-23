import { NavLink } from "react-router-dom";
import { Home, BarChart2, Activity } from 'react-feather';
import { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";

const Sidenav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect((res) => {
    //const result = res?.profileObj;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [])

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
            <NavLink exact to="/home" className="nav-link" aria-current="page" activeClassName="navActive">  
                <Home size={17}/>
                  Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink exact to="/counter" className="nav-link" activeClassName="navActive">  
               <BarChart2 size={17}/>
                Counter
              </NavLink>
            </li>
            {/* <li>
              <NavLink exact to="/user-sheet" className="nav-link" activeClassName="navActive">  
                <Activity size={17}/>
                  UserSheet
              </NavLink>
            </li> */}
            {user?.result.email === "artengineerdaudier4@gmail.com" ? 
            <li className="nav-item">
            <NavLink exact to="/ac-old" className="nav-link" activeClassName="navActive">  
               {/* <BarChart2 size={17}/> */}
                Old-ac-counter
              </NavLink>
            </li> 
            : ""}
            
          </ul>
  
          {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a className="link-secondary" href="#" aria-label="Add a new report">
              <span data-feather="plus-circle"></span>
            </a>
          </h6> */}
          <ul className="nav flex-column mb-2">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                <span data-feather="file-text"></span>
                Year-end sale
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
        );
  }

  export default Sidenav;


  