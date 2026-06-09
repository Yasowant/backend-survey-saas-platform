import mongoose from "mongoose";

import { connectDatabase } from "../config/database";

import { RoleModel } from "../modules/roles/models/Role.model";
import { PermissionModel } from "../modules/roles/models/Permission.model";

const assignPermissionsToRoles = async () => {
  try {
    await connectDatabase();

    console.log("✅ Connected to MongoDB");

    const allPermissions = await PermissionModel.find();

    const adminRole = await RoleModel.findOne({
      name: "ADMIN",
    });

    const superAdminRole = await RoleModel.findOne({
      name: "SUPER_ADMIN",
    });

    const managerRole = await RoleModel.findOne({
      name: "MANAGER",
    });

    const userRole = await RoleModel.findOne({
      name: "USER",
    });

    // SUPER_ADMIN => Everything
    if (superAdminRole) {
      superAdminRole.permissions = allPermissions.map(
        (permission) => permission._id,
      ) as any;

      await superAdminRole.save();

      console.log("✅ SUPER_ADMIN permissions assigned");
    }

    // ADMIN => USER + ROLE + PERMISSION
    if (adminRole) {
      const adminPermissions = allPermissions.filter(
        (permission) =>
          permission.name.startsWith("USER_") ||
          permission.name.startsWith("ROLE_") ||
          permission.name.startsWith("PERMISSION_"),
      );

      adminRole.permissions = adminPermissions.map(
        (permission) => permission._id,
      ) as any;

      await adminRole.save();

      console.log("✅ ADMIN permissions assigned");
    }

    // MANAGER => Limited User Access
    if (managerRole) {
      const managerPermissions = allPermissions.filter(
        (permission) =>
          permission.name === "USER_READ" || permission.name === "USER_UPDATE",
      );

      managerRole.permissions = managerPermissions.map(
        (permission) => permission._id,
      ) as any;

      await managerRole.save();

      console.log("✅ MANAGER permissions assigned");
    }

    // USER => Read Only
    if (userRole) {
      const userPermissions = allPermissions.filter(
        (permission) => permission.name === "USER_READ",
      );

      userRole.permissions = userPermissions.map(
        (permission) => permission._id,
      ) as any;

      await userRole.save();

      console.log("✅ USER permissions assigned");
    }

    console.log("🎉 Permissions assigned successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Error assigning permissions:", error);

    process.exit(1);
  }
};

void assignPermissionsToRoles();
