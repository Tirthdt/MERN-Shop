import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { getUsers, deleteUser } from "../actions/authActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userListInfo = useSelector((state) => state.userList);
  const { error, loading, users } = userListInfo;

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const userDelete = useSelector((state) => state.userDelete);
  const { message } = userDelete;

  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || message) {
      dispatch(getUsers());
    } else {
      history.replace("/");
    }
  }, [dispatch, history, userInfo, message]);

  const deleteHandler = (id) => {
    console.log(id);
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1 className="text-center">Users</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit/`}>
                    <Button variant="success">Edit</Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
