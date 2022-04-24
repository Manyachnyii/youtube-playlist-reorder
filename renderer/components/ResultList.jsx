import Image from "next/image";
import { Row, Col } from "reactstrap";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export const ResultList = ({
  playlist: { author, title, description, lastUpdated, items },
}) => (
  <div className="my-4">
    <header>
      <div className="d-flex align-items-center">
        <Image
          src={author.bestAvatar.url}
          width={author.bestAvatar.width}
          height={author.bestAvatar.height}
          layout="responsive"
        />
        <span className="h1">{author.name}</span>
      </div>
      <p>
        <span className="h2">{title} </span>
        <sup>{lastUpdated}</sup>
      </p>
      <sup>{description}</sup>
    </header>
    <Row sm={2} md={3} lg={4} xl={6} className="g-4">
      {items.map(({ title, id, duration, bestThumbnail }) => (
        <Col key={id}>
          <Card className="h-100">
            <Image
              src={bestThumbnail.url}
              width={bestThumbnail.width}
              height={bestThumbnail.height}
            />
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
