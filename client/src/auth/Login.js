import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAc } from "../redux/actions/AcActions";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const googleSuccess = async (res) => {
         const result = res?.profileObj;
         const token = res?.tokenId;
         try {
            dispatch({ type: 'AUTH', data: { result, token} });
            dispatch(addAc('', true, result.email));
            history.push("/home");
         } catch (error) {
             console.log(error);
         }
    }

    const googleFailure = () => {
        console.log("Google signin unsuccessfull")
    }
      return (
        <div className="text-center">  
         <main className="form-signin">

                <form>
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>

                    {/* <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput"/>
                    <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                    </div> */}

                    {/* 
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                    <div> */}
                    <div className="checkbox mb-3">
                    <GoogleLogin 
                        clientId="342407664687-p76c6jo5b2mdhm7anjqtv2f1vnjfnkf1.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button className="w-100 btn btn-lg btn-warning" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with google</button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        />
                    </div>
                    {/* <p className="mt-5 mb-3 text-muted">&copy; 2021</p> */}
                </form>
         </main>
        </div>
          );
    }
  
    export default Login;