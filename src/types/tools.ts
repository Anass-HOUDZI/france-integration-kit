
/**
 * Types pour les outils et catégories
 */
export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  categoryId: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  popular?: boolean;
  component?: React.ComponentType<any>;
}

export interface ToolFormData {
  [key: string]: any;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}
