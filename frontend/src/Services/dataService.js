// Service para manejar todos los datos JSON
import placesData from '../data/places.json';
import reviewsData from '../data/reviews.json';
import usersData from '../data/users.json';
import categoriesData from '../data/categories.json';

class DataService {
  // Places
  async getPlaces() {
    return placesData.places;
  }

  async getPlaceById(id) {
    return placesData.places.find(place => place.id === id);
  }

  async getPlacesByCategory(category) {
    return placesData.places.filter(place =>
      place.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchPlaces(query) {
    const lowercaseQuery = query.toLowerCase();
    return placesData.places.filter(place =>
      place.name.toLowerCase().includes(lowercaseQuery) ||
      place.description.toLowerCase().includes(lowercaseQuery) ||
      place.location.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Reviews
  async getReviews() {
    return reviewsData.reviews;
  }

  async getReviewById(id) {
    return reviewsData.reviews.find(review => review.id === id);
  }

  async getReviewsByPlaceId(placeId) {
    return reviewsData.reviews.filter(review => review.placeId === placeId);
  }

  async getReviewsByUserId(userId) {
    return reviewsData.reviews.filter(review => review.userId === userId);
  }

  async addReview(reviewData) {
    const newReview = {
      id: Date.now().toString(),
      ...reviewData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      helpful: 0,
      verified: false
    };

    reviewsData.reviews.push(newReview);
    return newReview;
  }

  // Users
  async getUsers() {
    return usersData.users;
  }

  async getUserById(id) {
    return usersData.users.find(user => user.id === id);
  }

  // Categories
  async getCategories() {
    return categoriesData.categories;
  }

  async getCategoryById(id) {
    return categoriesData.categories.find(category => category.id === id);
  }

  // Statistics
  async getPlaceStatistics(placeId) {
    const reviews = await this.getReviewsByPlaceId(placeId);
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const ratings = reviews.map(review => review.rating);
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(rating => {
      ratingDistribution[rating]++;
    });

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingDistribution
    };
  }

  async getOverallStatistics() {
    const places = await this.getPlaces();
    const reviews = await this.getReviews();
    const users = await this.getUsers();
    const categories = await this.getCategories();

    return {
      totalPlaces: places.length,
      totalReviews: reviews.length,
      totalUsers: users.length,
      totalCategories: categories.length,
      averageRating: reviews.length > 0
        ? Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10
        : 0
    };
  }
}

export default new DataService();