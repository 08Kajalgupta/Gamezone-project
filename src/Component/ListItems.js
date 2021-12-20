import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryInterface from './CategoryInterface'
import DisplayAllCategory from './DisplayAllCategories'
import SubCategory from './SubCategory'
import Displayallsubcategory from './DisplayAllSubCategories'
import Accessories from './Accessories'
import DisplayAccessories from './DisplayAccessories'
import Games from './Games'
import DisplayGames from './DisplayGames'
import SubConsolePicture from './SubConsolePicture'
import DisplayAllSubConsolePicture from './DisplayAllSubConsolePicture';
import GamesPicture from './GamesPicture';
import DisplayAllGamesPicture from './DisplayAllGamesPicture';
import AccessoryPicture from './AccessoryPicture';
import DisplayAllAccessoryPicture from './DisplayAllAccessoryPicture';
import Termsandcondition from './Termsandcondition';
import Displayterms from './Displayterms';
import Documents  from './Documents';
import Displaydocuments from './Displaydocuments';


 export default function ListItems(props)
 {
     const handleClick=(v)=>{
         props.setComponent(v)
     }


     return(
         <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<CategoryInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" onClick={()=>handleClick(<DisplayAllCategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Categories" onClick={()=>handleClick(<SubCategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List Sub Categories" onClick={()=>handleClick(<Displayallsubcategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessories" onClick={()=>handleClick(<Accessories/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessories" onClick={()=>handleClick(<DisplayAccessories/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Add Games" onClick={()=>handleClick(<Games/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Games" onClick={()=>handleClick(<DisplayGames/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Console Picture" onClick={()=>handleClick(<SubConsolePicture/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Sub Console" onClick={()=>handleClick(<DisplayAllSubConsolePicture/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Games Picture" onClick={()=>handleClick(<GamesPicture/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Game Picture" onClick={()=>handleClick(<DisplayAllGamesPicture/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessory Picture" onClick={()=>handleClick(<AccessoryPicture/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessory Picture" onClick={()=>handleClick(<DisplayAllAccessoryPicture/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Terms and Condition" onClick={()=>handleClick(<Termsandcondition/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Term and Condition" onClick={()=>handleClick(<Displayterms/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Documents" onClick={()=>handleClick(<Documents/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Documents" onClick={()=>handleClick(<Displaydocuments/>)} />
    </ListItem>
   </div>
</div>
);
}