import express from 'express';
import LicaoController from './Controller/LicaoController.js';
export function adicionarRotas(api) {
    api.use('/public/storage', express.static('public/storage'));
    api.use('/api', LicaoController);
}