import axios from "axios";
import React from "react";
import { Container, Form, Table } from "reactstrap";
import { BASE_URL, getUsersURL } from "../store/Constants";

const SearchBar = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [users, setUsers] = React.useState([]);

  React.useEffect(async () => {
    const result = await axios(BASE_URL + getUsersURL);
    setUsers(result.data.users);
  }, [users]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid w-50">
          <label htmlFor="search-user" className="col-sm-2 col-form-label">
            Search for employee:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="search-user"
              placeholder="Enter a name"
              onChange={handleChange}
            />
          </div>
        </div>
      </nav>
      <Container>
        <Table>
          <tbody>
            {searchValue !== ""
              ? users
                  .filter((user) =>
                    user.firstName
                      .toString()
                      .toLowerCase()
                      .includes(searchValue)
                  )
                  .map((user) => (
                    <tr key={user.firstName}>
                      <th scope="row">{1}</th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>
                        {user.role == 1
                          ? "User"
                          : user.role == 2
                          ? "Senior User"
                          : "WFM Professional"}
                      </td>
                    </tr>
                  ))
              : ""}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default SearchBar;
