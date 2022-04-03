import React from 'react';
import './AppUI.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Login } from '../Login';
import { SSNRegistration } from '../SSNRegistration';

function Nav() {
      const [token, setToken] = React.useState('');
      const [members, setMembers] = React.useState([]);
      const API = "http://localhost:8081/api/members";

      const fetchMembers = async (apiUrl, apiToken) => {
            console.log(`Bearer ${apiToken}`);
            try {
                  const resp = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                              'Authorization': 'Bearer ' + apiToken
                        }
                  });

                  return resp.json();
            }catch(err) {
                  throw new Error(err.message);
            }
      };


      React.useEffect(() => {
            setToken(sessionStorage.getItem('token'));

            if(token) {
                  fetchMembers(API, token)
                  .then(response => {
                        if(!response.message) {
                              setMembers(response);
                              console.log(response);
                        }
                        else {
                              console.error(response.message);
                              sessionStorage.removeItem('token');
                        }
                  })
                  .catch(err => console.error(err));
            }

            console.log(`token=${token}`);
      }, [token]);

      return (
            <Router>
                  <React.Fragment>
                        <nav className="Navigation-Bar">
                              <ul>
                                    <li>
                                          <Link to="/" className={token ? 'hidden' : 'active'}>Login</Link>
                                    </li>
                                    <li>
                                          <Link to="/SSNRegistration" className={token ? 'active' : 'hidden'}>Add Members</Link>
                                    </li>
                              </ul>
                        </nav>
                        <Routes>
                              <Route exact path="/" element={token ? <Navigate to="/SSNRegistration" /> : <Login setToken={setToken} />}></Route>
                              <Route exact path="/SSNRegistration" element={!token ? <Navigate to="/" /> : <SSNRegistration members={members} setMembers={setMembers} token={token} />}></Route>
                        </Routes>
                  </React.Fragment>
            </Router>
      );
}


export { Nav };