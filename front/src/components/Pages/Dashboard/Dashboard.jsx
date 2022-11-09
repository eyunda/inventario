import React from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import Page from '../../common/Page'

// ----------------------------------------------------------------------


const Dashboard = () => {

	return (
		<Page title="Inventario | Dashboard">
			<Container maxWidth="xl">
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h5'>Bienvenido al</Typography>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h2'>Inventario</Typography>
				</Box>
				
			</Container>
		</Page>
	)
}

export default Dashboard