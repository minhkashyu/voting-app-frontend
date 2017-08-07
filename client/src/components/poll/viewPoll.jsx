import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSinglePoll, submitVote, deletePoll } from './../../actions/polling';
import VoteForm from './voteForm.jsx';
import Loading from './../template/loading.jsx';
import ShareSocialMedia from './../template/shareSocialMedia.jsx';

class ViewPoll extends Component {

    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { match, fetchSinglePoll } = this.props;
        fetchSinglePoll(match.params.pollId);
    }

    onSubmitVote(formprops) {
        let optionId = formprops.options,
            blAdd = false;
        if (formprops.options === 'custom') {
            optionId = formprops.customOption;
            blAdd = true;
        }
        this.props.submitVote(this.props.match.params.pollId, optionId, blAdd);
    }

    handleClick(e) {
        const { match, deletePoll } = this.props;
        e.preventDefault();
        if (window.confirm('Are you sure to delete this poll?')) {
            deletePoll(match.params.pollId);
        }
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error</strong>&nbsp;&nbsp;{this.props.errorMessage}
                </div>
            );
        }
    }

    renderMessage() {
        if (this.props.message) {
            return (
                <div className="alert alert-success">
                    <strong>Success!</strong>&nbsp;&nbsp;{ this.props.message }
                </div>
            );
        }
    }

    renderForm() {
        const { poll, isAuthenticated } = this.props;
        if(poll.options && poll.options.length > 0) {
            return (
                <VoteForm options={poll.options} onSubmitVote={this.onSubmitVote.bind(this)} isAuthenticated={isAuthenticated} />
            );
        }
    }

    renderDeletePoll() {
        const { poll, isAuthenticated, cookies } = this.props;
        if (isAuthenticated && (poll.author === cookies.get('user').id)) {
            return (
                <button type="button" className="btn btn-link btn-delete" onClick={(e) => this.handleClick(e)} title="Delete this poll">
                    <span className="glyphicon glyphicon-trash"></span>&nbsp;&nbsp;Delete
                </button>
            );
        }
    }

    renderSocialMedia() {
        if (this.props.isAuthenticated) {
            return <ShareSocialMedia />
        }
    }

    render() {
        const { location, isFetching, poll } = this.props;
        if (Object.getOwnPropertyNames(poll).length === 0) {
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: location }
                }}/>
            );
        }
        if (isFetching) {
            return <Loading />;
        }
        return (
            <div>
                <h3>{poll.title}&nbsp;&nbsp;{this.renderDeletePoll()}</h3>
                <h4>I'd like to vote for</h4>
                {this.renderForm()}
                {this.renderError()}
                {this.renderMessage()}
                {this.renderSocialMedia()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.polling.error,
        message: state.polling.message,
        poll: state.polling.poll,
        isFetching: state.main.isFetching,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default withCookies(connect(mapStateToProps, { fetchSinglePoll, submitVote, deletePoll })(ViewPoll));