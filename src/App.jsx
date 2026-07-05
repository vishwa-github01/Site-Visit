import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [sites, setSites] = useState([])

  useEffect(() => {
    getSites()
  }, [])

  async function getSites() {
    const { data } = await supabase.from('sites').select('*')
    setSites(data)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Property Visit Tracker</h1>
      <p>If you see this, Supabase is connected ✅</p>
    </div>
  )
}

export default App  // <-- THIS LINE WAS MISSING
