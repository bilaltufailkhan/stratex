import React from "react";
import axios from "axios";
import { BASE_URL, getUsersURL, deleteUserURL } from "../store/Constants";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const UsersTable = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(async () => {
    const result = await axios(BASE_URL + getUsersURL);
    setUsers(result.data.users);
  }, [users]);

  const fetchAPI = (params) => {
    return fetch(BASE_URL + deleteUserURL + params, {
      method: "DELETE",
    });
  };

  const onClickDelete = (name) => {
    fetchAPI(name)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      <div className="container">
        <h2>Users</h2>
        <table className="table mb-5 align-middle" id="users">
          <thead>
            <tr>
              <th style={{ width: "20%" }} scope="col">
                #
              </th>
              <th style={{ width: "20%" }} scope="col">
                First
              </th>
              <th style={{ width: "20%" }} scope="col">
                Last
              </th>
              <th style={{ width: "20%" }} scope="col">
                Role
              </th>
              <th style={{ width: "20%" }} scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.role.toString().includes(1))
              .map((user) => (
                <tr key={user.firstName}>
                  <th scope="row">{1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>User</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onClickDelete(user.firstName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
