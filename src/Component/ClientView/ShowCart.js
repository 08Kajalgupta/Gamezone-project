import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ServerURL, postData } from "../FetchNodeServices";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Button, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import EditRounded from '@material-ui/icons/EditRounded';
////////////////DRAWER///////////
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

//////////////////////////////////
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
}));
export default function ShowCart(props) {
  const classes = useStyles();

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

  var dispatch = useDispatch();

  /////////////////////DRAWER///////////////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [zipcode, setZipcode] = useState("");

   const handleAddAddress = async () => {
    var body = {
      address1: address1,
      address2: address2,
      state: states,
      city: city,
      zipcode: zipcode,
      mobileno: user.mobileno,
    };
    var result = await postData("userdetail/updateuserdetails", body);
    if (result.result) {
      var body = { mobileno: user.mobileno };
      var res = await postData("userdetail/checkusermobilenumber", body);

      if (res.result) {
        dispatch({
          type: "Add User",
          payload: [res.data.mobileno, res.data],
        });
        setRefresh(!refresh);
      }
    } else {
      alert("Fail to Save Address...");
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Grid container spacing={1} style={{ padding: 10 }}>
        <Grid item xs={12}>
          <h4>hi {user.firstname} {user.lastname}</h4>
          <h5>Add your address..</h5>
        </Grid>
        <Grid item xs={12}>
          <TextField
          value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            fullWidth
            variant="outlined"
            label="Address Line One"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
           value={address2}
            onChange={(event) => setAddress2(event.target.value)}
            fullWidth
            variant="outlined"
            label="Address Line Two"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
           value={states}
            onChange={(event) => setStates(event.target.value)}
            fullWidth
            variant="outlined"
            label="State"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
           value={city}
            onChange={(event) => setCity(event.target.value)}
            fullWidth
            variant="outlined"
            label="City"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
           value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            fullWidth
            variant="outlined"
            label="Zipcode"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAddAddress()}
            color="primary"
          >
            Save Address
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  ////////////////////////////////////////////////////

  const paymentDetails = () => {
    return (
      <div style={{ width: 600 }}>
        <div
          style={{
            padding: 15,
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Delivery Address
          </div>
          <div style={{ fontWeight: 200, marginBottom: 10 }}>
            {user.firstname} {user.lastname}
          </div>
          <div>
            {!user.addressstatus ? (
              <Button
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                  width: 200,
                }}
                variant="contained"
                onClick={toggleDrawer("right", true)}
                color="primary"
              >
                Add Address
              </Button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>{user.addressone}</div>
                <div>{user.addresstwo}</div>
                <div>
                  {user.city},{user.state},{user.zipcode} <span ><EditRounded  onClick={toggleDrawer("right", true)} style={{fontSize:20, marginLeft:10}}/></span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            background: "#FFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 2,
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Payment Details
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,
                textAlign: "left",
                padding: 5,
              }}
            >
              M.R.P
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {actualamt}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,

                padding: 5,
              }}
            >
              Product Discount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {totalsaving}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,
                 padding: 5,
              }}
            >
              Delivery Charges
              
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {0}
            </div>
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                fontWeight: 200,
                marginBottom: 10,

                padding: 5,
              }}
            >
              Total Amount
            </div>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: 10,

                padding: 5,
                textAlign: "right",
                marginLeft: "auto",
              }}
            >
              &#8377; {totalamt}
            </div>
          </div>
          <Divider />
        </div>

        <div style={{ marginTop: 10 }}>
          <Button
            variant="contained"
            onClick={() => props.history.push({ pathname: "/paymentgateway" })}
            olor="primary"
            variant="contained"
            fullWidth
            style={{ background: "#006266", color: "#FFF" }}
           
          >
            Make Payment
          </Button>
        </div>
      </div>
    );
  };

  const showCart = () => {
    return values.map((items) => {
      return (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={`${ServerURL}/images/${items.icon}`}
              style={{ borderRadius: 5 }}
              width="90"
              height="90"
              style={{ paddingRight: 10 }}
            />

            <div
              style={{
                width: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignSelf: "center",
              }}
            >
              <div style={{ fontSize: 10, fontWeight: "bold", padding: 2 }}>
                {items.subcategoryname.length <= 20
                  ? items.subcategoryname.toUpperCase()
                  : items.subcategoryname.toUpperCase().substring(0, 18) + ".."}
              </div>

              <div style={{ fontSize: 10, padding: 2 }}>
                Day Price:<s>&#8377;{items.rentamt}</s>{" "}
                <span>
                  <b>&#8377; {items.offer}</b>
                </span>
              </div>
              <div style={{ fontSize: 10, padding: 2 }}>
                <span style={{ color: "green" }}>
                  <b>You save </b>
                </span>
                <b>&#8377; {items.rentamt - items.offer}</b>
              </div>
              <div style={{ fontSize: 10, padding: 2 }}>
                <b>
                  {items.qtydemand} x{" "}
                  {items.offer > 0 ? (
                    <>
                      <span>&#8377; {items.offer}</span> x{" "}
                      <span>{items.duration} Day(s)</span>
                    </>
                  ) : (
                    <span>&#8377; {items.rate}</span>
                  )}
                </b>
                {/*<span><Delete style={{fontSize:18,marginLeft:28,color:'red'}} 
         onClick={()=>handleDelete(items)}
               /></span>*/}
              </div>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: "bold",
                letterSpacing: 1,
                width: 80,
                padding: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignSelf: "center",
              }}
            >
              {items.offer > 0 ? (
                <div>
                  <span>&#8377;</span>{" "}
                  {items.offer * items.qtydemand * items.duration}
                </div>
              ) : (
                <div>
                  <span>&#8377;</span>{" "}
                  {items.rate * items.qtydemand * items.duration}
                </div>
              )}
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <div style={{ background: "#ecf0f1" }}>
      <Header history={props.history} />
      <div style={{ padding: 25 }}>
        <Grid container spacing={1}>
          <Grid
            items
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <img src="/gamelogo.png" width="40" style={{ padding: 5 }} />
            <span style={{ fontWeight: "bold", fontSize: 20 }}>
              Order Summary ({keys.length})
            </span>
          </Grid>

          <Grid items xs={12} md={6} sm={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#FFF",
                borderRadius: 2,
                padding: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: "bold", width: 300 }}>
                  ({keys.length}) Items
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "right",
                    width: 300,
                  }}
                >
                  &#8377; {totalamt}
                </div>
              </div>

              {showCart()}
            </div>
          </Grid>

          <Grid items xs={12} md={6} sm={6}>
            <div
              style={{
                display: "flex",

                // background: "#FFF",
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {paymentDetails()}
            </div>
          </Grid>
        </Grid>
      </div>
      {/*DRAWER */}
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </div>
  );
}
