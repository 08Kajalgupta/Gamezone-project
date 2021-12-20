import React,{useState,useEffect} from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import Paper from '@material-ui/core/Paper';
import {ServerURL, getData, postData, postDataAndImage} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';


import { makeStyles } from '@material-ui/core/styles';
import { OfflinePinRounded } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        marginTop:20,
        width:1000,
        background:'#fff'
    },
    input: {
        display: 'none',
      },
     

  }));     


export default function Accessories(props)
{
const classes = useStyles();
const [categoryid,setCategoryId]=useState('')
const [subcategoryid,setSubCategoryId]=useState('')
const [accessoryName,setAccessoryName]=useState('')
const [description,setDescription]=useState('')
const [icon,setIcon]=useState({bytes:'', file:'/noimage.webp'})
const [stock,setStock]=useState('')
const [rented,setRented]=useState('')
const [rentamt,setRentAmt]=useState('')
const [offer,setOffer]=useState('')
const [listCategory,setListCategory]=useState([])
const [listSubCategory,setListSubCategory]=useState([])

Accessories.modules = {
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
  Accessories.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


const handleCategoryChange=async(event)=>{
    setCategoryId(event.target.value)
    var body = {categoryid:event.target.value}
    var result = await postData('subcategories/Displaysubcategorybycategoryid',body)
    setListSubCategory(result);
}



const fetchAllCategory=async()=>{
    var result = await getData('categories/displayAll')
    setListCategory(result)
  }
  useEffect (function(){
    fetchAllCategory()
  },[]);

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

}
const handleClick=async()=>{

    var error=false
    var msg="<div>"
    
    if(isBlank(categoryid))
    {error=true
        msg+="<font color='#c0392b'><b>Category ID should not be blank..</b></font><br>"
    }
    if(isBlank(subcategoryid))
    {error=true
        msg+="<font color='#c0392b'><b>Sub Category ID should not be blank..</b></font><br>"
    }
    if(isBlank(accessoryName))
    {error=true
        msg+="<font color='#c0392b'><b>Accessory Name should not be blank..</b></font><br>"
    }
    if(isBlank(description))
    {error=true
        msg+="<font color='#c0392b'><b>Accessory Description should not be blank..</b></font><br>" 
    }
    if(isBlank(icon.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select category icon..</b></font><br>"
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


    var formData = new FormData()
    formData.append("categoryid",categoryid)
    formData.append("subcategoryid",subcategoryid)
    formData.append("accessoryname",accessoryName)
    formData.append("description",description)
    formData.append("picture",icon.bytes)
    formData.append("stock",stock)
    formData.append("rented",rented)
    formData.append("rentamt",rentamt)
    formData.append("offer",offer)
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('accessory/addnewaccessories',formData, config)
    if(result)
    {
        swal({
            title: "Accessories Submitted Successfully",
            icon: "success",
            dangerMode: true,
           })
    }
}



    return (
        <div className={classes.root}>
            <Paper elevation={2}>
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
          //value={age}
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
          //value={age}
          onChange={(event)=>setSubCategoryId(event.target.value)}
          label="SubCategory ID"
        >
            {fillSubCategory()}
          
        </Select>
      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField label="Accessory Name" onChange={(event)=>setAccessoryName(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                   {/*<Grid item xs={12}>
                        <TextField label="Description" onChange={(event)=>setDescription(event.target.value)} variant="outlined" fullWidth/>
                   </Grid>*/}

        <Grid item xs={12}>
        <ReactQuill value={description}
        modules={Accessories.modules}
        formats={Accessories.formats}
        onChange={(value) => setDescription(value)} />
        </Grid>

                   

                    <Grid item xs={12} sm={3}>
                        <TextField label="Stock" onChange={(event)=>setStock(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField label="Rented" onChange={(event)=>setRented(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField label="Rent Amount" onChange={(event)=>setRentAmt(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField label="Offer" onChange={(event)=>setOffer(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <span style={{fontSize:15,fontWeight:400}}>Upload Game Accessory Picture</span>
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                    </Grid>


                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="secondary">Save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button fullWidth variant="contained" color="default">Reset</Button>
                    </Grid>

                </Grid>
            </div>
            </Paper>



        </div>

    )
}




