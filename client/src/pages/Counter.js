import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";
import { Check, AlertCircle } from "react-feather";
import swal from 'sweetalert';
import { isEmpty } from '../Utils';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAc } from "../redux/actions/AcActions";
import { getAc } from '../redux/actions/AcActions';
import { updateAc } from '../redux/actions/AcActions';

const Counter = () => {
  const dispatch = useDispatch();
  const [acData, setacData] = useState({ accessCode: "" });
  const [showAc, setshowAc] = useState(true);
  const acs = useSelector(state => state.acReducer);

  // console.log(acs);
  const handleSubmitDone = async (e) =>{
    e.preventDefault();
    const acId = acs.map((ac) => ac._id);
    console.log(acId.toString())
    if(acs.find( ({ email }) => email === 'tephgab@gmail.com' ))
    {
    await dispatch(updateAc(acId, acData.accessCode, true));
    }
    else{
        await dispatch(addAc(acData, true));
    }
    setshowAc(true);
    }

    const handleSubmitUndone = async (e) =>{
      e.preventDefault();
      const acId = acs.map((ac) => ac._id);
      console.log(acId.toString())
      if(acs.find( ({ email }) => email === 'tephgab@gmail.com' ))
      {
      await dispatch(updateAc(acId, acData.accessCode, false));
      }
      else{
        await dispatch(addAc(acData, false));
      }
      setshowAc(true);
      }

  useEffect(() => {
    if(showAc){
      dispatch(getAc());
      setshowAc(false);
      setacData({ accessCode: "" });
  }
  }, [showAc,dispatch]);

  return (
    <div>
      <Topnav />

      <div className="container-fluid">
        <div className="row">
          <Sidenav />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h3 className="h2">Counter</h3>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                </div>
              </div>
            </div>

            {/* Text area accodes */}
            <div className="form-outline mb-4">
            <textarea className="form-control" id="textAreaExample6" placeholder="Add access code" rows="3" name="titre" value={acData.accessCode} onChange={(e)=> setacData({ ...acData, accessCode: e.target.value})} ></textarea>
            <div><button onClick={handleSubmitDone} className="btn btn-primary m-1" style={{width: '49%'}}> <Check /> Add as done</button>
                 <button onClick={handleSubmitUndone} className="btn btn-warning m-1" style={{width: '49%'}}> <AlertCircle/> Add as undone</button></div>
            {/* <label className="form-label" for="textAreaExample6">100% width of the parent</label> */}
            </div>

            {/* <h2>Section title</h2> */}
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col" style={{width:"50%", padding:"0"}}>Done (3)</th>
                    <th scope="col" style={{width:"50%", padding:"0"}}>Undone (2)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{maxWidth:"100%", whiteSpace: "normal", wordWrap: "normal"}}>
                    {!isEmpty(acs) && acs.map((ac, id) => { return <td> { ac.doneAccessCode } </td> })}
                    </td>
                    <td style={{maxWidth:"100%", whiteSpace: "normal", wordWrap: "normal"}}>
                    {!isEmpty(acs) && acs.map((ac, id) => { return <div style={{display: "inlineBlock"}} className="col-md-10"> { ac.undoneAccessCode } </div> })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Counter;