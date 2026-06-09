export interface UpdateRuleDto {
  operator?:
    | "EQUALS"
    | "NOT_EQUALS"
    | "GREATER_THAN"
    | "LESS_THAN"
    | "CONTAINS"
    | "NOT_CONTAINS"
    | "IS_EMPTY"
    | "IS_NOT_EMPTY";

  value?: any;

  action?: "SHOW" | "HIDE" | "REQUIRE" | "OPTIONAL" | "ENABLE" | "DISABLE";

  order?: number;

  isActive?: boolean;
}
