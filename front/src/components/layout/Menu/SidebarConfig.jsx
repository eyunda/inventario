import React from 'react'
import {HomeOutlined, AccountBalanceOutlined, MonetizationOnOutlined } from '@mui/icons-material'

const sidebarConfig = [
	{
		title: 'inicio',
		path: '/app',
		icon: <HomeOutlined color="primary"/>
	},
	{
		title: 'Inventario',
		path: '/app/inventario',
		icon: <AccountBalanceOutlined color="primary"/>
	},
	{
		title: 'Ventas',
		path: '/app/ventas',
		icon: <MonetizationOnOutlined color="primary"/>
	}

]

export default sidebarConfig