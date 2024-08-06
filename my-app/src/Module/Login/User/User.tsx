import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./User.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserModel } from "../../../Model/UserModel";
import { DataGrid } from "@mui/x-data-grid";
import { addUser, removeUser } from "../../../Store/Reducer/User/userSlice";
import { useNavigate } from "react-router-dom";

const InitialValue: UserModel = {
  branchId: null,
  userName: "",
  firstName: "",
  middleName: "",
  lastName: "",
  position: "",
  password: "",
};

const User: React.FC = () => {
  const [userItem, setUserItem] = useState<UserModel>(InitialValue);
  const userList: UserModel[] = useSelector(
    (state: any) => state.userContext.userList
  );
  const isAuthenticated: Boolean = useSelector(
    (state: any) => state.userContext.isAuthenticated
  );
  const currentUser: UserModel = useSelector(
    (state: any) => state.userContext.currentUser
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const onChangeHandler = (value: string, fieldName: string) => {
    let item: any = { ...userItem };
    item[fieldName] = value;
    setUserItem(item);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addUser(userItem));
  };

  const columns: any = [
    {
      field: "branchId",
      headerName: "Branch Id",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "userName",
      headerName: "User Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "User Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "position",
      headerName: "User Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 120,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <Button
            variant="outlined"
            className={classes.widthBtn}
            sx={{ mt: 2 }}
            onClick={() => RemoveHandler(params.row)}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];
  const RemoveHandler = (item: UserModel) => {
    dispatch(removeUser(item.branchId));
  };

  return (
    <div>
      <div className={classes.flex}>
        <div>
          <Typography className={classes.title}>
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
        </div>
        <div className={classes.alignRight}>
          <>
            <Button
              variant="outlined"
              className={classes.widthBtn}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </>
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.divCol1}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
            }}
            className={classes.boxWidth}
          >
            <TextField
              label="Branch Id"
              value={userItem.branchId}
              onChange={(e) => onChangeHandler(e.target.value, "branchId")}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Username"
              variant="outlined"
              value={userItem.userName}
              onChange={(e) => onChangeHandler(e.target.value, "userName")}
              margin="normal"
              fullWidth
            />
            <TextField
              label="First Name"
              variant="outlined"
              value={userItem.firstName}
              onChange={(e) => onChangeHandler(e.target.value, "firstName")}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Middle Name"
              variant="outlined"
              value={userItem.middleName}
              onChange={(e) => onChangeHandler(e.target.value, "middleName")}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={userItem.lastName}
              onChange={(e) => onChangeHandler(e.target.value, "lastName")}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Position"
              value={userItem.position}
              onChange={(e) => onChangeHandler(e.target.value, "position")}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={userItem.password}
              onChange={(e) => onChangeHandler(e.target.value, "password")}
              margin="normal"
              fullWidth
            />
            <div className={classes.flex}>
              <div className={classes.padR5}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.widthBtn}
                  sx={{ mt: 2 }}
                >
                  Reset
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.widthBtn}
                  sx={{ mt: 2 }}
                >
                  ADD
                </Button>
              </div>
            </div>
          </Box>
        </div>
        <div className={classes.divCol2}>
          <DataGrid
            disableRowSelectionOnClick
            rows={userList}
            columns={columns}
            autoHeight
            getRowHeight={() => "auto"}
            getRowId={(row) => row.branchId || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
