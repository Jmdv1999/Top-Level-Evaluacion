// Componente principal de la aplicación de lista de tareas

import React, { useState, useEffect, useMemo } from 'react';
import type { Task } from './types';
import TaskForm from './components/Task/TaskForm';
import TaskList from './components/Task/TaskList';
import FilterButtons from './components/ui/FilterButtons';
import TaskCounter from './components/Task/TaskCounter';
import { Typography, Box, Paper, Link } from '@mui/material'; // Añadido 'Link' aquí
import GitHubIcon from '@mui/icons-material/GitHub'; // Importado el icono de GitHub
import CustomPagination from './components/ui/CustomPagination';
import { ThemeProvider } from '@mui/material/styles'; // Para el tema de Material-UI
import CssBaseline from '@mui/material/CssBaseline'; // Para el reset CSS de Material-UI
import theme from './theme'; 
import { AnimatePresence, motion, easeInOut } from 'framer-motion'; // Asegurado que 'motion' esté importado

type FilterType = 'all' | 'completed' | 'pending';

// Función para cargar tareas desde localStorage
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
  }
  return [];
};

/**
 * Componente principal que gestiona el estado global de la aplicación,
 * incluyendo la lista de tareas, el filtro, la paginación y la animación.
 *
 * - Permite agregar, editar, eliminar y marcar tareas como completadas.
 * - Filtra tareas por estado (todas, completadas, pendientes).
 * - Implementa paginación y animaciones de transición entre páginas.
 * - Sincroniza las tareas con localStorage.
 * - Usa Material UI para el diseño y Framer Motion para animaciones.
 */
function App() {
  // Estado para la lista de tareas
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage);
  // Estado para el filtro actual
  const [filter, setFilter] = useState<FilterType>('all');
  // Estado para la página actual de la paginación
  const [page, setPage] = useState(1);
  // Número de tareas por página
  const tasksPerPage = 5;

  // Sincroniza las tareas con localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Reinicia la página a 1 cuando cambia el filtro
  useEffect(() => {
    setPage(1);
  }, [filter]);

  // Agrega una nueva tarea
  const addTask = (name: string) => {
    setTasks((prevTasks) => {
      const newTask: Task = {
        id: Date.now().toString(),
        name,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return [...prevTasks, newTask];
    });
  };

  // Actualiza el nombre de una tarea
  const updateTask = (id: string, newName: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
  };

  // Elimina una tarea y ajusta la página si es necesario
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);

      const totalPagesAfterDelete = Math.ceil(updatedTasks.length / tasksPerPage);

      if (page > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setPage(totalPagesAfterDelete);
      } else if (totalPagesAfterDelete === 0) {
        setPage(1);
      }

      return updatedTasks;
    });
  };

  // Marca una tarea como completada o pendiente
  const toggleComplete = (id: string) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return newTasks;
    });
  };

  // Filtra las tareas según el filtro seleccionado
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  // Cálculo de índices para la paginación
  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const totalPagesForFiltered = Math.ceil(filteredTasks.length / tasksPerPage);

  // Ajusta la página si el número de páginas cambia
  useEffect(() => {
    if (page > totalPagesForFiltered && totalPagesForFiltered > 0) {
      setPage(totalPagesForFiltered);
    } else if (totalPagesForFiltered === 0 && page !== 1) {
      setPage(1);
    }
  }, [page, totalPagesForFiltered]);

  // Obtiene las tareas de la página actual
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Total de páginas para la paginación
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  // Número de tareas completadas
  const completedCount = tasks.filter((task) => task.completed).length;

  // Maneja el cambio de página desde la paginación
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Permite navegar entre páginas usando las flechas del teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setPage((prevPage) => Math.max(1, prevPage - 1));
      } else if (event.key === 'ArrowRight') {
        setPage((prevPage) => Math.min(totalPages, prevPage + 1));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [totalPages]);

  // Altura estimada para mantener el layout consistente
  const ESTIMATED_TASK_ITEM_HEIGHT = 68;
  const MIN_HEIGHT_TASK_LIST_CONTAINER = `${tasksPerPage * ESTIMATED_TASK_ITEM_HEIGHT}px`;
  const MIN_HEIGHT_MAIN_PAPER = '580px';

  // Variantes de animación para el slider de página
  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  };

  // Transición para el slider de página
  const pageTransition = {
    ease: easeInOut,
    duration: 0.3,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica el reset CSS de Material-UI */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column', // Para organizar el título y el Paper verticalmente
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          // Fondo degradado animado
          background: `linear-gradient(135deg, #1976D2 0%, #42A5F5 50%, #BBDEFB 100%)`, // Fondo azul más vibrante
          backgroundSize: '300% 300%', // Para que el gradiente se mueva
          backgroundPosition: '0% 50%', // Posición inicial del gradiente
          animation: 'gradientAnimation 15s ease infinite', // Animación de movimiento del gradiente
          // Estilos para la animación del gradiente (asegúrate de que esto esté en tu CSS global o en un <style> en index.html)
          '@keyframes gradientAnimation': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      >
        {/* === Título principal con icono de GitHub y animación de bounce === */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3, // Margen inferior para separar del formulario
          mt: 1 // Margen superior para despegarlo del borde
        }}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              color: 'white', // Color del texto blanco para resaltar sobre el fondo
              fontWeight: 'bold',
              mr: 1 // Margen a la derecha para separar del icono
            }}
          >
            Lista de Tareas
          </Typography>
          <Link
            href="https://github.com/Jmdv1999/Top-Level-Evaluacion"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {/* Componente motion.div para la animación de rebote */}
            <motion.div
              animate={{ y: [0, -6, 0] }} // Mueve 6px hacia arriba y vuelve
              transition={{
                repeat: Infinity, // Repite la animación indefinidamente
                duration: 1.8,    // Duración de cada ciclo de rebote (más lento)
                ease: "easeInOut",// Curva de aceleración suave
                delay: 0.8        // Pequeño retraso antes de que empiece la animación
              }}
            >
              <GitHubIcon sx={{ fontSize: 48, color: 'white' }} /> {/* Tamaño y color del icono */}
            </motion.div>
          </Link>
        </Box>
        {/* === FIN: Título principal con icono de GitHub === */}

        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 6,
            width: '100%',
            maxWidth: { xs: 400, md: 500, lg: 600 },
            backgroundColor: 'background.paper', // Usa el color de fondo definido en tu tema
            display: 'flex',
            flexDirection: 'column',
            minHeight: MIN_HEIGHT_MAIN_PAPER,
          }}
        >
          {/* Formulario para añadir tareas */}
          <TaskForm onAddTask={addTask} />
          {/* Botones de filtro */}
          <FilterButtons currentFilter={filter} onSetFilter={setFilter} />
          {/* Contador de tareas */}
          <TaskCounter totalTasks={tasks.length} completedTasks={completedCount} />

          {/* Contenedor de la lista de tareas con altura mínima y animación de página */}
          <Box
            sx={{
              minHeight: MIN_HEIGHT_TASK_LIST_CONTAINER,
              flexGrow: 1,
              overflow: 'hidden',
              position: 'relative',
              mt: 2,
              mb: 2,
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={page}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                {/* Lista de tareas animada */}
                <TaskList
                  tasks={currentTasks}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  onToggleComplete={toggleComplete}
                />
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Paginación si hay más de una página */}
          {totalPages > 1 && (
            <CustomPagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{ mt: 'auto' }}
            />
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;