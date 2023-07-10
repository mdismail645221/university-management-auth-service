import express from 'express';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemisterRotues } from '../modules/academicSemister/academicSemister.route';
import { userRotues } from '../modules/user/user.route';

const router = express.Router();

const modulesRoutes = [
  {
    path: '/createUser',
    route: userRotues,
  },
  {
    path: '/academicSemester',
    route: academicSemisterRotues,
  },
  {
    path: '/academicFaculty',
    route: academicFacultyRoutes,
  },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/user', userRotues);
// router.use('/academicSemester', academicSemisterRotues);

export default router;
