export type FoodCategory = 'Grains' | 'Proteins' | 'Vegetables' | 'Fruits' | 'Dairy' | 'Fats' | 'Beverages' | 'Herbs' | 'Snacks';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  flareSafe: boolean;
  remissionSafe: boolean;
  calories: number;
  protein: number;
  fiber: number;
  fat: number;
  textureNote: string;
  triggerRisk: string;
  familyFriendly: boolean;
  notes: string;
  tags: string[];
}

export const foodDatabase: FoodItem[] = [
  // GRAINS (safe staples)
  { id: 'g1', name: 'White rice', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 130, protein: 2.7, fiber: 0.4, fat: 0.3, textureNote: 'Well-cooked, soft', triggerRisk: 'Low', familyFriendly: true, notes: 'Safe staple during flares. Well-cooked and soft.', tags: ['staple', 'low-fiber'] },
  { id: 'g2', name: 'White bread', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 265, protein: 9, fiber: 2.7, fat: 3.2, textureNote: 'Soft, no seeds', triggerRisk: 'Low', familyFriendly: true, notes: 'Avoid wholemeal during flares. Choose soft white bread.', tags: ['staple', 'low-fiber'] },
  { id: 'g3', name: 'Oats / Porridge', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 389, protein: 16.9, fiber: 10.6, fat: 6.9, textureNote: 'Well-cooked, smooth', triggerRisk: 'Low (soluble fiber)', familyFriendly: true, notes: 'Soluble fiber is UC-safe. Cook until very soft and creamy.', tags: ['soluble-fiber', 'breakfast'] },
  { id: 'g4', name: 'White pasta', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 131, protein: 5, fiber: 1.8, fat: 1.1, textureNote: 'Well-cooked, soft', triggerRisk: 'Low', familyFriendly: true, notes: 'Plain white pasta, well-cooked until soft. Avoid whole wheat.', tags: ['staple', 'low-fiber'] },
  { id: 'g5', name: 'Semolina', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 360, protein: 13, fiber: 4, fat: 1, textureNote: 'Smooth, creamy', triggerRisk: 'Low', familyFriendly: true, notes: 'Good for porridge or pudding during flares.', tags: ['pudding', 'smooth'] },
  { id: 'g6', name: 'Sago', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 350, protein: 0.2, fiber: 0.5, fat: 0.5, textureNote: 'Soft, translucent', triggerRisk: 'Very low', familyFriendly: true, notes: 'Extremely gentle on the gut. Good for flares.', tags: ['pudding', 'very-gentle'] },
  { id: 'g7', name: 'Corn flakes', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 357, protein: 7.5, fiber: 1.2, fat: 0.4, textureNote: 'Crisp but low fiber', triggerRisk: 'Low', familyFriendly: true, notes: 'Low-fiber cereal. Good breakfast option during flares.', tags: ['breakfast', 'cereal'] },
  { id: 'g8', name: 'Puffed rice', category: 'Grains', flareSafe: true, remissionSafe: true, calories: 402, protein: 6.7, fiber: 1.7, fat: 0.5, textureNote: 'Light, crisp', triggerRisk: 'Low', familyFriendly: true, notes: 'Very gentle. Good snack or breakfast base.', tags: ['breakfast', 'snack'] },
  { id: 'g9', name: 'Wholemeal bread', category: 'Grains', flareSafe: false, remissionSafe: true, calories: 247, protein: 13, fiber: 7, fat: 3.4, textureNote: 'Dense, chewy', triggerRisk: 'High insoluble fiber', familyFriendly: true, notes: 'AVOID during flares. High insoluble fiber can irritate. OK in remission.', tags: ['high-fiber'] },
  { id: 'g10', name: 'Brown rice', category: 'Grains', flareSafe: false, remissionSafe: true, calories: 111, protein: 2.6, fiber: 1.8, fat: 0.9, textureNote: 'Chewy, firm', triggerRisk: 'High insoluble fiber', familyFriendly: true, notes: 'AVOID during flares. The bran is irritating. OK in remission with caution.', tags: ['high-fiber'] },

  // PROTEINS
  { id: 'p1', name: 'Turkey breast', category: 'Proteins', flareSafe: true, remissionSafe: true, calories: 104, protein: 17, fiber: 0, fat: 2, textureNote: 'Lean, tender', triggerRisk: 'Low', familyFriendly: true, notes: 'One of the safest proteins during flares. Very lean, easy to digest.', tags: ['lean-meat', 'poultry'] },
  { id: 'p2', name: 'Chicken breast', category: 'Proteins', flareSafe: true, remissionSafe: true, calories: 165, protein: 31, fiber: 0, fat: 3.6, textureNote: 'Lean, tender', triggerRisk: 'Low', familyFriendly: true, notes: 'Safe during flares. Poach, steam, or bake. Avoid skin and frying.', tags: ['lean-meat', 'poultry'] },
  { id: 'p3', name: 'Poached white fish', category: 'Proteins', flareSafe: true, remissionSafe: true, calories: 90, protein: 19, fiber: 0, fat: 1, textureNote: 'Flaky, soft', triggerRisk: 'Very low', familyFriendly: true, notes: 'Cod, haddock, tilapia — very safe. Poach or steam until flaky.', tags: ['fish', 'lean'] },
  { id: 'p4', name: 'Eggs', category: 'Proteins', flareSafe: true, remissionSafe: true, calories: 155, protein: 13, fiber: 0, fat: 11, textureNote: 'Soft scramble or poach', triggerRisk: 'Low', familyFriendly: true, notes: 'Very safe. Scramble soft, poach, or soft-boil. Avoid fried.', tags: ['breakfast', 'easy-digest'] },
  { id: 'p5', name: 'Beef (lean)', category: 'Proteins', flareSafe: true, remissionSafe: true, calories: 250, protein: 26, fiber: 0, fat: 15, textureNote: 'Tender, lean cuts', triggerRisk: 'Low (if lean)', familyFriendly: true, notes: 'OK in small amounts during flares. Choose very lean cuts. Limit in remission.', tags: ['red-meat'] },
  { id: 'p6', name: 'Salmon', category: 'Proteins', flareSafe: false, remissionSafe: true, calories: 208, protein: 20, fiber: 0, fat: 13, textureNote: 'Flaky, oily', triggerRisk: 'Moderate (fatty)', familyFriendly: true, notes: 'AVOID during flares (fatty). Excellent in remission — anti-inflammatory omega-3s.', tags: ['fatty-fish', 'omega-3'] },
  { id: 'p7', name: 'Tuna', category: 'Proteins', flareSafe: false, remissionSafe: true, calories: 132, protein: 28, fiber: 0, fat: 1, textureNote: 'Firm, flaky', triggerRisk: 'Low (if lean)', familyFriendly: true, notes: 'Canned in water is OK in remission. Fresh is better. Good omega-3 source.', tags: ['fish', 'omega-3'] },
  { id: 'p8', name: 'Pork', category: 'Proteins', flareSafe: false, remissionSafe: false, calories: 242, protein: 27, fiber: 0, fat: 14, textureNote: 'Variable', triggerRisk: 'High (fatty, hard to digest)', familyFriendly: true, notes: 'AVOID. Pork is generally harder to digest and fattier. Not recommended for UC.', tags: ['avoid'] },
  { id: 'p9', name: 'Processed meats', category: 'Proteins', flareSafe: false, remissionSafe: false, calories: 300, protein: 15, fiber: 0, fat: 25, textureNote: 'Dense, salty', triggerRisk: 'Very high', familyFriendly: true, notes: 'AVOID. Bacon, sausages, deli meats — high fat, salt, additives. Very triggering.', tags: ['avoid', 'processed'] },
  { id: 'p10', name: 'Smoked fish', category: 'Proteins', flareSafe: false, remissionSafe: false, calories: 200, protein: 22, fiber: 0, fat: 12, textureNote: 'Firm, salty', triggerRisk: 'High (salt, processing)', familyFriendly: true, notes: 'AVOID. Smoked and pickled fish are high in salt and can trigger flares.', tags: ['avoid', 'processed'] },

  // VEGETABLES
  { id: 'v1', name: 'Potatoes', category: 'Vegetables', flareSafe: true, remissionSafe: true, calories: 77, protein: 2, fiber: 2.2, fat: 0.1, textureNote: 'Mashed, boiled, or baked (peeled)', triggerRisk: 'Low (if peeled & soft)', familyFriendly: true, notes: 'Peel and cook until very soft. Mashed is best during flares.', tags: ['staple', 'soft'] },
  { id: 'v2', name: 'Sweet potatoes', category: 'Vegetables', flareSafe: true, remissionSafe: true, calories: 86, protein: 1.6, fiber: 3, fat: 0.1, textureNote: 'Mashed or baked soft', triggerRisk: 'Low (if cooked soft)', familyFriendly: true, notes: 'Peel and bake or mash until very soft. Good resistant starch when cooled.', tags: ['staple', 'soft'] },
  { id: 'v3', name: 'Carrots (peeled & cooked)', category: 'Vegetables', flareSafe: true, remissionSafe: true, calories: 41, protein: 0.9, fiber: 2.8, fat: 0.2, textureNote: 'Soft, well-cooked', triggerRisk: 'Low (if peeled & soft)', familyFriendly: true, notes: 'Always peel and cook until very soft. Raw or unpeeled can trigger.', tags: ['beta-carotene', 'soft'] },
  { id: 'v4', name: 'Pumpkin', category: 'Vegetables', flareSafe: true, remissionSafe: true, calories: 26, protein: 1, fiber: 0.5, fat: 0.1, textureNote: 'Soft, mashed', triggerRisk: 'Low', familyFriendly: true, notes: 'Very gentle when cooked soft and mashed. Excellent for soups.', tags: ['soft', 'soup'] },
  { id: 'v5', name: 'Spinach (cooked/blended)', category: 'Vegetables', flareSafe: true, remissionSafe: true, calories: 23, protein: 2.9, fiber: 2.2, fat: 0.4, textureNote: 'Wilted or blended smooth', triggerRisk: 'Low (if cooked smooth)', familyFriendly: true, notes: 'Cook until fully wilted or blend into smooth soups. Avoid raw.', tags: ['iron', 'smooth'] },
  { id: 'v6', name: 'Cucumber (peeled)', category: 'Vegetables', flareSafe: true, remissionSafe: true, calories: 15, protein: 0.7, fiber: 0.5, fat: 0.1, textureNote: 'Soft, peeled', triggerRisk: 'Low (if peeled)', familyFriendly: true, notes: 'Peel and remove seeds. Very gentle when peeled. Good for hydration.', tags: ['hydrating', 'low-cal'] },
  { id: 'v7', name: 'Broccoli', category: 'Vegetables', flareSafe: false, remissionSafe: true, calories: 34, protein: 2.8, fiber: 2.6, fat: 0.4, textureNote: 'Firm, crunchy', triggerRisk: 'High (insoluble fiber, gas)', familyFriendly: true, notes: 'AVOID during flares. Very gassy and high in insoluble fiber. OK in remission if well-cooked.', tags: ['high-fiber', 'gas'] },
  { id: 'v8', name: 'Cabbage', category: 'Vegetables', flareSafe: false, remissionSafe: false, calories: 25, protein: 1.3, fiber: 2.5, fat: 0.1, textureNote: 'Crunchy, fibrous', triggerRisk: 'Very high (gas, fiber)', familyFriendly: true, notes: 'AVOID. Very gassy and fibrous. Can cause severe bloating and pain.', tags: ['avoid', 'gas'] },
  { id: 'v9', name: 'Onions (raw)', category: 'Vegetables', flareSafe: false, remissionSafe: false, calories: 40, protein: 1.1, fiber: 1.7, fat: 0.1, textureNote: 'Crunchy, pungent', triggerRisk: 'Very high (FODMAPs, irritant)', familyFriendly: true, notes: 'AVOID raw. Cooked onions in small amounts may be OK in remission. Very triggering.', tags: ['avoid', 'FODMAP'] },
  { id: 'v10', name: 'Beans', category: 'Vegetables', flareSafe: false, remissionSafe: false, calories: 127, protein: 8.7, fiber: 6.4, fat: 0.5, textureNote: 'Firm, skins', triggerRisk: 'Very high (insoluble fiber, gas)', familyFriendly: true, notes: 'AVOID. Very high fiber and gas-producing. All legumes are risky for UC.', tags: ['avoid', 'legumes'] },
  { id: 'v11', name: 'Sweetcorn', category: 'Vegetables', flareSafe: false, remissionSafe: false, calories: 86, protein: 3.2, fiber: 2.7, fat: 1.2, textureNote: 'Chewy, skins', triggerRisk: 'Very high (insoluble fiber, skins)', familyFriendly: true, notes: 'AVOID. The skins pass through undigested and can irritate the colon.', tags: ['avoid', 'high-fiber'] },
  { id: 'v12', name: 'Tomatoes', category: 'Vegetables', flareSafe: false, remissionSafe: true, calories: 18, protein: 0.9, fiber: 1.2, fat: 0.2, textureNote: 'Juicy, acidic', triggerRisk: 'Moderate (acidity, seeds)', familyFriendly: true, notes: 'AVOID during flares (acidic, seeds). OK in remission if deseeded and cooked. Some patients tolerate well.', tags: ['acidic'] },

  // FRUITS
  { id: 'f1', name: 'Bananas (ripe)', category: 'Fruits', flareSafe: true, remissionSafe: true, calories: 89, protein: 1.1, fiber: 2.6, fat: 0.3, textureNote: 'Soft, ripe, spotty', triggerRisk: 'Very low', familyFriendly: true, notes: 'One of the safest fruits. Very ripe (spotty) is best. Gentle and binding.', tags: ['staple', 'binding', 'potassium'] },
  { id: 'f2', name: 'Apples (peeled & cooked)', category: 'Fruits', flareSafe: true, remissionSafe: true, calories: 52, protein: 0.3, fiber: 2.4, fat: 0.2, textureNote: 'Soft, peeled, cooked', triggerRisk: 'Low (if peeled & cooked)', familyFriendly: true, notes: 'Always peel and cook until soft. Applesauce is excellent. Raw or unpeeled can trigger.', tags: ['pectin', 'soft'] },
  { id: 'f3', name: 'Papaya', category: 'Fruits', flareSafe: true, remissionSafe: true, calories: 43, protein: 0.5, fiber: 1.7, fat: 0.3, textureNote: 'Soft, ripe', triggerRisk: 'Low', familyFriendly: true, notes: 'Very gentle and digestive. Ripe papaya is excellent for UC. Contains digestive enzymes.', tags: ['digestive-enzymes', 'gentle'] },
  { id: 'f4', name: 'Melon', category: 'Fruits', flareSafe: true, remissionSafe: true, calories: 34, protein: 0.8, fiber: 0.9, fat: 0.2, textureNote: 'Soft, ripe, seedless', triggerRisk: 'Low', familyFriendly: true, notes: 'Cantaloupe, honeydew — very gentle when ripe and seedless. Good for hydration.', tags: ['hydrating', 'gentle'] },
  { id: 'f5', name: 'Applesauce', category: 'Fruits', flareSafe: true, remissionSafe: true, calories: 68, protein: 0.2, fiber: 1.3, fat: 0.2, textureNote: 'Smooth, pureed', triggerRisk: 'Very low', familyFriendly: true, notes: 'Commercial applesauce is often safe. Check for no added sugar or irritants.', tags: ['smooth', 'pureed'] },
  { id: 'f6', name: 'Grapes', category: 'Fruits', flareSafe: false, remissionSafe: false, calories: 69, protein: 0.7, fiber: 0.9, fat: 0.2, textureNote: 'Firm, skins, seeds', triggerRisk: 'Very high (skins, seeds, acidity)', familyFriendly: true, notes: 'AVOID. Skins and seeds are very irritating. Also acidic. Not recommended for UC.', tags: ['avoid', 'skins', 'seeds'] },
  { id: 'f7', name: 'Oranges', category: 'Fruits', flareSafe: false, remissionSafe: false, calories: 47, protein: 0.9, fiber: 2.4, fat: 0.1, textureNote: 'Juicy, acidic, fibrous', triggerRisk: 'Very high (acidity, fiber)', familyFriendly: true, notes: 'AVOID. Very acidic and high in fiber. Can cause severe irritation and diarrhea.', tags: ['avoid', 'acidic'] },
  { id: 'f8', name: 'Dried fruits', category: 'Fruits', flareSafe: false, remissionSafe: false, calories: 300, protein: 2, fiber: 7, fat: 0.5, textureNote: 'Chewy, concentrated', triggerRisk: 'Very high (concentrated fiber, sugar)', familyFriendly: true, notes: 'AVOID. Concentrated fiber and sugar. Very hard to digest and can trigger severe symptoms.', tags: ['avoid', 'concentrated'] },

  // DAIRY
  { id: 'd1', name: 'Lactose-free milk', category: 'Dairy', flareSafe: true, remissionSafe: true, calories: 52, protein: 3.4, fiber: 0, fat: 2, textureNote: 'Liquid, smooth', triggerRisk: 'Low', familyFriendly: true, notes: 'Lactose-free is essential for many UC patients. Regular milk can trigger symptoms.', tags: ['lactose-free', 'calcium'] },
  { id: 'd2', name: 'Lactose-free yoghurt', category: 'Dairy', flareSafe: true, remissionSafe: true, calories: 63, protein: 3.5, fiber: 0, fat: 1.6, textureNote: 'Smooth, creamy', triggerRisk: 'Low', familyFriendly: true, notes: 'Lactose-free yoghurt with live cultures may be beneficial. Avoid regular yoghurt.', tags: ['lactose-free', 'probiotics'] },
  { id: 'd3', name: 'Hard cheeses', category: 'Dairy', flareSafe: true, remissionSafe: true, calories: 402, protein: 25, fiber: 0, fat: 33, textureNote: 'Firm, aged', triggerRisk: 'Low (low lactose)', familyFriendly: true, notes: 'Cheddar, parmesan, swiss — low lactose due to aging. Often well-tolerated.', tags: ['low-lactose', 'protein'] },
  { id: 'd4', name: 'Almond milk (unsweetened)', category: 'Dairy', flareSafe: true, remissionSafe: true, calories: 17, protein: 0.4, fiber: 0.3, fat: 1.5, textureNote: 'Liquid, smooth', triggerRisk: 'Low', familyFriendly: true, notes: 'Good alternative to dairy. Choose unsweetened and carrageenan-free if possible.', tags: ['plant-based', 'dairy-free'] },
  { id: 'd5', name: 'Oat milk', category: 'Dairy', flareSafe: true, remissionSafe: true, calories: 45, protein: 1, fiber: 0.8, fat: 1.5, textureNote: 'Liquid, smooth', triggerRisk: 'Low', familyFriendly: true, notes: 'Gentle alternative. Creamy and mild. Good in coffee and cereal.', tags: ['plant-based', 'dairy-free'] },
  { id: 'd6', name: "Cow's milk", category: 'Dairy', flareSafe: false, remissionSafe: false, calories: 61, protein: 3.2, fiber: 0, fat: 3.3, textureNote: 'Liquid', triggerRisk: 'High (lactose)', familyFriendly: true, notes: 'AVOID. Lactose is often poorly tolerated in UC. Switch to lactose-free alternatives.', tags: ['avoid', 'lactose'] },
  { id: 'd7', name: 'Ice cream', category: 'Dairy', flareSafe: false, remissionSafe: false, calories: 207, protein: 3.5, fiber: 0.7, fat: 11, textureNote: 'Cold, creamy, sugary', triggerRisk: 'Very high (lactose, sugar, fat, cold)', familyFriendly: true, notes: 'AVOID. Lactose, high sugar, high fat, and cold temperature can all trigger symptoms.', tags: ['avoid', 'sugar', 'fat'] },
  { id: 'd8', name: 'Soft cheeses', category: 'Dairy', flareSafe: false, remissionSafe: false, calories: 280, protein: 18, fiber: 0, fat: 23, textureNote: 'Creamy, high moisture', triggerRisk: 'High (lactose, moisture)', familyFriendly: true, notes: 'AVOID. High moisture = high lactose. Brie, camembert, cream cheese are risky.', tags: ['avoid', 'lactose'] },

  // FATS
  { id: 'ft1', name: 'Olive oil', category: 'Fats', flareSafe: true, remissionSafe: true, calories: 884, protein: 0, fiber: 0, fat: 100, textureNote: 'Liquid', triggerRisk: 'Low (small amounts)', familyFriendly: true, notes: 'Use sparingly during flares. Excellent in remission. Anti-inflammatory.', tags: ['anti-inflammatory', 'mediterranean'] },
  { id: 'ft2', name: 'Flaxseed oil', category: 'Fats', flareSafe: false, remissionSafe: true, calories: 884, protein: 0, fiber: 0, fat: 100, textureNote: 'Liquid', triggerRisk: 'Moderate', familyFriendly: true, notes: 'AVOID during flares. Excellent in remission. Omega-3 rich. Do not heat.', tags: ['omega-3', 'anti-inflammatory'] },
  { id: 'ft3', name: 'Coconut oil', category: 'Fats', flareSafe: false, remissionSafe: false, calories: 862, protein: 0, fiber: 0, fat: 100, textureNote: 'Solid or liquid', triggerRisk: 'High (saturated fat)', familyFriendly: true, notes: 'AVOID. High saturated fat can trigger inflammation. Not recommended for UC.', tags: ['avoid', 'saturated-fat'] },
  { id: 'ft4', name: 'Butter', category: 'Fats', flareSafe: false, remissionSafe: false, calories: 717, protein: 0.9, fiber: 0, fat: 81, textureNote: 'Solid, creamy', triggerRisk: 'High (saturated fat, dairy)', familyFriendly: true, notes: 'AVOID. Saturated fat and dairy components can trigger inflammation. Use olive oil instead.', tags: ['avoid', 'saturated-fat'] },

  // BEVERAGES
  { id: 'b1', name: 'Water', category: 'Beverages', flareSafe: true, remissionSafe: true, calories: 0, protein: 0, fiber: 0, fat: 0, textureNote: 'Liquid', triggerRisk: 'None', familyFriendly: true, notes: 'Most important. Stay well-hydrated, especially during flares with loose stools.', tags: ['essential', 'hydration'] },
  { id: 'b2', name: 'Decaffeinated tea', category: 'Beverages', flareSafe: true, remissionSafe: true, calories: 2, protein: 0, fiber: 0, fat: 0, textureNote: 'Liquid, warm', triggerRisk: 'Low', familyFriendly: true, notes: 'Warm and soothing. Avoid regular tea (caffeine).', tags: ['warm', 'soothing'] },
  { id: 'b3', name: 'Peppermint tea', category: 'Beverages', flareSafe: true, remissionSafe: true, calories: 0, protein: 0, fiber: 0, fat: 0, textureNote: 'Liquid, warm, herbal', triggerRisk: 'Low', familyFriendly: true, notes: 'Soothing and calming. Good for digestion. Caffeine-free.', tags: ['herbal', 'soothing'] },
  { id: 'b4', name: 'Clear juices (diluted)', category: 'Beverages', flareSafe: true, remissionSafe: true, calories: 45, protein: 0, fiber: 0, fat: 0, textureNote: 'Liquid, smooth', triggerRisk: 'Low (if diluted)', familyFriendly: true, notes: 'Apple or pear juice, diluted 1:1 with water. Avoid acidic juices (orange, grapefruit).', tags: ['hydration'] },
  { id: 'b5', name: 'Regular coffee', category: 'Beverages', flareSafe: false, remissionSafe: false, calories: 2, protein: 0, fiber: 0, fat: 0, textureNote: 'Liquid, caffeinated', triggerRisk: 'High (caffeine, acidity)', familyFriendly: true, notes: 'AVOID. Caffeine and acidity can trigger diarrhea and irritation. Switch to decaf.', tags: ['avoid', 'caffeine'] },
  { id: 'b6', name: 'Alcohol', category: 'Beverages', flareSafe: false, remissionSafe: false, calories: 70, protein: 0, fiber: 0, fat: 0, textureNote: 'Liquid', triggerRisk: 'Very high (irritant, dehydrating)', familyFriendly: true, notes: 'AVOID. Alcohol is a gut irritant and dehydrating. Can trigger severe flares.', tags: ['avoid', 'irritant'] },
  { id: 'b7', name: 'Fizzy drinks', category: 'Beverages', flareSafe: false, remissionSafe: false, calories: 40, protein: 0, fiber: 0, fat: 0, textureNote: 'Carbonated, sugary', triggerRisk: 'Very high (gas, sugar, additives)', familyFriendly: true, notes: 'AVOID. Carbonation causes gas and bloating. Sugar and additives can trigger symptoms.', tags: ['avoid', 'gas', 'sugar'] },

  // HERBS
  { id: 'h1', name: 'Fresh herbs (mild)', category: 'Herbs', flareSafe: true, remissionSafe: true, calories: 5, protein: 0.3, fiber: 0.5, fat: 0.1, textureNote: 'Soft, mild', triggerRisk: 'Low', familyFriendly: true, notes: 'Parsley, basil, chives — mild herbs in small amounts. Avoid strong spices.', tags: ['mild', 'flavor'] },
  { id: 'h2', name: 'Garlic-infused oil', category: 'Herbs', flareSafe: true, remissionSafe: true, calories: 120, protein: 0, fiber: 0, fat: 14, textureNote: 'Liquid, flavored', triggerRisk: 'Low', familyFriendly: true, notes: 'Good garlic flavor without the FODMAPs. Safe alternative to raw garlic.', tags: ['flavor', 'FODMAP-free'] },
  { id: 'h3', name: 'Spicy seasonings', category: 'Herbs', flareSafe: false, remissionSafe: false, calories: 10, protein: 0.5, fiber: 1, fat: 0.3, textureNote: 'Powder, hot', triggerRisk: 'Very high (irritant)', familyFriendly: true, notes: 'AVOID. Chili, cayenne, hot pepper — all irritants. Can cause severe pain and bleeding.', tags: ['avoid', 'spicy'] },
  { id: 'h4', name: 'Black pepper', category: 'Herbs', flareSafe: false, remissionSafe: true, calories: 6, protein: 0.3, fiber: 0.6, fat: 0.1, textureNote: 'Ground, mild', triggerRisk: 'Moderate', familyFriendly: true, notes: 'AVOID during flares. OK in remission in very small amounts. Can be irritating.', tags: ['mild-spice'] },

  // SNACKS
  { id: 's1', name: 'Rice cakes', category: 'Snacks', flareSafe: true, remissionSafe: true, calories: 35, protein: 0.7, fiber: 0.3, fat: 0.3, textureNote: 'Light, crisp', triggerRisk: 'Low', familyFriendly: true, notes: 'Plain rice cakes are very gentle. Good plain or with a thin layer of smooth peanut butter in remission.', tags: ['light', 'snack'] },
  { id: 's2', name: 'Plain crackers', category: 'Snacks', flareSafe: true, remissionSafe: true, calories: 40, protein: 1, fiber: 0.5, fat: 1.5, textureNote: 'Crisp, plain', triggerRisk: 'Low', familyFriendly: true, notes: 'Plain, unsalted crackers. Very gentle. Good for nausea or when appetite is low.', tags: ['light', 'snack'] },
  { id: 's3', name: 'Smooth peanut butter', category: 'Snacks', flareSafe: false, remissionSafe: true, calories: 588, protein: 25, fiber: 8, fat: 50, textureNote: 'Smooth, creamy', triggerRisk: 'High (fat during flares)', familyFriendly: true, notes: 'AVOID during flares. Good in remission. High protein and healthy fats. Choose smooth, not crunchy.', tags: ['protein', 'healthy-fat'] },
  { id: 's4', name: 'Nuts (all types)', category: 'Snacks', flareSafe: false, remissionSafe: false, calories: 600, protein: 20, fiber: 8, fat: 55, textureNote: 'Hard, crunchy', triggerRisk: 'Very high (fiber, hard texture)', familyFriendly: true, notes: 'AVOID during flares. Small amounts may be OK in remission if very well-tolerated. But generally avoid.', tags: ['avoid', 'high-fiber'] },
  { id: 's5', name: 'Popcorn', category: 'Snacks', flareSafe: false, remissionSafe: false, calories: 387, protein: 13, fiber: 15, fat: 4.5, textureNote: 'Hard, hulls', triggerRisk: 'Very high (insoluble fiber, hulls)', familyFriendly: true, notes: 'AVOID. Hulls and high fiber are very irritating. Can cause blockages and severe pain.', tags: ['avoid', 'high-fiber'] },
];

export function getFoodsByMode(mode: 'flare' | 'remission'): FoodItem[] {
  if (mode === 'flare') {
    return foodDatabase.filter(f => f.flareSafe);
  }
  return foodDatabase.filter(f => f.remissionSafe);
}

export function getFoodsByCategory(category: FoodCategory): FoodItem[] {
  return foodDatabase.filter(f => f.category === category);
}

export function searchFoods(query: string, mode: 'flare' | 'remission'): FoodItem[] {
  const q = query.toLowerCase();
  const base = getFoodsByMode(mode);
  return base.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.tags.some(t => t.toLowerCase().includes(q)) ||
    f.category.toLowerCase().includes(q) ||
    f.notes.toLowerCase().includes(q)
  );
}

export const categories: FoodCategory[] = ['Grains', 'Proteins', 'Vegetables', 'Fruits', 'Dairy', 'Fats', 'Beverages', 'Herbs', 'Snacks'];
