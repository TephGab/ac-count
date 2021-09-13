import { useState } from 'react';

const AcOld = () => {

  const [string, setString ] = useState('');
  const [isDisplay,setDisplay]=useState(true);
  const [totalAc, setTotalAc] = useState();
  const [totalDone, setTotalDone] = useState();
  const [totalUndone, setTotalUndone] = useState();
  const [tablo, setTablo] = useState();
  let finalFormatAccCodes = [];

  const handleChange=(e)=>{
    setDisplay(false);
    setString(e.target.value);
  }

  const formatString=()=>{
    setDisplay(true);
    let temp = string;
    let total = totalAc;
    let tot_done = totalDone;
    let tot_undone = totalUndone;
    let accesCodesWithoutDone = [];

    tot_done = calculDone('d', temp)
    let temp_trim  = temp.replace(/\s+|/gi, '');

    temp = temp.replace(/done|-|\s+|/gi, '');
    total = (temp.length / 11);
   
      function calculDone(lettre, mot){
        let mot2 = mot.split(lettre);
        let nb_fois_trouve = mot2.length-1;
        return nb_fois_trouve;
      }

       accesCodesWithoutDone = temp_trim.split("(");
     

        for (let i = 1; i < accesCodesWithoutDone.length; i++) {
          finalFormatAccCodes.push(i + '(' + accesCodesWithoutDone[i]);
         }
         
        
      

    tot_undone = (total-tot_done);

    setString(temp);
    setTotalAc(total);
    setTotalDone(tot_done);
    setTotalUndone(tot_undone);
    setTablo(finalFormatAccCodes)
  }

  return (

    <div className="App container-fluid">
      <div className="row">
        <div className="col-md-12">
          <textarea placeholder="Enter Access codes" onChange={handleChange} className="mainInput" style={{width: "100%",
            height: "200px"}}>
          </textarea>

          <button onClick={formatString} className="btn-clock btn-primary">Calculer</button>
          <hr/>
          <p>Total: {isDisplay && totalAc}</p>
          <p>Done: {isDisplay && totalDone}</p>
          <p>Undone: {isDisplay && totalUndone}</p>
          <p>{isDisplay && tablo}</p>
        </div>
      </div>
    </div>

  );

}

export default AcOld;