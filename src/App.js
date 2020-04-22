import React, { useEffect, useState, useRef } from 'react';
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

const App = ({ setCurrentUser, hidden, isCartHidden, currentUser }) => {
  const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(() => null);

  useEffect(() => {
    /* Open the subscription between Firebase and our app. It is an observable pattern (next, error, complete)
     auth.onAuthStateChanged(next, error, complete), so whenever we pass a function, we are instantiating some listener on this
     onAuthStateChanged observable
     Firebase is a live database, so complete here is rarely happening, because users can be signin again an again, there is
     not a moment when Firebase stops and does not admit more signins */
    const unsub = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });

    setUnsubscribeFromAuth(() => unsub);

    // This returning function is the componentWillUnmount
    return () => {
      unsubscribeFromAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div onClick={isCartHidden ? null : hidden}>
        <Switch >
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => currentUser ? <Redirect to='/' /> : <SignPage />} />
          <Route excat path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    </>
  )
};


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
