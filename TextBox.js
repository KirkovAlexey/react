const DOM = React.DOM;

const TextBox = (props) => (
  DOM.span(
    null,
    props.text
  )
);

ReactDOM.render(
  React.createElement(
    TextBox,
    {
    text: 'Абаракадабра'
    }
  ),
  document.getElementById('app')
);