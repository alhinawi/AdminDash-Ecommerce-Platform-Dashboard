import type { Product } from "../interfaces";
import type { User } from "./user";

export type Role = "user" | "assistant" | "system" | "tool" | "model";

export type ToolName =
  | "getDashboardStats"
  | "getProducts"
  | "getProduct"
  | "searchProducts"
  | "getLowStockProducts"
  | "getOutOfStockProducts"
  | "getInventory"
  | "getInventorySummary"
  | "getCategoryPerformance"
  | "getTopSellingProducts"
  | "getSales"
  | "getSalesStatistics"
  | "getRevenue"
  | "getRevenueStatistics"
  | "getCustomers"
  | "getCustomerStatistics"
  | "getOrders"
  | "createProduct"
  | "updateProduct"
  | "updateProductPrice"
  | "updateInventory"
  | "deleteProduct";

export interface ToolCall {
  id: string;
  name: ToolName;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  toolCallId: string;
  name: ToolName;
  result: Record<string, unknown> | Array<unknown> | string | number | boolean;
}

export interface PendingAction {
  id: string;
  toolName: ToolName;
  arguments: Record<string, unknown>;
  description: string;
  impactSummary: string;
  targetItemName?: string;
  oldValue?: string | number;
  newValue?: string | number;
  isDestructive: boolean;
}

export interface ChartData {
  type: "bar" | "area" | "pie";
  title: string;
  data: Array<Record<string, unknown>>;
  dataKeys: string[];
  colors?: string[];
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  toolCalls?: ToolCall[];
  pendingAction?: PendingAction;
  actionConfirmed?: boolean;
  actionCancelled?: boolean;
  chartData?: ChartData;
  error?: boolean;
  rawSources?: string[];
}

export interface DashboardContextData {
  products: Product[];
  users: User[];
  totalProducts: number;
  catalogValue: number;
  uniqueCategoriesCount: number;
  averagePrice: number;
  lowStockCount: number;
  outOfStockCount: number;
}
