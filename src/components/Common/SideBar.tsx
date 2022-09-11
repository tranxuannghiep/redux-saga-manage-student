import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    link: {
        color: "inherit",
        textDecoration: "none",
        '&.active > li': {
            backgroundColor: theme.palette.action.selected
        }
    }
}))

export function SideBar() {
    const classes = useStyles()
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLink to="/admin/dashboard" className={classes.link}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="/admin/students" className={classes.link}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Students" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>

        </Box>
    );
}
