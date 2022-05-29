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
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Badge,
} from "reactstrap";

import { WatchPlaylist } from "./WatchPlaylist";

import { moveArrayElement } from "../utils/moveArrayElement";
import { createPlaylistFile } from "../utils/createPlaylistFile";

export const ResultList = ({ playlist }) => {
  const { author, title, description, lastUpdated, items, estimatedItemCount } =
    playlist;

  const [list, setList] = useState([]);
  const [videos, setVideos] = useState([]);
  const [drag, setDrag] = useState();
  const [drop, setDrop] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [playlistFile, setPlaylistFile] = useState();
  const [playlistFileDownloadUrl, setPlaylistFileDownloadUrl] = useState();

  useEffect(() => {
    const newItems = items.slice(list.length);
    setList([...list, ...newItems]);
  }, [items]);

  useEffect(() => {
    const arrayVideosId = list.map((el) => el.id);
    setVideos(arrayVideosId);
    return () => {
      URL.revokeObjectURL(playlistFileDownloadUrl);
      setPlaylistFileDownloadUrl();
    };
  }, [list]);

  const movement = () => {
    const moved = moveArrayElement(list, drag, drop);
    setList(moved);
  };

  const reverse = () => {
    const reverted = list.map(list.pop, [...list]);
    setList(reverted);
  };

  const savePlaylist = () => {
    const file = createPlaylistFile(list, author.name, title);
    setPlaylistFile(file);
    const objectURL = URL.createObjectURL(file);
    setPlaylistFileDownloadUrl(objectURL);
  };

  const handleDragStart = (index) => {
    setDrag(index);
  };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index > drag) {
      e.currentTarget.classList.add("drop-left");
    } else {
      e.currentTarget.classList.add("drop-right");
    }
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drop-left");
    e.currentTarget.classList.remove("drop-right");
  };
  const handleDrop = (e, index) => {
    e.preventDefault();
    setDrop(index);
    e.currentTarget.classList.remove("drop-left");
    e.currentTarget.classList.remove("drop-right");
  };
  const handleDragEnd = () => {
    movement();
    setDrag();
    setDrop();
  };

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
          <Button onClick={openModal}>Watch</Button>{" "}
          <Button id="PopoverLegacy" type="button" onClick={savePlaylist}>
            Save
          </Button>{" "}
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
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
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
          <WatchPlaylist playlist={videos} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <UncontrolledPopover
        placement="bottom"
        target="PopoverLegacy"
        trigger="legacy"
      >
        <PopoverHeader>Save playlist to play in VLC</PopoverHeader>
        <PopoverBody>
          {!playlistFile || !playlistFileDownloadUrl ? null : (
            <a href={playlistFileDownloadUrl} download={playlistFile.name}>
              <Badge color="primary" pill>
                m3u8
              </Badge>
            </a>
          )}
        </PopoverBody>
      </UncontrolledPopover>

      <style jsx global>{`
        .drop-left {
          transition: 0.2s;
          box-shadow: 10px 5px 5px red;
        }
        .drop-right {
          transition: 0.2s;
          box-shadow: -10px 5px 5px red;
        }
      `}</style>
    </div>
  );
};
