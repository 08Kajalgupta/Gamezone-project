import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getData, ServerURL } from "../FetchNodeServices";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import {LocalShipping,SportsEsports,VideogameAsset,} from "@material-ui/icons";


const Box = styled.div`
  padding: 30px 30px;
  background: #1e6b7b;
  ; 
  position: absolute;
  width: 95.5%;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
`;


const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 40px;
  color: #fff;
`;


const ColumnCat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 40px;
  color: #fff;
  width: 210px;
`;


const Column2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 40px;
  text-align: center;
  color: #fff;
  width: 400px;
`;


const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 80px;
`;


const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;


const FooterData = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 14px;
  text-decoration: none;
`;


const Heading = styled.p`
  font-size: 14px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
`;


const useStyles = makeStyles((theme) => ({


divider: {
    background: "#fff",
  },

 
dividerBottom: {
    background: "#fff",
    marginTop: "40px",
  },

}));



const Footer = (props) => {
const classes = useStyles();

const [listCategory, setListCategory] = useState([]);


const fetchAllCategory = async () => {
  let list = await getData("categories/displayall");
  setListCategory(list);
  };

  const handleShowSubConsole = (categoryid) => {
    props.history.push({'pathname':'/consolelist'},{categoryid});
  };

  const handleShowHome=()=>{
    props.history.push({pathname:'/home'})
  }


  const showCategory = () => {
  return listCategory.map((item) => {
  return <FooterLink onClick={()=>handleShowSubConsole(item.categoryid)}>{item.categoryname}</FooterLink>;
  });
  
  };

  
useEffect(function () {
fetchAllCategory();
  }, []);

 

return (
    <Box>
      <Container>
        <Row>
          <ColumnCat>
      

      <Heading>MOST POPULAR CATEGORIES</Heading>
         {showCategory()}
            
         <div
 style={{
marginTop: "145px",
 display: "flex",
 alignItems: "center",
 justifyContent: "left",
 textAlign: "left",
  }}
>
 
             
          <VideogameAsset fontSize={"large"} style={{marginRight:8}}  />
              2500+ GAMES
            </div>
          </ColumnCat>

          <Column>
            

         <Heading>CUSTOMER SERVICES</Heading>
         <FooterLink href="#">Terms & Condition</FooterLink>
         <FooterLink href="#">FAQ</FooterLink>
         <FooterLink href="#">Contact Us</FooterLink>

          
 
           <div
 style={{
marginTop: "110px",
 display: "flex",
 alignItems: "center",
 justifyContent: "left",
 textAlign: "left",
 width:175
 }}
>
             
           <LocalShipping fontSize={"large"} style={{marginRight:8}} />
           FREE SHIPPING
</div>
   
       
           </Column>

        <ColumnCat>
            
           <Heading>Visit</Heading>
           <FooterLink onClick={()=>handleShowHome()}>Home</FooterLink>
           <FooterLink href="#">Blog</FooterLink>
           <FooterLink href="#">Offers</FooterLink>

  
          
           <div
 style={{
marginTop: "110px",
 display: "flex", alignItems: "center",
 justifyContent: "left", textAlign: "left",
 alignItems: "center",
 }}
>
             
           <SportsEsports fontSize={"large"} style={{marginRight:8}} />
            GENUINE PRODUCTS
</div>
     
    
            </ColumnCat>

          <Column2>
            
            <Divider
 orientation={"vertical"}
 classes={{ root: classes.divider }}
 />
            

            <Column>
        
            <div style={{ marginTop: "10px" }}>
            <Heading>Contact Us</Heading>
            <FooterData>Call Us : xxxxxxxxxx</FooterData>
 </div>
          
    
            <div style={{ marginTop: "10px" }}> 
            <FooterData>Email : xxxxxx@gmail.com</FooterData>
            </div>
      
        
            <div style={{ marginTop: "30px", display: "flex" }}>
   
            <FooterData>
             GameZone is your destination for new and used video games.
               Rent video games online for your favorite systems including
               PS4, Xbox One, Switch, PS3, Xbox 360, Wii U, 3DS, and more.
            </FooterData>
              
            </div>
  
           
            <div style={{ textAlign: "center" }}>
            <Heading>Download APP</Heading>
                
            <FooterLink href="#">
            <img src={`/google_pay.jpg`} alt={""} style={{ margin: 5, width:140}} />
            <img src={`/app_store.jpg`} alt={""} style={{ margin: 5, width:140}} />
</FooterLink>

            </div>
           
            </Column>
          </Column2>
        </Row>
      </Container>
      

            <Divider classes={{ root: classes.dividerBottom }} />

 

            <div
 style={{
padding: "5px",
 textAlign: "center",
 color: "#fff",
 fontSize: "12px",
}}
>
 
            © 2021{" "}
        
           <FooterLink target="_blank" href="http://www.numericinfosystems.in"> NUMERIC INFOSYSTEM{" "}
 </FooterLink>
           {" "}
            Pvt. Ltd. All Rights Reserved
 
           </div>
    
           </Box>
  );
};
           export default Footer;
