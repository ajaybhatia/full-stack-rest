import { useFormik } from "formik";
import { FormEvent, useState } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  useContacts,
  useCreateContact,
  useDeleteContact,
  useUpdateContact,
} from "./api/endpoints/addressBook";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Home() {
  const queryClient = useQueryClient();

  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  const { data } = useContacts();

  const { handleSubmit, handleChange, values, setValues, resetForm } =
    useFormik({
      initialValues: {
        id: "",
        name: "",
        phone: "",
      },
      onSubmit: async ({ id, name, phone }) => {
        if (id) {
          updateContact.mutate(
            {
              id,
              data: {
                name,
                phone,
              },
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("/api/v1/contact/all");
                resetForm();
              },
            }
          );
        } else {
          createContact.mutate(
            {
              data: {
                name,
                phone,
              },
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("/api/v1/contact/all");
                resetForm();
              },
            }
          );
        }
      },
    });

  const onDelete = async (id: string) => {
    deleteContact.mutate(
      { id },
      {
        onSuccess: () => queryClient.invalidateQueries("/api/v1/contact/all"),
      }
    );
  };

  return (
    <Container style={{ width: "30%" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            required
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            required
            type="text"
            name="phone"
            id="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color={values.id ? "primary" : "success"} block>
          {values.id ? "Update" : "Save"}
        </Button>
      </Form>

      <hr />

      <div className="mt-4">
        {data?.map((contact) => (
          <ListGroup key={contact._id} className="mb-3">
            <ListGroupItem
              color="primary"
              className="fw-bold d-flex justify-content-between"
            >
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setValues({ id: contact._id, ...contact })}
              >
                {contact.name}
              </span>
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={() => onDelete(contact._id)}
              >
                X
              </span>
            </ListGroupItem>
            <ListGroupItem>{contact.phone}</ListGroupItem>
          </ListGroup>
        ))}
      </div>
    </Container>
  );
}

export default App;
