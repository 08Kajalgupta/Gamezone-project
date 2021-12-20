
import CategoryInterface from "./Component/CategoryInterface";
import SubCategory from "./Component/SubCategory";
import DisplayAllCategory from "./Component/DisplayAllCategories";
import Displayallsubcategory from "./Component/DisplayAllSubCategories";
import AdminLogin from "./Component/AdminLogin";
import AdminDashBoard from "./Component/AdminDashBoard";
import Games from "./Component/Games";
import Accessories from "./Component/Accessories"
import DisplayGames from "./Component/DisplayGames"
import DisplayAccessories from "./Component/DisplayAccessories";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./Component/ClientView/Header"
import Home from "./Component/ClientView/Home"
import Footer from "./Component/ClientView/Footer";
import QtySpinner from "./Component/ClientView/QtySpinner";
import ConsoleList from "./Component/ClientView/ConsoleList";
import ProductView from "./Component/ClientView/ProductView";
import SubConsolePicture from "./Component/SubConsolePicture";
import DisplayAllSubConsolePicture from "./Component/DisplayAllSubConsolePicture";
import GamesPicture from "./Component/GamesPicture";
import DisplayAllGamesPicture from "./Component/DisplayAllGamesPicture";
import AccessoryPicture from "./Component/AccessoryPicture";
import DisplayAllAccessoryPicture from "./Component/DisplayAllAccessoryPicture";
import Termsandcondition from "./Component/Termsandcondition";
import Displayterms from "./Component/Displayterms";
import Documents from "./Component/Documents";
import Displaydocuments from "./Component/Displaydocuments";
import MobileRegistration from "./Component/ClientView/MobileRegistration";
import SignUpForm from "./Component/ClientView/SignUpForm";
import ShowCart from "./Component/ClientView/ShowCart";
import PaymentGateWay from "./Component/ClientView/PaymentGateWay";
import ConsoleProductView from "./Component/ClientView/ConsoleProductView";
import GameProductView from "./Component/ClientView/GameProductView";

function App(props) {
  return (
    <div>
      <Router>
        <Route
        strict
        exact
        component={CategoryInterface}
        path="/categoryinterface"
        history={props.history}
        ></Route>
        
        <Route
        strict
        exact
        component={DisplayAllCategory}
        path="/displayallcategory"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={SubCategory}
        path="/subcategory"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={Displayallsubcategory}
        path="/displayallsubcategory"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={Games}
        path="/games"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={DisplayGames}
        path="/displaygames"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={Accessories}
        path="/accessories"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={DisplayAccessories}
        path="/displayaccessories"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={AdminLogin}
        path="/adminlogin"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={AdminDashBoard}
        path="/admindashboard"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={Header}
        path="/header"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={Home}
        path="/home"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={Footer}
        path="/footer"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={QtySpinner}
        path="/qtyspinner"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={ConsoleList}
        path="/consolelist"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={ProductView}
        path="/productview"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={SubConsolePicture}
        path="/subconsolepicture"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={DisplayAllSubConsolePicture}
        path="/displayallsubconsolepicture"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={GamesPicture}
        path="/gamespicture"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={DisplayAllGamesPicture}
        path="/displayallgamespicture"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={AccessoryPicture}
        path="/accessorypicture"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={DisplayAllAccessoryPicture}
        path="/displayallaccessorypicture"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={Termsandcondition}
        path="/termsandcondition"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={Displayterms}
        path="/displayterms"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={Documents}
        path="/documents"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={Displaydocuments}
        path="/displaydocuments"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={MobileRegistration}
        path="/mobileregistration"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={SignUpForm}
        path="/signupform"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={ShowCart}
        path="/showcart"
        history={props.history}
        ></Route>

       <Route
        strict
        exact
        component={PaymentGateWay}
        path="/paymentgateway"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={ConsoleProductView}
        path="/consoleproductview"
        history={props.history}
        ></Route>

        <Route
        strict
        exact
        component={GameProductView}
        path="/gameproductview"
        history={props.history}
        ></Route>

      </Router>
     
    </div>
   
    
  );
 
}

export default App;
