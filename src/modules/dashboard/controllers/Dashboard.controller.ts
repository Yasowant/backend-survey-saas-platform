import { Request, Response } from "express";
import { DashboardService } from "../services/Dashboard.service";
import { ApiResponse } from "../../../shared/responses/ApiResponse";

export class DashboardController {
  private dashboardService = new DashboardService();

  getDashboard = async (req: Request, res: Response) => {
    const data = await this.dashboardService.getStats();

    return res
      .status(200)
      .json(new ApiResponse(true, "Dashboard fetched successfully", data));
  };
}
