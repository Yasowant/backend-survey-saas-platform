import { SectionRepository } from "../repositories/Section.repository";

import { CreateSectionDto } from "../dto/CreateSection.dto";
import { UpdateSectionDto } from "../dto/UpdateSection.dto";

import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class SectionService {
  constructor(private readonly sectionRepository = new SectionRepository()) {}

  async createSection(data: CreateSectionDto) {
    return this.sectionRepository.create(data);
  }

  async getSections(surveyId: string) {
    return this.sectionRepository.findBySurveyId(surveyId);
  }

  async getSectionById(id: string) {
    const section = await this.sectionRepository.findById(id);

    if (!section) {
      throw new NotFoundError("Section not found");
    }

    return section;
  }

  async updateSection(id: string, data: UpdateSectionDto) {
    const section = await this.sectionRepository.findById(id);

    if (!section) {
      throw new NotFoundError("Section not found");
    }

    return this.sectionRepository.update(id, data);
  }

  async deleteSection(id: string) {
    const section = await this.sectionRepository.findById(id);

    if (!section) {
      throw new NotFoundError("Section not found");
    }

    await this.sectionRepository.delete(id);

    return null;
  }
}
