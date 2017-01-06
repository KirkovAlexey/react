const { DOM, PropTypes } = React;

const { bind, assign } = _;

const elements = [
  {
    id: 0,
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
      updatedAt: moment().subtract(8, 'weeks').calendar(),
      count: 3
    }
  },
  {
    id: 1,
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
      count: 7
    }
  },
  {
    id: 2,
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
  updatedAt: PropTypes.string
};

MetaData.defaultProps = {
  author: 'Lost autor',
  createdAt: moment().calendar(),
  updatedAt: moment().calendar()
};

class Like extends React.Component {
  render() {
    const { count, handleLikeClick } = this.props;
    return React.createElement(
      LikeItem, { count, handleLikeClick }
    );
  }
}

Like.propTypes = {
  count: PropTypes.number
};

const LikeItem = (props) => (
  DOM.div(
    null,
    `Likes: ${props.count} `,
    DOM.button(
      { onClick: props.handleLikeClick },
      ' + '
    )
  )
);

const BlogItem = (props) => (
  DOM.div(
    null,
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.description),
    React.createElement(
      Like,
      {
        count: props.meta.count,
        handleLikeClick: props.handleLikeClick
      }
    ),
    DOM.hr(null),
    React.createElement(MetaData, props.meta),
    DOM.br(null)
  )
);

BlogItem.propTypes = {
  image: PropTypes.object,
  description: React.PropTypes.objectOf(React.PropTypes.string),
  meta: React.PropTypes.shape({
    author: React.PropTypes.string,
    createdAt: React.PropTypes.string,
    updatedAt: React.PropTypes.string,
    count: React.PropTypes.number
  })
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



const BlogList = ({ elements, handleLikeClick }) => (
  DOM.div(
    null,
    _.map(
      elements,
      (element, key) => (
        React.createElement(
          BlogItem,
          Object.assign(
            { key: element.id },
            element,
            { handleLikeClick: () => handleLikeClick(element.id) }
          )
        )
      )
    )
  )
);

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elements };
    this.handleLikeClick = bind(this.handleLikeClick, this);
  }

  handleLikeClick(elementId) {
    el = _.find(this.state.elements, (o) => o.id == elementId);
    if(isNaN(el.meta.count)) {
      el.meta.count = BlogItem.defaultProps.meta.count + 1;
    }
    else { el.meta.count += 1; }
    this.setState({ elements: elements });
  }

  render() {
    const { elements, handleLikeClick } = this.state;
    columns = _.map(elements, (e)=> [e.description.text, e.meta.count]);
    return (
      DOM.div(
        null,
        React.createElement(
          BlogList, { elements, handleLikeClick: this.handleLikeClick }
        ),
        React.createElement(
          PieChart, { columns: columns }
        )
      )
    );
  }
}

class PieChart extends React.Component {
  componentDidMount() {
    this.chart = c3.generate({
      bindto: ReactDOM.findDOMNode(this.refs.chart),
      data: {
        type: 'pie',
        columns: this.props.columns
      }
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.load(nextProps);
  }

  render() {
    return (
      DOM.div({ ref: "chart"})
    );
  }
}

ReactDOM.render(
  React.createElement(BlogPage),
  document.getElementById('app')
);
