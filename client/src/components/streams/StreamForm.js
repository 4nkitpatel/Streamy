import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui">
          <div style={{ color: "#9f3a38" }}>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    //   console.log(formProps) // if do not destructure then take this as arg
    // console.log(meta);
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // here dont have take event as arg redux form gives us direct value
    // event.preventDefault() // this interbally get called (by redux form) so we dont have to call
    // console.log(formValues);
    this.props.onSubmit(formValues); // this is a callback to parent components
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

// reduxForm similar to connect() it internally provide lots of props to our this component
export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);
