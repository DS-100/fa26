(() => {
  const scheduleElement = document.getElementById('logo-schedule-data');
  if (!scheduleElement) return;

  let schedule;
  try {
    schedule = JSON.parse(scheduleElement.textContent);
  } catch (error) {
    console.error('Could not parse the logo schedule.', error);
    return;
  }

  const logo = document.querySelector('img.site-logo, .site-logo img, #logo img, .site-logo');
  if (!logo) return;

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const specialLogo = (schedule.special_logos || []).find((entry) =>
    entry.start <= today && today <= entry.end
  );
  const selectedLogo = specialLogo || { path: schedule.default };

  if (!selectedLogo.path) return;

  const baseUrl = (scheduleElement.dataset.baseurl || '').replace(/\/$/, '');
  const logoPath = selectedLogo.path.replace(/^\//, '');
  const logoUrl = `${baseUrl}/${logoPath}`;

  if (logo instanceof HTMLImageElement) {
    logo.src = logoUrl;
    if (selectedLogo.name) logo.alt = selectedLogo.name;
  } else {
    logo.style.backgroundImage = `url("${logoUrl}")`;
    if (selectedLogo.name) logo.setAttribute('aria-label', selectedLogo.name);
  }
})();
