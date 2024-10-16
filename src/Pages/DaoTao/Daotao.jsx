import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

export const Daotao = () => {
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [creationDate] = useState(dayjs());
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName,
      assignee,
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null,
      creationDate: creationDate.format("YYYY-MM-DD"),
      status: "Đang làm"
    };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  const resetForm = () => {
    setTaskName("");
    setAssignee("");
    setDueDate(null);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setTaskName(task.taskName);
    setAssignee(task.assignee);
    setDueDate(dayjs(task.dueDate));
    setOpenDialog(true);
  };

  const handleDeleteClick = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    resetForm();
    setEditingTask(null);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id
        ? {
          ...task,
          taskName,
          assignee,
          dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null
        }
        : task
    );
    setTasks(updatedTasks);
    handleDialogClose();
  };

  const handleCompleteTask = (task) => {
    const completedTask = { ...task, status: "Hoàn thành", completionDate: dayjs().format("YYYY-MM-DD") };
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Tạo Nhiệm Vụ Mới
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="taskName"
                  label="Tên Nhiệm Vụ"
                  name="taskName"
                  value={taskName}
                  onChange={handleTaskNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="assignee-label">Người Làm</InputLabel>
                  <Select
                    labelId="assignee-label"
                    id="assignee"
                    value={assignee}
                    label="Người Làm"
                    onChange={handleAssigneeChange}
                  >
                    <MenuItem value="Người 1">Người 1</MenuItem>
                    <MenuItem value="Người 2">Người 2</MenuItem>
                    <MenuItem value="Người 3">Người 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Ngày Hoàn Thành"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="creationDate"
                  label="Ngày Tạo"
                  name="creationDate"
                  value={creationDate.format("DD/MM/YYYY")}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Tạo Nhiệm Vụ
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Nhiệm Vụ Đang Làm" />
            <Tab label="Nhiệm Vụ Đã Hoàn Thành" />
          </Tabs>

          {tabValue === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Nhiệm Vụ</TableCell>
                    <TableCell>Người Làm</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Ngày Hoàn Thành</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                    <TableCell>Hành Động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.taskName}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.creationDate}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(task)} color="primary">
                          <FaEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(task.id)} color="error">
                          <FaTrash />
                        </IconButton>
                        <IconButton onClick={() => handleCompleteTask(task)} color="success">
                          <FaCheckCircle />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tabValue === 1 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Nhiệm Vụ</TableCell>
                    <TableCell>Người Làm</TableCell>
                    <TableCell>Ngày Tạo</TableCell>
                    <TableCell>Ngày Hoàn Thành</TableCell>
                    <TableCell>Ngày Hoàn Thành Thực Tế</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.taskName}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.creationDate}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.completionDate}</TableCell>
                      <TableCell>{task.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Chỉnh Sửa Nhiệm Vụ</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="editTaskName"
              label="Tên Nhiệm Vụ"
              type="text"
              fullWidth
              variant="standard"
              value={taskName}
              onChange={handleTaskNameChange}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="edit-assignee-label">Người Làm</InputLabel>
              <Select
                labelId="edit-assignee-label"
                id="editAssignee"
                value={assignee}
                label="Người Làm"
                onChange={handleAssigneeChange}
              >
                <MenuItem value="Người 1">Người 1</MenuItem>
                <MenuItem value="Người 2">Người 2</MenuItem>
                <MenuItem value="Người 3">Người 3</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              label="Ngày Hoàn Thành"
              value={dueDate}
              onChange={handleDueDateChange}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Hủy</Button>
            <Button onClick={handleUpdateTask}>Cập Nhật</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  )
}
