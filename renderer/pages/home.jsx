import {
  Container,
  InputGroup,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { useState } from "react";

import ResultList from "../components/ResultList";

import { getVideoInfoList } from "../lib/yt-parse/getVideoInfoList";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(
    "none" || "loading" || "success" || "unsuccess"
  );
  const [videosInfo, setVideosInfo] = useState([]);
  console.log(status);

  const changeUrl = (e) => {
    const { value } = e.target;
    setUrl(value);
  };

  const loadInfo = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const res = await getVideoInfoList(url);

    if (res.success) {
      const { data } = res;
      setVideosInfo(data);
      setStatus("success");
    } else {
      setStatus("unsuccess");
    }
  };

  return (
    <>
      <Container className="h-100">
        <Form className="align-self-center my-3" onSubmit={loadInfo} inline>
          <FormGroup floating>
            <Input
              id="URL"
              name="URL"
              placeholder="URL"
              type="text"
              onChange={changeUrl}
            />
            <Label for="URL">
              URL of channel, user, playlist or playlist ID
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>

        {status === "loading" && "Load..."}

        {status === "unsuccess" && "Wasted"}

        {status === "success" && videosInfo && (
          <ResultList videosInfo={videosInfo} />
        )}
      </Container>
    </>
  );
}
