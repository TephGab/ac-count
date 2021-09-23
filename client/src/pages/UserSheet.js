import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";
//import Spreadsheet from "react-spreadsheet";

const UserSheet = () => {
  // const RangeView = ({ A6 }) => (
  //   <input
  //     type="range"
  //     value={A6}
  //     disabled
  //     style={{ pointerEvents: "none" }}
  //   />
  // );
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
            <iframe src="https://docs.google.com/spreadsheets/d/10NS8_7HPDJdA9-Yq8WIvTqTX18zrn0DRwJ2hlzVGSTE/edit#gid=0" title="usersheet" style={{width: '100%', height: '100vh'}}>
            </iframe>
            </div>
          </main>
        </div>
      </div>

      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default UserSheet;