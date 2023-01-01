import React from 'react'
import {Link} from "react-router-dom";


const Navbar = () =>  {

    return (
        <div >
             <nav className="navbar fixed-top navbar-expand-lg bg-dark">
             <div className="container-fluid">
                        <Link className="navbar-brand text-light" to="/">Gautam's News App</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                 <div className="collapse navbar-collapse " id="navbarSupportedContent">
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link className="nav-link text-light " aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link text-light" to="/business">Business</Link>
                        </li>
                             <li className="nav-item">
                          <Link className="nav-link text-light" to="/entertainment">Entertainment</Link>
                        </li>
                             <li className="nav-item">
                          <Link className="nav-link text-light" to="/general">General</Link>
                        </li>
                             <li className="nav-item">
                          <Link className="nav-link text-light" to="/health">Health</Link>
                        </li>
                             <li className="nav-item">
                          <Link className="nav-link text-light" to="/science">Science</Link>
                        </li>
                             <li className="nav-item">
                          <Link className="nav-link text-light" to="/sports">Sports</Link>
                        </li>
                             <li className="nav-item">
                          <Link className="nav-link text-light" to="/technology">Technology</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-btn btn-secondary" type="submit">Search</button>
                    </form>
                
                </div>
            </div>
            </nav>
               
      </div>
    )

}

export default Navbar



