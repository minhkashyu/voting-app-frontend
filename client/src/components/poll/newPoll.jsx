import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { required, maxLength100, minLength2, renderField, renderOptions } from './../template/formValidation.jsx';
import { addPoll } from './../../actions/polling';

const form = reduxForm({
    form: 'newPoll',
    //enableReinitialize: true,
    initialValues: { 'options': ['', ''] }
});

class NewPoll extends React.Component {

    render() {
        const { handleSubmit, pristine, reset, submitting, addPoll } = this.props;
        return (
            <div>
                <h3>Create a New Poll</h3>
                <form onSubmit={handleSubmit(addPoll)}>
                    <Field
                    name="title"
                    type="text"
                    label="Title"
                    component={renderField}
                    validate={[required, maxLength100, minLength2]}
                    />
                    <FieldArray name="options" component={renderOptions} />
                    <button type="submit" disabled={submitting} className="btn btn-mt">Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-mt">Clear Values</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.poll.message
    };
}

export default connect(mapStateToProps, { addPoll })(form(NewPoll));