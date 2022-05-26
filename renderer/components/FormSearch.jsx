import {
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Spinner,
} from "reactstrap";

export const FormSearch = ({ handleSubmit, isLoading }) => (
  <Form className="my-3" onSubmit={handleSubmit}>
    <InputGroup>
      <Input
        id="exampleSearch"
        name="search"
        placeholder="URL of channel, user, playlist or playlist ID"
        type="search"
      />

      <InputGroupText>
        Load all
        <Input className="m-1" aria-label="checkbox" type="checkbox" />
      </InputGroupText>

      <Button disabled={isLoading}>
        {!isLoading ? "Submit" : <Spinner size="sm">Loading...</Spinner>}
      </Button>
    </InputGroup>
  </Form>
);
