// Componente para mostrar la lista de tareas con animaciones

import React from 'react';
import type { Task } from '../../types';
import TaskItem from './TaskItem';
import { List, Typography, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

// Props que recibe el componente TaskList
interface TaskListProps {
  tasks: Task[]; // Array de tareas a mostrar
  onUpdateTask: (id: string, newName: string) => void; // Función para actualizar el nombre de una tarea
  onDeleteTask: (id: string) => void; // Función para eliminar una tarea
  onToggleComplete: (id: string) => void; // Función para marcar como completada o pendiente
}

/**
 * Componente que muestra una lista de tareas.
 * Utiliza animaciones para la aparición y eliminación de tareas.
 * Si no hay tareas, muestra un mensaje informativo.
 *
 * @param tasks - Array de tareas a mostrar
 * @param onUpdateTask - Función para actualizar el nombre de una tarea
 * @param onDeleteTask - Función para eliminar una tarea
 * @param onToggleComplete - Función para marcar como completada o pendiente
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  // Variantes de animación para los elementos de la lista
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  // Si no hay tareas, muestra un mensaje
  if (tasks.length === 0) {
    return (
      <Box sx={{
        textAlign: 'center',
        backgroundColor: 'secondary.light',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          No hay tareas para mostrar. ¡Añade una nueva!
        </Typography>
      </Box>
    );
  }

  // Renderiza la lista de tareas con animaciones
  return (
    <List
      sx={{
        p: 0,
        position: 'relative',
        height: '100%',
      }}
    >
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{
              listStyle: 'none',
              marginBottom: '8px',
              position: 'relative',
            }}
          >
            <TaskItem
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onToggleComplete={onToggleComplete}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </List>
  );
};

export default TaskList;