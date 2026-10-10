# Football Management
- [x] Add all ten football management areas with editable records and linked summaries.
- [x] Integrate in Organizational Tools without changing existing modules.
- [x] Verify navigation, record creation, editing, reporting, and preview health.
- [x] Persist private club workspaces via Django REST API (`/api/v1/football/clubs/`) with session-scoped localStorage fallback.
- [ ] Export football reports as downloadable PDFs.
- [ ] Verify saved records survive refresh and inspect exported PDFs.

# Backend (Django REST Framework)
- [x] All Supabase integrations removed. Auth, Football, OKR, Community, FaithFlow, DTT Remote wired to Django.
- [x] `GET/POST /api/v1/organizational/okr/objectives/` - OKR planning with nested Key Results
- [x] `GET/POST /api/v1/organizational/remote/timesheets/` - DTT Remote timesheets + weekly summary
- [x] `GET/POST /api/v1/organizational/community/groups/` - Community group journaling
- [x] `GET/POST /api/v1/organizational/community/faithflow/` - FaithFlow spiritual tracking + streak count
- [x] `POST /api/v1/personal/voice-analysis/` - Voice tone emotion analysis (pitch/volume/tempo)
- [x] `GET /api/v1/finance/subscriptions/plans/` - Subscription plan listing
- [x] `POST /api/v1/finance/payments/stripe/checkout/` - Stripe checkout session
- [x] `POST /api/v1/finance/payments/mpesa/stkpush/` - M-Pesa STK Push