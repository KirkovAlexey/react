const DOM = React.DOM;

const Image = (props) => (
  DOM.img(
    {
      src: props.src,
      width: props.width,
      height: props.height,
      alt: props.alt
    }
  )
);

ReactDOM.render(
  React.createElement(
    Image,
    {
    src: 'http://weknowyourdreams.com/images/snow/snow-01.jpg',
    width: '179px',
    height: '101px',
    alt: 'Winter'
    }
  ),
  document.getElementById('app')
);
