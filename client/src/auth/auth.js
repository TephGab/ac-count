import Register from './Register';
import Login from './Login';
const Auth = () => {
    const showLogin = true;
      return (
         <div>
             {showLogin ? <Login/> : <Register/>}
         </div>
          );
    }
  
    export default Auth;