import mongoose from "mongoose";

import { connectDatabase } from "../config/database";

import { RoleModel } from "../modules/roles/models/Role.model";

const roles = [
  {
    name: "SUPER_ADMIN",
    permissions: [],
  },
  {
    name: "ADMIN",
    permissions: [],
  },
  {
    name: "MANAGER",
    permissions: [],
  },
  {
    name: "USER",
    permissions: [],
  },
];

const seedRoles = async () => {
  try {
    await connectDatabase();

    console.log("Connected to MongoDB");

    for (const role of roles) {
      const existingRole = await RoleModel.findOne({
        name: role.name,
      });

      if (!existingRole) {
        await RoleModel.create(role);

        console.log(`✅ ${role.name} created`);
      } else {
        console.log(`⚠️ ${role.name} already exists`);
      }
    }

    console.log("🎉 Roles seeded successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

void seedRoles();
