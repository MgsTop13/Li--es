import licaoC from './controller/licaoC.js';
import cadastroC from "./controller/cadastroC.js"
import acessC from "./controller/acessC.js"

export function adicionarRotas(api) {
    api.use(acessC);
    api.use(licaoC);
    api.use(cadastroC);
}