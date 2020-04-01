class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleV = this.toggleV.bind(this);

    this.state = {
      visibility: false
    };
  }

  toggleV() {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Visibility</h1>
        <button onClick={this.toggleV}>
          {this.state.visibility ? 'Show Details' : 'Hide Details'}
        </button>
        {this.state.visibility && <p>Showing some text</p>}
      </div>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById('app'));

// const appRoot = document.getElementById('app');

// let visibility = false;

// const toogle = e => {
//   visibility = !visibility;
//   reactDomRender();
// };

// const reactDomRender = () => {
//   const template = (
//     <div>
//       <h1>Visibility</h1>
//       <button onClick={toogle}>
//         {visibility ? 'Show Details' : 'Hide Details'}
//       </button>
//       {visibility && <p>Showing some text</p>}
//     </div>
//   );

//   ReactDOM.render(template, appRoot);
// };

// reactDomRender();
