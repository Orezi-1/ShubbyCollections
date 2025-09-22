/*
# [SECURITY FIX] Alter View to Security Invoker
This migration updates the `admin_submission_stats` view to use `SECURITY INVOKER` permissions. This is a critical security update to ensure that Row Level Security (RLS) policies are always enforced for any user querying this view.

## Query Description:
- The view will now execute with the permissions of the user calling it, not the user who created it.
- This prevents potential data leaks by ensuring RLS is never bypassed.
- This change is safe and does not affect existing data.

## Metadata:
- Schema-Category: "Security"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Modifies: VIEW `public.admin_submission_stats`

## Security Implications:
- RLS Status: Enforces RLS correctly.
- Policy Changes: No.
- Auth Requirements: Correctly uses the caller's authentication context.

## Performance Impact:
- Indexes: None.
- Triggers: None.
- Estimated Impact: Negligible performance impact. The primary change is in security context.
*/

ALTER VIEW public.admin_submission_stats SET (security_invoker = true);
