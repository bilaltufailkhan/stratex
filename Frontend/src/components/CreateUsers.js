import React from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { addUserURL, BASE_URL } from "../store/Constants";

const CreateUsers = () => {
  const [modalDelete, setModalDelete] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [role, setRole] = React.useState("");
  const toggleDeleteModal = () => {
    return setModalDelete(!modalDelete);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    return fetch(BASE_URL + addUserURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, role }),
    })
      .then((res) => {
        res.json();
        setModalDelete(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <>
      <Container className="py-5">
        <Button className="btn-primary btn-lg" onClick={toggleDeleteModal}>
          Create New User
        </Button>
        <Modal isOpen={modalDelete} toggle={toggleDeleteModal}>
          <ModalHeader toggle={toggleDeleteModal}>Create New User</ModalHeader>
          <ModalBody>
            <Form method="POST" onSubmit={onFormSubmit}>
              <div class="mb-3">
                <label for="first-name-input">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="first-name-input"
                  placeholder="Mark"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="last-name-input">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="last-name-input"
                  placeholder="Otto"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="role-select">Role</label>
                <select
                  class="form-control"
                  id="role-select"
                  aria-label="Role select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option selected disabled>
                    Select a role
                  </option>
                  <option value="1">User</option>
                  <option value="2">Senior User</option>
                  <option value="3">WFM</option>
                </select>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={onFormSubmit}>
              Save
            </Button>{" "}
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default CreateUsers;
