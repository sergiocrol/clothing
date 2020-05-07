import React, { useEffect, useState, lazy, Suspense } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions';
import { toggleCartHidden } from './redux/cart/cart.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartHidden } from './redux/cart/cart.selectors';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

// import through lazy, so we chunk our pages in order to load only what we want
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignPage = lazy(() => import('./pages/signpage/signpage.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

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
      <GlobalStyle />
      <Header />
      <div onClick={isCartHidden ? null : hidden}>
        <Switch >
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/signin' render={() => currentUser ? <Redirect to='/' /> : <SignPage />} />
              <Route excat path='/checkout' component={CheckoutPage} />
            </Suspense>
          </ErrorBoundary>
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
