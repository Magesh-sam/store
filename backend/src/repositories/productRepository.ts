import { pool } from "../database/db.js";

export const createProduct = async (productData: any) => {
  const { name, description, price, stock, category_id, image_url } =
    productData;
  const result = await pool.query(
    "INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, description, price, stock, category_id, image_url],
  );
  return result.rows[0];
};

// export const getProducts = async (queryData: any) => {
//   const {
//     search,
//     category_id,
//     min_price,
//     max_price,
//     sort_by = "created_at",
//     order = "desc",
//     page = 1,
//     limit = 10,
//   } = queryData;
//   const offset = (page - 1) * limit;
//   // let query  ='SELECT * FROM products  WHERE 1=1';
//   let query = `SELECT
//   p.id,
//   p.name,
//   p.description,
//   p.price,
//   p.stock,
//   p.image_url,
//   p.created_at,
//   p.updated_at,
//   c.id AS category_id,
//   c.name AS category
// FROM products p
// JOIN categories c ON p.category_id = c.id
// WHERE 1=1`;
//   const values: any[] = [];
//   let paramIndex = 1;

//   if (search) {
//     query += ` AND name ILIKE $${paramIndex}`;
//     values.push(`%${search}%`);
//     paramIndex++;
//   }

//   if (category_id) {
//     query += ` AND category_id = $${paramIndex}`;
//     values.push(category_id);
//     paramIndex++;
//   }

//   if (min_price !== undefined) {
//     query += ` AND price >= $${paramIndex}`;
//     values.push(min_price);
//     paramIndex++;
//   }

//   if (max_price !== undefined) {
//     query += ` AND price <= $${paramIndex}`;
//     values.push(max_price);
//     paramIndex++;
//   }

//   const validSortColumns = ["name", "price", "created_at"];
//   const safeSortBy = validSortColumns.includes(sort_by)
//     ? sort_by
//     : "created_at";
//   const safeOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

//   query += ` ORDER BY ${safeSortBy} ${safeOrder}`;

//   query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
//   values.push(limit, offset);

//   const result = await pool.query(query, values);

//   // const countQuery = (query.split("ORDER BY")[0] as string).replace(
//   //   "SELECT *",
//   //   "SELECT COUNT(*)",
//   // );
//   const countQuery = `
//   SELECT COUNT(*)
//   FROM products p
//   JOIN categories c ON p.category_id = c.id
//   WHERE 1=1
// `;
//   const countResult = await pool.query(
//     countQuery,
//     values.slice(0, values.length - 2),
//   );

//   const countStr =
//     countResult.rows.length > 0
//       ? String((countResult.rows[0] as any).count)
//       : "0";

//   return {
//     data: result.rows,
//     total: parseInt(countStr, 10),
//     page,
//     limit,
//     totalPages: Math.ceil(parseInt(countStr, 10) / limit),
//   };
// };
export const getProducts = async (queryData: any) => {
  const {
    search,
    category_id,
    min_price,
    max_price,
    sort_by = "created_at",
    order = "desc",
    page = 1,
    limit = 10,
  } = queryData;

  const offset = (page - 1) * limit;

  let query = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.stock,
      p.image_url,
      p.created_at,
      p.updated_at,
      c.id AS category_id,
      c.name AS category,

      (
        SELECT COALESCE(AVG(r.rating), 0)
        FROM reviews r
        WHERE r.product_id = p.id
      ) AS average_rating,

      (
        SELECT COALESCE(
          json_agg(
            json_build_object(
              'id', r.id,
              'user_id', u.id,
              'username', u.username,
              'rating', r.rating,
              'comment', r.comment
            )
          ),
          '[]'
        )
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        WHERE r.product_id = p.id
      ) AS reviews

    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;

  const values: any[] = [];
  let paramIndex = 1;

  if (search) {
    query += ` AND p.name ILIKE $${paramIndex}`;
    values.push(`%${search}%`);
    paramIndex++;
  }

  if (category_id) {
    query += ` AND p.category_id = $${paramIndex}`;
    values.push(category_id);
    paramIndex++;
  }

  if (min_price !== undefined) {
    query += ` AND p.price >= $${paramIndex}`;
    values.push(min_price);
    paramIndex++;
  }

  if (max_price !== undefined) {
    query += ` AND p.price <= $${paramIndex}`;
    values.push(max_price);
    paramIndex++;
  }

  const validSortColumns = ["name", "price", "created_at"];

  const safeSortBy = validSortColumns.includes(sort_by)
    ? `p.${sort_by}`
    : "p.created_at";

  const safeOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

  query += ` ORDER BY ${safeSortBy} ${safeOrder}`;
  query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;

  values.push(limit, offset);

  const result = await pool.query(query, values);

  // Count query
  let countQuery = `
    SELECT COUNT(*)
    FROM products p
    WHERE 1=1
  `;

  const countValues: any[] = [];
  let countParamIndex = 1;

  if (search) {
    countQuery += ` AND p.name ILIKE $${countParamIndex}`;
    countValues.push(`%${search}%`);
    countParamIndex++;
  }

  if (category_id) {
    countQuery += ` AND p.category_id = $${countParamIndex}`;
    countValues.push(category_id);
    countParamIndex++;
  }

  if (min_price !== undefined) {
    countQuery += ` AND p.price >= $${countParamIndex}`;
    countValues.push(min_price);
    countParamIndex++;
  }

  if (max_price !== undefined) {
    countQuery += ` AND p.price <= $${countParamIndex}`;
    countValues.push(max_price);
    countParamIndex++;
  }

  const countResult = await pool.query(countQuery, countValues);

  const total = parseInt(countResult.rows[0].count, 10);

  return {
    data: result.rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
export const getProductById = async (id: number) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateProduct = async (id: number, productData: any) => {
  const { name, description, price, stock, category_id, image_url } =
    productData;
  const result = await pool.query(
    `UPDATE products 
     SET name = COALESCE($1, name), 
         description = COALESCE($2, description), 
         price = COALESCE($3, price), 
         stock = COALESCE($4, stock), 
         category_id = COALESCE($5, category_id), 
         image_url = COALESCE($6, image_url), 
         updated_at = CURRENT_TIMESTAMP 
     WHERE id = $7 RETURNING *`,
    [name, description, price, stock, category_id, image_url, id],
  );
  return result.rows[0];
};

export const deleteProduct = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
