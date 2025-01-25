-- 1. Data for table 'account'
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
SELECT 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n'
WHERE NOT EXISTS (
    SELECT 1
    FROM public.account
    WHERE account_email = 'tony@starkent.com'
);

-- 2. Data to motify account_type for Tony Stark to admin
UPDATE public.account
Set account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 3. Data to remove Tony Stark from the accounts table
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- 4. Data to modify the discription for the GM Hummer
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_description LIKE '%small interiors%' AND inv_model = 'Hummer';

-- 5. This query retrieves the make and model of inventory items that belong to the "Sport" category. It joins the inventory table and the classification table on the classification_id. Only items with the classification name 'Sport' are returned.
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i 
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6. Data to add '/vehicles' to the middle of the file path for the image and thumbnail
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

