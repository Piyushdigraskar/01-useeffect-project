import React, { useState, useReducer } from 'react';
import { useContext, useRef } from 'react';
import AuthContext from '../../Store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'User_Input') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'Input_Blur') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
}
const passwordReducer = (state, action) => {
  if (action.type === 'User_Input') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'Input_Blur') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
}
const collegeNamelReducer = (state, action) => {
  if (action.type === 'User_Input') {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === 'Input_Blur') {
    return { value: state.value, isValid: state.value.trim().length > 0 };
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
    dispatchEmail({ type: 'User_Input', val: event.target.value })
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeNameState.isValid
    );

  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'User_Input', val: event.target.value })
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeNameState.isValid
    );

  };

  const collegeNameChangeHandler = (event) => {
    dispatchCollegeName({ type: 'User_Input', val: event.target.value })
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegeNameState.isValid
    );
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'Input_Blur' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'Input_Blur' })
  };

  const validateCollegeNameHandler = () => {
    dispatchCollegeName({ type: 'Input_Blur' })
  }
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();



  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value, collegeNameState.value);
    }
    else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else if (!passwordState.isValid) {
      passwordInputRef.current.focus();
    } else {
      collegeInputRef.current.focus();
    }
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          type="email"
          label="E-Mail"
          isValid={emailState.isValid} value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id='password'
          type="password"
          label="Password"
          isValid={passwordState.isValid} value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <Input
          ref={collegeInputRef}
          id='collegename'
          type="collegename"
          label="College Name"
          isValid={collegeNameState.isValid} value={collegeNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
