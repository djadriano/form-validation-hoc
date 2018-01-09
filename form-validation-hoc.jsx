import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// -------------------------------------------------------------------------
//  Define the High Order Component
// -------------------------------------------------------------------------

export const withForm = WrappedComponent => {
  return class FormValidationHoc extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isFormValid: false
      };
    }

    // -------------------------------------------------------------------------

    componentDidMount() {
      this.getFieldsToValidate();
    }

    // -------------------------------------------------------------------------

    getRequiredFields() {
      const formEl = ReactDOM.findDOMNode(this);
      let formFieldsRequired = formEl.querySelectorAll('[required]');
      return [ ...formFieldsRequired ];
    }

    // -------------------------------------------------------------------------

    getFieldsToValidate() {
      let formFields = this.getRequiredFields();

      if (formFields.length) {
        formFields.map((item, i) => {
          if (item.type === 'checkbox' || item.type === 'radio') {
            item.addEventListener('change', this.checkFieldValidity.bind(this));
          } else {
            // listener when change the field
            if (
              item.getAttribute('data-setclassonchange') &&
              item.getAttribute('data-setclassonchange') === '1'
            ) {
              item.addEventListener(
                'input',
                this.checkFieldValidity.bind(this)
              );
            }

            // listener when blur the field
            if (
              item.getAttribute('data-setclassonblur') &&
              item.getAttribute('data-setclassonblur') === '1'
            ) {
              item.addEventListener('blur', this.checkFieldValidity.bind(this));
            }
          }
        });
      }
    }

    // -------------------------------------------------------------------------

    setFieldValid(event) {
      event.preventDefault();
      let fieldChanged = event.target;

      fieldChanged.classList.add('form-hoc-change--valid');
      fieldChanged.classList.remove('form-hoc-change--invalid');
    }

    // -------------------------------------------------------------------------

    setFieldInvalid(event) {
      event.preventDefault();
      let fieldChanged = event.target;

      fieldChanged.classList.add('form-hoc-change--invalid');
      fieldChanged.classList.remove('form-hoc-change--valid');
    }

    // -------------------------------------------------------------------------

    checkFieldValidity(event) {
      event.target.validity.valid
        ? this.setFieldValid(event)
        : this.setFieldInvalid(event);

      this.setFormIsValid();
    }

    // -------------------------------------------------------------------------

    setFormIsValid() {
      let formEl = ReactDOM.findDOMNode(this);
      this.setState(...this.state, { isFormValid: formEl.checkValidity() });
    }

    // -------------------------------------------------------------------------

    onSubmit() {
      let formEl = ReactDOM.findDOMNode(this);
      let formFields = formEl.querySelectorAll(
        'input, select[selected], radio[checked], checkbox[checked], textarea'
      );
      formFields = [ ...formFields ];

      return new Promise((resolve, reject) => {
        if (formEl.checkValidity()) {
          let fieldsValue = {};

          formFields.map((item, i) => {
            fieldsValue[item.name] = item.value;
          });

          resolve(fieldsValue);
        } else {
          reject();
        }
      });
    }

    // -------------------------------------------------------------------------

    render() {
      const newProps = {
        isFormValid: this.state.isFormValid,
        onSubmit: this.onSubmit.bind(this)
      };

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
};

export const patterns = {
  string: '[a-z]{1,15}',
  email:
    '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})',
  cep: '[0-9]{5}-[0-9]{3}',
  cpf: '[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}',
  number: '[+-]?(?=.)(?:d+,)*d*(?:.d+)?$',
  phone: '(([0-9]{2}))s([9]{1})?([0-9]{4})-([0-9]{4})'
};
