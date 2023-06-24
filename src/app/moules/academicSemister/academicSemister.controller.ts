import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';

const CreateAcademicSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createAcademicSemister(
      academicSemisterData
    );

    res.status(200).json({
      success: true,
      message: `Successfully created academicSemister Data`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicSemisterControllers = {
  CreateAcademicSemister,
};
