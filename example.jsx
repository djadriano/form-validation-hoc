import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { patterns, withForm } from 'javascripts/helpers/form-validation-hoc';

class FormComponent extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.object
  };

  submitForm(event) {
    event.preventDefault();

    this.props
      .onSubmit()
      .then(data => {
        console.log(data);
      })
      .catch(() => {});
  }

  render() {
    return (
      <form className="basic-form" onSubmit={this.submitForm.bind(this)}>
        <fieldset>
          <label>Test:</label>
          <input
            name="test"
            type="email"
            data-setclassonchange="1"
            data-setclassonblur="1"
            required
            minLength={8}
            pattern={patterns.email}
          />
          <label>String:</label>
          <input
            name="foo"
            type="text"
            data-setclassonchange="1"
            data-setclassonblur="1"
            required
            minLength={4}
            pattern={patterns.string}
            data-mask=""
          />
          <label>Radio:</label>
          <input name="optin" type="checkbox" required value="1" />
          <p>
            <button type="submit">Send Form</button>
          </p>
        </fieldset>
      </form>
    );
  }
}

const FormComponentWithForm = withForm(FormComponent);

class Home extends Component {
  static propTypes = {
    state: PropTypes.string
  };

  render() {
    return (
      <div>
        <FormComponentWithForm />
      </div>
    );
  }
}

export default Home;
