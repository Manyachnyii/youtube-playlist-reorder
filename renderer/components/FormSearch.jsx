import { Form, Input, InputGroup, Button } from "reactstrap";

export const FormSearch = ({ handleSubmit, isLoading }) => (
  <Form className="my-3" onSubmit={handleSubmit}>
    <InputGroup>
      <Input
        id="URL"
        name="URL"
        placeholder="URL of channel, user, playlist or playlist ID"
        type="text"
      />
      <Button disabled={isLoading}>Submit</Button>
    </InputGroup>
  </Form>
);
