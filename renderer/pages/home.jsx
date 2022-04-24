import { useState } from "react";
import { Container, Button, Form, Input, InputGroup } from "reactstrap";

import { ResultList } from "../components/ResultList";

import { getPlaylist } from "../lib/getPlaylist";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(null);

  const [playlist, setPlaylist] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target[0].value;

    setIsLoading(true);
    setError(null);
    setPlaylist(null);

    const res = await getPlaylist(input);
    if (res.success) {
      setPlaylist({ ...res.data });
    } else if (res.error) {
      setError(res.error);
    }

    setIsLoading(false);
  };

  return (
    <Container className="h-100">
      <Form className="align-self-center my-3" onSubmit={handleSubmit} inline>
        <InputGroup>
          <Input
            id="URL"
            name="URL"
            placeholder="URL of channel, user, playlist or playlist ID"
            type="text"
          />
          <Button disabled={isLoading ? true : false}>Submit</Button>
        </InputGroup>
      </Form>

      {isLoading && "Load..."}

      {Error && <p>{Error}</p>}

      {playlist && <ResultList playlist={playlist} />}
    </Container>
  );
}
