import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux";
import { ServerURL } from "../FetchNodeServices";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto",
    },
    table: {
      minWidth: 700,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    margin: {
      marginRight: "80%",
      paddingLeft: "",
    },
    button: {
      margin: theme.spacing.unit,
    },
  
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });
  


function PaymentGateWay(props){
 


    const [refresh, setRefresh] = useState(false);
  
    var userData = useSelector((state) => state.user);
    var cart = useSelector((state) => state.cart);
    var user = Object.values(userData)[0];
    var keys = Object.keys(cart);
    var values = Object.values(cart);
    var totalamt = values.reduce(calculation, 0);
    var totalsaving = values.reduce(calculationsaving, 0);
    var actualamt = values.reduce(actualcalculation, 0);
  
    function actualcalculation(a, b) {
      var price = b.rentamt * b.qtydemand * b.duration;
      return a + price;
    }
  
    function calculation(a, b) {
      var price =
        b.offer > 0
          ? b.offer * b.qtydemand * b.duration
          : b.rentamt * b.qtydemand * b.duration;
      return a + price;
    }
    function calculationsaving(a, b) {
      var price = (b.rentamt - b.offer) * b.qtydemand * b.duration;
      return a + price;
    }
  
    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH",
        amount: totalamt*100, //  = INR 1
        name: "Game Zone",
        description: 'Gurugram,Haryana',
        image:`${ServerURL}/images/gamelogo.png`,
              
        handler: function (response) {
             
            alert(response.razorpay_payment_id);
        },
        prefill: {
          name: user.firstname + " " + user.lastname,
          contact:user.mobileno,
          email: user.emailid,
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "blue",
          hide_topbar: false,
        },
      };
    
    
      const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);
    
      return (
        <>
          <center>
            <Button
              variant="contained"
              color="primary"
              // size="large"
              // className={classes.button}
              onClick={()=>openPayModal()}
            >
              <h3>Proceed to Pay</h3>
            </Button>
          </center>
        </>
      );
    };
    export default withStyles(styles)(PaymentGateWay);

