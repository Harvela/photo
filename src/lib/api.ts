'use client';

import axios from 'axios';

// Define API base URL - adjust as needed
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth related API calls
export const AuthAPI = {
  // Get Google auth URL
  getGoogleAuthUrl: async () => {
    const response = await apiClient.get('/auth/google');
    return response.data.url;
  },

  // Process Google callback
  handleGoogleCallback: async (code: string) => {
    const response = await apiClient.get(`/auth/google/callback?code=${code}`);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (localStorage.getItem('redirect')) {
        window.location.href = `sautly://auth?code=${response.data.token}`;
        localStorage.removeItem('redirect');
      }
    }
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    return !!token; // Boolean conversion
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    return Promise.resolve(); // Return a resolved promise
  },
};

// Song related API calls
export interface SongParams {
  page?: number;
  limit?: number;
  search?: string;
  isPublic?: boolean;
  genre?: string;
  showMine?: boolean;
}

export interface Song {
  _id: string;
  title: string;
  lyrics?: string;
  style?: string;
  genre?: string;
  userId: string;
  reference?: string;
  songRequestId?: string;
  status?: string;
  isPublic: boolean;
  link?: string;
  eventType?: string;
  artist?: string;
  album?: string;
  year?: number;
  createdAt: Date;
}

export interface SongResponse {
  songs: Song[];
  currentPage: number;
  totalPages: number;
  totalSongs: number;
}

export const SongAPI = {
  // Get all songs with optional filters
  getSongs: async (params: SongParams = {}): Promise<SongResponse> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.isPublic !== undefined)
      queryParams.append('isPublic', params.isPublic.toString());
    if (params.genre) queryParams.append('genre', params.genre);
    if (params.showMine !== undefined)
      queryParams.append('showMine', params.showMine.toString());

    const response = await apiClient.get(`/songs?${queryParams.toString()}`);
    return response.data;
  },

  // Get a single song by ID
  getSong: async (id: string): Promise<Song> => {
    const response = await apiClient.get(`/songs/${id}`);
    return response.data;
  },

  // Create a new song
  createSong: async (songData: Partial<Song>): Promise<Song> => {
    const response = await apiClient.post('/songs', songData);
    return response.data;
  },

  // Update an existing song
  updateSong: async (id: string, songData: Partial<Song>): Promise<Song> => {
    const response = await apiClient.put(`/songs/${id}`, songData);
    return response.data;
  },

  // Delete a song
  deleteSong: async (id: string): Promise<void> => {
    await apiClient.delete(`/songs/${id}`);
  },
};

export const CreditsAPI = {
  getMyCredits: async (): Promise<number> => {
    const response = await apiClient.get(`/payments/remaining-credits`);
    return response?.data?.remainingCredits || 0;
  },
};

export default apiClient;
