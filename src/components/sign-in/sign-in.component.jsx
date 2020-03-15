import React, { Component } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });

    } catch (error) {
      console.log(error);
    }

    this.setState({
      email: '',
      password: ''
    })
  }

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput name='email' type='email' value={email} handleInput={this.handleInput} required label='Email' />
          <FormInput name='password' type='password' value={password} handleInput={this.handleInput} required label='Password' />
          <div className='buttons'>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;