import React, { useState } from 'react';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const SignUp = () => {
  const [userCredentials, setCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleInput = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  }

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      setCredentials({ displayName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='sign-up'>
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleInput}
          label='Display name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleInput}
          label='email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleInput}
          label='password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleInput}
          label='confirmPassword'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>

    </div>
  );
}

export default SignUp;