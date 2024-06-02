//PARA SANAR O SEGUINTE ERRO:
// bytemeyu@bytemeyu-Inspiron-5400-AIO:~/workspace/aanitakawasaki/ProjetoTS$ npm run prod

// > projetots@1.0.0 prod
// > npm run build && npm start


// > projetots@1.0.0 build
// > tsc

// src/middleware/authenticate.ts:17:21 - error TS2339: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.

// 17                 req.user = decoded;
//                        ~~~~

// src/useCases/GetOwnUser/GetOwnUserController.ts:10:28 - error TS2339: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.

// 10         const userId = req.user.id;
//                               ~~~~

// src/useCases/ListAllUsers/ListAllUsersController.ts:10:38 - error TS2339: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.

// 10             const { is_admin } = req.user || { is_admin: false };
//                                         ~~~~


// Found 3 errors in 3 files.

// Errors  Files
//      1  src/middleware/authenticate.ts:17
//      1  src/useCases/GetOwnUser/GetOwnUserController.ts:10
//      1  src/useCases/ListAllUsers/ListAllUsersController.ts:10
// bytemeyu@bytemeyu-Inspiron-5400-AIO:~/workspace/aanitakawasaki/ProjetoTS$ 






// src/types/types.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface UserPayload {
    id: string; // Assuma que o payload do seu token inclui o ID do usuário
    // você pode adicionar mais propriedades aqui conforme o payload do seu token
    is_admin: boolean;
    leader: string;
  }

  interface Request {
    user?: UserPayload;
  }
}
