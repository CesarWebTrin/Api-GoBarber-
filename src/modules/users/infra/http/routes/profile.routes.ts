import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Profilecontroller from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new Profilecontroller();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
