import { Request, Response } from "express";

import { SectionService } from "../services/Section.service";

import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class SectionController {
  private readonly sectionService = new SectionService();

  createSection = async (req: Request, res: Response) => {
    const section = await this.sectionService.createSection(req.body);

    return res
      .status(201)
      .json(new ApiResponse(true, "Section created successfully", section));
  };

  getSections = async (req: Request, res: Response) => {
    const sections = await this.sectionService.getSections(
      req.params.surveyId as string,
    );

    return res.json(
      new ApiResponse(true, "Sections fetched successfully", sections),
    );
  };

  getSectionById = async (req: Request, res: Response) => {
    const section = await this.sectionService.getSectionById(
      req.params.id as string,
    );

    return res.json(
      new ApiResponse(true, "Section fetched successfully", section),
    );
  };

  updateSection = async (req: Request, res: Response) => {
    const section = await this.sectionService.updateSection(
      req.params.id as string,
      req.body,
    );

    return res.json(
      new ApiResponse(true, "Section updated successfully", section),
    );
  };

  deleteSection = async (req: Request, res: Response) => {
    await this.sectionService.deleteSection(req.params.id as string);

    return res.json(
      new ApiResponse(true, "Section deleted successfully", null),
    );
  };
}
