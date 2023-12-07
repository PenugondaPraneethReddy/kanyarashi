  import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { deleteTheater } from "../../api-helpers/api-helpers";
  import { useNavigate } from "react-router-dom";
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const DeleteTheater = () => {
    console.log("inside delete theater");
    const id = useParams().id;
    const [openConfirmDialog, setOpenConfirmDialog] = useState(true);
    const navigate = useNavigate();

    const handleOpenConfirmDialog = () => {
      setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
      setOpenConfirmDialog(false);
      navigate('/theaters');
    };

    const handleConfirmDelete = () => {
      // Perform the deletion operation here
      deleteTheater(id);
      console.log('Item deleted');
    
      handleCloseConfirmDialog();
      navigate('/theaters');
    };
    
    return(
      
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Theater?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
    
  };
  
  export default DeleteTheater;