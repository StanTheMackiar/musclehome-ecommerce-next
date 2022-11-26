import { Box, CircularProgress, Typography } from '@mui/material'

export const FullScreenLoading = () => {
  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
    >
        <Typography sx={{ mb: 3 }}>Cargando tus productos...</Typography>
        <CircularProgress thickness={ 2 } />
        
    </Box>
  )
}
