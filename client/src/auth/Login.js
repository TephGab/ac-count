import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const googleSuccess = async (res) => {
         const result = res?.profileObj;
         const token = res?.tokenId;
         try {
            dispatch({ type: 'AUTH', data: { result, token} });
            history.push("/home");
         } catch (error) {
             console.log(error);
         }
    }

    const googleFailure = () => {
        console.log("Google signin unsuccessfull")
    }
      return (
         <div>
            <GoogleLogin 
            clientId="342407664687-p76c6jo5b2mdhm7anjqtv2f1vnjfnkf1.apps.googleusercontent.com"
            render={(renderProps) => (
                <button className="btn btn-warning" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with google</button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
             />
         </div>
          );
    }
  
    export default Login;