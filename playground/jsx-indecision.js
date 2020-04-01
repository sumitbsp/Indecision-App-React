console.log('appjs running');

const app = {
  title: 'Indecision App',
  subTitle: 'Make your decisions',
  options: []
};

const onFormSubmit = e => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    reactDomRender();
  }
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const removeOptions = () => {
  app.options = [];
  reactDomRender();
};

const reactDomRender = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subTitle && <p>{app.subTitle}</p>}
      <p>{app.options.length ? 'Here are your options' : 'No options'}</p>
      <button disabled={!app.options.length} onClick={onMakeDecision}>
        What Should I Do
      </button>
      <button disabled={!app.options.length} onClick={removeOptions}>
        Remove All Options
      </button>
      <ol>
        {app.options.map(option => {
          return <li key={option}>{option}</li>;
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('app');

reactDomRender();
