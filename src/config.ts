type Resource = "workout" | "weight";
type ResourceAndId = {
  resource: Resource;
  id: string | null;
};

export const routes = {
  show: "?show=",
  delete: "?delete=",
  getRoute(resource: Resource, id?: string): string {
    if (id) return `${this.show}${resource},${id}`; // for editing resource in a form
    return `${this.show}${resource}`; // for showing empty form for a new resource
  },
  getDeleteRoute(resource: Resource, id: string): string {
    return `${this.delete}${resource},${id}`; // for deleting resource
  },
  getResourceAndId(query: string | null): ResourceAndId {
    if (!query) return { resource: "workout", id: null };
    const [resource, id] = query?.split(",");
    return { resource: resource as Resource, id };
  },
};

export type { Resource, ResourceAndId };
