
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, Grid, LinearProgress } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { Typography } from '@mui/material';
import {
    dashboardActions, selectDashboardHighestStudentList, selectDashboardLoading, selectDashboardLowestStudentList,
    selectDashboardRankingByCityList, selectDashboardStatistics
} from './dashboardSlice';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1)
    },
    loading: {
        position: "absolute",
        top: theme.spacing(-1),
        width: '100%'
    }
}))

export default function DashBoard() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectDashboardLoading)
    const statistics = useAppSelector(selectDashboardStatistics)
    const highestStudentList = useAppSelector(selectDashboardHighestStudentList)
    const lowestStudentList = useAppSelector(selectDashboardLowestStudentList)
    const rankingByCityList = useAppSelector(selectDashboardRankingByCityList)

    useEffect(() => {
        dispatch(dashboardActions.fetchData())
    }, [dispatch])

    return (
        <Box className={classes.root}>
            {loading &&
                <Box className={classes.loading}>
                    <LinearProgress />
                </Box>
            }
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3} xl={3}>
                    <StatisticItem icon={<MaleIcon fontSize='large' color="primary" />} label="male" value={statistics.maleCount} />
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={3}>
                    <StatisticItem icon={<FemaleIcon fontSize='large' color="primary" />} label="female" value={statistics.femaleCount} />
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={3}>
                    <StatisticItem icon={<ArrowUpwardIcon fontSize='large' color="primary" />} label="mark >=8" value={statistics.hightMarkCount} />
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={3}>
                    <StatisticItem icon={<ArrowDownwardIcon fontSize='large' color="primary" />} label="mark <=5" value={statistics.lowMarkCount} />
                </Grid>
            </Grid>

            <Box mt={4}>
                <Typography variant='h4'>All Students</Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3} xl={3}>
                            <Widget title='Student with hightest mark'>
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} xl={3}>
                            <Widget title='Student with lowest mark'>
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mt={4}>
                <Typography variant='h4'>Ranking by city</Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map(ranking => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3} xl={3}>
                                <Widget title={ranking.cityName}>
                                    <StudentRankingList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
            </Box>

        </Box>
    );
}
