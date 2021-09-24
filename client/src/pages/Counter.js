import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";
import { AlertCircle } from "react-feather";
//import swal from 'sweetalert';
import { isEmpty } from '../Utils';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAc } from "../redux/actions/AcActions";
import { getAc } from '../redux/actions/AcActions';
import { updateAc } from '../redux/actions/AcActions';
import { deleteAc } from '../redux/actions/AcActions';
import { useHistory } from 'react-router-dom';

const Counter = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [acData, setacData] = useState({ accessCode: "" });
  // const [doneCount, setdoneCount] = useState(0);
  // const [undoneCount, setundoneCount] = useState(0);
  const [totaldone, settotaldone] = useState();
  //const [totalundone, settotalundone] = useState();
  const [showAc, setshowAc] = useState(true);
  const acs = useSelector(state => state.acReducer);
  const [totalAcs, settotalAcs] = useState();
  let counted_acs = useSelector(state => state.countAcReducer);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [acBrut, setacBrut] = useState();

  useEffect((res) => {
    const result = res?.profileObj;
    setUser(JSON.parse(localStorage.getItem('profile')));
    console.log(result);
  }, []);

  const acBrutCount = () =>{
    let allAcs = acData.accessCode;
    let removeWords = allAcs.replace(/Review|x|of|Session|Do|you|want|to|(|)|dismiss|this|Session|Cancel|-|OK/gi, " ");
    let removeSpaces = removeWords.replace(/\s+|/gi, '');

   var checkAc = /[1234567890]/ig
   var checkDOneUndone = /completed|restart|done|undone/ig,ci
   var tabloAc = removeSpaces.match(checkAc);
   var tabloDoneUndone = removeSpaces.match(checkDOneUndone);
   var tab1 = [];
   var tab2 = [];
   var tot_done = [];
   var tot_undone = [];
   var tabString = tabloAc.toString();
   var tabOnlyNum = tabString.replace(/,/gi, " ");
   var removeAllSpaces = tabOnlyNum.replace(/\s+|/gi, '');
   for (let i = 0; i <= removeAllSpaces.length-9 ; i+=9) {
     tab1.push(removeAllSpaces.substring(i, i+9));
   }

   for (let i = 0; i < tab1.length; i++) {
     let part1 = tab1[i].substring(0, 3) + '-';
     let part2 = tab1[i].substring(3, 6) + '-';
     let part3 = tab1[i].substring(6, 9)
     tab2.push(part1 + part2 + part3);
   }
   
   for (let i = 0; i < tabloDoneUndone.length; i++) {
      if(tabloDoneUndone[i] == 'completed'){
        tab2[i] = tab2[i] + '-completed'; 
      }
   }

   for (let i = 0; i < tab2.length; i++) {
    if(tab2[i].includes('completed')){
      tot_done.push(tab2[i]); 
    }
    else{
      tot_undone.push(tab2[i] + '-restart'); 
    }
 }
  const acInfo = acs.find( ({ email }) => email === user.result.email )
  handleSubmitDone({totalDone: tot_done});
  handleSubmitUndone({totalUndone: tot_undone})
 }

  const handleSubmitDone = async (e) =>{
    console.log(e);
   // e.preventDefault();
   const acInfo = acs.find( ({ email }) => email === user.result.email )
   // const acId = acs.map((ac) => ac._id);
    if(acInfo.email)
    {
      for (let i = 0; i < e.totalDone.length; i++) {
        await dispatch(updateAc(acInfo._id, e.totalDone[i], true, user.result.email));
      }
    }
    // else{
    //   await dispatch(addAc(totaldone, true, user.result.email));
    // }
    setshowAc(true);
  }

    const handleSubmitUndone = async (e) =>{
      //e.preventDefault();
     // const acId = acs.map((ac) => ac._id);
     const acInfo = acs.find( ({ email }) => email === user.result.email )
      if(acInfo.email)
      {
        for (let i = 0; i < e.totalUndone.length; i++) {
          await dispatch(updateAc(acInfo._id, e.totalUndone[i], false, user.result.email));
        }
      }
      // else{
      //   await dispatch(addAc(acData, false, user.result.email));
      // }
      setshowAc(true);
    }

    const acReset = () => {
      settotalAcs(acs)
      const temp_user = user.result.email;
      const acInfo = acs.find( ({ email }) => email === user.result.email )
      dispatch(deleteAc(acInfo._id))
      counted_acs.totalDone = 0;
      counted_acs.totalUndone = 0;
      dispatch(addAc(acs, true, temp_user, 'reset'));
      // dispatch(getAc(user.result.email));
      //  window.location.replace('/counter');
      // getAc(user.result.email);
      // setshowAc(true);
      // dispatch(addAc('', true, user.result.email, 'reset'));
      //dispatch(getAc(user.result.email));
      // console.log('Acs has is running');
     // history.push('/counter');
    } 

  useEffect(() => {
    if(showAc){
      setUser(JSON.parse(localStorage.getItem('profile')));
      dispatch(getAc(user.result.email));
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
                  {/* <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> */}
                </div>
                <button type="button" className="btn btn-danger btn-sm btn-outline-secondary" onClick={acReset}>
                  <span><AlertCircle/></span>
                  Clear
                </button>
              </div>
            </div>

            {/* Text area accodes */}
            <div className="form-outline mb-4">
            <textarea className="form-control" id="textAreaExample6" placeholder="Add access code" rows="3" name="titre" value={acData.accessCode} onChange={(e)=> setacData({ ...acData, accessCode: e.target.value})} ></textarea>
            <div>
              {
              /* <button onClick={handleSubmitDone} className="btn btn-primary m-1" style={{width: '49%'}}> <Check /> Add as done</button>
              <button onClick={handleSubmitUndone} className="btn btn-warning m-1" style={{width: '49%'}}> <AlertCircle/> Add as undone</button> 
              */}
               <button className="btn btn-primary m-1 btn-block" style={{width: '98%', fontWeight: 'bold'}} onClick={acBrutCount}>Count and classify</button>
              </div> 
            {/* <label className="form-label" htmlfor="textAreaExample6">100% width of the parent</label> */}
           
            </div>

            {/* <h2>Section title</h2> */}
            <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col" style={{display: 'flex', alignItems: 'center', padding:"0", fontSize: '1rem'}}>
                      <div className="w-50 m-0 p-0"> Undone: <span style={{color: '##38761d'}}>{!isEmpty(counted_acs) && counted_acs.totalUndone} </span></div>
                      <div className="w-50 m-0 p-0"> Done: <span style={{color: '#d45a00'}}> {!isEmpty(counted_acs) && counted_acs.totalDone }</span></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{maxWidth:"100%", whiteSpace: "normal", wordWrap: "normal"}}>
                      {!isEmpty(acs) && acs.map((ac, id) => { return <div style={{color: '#38761d', background: '#fdf8e4'}}> { ac.doneAccessCode } </div> })}
                      {!isEmpty(acs) && acs.map((ac, id) => { return <div style={{color: '#d45a00', background: '#fdf8e4'}}> { ac.undoneAccessCode } </div> })}
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col" style={{width:"50%", padding:"0"}}>Done: {!isEmpty(counted_acs) && counted_acs.totalDone } </th>
                    <th scope="col" style={{width:"50%", padding:"0"}}>Undone: {!isEmpty(counted_acs) && counted_acs.totalUndone }</th>
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
              </table> */}
            </div>
          </main>
        </div>
      </div>

      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Counter;