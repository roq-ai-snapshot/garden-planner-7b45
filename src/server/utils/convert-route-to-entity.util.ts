const mapping: Record<string, string> = {
  articles: 'article',
  companies: 'company',
  gardens: 'garden',
  plants: 'plant',
  questions: 'question',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
