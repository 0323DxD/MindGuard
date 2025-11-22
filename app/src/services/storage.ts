const KEYS = {
  USERS: 'mindguard_users_v2',
  SESSION: 'mindguard_session_v2',
  MOODS: 'mindguard_moods_v2',
  CHATS: 'mindguard_chats_v2',
  THEME: 'mindguard_theme_v2',
};

export const StorageService = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return defaultValue;
    }
  },

  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to storage:`, error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  KEYS,
};
