import React from 'react'
import './style.css'

export const Login = () => {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin(event)
        }
    };
    return (
        <div className="wrapper">
            <div className="logo">
                <img
                    src="../logoRHM-1-1-300x293.png"
                    alt="logo"
                    width={'200px'}
                />
            </div>
            {/* <div className="">Admin</div> */}
            <br />
            <br />
            <br />
            <form className="p-3 mt-3" onKeyDown={handleKeyDown}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user" />
                    <input type="text" name="userName" id="userName" placeholder="Username"
                    // onChange={(e) => setUserName(e.target.value)}
                    />
                    {/* {validationErrors.userName && <div className="feedback invalid-feedback feedback-active">{validationErrors.userName}</div>} */}
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key" />
                    <input type="password" name="password" id="pwd" placeholder="Password"
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* {validationErrors.password && <div className="feedback invalid-feedback feedback-active">{validationErrors.password}</div>} */}
                </div>
                <button className="btn mt-3" onClick={(e) => handleLogin(e)} >Login</button>
            </form>
        </div>
    )
}
