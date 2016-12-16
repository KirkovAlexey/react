const DOM = React.DOM;

const Image = (props) => (
  DOM.img(props)
);

const TextBox = (props) => (
  DOM.span(null, props.text)
);

const BlogItem = (props) => (
  DOM.div(
    null,
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.desc)
  )
);

ReactDOM.render(
  DOM.div(
    null,
    React.createElement(
      BlogItem,
      {
        image: { src: "http://weknowyourdreams.com/images/snow/snow-01.jpg", width: "179px", height: "101px", alt: "Winter" },
        desc: { text: 'Winter is comming, first' }
      }
    ),
    React.createElement(
      BlogItem,
      {
        image: { src: "http://weknowyourdreams.com/images/snow/snow-02.jpg", width: "179px", height: "101px", alt: "Winter" },
        desc: { text: 'Winter is comming, second' }
      }
    ),
    React.createElement(
      BlogItem,
      {
        image: { src: "http://weknowyourdreams.com/images/snow/snow-03.jpg", width: "179px", height: "101px", alt: "Winter" },
        desc: { text: 'Winter is comming, third' }
      }
    )
  ),  
  document.getElementById('app')
);


