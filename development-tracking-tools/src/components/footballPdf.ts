import { PDFDocument, PDFFont, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { footballSections, FootballRow } from './footballData';
export async function createFootballPdf(club: string, league: string, records: Record<string,FootballRow[]>, active: string, summary: string[][], search = '') {
 const doc = await PDFDocument.create(); doc.registerFontkit(fontkit);
 const responses = await Promise.all(['/fonts/DejaVuSans.ttf','/fonts/DejaVuSans-Bold.ttf'].map(url=>fetch(url)));
 if(responses.some(r=>!r.ok)) throw new Error('Report fonts could not be loaded.');
 const fonts = await Promise.all(responses.map(async r=>doc.embedFont(await r.arrayBuffer(),{subset:true})));
 const [normal,bold] = fonts;
 doc.setTitle(`${club} — Football Management`); doc.setAuthor('DT Tools');
 const ink=rgb(0.12,0.12,0.12), muted=rgb(0.35,0.35,0.35);
 let page = doc.addPage([595.28,841.89]); let y=790;
 const newPage=()=>{page=doc.addPage([595.28,841.89]);y=790;};
 function text(value:string,size=10,font:PDFFont=normal) {
  for (const paragraph of value.split(/\r?\n/)) {
   let line=''; const lines:string[]=[];
   // Character-based wrapping also handles unbroken words and long imported reports.
   for(const char of paragraph.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'')) {
    if(line && font.widthOfTextAtSize(line+char,size)>495) {lines.push(line);line=char;} else line+=char;
   }
   lines.push(line);
   for(const l of lines){if(y<65)newPage();if(l)page.drawText(l,{x:50,y,size,font,color:ink});y-=size*1.5;}
  }
 }
 text('DT Tools · Football Management',11,bold);y-=12; text(club,22,bold);text(active==='overview'||active==='board'?'Club performance report':footballSections.find(s=>s.id===active)?.title??'Report',14,bold);
 text(`Generated ${new Date().toLocaleDateString('en-GB')} · League position: ${league||'Not set'}`,9);y-=16;
 for(const [label,value] of summary) text(`${label}: ${value}`,11);
 y-=16;
 const entries=active==='overview'||active==='board'?footballSections:footballSections.filter(s=>s.id===active);
 for(const s of entries){if(y<150)newPage();text(s.title,14,bold);y-=8;
 const rows=(records[s.id]??[]).filter(r=>!search||Object.entries(r).some(([k,v])=>k!=='id'&&v.toLowerCase().includes(search.toLowerCase())));
 if(!rows.length)text('No records.',10);
 for(const r of rows){if(y<120)newPage();text(r.name||'Unnamed record',11,bold);for(const f of s.fields.filter(f=>f.key!=='name'))text(`${f.label}: ${r[f.key]||'—'}`);y-=12;} y-=16;
 }
 for(const [index,p] of doc.getPages().entries())p.drawText(`DT Tools · ${index+1} / ${doc.getPageCount()}`,{x:50,y:30,size:8,font:normal,color:muted});
 return doc.save();
}
export async function downloadFootballPdf(...args: Parameters<typeof createFootballPdf>) {
 const bytes=await createFootballPdf(...args);const url=URL.createObjectURL(new Blob([new Uint8Array(bytes)],{type:'application/pdf'}));const a=document.createElement('a');a.href=url;a.download=`${args[0].replace(/[^a-z0-9]+/gi,'-')||'club'}-football-report.pdf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
