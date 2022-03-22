import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required)

educationRouter.post("/education/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await educationService.addEducation({
      user_id,
      school,
      major,
      position,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get('/educations/:id', async (req, res, next) => {
  const educationId = req.params.id
  try {
    const foundEdu = await educationService.getEducation({ educationId })
    if (foundEdu.errorMessage) {
      throw new Error(foundEdu.errorMessage);
    }

    res.status(200).json(foundEdu);
  } catch (error) {
    next(error);
  }
})

educationRouter.put('/educations/:id', async (req, res, next) => {
  const educationId = req.params.id
  try {
    const foundEdu = await educationService.getEducation({ educationId })
    if (foundEdu.errorMessage) {
      throw new Error(foundEdu.errorMessage);
    }
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const position = req.body.position ?? null;

    const toUpdate = { school, major, position };

    const updatedEdu = await educationService.setEducation({ educationId, toUpdate });

    if (updatedEdu.errorMessage) {
      throw new Error(updatedEdu.errorMessage);
    }

    res.status(200).json(updatedEdu);

  } catch (error) {
    next(error);
  }
})

educationRouter.get('/educationlist/:user_id', async (req, res, next) => {
  const { user_id } = req.params
  try {
    const foundList = await educationService.getEducationList({ user_id })

    res.status(200).json(foundList);

  } catch (error) {
    next(error);
  }
})

educationRouter.delete(
  "/educations/:id",
  async function (req, res, next) {
    try {
      const educationId = req.params.id;
      const deletedResult = await educationService.deleteEducation({ educationId });

      if (deletedResult.errorMessage) {
        throw new Error(deletedResult.errorMessage);
      }

      res.status(200);

    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };