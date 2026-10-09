import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { footballSections, initialFootballRecords, FootballRow } from '@/components/footballData';
import type { Tables, Json } from '@/integrations/supabase/types';
export type FootballRecords = Record<string, FootballRow[]>;
const emptyRecords = (): FootballRecords => Object.fromEntries(footballSections.map(s => [s.id, []]));
function decode(value: Json): FootballRecords {
 const output = emptyRecords();
 if (!value || typeof value !== 'object' || Array.isArray(value)) return output;
 for (const section of footballSections) {
  const rows = value[section.id];
  if (Array.isArray(rows)) output[section.id] = rows.filter((r): r is { [key:string]: Json | undefined } => Boolean(r) && typeof r === 'object' && !Array.isArray(r)).map(r => Object.fromEntries(Object.entries(r).filter(([,v]) => typeof v === 'string')) as FootballRow).filter(r => Boolean(r.id));
 }
 return output;
}
export function useFootballWorkspace() {
 const { user, loading: authLoading } = useAuth();
 const [clubs, setClubs] = useState<Tables<'football_clubs'>[]>([]);
 const [id, setId] = useState('');
 const [records, setRecords] = useState<FootballRecords>(initialFootballRecords);
 const [club, setClub] = useState('Club workspace');
 const [league, setLeague] = useState('');
 const [busy, setBusy] = useState(false);
 const [error, setError] = useState('');
 const [revision, setRevision] = useState(0);
 const [dirty, setDirty] = useState(false);
 function apply(row: Tables<'football_clubs'>) { setId(row.id); setClub(row.name); setLeague(row.league_position); setRecords(decode(row.records)); setRevision(row.revision); setDirty(false); }
 useEffect(() => {
  let live = true;
  setId(''); setClubs([]); setError('');
  if (!user) { setRecords(initialFootballRecords()); setClub('Club workspace'); setLeague(''); setDirty(false); return; }
  setBusy(true);
  supabase.from('football_clubs').select('*').order('created_at').then(({data,error}) => {
   if (!live) return;
   if (error) setError('Could not load saved clubs. Please retry.');
   else { setClubs(data ?? []); if (data?.[0]) apply(data[0]); else { setRecords(emptyRecords()); setClub('My club'); setLeague(''); } }
   setBusy(false);
  });
  return () => { live = false; };
 }, [user?.id]);
 useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
  window.addEventListener('beforeunload', handler); return () => window.removeEventListener('beforeunload', handler);
 }, [dirty]);
 async function save(next: FootballRecords = records) {
  if (!user) { setRecords(next); return true; }
  if (!club.trim()) { setError('Enter a club name before saving.'); return false; }
  if (busy) return false;
  setBusy(true); setError('');
  const values = { name: club.trim(), league_position: league, records: next as unknown as Json };
  const result = id
   ? await supabase.from('football_clubs').update(values).eq('id',id).eq('revision',revision).select().maybeSingle()
   : await supabase.from('football_clubs').insert(values).select().single();
  setBusy(false);
  if (result.error || !result.data) { setError(result.error ? 'Save failed. Your changes are still here; please retry.' : 'This club changed in another window. Reload the club before saving again.'); return false; }
  const row = result.data; apply(row); setClubs(prev => prev.some(c=>c.id===row.id) ? prev.map(c=>c.id===row.id?row:c) : [...prev,row]); return true;
 }
 function choose(value:string) {
  if (dirty && !window.confirm('Discard unsaved club changes?')) return;
  setError('');
  const row = clubs.find(c=>c.id===value);
  if (row) apply(row); else { setId(''); setClub('New club'); setLeague(''); setRecords(emptyRecords()); setRevision(0); setDirty(true); }
 }
 return { user, clubs, id, records, club, league, busy: busy || authLoading, error, dirty, save, choose,
  setClub: (v:string)=>{setClub(v);setDirty(true)}, setLeague:(v:string)=>{setLeague(v);setDirty(true)} };
}
