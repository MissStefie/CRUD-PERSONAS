import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  DEPARTMENTS,
  CITIES,
  getDepartmentName,
  getCityName,
} from "../utils/departments_cities";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre solo puede contener letras."
    ),
  lastname: Yup.string()
    .required("El apellido es requerido")
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El apellido solo puede contener letras."
    ),
  email: Yup.string()
    .email("El formato del correo es inválido")
    .required("El correo es requerido"),
  contact: Yup.string()
    .matches(
      /^\(\d{4}\)\d{3}-\d{3}$/,
      "El formato del teléfono es inválido. Respete la forma (####)###-###"
    )
    .required("El contacto es requerido"),
  department: Yup.number().required("El departamento es requerido"),
  city: Yup.number().required("La ciudad es requerida"),
  gender: Yup.number().required("El género es requerido"),
  date_of_birth: Yup.date().required("La fecha de nacimiento es requerida"),
});

function Row(props) {
  const { row, onEdit, onDelete } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.lastname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.contact}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => onEdit(row)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => onDelete(row.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Departamento</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Género</TableCell>
                    <TableCell>Fecha de nacimiento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{getDepartmentName(row.department)}</TableCell>
                    <TableCell>{getCityName(row.city)}</TableCell>
                    <TableCell>
                      {row.gender === 1 ? "Mujer" : "Hombre"}
                    </TableCell>
                    <TableCell>
                      {new Date(row.date_of_birth).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    department: PropTypes.number.isRequired,
    city: PropTypes.number.isRequired,
    gender: PropTypes.number.isRequired,
    date_of_birth: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([]);
  const [editPersonId, setEditPersonId] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newPerson, setNewPerson] = React.useState({
    name: "",
    lastname: "",
    email: "",
    contact: "",
    department: "",
    city: "",
    gender: "",
    date_of_birth: "",
  });
  const [filteredCities, setFilteredCities] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://172.31.64.1:4000/people")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la API:", error);
      });
  }, []);

  const handleCreatePerson = () => {
    setNewPerson({
      name: "",
      lastname: "",
      email: "",
      contact: "",
      department: "",
      city: "",
      gender: "",
      date_of_birth: "",
    });
    setEditPersonId(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditPersonId(null);
    setFilteredCities([]);
    setNewPerson({
      name: "",
      lastname: "",
      email: "",
      contact: "",
      department: "",
      city: "",
      gender: "",
      date_of_birth: "",
    });
  };

  const handleSavePerson = async () => {
    try {
      if (editPersonId) {
        await axios.put(
          `http://172.31.64.1:4000/update_person/${editPersonId}`,
          newPerson,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === editPersonId ? { ...newPerson, id: editPersonId } : row
          )
        );
      } else {
        const response = await axios.post(
          "http://172.31.64.1:4000/create_person",
          newPerson,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setRows((prevRows) => [
          ...prevRows,
          { ...newPerson, id: response.data.personId },
        ]);
      }
      handleCloseDialog();
      setEditPersonId(null);
    } catch (error) {
      console.error("Error al guardar la persona:", error);
    }
  };

  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    setNewPerson((prevPerson) => ({
      ...prevPerson,
      [name]:
        name === "department" || name === "city" || name === "gender"
          ? Number(value)
          : value,
    }));

    if (name === "department") {
      const departmentId = Number(value);
      if (departmentId === 1) {
        setFilteredCities([1]);
      } else if (departmentId === 2) {
        setFilteredCities([2, 3, 4, 5, 6]);
      } else if (departmentId === 3) {
        setFilteredCities([7, 8]);
      } else if (departmentId === 4) {
        setFilteredCities([9, 10]);
      } else if (departmentId === 5) {
        setFilteredCities([11, 12]);
      } else if (departmentId === 6) {
        setFilteredCities([13, 14, 15]);
      } else if (departmentId === 7) {
        setFilteredCities([16, 17, 18, 19, 20]);
      } else if (departmentId === 8) {
        setFilteredCities([21, 22]);
      } else if (departmentId === 9) {
        setFilteredCities([23, 24, 25]);
      } else if (departmentId === 10) {
        setFilteredCities([26, 27]);
      } else if (departmentId === 11) {
        setFilteredCities([28, 29]);
      } else if (departmentId === 12) {
        setFilteredCities([30, 31]);
      } else if (departmentId === 13) {
        setFilteredCities([32, 33]);
      } else if (departmentId === 14) {
        setFilteredCities([34, 35]);
      } else if (departmentId === 15) {
        setFilteredCities([36, 37]);
      } else if (departmentId === 16) {
        setFilteredCities([38]);
      } else if (departmentId === 17) {
        setFilteredCities([39]);
      } else {
        setFilteredCities([]);
      }
    }
  };

  const handleEdit = (row) => {
    setNewPerson({
      name: row.name,
      lastname: row.lastname,
      email: row.email,
      contact: row.contact,
      department: row.department,
      city: row.city,
      gender: row.gender,
      date_of_birth: new Date(row.date_of_birth).toISOString().split("T")[0],
    });
    setEditPersonId(row.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://172.31.64.1:4000/delete_person/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      console.log(`Persona con ID ${id} eliminada`);
    } catch (error) {
      console.error("Error al eliminar la persona:", error);
    }
  };
  return (
    <Box sx={{ maxWidth: "80%", margin: "auto" }}>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editPersonId ? "Editar persona" : "Agregar nueva persona"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={newPerson}
            validationSchema={validationSchema}
            onSubmit={handleSavePerson}
          >
            {({ handleChange, values, errors, touched }) => (
              <Form>
                <Field
                  name="name"
                  as={TextField}
                  margin="dense"
                  label="Nombre"
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.name}
                  error={Boolean(errors.name && touched.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="lastname"
                  as={TextField}
                  margin="dense"
                  label="Apellido"
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.lastname}
                  error={Boolean(errors.lastname && touched.lastname)}
                  helperText={touched.lastname && errors.lastname}
                />
                <Field
                  name="email"
                  as={TextField}
                  margin="dense"
                  label="Correo"
                  type="email"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.email}
                  error={Boolean(errors.email && touched.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="contact"
                  as={TextField}
                  margin="dense"
                  label="Contacto"
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.contact}
                  error={Boolean(errors.contact && touched.contact)}
                  helperText={touched.contact && errors.contact}
                />
                <Field
                  label="Departamento"
                  name="department"
                  as={TextField}
                  select
                  fullWidth
                  margin="dense"
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.department || ""}
                  error={Boolean(errors.department && touched.department)}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflow: "auto",
                        },
                      },
                    },
                  }}
                >
                  {Object.keys(DEPARTMENTS).map((id) => (
                    <MenuItem key={id} value={id}>
                      {getDepartmentName(Number(id))}
                    </MenuItem>
                  ))}
                </Field>

                <Field
                  label="Ciudad"
                  name="city"
                  as={TextField}
                  select
                  fullWidth
                  margin="dense"
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.city || ""}
                  error={Boolean(errors.city && touched.city)}
                  disabled={!values.department}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflow: "auto",
                        },
                      },
                    },
                  }}
                >
                  {filteredCities.length > 0
                    ? filteredCities.map((id) => (
                        <MenuItem key={id} value={id}>
                          {getCityName(id)}
                        </MenuItem>
                      ))
                    : Object.keys(CITIES).map((id) => (
                        <MenuItem key={id} value={id}>
                          {getCityName(Number(id))}
                        </MenuItem>
                      ))}
                </Field>

                <Field
                  label="Género"
                  name="gender"
                  as={TextField}
                  select
                  fullWidth
                  margin="dense"
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.gender}
                  error={Boolean(errors.gender && touched.gender)}
                >
                  <MenuItem value={1}>Mujer</MenuItem>
                  <MenuItem value={2}>Hombre</MenuItem>
                </Field>

                <Field
                  name="date_of_birth"
                  as={TextField}
                  margin="dense"
                  type="date"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleChangeModal(e);
                  }}
                  value={values.date_of_birth}
                  error={Boolean(errors.date_of_birth && touched.date_of_birth)}
                />
                <DialogActions>
                  <Button type="submit" color="secondary">
                    {editPersonId ? "Guardar cambios" : "Guardar"}
                  </Button>
                  <Button onClick={handleCloseDialog} color="error">
                    Cancelar
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={handleCreatePerson}
                  sx={{ marginBottom: 2 }}
                >
                  Agregar persona
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
