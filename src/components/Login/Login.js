import React, { useState,  useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'User_Input'){
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if(action.type === 'Input_Blur'){
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
}
const passwordReducer = (state, action) => {
  if(action.type === 'User_Input'){
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if(action.type === 'Input_Blur'){
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
}
const collegeNamelReducer = (state, action) => {
  if(action.type === 'User_Input'){
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if(action.type === 'Input_Blur'){
    return { value: state.value, isValid: state.value.trim().length > 0};
  }
  return { value: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollegeName, setEnteredCollegeName] = useState('');
  // const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });
  const [collegeNameState, dispatchCollegeName] = useReducer(collegeNamelReducer, {
    value: '',
    isValid: null
  });

  // useEffect(() => {
  //   setTimeout(()=>{
  //     const identifier = setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length > 0
  //     );
  //   }, 500)
  //   return ()=>{
  //     clearTimeout(identifier);
  //   }
  // }, [enteredEmail, enteredPassword, enteredCollegeName])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'User_Input', val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeNameState.isValid
    );

  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'User_Input', val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeNameState.isValid
    );

  };

  const collegeNameChangeHandler = (event) => {
    dispatchCollegeName({type:'User_Input', val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeNameState.isValid
    );
  }

  const validateEmailHandler = () => {
    dispatchEmail({type:'Input_Blur' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'Input_Blur'})
  };

  const validateCollegeNameHandler = () => {
    dispatchCollegeName({type:'Input_Blur'})
  }
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeNameState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${collegeNameState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegename">College Name</label>
          <input
            type="collegename"
            id="collegename"
            value={collegeNameState.value}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
