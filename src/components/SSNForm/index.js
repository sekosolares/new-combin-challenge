import React from 'react';
import './SSNForm.css';
import { ErrorInfo } from '../ErrorInfo';
const { SSNSchema, firstNameSchema, lastNameSchema, addressSchema, ssnSchema } = require('./../../schemas/ssnreg.schema');


const validateWithSchema = (schema, data) => schema.validate(data, { abortEarly: false });


function SSNForm({ token, members, setMembers }) {
      const API = "http://localhost:8081/api/members";

      const [saveDisabled, setSaveDisabled] = React.useState(false);
      const [firstName, setFirstName] = React.useState('');
      const [lastName, setLastName] = React.useState('');
      const [address, setAddress] = React.useState('');
      const [ssn, setSsn] = React.useState('');

      const [firstNameErr, setFirstNameErr] = React.useState('');
      const [lastNameErr, setLastNameErr] = React.useState('');
      const [addressErr, setAddressErr] = React.useState('');
      const [ssnErr, setSsnErr] = React.useState('');

      const errors = {
            firstNameErr: {
                  setter: setFirstNameErr,
                  value:firstNameErr
            },
            lastNameErr: {
                  setter: setLastNameErr,
                  value:lastNameErr
            },
            addressErr: {
                  setter: setAddressErr,
                  value:addressErr
            },
            ssnErr: {
                  setter: setSsnErr,
                  value:ssnErr
            }
      };

      const validSchemas = {
            firstName: firstNameSchema,
            lastName: lastNameSchema,
            address: addressSchema,
            ssn: ssnSchema,
      }

      const changeFirstName = (event) => {
            setFirstName(event.target.value);
      };
      const changeLastName = (event) => {
            setLastName(event.target.value);
      };
      const changeAddress = (event) => {
            setAddress(event.target.value);
      };
      const changeSsn = (event) => {
            setSsn(event.target.value);
      };

      const insertMember = async (api, apiToken, data) => {
            try {
                  let response = await fetch(api, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + apiToken,
                        },
                        body: JSON.stringify(data)
                  });

                  return response.json();
            } catch(err) {
                  console.error("Ha ocurrido un error:");
                  console.error(err);
            }
      }

      const validateFieldsInfo = (event) => {
            let data = {
                  firstName,
                  lastName,
                  address,
                  ssn
            };
            let validateData = "";
            let validateSchema = "";
            let validationInfo = "";
            if(event) {
                  validateData = data[event.target.name];
                  validationInfo = validSchemas[event.target.name].validate(validateData);
            } else {
                  validateData = data;
                  validateSchema = SSNSchema;
                  validationInfo = validateWithSchema(validateSchema, validateData);
            }
            console.log("validationInfo: ", validationInfo);

            let fieldsErrors = "";
            let field = "";


            if(validationInfo.error) {
                  setSaveDisabled(true);
                  if(event) {
                        field = event.target.name;
                        errors[`${field}Err`]["setter"](validationInfo.error.toString().split(":")[1]);
                  } else {
                        fieldsErrors = validationInfo.error?.toString().split(':')[1].split('.');
                        fieldsErrors.forEach(err => {
                              field = err.split('"')[1];
                              console.log(field);
                              if(errors[`${field}Err`]["setter"]) {
                                    errors[`${field}Err`]["setter"](err);
                              }
                        });
                  }
                  return true;
            } else {
                  setSaveDisabled(false);
                  ["firstNameErr","lastNameErr","addressErr","ssnErr",].forEach(errField => errors[errField]["setter"](''));
            }

            return false;
      };

      const onSubmitHandler = (event) => {
            event.preventDefault();
            let mems = [...members];
            let newMember = {
                  firstName,
                  lastName,
                  address,
                  ssn
            };

            const hasErrors = validateFieldsInfo();

            if(!hasErrors) {
                  mems.push(newMember);

                  insertMember(API, token, newMember)
                  .then(response => {
                        if(!response.message) {
                              setMembers(mems);
                              console.log(response);
                        }
                  })
                  .catch(err => console.error(err));
                  resetValues();
            }
      }

      const resetValues = () => {
            setFirstName('');
            setLastName('');
            setAddress('');
            setSsn('');
            setSaveDisabled(false);
      };

      return (
            <div className="Form-Container">
                  <div className="Form__Title">
                        <h3>ADD MEMBER</h3>
                  </div>
                  <form onSubmit={onSubmitHandler}>
                        <div className="Form__Element">
                              <label htmlFor="firstName">*First Name</label>
                              <input type="text" value={firstName} onChange={changeFirstName} onKeyUp={validateFieldsInfo}
                              name="firstName" id="firstName" placeholder="First Name" className={errors.firstNameErr.value && "Error"} />
                              {errors.firstNameErr.value && <ErrorInfo message={errors.firstNameErr.value}/>}
                        </div>

                        <div className="Form__Element">
                              <label htmlFor="lastName">*Last Name</label>
                              <input type="text" value={lastName} onChange={changeLastName} onKeyUp={validateFieldsInfo}
                              name="lastName" id="lastName" placeholder="Last Name" className={errors.lastNameErr.value && "Error"} />
                              {errors.lastNameErr.value && <ErrorInfo message={errors.lastNameErr.value}/>}
                        </div>

                        <div className="Form__Element">
                              <label htmlFor="address">*Address</label>
                              <textarea name="address" cols="40" rows="3" id="address" className={errors.addressErr.value && "Error"}
                              placeholder="Address" onChange={changeAddress} onKeyUp={validateFieldsInfo} value={address}></textarea>
                              {errors.addressErr.value && <ErrorInfo message={errors.addressErr.value}/>}
                        </div>

                        <div className="Form__Element">
                              <label htmlFor="ssn">*Social Security Number</label>
                              <input type="text" name="ssn" id="ssn" placeholder="###-##-####"
                              onChange={changeSsn} onKeyUp={validateFieldsInfo} value={ssn}  className={errors.ssnErr.value && "Error"} />
                              {errors.ssnErr.value && <ErrorInfo message={errors.ssnErr.value}/>}
                        </div>

                        <div className="Form__Element">
                              <input type="button" value="Reset" onClick={resetValues} />
                              <input type="submit" value="Save" disabled={saveDisabled} />
                        </div>
                  </form>
            </div>
      );
}

export { SSNForm };