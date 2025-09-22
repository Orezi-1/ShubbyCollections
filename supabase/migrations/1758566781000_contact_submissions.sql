/*
# Contact Form Submissions System

This migration creates the database structure for storing contact form submissions with email notifications and admin management capabilities.

## Query Description: 
Creates a new contact submissions table to store form data from the website. This is a safe operation that only adds new structures without affecting existing data. No backup required as this is purely additive.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: contact_submissions
- Columns: id, name, email, phone, service, message, status, created_at, updated_at
- Constraints: NOT NULL for required fields
- Indexes: Created on email and status for efficient queries

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: Admin access for management

## Performance Impact:
- Indexes: Added on frequently queried columns
- Triggers: None
- Estimated Impact: Minimal performance impact, optimized for read/write operations
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON public.contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (for form submissions)
CREATE POLICY "Allow public to insert submissions" ON public.contact_submissions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users to view their own submissions
CREATE POLICY "Users can view their own submissions" ON public.contact_submissions
    FOR SELECT TO authenticated
    USING (email = auth.jwt() ->> 'email');

-- Admin policy for full access (you'll need to create an admin user)
-- This allows full CRUD operations for admin users
CREATE POLICY "Admin full access" ON public.contact_submissions
    FOR ALL TO authenticated
    USING (
        auth.jwt() ->> 'email' = 'oladepomercy02@gmail.com'
        OR auth.jwt() ->> 'role' = 'admin'
    )
    WITH CHECK (
        auth.jwt() ->> 'email' = 'oladepomercy02@gmail.com'
        OR auth.jwt() ->> 'role' = 'admin'
    );

-- Create a view for admin dashboard statistics
CREATE OR REPLACE VIEW admin_submission_stats AS
SELECT 
    COUNT(*) as total_submissions,
    COUNT(*) FILTER (WHERE status = 'new') as new_submissions,
    COUNT(*) FILTER (WHERE status = 'read') as read_submissions,
    COUNT(*) FILTER (WHERE status = 'replied') as replied_submissions,
    COUNT(*) FILTER (WHERE status = 'archived') as archived_submissions,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_submissions,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_submissions,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as month_submissions
FROM contact_submissions;

-- Grant access to the view
GRANT SELECT ON admin_submission_stats TO authenticated;
