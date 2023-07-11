import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
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
  {
    path: `AcademicDepartment`,
    route: AcademicDepartmentRoutes,
  },
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/user', userRotues);
// router.use('/academicSemester', academicSemisterRotues);

export default router;
