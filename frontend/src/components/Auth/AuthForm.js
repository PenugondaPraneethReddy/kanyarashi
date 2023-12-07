import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  FormLabel,
  IconButton,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setShowPremiumFeeDialog(false);
  };
  const handleButtonClick = () => {
    handleClose();
    alert(`You are a premium member now`);
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    membership: "regular",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [membership, setMembership] = useState("regular");
  const [showPremiumFeeDialog, setShowPremiumFeeDialog] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMembershipChange = (e) => {
    const selectedMembership = e.target.value;

    if (selectedMembership === "premium") {
      setShowPremiumFeeDialog(true);
    } else {
      setShowPremiumFeeDialog(false);
    }

    setMembership(selectedMembership);
  };

  const handleSubmit = (e) => {
    const selectedMembership = e.target.value;
    inputs.membership = membership;
    e.preventDefault();
    if (selectedMembership === "premium") {
      setShowPremiumFeeDialog(true);
    } else {
      setShowPremiumFeeDialog(false);
    }
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={{ mt: 1, mb: 1 }}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={{ mt: 1, mb: 1 }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />
          {!isAdmin && (
            <>
              <FormLabel sx={{ mt: 1, mb: 1 }}>Username</FormLabel>
              <TextField
                value={inputs.username}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="username"
              />
            </>
          )}
          <FormLabel sx={{ mt: 1, mb: 1 }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={{ mt: 1, mb: 1 }}>
                Choose a Membership Type:
              </FormLabel>
              <select
                id="membership-select"
                value={membership}
                onChange={handleMembershipChange}
              >
                <option value="regular">Regular</option>
                <option value="premium">Premium</option>
              </select>
            </>
          )}
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>

      {/* Premium Fee Dialog */}
      <Dialog
        open={showPremiumFeeDialog}
        onClose={() => setShowPremiumFeeDialog(false)}
      >
        <DialogTitle>{"Premium Membership Fee"}</DialogTitle>
        <DialogContent>
          <Typography>
            
            A $15 fee will be deducted for Premium membership.
            <br></br>
            <Select>
            <MenuItem value="creditCard">Credit Card (xxxx xxxx xxxx xxxx)</MenuItem>
            </Select>
            <br></br>
            <Button sx={{ mt: 3 }} onClick={handleButtonClick}>
                        pay now
                      </Button>
                      
          </Typography>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default AuthForm;