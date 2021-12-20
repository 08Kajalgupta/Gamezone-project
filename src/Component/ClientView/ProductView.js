import React, {useState,useEffect,createRef} from "react"
import Grid from '@material-ui/core/Grid'
import {ServerURL,getData,postData} from '../FetchNodeServices'
import Header from "./Header"
import Footer from "./Footer"
import TodayIcon from '@material-ui/icons/Today';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import QtySpinner from "./QtySpinner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import renderHTML from 'react-render-html';
import Slider from "react-slick";
import {useDispatch,useSelector} from 'react-redux';


const useStyles = makeStyles((theme) => ({
   

textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function ProductView(props){
    const classes = useStyles();
    var consoleSlider=createRef()

    var settings={
      dots:false,
      infinite:true,
      speed:1000,
      slidesToShow:3,
      slidesToScroll:1,
     // autoplay:true,
      autoplaySpeed:2000,
      arrows:false,

  };
    
    const [substock,setSubStock]=useState('')
    var item = props.history.location.state.product
   //alert(JSON.stringify(item))
   const [startDate,setStartDate]=useState(getCurrentDate())
    const [endDate,setEndDate]=useState(addDays(1,getCurrentDate()))
    const [totalAmt,setTotalAmt]=useState('')
    const [days,setDays]=useState('')
    const [msg,setMsg]=useState('')
    const [tc,setTc]=useState('')
    const [documents,setDocuments]=useState('')
    const [consolepictures,setConsolePictures]=useState([])
    const [getImage,setImage]=useState(item.icon)
    const [pageRender,setPageRender]=useState(false) 
    var dispatch = useDispatch()
    var cart = useSelector(state=>state.cart)

    function getCurrentDate(){
      var d=new Date()
      var dd=d.getDate()
      if(dd<=9)
      {
        dd="0"+dd;
      }
      var mm=d.getMonth()+1
      if(mm<=9)
      {
        mm="0"+mm;
      }

      var cd=d.getFullYear()+"-"+mm+"-"+dd
      return cd


    }

    function addDays(days,dt){
      var d=new Date(dt)
      d.setDate(d.getDate()+days)
      var dd=d.getDate()
      if(dd<=9)
      {
        dd="0"+dd;
      }
      var mm=d.getMonth()+1
      if(mm<=9)
      {
        mm="0"+mm;
      }

      var cd=d.getFullYear()+"-"+mm+"-"+dd
      return cd
    }
  


   const handleDateDifference=(event,rentamt)=>{
       setEndDate(event.target.value)
       //alert("Start Date"+startDate)
      //alert("End Date"+endDate)
       var sd=new Date(startDate)
       var ed=new Date(event.target.value)
       const diffTime = Math.abs(ed - sd);
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       //alert(diffDays)  
       var totalamt=rentamt*diffDays 
       
       setTotalAmt(totalamt)
       setDays(diffDays)
       item['duration']=diffDays;
       item['time']='Day'
       
       //alert(JSON.stringify(item))
       dispatch({type:'ADD_CART', payload:[item.subcategoryid,item]})
       setPageRender(!pageRender)
       
       setMsg(`Rent for ${diffDays} Days is Rs. ${totalamt}`)

      
   }

   const getPrice=(state,price)=>{
     var days=0
     var  cd=startDate
      var ed=endDate
     if(state=='Day'){
     days=1
     ed=addDays(days,cd)
     }
     else if(state=='Week'){
     days=7
     ed=addDays(days,cd)
     }
     else if(state=='Month'){
     days=30
     ed=addDays(days,cd)
     }

    setEndDate(ed)
    item['duration']=days;
    item['startdate']=cd;
    item['enddate']=ed;
    item['time']='Day';
    //alert(JSON.stringify(item))
    dispatch({type:'ADD_CART', payload:[item.subcategoryid,item]})
    setPageRender(!pageRender)
   

    setMsg(`Rent for ${state} is Rs. ${price}`)

   }

   const fetchDocuments=async()=>{
     var result=await getData('documents/displayall')
     setDocuments(result[0].documents)

   }

   const fetchTC=async()=>{
    var result=await getData('terms/displayall')
    setTc(result[0].conditioned)

  }

  const fetchProductPictures=async()=>{
    var body={subcategoryid:item.subcategoryid}
    var result=await postData('subconsolepicture/displayallproductpictures',body)
    setConsolePictures(result)

  }


   useEffect(function(){
     fetchDocuments();
     fetchTC();
     fetchProductPictures();

   },[])


///////////////////////////////////////Tabs///////////////////////////////////////////////

   const showTabs=(Description)=>(
    <Tabs style={{padding:20}}>
      <TabList>
        <Tab style={{fontSize:20,fontWeight:'bold',letterSpacing:1}}>Description</Tab>
        <Tab style={{fontSize:20,fontWeight:'bold',letterSpacing:1}}>Terms and Condition</Tab>
        <Tab style={{fontSize:20,fontWeight:'bold',letterSpacing:1}}>Documents</Tab>
      </TabList>
  
      <TabPanel>
        <h2 style={{fontWeight:500,fontSize:16}}><div>{renderHTML(Description)}</div></h2>
      </TabPanel>
        
      <TabPanel>
        <div>
        {renderHTML(tc)}
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          {renderHTML(documents)}
        </div>
      </TabPanel>
    </Tabs>
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleQtyChange=(value,item)=>{

    if(value==0){
      dispatch({type:'REMOVE_CART', payload:[item.subcategoryid]})
    }
    else{
      item['qtydemand']=value;
      item['duration']=1;
      var cd=getCurrentDate()
     //alert(cd)
      item['startdate']=cd;
      var ed=addDays(1,cd)
      //alert(ed)
      item['enddate']=ed;
      item['time']='Day'
    
    //alert(JSON.stringify(item))
    dispatch({type:'ADD_CART', payload:[item.subcategoryid,item]})
   
  }
  setPageRender(!pageRender)
}


   const ProductDetails=()=>{
       var rentamt=item.offer>0?item.offer:item.rentamt
       var v=cart[item.subcategoryid]||0
       var qty=0
       if(v!=0)
       { qty=cart[item.subcategoryid].qtydemand }
       return(<div>
           <div style={{fontSize:20,fontWeight:'bold',padding:10,letterSpacing:1}}>
           {item.subcategoryname}
           </div>

           <div style={{fontSize:16,padding:10}}>
           Price:<s>&#8377; {item.rentamt}</s>{" "}
           <span style={{color:'green'}}>
            <b>&#8377; {item.offer}</b>
           </span>
           </div>

                        <div style={{padding:10}}>
                            {(item.stock-item.rented)>0?<div>Availability: {(item.stock-item.rented)} in Stock</div>:<div>Not available this time</div>}

                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <div onClick={()=>getPrice("Day",rentamt)} style={{display:'flex',cursor:'pointer',justifyContent:'center',alignContent:'center',alignItems:'center',width:120,flexDirection:'column',padding:10,background:'#1289A7',color:'#FFF',margin:10}}>
                                <div>Day Price</div>
                                <div style={{fontWeight:'bold'}}>&#8377; : {rentamt}</div>
                            </div>

                            <div onClick={()=>getPrice("Week",rentamt*7)} style={{display:'flex',cursor:'pointer',justifyContent:'center',alignContent:'center',alignItems:'center',width:120,flexDirection:'column',padding:10,background:'#12CBC4',color:'#FFF',margin:10}}>
                                <div>Week Price</div>                               
                                <div style={{fontWeight:'bold'}}>&#8377; : {rentamt*7}</div>
                            </div>

                            <div onClick={()=>getPrice("Month",rentamt*30)} style={{display:'flex',cursor:'pointer',justifyContent:'center',alignContent:'center',width:120,alignItems:'center',flexDirection:'column',padding:10,background:'#38ada9',color:'#FFF',margin:10}}>
                                <div>Month Price</div>
                                <div style={{fontWeight:'bold'}}>&#8377; : {rentamt*30}</div>
                            </div>

                        
                        </div>

                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:10,width:400}}>
                                <span><TodayIcon/>{" "}</span>
                                <span>Select Rent Duration</span>
                            </div>

                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:10,width:400}}>
                          
                                <span>
                                 <TextField 
                                 id="date"
                                 label="Start Date"
                                 onChange={(event)=>setStartDate(event.target.value)}
  
                                 value={startDate}
                                 variant="outlined"
                                 type="date"
                                // defaultValue="2017-05-24"
                                 className={classes.textField}
                                 InputLabelProps={{
                                   shrink: true,
                                 }}
                                 />
                                 </span>

                                <span><TextField
        id="date"
        label="End Date"
        onChange={(event)=>handleDateDifference(event,rentamt)}
        value={endDate}
        variant="outlined"
        type="date"
       // defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </span>
      </div>

      <div style={{padding:10}}>
          {msg}
      </div>
                            

                            <div style={{padding:10}}>
                                <QtySpinner value={qty} onChange={(value)=>handleQtyChange(value,item)} />
                            </div>
                           
       </div>)
   }

   const showConsolePictures=()=>{
     return consolepictures.map(function(citem,index){
       return <div style={{display:'flex',justifyContent:'center',alignItems:'center',outline:'none'}}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',outline:'none',width:70,height:70,border:'2px solid #dcdde1',borderRadius:5,margin:2,cursor:'pointer'}}
          onMouseEnter={()=>setImage(citem.image)}
          >
            <img src={`${ServerURL}/images/${citem.image}`} width="56" height="56"/>

          </div>

       </div>
       
     })
   }

   const handleNext=()=>{
     consoleSlider.current.slickNext()

   }
 
   const handlePrev=()=>{
    consoleSlider.current.slickPrev()


  }



    return (
        <div>
            <Header history={props.history}/>
            <div style={{padding:20}}>
                <Grid container spacing={1}>

                    <Grid item xs={12} sm={6}>
                        <div style={{padding:15, display:'flex', justifyContent:'center',alignItems:'center'}}>
                        <img src={`${ServerURL}/images/${getImage}`} width='300' height='300' style={{border:'1px solid #dfe6e9'}}/>
                        </div>
                        {consolepictures.length>=1 && consolepictures<=4?(
                        <div style={{padding:"30px 1-px",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <div style={{width:325}}>
                           <Slider {...settings}>
                             {showConsolePictures()}

                           </Slider>
                          </div>
                        </div>):(
                          <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',}}>
                          <div style={{marginLeft:10,fontSize:'small'}}>
                            <ArrowBackIosIcon onClick={()=>handleNext()}/>
                          </div>
                        <div style={{padding:"30px 1-px",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <div style={{width:325}}>
                           <Slider {...settings} ref={consoleSlider}>
                             {showConsolePictures()}


                           </Slider>
                          </div>
                        </div>
                        <div style={{marginRight:10,fontSize:'small'}}>
                            <ArrowForwardIosIcon onClick={()=>handlePrev()}/>
                          </div>
                        </div>)}

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {ProductDetails()}
                        </Grid> 
                </Grid>
                <div>
                {showTabs(item.description)}
                </div>
                <Footer/>
            </div>

            
        </div>
    )

   }