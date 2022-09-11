import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header, SideBar } from 'components/Common';
import { Theme } from '@mui/material/styles';
import { Route, Switch } from 'react-router-dom';
import DashBoard from 'features/dashboard';
import StudentFeature from 'features/students';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'grid',
        gridAutoRows: 'auto 1fr',
        gridTemplateColumns: '260px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,
        minHeight: "100vh"
    },
    header: {
        gridArea: 'header',
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`
    },
    main: {
        gridArea: 'main',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 3)
    }
}))

export function AdminLayout() {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>
            <Box className={classes.sidebar}>
                <SideBar />
            </Box>
            <Box className={classes.main}>
                <Switch>
                    <Route path="/admin/dashboard">
                        <DashBoard />
                    </Route>
                    <Route path="/admin/students">
                        <StudentFeature />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}
