-- Step 1: Allow the "category" column to be nullable
ALTER TABLE "Book" ALTER COLUMN "category" DROP NOT NULL;

-- Step 2: Add the new "category_new" column with the enum type
ALTER TABLE "Book" ADD COLUMN "category_new" "Category";

-- Step 3: Update existing rows that have invalid enum values
UPDATE "Book" SET "category" = 'HISTORY' WHERE "category" = 'history';  -- Fix lowercase value if exists
UPDATE "Book" SET "category" = 'SCIENCE' WHERE "category" = 'science';  -- Add more if necessary
UPDATE "Book" SET "category" = 'ART' WHERE "category" = 'art';
UPDATE "Book" SET "category" = 'LITERATURE' WHERE "category" = 'literature';

-- Step 4: Migrate the data to the new column
UPDATE "Book" SET "category_new" = "category"::"Category";

-- Step 5: Drop the old "category" column
ALTER TABLE "Book" DROP COLUMN "category";

-- Step 6: Rename the new column to "category"
ALTER TABLE "Book" RENAME COLUMN "category_new" TO "category";
