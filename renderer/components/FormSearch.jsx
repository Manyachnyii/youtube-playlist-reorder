import { Form, Input, InputGroup, InputGroupText, Button } from "reactstrap";

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

      <Button disabled={isLoading}>Submit</Button>
    </InputGroup>
  </Form>
);
