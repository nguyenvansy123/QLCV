import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    styled
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const StyledListItem = styled(ListItem)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    transition: "background-color 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledForm = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

export const Quytrinhmau = () => {
    const [processes, setProcesses] = useState([
        { id: 1, name: "Process 1", description: "Description for Process 1", status: "Active" },
        { id: 2, name: "Process 2", description: "Description for Process 2", status: "Inactive" },
    ]);
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentProcess, setCurrentProcess] = useState(null);
    const [errors, setErrors] = useState({});

    const handleOpenForm = (process = null) => {
        setCurrentProcess(process);
        setOpenForm(true);
        setErrors({});
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setCurrentProcess(null);
    };

    const handleOpenDeleteDialog = (process) => {
        setCurrentProcess(process);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentProcess(null);
    };

    const validateForm = (process) => {
        const newErrors = {};
        if (!process.name.trim()) newErrors.name = "Process name is required";
        if (!process.description.trim()) newErrors.description = "Description is required";
        if (!process.status.trim()) newErrors.status = "Status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const process = {
            id: currentProcess?.id || Date.now(),
            name: formData.get("name"),
            description: formData.get("description"),
            status: formData.get("status"),
        };

        if (validateForm(process)) {
            if (currentProcess) {
                setProcesses(processes.map((p) => (p.id === process.id ? process : p)));
            } else {
                setProcesses([...processes, process]);
            }
            handleCloseForm();
        }
    };

    const handleDelete = () => {
        setProcesses(processes.filter((p) => p.id !== currentProcess.id));
        handleCloseDeleteDialog();
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Process List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<FaPlus />}
                onClick={() => handleOpenForm()}
                aria-label="Add new process"
                sx={{ mb: 2 }}
            >
                Add Process
            </Button>
            <List>
                {processes.map((process) => (
                    <StyledListItem key={process.id}>
                        <ListItemText
                            primary={process.name}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        {process.description}
                                    </Typography>
                                    {" — "}
                                    {process.status}
                                </>
                            }
                        />
                        <IconButton
                            aria-label="Edit process"
                            onClick={() => handleOpenForm(process)}
                            sx={{ mr: 1 }}
                        >
                            <FaEdit />
                        </IconButton>
                        <IconButton
                            aria-label="Delete process"
                            onClick={() => handleOpenDeleteDialog(process)}
                        >
                            <FaTrash />
                        </IconButton>
                    </StyledListItem>
                ))}
            </List>

            <Dialog open={openForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {currentProcess ? "Edit Process" : "Add New Process"}
                </DialogTitle>
                <DialogContent>
                    <StyledForm component="form" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Process Name"
                            type="text"
                            fullWidth
                            defaultValue={currentProcess?.name || ""}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            rows={3}
                            defaultValue={currentProcess?.description || ""}
                            error={!!errors.description}
                            helperText={errors.description}
                            required
                        />
                        <TextField
                            margin="dense"
                            id="status"
                            name="status"
                            label="Status"
                            type="text"
                            fullWidth
                            defaultValue={currentProcess?.status || ""}
                            error={!!errors.status}
                            helperText={errors.status}
                            required
                        />
                        <DialogActions>
                            <Button onClick={handleCloseForm} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                {currentProcess ? "Save Changes" : "Add Process"}
                            </Button>
                        </DialogActions>
                    </StyledForm>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete the process "{currentProcess?.name}"? This action
                        cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
