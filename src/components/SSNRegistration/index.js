import React from 'react';
import { SSNForm } from './../SSNForm';
import { SSNData } from './../SSNData';
import './SSNRegistration.css';

function SSNRegistration({ members, token, setMembers }) {
      return (
            <div className="SSNRegistration">
                  <SSNForm
                        token={token}
                        setMembers={setMembers}
                        members={members}
                  />
                  <SSNData
                        token={token}

                        members={members}
                  />
            </div>
      )
}

export { SSNRegistration };