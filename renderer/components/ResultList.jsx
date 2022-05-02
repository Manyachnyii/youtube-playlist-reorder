import { Row, Col } from "reactstrap";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export const ResultList = ({
  playlist: { author, title, description, lastUpdated, items },
}) => (
  <div className="my-4">
    <header>
      <div className="d-flex align-items-center">
        <img src={author.bestAvatar.url} alt="avatar" />
        <span className="h1 ms-2">{author.name}</span>
      </div>
      <p>
        <span className="h2">{title} </span>
        <sup>{lastUpdated}</sup>
      </p>
      <sup>{description}</sup>
    </header>
    <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
      {items.map(({ title, id, duration, bestThumbnail }) => (
        <Col key={id}>
          <Card className="h-100">
            <img className="w-100" src={bestThumbnail.url} alt="thumbnail" />
            <CardBody className="d-flex flex-column">
              <CardTitle tag="h5">{title}</CardTitle>
              <CardText className="mt-auto">
                <span className="badge bg-secondary text-wrap">{duration}</span>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);
