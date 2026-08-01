export function extractWishlistIdsFromResponse(data: unknown): number[] | null {
  if (Array.isArray(data) && data.every((id) => typeof id === "number"))
    return data;

  if (data && typeof data === "object" && "favorites" in data) {
    const favorites = (data as Record<string, any>).favorites;
    if (Array.isArray(favorites)) {
      return favorites
        .map((f) => (f && typeof f === "object" && "id" in f ? f.id : null))
        .filter((id): id is number => typeof id === "number");
    }
  }
  return null;
}
