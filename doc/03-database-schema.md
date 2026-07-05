# 03 - Database Schema

Database: Supabase Postgres
Table Name: `sites`

## Columns
| Column | Type | Notes |
| --- | --- | --- |
| id | int8 | Primary Key, Auto Increment |
| created_at | timestamptz | Auto set by Supabase |
| site_name | text | Required. Name of property |
| address | text | Optional |
| visit_date | date | Optional |
| notes | text | Optional |
| photo_url | text | URL from Supabase Storage |
| user_id | uuid | ID of user who created it. Links to auth.users.id |

## SQL to Create/Update Table
```sql
alter table sites add column photo_url text;
alter table sites add column user_id uuid;
