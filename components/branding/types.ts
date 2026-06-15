// Shared types for Brand components

export interface Color {
  hex: string;
  name: string;
  desc: string;
}

export interface Typography {
  font: string;
  size: string;
  weight: string;
  spacing: string;
}

export interface Brand {
  title: string;
  description: string[];
  mainImage: string;
  sideImages: string[];
  colors: Color[];
  typography: Typography[];
}

export interface BrandCardProps {
  title: string;
  description: string[];
  mainImage: string;
  sideImages?: string[];
  colors?: Color[];
  typography?: Typography[];
}