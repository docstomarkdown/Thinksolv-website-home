import React, { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import '../styles/LeavePage.css';

// Where a team member applies for leave when they are not on the workspace (a phone, a personal laptop). Employee ID and the security PIN
// from their Thinksolv Settings say who is asking; this site's server checks reCAPTCHA and passes it on (server/leaveHandler.js).
const API_ENDPOINT = import.meta.env.VITE_LEAVE_API_ENDPOINT || '/api/leave-apply';

const LeavePage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form, setForm] = useState({ employeeId: '', securityPin: '', fromDate: '', toDate: '', dayPart: 'FULL', reason: '' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const multiDay = form.fromDate !== '' && form.toDate !== '' && form.toDate !== form.fromDate;

  // Not for search engines; the address is given to the team.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = 'Apply for leave | Thinksolv';
    return () => {
      document.head.removeChild(meta);
      document.title = previousTitle;
    };
  }, []);

  const set = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (!executeRecaptcha) {
      setError('The security check is not ready. Please refresh the page and try again.');
      return;
    }
    setPending(true);
    try {
      const captcha = await executeRecaptcha('leave_apply');
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, dayPart: multiDay ? 'FULL' : form.dayPart, captcha }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Something went wrong. Please try again.');
      setDone(result.message || 'Leave requested — waiting for approval.');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      // A wrong PIN is not kept in the box.
      setForm((current) => ({ ...current, securityPin: '' }));
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="leave-page">
        <div className="leave-card leave-done" role="status">
          <h1 className="leave-heading">Sent</h1>
          <p className="leave-lead">{done}</p>
          <p className="leave-lead">Your manager has been asked to approve it, and your team has been told.</p>
          <button
            type="button"
            className="leave-button leave-button-secondary"
            onClick={() => {
              setDone('');
              setForm((current) => ({ ...current, securityPin: '', fromDate: '', toDate: '', dayPart: 'FULL', reason: '' }));
            }}
          >
            Apply for another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leave-page">
      <form className="leave-card" onSubmit={submit}>
        <h1 className="leave-heading">Apply for leave</h1>
        <p className="leave-lead">Your manager is asked to approve it, and your team is told.</p>

        <label className="leave-field">
          <span>Employee ID</span>
          <input type="text" required autoComplete="off" autoCapitalize="characters" placeholder="TS-004" maxLength={20} value={form.employeeId} onChange={set('employeeId')} disabled={pending} />
        </label>
        <label className="leave-field">
          <span>Security PIN</span>
          <input type="password" inputMode="numeric" pattern="\d{6}" maxLength={6} required autoComplete="off" placeholder="6 digits" value={form.securityPin} onChange={set('securityPin')} disabled={pending} />
          <small>The PIN you set in Thinksolv Settings.</small>
        </label>
        <div className="leave-dates">
          <label className="leave-field">
            <span>From</span>
            <input type="date" required value={form.fromDate} onChange={set('fromDate')} disabled={pending} />
          </label>
          <label className="leave-field">
            <span>To</span>
            <input type="date" min={form.fromDate || undefined} value={form.toDate} onChange={set('toDate')} disabled={pending} />
          </label>
        </div>
        <label className="leave-field">
          <span>Duration</span>
          <select value={multiDay ? 'FULL' : form.dayPart} onChange={set('dayPart')} disabled={pending || multiDay}>
            <option value="FULL">{multiDay ? 'Full days' : 'Full day'}</option>
            <option value="FIRST_HALF">First half (morning)</option>
            <option value="SECOND_HALF">Second half (afternoon)</option>
          </select>
        </label>
        <label className="leave-field">
          <span>Reason (optional)</span>
          <textarea rows={2} maxLength={500} value={form.reason} onChange={set('reason')} disabled={pending} />
        </label>

        {error && <p className="leave-error" role="alert">{error}</p>}
        <button type="submit" className="leave-button" disabled={pending} aria-busy={pending}>
          {pending ? 'Sending…' : 'Apply for leave'}
        </button>
        <p className="leave-foot">Protected by reCAPTCHA. Only Thinksolv team members can apply.</p>
      </form>
    </div>
  );
};

export default LeavePage;
