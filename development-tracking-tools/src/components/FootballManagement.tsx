import React, { useState } from 'react';
import { ArrowLeft, Trophy, Plus, Search, Pencil, Trash2, Download, Printer, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { footballSections, initialFootballRecords, FootballRow } from './footballData';

export function FootballManagement({ onBack }: { onBack: () => void }) {
 const [records,setRecords]=useState(initialFootballRecords);
 const [active,setActive]=useState('overview');
 const [search,setSearch]=useState('');
 const [draft,setDraft]=useState<FootballRow|null>(null);
 const [remove,setRemove]=useState<FootballRow|null>(null);
 const [notice,setNotice]=useState('');
 const [club,setClub]=useState('Club workspace');
 const [league,setLeague]=useState('');
 const section=footballSections.find(s=>s.id===active);
 const rows=(records[active]??[]).filter(row=>Object.entries(row).some(([key,value])=>key!=='id'&&value.toLowerCase().includes(search.toLowerCase())));
 const sum=(id:string,key:string)=> (records[id]??[]).reduce((n,r)=>n+(Number(r[key])||0),0);
 const income=(records.finance??[]).filter(r=>r.type==='Income').reduce((n,r)=>n+(Number(r.amount)||0),0);
 const expense=(records.finance??[]).filter(r=>r.type==='Expense').reduce((n,r)=>n+(Number(r.amount)||0),0);
 const injured=(records.medical??[]).filter(r=>r.status!=='Cleared');
 const money=(n:number)=>`KES ${n.toLocaleString()}`;
 const metrics=[['Squad players',String(records.players.length)],['Goals / assists',`${sum('players','goals')} / ${sum('players','assists')}`],['Income less expenses',money(income-expense)],['In recovery',String(injured.length)]];
 const select=(id:string)=>{setActive(id);setSearch('');};
 const exportReport=()=>{
  const entries=active==='overview'||active==='board'?footballSections:footballSections.filter(s=>s.id===active);
  const csv=[['Section','Record','Field','Value'],...entries.flatMap(s=>records[s.id].flatMap(r=>s.fields.map(f=>[s.title,r.name,f.label,r[f.key]??''])))].map(line=>line.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='football-management-report.csv';link.click();URL.revokeObjectURL(url);setNotice('Report exported.');
 };
 return <div className="min-h-screen bg-background text-foreground">
 <header className="border-b bg-card print:hidden"><div className="container mx-auto p-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
 <div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Back to Organizational Tools" onClick={onBack}><ArrowLeft/></Button><Trophy className="h-7 w-7 text-primary"/><div><h1 className="text-xl md:text-2xl font-bold">Football Management</h1><p className="text-sm text-muted-foreground">Club command centre</p></div></div>
 <div className="flex flex-wrap gap-2"><Badge variant="secondary">Preview · sample records</Badge><Button variant="outline" onClick={exportReport}><Download/>Export CSV</Button><Button variant="outline" onClick={()=>window.print()}><Printer/>Print report</Button></div>
 </div></header>
 <div className="container mx-auto p-4 md:p-6">
 <div className="flex flex-wrap gap-4 mb-6 print:hidden"><div className="flex-1 min-w-48"><Label htmlFor="club-name">Club / academy / league</Label><Input id="club-name" value={club} onChange={e=>setClub(e.target.value)}/></div><div className="w-48"><Label htmlFor="league-position">League position</Label><Input id="league-position" type="number" min="1" value={league} onChange={e=>setLeague(e.target.value)}/></div></div>
 <div className="grid lg:grid-cols-[230px_minmax(0,1fr)] gap-6">
 <nav aria-label="Football management sections" className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible print:hidden">
 {[{id:'overview',title:'Overview'},...footballSections,{id:'board',title:'Board Reporting'}].map(s=><Button key={s.id} variant={active===s.id?'default':'ghost'} className="justify-start shrink-0 whitespace-normal text-left h-auto min-h-11" aria-current={active===s.id?'page':undefined} onClick={()=>select(s.id)}>{s.title}</Button>)}
 </nav>
 <main className="min-w-0 space-y-6">
 <div role="status" aria-live="polite" className="text-sm text-muted-foreground">{notice}</div>
 {(active==='overview'||active==='board')?<>
 <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">{active==='board'?'Board report':'Club overview'} · {club}</h2>{league&&<Badge variant="outline">League position: {league}</Badge>}</div>
 <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{metrics.map(([title,value])=><Card key={title}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="text-2xl font-bold mt-2 break-words">{value}</p></CardContent></Card>)}</div>
 <section><h3 className="font-semibold mb-3">Strategic targets</h3><div className="space-y-4">{records.goals.map(g=>{const pct=Number(g.target)>0?Math.min(100,Math.round(Number(g.current)/Number(g.target)*100)):0;return <div key={g.id} className="border-b pb-4"><div className="flex flex-wrap justify-between gap-2 mb-2"><span>{g.name}</span><span className="text-sm text-muted-foreground">{g.current} / {g.target} · {g.status}</span></div><Progress aria-label={`${g.name} progress`} value={pct}/><p className="text-sm text-muted-foreground mt-2">{g.milestones}</p></div>})}</div></section>
 <div className="grid md:grid-cols-2 gap-6"><section><h3 className="font-semibold mb-3">Financial health</h3>{[['Income',income],['Expenses',expense],['Academy budget',(records.finance??[]).filter(r=>r.type==='Budget'&&r.category==='Academy').reduce((n,r)=>n+Number(r.amount||0),0)]].map(([label,value])=><div key={String(label)} className="flex justify-between border-b py-3 gap-3"><span>{label}</span><strong>{money(Number(value))}</strong></div>)}</section><section><h3 className="font-semibold mb-3">Squad availability</h3>{injured.map(r=><div key={r.id} className="border-b py-3"><p>{r.name} · {r.injury}</p><p className="text-sm text-muted-foreground">{r.status} · return: {r.returnDate||'Not set'} · {r.progress}% recovered</p></div>)}{injured.length===0&&<p>No open recovery records.</p>}</section></div>
 <section><h3 className="font-semibold mb-3">Team results & community impact</h3><div className="grid sm:grid-cols-3 gap-4"><p>Match reports: <strong>{records.matches.length}</strong></p><p>Community attendance: <strong>{sum('community','attendance')}</strong></p><p>Academy prospects: <strong>{records.academy.length}</strong></p></div></section>
 {active==='overview'&&<section className="flex gap-3 p-4 border rounded-lg bg-muted"><ShieldCheck className="text-primary shrink-0"/><p className="text-sm text-muted-foreground">Sample data. Changes last while this workspace stays open. Medical clearance must be confirmed by the club clinician.</p></section>}
 </>:section&&<>
 <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">{section.title}</h2><Button onClick={()=>setDraft({id:crypto.randomUUID(),...Object.fromEntries(section.fields.map(f=>[f.key,f.options?.[0]??'']))})}><Plus/>Add {section.singular.toLowerCase()}</Button></div>
 <div className="relative print:hidden"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input aria-label={`Search ${section.title}`} className="pl-10" placeholder="Search records…" value={search} onChange={e=>setSearch(e.target.value)}/></div>
 <p className="text-sm text-muted-foreground">{rows.length} records</p>
 <div className="grid xl:grid-cols-2 gap-4">{rows.map(row=><Card key={row.id}><CardContent className="p-5"><div className="flex justify-between items-start gap-3 mb-4"><h3 className="font-semibold text-lg">{row.name}</h3><div className="flex shrink-0 gap-1 print:hidden"><Button variant="ghost" size="icon" aria-label={`Edit ${row.name}`} onClick={()=>setDraft({...row})}><Pencil className="h-4 w-4"/></Button><Button variant="ghost" size="icon" aria-label={`Delete ${row.name}`} onClick={()=>setRemove(row)}><Trash2 className="h-4 w-4"/></Button></div></div><dl className="grid sm:grid-cols-2 gap-3">{section.fields.filter(f=>f.key!=='name').map(f=><div key={f.key} className={f.type==='textarea'?'sm:col-span-2':''}><dt className="text-xs text-muted-foreground">{f.label}</dt><dd className="text-sm mt-1 whitespace-pre-wrap break-words">{row[f.key]||'—'}</dd></div>)}</dl>{active==='medical'&&<Progress className="mt-4" value={Number(row.progress)||0} aria-label="Recovery progress"/>}</CardContent></Card>)}</div>
 {!rows.length&&<p className="border rounded-lg p-8 text-center text-muted-foreground">No records found.</p>}
 </>}
 </main></div></div>
 <Dialog open={Boolean(draft)} onOpenChange={open=>{if(!open)setDraft(null)}}><DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{section?.singular} details</DialogTitle><DialogDescription>{section?.title}</DialogDescription></DialogHeader>{draft&&section&&<form onSubmit={e=>{e.preventDefault();setRecords(prev=>({...prev,[active]:prev[active].some(r=>r.id===draft.id)?prev[active].map(r=>r.id===draft.id?draft:r):[...prev[active],draft]}));setNotice(`${section.singular} saved.`);setDraft(null)}} className="space-y-4"><div className="grid sm:grid-cols-2 gap-4">{section.fields.map(f=><div key={f.key} className={f.type==='textarea'?'sm:col-span-2':''}><Label htmlFor={`football-${f.key}`}>{f.label}</Label>{f.type==='select'?<select id={`football-${f.key}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={draft[f.key]??''} onChange={e=>setDraft({...draft,[f.key]:e.target.value})}>{f.options?.map(o=><option key={o}>{o}</option>)}</select>:f.type==='textarea'?<Textarea id={`football-${f.key}`} value={draft[f.key]??''} onChange={e=>setDraft({...draft,[f.key]:e.target.value})}/>:<Input id={`football-${f.key}`} required={f.key==='name'} type={f.type??'text'} min={f.type==='number'?0:undefined} max={['fitness','attendance','productivity','skills','readiness','progress','possession','setPieces','rating'].includes(f.key)?100:undefined} value={draft[f.key]??''} onChange={e=>setDraft({...draft,[f.key]:e.target.value})}/>}</div>)}</div>{active==='matches'&&<div><Label htmlFor="match-report-upload">Import match report (.txt)</Label><Input id="match-report-upload" type="file" accept="text/plain,.txt" onChange={async e=>{const file=e.target.files?.[0];if(file){const text=await file.text();setDraft(prev=>prev?{...prev,report:text}:prev)}}}/></div>}<div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={()=>setDraft(null)}>Cancel</Button><Button type="submit">Save record</Button></div></form>}</DialogContent></Dialog>
 <Dialog open={Boolean(remove)} onOpenChange={open=>{if(!open)setRemove(null)}}><DialogContent><DialogHeader><DialogTitle>Delete {remove?.name}?</DialogTitle><DialogDescription>This removes the record from this workspace.</DialogDescription></DialogHeader><div className="flex justify-end gap-2"><Button variant="outline" onClick={()=>setRemove(null)}>Cancel</Button><Button variant="destructive" onClick={()=>{if(remove)setRecords(prev=>({...prev,[active]:prev[active].filter(r=>r.id!==remove.id)}));setRemove(null);setNotice('Record deleted.')}}>Delete record</Button></div></DialogContent></Dialog>
 </div>;
}
