# oxygen-debounce

Cancellable debounce

## Example

```jsx
import React, { Component } from 'react';
import debounce from 'oxygen-debounce';

class CourseCreateForm extends Component {

  state = {
    fired: 0,
    value: null
  };

  handleClick = debounce((event) => {
    // This is fine since we're not using event
    this.setState({ fired: this.state.fired + 1 });
  }, 250);

  handleChangeProperly = event => {
    // Can't use target on a released or nullified event. Take the information you
    // need from the event and debounce that instead
    const { value } = event.target;
    this.setStateFromInput(value);
  };

  setStateFromInput = debounce(value => {
    this.setState({ value });
  }, 250);

  handleChangePoorly = debounce(event => {
    // Can't use target on a released or nullified event. By the time we reach
    // this, event will be fubar
    const { value } = event.target;
    this.setState({ badValue: value });
  })

  componentWillUnmount() {
    // Make sure we don't setState on an unmounted component
    this.handleClick.clear();
    this.setStateFromInput.clear();
    this.handleChangePoorly.clear();
  }

  render() {
    const { value, fired, badValue } = this.state;
    return (
      <div>
        Clicked {fired} times.
        <br />
        <input value={value} onChange={this.handleChangeProperly} /> : {value}
        <br />
        <input value={badValue} onChange={this.handleChangePoorly} /> : {badValue}
        <br />
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

## License

Released under The MIT License.