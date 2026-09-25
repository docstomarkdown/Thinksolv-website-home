import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VerifyPage.css';

// Where a scanned ID card asks whether it is genuine: the Thinksolv workspace, which knows who works here. VITE_WORKSPACE_URL points at
// another copy of it (a local one while developing); otherwise it is the live one.
const API_BASE = (import.meta.env.VITE_WORKSPACE_URL || 'https://workspace.thinksolv.com').replace(/\/+$/, '');

const CHECK = (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.2 4.2L19 7" />
  </svg>
);
const CROSS = (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const DASH = (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12h12" />
  </svg>
);

const VerifyPage = () => {
  const { token } = useParams();
  const [attempt, setAttempt] = useState(0);
  // What the last request found, and which request that was, so a new token or a retry reads as loading again without a state reset
  // inside the effect.
  const [result, setResult] = useState({ key: null, outcome: null, person: null, checkedAt: null });
  // The request whose photo failed to load, so the space closes up instead of showing a broken image.
  const [photoFailedFor, setPhotoFailedFor] = useState(null);
  const key = `${token}#${attempt}`;

  // A card's address carries a token; keep the page out of search engines and out of history exports.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = 'Verify employment | Thinksolv';
    return () => {
      document.head.removeChild(meta);
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/id-verify/${encodeURIComponent(token)}`, { signal: controller.signal, headers: { Accept: 'application/json' }, cache: 'no-store' })
      .then(async (response) => {
        // A token that belongs to nobody is a real answer (404); anything else that is not a success is a fault on our side, which is a
        // different message: it must never look like a fake card.
        if (response.status === 404) return setResult({ key, outcome: 'invalid', person: null, checkedAt: new Date() });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const body = await response.json();
        if (!body.valid) return setResult({ key, outcome: 'invalid', person: null, checkedAt: new Date() });
        return setResult({ key, outcome: 'found', person: body, checkedAt: new Date() });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ key, outcome: 'error', person: null, checkedAt: new Date() });
      });
    return () => controller.abort();
  }, [token, key]);

  const loading = result.key !== key;
  const { outcome, person, checkedAt } = result;
  const employed = outcome === 'found' && person.status === 'EMPLOYED';
  // Only for someone currently employed (the API says so with hasPhoto): the point is to compare a face with the card's holder.
  const showPhoto = employed && person.hasPhoto === true && photoFailedFor !== key;

  let tone = 'loading';
  let icon = null;
  let heading = 'Checking this card…';
  let lead = 'One moment while we confirm it with Thinksolv.';
  if (!loading) {
    if (employed) {
      tone = 'ok';
      icon = CHECK;
      heading = 'Verified';
      lead = `This card is genuine and the holder is currently employed at ${person.company}.`;
    } else if (outcome === 'found') {
      tone = 'warn';
      icon = DASH;
      heading = 'Not currently employed';
      lead = `This card is genuine, but the holder is not currently employed at ${person.company}.`;
    } else if (outcome === 'invalid') {
      tone = 'bad';
      icon = CROSS;
      heading = "We couldn't verify this card";
      lead = "This code isn't recognised. If you were handed this card, please contact Thinksolv to confirm who it belongs to.";
    } else {
      tone = 'warn';
      icon = DASH;
      heading = "Verification isn't available right now";
      lead = "We couldn't reach the verification service. This doesn't mean the card is invalid — please try again in a moment.";
    }
  }

  return (
    <div className="verify-page">
      <div className={`verify-card verify-${tone}`} role="status" aria-live="polite" aria-busy={loading}>
        <div className="verify-badge" aria-hidden="true">{icon}</div>
        <p className="verify-eyebrow">Employment verification</p>
        <h1 className="verify-heading">{heading}</h1>
        <p className="verify-lead">{lead}</p>

        {!loading && showPhoto && (
          <figure className="verify-photo-figure">
            <img
              className="verify-photo"
              src={`${API_BASE}/api/id-verify/${encodeURIComponent(token)}/photo`}
              alt={`Photo of ${person.name}`}
              width="112"
              height="112"
              onError={() => setPhotoFailedFor(key)}
            />
            <figcaption className="verify-photo-hint">Compare this photo with the person holding the card.</figcaption>
          </figure>
        )}

        {!loading && outcome === 'found' && (
          <dl className="verify-details">
            <div className="verify-row"><dt>Name</dt><dd>{person.name}</dd></div>
            <div className="verify-row"><dt>Employee ID</dt><dd>{person.employeeId}</dd></div>
            <div className="verify-row"><dt>Designation</dt><dd>{person.designation}</dd></div>
            <div className="verify-row"><dt>Company</dt><dd>{person.company}</dd></div>
          </dl>
        )}

        {!loading && outcome === 'error' && (
          <button type="button" className="verify-retry" onClick={() => setAttempt((n) => n + 1)}>Try again</button>
        )}

        {!loading && checkedAt && outcome !== 'error' && (
          <p className="verify-checked">Checked {checkedAt.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
        )}
      </div>
      <p className="verify-foot">This page only confirms who a card belongs to and whether they are currently employed. It never shows contact details.</p>
    </div>
  );
};

export default VerifyPage;
