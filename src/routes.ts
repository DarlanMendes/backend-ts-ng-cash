import {Router} from 'express'

import { CreateUserController } from './controllers/user/CreateUserController';
import {MeUserController} from './controllers/user/MeUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { BalanceUserController } from './controllers/user/BalanceUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { TransactionCashOutController } from './controllers/transaction/TransactionCashOutController';
import { ListTransactionsUserController } from './controllers/transaction/ListTransactionsUserController';
const router = Router();
//--------ROTA USER ----------------------
router.post('/users', new CreateUserController().handle)
//-------Rota autenticação usuario--------------
router.post('/session',new AuthUserController().handle)
//--------Rota para detalhes do usuário------------------
router.get("/user/me",isAuthenticated, new MeUserController().handle)
//-------Rota para consulta do balance do usuário ---------------
router.get('/user/balance',isAuthenticated, new BalanceUserController().handle)
//--------Rota para fazer cash out ----------
router.get('/user/cashout',isAuthenticated,new TransactionCashOutController().handle)
//----Rota para listar transactions do usuário--------
router.get('/user/transactions',isAuthenticated, new ListTransactionsUserController().handle)
export {router}