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
import {ServerURL,getData, postDataAndImage} from './FetchNodeServices';
import {isBlank} from './Checks';
import renderHTML from 'react-render-html';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';



import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        marginTop:20,
        width:750,
        background:'#fff'
    },
    input: {
        display: 'none',
      },
      
  }));     


export default function SubCategory(props)
{
const classes = useStyles();
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
const [listCategory,setListCategory]=useState([])
const [price,setPrice]=useState('')

SubCategory.modules = {
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
  SubCategory.formats = [
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

}

const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})

}
const handleClick=async()=>{
    var error=false
    var msg="<div>"

    if(isBlank(categoryId))
    {error=true
        msg+="<font color='#c0392b'><b>Sub Category ID should not be blank..</b></font><br>"
    }
    if(isBlank(subcategoryName))
    {error=true
        msg+="<font color='#c0392b'><b>Sub Category should not be blank..</b></font><br>"
    }
    if(isBlank(categoryDescription))
    {error=true
        msg+="<font color='#c0392b'><b>Sub Description should not be blank..</b></font><br>" 
    }
    if(isBlank(ad.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select picture for advertisment..</b></font><br>"
    }
    if(isBlank(icon.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select category icon..</b></font><br>"
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


    var formData = new FormData()
    formData.append("categoryid",categoryId)
    formData.append("subcategoryname",subcategoryName)
    formData.append("description",categoryDescription)
    formData.append("icon",icon.bytes)
    formData.append("ad",ad.bytes)
    formData.append("adstatus",adStatus)
    formData.append("price",price)
    formData.append("stock",stock)
    formData.append("rented",rented)
    formData.append("rentamt",rentAmount)
    formData.append("offer",offer)
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('subcategories/addnewsubcategory',formData, config)
    if(result)
    {
        swal({
            title: "Sub Category Submitted Successfully",
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
                            Sub Category Interface

                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-category">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          //value={age}
          onChange={(event)=>setCategoryId(event.target.value)}
          label="Category ID"
        >

            {showCategory()}
          
        </Select>
      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label="Sub Category Name" onChange={(event)=>setCategoryName(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                  {/*<Grid item xs={12}>
                        <TextField label="Sub Category Description" onChange={(event)=>setCategoryDescription(event.target.value)} variant="outlined" fullWidth/>
                  </Grid>*/}

        <Grid item xs={12}>
        <ReactQuill value={categoryDescription}
        modules={SubCategory.modules}
        formats={SubCategory.formats}
        onChange={(value) => setCategoryDescription(value)} />
        </Grid>

                    <Grid item xs={12} sm={6}>
                    <span style={{fontSize:15,fontWeight:400}}>Upload Category Icon</span>
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-subfile" type="file" />
                    <label htmlFor="icon-button-subfile">
                    <IconButton color="primary" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <span style={{fontSize:15,fontWeight:400}}>Upload Category Ad</span>
                    <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="icon-button-subad" type="file" />
                    <label htmlFor="icon-button-subad">
                    <IconButton color="primary" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" src={ad.file} style={{width:60,height:60}}/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(event)=>setAdStatus(event.target.value)}
                 
                    label="Ad Status"
                  
                    >
                    <MenuItem value={'Activate'}>Active</MenuItem>
                    <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                    </Select>
                    </FormControl>

                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField label="Price" onChange={(event)=>setPrice(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                     <Grid item xs={12} sm={4}>
                        <TextField label="Stock" onChange={(event)=>setStock(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField label="Rented" onChange={(event)=>setRented(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <TextField label="Rent Amount" onChange={(event)=>setRentAmount(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField label="Sub Category Offer" onChange={(event)=>setOffer(event.target.value)} variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
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