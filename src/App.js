import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

//import { auth, createUserProfileDocument } from './firebase/firebase.utils';  //addCollectionAndDocuments
//import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {

      const { checkUserSession } = this.props;
      checkUserSession();
  }

  componentWillUnmount() {
     this.unsubscribeFromAuth();  //closes the subscription to the signed in user. 
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout'  component={CheckoutPage} />
          <Route 
              exact 
              path='/signin' 
              render= {() => 
                this.props.currentUser ? 
                (<Redirect to='/' />) : 
                (<SignInAndSignUpPage />)} 
          />
        </Switch>
  
      </div>
    );
  }

}

const  mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
   // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
   checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
