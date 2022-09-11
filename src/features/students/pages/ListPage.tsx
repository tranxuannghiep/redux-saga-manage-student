import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { selectFilter, selectLoading, selectPagination, selectStudentList, studentActions } from '../studentSlice';
import { Box, Typography, LinearProgress } from '@mui/material';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import StudentTable from '../components/StudentTable';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1)
    },
    titleContainer: {
        display: 'flex',
        alignItems: "center",
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(4)
    },
    loading: {
        position: "absolute",
        top: theme.spacing(-1),
        width: "100%"
    },
    link: {
        color: "inherit",
        textDecoration: "none",
    }

}))

export default function ListPage() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const match = useRouteMatch()
    const history = useHistory()

    const filter = useAppSelector(selectFilter)
    const studentList = useAppSelector(selectStudentList)
    const pagination = useAppSelector(selectPagination)
    const loading = useAppSelector(selectLoading)
    const cityList = useAppSelector(selectCityList)
    const cityMap = useAppSelector(selectCityMap)

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter))
    }, [dispatch, filter])

    const handlePageChange = (event: any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page
        }))
    }

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter))
    }

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter))
    }

    const handleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student.id || '')
            dispatch(studentActions.setFilter({ ...filter }))
            toast.success("Remove student is successfully!")
        } catch (error) {
            alert('Failed to remove student')
        }
    }

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`)
    }

    return (
        <Box className={classes.root}>

            {loading &&
                <Box className={classes.loading}>
                    <LinearProgress />
                </Box>
            }
            <Box className={classes.titleContainer}>
                <Typography variant='h4'>Students</Typography>
                <Link to={`${match.url}/add`} className={classes.link}>
                    <Button variant='contained' color="primary">Add new student</Button>
                </Link>
            </Box>

            <Box mb={3}>
                <StudentFilters filter={filter} cityList={cityList} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
            </Box>

            <StudentTable cityMap={cityMap} studentList={studentList} onRemove={handleRemoveStudent} onEdit={handleEditStudent} />
            <Box my={2} display="flex" justifyContent="center">
                <Pagination count={Math.ceil(pagination._totalRows / pagination._limit)} color="primary" page={pagination._page} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}
