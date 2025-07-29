// Botones para filtrar tareas

import { Button, ButtonGroup, Box } from '@mui/material';

// Tipos de filtro disponibles
type FilterType = 'all' | 'completed' | 'pending';

// Props que recibe el componente FilterButtons
interface FilterButtonsProps {
  currentFilter: FilterType; // Filtro actualmente seleccionado
  onSetFilter: (filter: FilterType) => void; // Función para cambiar el filtro
}

/**
 * Componente de botones para filtrar tareas.
 * Permite seleccionar entre todas, completadas o pendientes.
 *
 * @param currentFilter - Filtro actualmente seleccionado
 * @param onSetFilter - Función para actualizar el filtro
 */
const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onSetFilter }) => {
  return (
    // Contenedor centrado con margen inferior
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <ButtonGroup
        variant="text"
        aria-label="Controles de filtro de tareas"
        sx={{
          // Elimina el borde derecho entre botones
          '.MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: 'none',
          },
        }}
      >
        {/* Botón para mostrar todas las tareas */}
        <Button
          onClick={() => onSetFilter('all')}
          sx={{
            borderRadius: 100,
            px: 2,
            backgroundColor: currentFilter === 'all' ? 'secondary.light' : 'transparent',
            color: currentFilter === 'all' ? 'onSecondaryContainer' : 'text.secondary',
            '&:hover': {
              backgroundColor: currentFilter === 'all' ? 'secondary.main' : 'action.hover', // Efecto hover
              color: currentFilter === 'all' ? 'secondary.contrastText' : 'text.primary',
            },
          }}
        >
          Todas
        </Button>
        {/* Botón para mostrar solo tareas completadas */}
        <Button
          onClick={() => onSetFilter('completed')}
          sx={{
            borderRadius: 100,
            px: 2,
            backgroundColor: currentFilter === 'completed' ? 'secondary.light' : 'transparent',
            color: currentFilter === 'completed' ? 'onSecondaryContainer' : 'text.secondary',
            '&:hover': {
              backgroundColor: currentFilter === 'completed' ? 'secondary.main' : 'action.hover',
              color: currentFilter === 'completed' ? 'secondary.contrastText' : 'text.primary',
            },
          }}
        >
          Completadas
        </Button>
        {/* Botón para mostrar solo tareas pendientes */}
        <Button
          onClick={() => onSetFilter('pending')}
          sx={{
            borderRadius: 100,
            px: 2,
            backgroundColor: currentFilter === 'pending' ? 'secondary.light' : 'transparent',
            color: currentFilter === 'pending' ? 'onSecondaryContainer' : 'text.secondary',
            '&:hover': {
              backgroundColor: currentFilter === 'pending' ? 'secondary.main' : 'action.hover',
              color: currentFilter === 'pending' ? 'secondary.contrastText' : 'text.primary',
            },
          }}
        >
          Pendientes
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default FilterButtons;