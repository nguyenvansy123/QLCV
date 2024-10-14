import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css';

export const Thongke = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    currentJob: "",
    pendingJobs: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    // Fetch initial data or use dummy data
    const dummyData = [
      { name: "John Doe", currentJob: "Project A", pendingJobs: "Project B, Project C" },
      { name: "Jane Smith", currentJob: "Project X", pendingJobs: "Project Y" },
    ];
    setEmployees(dummyData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.currentJob) {
      toast.error("Name and Current Job are required!");
      return;
    }
    setEmployees([...employees, newEmployee]);
    setNewEmployee({ name: "", currentJob: "", pendingJobs: "" });
    toast.success("Employee added successfully!");
  };

  const handleEditEmployee = (index) => {
    setEditingIndex(index);
    setNewEmployee(employees[index]);
  };

  const handleUpdateEmployee = () => {
    if (!newEmployee.name || !newEmployee.currentJob) {
      toast.error("Name and Current Job are required!");
      return;
    }
    const updatedEmployees = [...employees];
    updatedEmployees[editingIndex] = newEmployee;
    setEmployees(updatedEmployees);
    setEditingIndex(-1);
    setNewEmployee({ name: "", currentJob: "", pendingJobs: "" });
    toast.success("Employee updated successfully!");
  };

  const handleDeleteEmployee = (index) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
      toast.success("Employee deleted successfully!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employee Data Table</h1>
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingIndex === -1 ? "Add New Employee" : "Edit Employee"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleInputChange}
            placeholder="Employee Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="currentJob"
            value={newEmployee.currentJob}
            onChange={handleInputChange}
            placeholder="Current Job"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="pendingJobs"
            value={newEmployee.pendingJobs}
            onChange={handleInputChange}
            placeholder="Pending Jobs (comma-separated)"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={editingIndex === -1 ? handleAddEmployee : handleUpdateEmployee}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" />
          {editingIndex === -1 ? "Add Employee" : "Update Employee"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Current Job</th>
              <th className="px-4 py-3 text-left">Pending Jobs</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-300">
                <td className="px-4 py-3">{employee.name}</td>
                <td className="px-4 py-3">{employee.currentJob}</td>
                <td className="px-4 py-3">{employee.pendingJobs}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEditEmployee(index)}
                    className="mr-2 text-blue-500 hover:text-blue-700 transition duration-300"
                    aria-label="Edit employee"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(index)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                    aria-label="Delete employee"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}
