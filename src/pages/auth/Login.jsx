import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../assets/img/dd.png'
import captcha from '../../assets/captcha.png'
import { GetAuthInstance } from '../../helpers/httpClient';
import { getToken, setToken } from '../../helpers/tokenStorage';

export const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState({username: '', password: ''}, '');
    const [err, setErr] = useState({});

    useEffect(() => {
        if (getToken()) {
            navigate('dashboard/main');
        }

    }, []);
    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        let t = true,
            e = {};

        if (!obj.login) {
            t = false;
            e = {...e, login: true};
        }

        if (!obj.password) {
            t = false;
            e = {...e, password: true};
        }
        if (t) {
            GetAuthInstance()
                .post('/o/token/', new URLSearchParams({
                    username: obj.login,
                    password: obj.password,
                    grant_type: "password",
                    client_id: "hd1FyNwHJioJUv6s38cL78rWFkU4DMBvMS3vWU4c",
                    client_secret: "vIdhbsblwmY4E0jDagqIRsuqSB5odUb75DZJy8MdZ4koEJF7monkySBQpYdW3PNPuxTZqpkUEjtEZ1IDAmD2zoXv75rvhzNDIl6KhBA5DT8Fv2tec8qFRqoTlxkpuDRI",
                }))
                .then((res) => {
                    setToken(res.data.access_token, true);
                    navigate('/dashboard/main');
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setErr({common: true});
                });
        } else {
            setErr(e);
            setLoading(false);
        }
    };
  return (
    <div className='LoginStyle'>
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-center">
                    <div>
                        <img src={LoginPage}  />
                    </div>
                </div>
                <div className="col-md-6  p-3">
                    <div className="form-group">
                        <form  className='FormGroup'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">+998</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className='fa fa-refresh'></i></span>
                                    <span className="input-group-text pt-2" id="basic-addon1">
                                        <img src={captcha} width='85%' alt="" />
                                    </span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Captcha"
                                        aria-label="Captcha"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                            <div>
                                <button type="submit" className='btn btn-primary'>Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
