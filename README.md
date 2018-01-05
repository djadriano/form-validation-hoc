# FORM VALIDATION - REACT HIGH ORDER COMPONENT

High Order Component that help you validate form and your fields easily!
Just use HTML Markup for your form and fields and set some attributes.

# Field Attributes

| Name    | Description                                                                             |
| --------- | ------------------------------------------------------------------------------------------ |
| required  | Use for define that field is required |
| pattern  | Set the regex that will used to validate the value of field. There are some patterns defined in HOC, could you get like a property named "patterns" when you import the hoc |
| data-setclassonchange | Define if the field will be validated in onChange. Accept "0" or "1" |
| data-setclassonblur | Define if the field will be validated in onBlur. Accept "0" or "1" |
| minLength | Define the minimun character that the field needs to be valid |
| maxLength | Define the maximum character that the field needs to be valid |

# How to use
Import the HOC in your JSX File:

```javascript
import { patterns, withForm } from 'javascripts/helpers/form-validation-hoc';
```

# Create your Form Component

```javascript
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
```

# Define the FormComponent as a withForm

```javascript
const FormComponentWithForm = withForm(FormComponent);
```

# Props that you component will receive

| Name    | Description                                                                             |
| --------- | ------------------------------------------------------------------------------------------ |
| isFormValid  | Boolen that indicate if form is valid or not |
| onSubmit  | Method that return a new Promise. If resolve return object with value of all fields, not valid only reject the promise |

# CSS Classes Error
If the attribute data-setclassonchange equals "1" or data-setclassonblur equals "1" is added a class in the field indicating if is valid or not.
The classes are:
* form-hoc-change--valid (if field is valid during the onChange)
* form-hoc-change--invalid (if field is invalid during the onChange)
* form-hoc-blur--valid (if field is valid during the onBlur)
* form-hoc-blur--invalid (if field is invalid during the onBlur)
 
# Next Steps
* Validate group of checkbox or radio buttons
* Dynamic css class names
* Set mask format in fields via data attribute (Example (11) 1111-1111)