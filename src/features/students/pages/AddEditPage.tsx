import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import StudentForm from '../components/StudentForm';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1)
    },
    back: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: theme.palette.divider
    },
    loading: {
        position: "absolute",
        top: theme.spacing(-1),
        width: "100%"
    },
}))

export default function AddEditPage() {
    const classes = useStyles()
    const { studentId } = useParams<any>()
    const isEdit = Boolean(studentId)

    const history = useHistory()
    const [student, setStudent] = useState<Student>()
    const [loading, setLoading] = useState(false)

    const fetchStudentDetail = useCallback(async (id: string) => {
        try {
            setLoading(true)
            const response: Student = await studentApi.getById(id)
            setStudent(response)
        } catch (error) {
            console.log("Failed to fetch student detail", error)
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {

        if (!studentId) return;
        fetchStudentDetail(studentId)

    }, [studentId, fetchStudentDetail])

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student

    const handleStudentFormSubmit = async (formValues: Student) => {
        if (isEdit) {
            await studentApi.update(formValues)
        }
        else {
            await studentApi.add(formValues)
        }
        history.push("/admin/students")
        toast.success("Save student is successfully!")
    }

    return (
        <Box className={classes.root}>
            {loading &&
                <Box className={classes.loading}>
                    <LinearProgress />
                </Box>
            }
            <Link to="/admin/students">
                <Box className={classes.back}>
                    <IconButton >
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
            </Link>
            <Typography mt={2} variant='h4'>{isEdit ? "Update student info" : "Add new student"}</Typography>
            {(!isEdit || Boolean(student)) &&
                <Box mt={3}>
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                </Box>
            }
        </Box>
    );
}
