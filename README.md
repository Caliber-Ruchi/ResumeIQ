# ResumeIQ

AI-powered Resume Review platform built with **Next.js 15**, **Gemini AI**, **Supabase**, and **Stripe**.

ResumeIQ analyzes resumes using Google's Gemini models and provides recruiter-style feedback, ATS scores, strengths, weaknesses, missing skills, and recommendations.

---

# Tech Stack

- Next.js 15 (App Router)
- React
- TailwindCSS
- Supabase Authentication
- Supabase Database
- Gemini 2.5 Flash
- pdfjs-dist
- Stripe Checkout
- Vercel Ready

---

# Project Structure

```
app
 ├── api
 │    ├── analyze
 │    ├── checkout
 │    └── webhook
 │
 ├── dashboard
 ├── pricing
 ├── login
 ├── signup
 ├── success
 │
components
 │
 ├── UploadCard
 ├── ScoreCard
 ├── SummaryCard
 ├── SkillsCard
 ├── FeedbackCard
 └── Navbar

lib
 │
 ├── gemini.js
 ├── pdf.js
 ├── prompts.js
 ├── stripe.js
 └── supabase
```

---

# Overall Flow

```
User

↓

Signup/Login

↓

Dashboard

↓

Upload Resume (PDF)

↓

Extract Text (pdfjs)

↓

Gemini AI

↓

Structured JSON

↓

Dashboard Components

Score

ATS

Summary

Skills

Recommendations

↓

Upgrade to Pro

↓

Stripe Checkout

↓

Webhook

↓

Supabase Plan Update
```

---

# Resume Analysis Flow

## 1 Upload

User uploads

```
resume.pdf
```

using React Dropzone.

---

## 2 API

```
POST

/api/analyze
```

receives the PDF.

---

## 3 PDF Extraction

```
extractResumeText()
```

uses

```
pdfjs-dist
```

to extract all text.

Returns

```
Plain Resume Text
```

---

## 4 Gemini

```
reviewResume()
```

sends

```
Prompt

+

Resume Text
```

to Gemini 2.5 Flash.

Gemini returns

```json
{
  "overallScore": 82,
  "atsScore": 78,
  "summary": "...",
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "skillsFound": [],
  "missingSkills": [],
  "sectionScores": {}
}
```

---

## 5 Dashboard

Response is rendered into

- Score Card
- ATS Card
- Summary
- Skills
- Missing Skills
- Recommendations
- Strengths
- Weaknesses

---

# Prompt Design

Prompt forces Gemini to return

ONLY JSON.

It evaluates

- ATS
- Resume Quality
- Formatting
- Projects
- Skills
- Missing Skills
- Recruiter Summary
- Recommendations

---

# Authentication Flow

Supabase Auth

```
Signup

↓

Supabase Auth

↓

auth.users
```

Current implementation also inserts into

```
profiles
```

table.

Schema

```sql
create table profiles (

id uuid primary key references auth.users(id),

email text,

plan text default 'FREE',

created_at timestamptz default now()

);
```

---

# Dashboard

Dashboard currently shows

- Upload Resume
- Resume Score
- ATS Score
- Summary
- Skills
- Missing Skills
- Recommendations

Future improvements

- Review History
- Recent Uploads
- Download Report
- Dark Mode
- Analytics

---

# Stripe Integration

## Current Files

```
lib/stripe.js

app/api/checkout

app/api/webhook

app/pricing

app/success
```

already exist.

---

# Intended Payment Flow

```
FREE USER

↓

Clicks Upgrade

↓

POST /api/checkout

↓

Stripe Checkout Session

↓

Stripe Hosted Payment Page

↓

Successful Payment

↓

Stripe Webhook

↓

Update Supabase

↓

profiles.plan = PRO

↓

Redirect

↓

Dashboard

↓

Unlimited Reviews
```

---

# Checkout Endpoint

Creates

```
Stripe Checkout Session
```

Returns

```
session.url
```

Browser redirects user.

---

# Webhook

Listens for

```
checkout.session.completed
```

Then

```
profiles.plan = "PRO"
```

---

# IMPORTANT

Current project DOES NOT contain

- Stripe Secret Key
- Stripe Publishable Key
- Product
- Price ID
- Webhook Secret

Therefore payment cannot yet function.

---

# Stripe Setup Required

Create

```
ResumeIQ Pro
```

inside Stripe Dashboard.

Price

```
$9.99
```

Copy

```
Price ID
```

---

Add

```
STRIPE_SECRET_KEY

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

STRIPE_WEBHOOK_SECRET
```

to

```
.env.local
```

---

Install Stripe CLI

```
stripe login

stripe listen \
--forward-to localhost:3000/api/webhook
```

Copy

```
Webhook Secret
```

into

```
.env.local
```

---

Checkout Session should include

```
client_reference_id

=

user.id
```

so webhook knows which profile to upgrade.

---

# Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

GEMINI_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_SECRET_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

STRIPE_WEBHOOK_SECRET=
```

---

# Remaining Features

## High Priority

✅ Stripe Payment

✅ Plan Enforcement

✅ Review Limits

✅ Review History

✅ Download PDF Report

✅ Compare Resume with Job Description

---

# Future Features

Resume Builder

Cover Letter Generator

LinkedIn Profile Review

Interview Questions

Skill Gap Analysis

Roadmap Generator

AI Resume Rewrite

Multiple Resume Versions

Resume Templates

Recruiter Mode

---

# Deployment

Deploy

```
Vercel
```

Connect

- GitHub
- Supabase
- Gemini API
- Stripe

Add Environment Variables.

---

# Current Status

Completed

- Authentication
- Dashboard
- Resume Upload
- PDF Parsing
- Gemini Analysis
- Recruiter Feedback
- ATS Analysis
- Pricing Page
- Checkout Endpoint
- Webhook Skeleton
- Responsive UI

Pending

- Stripe API Keys
- Stripe Product
- Stripe Price ID
- Stripe Webhook Testing
- PRO Plan Upgrade
- Review Limits
- Dashboard History
- Job Description Matching

---

# Notes

The payment architecture is already in place.

Only the Stripe configuration and API credentials are missing. Once the Stripe dashboard is configured and the environment variables are added, the checkout flow, webhook, and PRO plan activation can be completed with minimal code changes.
