import licaoC from './controller/licaoC.js';
import cadastroC from "./controller/cadastroC.js"

export function adicionarRotas(api) {
    api.use(licaoC);
    api.use(cadastroC)
}