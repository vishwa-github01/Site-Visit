import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {
  const [sites, setSites] = useState([])
  const [siteName, setSiteName] = useState('')
  const [address, setAddress] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getSites()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user?? null)
    })
  }, [])

  async function getSites() {
    const { data } = await supabase.from('sites').select('*').order('created_at', { ascending: false })
    setSites(data)
  }

  async function addSite(e) {
    e.preventDefault()
    let photoUrl = ''
    if (photo) {
      const fileName = `${Date.now()}-${photo.name}`
      const { data } = await supabase.storage.from('site-photos').upload(fileName, photo)
      photoUrl = supabase.storage.from('site-photos').getPublicUrl(fileName).data.publicUrl
    }
    await supabase.from('sites').insert([{ 
      site_name: siteName, address, visit_date: visitDate, notes, photo_url: photoUrl, user_id: user?.id 
    }])
    setSiteName(''); setAddress(''); setVisitDate(''); setNotes(''); setPhoto(null)
    getSites()
  }

  async function deleteSite(id) {
    await supabase.from('sites').delete().eq('id', id)
    getSites()
  }

  async function signIn() {
    await supabase.auth.signInWithPassword({ email: 'your-email@gmail.com', password: 'your-password' })
    window.location.reload()
  }

  if (!user) return <div style={{padding:20}}><h2>Login Required</h2><button onClick={signIn}>Login</button></div>

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Property Visit Tracker</h1>
      <p>Logged in as: {user.email}</p>
      
      <form onSubmit={addSite} style={{border:'1px solid #ccc', padding:15, borderRadius:8}}>
        <h3>Add New Visit</h3>
        <input placeholder="Site Name" value={siteName} onChange={e => setSiteName(e.target.value)} required /><br/><br/>
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} /><br/><br/>
        <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} /><br/><br/>
        <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} /><br/><br/>
        <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} /><br/><br/>
        <button type="submit">Save Visit</button>
      </form>

      <h3 style={{marginTop:30}}>Previous Visits</h3>
      {sites.map(site => (
        <div key={site.id} style={{border:'1px solid #ddd', padding:10, marginBottom:10, borderRadius:8}}>
          <h4>{site.site_name}</h4>
          <p>{site.address} | {site.visit_date}</p>
          <p>{site.notes}</p>
          {site.photo_url && <img src={site.photo_url} width="200" />}<br/>
          <button onClick={() => deleteSite(site.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
