import { RuleRepository } from "../repositories/Rule.repository";

import { CreateRuleDto } from "../dto/CreateRule.dto";
import { UpdateRuleDto } from "../dto/UpdateRule.dto";

import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class RuleService {
  constructor(private readonly ruleRepository = new RuleRepository()) {}

  async createRule(data: CreateRuleDto) {
    return this.ruleRepository.create(data);
  }

  async getRules() {
    return this.ruleRepository.getAll();
  }

  async getRuleById(id: string) {
    const rule = await this.ruleRepository.findById(id);

    if (!rule) {
      throw new NotFoundError("Rule not found");
    }

    return rule;
  }

  async getSurveyRules(surveyId: string) {
    return this.ruleRepository.findBySurveyId(surveyId);
  }

  async updateRule(id: string, data: UpdateRuleDto) {
    const rule = await this.ruleRepository.findById(id);

    if (!rule) {
      throw new NotFoundError("Rule not found");
    }

    return this.ruleRepository.update(id, data);
  }

  async deleteRule(id: string) {
    const rule = await this.ruleRepository.findById(id);

    if (!rule) {
      throw new NotFoundError("Rule not found");
    }

    await this.ruleRepository.delete(id);

    return null;
  }
}
