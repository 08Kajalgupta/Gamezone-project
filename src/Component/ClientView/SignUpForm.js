import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ReactDOM from "react-dom";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { FormatSize } from "@material-ui/icons";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { postData, postDate } from "../FetchNodeServices";
import swal from "sweetalert";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";
var otpGenerator = require("otp-generator");

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(0.1, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  otpfield: {
    width: "38px",
    marginRight: "10px",
    paddingLeft: " 12px",
    height: "40px",
  },
}));

export default function MobileRegistration(props) {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState(
    props.history.location.state.mobileno
  );
  const [otp, setOtp] = useState("");
  const [getOtpInput, setOtpInput] = useState("");

  const [showbox, setshowbox] = useState(false);
  //const handleChange = (otp) => this.setState({ otp });

  const otpGeneratorFn = () => {
    var otp = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });
    alert(otp);
    setOtp(otp);
  };
  const handleSubmit = async () => {
    alert(otp + "," + getOtpInput);
    if (otp == getOtpInput) {
      var body = {
        emailid: emailId,
        mobileno: mobileNumber,
        firstname: firstName,
        lastname: lastName,
        password: password,
      };
      var result = await postData("userdetail/insertuserdetails", body);
      if (result.result) {
      } else {
        swal({
          title: "Registration Fail",
          icon: "success",
          dangerMode: true,
        });
      }
    } else {
      alert("Invalid Otp....");
    }
  };
  useEffect(function () {
    otpGeneratorFn();
  }, []);

  const showOtp = () => {
    const Completionist = () => <span style={{ color: "red" }}>Resend OTP</span>;
    //var state = { otp: '' };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <h4>{`Otp sent on mobile +91${mobileNumber}`}</h4>
        <OtpInput
          value={getOtpInput}
          onChange={(value) => setOtpInput(value)}
          inputStyle="inputStyle"
          numInputs={4}
          separator={<span>-</span>}
        />
        <div style={{ flexDirection: "column", margin: 5 }}>
          <div>waiting for otp</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Countdown date={Date.now() + 20000}>
              <Completionist />
            </Countdown>
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            color={"#000"}
            //className={classes.button}
            startIcon={<VerifiedUserIcon />}
            onClick={() => handleSubmit()}
          >
            Verify
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header history={props.history} />
      <div style={{ padding: 20 }}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <img
                src="/gamelogo.png"
                style={{ width: 60, margin: 25 }}
              />

              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Typography component="h4">Please enter your details</Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      onChange={(event) => setFirstName(event.target.value)}
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      onChange={(event) => setLastName(event.target.value)}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      onChange={(event) => setEmailId(event.target.value)}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      value={mobileNumber}
                      onChange={(event) => setMobileNumber(event.target.value)}
                      required
                      fullWidth
                      id="mobilenumber"
                      label="Enter Your Mobiile Number"
                      name="mobilenumber"
                      autoComplete="mobilenumber"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            +91 |{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={(event) => setPassword(event.target.value)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="rpassword"
                      label="Re Enter Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                {showOtp()}
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
