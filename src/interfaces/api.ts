export interface GraphNode {
  id: number;
  parent: number | null;
  title: string;
  locales: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateNodePayload {
  parent: number | null;
  locales: string[];
}
