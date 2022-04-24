import { useState } from "react";
import { Container } from "reactstrap";

import { FormSearch } from "../components/FormSearch";
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
      <FormSearch handleSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && "Load..."}

      {Error && <p>{Error}</p>}

      {playlist && <ResultList playlist={playlist} />}
    </Container>
  );
}
