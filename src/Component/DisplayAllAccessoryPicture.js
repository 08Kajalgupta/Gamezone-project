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

import { makeStyles } from '@material-ui/core/styles';
import { Image } from "@material-ui/icons";


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



export default function DisplayAllAccessoryPicture(props)
{ 
  const [list, setList]=useState()
  const classes = useStyles();

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////

  const [imageid,setImageId]=useState('')
  const [categoryid,setCategoryId]=useState('')
  const [subcategoryid,setSubCategoryId]=useState('')
  const [accessoryid,setAccessoryId]=useState('')
  const [image,setImage]=useState({bytes:'', file:'/noimage.webp'})
  const [iconSaveCancel,setIconSaveCancel]=useState(false)
  const [getRowData,setRowData]=useState([])
  const [listCategory,setListCategory]=useState([])
  const [listSubCategory,setListSubCategory]=useState([])
  const [accessoryList,setAccessoryList]=useState([])

const handleCategoryChange=async(event)=>{
    setCategoryId(event.target.value)
    fillSubCategoryByCategoryId(event.target.value)   
}

const handleSubCategoryChange=async(event)=>{
    setSubCategoryId(event.target.value)
    fillGameBySubCategoryId(event.target.value)   
}

const fillSubCategoryByCategoryId=async(cid)=>{
  var body = {categoryid:cid}
  var result = await postData('subcategories/Displaysubcategorybycategoryid',body)
  setListSubCategory(result);

}

const fillGameBySubCategoryId=async(cid)=>{
    var body = {subcategoryid:cid}
    var result = await postData('accessory/Displayaccessorybysubcategoryid',body)
    setAccessoryList(result);
  
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

const fillAccessory=()=>{
    return accessoryList.map((item)=>{
        return(
        <MenuItem value={item.accessoryid}>{item.accessoryname}</MenuItem>
        )

    
})
}
  

const handleIcon=(event)=>{
  setImage({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setIconSaveCancel(true)

}

const handledelete=async()=>{
  var body = {imageid:imageid}
  var result = await postData('accessorypicture/deleteaccessorypicture',body);

  if(result)
  {
      swal({
          title: "Accessory Picture Deleted Successfully",
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
  if(isBlank(categoryid))
  {error=true
      msg+="<font color='#c0392b'><b>Category should not be blank..</b></font><br>"
  }
  if(isBlank(subcategoryid))
  {error=true
      msg+="<font color='#c0392b'><b>Sub Category should not be blank..</b></font><br>" 
  }
  if(isBlank(accessoryid))
  {error=true
      msg+="<font color='#c0392b'><b>Accessory should not be blank..</b></font><br>" 
  }
  
  msg+="</div>"

  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else
  {
  var body = {"imageid":imageid, "categoryid":categoryid,"subcategoryid":subcategoryid,"accessoryid":accessoryid}
  var result = await postData('accessorypicture/editaccessorypicturedata',body);
  }
  if(result)
  {
      swal({
          title: "Accessory Picture Updated Successfully",
          icon: "success",
          dangerMode: true,
         })
  }
}


const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setImage({bytes:'',file:`${ServerURL}/images/${getRowData.image}`})
}


const handleClickSaveIcon=async()=>{

  var formData = new FormData()
  formData.append("imageid",imageid)
  formData.append("image",image.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('accessorypicture/editicon',formData, config)
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
                        Accessory picture Interface

                    </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={categoryid}
          onChange={(event)=>handleCategoryChange(event)}
          label="Category"
        >
            {fillCategory()}
          
        </Select>
      </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-subcategory"
          id="demo-simple-select-outlined-subcategory"
          value={subcategoryid}
          onChange={(event)=>handleSubCategoryChange(event)}
          label="SubCategory"
        >
            {fillSubCategory()}
          
        </Select>
      </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-subcategory">Accessory</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-subcategory"
          id="demo-simple-select-outlined-subcategory"
          value={accessoryid}
          onChange={(event)=>setAccessoryId(event.target.value)}
          label="Accessory"
        >
            {fillAccessory()}
          
        </Select>
      </FormControl>
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
                <Avatar variant="rounded" src={image.file} style={{width:60,height:60}}/>
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
    setImageId(rowData.imageid)
    setCategoryId(rowData.categoryid)
    fillSubCategoryByCategoryId(rowData.categoryid)
    fillGameBySubCategoryId(rowData.subcategoryid)
    setSubCategoryId(rowData.subcategoryid)
    setAccessoryId(rowData.accessoryid)
    //setPictureId(rowData.pictureid)
    setImage({bytes:"",file:`${ServerURL}/images/${rowData.image}`})

  };

  const handleClose = () => {
    setOpen(false);
    fetchAllAccessoryPicture()
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
                Edit/Delete Accessory Picture
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

  const fetchAllAccessoryPicture=async()=>{
    var result = await getData('accessorypicture/Displayaccessorypicture')
    setList(result)
  }
  useEffect (function(){
    fetchAllAccessoryPicture()
    fetchAllCategory()
   // fetchAllSubCategory()
  },[]);

function DisplayAll() {
    return (
      <div>
      <MaterialTable
        title="Games Picture List"
        columns={[
          { title: 'Category', field: 'cname' },
          { title: 'Sub Category', field: 'subname' },
          { title: 'Accessory', field: 'acname' },
          { title: 'Picture', field: 'image',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.image}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },    
          
        ]}
      
        data={list}
        

        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Accessory Picture',
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

