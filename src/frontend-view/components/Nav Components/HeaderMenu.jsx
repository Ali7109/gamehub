import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { faDoorClosed, faGamepad, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';


const HeaderMenu = ({onLogout,userName}) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleClose();
    onLogout(false); // Call the onLogout callback with the value 'false'
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
            <FontAwesomeIcon className='p-2 rounded-xl text-lg text-black bg-orange  transition hover:scale-110 hover:text-white' icon={faUser} />
      
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        variant='selectedMenu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <h1 className='ml-2 mr-2 p-2 text-center italic font-semibold '>{userName}</h1>
        <Divider />
        <MenuItem className='ml-2 mr-2' onClick={handleClose}><Link to={"/profile"}><FontAwesomeIcon className='mr-2' icon={faGamepad}/>Profile</Link></MenuItem>
        <MenuItem className='ml-2 mr-2' onClick={handleLogout}><Link to={"/"}><FontAwesomeIcon className='mr-2' icon={faDoorClosed}/>Logout</Link></MenuItem>
      </Menu>
    </div>
  );
}

export default HeaderMenu