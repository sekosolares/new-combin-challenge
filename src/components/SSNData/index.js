import React from 'react';
import './SSNData.css';

function SSNData({ members }) {

      return (
            <div className="Data">
                  <div className="Data__Title">
                        <h3>MEMBERS</h3>
                  </div>
                  <table className="Data__Table">
                        <thead>
                              <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>SSN</th>
                              </tr>
                        </thead>
                        <tbody>
                              {([...members].map(member => (
                                    <tr key={member.ssn}>
                                          <td>{member.firstName}</td>
                                          <td>{member.lastName}</td>
                                          <td>{member.address}</td>
                                          <td>{member.ssn}</td>
                                    </tr>
                              )))}
                        </tbody>
                  </table>
            </div>
      );
}


export { SSNData };