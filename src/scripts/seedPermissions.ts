import { connectDatabase } from "../config/database";
import { PermissionModel } from "../modules/roles/models/Permission.model";

const permissions = [
  // Users
  {
    name: "USER_READ",
    description: "Read users",
  },
  {
    name: "USER_CREATE",
    description: "Create users",
  },
  {
    name: "USER_UPDATE",
    description: "Update users",
  },
  {
    name: "USER_DELETE",
    description: "Delete users",
  },

  // Roles
  {
    name: "ROLE_READ",
    description: "Read roles",
  },
  {
    name: "ROLE_CREATE",
    description: "Create roles",
  },
  {
    name: "ROLE_UPDATE",
    description: "Update roles",
  },
  {
    name: "ROLE_DELETE",
    description: "Delete roles",
  },

  // Permissions
  {
    name: "PERMISSION_READ",
    description: "Read permissions",
  },
  {
    name: "PERMISSION_CREATE",
    description: "Create permissions",
  },
  {
    name: "PERMISSION_UPDATE",
    description: "Update permissions",
  },
  {
    name: "PERMISSION_DELETE",
    description: "Delete permissions",
  },
];

const seedPermissions = async () => {
  try {
    await connectDatabase();

    for (const permission of permissions) {
      const exists = await PermissionModel.findOne({
        name: permission.name,
      });

      if (!exists) {
        await PermissionModel.create(permission);

        console.log(`Created: ${permission.name}`);
      }
    }

    console.log("Permissions seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

void seedPermissions();
