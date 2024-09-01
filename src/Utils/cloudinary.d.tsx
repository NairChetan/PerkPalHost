// src/cloudinary.d.ts

declare module 'cloudinary' {
    export const cloudinary: {
      config: (config: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
      }) => void;
    };
  }
  