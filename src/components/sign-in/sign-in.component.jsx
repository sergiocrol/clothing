import React, { useState } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }

    setCredentials({ email: '', password: '' });
  }

  const handleInput = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput name='email' type='email' value={email} handleInput={handleInput} required label='Email' />
        <FormInput name='password' type='password' value={password} handleInput={handleInput} required label='Password' />
        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
        </div>
      </form>
    </div>
  );

}

export default SignIn;