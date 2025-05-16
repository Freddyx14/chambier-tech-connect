
export interface Professional {
  id: string;
  name: string;
  profession: string;
  description: string;
  profile_image: string;
  skills: string[];
  rating: number;
  review_count: number;
  contact_phone: string;
  contact_email: string;
  contact_whatsapp: string;
}

export interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
}
