import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";
import { useEffect, useState } from "react";

//import Spreadsheet from "react-spreadsheet";

const UserSheet = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [activeSheet, setactiveSheet] = useState('1');
  const [showSheet, setshowSheet] = useState(true);


  useEffect((res) => {
    //const result = res?.profileObj;
    setUser(JSON.parse(localStorage.getItem('profile')));
    // if(showSheet){
    //   setactiveSheet('1')
    // }
  }, [])

  const showFirstSheet = () =>{
    setactiveSheet('1')
    // setshowSheet(true)
  } 

  const showSecondSheet = () =>{
    setactiveSheet('2')
  } 
  return (
    <div>
      <Topnav />
      <div className="container-fluid">
        <div className="row">
          <Sidenav />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h3 className="h2">UserSheet</h3>
            </div> */}

            {/* <h2>Section title</h2> */}
            <div className="table-responsive">
              <button className='btn btn-success mb-0 mt-1' onClick={showFirstSheet}>Sheet 1</button> <button className='btn btn-success mb-0 mt-2' onClick={showSecondSheet}>Sheet 2</button>
              <hr/>
              { user?.result.email === "artengineerdaudier4@gmail.com" && activeSheet === '1' ?
               <iframe src="https://docs.google.com/spreadsheets/d/1zKsgWdqNTbR_t5suIhC5_cKeg2RvQXWaAISG-fct7Vs/edit#gid=0" title="usersheet1" style={{width: '100%', height: '100vh'}}> </iframe>
                : ''
              }
               { user?.result.email === "artengineerdaudier4@gmail.com" && activeSheet === '2' ?
                <iframe src="https://docs.google.com/spreadsheets/d/1mR-HdbTtnFgYmQnpqWgpQFc9EBD18FpvbVSlqo5nbaw/edit#gid=0" title="usersheet" style={{width: '100%', height: '100vh'}}> </iframe>
                : ''
              }
          
               {/* { user?.result.email === "tephgab@gmail.com" && activeSheet === '1' ?
               <iframe src="https://docs.google.com/spreadsheets/d/10NS8_7HPDJdA9-Yq8WIvTqTX18zrn0DRwJ2hlzVGSTE/edit" title="usersheet1" style={{width: '100%', height: '100vh'}}> </iframe>
                : <iframe src="https://docs.google.com/spreadsheets/d/1z1w3ZKXmbb7yi5s3qH2dx_WPUdZUHzAc8u8OU-jUkUU/edit#gid=0" title="usersheet" style={{width: '100%', height: '100vh'}}> </iframe>
                } */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserSheet;