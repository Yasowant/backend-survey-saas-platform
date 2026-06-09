import { NotFoundError } from "../../../shared/exceptions/NotFoundError";
import { QuestionRepository } from "../../questions/repositories/Question.repository";
import { RuleRepository } from "../../rules/repositories/Rule.repository";
import { SectionRepository } from "../../sections/repositories/Section.repository";
import { CreateSurveyDto } from "../dto/CreateSurvey.dto";
import { UpdateSurveyDto } from "../dto/UpdateSurvey.dto";
import { SurveyRepository } from "../repositories/Survey.repository";

export class SurveyService {
  constructor(
    private readonly surveyRepository = new SurveyRepository(),
    private readonly sectionRepository = new SectionRepository(),
    private readonly questionRepository = new QuestionRepository(),
    private readonly ruleRepository = new RuleRepository(),
  ) {}

  async getSurveys() {
    return this.surveyRepository.getAll();
  }

  async getSurveyById(id: string) {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundError("Survey not found");
    }
    return survey;
  }

  async createSurvey(data: CreateSurveyDto, createdBy: string) {
    return this.surveyRepository.create({
      ...data,
      createdBy,
    });
  }

  async updateSurvey(id: string, data: UpdateSurveyDto) {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundError("Survey not found");
    }
    return this.surveyRepository.update(id, data);
  }

  async deleteSurvey(id: string) {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundError("Survey not found");
    }
    await this.surveyRepository.delete(id);
    return null;
  }
  
  async getSurveyDetails(id: string) {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new NotFoundError("Survey not found");
    }
    const sections = await this.sectionRepository.findBySurveyId(id);
    const questions = await this.questionRepository.findBySurveyId(id);
    const rules = await this.ruleRepository.findBySurveyId(id);
    const sectionsWithQuestions = sections.map((section) => ({
      ...section.toObject(),
      questions: questions.filter(
        (question) => question.sectionId.toString() === section._id.toString(),
      ),
    }));
    return {
      ...survey.toObject(),
      sections: sectionsWithQuestions,
      rules,
    };
  }
}
