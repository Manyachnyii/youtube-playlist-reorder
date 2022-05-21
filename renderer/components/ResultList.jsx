import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { WatchPlaylist } from "./WatchPlaylist";

import { moveArrayElement } from "../utils/moveArrayElement";

export const ResultList = ({ playlist }) => {
  const { author, title, description, lastUpdated, items, estimatedItemCount } =
    playlist;

  const [list, setList] = useState([]);
  const [drag, setDrag] = useState();
  const [drop, setDrop] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const newItems = items.slice(list.length);
    setList([...list, ...newItems]);
  }, [items]);

  const movement = () => {
    const moved = moveArrayElement(list, drag, drop);
    setList(moved);
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
  const handleDragEnd = () => movement();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <div className="my-4">
      <header className="mb-3">
        <section className="d-flex align-items-center">
          <img src={author.bestAvatar.url} alt="avatar" />
          <span className="h1 ms-2">{author.name}</span>
        </section>
        <section>
          <span className="h2">{title} </span>
          <sup>{lastUpdated}</sup>
          <div>{description}</div>
        </section>
        <section className="text-end text-muted">
          Loaded videos{" "}
          <span className="fs-6 fw-bolder text-black">{items.length}</span> from{" "}
          <span className="fs-6 fw-bolder text-black">
            {estimatedItemCount}
          </span>
        </section>
      </header>

      <Row className="my-3">
        <Col>
          <Button onClick={openModal}>Watch</Button>

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
                <CardTitle tag="h6">{title}</CardTitle>
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

      <div className=" my-3 text-center text-muted">
        Loaded videos <span className="fs-6 fw-bolder">{items.length}</span>{" "}
        from <span className="fs-6 fw-bolder">{estimatedItemCount}</span>
      </div>

      <Modal size="lg" centered isOpen={isOpenModal} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>{title}</ModalHeader>
        <ModalBody>
          <WatchPlaylist playlist={list.map((el) => el.id)} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
