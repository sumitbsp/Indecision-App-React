'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handleAddOptions = _this.handleAddOptions.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    _this.state = {
      options: props.options
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);

        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (error) {}
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handleAddOptions',
    value: function handleAddOptions(option) {
      if (!option) {
        return 'Enter a valid option';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'Option already exist';
      }
      this.setState(function (prevState) {
        return {
          options: prevState.options.concat(option)
        };
      });
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            if (optionToRemove !== option) {
              return true;
            }
          })
        };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var randomNum = Math.floor(Math.random() * this.state.options.length);
      var option = this.state.options[randomNum];
      alert(option);
    }
  }, {
    key: 'render',
    value: function render() {
      var title = 'Indecision App';
      var subtitle = 'Put your life in the hands of a computer';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, {
          handlePick: this.handlePick,
          hasOptions: this.state.options.length
        }),
        React.createElement(Options, {
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption,
          options: this.state.options
        }),
        React.createElement(AddOptions, { handleAddOptions: this.handleAddOptions })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { disabled: !props.hasOptions, onClick: props.handlePick },
      'What Should I Do?'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleDeleteOptions },
      'Remove All'
    ),
    !props.options.length && React.createElement(
      'p',
      null,
      'Add an option to get started!'
    ),
    props.options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        optionText: option,
        handleDeleteOption: props.handleDeleteOption
      });
    })
  );
};

var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    props.optionText,
    React.createElement(
      'button',
      {
        onClick: function onClick(e) {
          props.handleDeleteOption(props.optionText);
        }
      },
      'Remove'
    )
  );
};

var AddOptions = function (_React$Component2) {
  _inherits(AddOptions, _React$Component2);

  function AddOptions(props) {
    _classCallCheck(this, AddOptions);

    var _this2 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props));

    _this2.handleAddOptions = _this2.handleAddOptions.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOptions, [{
    key: 'handleAddOptions',
    value: function handleAddOptions(e) {
      e.preventDefault();
      var option = e.target.elements.option.value;
      var error = this.props.handleAddOptions(option);

      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        e.target.elements.option.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOptions },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            null,
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, { options: ['Hiii'] }), document.getElementById('app'));
