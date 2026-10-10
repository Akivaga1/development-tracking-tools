import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { djangoApi } from '@/lib/djangoApi';
import { footballSections, initialFootballRecords, FootballRow } from '@/components/footballData';

export type FootballRecords = Record<string, FootballRow[]>;

export interface FootballClubRecord {
  id: string;
  name: string;
  league_position: string;
  records: any;
  revision: number;
  created_at?: string;
  updated_at?: string;
}

const emptyRecords = (): FootballRecords => Object.fromEntries(footballSections.map((s) => [s.id, []]));

function decode(value: any): FootballRecords {
  const output = emptyRecords();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return output;
  for (const section of footballSections) {
    const rows = value[section.id];
    if (Array.isArray(rows)) {
      output[section.id] = rows
        .filter((r) => Boolean(r) && typeof r === 'object' && !Array.isArray(r))
        .map((r) => Object.fromEntries(Object.entries(r).filter(([, v]) => typeof v === 'string')) as FootballRow)
        .filter((r) => Boolean(r.id));
    }
  }
  return output;
}

const LOCAL_STORAGE_KEY = 'dtt_football_clubs_session';

export function useFootballWorkspace() {
  const { user, loading: authLoading } = useAuth();
  const [clubs, setClubs] = useState<FootballClubRecord[]>([]);
  const [id, setId] = useState('');
  const [records, setRecords] = useState<FootballRecords>(initialFootballRecords());
  const [club, setClub] = useState('Club workspace');
  const [league, setLeague] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [dirty, setDirty] = useState(false);

  function apply(row: FootballClubRecord) {
    setId(row.id);
    setClub(row.name);
    setLeague(row.league_position || '');
    setRecords(decode(row.records));
    setRevision(row.revision || 0);
    setDirty(false);
  }

  // Load clubs from Django backend or local session storage
  useEffect(() => {
    let live = true;
    setId('');
    setClubs([]);
    setError('');

    if (!user) {
      // Offline / Session-scoped preview data
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setClubs(parsed);
            apply(parsed[0]);
            return;
          }
        }
      } catch {
        // Fall back to initial records
      }
      setRecords(initialFootballRecords());
      setClub('Club workspace');
      setLeague('');
      setDirty(false);
      return;
    }

    setBusy(true);

    djangoApi
      .getFootballClubs()
      .then((data) => {
        if (!live) return;
        const list = Array.isArray(data) ? data : data?.results || [];
        setClubs(list);
        if (list[0]) {
          apply(list[0]);
        } else {
          setRecords(emptyRecords());
          setClub('My club');
          setLeague('');
        }
      })
      .catch(() => {
        if (!live) return;
        // Fall back to session-scoped storage
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setClubs(parsed);
              apply(parsed[0]);
              return;
            }
          }
        } catch {
          // ignore
        }
        setRecords(initialFootballRecords());
        setClub('My club');
        setLeague('');
      })
      .finally(() => {
        if (live) setBusy(false);
      });

    return () => {
      live = false;
    };
  }, [user?.id]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  async function save(next: FootballRecords = records) {
    if (!club.trim()) {
      setError('Enter a club name before saving.');
      return false;
    }
    if (busy) return false;
    setBusy(true);
    setError('');

    const values = {
      name: club.trim(),
      league_position: league,
      records: next,
    };

    // If no user or backend unreachable, save to session-scoped local storage
    if (!user) {
      const rowId = id || `session-${Date.now()}`;
      const savedRow: FootballClubRecord = {
        id: rowId,
        name: club.trim(),
        league_position: league,
        records: next,
        revision: revision + 1,
      };
      const updatedClubs = clubs.some((c) => c.id === rowId)
        ? clubs.map((c) => (c.id === rowId ? savedRow : c))
        : [...clubs, savedRow];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedClubs));
      setClubs(updatedClubs);
      apply(savedRow);
      setBusy(false);
      return true;
    }

    try {
      let savedRow: FootballClubRecord;
      if (id && !id.startsWith('session-')) {
        savedRow = await djangoApi.updateFootballClub(id, values);
      } else {
        savedRow = await djangoApi.createFootballClub(values);
      }

      apply(savedRow);
      setClubs((prev) =>
        prev.some((c) => c.id === savedRow.id)
          ? prev.map((c) => (c.id === savedRow.id ? savedRow : c))
          : [...prev, savedRow]
      );
      setBusy(false);
      return true;
    } catch {
      // Save locally to preserve workspace without throwing
      const rowId = id || `session-${Date.now()}`;
      const localRow: FootballClubRecord = {
        id: rowId,
        name: club.trim(),
        league_position: league,
        records: next,
        revision: revision + 1,
      };
      const updatedClubs = clubs.some((c) => c.id === rowId)
        ? clubs.map((c) => (c.id === rowId ? localRow : c))
        : [...clubs, localRow];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedClubs));
      setClubs(updatedClubs);
      apply(localRow);
      setBusy(false);
      return true;
    }
  }

  function choose(value: string) {
    if (dirty && !window.confirm('Discard unsaved club changes?')) return;
    setError('');
    const row = clubs.find((c) => c.id === value);
    if (row) {
      apply(row);
    } else {
      setId('');
      setClub('New club');
      setLeague('');
      setRecords(emptyRecords());
      setRevision(0);
      setDirty(true);
    }
  }

  return {
    user,
    clubs,
    id,
    records,
    club,
    league,
    busy: busy || authLoading,
    error,
    dirty,
    save,
    choose,
    setClub: (v: string) => {
      setClub(v);
      setDirty(true);
    },
    setLeague: (v: string) => {
      setLeague(v);
      setDirty(true);
    },
  };
}
