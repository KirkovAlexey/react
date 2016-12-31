const DOM = React.DOM;

const Image = (props) => (
  DOM.img(props)
);

const TextBox = (props) => (
  DOM.span(null, props.text)
);

const MetaData = (props) => (
  DOM.div(null,
    React.createElement(TextBox, { text: 'Author: '}),
    props.author,
    React.createElement(TextBox, { text: ' Created: '}),
    props.createdAt,
    React.createElement(TextBox, { text: ' Updated: '}),
    props.updatedAt
  )
);

const BlogItem = (props) => (
  DOM.div(
    null,
    React.createElement(Image, props.image),
    React.createElement(TextBox, props.description),
    DOM.hr(null),
    React.createElement(MetaData, props.meta),
    DOM.br(null)
  )
);

ReactDOM.render(
  DOM.div(
    null,
    React.createElement(
      BlogItem,
      {
        image: { src: "http://weknowyourdreams.com/images/snow/snow-01.jpg", width: "179px", height: "101px", alt: "Winter" },
        description: { text: 'Winter is comming, first' },
        meta: {
          author: 'Ivan Petrov',
          createdAt: moment().subtract(10, 'weeks').calendar(),
          updatedAt: moment().subtract(8, 'weeks').calendar()
        }
      }
    ),
    React.createElement(
      BlogItem,
      {
        image: { src: "http://weknowyourdreams.com/images/snow/snow-02.jpg", width: "179px", height: "101px", alt: "Winter" },
        description: { text: 'Winter is comming, second' },
        meta: {
          author: 'Petr Petrov',
          createdAt: moment().subtract(2, 'weeks').calendar(),
          updatedAt: moment().subtract(2, 'days').calendar()
        }
      }
    ),
    React.createElement(
      BlogItem,
      {
        image: { src: "http://weknowyourdreams.com/images/snow/snow-03.jpg", width: "179px", height: "101px", alt: "Winter" },
        description: { text: 'Winter is comming, third' },
        meta: {
          author: 'Sidor Petrov',
          createdAt: moment().subtract(2, 'days').calendar(),
          updatedAt: moment().subtract(1, 'days').calendar()
        }
      }
    )
  ),
  document.getElementById('app')
);
