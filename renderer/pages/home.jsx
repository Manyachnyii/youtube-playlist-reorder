import { useState } from "react";
import { Container, Button } from "reactstrap";

import { FormSearch } from "../components/FormSearch";
import { ResultList } from "../components/ResultList";

import { getPlaylist, getPlaylistNext } from "../lib/getPlaylist";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorLoad, setErrorLoad] = useState(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [ErrorLoadMore, setErrorLoadMore] = useState(null);

  const [playlist, setPlaylist] = useState(null);

  const loadPlaylist = async (input, loadAll) => {
    setIsLoading(true);
    setErrorLoadMore(null);
    const res = await getPlaylist(input, loadAll);
    if (res.success) {
      setPlaylist({ ...res.data });
    } else if (res.error) {
      setErrorLoad(res.error);
    }
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    setErrorLoadMore(null);
    const res = await getPlaylistNext(playlist.continuation);
    if (res.success) {
      setPlaylist({
        ...playlist,
        items: [...playlist.items, ...res.data.items],
        continuation: res.data.continuation,
      });
    } else if (res.error) {
      setErrorLoadMore(res.error);
    }
    setIsLoadingMore(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = event.target[0].value;
    const loadAll = event.target[1].checked;
    setErrorLoad(null);
    setPlaylist(null);
    loadPlaylist(input, loadAll);
  };

  return (
    <Container>
      <FormSearch handleSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && "Load..."}

      {ErrorLoad && <p>{ErrorLoad}</p>}

      {playlist && <ResultList playlist={playlist} />}

      {playlist?.continuation && (
        <div className="my-4 d-flex justify-content-center">
          <Button onClick={loadMore} disabled={isLoadingMore}>
            More
          </Button>
          {ErrorLoadMore && <p>{ErrorLoadMore}</p>}
        </div>
      )}
    </Container>
  );
}
