import { Form, Input, InputGroup, Button } from "reactstrap";

export const FormSearch = ({ handleSubmit, isLoading }) => (
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
);
