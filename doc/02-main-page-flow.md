# 02 - Main Page Flow: App.jsx

File: `src/App.jsx`
This is the only page. It conditionally renders Login or Dashboard.

## App State
`user`: null or logged-in user object from Supabase Auth
`sites`: Array of all rows from `sites` table
`form fields`: siteName, address, visitDate, notes, photo
`login fields`: email, password, error

## Function Call Flow

1.  **On Load**
    `useEffect()` -> runs once
    1. `getSites()` -> `supabase.from('sites').select('*')` -> loads all visits
    2. `supabase.auth.getSession()` -> checks if user is already logged in

2.  **If user == null: Show Login UI**
    `form onSubmit={signIn}`
    `signIn()` -> `supabase.auth.signInWithPassword({email, password})`
    On Success: `window.location.reload()` -> triggers useEffect again
    On Error: sets `error` state and shows message

3.  **If user != null: Show Dashboard UI**
    `form onSubmit={addSite}`
    `addSite()` -> 
        Step A: `supabase.storage.from('site-photos').upload()` -> uploads image
        Step B: `getPublicUrl()` -> gets image URL
        Step C: `supabase.from('sites').insert()` -> inserts new row with photo_url + user_id
        Step D: `getSites()` -> refreshes the list
    
    `button onClick={deleteSite}`
    `deleteSite(id)` -> `supabase.from('sites').delete().eq('id', id)`

4.  **Logout**
    `button onClick={signOut}`
    `signOut()` -> `supabase.auth.signOut()`
