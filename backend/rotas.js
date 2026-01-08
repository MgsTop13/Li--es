import licaoC from './controller/licaoC.js';

export function adicionarRotas(api) {
    api.use(licaoC);
}