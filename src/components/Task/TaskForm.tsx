// Componente para agregar nuevas tareas

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material'; // Importa componentes de MUI

// Props que recibe el componente TaskForm
interface TaskFormProps {
  onAddTask: (name: string) => void; // Función para agregar una nueva tarea
}

/**
 * Componente de formulario para añadir nuevas tareas.
 * Permite al usuario escribir el nombre de una tarea y agregarla a la lista.
 *
 * @param onAddTask - Función que se ejecuta al enviar el formulario con el nombre de la tarea
 */
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  // Estado local para el nombre de la tarea
  const [taskName, setTaskName] = useState('');

  /**
   * Maneja el envío del formulario.
   * Si el campo no está vacío, llama a onAddTask y limpia el input.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName('');
    }
  };

  return (
    // Formulario con input y botón para añadir tareas
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Añadir nueva tarea..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 100, // Hace el input ovalado
            backgroundColor: 'background.paper', // Fondo del input
            '& fieldset': {
              borderColor: 'text.disabled', // Color del borde por defecto
            },
            '&:hover fieldset': {
              borderColor: 'text.secondary', // Color del borde al hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // Color del borde al focus
              borderWidth: '2px', // Borde más grueso al focus
            },
          },
          '& .MuiInputBase-input': {
            paddingY: '12px', // Ajusta el padding vertical si es necesario
            paddingX: '16px', // Ajusta el padding horizontal si es necesario
          },
        }}
        aria-label="Nueva tarea"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          minWidth: 'auto', // Permite que el botón se ajuste al contenido
          px: 3, // Padding horizontal
        }}
      >
        Añadir
      </Button>
    </Box>
  );
};

export default TaskForm;