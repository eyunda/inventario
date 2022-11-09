import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import {
	DataGridPremium,
	GridToolbarContainer,
	GridToolbarExport,
  } from '@mui/x-data-grid-premium';

const Inventario = () => {
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png',
		nombre: "",
		planeta: ""
	}
	const [usuariosList, setUsuariosList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/listar')
		setUsuariosList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'id', width: 90 },
		{ field: 'referencia', headerName: 'Referencia', width: 120 },
		{ field: 'cantidad', headerName: 'Cantidad', width: 100 },
		{ field: 'marca', headerName: 'Marca', width: 120 },
		{ field: 'descripcion', headerName: 'Descripcion', width: 120 },
		{ field: 'precio', headerName: 'Precio', width: 120 },
		
		{
			field: '',
			headerName: 'Acciones',
			width: 200,
			renderCell: (params) => (
				<Stack direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
					<IconButton size='small' onClick={() => {
						setIsEdit(true)
						setBody(params.row)
						handleDialog()
					}}>
						<EditOutlined />
					</IconButton>
					<IconButton size='small' onClick={() => onDelete(params.id)}>
						<DeleteOutline />
					</IconButton>
				</Stack>
			)
		}
	]

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/eliminar', { id: id })
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	const onChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/guardar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
			setIsEdit(false)
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/editar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	useEffect(init, [])

	function CustomToolbar() {
		return (
		  	<GridToolbarContainer>
				<GridToolbarExport />
		  	</GridToolbarContainer>
		);
	}
	return (
		<>
			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
				<DialogTitle>
					{isEdit ? 'Editar Inventario' : 'Crear Inventario'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='referencia'
								value={body.referencia}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Referencia'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='cantidad'
								value={body.cantidad}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Cantidad'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='marca'
								value={body.marca}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Marca'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='descripcion'
								value={body.descripcion}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Descripcion'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='precio'
								value={body.precio}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Precio'
							/>
						</Grid>
						
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Inventario">
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='lg'>
					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Lista de Inventario</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo</Button>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={usuariosList} columns={columns} components={{Toolbar: CustomToolbar, }}/>
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Inventario

