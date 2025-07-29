// Componente para paginación de tareas

import React from 'react';
import { Pagination } from '@mui/material';
import type { PaginationProps } from '@mui/material/Pagination';

// Props que recibe el componente CustomPagination
interface CustomPaginationProps {
  count: number; // Número total de páginas
  page: number; // Página actual
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void; // Función para cambiar de página
  sx?: PaginationProps['sx']; // Estilos personalizados opcionales
}

/**
 * Componente de paginación personalizado.
 * Permite navegar entre páginas de tareas.
 *
 * @param count - Número total de páginas
 * @param page - Página actualmente seleccionada
 * @param onChange - Función para manejar el cambio de página
 * @param sx - Propiedad opcional para estilos personalizados
 */
const CustomPagination: React.FC<CustomPaginationProps> = ({ count, page, onChange, sx }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      sx={sx}
      color="primary"
      size="small"
      showFirstButton // Muestra botón para ir a la primera página
      showLastButton  // Muestra botón para ir a la última página
    />
  );
};

export default CustomPagination;