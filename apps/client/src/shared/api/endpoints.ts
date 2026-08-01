import { BASE_URL } from "./base-url";

export const API_ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    refresh: `${BASE_URL}/auth/refresh`,
    logout: `${BASE_URL}/auth/logout`,
  },
  user: {
    updateEmail: `${BASE_URL}/users/update-email`,
    updatePassword: `${BASE_URL}/users/update-password`,
  },
  catalog: {
    search: `${BASE_URL}/catalog/search`,
    getGenres: `${BASE_URL}/catalog/genres`,
    recommendations: (id: string) =>
      `${BASE_URL}/catalog/recommendations/${id}`,
    getPopularProducts: `${BASE_URL}/catalog/popular-products`,
  },
  product: {
    get: (id: string) => `${BASE_URL}/product/${id}`,
    createComment: (id: string) => `${BASE_URL}/product/create-comment/${id}`,
    deleteComment: (id: string) => `${BASE_URL}/product/delete-comment/${id}`,
    replyOnComment: (id: string) =>
      `${BASE_URL}/product/reply-on-comment/${id}`,
    remove: (id: string) => `${BASE_URL}/product/remove/${id}`,
  },
  profile: {
    addToWishlist: (id: string) => `${BASE_URL}/profile/add-to-wishlist/${id}`,
    me: `${BASE_URL}/profile/me`,
    getWishlist: `${BASE_URL}/profile/wishlist/`,
    getWishlistIds: `${BASE_URL}/profile/wishlist-ids`,
    updateName: `${BASE_URL}/profile/update-name`,
    updateAvatar: `${BASE_URL}/profile/update-avatar`,
    removeFromWishlist: (id: string) =>
      `${BASE_URL}/profile/remove-from-wishlist/${id}`,
  },
  cart: {
    get: `${BASE_URL}/cart`,
    getCartProductsIds: `${BASE_URL}/cart/products-ids`,
    add: (id: string) => `${BASE_URL}/cart/add/${id}`,
    delete: (id: string) => `${BASE_URL}/cart/delete/${id}`,
    updateQuantity: (id: string) => `${BASE_URL}/cart/update-quantity/${id}`,
    clear: `${BASE_URL}/cart/clear`,
  },
  order: {
    create: `${BASE_URL}/order/create`,
    createPaymentIntent: `${BASE_URL}/order/create-payment-intent`,
    getAll: `${BASE_URL}/order/get-all`,
    getOne: (id: string | number) => `${BASE_URL}/order/${id}`,
  },
};
