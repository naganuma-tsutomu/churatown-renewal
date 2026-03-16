CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    category VARCHAR(50),
    attributes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shops_attributes ON shops USING GIN (attributes);

CREATE TABLE shop_news (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT, -- HTML format
    image_url VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dummy Data
INSERT INTO shops (name, address, phone, category, attributes) VALUES
('うちなー食堂', '沖縄県那覇市松山1-1-1', '098-000-0001', 'グルメ', '{"has_private_room": true, "parking": true}'),
('美ら海ダイビング', '沖縄県恩納村字恩納123', '098-000-0002', '遊ぶ・観光', '{"equipment_rental": true, "beginner_friendly": true}'),
('サンシャインホテル', '沖縄県名護市字宮里456', '098-000-0003', 'ホテル', '{"ocean_view": true, "breakfast_included": false}'),
('ちゅら不動産', '沖縄県浦添市城間789', '098-000-0004', '不動産', '{"floor_plan": "3LDK", "pet_allowed": true}');

INSERT INTO shop_news (shop_id, title, content, image_url) VALUES
(1, '春の新メニュー登場！', '<p>ゴーヤーチャンプルー定食に新しい小鉢が追加されました。<strong>ぜひご賞味ください！</strong></p>', NULL),
(2, 'GWのご予約はお早めに', '<p>今年のゴールデンウィークのボートダイビングは埋まり始めています！</p>', NULL),
(3, 'リニューアルオープンのご案内', '<p>客室の一部を改装し、さらに快適になりました。</p>', NULL);
