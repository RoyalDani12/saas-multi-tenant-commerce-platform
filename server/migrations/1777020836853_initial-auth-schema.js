export const up = (pgm) => {
  // SHOPS
  pgm.createTable("shops", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: { type: "varchar(255)", notNull: true },
    slug: { type: "varchar(255)", notNull: true, unique: true },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // ROLES
  pgm.createTable("roles", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: { type: "varchar(50)", notNull: true, unique: true },
  });

  // USERS
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    shop_id: {
      type: "uuid",
      notNull: true,
      references: "shops(id)",
      onDelete: "CASCADE",
    },
    email: { type: "varchar(255)", notNull: true },
    password_hash: { type: "text", notNull: true },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("users", "unique_user_per_shop", {
    unique: ["shop_id", "email"],
  });

  // USER_SHOPS
  pgm.createTable("user_shops", {
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    shop_id: {
      type: "uuid",
      notNull: true,
      references: "shops(id)",
      onDelete: "CASCADE",
    },
    role_id: {
      type: "uuid",
      notNull: true,
      references: "roles(id)",
      onDelete: "CASCADE",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.addConstraint("user_shops", "user_shops_pk", {
    primaryKey: ["user_id", "shop_id"],
  });

  // USER_PROFILES
  pgm.createTable("user_profiles", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    first_name: { type: "varchar(100)", notNull: true },
    last_name: { type: "varchar(100)", notNull: true },
    phone_number: { type: "varchar(20)" },
    address: { type: "varchar(255)" },
    city: { type: "varchar(100)" },
    country: { type: "varchar(100)" },
    postal_code: { type: "varchar(20)" },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // Indexes
  pgm.createIndex("user_profiles", ["user_id"]);
  pgm.createIndex("users", "shop_id");
};

export const down = (pgm) => {
  pgm.dropTable("user_profiles");
  pgm.dropTable("user_shops");
  pgm.dropTable("users");
  pgm.dropTable("roles");
  pgm.dropTable("shops");
};
