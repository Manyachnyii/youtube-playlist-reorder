import { Container, InputGroup, Input, Button } from "reactstrap";
import { useState } from "react";

import ResultList from "../components/ResultList"

import { getVideoInfoList } from "../lib/yt-parse/getVideoInfoList";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loadList, setLoadList] = useState(false);
  const [videosInfo, setVideosInfo] = useState([]);

  const changeUrl = (e) => {
    const { value } = e.target;
    setUrl(value);
  };

  const loadInfo = async () => {
    const res = await getVideoInfoList(url);

    if (res.success) {
      const { data } = res;
      setVideosInfo(data);
      setLoadList(true);
    }
  };

  return (
    <>
      <Container className="h-100">
        <InputGroup className="align-self-center my-2">
          <Input
            placeholder="ссылка на youtube канал"
            bsSize="lg"
            type="url"
            onChange={changeUrl}
          />
          <Button onClick={loadInfo}>Жмяк!</Button>
        </InputGroup>

        {loadList && <ResultList videosInfo={videosInfo} />}
      </Container>
    </>
  );
}

