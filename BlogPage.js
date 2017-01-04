const { DOM, PropTypes } = React;

const { bind, assign } = _;

const Image = (props) => (
  DOM.img(props)
);

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  style: React.PropTypes.objectOf(React.PropTypes.string)
};

Image.defaultProps = {
  src: 'http://weknowyourdreams.com/images/snow/snow-04.jpg',
  width: '179px',
  height: '101px',
  alt: 'Here is empty',
  style: {
    padding: '5px',
    margin: '5px',
    border: '1px solid red'
  }
};

const TextBox = (props) => (
  DOM.span(null, props.text)
);

TextBox.propTypes = {
  text: PropTypes.string
};

TextBox.defaultProps = {
  text: 'Lost text field '
};

const MetaData = (props) => (
  DOM.div(null,
    React.createElement(TextBox, { text: 'Author: '}),
    `${props.author} | `,
    React.createElement(TextBox, { text: ' Created: '}),
    `${props.createdAt} | `,
    React.createElement(TextBox, { text: ' Updated: '}),
    props.updatedAt
  )
);

MetaData.propTypes = {
  author: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
};

MetaData.defaultProps = {
  author: 'Lost autor',
  createdAt: moment().calendar(),
  updatedAt: moment().calendar()
};

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count };
    this.handleClick = bind(this.handleClick, this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return React.createElement(
      LikeItem,
      { count: this.state.count, handleClick: this.handleClick }
    );
  }
}

Like.propTypes = {
  count: PropTypes.number
};

Like.defaultProps = {
  count: 0
};

const LikeItem = (props) => (
  DOM.div(
    null,
    `Likes: ${props.count} `,
    DOM.button(
      { onClick: props.handleClick },
      ' + '
    )
  )
);

const BlogItem = (props) => (
  DOM.div(
    null,
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.description),
    DOM.div(
      null,
      React.createElement(Like, props.meta)
    ),
    DOM.hr(null),
    React.createElement(MetaData, props.meta),
    DOM.br(null)
  )
);

BlogItem.propTypes = {
  image: PropTypes.object,
  description: React.PropTypes.objectOf(React.PropTypes.string),
  meta: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

BlogItem.defaultProps = {
  image: {
    src: 'http://weknowyourdreams.com/images/snow/snow-04.jpg',
    width: '179px',
    height: '101px',
    alt: 'Here is empty',
    style: {
      padding: '5px',
      margin: '5px',
      border: '1px solid red'
    }
  },
  description: {
    text: 'Nothing else'
  },
  meta: {
    author: 'unknown autor',
    createdAt: moment().calendar(),
    updatedAt: moment().calendar(),
    count: 0
  }
};

const elements = [
  {
    image: {
      src: "http://weknowyourdreams.com/images/snow/snow-01.jpg",
      width: "179px",
      height: "101px",
      style: {
        padding: '5px',
        margin: '5px',
        border: '1px solid black'
      }
    },
    description: { text: 'Winter is comming, first' },
    meta: {
      author: 'Ivan Petrov',
      createdAt: moment().subtract(10, 'weeks').calendar(),
      updatedAt: moment().subtract(8, 'weeks').calendar()
    }
  },
  {
    image: {
      src: "http://weknowyourdreams.com/images/snow/snow-02.jpg",
      width: "179px",
      height: "101px",
      alt: "Winter"
    },
    description: { text: 'Winter is comming, second' },
    meta: {
      author: 'Peter Petrov',
      createdAt: moment().subtract(2, 'weeks').calendar(),
      updatedAt: moment().subtract(2, 'days').calendar(),
      count: 6
    }
  },
  {
    image: {
      src: "http://weknowyourdreams.com/images/snow/snow-03.jpg",
      width: "179px",
      height: "101px",
      alt: "Winter",
      style: {
        padding: '5px',
        margin: '5px',
        border: '1px solid black'
      }
    },
    description: { text: 'Winter is comming, third' },
    meta: {
      author: 'Sidor Petrov',
      createdAt: moment().subtract(2, 'days').calendar(),
      updatedAt: moment().subtract(1, 'days').calendar(),
      count: 32
    }
  }
];

ReactDOM.render(
  DOM.div(
    null,
    _.map(
      elements,
      (element, key) => (
        React.createElement(BlogItem, Object.assign({ key }, element))
      )
    )
  ),
  document.getElementById('app')
);
