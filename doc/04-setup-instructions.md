
### **4. `/doc/04-setup-instructions.md`**
Download: Copy and save as `04-setup-instructions.md`
```markdown
# 04 - Setup Instructions

## 1. Supabase Setup
1.  Create Project: `site-tracker`
2.  Create Table: `sites` with columns above
3.  Create Storage Bucket: `site-photos`. Set to Public
4.  Create User: `Authentication > Users > Add user`. Use this email/pass for login
5.  Get Keys: `Project Settings > API`. Copy `Project URL` and `anon public` key

## 2. Vercel Setup
1.  Import GitHub Repo: `vishwa-github01/Site-Visit`
2.  Add Env Vars:
    `VITE_SUPABASE_URL` = your project url
    `VITE_SUPABASE_ANON_KEY` = your anon key
3.  Deploy

## 3. Local Dev
```bash
npm install
npm run dev
