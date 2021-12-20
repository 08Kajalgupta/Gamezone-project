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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from '@sweetalert/with-react';
import swal from 'sweetalert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL, postDataAndImage, getData, postData} from './FetchNodeServices';
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
    marginTop:30,
    width:580,
    background:'#fff',
    outline:'10px solid pink',
},
input: {
    display: 'none',
  },

}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function DisplayAllCategory(props)
{ 
  const [list, setList]=useState()
  const classes = useStyles();

  ///////////////////////////////////////////Edit Form/////////////////////////////////////////////////////////

const [categoryID,setCategoryID]=useState('')
const [categoryName,setCategoryName]=useState('')
const [categoryDescription,setCategoryDescription]=useState('')
const [icon,setIcon]=useState({bytes:'', file:'/noimage.webp'})
const [ad,setAd]=useState({bytes:'', file:'/noimage.webp'})
const [adStatus,setAdStatus]=useState('')
const [iconSaveCancel,setIconSaveCancel]=useState(false)
const [adSaveCancel,setAdSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

DisplayAllCategory.modules = {
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
DisplayAllCategory.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

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
  var body = {categoryid:categoryID}
  var result = await postData('categories/deletecategory',body);

  if(result)
  {
      swal({
          title: "Category Deleted Successfully",
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
  alert("xxxxxx")
 
  var msg="<div>"
  if(isBlank(categoryName))
  {error=true
      msg+="<font color='#c0392b'><b>Category should not be blank..</b></font><br>"
  }
  if(isBlank(categoryDescription))
  {error=true
      msg+="<font color='#c0392b'><b>Description should not be blank..</b></font><br>" 
  }
  if(isBlank(adStatus))
  {error=true
      msg+="<font color='#c0392b'><b>Please choose ad status..</b></font><br>"
  }
  msg+="</div>"
  var error=false
  if(error)
  {console.log(error)
      swalhtml(renderHTML(msg))
  }
  else
  { alert("nnnn")
  var body = {"categoryid":categoryID,"categoryname":categoryName,"description":categoryDescription,"adstatus":adStatus};
  var result = await postData('categories/editcategorydata', body);
  }
  if(result)
  {
    
      swal({
          title: "Category Updated Successfully",
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
  formData.append("categoryid",categoryID)
  formData.append("icon",icon.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('categories/editicon',formData, config)
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
  formData.append("categoryid",categoryID)
  formData.append("ad",ad.bytes)
  var config = {headers:{"content-type":"multipart/form-data"}}
  var result = await postDataAndImage('categories/editad',formData, config)
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


const editFormView=()=>{
  return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1} >
                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                        Category Interface

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Category Name" value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} variant="outlined" fullWidth/>
                </Grid>

               {/* <Grid item xs={12}>
                    <TextField label="Category Description" value={categoryDescription} onChange={(event)=>setCategoryDescription(event.target.value)} variant="outlined" fullWidth/>
               </Grid>*/}

        <Grid item xs={12}>
        <ReactQuill value={categoryDescription}
        modules={DisplayAllCategory.modules}
        formats={DisplayAllCategory.formats}
        onChange={(value) => setCategoryDescription(value)} />
        </Grid>

                <Grid item xs={10}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Category Icon</span>
                <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={2} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                {iconSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
                </Grid>

                <Grid item xs={10}>
                <span style={{fontSize:15,fontWeight:400}}>Edit Category Ad</span>
                <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="icon-button-ad" type="file" />
                <label htmlFor="icon-button-ad">
                <IconButton color="primary" component="span">
                <PhotoCamera />
                </IconButton>
                </label>
                </Grid>

                <Grid item xs={12} sm={2} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                <Avatar variant="rounded" src={ad.file} style={{width:60,height:60}}/>
                {adSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveAd()}>Save</Button><Button color="secondary" onClick={()=>handleCancelAd()}>Cancel</Button></span>:<></>}
                </Grid>

                <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={adStatus}
                onChange={(event)=>setAdStatus(event.target.value)}
             
                label="Ad Status"
              
                >
                <MenuItem value={'Activate'}>Active</MenuItem>
                <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                </Select>
                </FormControl>

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
    setCategoryID(rowData.categoryid);
    setCategoryName(rowData.categoryname)
    setCategoryDescription(rowData.description)
    setIcon({bytes:"",file:`${ServerURL}/images/${rowData.icon}`})
    setAd({bytes:"",file:`${ServerURL}/images/${rowData.ad}`})
    setAdStatus(rowData.adstatus)

  };

  const handleClose = () => {
    setOpen(false);
    fetchAllCategory()
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
                Edit/Delete Game Categories
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

  const fetchAllCategory=async()=>{
    var result = await getData('categories/displayAll')
    setList(result)
  }
  useEffect (function(){
    fetchAllCategory()
  },[]);

function DisplayAll() {
    return (
      <div>
      <MaterialTable
        title="Category List"
        columns={[
         // { title: 'Id', field: 'categoryid' },
          { title: 'Name', field: 'categoryname' },
          { title: 'Description', field: 'description' },
          { title: 'Icon', field: 'icon',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.icon}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },
          { title: 'Ad', field: 'ad',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.ad}`} style={{borderRadius:10}} width='50' height='50'/></div>)
          },
          { title: 'Ad Status', field: 'adstatus'},
          
        ]}
      
        data={list}
        

        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Categories',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return(<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <div style={{marginTop:50, padding:5, width:900}}>
      {DisplayAll()}
    </div>
  </div>)
}

