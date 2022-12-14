import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";
import { Helmet } from "react-helmet-async";









export default function UserList() {



  const dispatch = useDispatch()
  const users = useSelector(state=>state.other.users) 
  
  useEffect(() => {
    getUsers(dispatch)
  },[dispatch])

  const handleDelete = (id) => {
  deleteUser(id,dispatch);
  };


  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img ||
              "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
  <>
     <Helmet>
        <title>ALL USERS</title>
        <meta name="description" content="users"/>
      </Helmet>
      <div className="userList classes.root">
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          getRowId = {row=>row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
  </>
  );
}
