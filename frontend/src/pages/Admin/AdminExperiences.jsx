import CrudPanel from './CrudPanel';
export default function AdminExperiences() {
  return <CrudPanel
    title="Experiences"
    endpoint="/experiences"
    fields={[
      { key: 'company', label: 'Company' },
      { key: 'role', label: 'Role' },
      { key: 'location', label: 'Location' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'endDate', label: 'End Date' },
      { key: 'current', label: 'Current', type: 'bool' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'bullets', label: 'Bullets (comma-separated)', type: 'list', full: true },
    ]}
    format={(x) => (<><div className="font-semibold">{x.role} · {x.company}</div><div className="text-sm text-ink-500">{x.startDate} – {x.current ? 'Present' : x.endDate}</div></>)}
  />;
}
