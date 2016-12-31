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

const elements = [
  {
    image: { src: "http://weknowyourdreams.com/images/snow/snow-01.jpg", width: "179px", height: "101px", alt: "Winter" },
    desc: { text: 'Winter is comming, first' }
  },
  {
    image: { src: "http://weknowyourdreams.com/images/snow/snow-02.jpg", width: "179px", height: "101px", alt: "Winter" },
    desc: { text: 'Winter is comming, second' }
  },
  {
    image: { src: "http://weknowyourdreams.com/images/snow/snow-03.jpg", width: "179px", height: "101px", alt: "Winter" },
    desc: { text: 'Winter is comming, third' }
  }
];

const BlogList = ({ elements }) => (
  DOM.div(
    null,
    _.map(
      elements,
      (element, key) => (
        React.createElement(BlogItem, Object.assign({ key }, element))
      )
    )
  )  
);

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elements };
  }

  render() {
    const { elements } = this.state;
    return React.createElement(BlogList, { elements });
  }
}

ReactDOM.render(
  React.createElement(BlogPage),
  document.getElementById('app')
);
