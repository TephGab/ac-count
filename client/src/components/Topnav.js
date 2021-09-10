import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const Topnav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) =>{
    e.preventDefault();
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  }

  useEffect((res) => {
    const result = res?.profileObj;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [])

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">AC-COUNTER</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              {user ? <span>
                <span className="m-2">{user.result.name}</span>
                <img src={user.result.imageUrl} alt="imgUser" className="ml-2" style={{width: "45px", borderRadius: "50px 50px"}}/>
              </span> : "No User"}
              <button className="btn btn-danger ml-2 btn-sm" onClick={logout}>Logout</button>
            </a>
          </div>
        </div>
      </header>
        );
  }

  export default Topnav;