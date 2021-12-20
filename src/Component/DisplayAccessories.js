import React,{useState, useEffect} from "react";
import MaterialTable from 'material-table';
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
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import {ServerURL, postDataAndImage, getData, postData} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
    width:1000,
    outline:'10px solid pink',
},
input: {
    display: 'none',
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function DisplayAccessories(props)
{ 
  const [list, setList]=useState()
  const classes = useStyles();

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////


  const [categoryid,setCategoryId]=useState('')
  const [subcategoryid,setSubCategoryId]=useState('')
  const [accessoryId,setAccessoryId]=useState('')
  const [accessoryName,setAccessoryName]=useState('')
  const [description,setDescription]=useState('')
  const [icon,setIcon]=useState({bytes:'', file:'/noimage.webp'})
  const [stock,setStock]=useState('')
  const [rented,setRented]=useState('')
  const [rentamt,setRentAmt]=useState('')
  const [offer,setOffer]=useState('')
  const [iconSaveCancel,setIconSaveCancel]=useState(false)
  const [getRowData,setRowData]=useState([])
  const [listCategory,setListCategory]=useState([])
  const [listSubCategory,setListSubCategory]=useState([])

  DisplayAccessories.modules = {
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
  DisplayAccessories.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


const handleCategoryChange=async(event)=>{
    setCategoryId(event.target.value)
    fillSubCategoryByCategoryId(event.target.value)

    
}

const fillSubCategoryByCategoryId=async(cid)=>{
  var body = {categoryid:cid}
  var result = await postData('subcategories/Displaysubcategorybycategoryid',body)
  setListSubCategory(result);

}



const fetchAllCategory=async()=>{
    var result = await getData('categories/displayAll')
    setListCategory(result)
  }

const fillCategory=()=>{
    return listCategory.map((item)=>{
        return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )

    
})
}

const fillSubCategory=()=>{
    return listSubCategory.map((item)=>{
        return(
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        )

    
})
}
  

const handleIcon=(event)=>{
  setIcon({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setIconSaveCancel(true)

}

const handledelete=async()=>{
  var body = {accessoryid:accessoryId}
  var result = await postData('accessory/deleteaccessory',body);

  if(result)
  {
      swal({
          title: "Accessory Deleted Successfully",
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
  if(isBlank(accessoryName))
  {error=true
      msg+="<font color='#c0392b'><b>Accessory should not be blank..</b></font><br>"
  }
  if(isBlank(description))
  {error=true
      msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
  }
  if(isBlank(stock))
  {error=true
      msg+="<font color='#c0392b'><b>Stock should not be blank..</b></font><br>" 
  }
  if(isBlank(rented))
  {error=true
      msg+="<font color='#c0392b'><b>Rented should not be blank..</b></font><br>" 
  }
  if(isBlank(rentamt))
  {error=true
      msg+="<font color='#c0392b'><b>Rent Amount should not be blank..</b></font><br>" 
  }
  if(isBlank(offer))
  {error=true
      msg+="<font color='#c0392b'><b>Offer should not be blank..</b></font><br>" 
  }
  
  msg+="</div>"

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else
  {
  var body = {"accessoryid":accessoryId,"accessoryname":accessoryName,"description":description,"stock":stock,"rented":rented,"rentamt":rentamt,"offer":offer}
  var result = await postData('accessory/editaccessorydata',body);
  }
  if(result)
  {
      swal({
          title: "Accessories Updated Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
}


const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setIcon({bytes:'',file:`${ServerURL}/images/${getRowData.icon}`})
}


const handleClickSaveIcon=async()=>{

  var formData = new FormData()
  formData.append("accessoryid",accessoryId)
  formData.append("picture",icon.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('accessory/editicon',formData, config)
  if(result)
  {
      swal({
          title: "Picture Upadated Successfully",
          icon: "success",
          dangerMode: true,
         });
         setIconSaveCancel(false)
  }

}



const editFormView=()=>{
  return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                        Accessory Interface

                    </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-category">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={categoryid}
          onChange={(event)=>handleCategoryChange(event)}
          label="Category ID"
        >
            {fillCategory()}
          
        </Select>
      </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-subcategory"
          id="demo-simple-select-outlined-subcategory"
          value={subcategoryid}
          onChange={(event)=>setSubCategoryId(event.target.value)}
          label="SubCategory ID"
        >
            {fillSubCategory()}
          
        </Select>
      </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Accessory Name" value={accessoryName} onChange={(event)=>setAccessoryName(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

               {/*<Grid item xs={12}>
                    <TextField label="Description"  value={description} onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
               </Grid>*/}

        <Grid item xs={12}>
        <ReactQuill value={description}
        modules={DisplayAccessories.modules}
        formats={DisplayAccessories.formats}
        onChange={(value) => setDescription(value)} />
        </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField label="Stock"  value={stock} onChange={(event)=>setStock(event.target.value)} variant="outlined" fullWidth/>
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField label="Rented"  value={rented} onChange={(event)=>setRented(event.target.value)} variant="outlined" fullWidth/>
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField label="Rent Amount"  value={rentamt} onChange={(event)=>setRentAmt(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField label="Offer"  value={offer} onChange={(event)=>setOffer(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12} sm={6}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Accessory Picture</span>
                <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                {iconSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
                </Grid>

                

                

            </Grid>
        </div>



    </div>

)




}





  /////////////////////////////////////////////////////////////////////////////////////////////////////////





  ///////////////////////////////////////////Edit Dialog///////////////////////////////////////////
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);
    setCategoryId(rowData.categoryid)
    fillSubCategoryByCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setAccessoryId(rowData.accessoryid)
    setAccessoryName(rowData.accessoryname)
    setDescription(rowData.description)
    setIcon({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
    setStock(rowData.stock)
    setRented(rowData.rented)
    setRentAmt(rowData.rentamt)
    setOffer(rowData.offer)

  };

  const handleClose = () => {
    setOpen(false);
    fetchAllAccessory()
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
                Edit/Delete Game Accessories
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>handleClick()}>
                Update
              </Button>
              <Button autoFocus color="inherit" onClick={handledelete}>
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          {editFormView()}
        </Dialog>
      </div>
    );
    



  }





  ///////////////////////////////////////////////////////////////////////////////////////

  const fetchAllAccessory=async()=>{
    var result = await getData('accessory/Displayaccessory')
    setList(result)
  }
  useEffect (function(){
    fetchAllAccessory()
    fetchAllCategory()
  },[]);

function DisplayAll() {
    return (
      <div>
      <MaterialTable
        title="Accessory List"
        columns={[
          { title: 'Category', field: 'cname' },
          { title: 'Sub Category', field: 'subname' },
          { title: 'Name', field: 'accessoryname' },
          { title: 'Description', field: 'description' },
          { title: 'Picture', field: 'picture',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },
          { title: 'Stock', field: 'stock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rent', field: 'rentamt' },
          { title: 'Offer', field: 'offer' },
          
          
        ]}
      
        data={list}
        

        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Accessories',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div style={{marginTop:50, padding:5, width:1100}}>
      {DisplayAll()}
    </div>
  </div>)
}

