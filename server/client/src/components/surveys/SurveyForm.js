//SurveyForm shows a Form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFiles() {
    return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type='text' label={label} name={name} />
    })
    // (
    //   <div>
    //     {/* <Field label="Survey Title" type='text' name="title" component={SurveyField}/>
    //     <Field label="Subject Line" type='text' name="subject" component={SurveyField}/>
    //     <Field label="O-survey Body" type='text' name="body" component={SurveyField}/>
    //     <Field label="Recipient List" type='text' name="emails" component={SurveyField}/> */}
    //   </div>
    // )
  }
  //this.props.handleSubmit function is provieded automatically from the redux form helper
  render() {
    return (
      <div>
        
        {/* <form onSubmit={this.props.handleSubmit(values => console.log(values))}>       */}
        {/* <form onSubmit={this.props.handleSubmit( () => this.props.onSurveySubmit())}>      */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>   
          {this.renderFiles()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate (values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');
  
  _.each(formFields, ( { name } ) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  // if(!values.title) {
  //   errors.title = "You must provide a title";
  // }

  // if(!values.subject) {
  //   errors.subject = "You must provide a title";
  // } 
  
  // if(!values.body) {
  //   errors.body = "You must provide a title";
  // }
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

