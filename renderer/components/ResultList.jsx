import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";

export const ResultList = ({ playlist }) => {
  const { author, title, description, lastUpdated, items } = playlist;

  const [list, setList] = useState([]);

  useEffect(() => {
    const newItems = items.slice(list.length);
    setList([...list, ...newItems]);
  }, [items]);

  const [drag, setDrag] = useState();
  const [drop, setDrop] = useState();

  const sorting = () => {
    let sliceStart, sliceEnd, slice;
    if (drag > drop) {
      sliceStart = drop;
      sliceEnd = drag;
      slice = list.slice(sliceStart, ++sliceEnd);
      slice.unshift(list[drag]);
      slice.pop();
    } else if (drag < drop) {
      sliceStart = drag;
      sliceEnd = drop;
      slice = list.slice(sliceStart, ++sliceEnd);
      slice.push(list[drag]);
      slice.shift();
    } else return;

    const beforeSlice = list.slice(0, sliceStart);
    const afterSlice = list.slice(sliceEnd);

    const sorted = [...beforeSlice, ...slice, ...afterSlice];
    setList(sorted);
  };

  const reverse = () => {
    const reverted = list.map(list.pop, [...list]);
    setList(reverted);
  };

  const handleDragStart = (index) => {
    setDrag(index);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDrop(index);
  };

  const handleDragEnd = () => sorting();

  return (
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

      <Row className="my-2">
        <Col>
          <Button className="float-end" onClick={reverse}>
            Reverse
          </Button>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
        {list?.map(({ title, id, duration, bestThumbnail }, index) => (
          <Col key={id}>
            <Card
              className="h-100"
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <img
                className="w-100"
                src={bestThumbnail.url}
                alt="thumbnail"
                draggable={false}
              />
              <CardBody className="d-flex flex-column">
                <CardTitle tag="h5">{title}</CardTitle>
                <CardText className="mt-auto">
                  <span className="badge bg-secondary text-wrap">
                    {duration}
                  </span>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
