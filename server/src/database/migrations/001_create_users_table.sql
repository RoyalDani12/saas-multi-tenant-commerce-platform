CREATE TABLE user_shops (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, shop_id)
);

-- Indexes for faster lookups
CREATE INDEX idx_user_shops_user_id ON user_shops(user_id);
CREATE INDEX idx_user_shops_shop_id ON user_shops(shop_id);
