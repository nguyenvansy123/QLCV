import React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import {Sidebar} from './Sidebar'
import {Main} from './Main'
import './style.css'

export const Layout = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={3}>
               <Sidebar></Sidebar>
            </Grid>
            <Grid size={9}>
                <Main></Main>
            </Grid>
        </Grid>
    )
}
