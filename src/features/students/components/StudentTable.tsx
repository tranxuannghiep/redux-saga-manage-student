import { Box, Button, Dialog, DialogActions, DialogContent, Paper } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'models';
import { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableProps {
    studentList: Student[];
    cityMap: {
        [key: string]: City
    };
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>()

    const handleClickOpenDialog = (student: Student) => {
        setSelectedStudent(student)
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleRemoveConfirm = () => {
        onRemove?.(selectedStudent as Student)
        setOpen(false);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size='small'>
                    <TableHead>
                        <TableRow >
                            <TableCell align="center">ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList.map((student) => (
                            <TableRow
                                key={student.id}
                            >
                                <TableCell align='center'>
                                    {student.id}
                                </TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant='contained' color="primary" size='small' onClick={() => onEdit?.(student)}>Edit</Button>
                                    &nbsp;
                                    &nbsp;
                                    <Button variant='outlined' color="secondary" size='small' onClick={() => handleClickOpenDialog(student)}>Remove</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Remove Dialog */}
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Remove a student?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to remove student name "{selectedStudent?.name}".<br />This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog} color="primary" variant='outlined' size='small'>
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveConfirm} color="secondary" autoFocus variant='contained' size='small'>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
