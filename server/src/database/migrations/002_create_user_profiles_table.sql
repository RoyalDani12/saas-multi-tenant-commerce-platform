CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE, -- THE MISSING PIECE
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- PREVENTS DATA CORRUPTION: Ensures the user actually belongs to this shop
  CONSTRAINT fk_user_shop_integrity 
    FOREIGN KEY (shop_id, user_id) 
    REFERENCES users(shop_id, id)
);


CREATE INDEX idx_profiles_on_shop_and_user ON user_profiles(shop_id, user_id);