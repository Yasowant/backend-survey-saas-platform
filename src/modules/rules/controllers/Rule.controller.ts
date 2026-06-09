import { Request, Response } from "express";

import { RuleService } from "../services/Rule.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class RuleController {
  private readonly ruleService = new RuleService();

  getRules = async (req: Request, res: Response) => {
    const rules = await this.ruleService.getRules();

    return res.json(new ApiResponse(true, "Rules fetched successfully", rules));
  };

  getRuleById = async (req: Request, res: Response) => {
    const rule = await this.ruleService.getRuleById(req.params.id as string);

    return res.json(new ApiResponse(true, "Rule fetched successfully", rule));
  };

  getSurveyRules = async (req: Request, res: Response) => {
    const rules = await this.ruleService.getSurveyRules(
      req.params.surveyId as string,
    );

    return res.json(new ApiResponse(true, "Rules fetched successfully", rules));
  };

  createRule = async (req: Request, res: Response) => {
    const rule = await this.ruleService.createRule(req.body);

    return res
      .status(201)
      .json(new ApiResponse(true, "Rule created successfully", rule));
  };

  updateRule = async (req: Request, res: Response) => {
    const rule = await this.ruleService.updateRule(
      req.params.id as string,
      req.body,
    );

    return res.json(new ApiResponse(true, "Rule updated successfully", rule));
  };

  deleteRule = async (req: Request, res: Response) => {
    await this.ruleService.deleteRule(req.params.id as string);

    return res.json(new ApiResponse(true, "Rule deleted successfully", null));
  };
}
