import { Container, Input, Button, Form, FormGroup, Label } from "reactstrap";
import { useState } from "react";

import { ResultList } from "../components/ResultList";

import { getPlaylist } from "../lib/getPlaylist";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(
    "none" || "loading" || "success" || "unsuccess"
  );
  const [playlist, setPlaylist] = useState({});

  const handleChange = (e) => {
    const { value } = e.target;
    setUrl(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const res = await getPlaylist(url);

    if (res.success) {
      setPlaylist({ ...res.data });
      setStatus("success");
    } else {
      setStatus("unsuccess");
    }
  };

  return (
    <>
      <Container className="h-100">
        <Form className="align-self-center my-3" onSubmit={handleSubmit} inline>
          <FormGroup floating>
            <Input
              id="URL"
              name="URL"
              placeholder="URL"
              type="text"
              onChange={handleChange}
            />
            <Label for="URL">
              URL of channel, user, playlist or playlist ID
            </Label>
          </FormGroup>
          <Button disabled={status === "loading" ? true : false}>Submit</Button>
        </Form>

        {status === "loading" && "Load..."}

        {status === "unsuccess" && "Wasted"}

        {status === "success" && playlist && <ResultList playlist={playlist} />}
      </Container>
    </>
  );
}
