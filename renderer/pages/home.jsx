import { useState } from "react";
import { Container, Input, Button, Form, FormGroup, Label } from "reactstrap";

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
    <>
      <Container className="h-100">
        <Form className="align-self-center my-3" onSubmit={handleSubmit} inline>
          <FormGroup floating>
            <Input id="URL" name="URL" placeholder="URL" type="text" />
            <Label for="URL">
              URL of channel, user, playlist or playlist ID
            </Label>
          </FormGroup>
          <Button disabled={isLoading ? true : false}>Submit</Button>
        </Form>

        {isLoading && "Load..."}

        {Error && <p>{Error}</p>}

        {playlist && <ResultList playlist={playlist} />}
      </Container>
    </>
  );
}
