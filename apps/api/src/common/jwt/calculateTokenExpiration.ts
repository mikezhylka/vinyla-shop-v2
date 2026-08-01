export function calculateTokenExpiration(type: 'refresh' | 'access') {
  switch (type) {
    case 'refresh':
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    case 'access':
      return new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  }
}
