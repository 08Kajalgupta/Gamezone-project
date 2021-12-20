import React,{useState, useEffect} from "react";
import MaterialTable from 'material-table';
import {ServerURL,postDataAndImage, getData, postData} from './FetchNodeServices';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
 
},
subdiv:{
    padding:20,
    marginTop:20,
    width:750,
    outline:'10px solid pink',
},
input: {
    display: 'none',
  },
    
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function Displayallsubcategory(props)
{ 
  const [list, setList]=useState()
  const classes = useStyles();

///////////////////////////////////////////Edit Form//////////////////////////////////////////////////////

const [subcategoryID,setSubCategoryID]=useState('')
const [categoryId,setCategoryId]=useState('')
const [subcategoryName,setCategoryName]=useState('')
const [categoryDescription,setCategoryDescription]=useState('')
const [icon,setIcon]=useState({bytes:'', file:'/noimage.webp'})
const [ad,setAd]=useState({bytes:'', file:'/noimage.webp'})
const [adStatus,setAdStatus]=useState('')
const [stock,setStock]=useState('')
const [rented,setRented]=useState('')
const [rentAmount,setRentAmount]=useState('')
const [offer,setOffer]=useState('')
const [price,setPrice]=useState('')
const [iconSaveCancel,setIconSaveCancel]=useState(false)
const [adSaveCancel,setAdSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const [listCategory,setListCategory]=useState([])


Displayallsubcategory.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Displayallsubcategory.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]


const fetchAllCategory=async()=>{
    var result = await getData('categories/displayAll')
    setListCategory(result)
  }
  useEffect (function(){
    fetchAllCategory()
  },[]);

const showCategory=()=>{
    return listCategory.map((item)=>{
        return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )

    
})
}

const handleAd=(event)=>{
  setAd({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setAdSaveCancel(true)

}

const handleIcon=(event)=>{
  setIcon({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setIconSaveCancel(true)

}

const handledelete=async()=>{
  var body = {subcategoryid:subcategoryID}
  var result = await postData('subcategories/deletesubcategory',body);

  if(result)
  {
      swal({
          title: "Sub Category Deleted Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
  else
  {
    swal({
      title: "Fail to Delete Record",
      icon: "success",
      dangerMode: true,
     })
  }
}

const handleClick=async()=>{
  var error=false
  var msg="<div>"

  if(isBlank(categoryId))
  {error=true
      msg+="<font color='#c0392b'><b>Category ID should not be blank..</b></font><br>"
  }
  if(isBlank(subcategoryName))
  {error=true
      msg+="<font color='#c0392b'><b>Sub Category should not be blank..</b></font><br>"
  }
  if(isBlank(categoryDescription))
  {error=true
      msg+="<font color='#c0392b'><b>Sub Description should not be blank..</b></font><br>" 
  }
  if(isBlank(adStatus))
  {error=true
      msg+="<font color='#c0392b'><b>Please choose ad status..</b></font><br>"
  }
  if(isBlank(stock))
    {error=true
        msg+="<font color='#c0392b'><b>Stock should not be blank..</b></font><br>"
    }
    if(isBlank(rented))
    {error=true
        msg+="<font color='#c0392b'><b>Rented should not be blank..</b></font><br>"
    }
    if(isBlank(rentAmount))
    {error=true
        msg+="<font color='#c0392b'><b>Rent Amount should not be blank..</b></font><br>"
    }
    if(isBlank(offer))
    {error=true
        msg+="<font color='#c0392b'><b>Offer should not be blank..</b></font><br>"
    }
    if(isBlank(price))
    {error=true
        msg+="<font color='#c0392b'><b>Price should not be blank..</b></font><br>"
    }

  msg+="</div>"

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
else
{
  var body = {"subcategoryid":subcategoryID,"categoryname":subcategoryName,"description":categoryDescription,"adstatus":adStatus,"stock":stock,"rented":rented,"rentamt":rentAmount,"offer":offer,"price":price}
  var result = await postData('subcategories/editsubcategorydata',body);


}

  if(result)
  {
      swal({
          title: "Sub Category Updated Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
}



const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setIcon({bytes:'',file:`${ServerURL}/images/${getRowData.icon}`})
}

const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setAd({bytes:'',file:`${ServerURL}/images/${getRowData.ad}`})
} 

const handleClickSaveIcon=async()=>{

  var formData = new FormData()
  formData.append("subcategoryid",subcategoryID)
  formData.append("icon",icon.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('subcategories/editicon',formData, config)
  if(result)
  {
      swal({
          title: "Icon Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setIconSaveCancel(false)
  }

}

const handleClickSaveAd=async()=>{

  var formData = new FormData()
  formData.append("subcategoryid",subcategoryID)
  formData.append("ad",ad.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('subcategories/editad',formData, config)
  if(result)
  {
      swal({
          title: "Ad Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setAdSaveCancel(false)
  }

}

const EditFormView=()=>{
  return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                        Sub Category Interface

                    </div>
                </Grid>

                <Grid item xs={12} sm={6}>

                <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-category">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={categoryId}
          onChange={(event)=>setCategoryId(event.target.value)}
          label="Category ID"
        >

            {showCategory()}
          
        </Select>
      </FormControl>


                    




                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label="Sub Category Name" value={subcategoryName} onChange={(event)=>setCategoryName(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                {/*<Grid item xs={12} sm={4}>
                    <TextField label="Sub Category Description" value={categoryDescription} onChange={(event)=>setCategoryDescription(event.target.value)} variant="outlined" fullWidth/>
               </Grid>*/}

      <Grid item xs={12}>
     <ReactQuill value={categoryDescription}
     modules={Displayallsubcategory.modules}
     formats={Displayallsubcategory.formats}
     onChange={(value) => setCategoryDescription(value)} />
      </Grid>

                <Grid item xs={12} sm={6}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Category Icon</span>
               
                <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-subfile" type="file" />
                <label htmlFor="icon-button-subfile">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                {iconSaveCancel?<span><Button color='secondary' onClick={()=>handleClickSaveIcon()}>Save</Button><Button color='secondary' onClick={()=>handleCancelIcon()}>Delete</Button></span>:<></>}
                </Grid>

                <Grid item xs={12} sm={6}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Category Ad</span>
                <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="icon-button-subad" type="file" />
                <label htmlFor="icon-button-subad">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Avatar variant="rounded" src={ad.file} style={{width:60,height:60}}/>
                {adSaveCancel?<span><Button color='secondary' onClick={()=>handleClickSaveAd()}>Save</Button><Button color='secondary' onClick={()=>handleCancelAd()}>Delete</Button></span>:<></>}
                </Grid>

                <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(event)=>setAdStatus(event.target.value)}
                value={adStatus}
                label="Ad Status"
              
                >
                <MenuItem value={'Activate'}>Active</MenuItem>
                <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                </Select>
                </FormControl>

                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Price" value={price} onChange={(event)=>setPrice(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Stock" value={stock} onChange={(event)=>setStock(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Rented" value={rented} onChange={(event)=>setRented(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Rent Amount" value={rentAmount} onChange={(event)=>setRentAmount(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Offer" value={offer} onChange={(event)=>setOffer(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

            </Grid>
        </div>



    </div>

)




}



//////////////////////////////////////////Edit Dialog//////////////////////////////////////////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setCategoryId(rowData.categoryid)
    setSubCategoryID(rowData.subcategoryid)
    setCategoryName(rowData.subcategoryname)
    setCategoryDescription(rowData.description)
    setIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
    setAd({bytes:'',file:`${ServerURL}/images/${rowData.ad}`})
    setAdStatus(rowData.adstatus)
    setPrice(rowData.price)
    setStock(rowData.stock)
    setRented(rowData.rented)
    setRentAmount(rowData.rentamt)
    setOffer(rowData.offer)
    
  };

  const handleClose = () => {
    setOpen(false);
    fetchAllSubCategory();
  };


const showEditDialog=()=>{
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Sub Category
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleClick()}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={handledelete}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {EditFormView()}
      </Dialog>
    </div>
  );





}



//////////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchAllSubCategory=async()=>{
    var result = await getData('subcategories/Displaysubcategory')
    setList(result)
  }
  useEffect (function(){
    fetchAllSubCategory()
  },[]);

function DisplayAll() {
    return (
      <div>
      <MaterialTable
        title="Sub Category List"
        columns={[
         // { title: 'Sub Category Id', field: 'subcategoryid' },
          { title: 'Category', field: 'cname' },
          { title: 'Name', field: 'subcategoryname' },
          { title: 'Description', field: 'description' },
          { title: 'Icon', field: 'icon',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.icon}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },
          { title: 'Ad', field: 'ad',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.ad}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },
          { title: 'Ad Status', field: 'adstatus'},
          { title: 'Price', field: 'price'},
          { title: 'Stock', field: 'stock'},
          { title: 'Rented', field: 'rented'},
          { title: 'Rent Amount', field: 'rentamt'},
          { title: 'Offer', field: 'offer'},
        ]}
        data={list} 

        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Sub Categories',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div style={{marginTop:70, padding:7, width:1200}}>
      {DisplayAll()}
    </div>
  </div>)
}

