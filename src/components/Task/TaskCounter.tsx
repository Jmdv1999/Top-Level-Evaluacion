// src/components/TaskCounter.tsx
// Componente para mostrar el contador de tareas

import React from 'react';

// Props que recibe el componente TaskCounter
interface TaskCounterProps {
  totalTasks: number;      // Número total de tareas
  completedTasks: number;  // Número de tareas completadas
}

/**
 * Componente que muestra el total de tareas y cuántas han sido completadas.
 *
 * @param totalTasks - Número total de tareas
 * @param completedTasks - Número de tareas completadas
 */
const TaskCounter: React.FC<TaskCounterProps> = ({ totalTasks, completedTasks }) => {
  return (
    <div className="text-center text-on-surface-variant text-sm mb-4 mt-4">
      <p>
        Tareas totales: <span className="font-semibold text-primary">{totalTasks}</span>
      </p>
      <p>
        Completadas: <span className="font-semibold text-secondary">{completedTasks}</span>
      </p>
    </div>
  );
};

export default TaskCounter;