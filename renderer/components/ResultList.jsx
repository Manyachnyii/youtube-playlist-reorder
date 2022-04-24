import Image from "next/image";
import { Row, Col } from "reactstrap";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export const ResultList = ({
  playlist: { author, title, description, lastUpdated, items, ...other },
}) => (
  <>
    <header>
      <div className="d-flex align-items-center">
        <Image
          src={author.bestAvatar.url}
          width={author.bestAvatar.width}
          height={author.bestAvatar.height}
        />
        <span className="h1">{author.name}</span>
      </div>
      <p>
        <span className="h2">{title} </span>
        <sup>{lastUpdated}</sup>
      </p>
      <sup>{description}</sup>
    </header>
    <Row>
      {items.map(({ title, id, duration, bestThumbnail }) => (
        <Col sm={6} md={4} lg={3} xl={2} key={id} className="p-2">
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
  </>
);
