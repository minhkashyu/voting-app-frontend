import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser, loginFacebook, loginGoogle } from './../../actions/auth';
import RegisterForm from './registerForm.jsx';
import LoginMedia from './loginMedia.jsx';
import Loading from './../template/loading.jsx';

class Register extends Component {

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error</strong>&nbsp;&nbsp;{this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { isAuthenticated, location, isFetching, registerUser, loginFacebook, loginGoogle } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/my-polls',
                    state: { from: location }
                }}/>
            );
        }
        if (isFetching) {
            return <Loading />;
        }
        return (
            <div>
                {this.renderError()}
                <RegisterForm onSubmitRegister={registerUser} />
                <div className="mt-divider"></div>
                <LoginMedia onLoginFacebook={loginFacebook} onLoginGoogle ={loginGoogle} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.main.isFetching
    };
}

export default connect(mapStateToProps, { registerUser, loginFacebook, loginGoogle })(Register);