CREATE TABLE public.football_clubs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 owner_id uuid NOT NULL DEFAULT auth.uid(),
 name text NOT NULL CHECK (length(trim(name)) > 0),
 league_position text NOT NULL DEFAULT '',
 records jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(records) = 'object'),
 revision integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.football_clubs TO authenticated;
GRANT ALL ON public.football_clubs TO service_role;
ALTER TABLE public.football_clubs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage their football clubs" ON public.football_clubs FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE INDEX football_clubs_owner_idx ON public.football_clubs(owner_id);
CREATE FUNCTION public.touch_football_club() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); NEW.revision = OLD.revision + 1; RETURN NEW; END; $$;
CREATE TRIGGER touch_football_club BEFORE UPDATE ON public.football_clubs FOR EACH ROW EXECUTE FUNCTION public.touch_football_club();