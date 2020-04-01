class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.state = {
      options: []
    };
  }

  handleDeleteOptions() {
    this.setState(() => {
      return { options: [] };
    });
  }

  handleAddOptions(option) {
    if (!option) {
      return 'Enter a valid option';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exist';
    }

    this.setState(prevState => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  render() {
    const title = 'Indecision App';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length}
        />
        <Options
          handleDeleteOptions={this.handleDeleteOptions}
          options={this.state.options}
        />
        <AddOptions handleAddOptions={this.handleAddOptions} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          disabled={!this.props.hasOptions}
          onClick={this.props.handlePick}
        >
          What Should I Do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        {this.props.options.map(option => {
          return <Option key={option} optionText={option} />;
        })}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <div>{this.props.optionText}</div>;
  }
}

class AddOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOptions(e) {
    e.preventDefault();
    const option = e.target.elements.option.value;
    const error = this.props.handleAddOptions(option);

    this.setState(() => {
      return {
        error
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOptions}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
