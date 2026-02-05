import api from './api';
import { GraphNode, CreateNodePayload } from '@/interfaces';

export const nodeService = {
  /** Obtiene los nodos raíz (parent es null) */
  getParentNodes: (locale: string) => 
    api.get<GraphNode[]>(`/api/nodes?locale=${locale}`),

  /** Obtiene los nodos hijos de un ID
   * @param parentId Id del nodo padre
   */
  getChildNodes: (parentId: number, locale: string) => 
    api.get<GraphNode[]>(`/api/nodes?parent=${parentId}&locale=${locale}`),

  /** Crea un nodo */
  createNode: (payload: CreateNodePayload) => 
    api.post<GraphNode>('/api/node', payload),

  /** Elimina un nodo */
  deleteNode: (id: number) => 
    api.delete(`/api/node/${id}`),
};