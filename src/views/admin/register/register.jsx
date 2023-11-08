import axios from "axios";
import React, { useEffect, useState } from "react";
import "./register.css";

import { Link} from "react-router-dom";
import baseUrl from './config.jsx';

export const Register = () =>{
    const [hiddenPassConf, setHiddenConf] = useState(false);
    const [errorActive, setActive] = useState(false);
    const [hiddenPass, setHidden] = useState(false);
    const [errorCheck, setCheck] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    // hidden password function
    const changeHidden = () =>{
        setHidden(current => !current);
    }

    const changeHiddenConf = () =>{
        setHiddenConf(current => !current);
    }

    // register user function
    const RegisterForm = async(e) =>{
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${baseUrl}/users`,{
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
            });
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
                setActive(false);
            }, 10000);
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
            setSuccess(false);
            setLoading(false);
            setCheck(current=>!current);
        }
    }

    useEffect(() => {
        setActive(true);

        setTimeout(() => {
            setActive(false);
        }, 500);

    }, [errorCheck]);

    return(
        <div className="loginPageReg">
            <div className="loginFormReg">
                <div className="leftFormReg">
                    <img src="logo.png" alt="" />
                </div>

                <div className="rightFormReg">
                    <img src="logo_small.png" alt="" />

                    <h3>Register!</h3>
                    <p>Please fill in the form below</p>
                    
                    <div className="formLoginReg">
                        <form onSubmit={RegisterForm}>
                            <div className="formInputReg">
                                <input type="text" required="required" value={name} onChange={(e) => setName(e.target.value)}/>
                                <span className="inputNameReg">Username</span>
                                <span className="iconFormReg">
                                </span>
                            </div>
                            <div className="formInputReg">
                                <input type="text" required="required" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <span className="inputNameReg">Email Address</span>
                                <span className="iconFormReg">
                                </span>
                            </div>
                            <div className="formInputReg">
                                <input type={hiddenPass === true ? "text" : "password"} required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <span className="inputNameReg">Password</span>
                                <span className="iconFormPassReg">
                                </span>
                            </div>
                            <div className="formInputReg">
                                <input type={hiddenPassConf === true ? "text" : "password"} required="required" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                                <span className="inputNameReg">Confirm Password</span>
                                <span className="iconFormPassReg">
                                </span>
                            </div>
                            <div className="errorMsgReg">
                                {!success && <h4 id="errorTeksReg" className={errorActive ? 'activeError' : 'inactiveErrorReg'}>{msg}</h4>}
                                {success && <h4 id="sucessReg">Registration was Successful</h4>}
                            </div>

                            <div className="buttonSubmitReg">
                                {!loading && <button type="submit" className="subButReg mr-3">Submit</button>}
                                {loading && <button type="submit" className="subButReg"><div className="loaderReg"></div></button>}
                                <h1 className="mt-5 font-bold py-1">ATAU</h1>
                                <Link to="/admin" className="backLoginReg ml-5">Coba Gratis</Link>
                            </div>
                            
                        </form>
                    </div>
                </div>

                </div>
            </div>  
    )
}
