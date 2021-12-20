import React, { useState, Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import ReactDOM from "react-dom";
import OtpInput from 'react-otp-input';
import Countdown from "react-countdown";
import { FormatSize } from '@material-ui/icons';
import {postData} from "../FetchNodeServices"
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import "./styles.css"
import Header from "./Header"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton"
import {useDispatch} from 'react-redux'
var otpGenerator = require('otp-generator')


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    otpfield: {
        width: "38px",
        marginRight: '10px',
        paddingLeft: ' 12px',
        height: '40px'
    }

}));

export default function MobileRegistration(props) {
    const classes = useStyles();
    const [state, setState] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [showbox, setshowbox] = useState(false)
    const [getOtpInput, setOtpInput] = useState("");
    const[otp,setOtp]=useState(" ");
    const[getuserData, setUserData]=useState([])
    var dispatch = useDispatch()
    //const handleChange = (otp) => this.setState({ otp });
   const handleShowCart=()=>{
  if(otp==getOtpInput)
  {
dispatch({type:'ADD_USER',payload:[getuserData.mobileno,getuserData]})
props.history.push({'pathname':"/showcart"})
  }
   }
   

    const showOtp = () => {
        const Completionist = () => <span style={{ color: 'red', }}>Resend OTP</span>;
        //var state = { otp: '' };

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',width:300 }}>
                <OtpInput
                    //value={this.state.otp}
                    //onChange={()=>handleChange()}
                    inputStyle="inputStyle"  
                    value={getOtpInput}
                    onChange={(value) => setOtpInput(value)}
                    numInputs={4}
                    separator={<span >-</span>}
                />
                <div style={{flexDirection:'column',margin:5}}>
                    <div>
                    waiting for otp
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Countdown date={Date.now() + 20000}>
                        <Completionist />
                    </Countdown>
                    </div>
                </div>
                <div style={{margin:10}}><Button
        variant="contained"
        color={'#000'}
        style={{background:"#1e6b7b", color:"#fff", width:350}}
        fullWidth
        onClick={()=>handleShowCart()}
        startIcon={<VerifiedUserIcon />}
      >
        Verify
      </Button></div>
            </div>

        )

    }

   const handleOtpClick=async()=>{
       var body={mobileno:mobileNumber}
       var result= await postData("userdetail/checkusermobilenumber",body)
        alert(JSON.stringify(result))
       if(result.result)
       {
    setUserData(result.data)
    var otp=otpGenerator.generate(4, {digits:true,alphabets:false,specialChars:false,upperCase:false});
    alert(otp)
    var res=await postData('smsapi/sendotp',{otp:otp,mobileno:mobileNumber})
   
    setOtp(otp)
    setshowbox(!showbox)
       }
       else
       {
           props.history.push({'pathname':'/signupform'},{mobileno:mobileNumber})
       }
   }


    const otpButton = () => {
        return (
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
               <IconButton  onClick={() =>handleOtpClick() }  style={{background:"#f53b57",zIndex:1 , marginTop:30,marginBottom:30}}>
                     <KeyboardArrowRightIcon size="large" style={{color:"#fff",fontSize:40}} />
             
           </IconButton> 
                
            </div>
        )

    }


    return (
    <div>
        <Header history={props.history}/>              
 
 <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>

                    <img src='/gamelogo.png' style={{ width: 60, margin: 25 }} />

                    <Typography component="h1" variant="h5">
                        
                        Sign in
                    </Typography>
                    <div style={{ display: 'flex', margin: 10 }}>Sign in to access your Orders, Offers, Wishlist.</div>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                             Width={200}
                            id="mobilenumber"
                            onChange={(event)=>setMobileNumber(event.target.value)}
                            label="Enter Your Mobiile Number"
                            name="mobilenumber"
                            autoComplete="mobilenumber"
                            autoFocus
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+91 | </InputAdornment>,
                            }}
                        />

                        <div>{otpButton()}</div>
                        {showbox ? showOtp() : <></>}

                        

                    </form>
                </div>
            </Grid>
        </Grid>
 </div>
    );
}