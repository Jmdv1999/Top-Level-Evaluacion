// Componente para mostrar y gestionar una tarea individual

import React, { useState } from 'react';
import type { Task } from '../../types';
import { ListItem, ListItemButton, ListItemText, Checkbox, IconButton, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

// Props que recibe el componente TaskItem
interface TaskItemProps {
  task: Task; // Objeto con los datos de la tarea
  onUpdateTask: (id: string, newName: string) => void; // Función para actualizar el nombre de la tarea
  onDeleteTask: (id: string) => void; // Función para eliminar la tarea
  onToggleComplete: (id: string) => void; // Función para marcar como completada o pendiente
}

/**
 * Componente que representa una tarea individual.
 * Permite marcar como completada, editar el nombre o eliminar la tarea.
 *
 * @param task - Objeto con los datos de la tarea
 * @param onUpdateTask - Función para actualizar el nombre de la tarea
 * @param onDeleteTask - Función para eliminar la tarea
 * @param onToggleComplete - Función para marcar como completada o pendiente
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  // Estado para controlar si se está editando la tarea
  const [isEditing, setIsEditing] = useState(false);
  // Estado para almacenar el nuevo nombre mientras se edita
  const [editedName, setEditedName] = useState(task.name);

  // Activa el modo edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Guarda los cambios del nombre de la tarea
  const handleSave = () => {
    if (editedName.trim() && editedName !== task.name) {
      onUpdateTask(task.id, editedName.trim());
    }
    setIsEditing(false);
  };

  // Permite guardar con la tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <ListItem
      component="div"
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {isEditing ? (
            // Botón para guardar cambios
            <IconButton edge="end" aria-label="save" onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
          ) : (
            // Botón para activar edición
            <IconButton edge="end" aria-label="edit" onClick={handleEdit} color="info">
              <EditIcon />
            </IconButton>
          )}
          {/* Botón para eliminar la tarea */}
          <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      }
      sx={{
        py: 1,
        px: 2,
        borderRadius: 2,
        backgroundColor: task.completed ? 'action.hover' : 'background.paper',
        boxShadow: 1,
      }}
    >
      <ListItemButton
        role={undefined}
        onClick={() => onToggleComplete(task.id)}
        dense
        sx={{ p: 0, '& .MuiListItemText-root': { my: 0 } }}
      >
        {/* Checkbox para marcar como completada */}
        <Checkbox
          edge="start"
          checked={task.completed}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `task-list-item-${task.id}` }}
        />
        {isEditing ? (
          // Campo de texto para editar el nombre de la tarea
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSave}
            onKeyPress={handleKeyPress}
            autoFocus
            variant="standard"
            sx={{ flexGrow: 1 }}
            inputProps={{ style: { textDecoration: task.completed ? 'line-through' : 'none' } }}
          />
        ) : (
          // Texto de la tarea
          <ListItemText
            id={`task-list-item-${task.id}`}
            primary={task.name}
            sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default TaskItem;