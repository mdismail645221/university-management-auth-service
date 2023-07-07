import express from 'express';
import { academicSemisterRotues } from '../modules/academicSemister/academicSemister.route';
import { userRotues } from '../modules/user/user.route';

const router = express.Router();

const modulesRoutes = [
  {
    path: '/user',
    route: userRotues,
  },
  {
    path: '/academicSemester',
    route: academicSemisterRotues,
  },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/user', userRotues);
// router.use('/academicSemester', academicSemisterRotues);

export default router;
