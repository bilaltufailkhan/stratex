import React from "react";
import UsersTable from "../components/UsersTable";
import SearchBar from "../components/SearchBar";
import SeniorTable from "../components/SeniorTable";
import WfmTable from "../components/WfmTable";
import CreateUsers from "../components/CreateUsers";

const AdminView = (props) => {
  return (
    <>
      <SearchBar />
      <UsersTable />
      <SeniorTable />
      <WfmTable />
      <CreateUsers />
    </>
  );
};

export default AdminView;
