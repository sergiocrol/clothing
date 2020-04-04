import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignPage from './pages/signpage/signpage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions';
import { toggleCartHidden } from './redux/cart/cart.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartHidden } from './redux/cart/cart.selectors';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    // Open the subscription between Firebase and our app
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth);
      }

    });
  }

  componentWillUnmount() {
    // Close the subscription
    this.unsubscribeFromAuth();
  }

  render() {
    const { hidden, isCartHidden } = this.props;
    return (
      <>
        <Header />
        <div onClick={isCartHidden ? null : hidden}>
          <Switch >
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignPage />} />
            <Route excat path='/checkout' component={CheckoutPage} />
          </Switch>
        </div>
      </>
    )
  };
}

// We need our current user, so if the user is logged in we want not to get access to SignPage
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCartHidden: selectCartHidden
});

// Here we save in props a property called setCurrentUser which will run user.action.js; this property will be used above,
// inside componentDidMount, passing a user.
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  hidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
