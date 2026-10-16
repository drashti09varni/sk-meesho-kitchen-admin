(() => {
  const $ = id => document.getElementById(id);
  let config, draft = [], dirty = false, busy = false;

  function notice(message, error = false) {
    $('notice').textContent = message;
    $('notice').className = error ? 'error' : '';
  }
  function signedIn(value) {
    $('login-panel').hidden = value;
    $('dashboard').hidden = !value;
    $('logout').hidden = !value;
    if (!value) { config = undefined; draft = []; dirty = false; $('profiles').replaceChildren(); $('activity').replaceChildren(); }
  }
  async function api(body) {
    const response = await fetch('/api/payment-admin', {
      method: body ? 'POST' : 'GET', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Request': '1' },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) signedIn(false);
      throw new Error(data.error || 'Please retry.');
    }
    return data;
  }
  async function run(task) {
    if (busy) return;
    busy = true;
    renderButtons();
    try { await task(); } catch (error) { notice(error.message, true); }
    finally { busy = false; renderButtons(); }
  }
  function renderButtons() {
    document.querySelectorAll('button,input').forEach(control => { control.disabled = busy; });
    $('add-profile').disabled = busy || draft.length >= 5;
    document.querySelectorAll('[data-saved-action]').forEach(button => {
      button.disabled = busy || dirty || button.dataset.enabled === 'false';
    });
  }
  function changed() {
    dirty = true;
    $('save-hint').textContent = 'Unsaved changes. Save before activating or resetting a profile.';
    renderButtons();
  }
  function button(text, onClick, label) {
    const element = document.createElement('button');
    element.type = 'button'; element.textContent = text;
    if (label) element.setAttribute('aria-label', label);
    element.addEventListener('click', onClick);
    return element;
  }
  function field(profile, key, title, placeholder) {
    const label = document.createElement('label');
    label.textContent = title;
    const input = document.createElement('input');
    input.type = 'text'; input.value = profile[key] || ''; input.required = key !== 'mid';
    input.placeholder = placeholder; input.autocomplete = 'off';
    input.maxLength = key === 'name' ? 60 : key === 'mid' ? 100 : 193;
    input.addEventListener('input', () => { profile[key] = input.value; changed(); });
    label.append(input); return label;
  }
  function renderProfiles() {
    $('profiles').replaceChildren();
    $('profile-count').textContent = `(${draft.length}/5)`;
    draft.forEach((profile, index) => {
      const card = document.createElement('section');
      card.className = 'profile' + (profile.id === config?.activeId ? ' active' : '');
      const heading = document.createElement('div'); heading.className = 'profile-heading';
      const title = document.createElement('h3'); title.textContent = `Profile ${index + 1}`;
      const status = document.createElement('span'); status.className = 'badge';
      status.textContent = profile.id === config?.activeId ? 'Active' : !profile.enabled ? 'Disabled' : profile.failures >= 3 ? 'Needs reset' : 'Standby';
      heading.append(title, status);
      const fields = document.createElement('div'); fields.className = 'profile-fields';
      fields.append(field(profile, 'name', 'Profile name', 'e.g. Merchant 1'), field(profile, 'upi', 'UPI ID', 'merchant@paytm'), field(profile, 'mid', 'Paytm MID (optional; required for API verification)', 'Your Paytm MID'));
      const footer = document.createElement('div'); footer.className = 'profile-footer';
      const enabledLabel = document.createElement('label');
      const enabled = document.createElement('input'); enabled.type = 'checkbox'; enabled.checked = profile.enabled;
      enabled.addEventListener('change', () => { profile.enabled = enabled.checked; changed(); });
      enabledLabel.append(enabled, ' Enabled');
      const streak = document.createElement('span'); streak.className = 'streak'; streak.textContent = `${profile.failures || 0}/3 consecutive failures`;
      footer.append(enabledLabel, streak);
      if (profile.id) {
        for (const [action, text] of [['activate', 'Activate'], ['reset', 'Reset failures']]) {
          const control = button(text, () => run(async () => {
            const data = await api({ action, id: profile.id, revision: config.revision });
            accept(data.config); notice(action === 'activate' ? 'Profile activated for new orders.' : 'Failure count reset.');
          }));
          control.dataset.savedAction = action; control.dataset.enabled = String(profile.enabled);
          footer.append(control);
        }
      }
      if (index > 0) footer.append(button('↑', () => { [draft[index - 1], draft[index]] = [draft[index], draft[index - 1]]; changed(); renderProfiles(); }, 'Move profile earlier'));
      if (index < draft.length - 1) footer.append(button('↓', () => { [draft[index + 1], draft[index]] = [draft[index], draft[index + 1]]; changed(); renderProfiles(); }, 'Move profile later'));
      const remove = button('Remove', () => { draft.splice(index, 1); changed(); renderProfiles(); });
      remove.className = 'danger'; footer.append(remove);
      card.append(heading, fields, footer);
      if (profile.lastVerification) {
        const warning = document.createElement('p');
        warning.className = 'verification-warning';
        warning.textContent = `Verification issue (${profile.lastVerification.code}): ${profile.lastVerification.message}`;
        card.append(warning);
      }
      $('profiles').append(card);
    });
    if (!draft.length) {
      const empty = document.createElement('p'); empty.className = 'card';
      empty.textContent = 'No UPI profiles. Add a UPI ID; add a Paytm MID only if your merchant integration supports API verification.'; $('profiles').append(empty);
    }
    renderButtons();
  }
  function accept(value) {
    config = value; draft = structuredClone(config.profiles); dirty = false;
    signedIn(true);
    $('save-hint').textContent = 'Changes apply to new orders only.';
    const active = config.profiles.find(p => p.id === config.activeId);
    $('active-name').textContent = active?.name || 'Payments paused';
    $('active-upi').textContent = active
      ? `${active.upi}${active.mid ? ` · MID ${active.mid}` : ' · Manual verification only'}`
      : 'Enable and activate a profile to receive new payments.';
    $('active-badge').textContent = active ? 'Active' : 'Paused';
    $('active-badge').className = active ? 'badge' : 'badge paused';
    $('activity').replaceChildren();
    for (const event of config.events) {
      const item = document.createElement('li');
      const name = config.profiles.find(p => p.id === (event.profileId || event.from))?.name || 'Merchant';
      const target = config.profiles.find(p => p.id === event.to)?.name;
      const description = event.type === 'rotation' ? `${name}: ${event.message}${target ? ` → ${target}` : ''}` :
        event.type === 'settings' ? 'Payment profiles updated' : event.type === 'verification_issue' ? `${name}: ${event.message}` : `${name}: ${event.type}${event.transactionId ? ` · ${event.transactionId}` : ''}`;
      item.textContent = `${new Date(event.at).toLocaleString()} — ${description}`;
      $('activity').append(item);
    }
    if (!config.events.length) { const item = document.createElement('li'); item.textContent = 'Payment activity will appear here.'; $('activity').append(item); }
    renderProfiles();
  }
  $('login-form').addEventListener('submit', event => {
    event.preventDefault(); run(async () => {
      await api({ action: 'login', password: $('password').value }); $('password').value = '';
      accept((await api()).config); notice('Signed in.');
    });
  });
  $('logout').addEventListener('click', () => run(async () => { await api({ action: 'logout' }); signedIn(false); notice('Signed out.'); }));
  $('refresh').addEventListener('click', () => {
    if (dirty && !confirm('Discard unsaved changes and refresh status?')) return;
    run(async () => { accept((await api()).config); notice('Status refreshed.'); });
  });
  $('add-profile').addEventListener('click', () => {
    if (draft.length >= 5) return;
    draft.push({ name: '', upi: '', mid: '', enabled: true, failures: 0 });
    changed(); renderProfiles(); $('profiles').lastElementChild.querySelector('input')?.focus();
  });
  $('profiles-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!draft.some(p => p.enabled) && !confirm('No profiles are enabled. Saving will pause new payments. Continue?')) return;
    run(async () => { accept((await api({ action: 'save', revision: config.revision, profiles: draft })).config); notice('Payment profiles saved.'); });
  });
  window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  run(async () => { try { accept((await api()).config); } catch (error) { if (error.message !== 'Please sign in to payment management.') throw error; } });
})();
