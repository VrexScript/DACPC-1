import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: DACPCApp,
})

const SPECIAL_PASSWORD = 'dacpc.oversight.7code102'

// ── Types ───────────────────────────────────────────────────────────────────

type View =
  | 'login'
  | 'hub'
  | 'archives'
  | 'restricted'
  | 'facilities'
  | 'missions'
  | 'report-anomaly'
  | 'command-panel'

type Entry = {
  id: string
  title: string
  content: string
}

type Section = {
  prefix: string
  label: string
  entries: Entry[]
}

// ── Facilities data ─────────────────────────────────────────────────────────

const facilities = [
  {
    name: 'Facility Gamma',
    code: 'DACPC-FAC-GAMMA',
    location: 'Sublevel 12, Northern Sector',
    status: 'OPERATIONAL',
    statusColor: '#00ff88',
    personnel: 342,
    purpose: 'Primary containment and research center for spatial anomalies. Houses Containment Chambers 1–20 and the Anomaly Mapping Laboratory.',
    lastInspection: '2032-03-01',
    threatLevel: 'MODERATE',
  },
  {
    name: 'Facility Alpha',
    code: 'DACPC-FAC-ALPHA',
    location: 'Surface Level, Central Command Zone',
    status: 'OPERATIONAL',
    statusColor: '#00ff88',
    personnel: 518,
    purpose: 'Central administrative and command hub. Houses Oversight Council chambers, primary communications array, and personnel management division.',
    lastInspection: '2032-03-15',
    threatLevel: 'LOW',
  },
  {
    name: 'Facility Delta',
    code: 'DACPC-FAC-DELTA',
    location: 'Sublevel 7, Eastern Perimeter',
    status: 'PARTIAL LOCKDOWN',
    statusColor: '#ffaa00',
    personnel: 189,
    purpose: 'Temporal anomaly research and containment. Houses the Chronometric Analysis Lab and Temporal Isolation Pods. Sections B3-B7 under lockdown due to accelerated decay event.',
    lastInspection: '2032-02-18',
    threatLevel: 'HIGH',
  },
  {
    name: 'Facility Zeta',
    code: 'DACPC-FAC-ZETA',
    location: 'Deep Sublevel 22, Restricted Zone',
    status: 'RESTRICTED ACCESS',
    statusColor: '#ff3300',
    personnel: 74,
    purpose: 'High-threat entity containment. Houses entities classified OMEGA and above. All personnel require Tier-5 clearance minimum. Autonomous defense systems active.',
    lastInspection: '2032-01-09',
    threatLevel: 'CRITICAL',
  },
  {
    name: 'Facility Kappa',
    code: 'DACPC-FAC-KAPPA',
    location: 'Sublevel 3, Western Annex',
    status: 'UNDER REVIEW',
    statusColor: '#ffaa00',
    personnel: 127,
    purpose: 'Anomalous materials storage and analysis. Houses Archive Vault B and the Recursive Dead Zone (sealed). Currently under review following expansion of negative space in Vault B.',
    lastInspection: '2032-03-20',
    threatLevel: 'HIGH',
  },
]

// ── Missions data ───────────────────────────────────────────────────────────

const missions = [
  {
    id: 'DACPC-MSN-001',
    name: 'Operation GLASS HORIZON',
    status: 'ACTIVE',
    classification: 'OMEGA-5',
    briefing: 'Reconnaissance and containment of a mobile dimensional rift detected 47km northwest of Facility Alpha. The rift is expanding at 0.7m/hr and producing spatial echoes. Field Team 12 deployed. Objective: establish containment perimeter and deploy stabilization anchors.',
    team: 'Field Team 12',
    oversightOnly: false,
  },
  {
    id: 'DACPC-MSN-002',
    name: 'Operation SILENT CARTOGRAPH',
    status: 'ACTIVE — CLASSIFIED',
    classification: 'OMEGA-7',
    briefing: 'Investigation into the entity designated CARTOGRAPHER and its claims regarding "corrected maps." A specialized linguistics and topology team has been deployed to Containment Chamber 4. Objective: decode entity communications and assess validity of offered cartographic data.',
    team: 'Specialist Unit CIPHER',
    oversightOnly: true,
  },
  {
    id: 'DACPC-MSN-003',
    name: 'Operation RETROGRADE AEGIS',
    status: 'ACTIVE — CLASSIFIED',
    classification: 'OMEGA-6',
    briefing: 'Protective surveillance of Dr. A. Wren (Personnel ID 4471-W) following confirmed precognitive interference events. Mission includes monitoring all predictive outputs and cross-referencing with classified operational schedules to assess potential intelligence compromise.',
    team: 'Internal Security Division',
    oversightOnly: true,
  },
  {
    id: 'DACPC-MSN-004',
    name: 'Operation NULL RESPONSE',
    status: 'ACTIVE — CLASSIFIED',
    classification: 'OMEGA-8',
    briefing: 'Tracking and behavioral analysis of entity NULL CARTESIAN. Entity has demonstrated the ability to bypass all known containment measures. Mission objective: develop a predictive movement model and prototype a theoretical containment method based on anti-geometric principles.',
    team: 'Anomalous Physics Division',
    oversightOnly: true,
  },
  {
    id: 'DACPC-MSN-005',
    name: 'Operation FINAL CORRESPONDENCE',
    status: 'ACTIVE — CLASSIFIED',
    classification: 'OMEGA-9',
    briefing: 'Full forensic and predictive analysis of the document transmitted by THE CORRESPONDENT dated 2032-12-31, referencing "The Convergence." All prior predictions by this entity have been accurate. Mission objective: determine nature of predicted event, assess threat level, and develop contingency protocols. THIS MISSION HAS BEEN DESIGNATED PRIORITY ZERO BY THE OVERSIGHT COUNCIL.',
    team: 'Oversight Direct Command',
    oversightOnly: true,
  },
]

// ── Anomaly groups ──────────────────────────────────────────────────────────

const anomalyGroups = [
  'Spatial Anomaly',
  'Temporal Anomaly',
  'Probabilistic Events',
  'Logically Impossible Events',
  'Unknown Anomaly',
  'Corrupted Domain',
]

// ── Command panel commands ──────────────────────────────────────────────────

const teamNames = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
]

function getRandomTeamDesignation(): string {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  const team = teamNames[Math.floor(Math.random() * teamNames.length)]
  return `${letter}-${team}`
}

function getRandomReportNumber(): string {
  return `${Math.floor(Math.random() * 9000) + 1000}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
}

// ── Archive data ────────────────────────────────────────────────────────────

const archiveSections: Section[] = [
  {
    prefix: 'DACPC-SA-02',
    label: 'SPATIAL ANOMALY REPORTS',
    entries: [
      {
        id: 'DACPC-SA-02-001',
        title: 'Anomaly: Tessellation Fracture — Grid Sector 7-Gamma',
        content: `DATE: 2031-08-14 | CLASSIFICATION: OMEGA-3
Observation teams reported a persistent hexagonal fracture in local spacetime at coordinates [REDACTED]. Objects passing through the fracture arrive at destination with an 11-second temporal offset. No causal loop detected. Containment perimeter established. Further investigation ongoing. Personnel exhibiting disorientation post-exposure are undergoing cognitive baseline review. ANOMALY STATUS: CONTAINED (Provisional).`,
      },
      {
        id: 'DACPC-SA-02-002',
        title: 'Anomaly: Recursive Dead Zone — Sublevel 3, Facility Kappa',
        content: `DATE: 2031-09-02 | CLASSIFICATION: OMEGA-4
A 4-meter pocket of space in Sublevel 3 was identified as spatially recursive — any object inserted will re-emerge from the same entry point with zero elapsed time on external sensors, but with clear signs of prolonged exposure (oxidation, biological aging). One research drone returned after 3 seconds (external) showing 14 months of internal wear. ZONE SEALED. Entry prohibited without Tier-5 authorization.`,
      },
      {
        id: 'DACPC-SA-02-003',
        title: 'Anomaly: Mobile Fold Event — Transit Corridor 9',
        content: `DATE: 2031-11-19 | CLASSIFICATION: OMEGA-2
A spatial fold of approximately 1.2 meters in diameter was observed moving along Transit Corridor 9 at 0.3 km/h in a consistent southward direction. The fold displays partial transparency — objects on the opposite side appear inverted and blue-shifted. Tracking team assigned. No personnel losses. Physical barrier deployed to guide trajectory away from populated zones. ANOMALY STATUS: MONITORED.`,
      },
      {
        id: 'DACPC-SA-02-004',
        title: 'Anomaly: Persistent Negative Space — Archive Vault B',
        content: `DATE: 2032-01-07 | CLASSIFICATION: OMEGA-5
Archivists reported a growing region of "negative space" in Vault B — an area that visually appears as an absence of everything, including light and sound. Sound dampening is 100% at the boundary. Instruments inserted into the region return no data. The region has expanded 3 cm in 48 hours. FULL VAULT LOCKDOWN ISSUED. Senior Containment Officers notified. Director Voss has been briefed.`,
      },
      {
        id: 'DACPC-SA-02-005',
        title: 'Anomaly: Dimensional Bleed — Surface Observation Post 14',
        content: `DATE: 2032-03-22 | CLASSIFICATION: OMEGA-3
Observers at Post 14 documented a recurring "bleed" event — a translucent overlay of a physically identical but differently arranged version of the observation post appears superimposed on the real environment for periods of 40–120 seconds. Individuals inside the bleed report hearing voices speaking in a language that does not match any catalogued language. Linguistic team on standby. ANOMALY STATUS: RECURRING / MONITORED.`,
      },
    ],
  },
  {
    prefix: 'DACPC-TA-02',
    label: 'TEMPORAL ANOMALY REPORTS',
    entries: [
      {
        id: 'DACPC-TA-02-001',
        title: 'Event: Retrograde Causality Incident — Lab Complex Delta',
        content: `DATE: 2031-06-03 | CLASSIFICATION: OMEGA-5
Lab personnel reported receiving internal memos dated three days in the future containing accurate descriptions of events that had not yet occurred. Cross-referencing confirmed a 100% accuracy rate across seven documents. Documents were quarantined. Personnel who read the memos are under cognitive monitoring to prevent paradox amplification. Source of the future-dated documents remains UNKNOWN.`,
      },
      {
        id: 'DACPC-TA-02-002',
        title: 'Event: Temporal Echo — Corridor 12, West Wing',
        content: `DATE: 2031-07-28 | CLASSIFICATION: OMEGA-3
Security cameras recorded a repeating "echo" of the same 6-minute sequence in Corridor 12 — a loop showing a figure in standard DACPC uniform walking the corridor, stopping, looking directly at Camera 12-C, and mouthing words. Lip reading analysis suggests the words are: "They already know." No personnel were in Corridor 12 at the time of recording. Camera hardware inspected and verified nominal.`,
      },
      {
        id: 'DACPC-TA-02-003',
        title: 'Event: Accelerated Decay Zone — Research Pod 7',
        content: `DATE: 2031-10-15 | CLASSIFICATION: OMEGA-4
All organic material inside Research Pod 7 is aging at approximately 40x the normal rate. Inorganic materials are unaffected. A potted plant introduced as a test subject aged to a desiccated husk within 18 minutes. Pod sealed. Temporal gradient analysis underway. NOTE: Three personnel inadvertently entered Pod 7 before the zone was identified. All three have been placed in medical isolation and are aging visibly. Prognosis uncertain.`,
      },
      {
        id: 'DACPC-TA-02-004',
        title: 'Event: Precognitive Interference — Personnel ID 4471-W',
        content: `DATE: 2031-12-01 | CLASSIFICATION: OMEGA-4
Dr. A. Wren (Personnel ID 4471-W) reported consistent and accurate foreknowledge of classified events, including the contents of sealed briefings she had no access to. Psychological evaluation found no deception. Brain scan revealed anomalous chronometric activity in the temporal lobe inconsistent with baseline human neurology. Dr. Wren is currently in voluntary protective isolation. Cause of anomaly under investigation.`,
      },
      {
        id: 'DACPC-TA-02-005',
        title: 'Event: Null-Time Pocket — Storage Bay 3',
        content: `DATE: 2032-02-14 | CLASSIFICATION: OMEGA-5
A region approximately 2x2x2 meters in Storage Bay 3 has been identified as a "null-time pocket" — within this region, time does not appear to pass. Objects placed inside remain in exact stasis; even atomic decay is halted. An analog watch placed inside for 72 hours external time showed zero elapsed time on retrieval. Potential weaponization risk has been flagged to the Oversight Council. BAY 3 ACCESS: SUSPENDED INDEFINITELY.`,
      },
    ],
  },
  {
    prefix: 'DACPC-PE-02',
    label: 'PERSONNEL & EXPOSURE REPORTS',
    entries: [
      {
        id: 'DACPC-PE-02-001',
        title: 'Incident: Spontaneous Phase Shift — Agent R. Halloran',
        content: `DATE: 2031-05-19 | CLASSIFICATION: DELTA-7
Agent Halloran was observed by three witnesses to briefly become non-corporeal — passing through a sealed door without opening it. Agent Halloran has no memory of the event. Medical scan shows cellular structure is currently normal. Agent is on administrative leave pending a full Phase Exposure Assessment. This is the fourth documented phase shift event involving a field agent this quarter.`,
      },
      {
        id: 'DACPC-PE-02-002',
        title: 'Incident: Cognitive Fragmentation — Dr. M. Osei',
        content: `DATE: 2031-08-30 | CLASSIFICATION: DELTA-6
Dr. Osei began writing classified research notes in reverse, then in mirror image, then in a script no linguist has identified. He claims to be "receiving transmissions from a coordinate system that does not use space as a variable." Dr. Osei's cognitive output remains high but increasingly non-interpretable to baseline humans. A dedicated translation team has been assigned. He continues to produce detailed technical diagrams of unknown devices.`,
      },
      {
        id: 'DACPC-PE-02-003',
        title: 'Incident: Dimensional Resonance Syndrome — Field Team 9',
        content: `DATE: 2031-09-14 | CLASSIFICATION: DELTA-5
All five members of Field Team 9 returned from Assignment 9-Gamma reporting shared hallucinatory experiences — each team member independently described an identical location: a white room with no visible light source, a single chair, and a door with no handle. They are not communicating with each other yet continue to describe the same room in the same detail. Psychiatry team is assessing. No anomalous readings detected in team members' vicinity.`,
      },
      {
        id: 'DACPC-PE-02-004',
        title: 'Incident: Spontaneous Multilocation — Personnel ID 2290-X',
        content: `DATE: 2031-11-27 | CLASSIFICATION: DELTA-8
Personnel ID 2290-X (name withheld per Protocol 17) was simultaneously logged entering Facility Kappa at 09:14 and Facility Omega — 340 km away — at 09:14. Both check-ins were confirmed by biometric systems. Physical examination of both instances confirmed identical biological markers. There are currently two confirmed versions of 2290-X. Both are cooperating with containment. The original instance designation is under review.`,
      },
      {
        id: 'DACPC-PE-02-005',
        title: 'Incident: Memory Retrograde — Security Division, Floor 6',
        content: `DATE: 2032-01-30 | CLASSIFICATION: DELTA-6
Fourteen Security Division personnel on Floor 6 simultaneously lost all memories formed after a specific date — which varies per individual but clusters around the week of 2031-03-07. All affected personnel believe it is the date of their last memory. The event was not noticed for 11 days because affected personnel seamlessly resumed work based on outdated information. Three critical security protocols were unknowingly compromised. Full remediation is ongoing.`,
      },
    ],
  },
  {
    prefix: 'DACPC-UE-02',
    label: 'UNCLASSIFIED ENTITY REPORTS',
    entries: [
      {
        id: 'DACPC-UE-02-001',
        title: 'Entity: Designation PALE MIRROR',
        content: `DATE: 2031-04-11 | CLASSIFICATION: ENTITY-OMEGA
An entity visually identical to a reflected image of the observer has been documented in three separate facilities simultaneously. The entity mimics observer movements with a 0.8-second delay. It does not speak. It does not blink. When any observer attempts to approach, the entity recedes at an equal pace. Cameras show only the observer — not the entity. The entity appears exclusively to personnel with Tier-3 clearance or higher. Psychological screening for visual phenomena has been updated.`,
      },
      {
        id: 'DACPC-UE-02-002',
        title: 'Entity: Designation CARTOGRAPHER',
        content: `DATE: 2031-06-22 | CLASSIFICATION: ENTITY-OMEGA
An entity was intercepted attempting to access the facility's central mapping database. The entity appeared as a tall humanoid figure composed entirely of what appeared to be folded paper. It communicated via written notes that materialized spontaneously. Notes read: "Your maps are wrong. I can correct them. There is a cost." Entity is currently detained in Containment Chamber 4. It has continued producing notes. All notes are being transcribed and analyzed. The "cost" has not been defined by the entity.`,
      },
      {
        id: 'DACPC-UE-02-003',
        title: 'Entity: Designation STATIC HERALD',
        content: `DATE: 2031-08-05 | CLASSIFICATION: ENTITY-OMEGA
A humanoid entity was found standing motionless at the center of the main atrium. It emits a constant low-frequency static sound. Electronics within a 10-meter radius malfunction. Personnel within 5 meters report hearing fragmented radio transmissions in their minds — including what appear to be encrypted DACPC internal communications from dates that have not yet occurred. Entity has not moved in 63 days. Containment ring erected. Entity designated STATIC HERALD.`,
      },
      {
        id: 'DACPC-UE-02-004',
        title: 'Entity: Designation NULL CARTESIAN',
        content: `DATE: 2031-10-09 | CLASSIFICATION: ENTITY-OMEGA
Entity appears as a geometric void — a perfectly black three-dimensional shape approximating a humanoid silhouette, with zero reflectivity and zero measurable temperature. It navigates the facility with apparent purpose, ignoring all containment barriers. Physical contact results in affected personnel reporting "a complete absence of self" for periods of up to 48 hours. Entity has been observed entering a room through a wall and leaving through the floor. No consistent pattern to its movements has been identified.`,
      },
      {
        id: 'DACPC-UE-02-005',
        title: 'Entity: Designation THE CORRESPONDENT',
        content: `DATE: 2031-12-31 | CLASSIFICATION: ENTITY-OMEGA
An entity that communicates exclusively through officially stamped DACPC internal documents that appear without traceable origin. Documents contain highly accurate operational intelligence, anomaly predictions, and personnel assessments. The entity has never been physically observed. Its last transmitted document, dated 2032-12-31 — one year in the future — reads: "You have 365 days to prepare. The Convergence is not an anomaly. It is the correction." Document is under full forensic review. All predictions in prior documents have been accurate.`,
      },
    ],
  },
]

// ── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: '100vh',
    background: '#000',
    color: '#00ff00',
    fontFamily: "'Courier New', Courier, monospace",
    padding: '2rem',
  } as React.CSSProperties,
  header: {
    borderBottom: '1px solid #00ff00',
    paddingBottom: '1rem',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '1.6rem',
    letterSpacing: '0.2em',
    margin: 0,
    color: '#00ff00',
  },
  subtitle: {
    fontSize: '0.8rem',
    letterSpacing: '0.15em',
    color: '#00aa00',
    marginTop: '0.4rem',
  },
  loginBox: {
    maxWidth: '420px',
    margin: '6rem auto',
    border: '1px solid #00ff00',
    padding: '2rem',
  },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    marginBottom: '0.4rem',
    color: '#00ff00',
  },
  input: {
    width: '100%',
    background: '#000',
    border: '1px solid #00ff00',
    color: '#00ff00',
    padding: '0.5rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '1.2rem',
  },
  button: {
    width: '100%',
    background: '#000',
    border: '1px solid #00ff00',
    color: '#00ff00',
    padding: '0.6rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  section: {
    border: '1px solid #00aa00',
    marginBottom: '2rem',
    padding: '1.5rem',
  },
  sectionTitle: {
    fontSize: '0.85rem',
    letterSpacing: '0.2em',
    color: '#00cc00',
    borderBottom: '1px solid #005500',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
  },
  entryRow: {
    borderBottom: '1px solid #003300',
    padding: '0.75rem 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  entryId: {
    fontSize: '0.75rem',
    color: '#00aa00',
    whiteSpace: 'nowrap' as const,
    minWidth: '160px',
  },
  entryTitle: {
    fontSize: '0.8rem',
    color: '#00cc00',
    marginBottom: '0.25rem',
  },
  denied: {
    fontSize: '0.75rem',
    color: '#ff3300',
    letterSpacing: '0.1em',
    border: '1px solid #ff3300',
    padding: '0.15rem 0.4rem',
    display: 'inline-block',
  },
  granted: {
    fontSize: '0.75rem',
    color: '#00ff88',
    letterSpacing: '0.1em',
    border: '1px solid #00ff88',
    padding: '0.15rem 0.4rem',
    display: 'inline-block',
    marginBottom: '0.5rem',
  },
  contentText: {
    fontSize: '0.75rem',
    color: '#00ee66',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
    marginTop: '0.4rem',
  },
  backBtn: {
    background: '#000',
    border: '1px solid #005500',
    color: '#00aa00',
    padding: '0.3rem 0.8rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  hubButton: {
    width: '100%',
    background: '#000',
    border: '1px solid #00aa00',
    color: '#00ff00',
    padding: '1rem 1.5rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    textAlign: 'left' as const,
    marginBottom: '0.75rem',
    transition: 'border-color 0.2s',
  },
  hubButtonLabel: {
    fontSize: '0.95rem',
    color: '#00ff00',
    marginBottom: '0.3rem',
    letterSpacing: '0.15em',
  },
  hubButtonDesc: {
    fontSize: '0.7rem',
    color: '#00aa00',
    letterSpacing: '0.05em',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalBox: {
    border: '1px solid #ff3300',
    background: '#000',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center' as const,
  },
  facilityCard: {
    border: '1px solid #00aa00',
    padding: '1.25rem',
    marginBottom: '1rem',
  },
  commandInput: {
    width: '100%',
    background: '#000',
    border: '1px solid #00ff00',
    color: '#00ff00',
    padding: '0.6rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  commandOutput: {
    background: '#001100',
    border: '1px solid #003300',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '0.75rem',
    color: '#00ee66',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap' as const,
    maxHeight: '400px',
    overflowY: 'auto' as const,
  },
  textarea: {
    width: '100%',
    background: '#000',
    border: '1px solid #00ff00',
    color: '#00ff00',
    padding: '0.5rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    minHeight: '100px',
    resize: 'vertical' as const,
    marginBottom: '1.2rem',
  },
  select: {
    width: '100%',
    background: '#000',
    border: '1px solid #00ff00',
    color: '#00ff00',
    padding: '0.5rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '1.2rem',
  },
}

// ── Views ────────────────────────────────────────────────────────────────────

function LoginView({ onLogin }: { onLogin: (restricted: boolean, username: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogin(password === SPECIAL_PASSWORD, username || 'UNKNOWN')
  }

  return (
    <div style={s.page}>
      <div style={s.loginBox}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            🌍&nbsp;<span style={s.title}>DACPC LOGIN PORTAL</span>
          </div>
          <div style={s.subtitle}>DIMENSIONAL ANOMALY CONTAINMENT AND PROTECTION CORPORATION</div>
          <div style={{ ...s.subtitle, marginTop: '0.2rem' }}>COMMAND PANEL — AUTHORIZED ACCESS ONLY</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={s.label} htmlFor="username">USERNAME</label>
          <input
            id="username"
            style={s.input}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />

          <label style={s.label} htmlFor="password">PASSWORD</label>
          <input
            id="password"
            style={s.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="off"
          />

          <button type="submit" style={s.button}>[ AUTHENTICATE ]</button>
        </form>

        <div style={{ ...s.subtitle, textAlign: 'center', marginTop: '1.5rem' }}>
          UNAUTHORIZED ACCESS IS A VIOLATION OF DACPC PROTOCOL 0-ALPHA
        </div>
      </div>
    </div>
  )
}

// ── Navigation Hub ──────────────────────────────────────────────────────────

function HubView({
  username,
  isOversight,
  onNavigate,
  onLogout,
}: {
  username: string
  isOversight: boolean
  onNavigate: (view: View) => void
  onLogout: () => void
}) {
  const [showAccessDenied, setShowAccessDenied] = useState(false)

  const hubOptions = [
    {
      label: '[ 1 ] FACILITIES INFO & STATUS',
      desc: 'View operational status and details of all DACPC facilities',
      action: () => onNavigate('facilities'),
    },
    {
      label: '[ 2 ] ARCHIVES',
      desc: 'Access anomaly reports, entity files, and personnel incidents',
      action: () => onNavigate(isOversight ? 'restricted' : 'archives'),
    },
    {
      label: '[ 3 ] COMMAND PANEL',
      desc: isOversight ? 'Access DACPC command interface' : 'OVERSIGHT CLEARANCE REQUIRED',
      action: () => {
        if (isOversight) {
          onNavigate('command-panel')
        } else {
          setShowAccessDenied(true)
        }
      },
    },
    {
      label: '[ 4 ] DACPC CURRENT ACTIVE MISSIONS',
      desc: 'View active field operations and mission status',
      action: () => onNavigate('missions'),
    },
    {
      label: '[ 5 ] REPORT AN ANOMALY',
      desc: 'File a new anomaly report for DACPC review and dispatch',
      action: () => onNavigate('report-anomaly'),
    },
  ]

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onLogout} style={s.backBtn}>← LOGOUT</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={s.title}>DACPC NAVIGATION HUB</h1>
            <div style={s.subtitle}>DIMENSIONAL ANOMALY CONTAINMENT AND PROTECTION CORPORATION</div>
          </div>
          <div style={{ minWidth: '80px' }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#00cc00', letterSpacing: '0.1em' }}>
          WELCOME, {username.toUpperCase()} — CLEARANCE: {isOversight ? 'OVERSIGHT' : 'STANDARD'}
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.3rem', fontSize: '0.7rem', color: '#00aa00', letterSpacing: '0.1em' }}>
          SELECT A DESTINATION
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {hubOptions.map((opt, i) => (
          <button
            key={i}
            style={s.hubButton}
            onClick={opt.action}
            onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#00ff00' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#00aa00' }}
          >
            <div style={s.hubButtonLabel}>{opt.label}</div>
            <div style={s.hubButtonDesc}>{opt.desc}</div>
          </button>
        ))}
      </div>

      {showAccessDenied && (
        <div style={s.modalOverlay} onClick={() => setShowAccessDenied(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '1.2rem', color: '#ff3300', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              ⚠ ACCESS DENIED ⚠
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ff3300', marginBottom: '1rem', lineHeight: '1.6' }}>
              WARNING: User <span style={{ color: '#ffaa00' }}>{username.toUpperCase()}</span> — you have insufficient clearance to access the Command Panel.
            </div>
            <div style={{ fontSize: '0.7rem', color: '#ff6600', marginBottom: '1.5rem' }}>
              OVERSIGHT-LEVEL AUTHORIZATION REQUIRED. THIS ACCESS ATTEMPT HAS BEEN LOGGED.
            </div>
            <button
              style={{ ...s.button, width: 'auto', padding: '0.4rem 2rem', borderColor: '#ff3300', color: '#ff3300' }}
              onClick={() => setShowAccessDenied(false)}
            >
              [ ACKNOWLEDGE ]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Facilities View ─────────────────────────────────────────────────────────

function FacilitiesView({ onBack }: { onBack: () => void }) {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onBack} style={s.backBtn}>← BACK TO HUB</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={s.title}>FACILITIES INFO & STATUS</h1>
            <div style={s.subtitle}>DACPC FACILITY REGISTRY</div>
          </div>
          <div style={{ minWidth: '80px' }} />
        </div>
      </div>

      {facilities.map(fac => (
        <div key={fac.code} style={s.facilityCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.95rem', color: '#00ff00', letterSpacing: '0.15em' }}>{fac.name.toUpperCase()}</div>
            <div style={{ fontSize: '0.75rem', color: fac.statusColor, border: `1px solid ${fac.statusColor}`, padding: '0.15rem 0.5rem' }}>
              {fac.status}
            </div>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#00aa00', marginBottom: '0.5rem' }}>CODE: {fac.code} | LOCATION: {fac.location}</div>
          <div style={{ fontSize: '0.7rem', color: '#00aa00', marginBottom: '0.5rem' }}>PERSONNEL: {fac.personnel} | THREAT LEVEL: <span style={{ color: fac.threatLevel === 'CRITICAL' ? '#ff3300' : fac.threatLevel === 'HIGH' ? '#ffaa00' : '#00ff88' }}>{fac.threatLevel}</span></div>
          <div style={{ fontSize: '0.7rem', color: '#00aa00', marginBottom: '0.5rem' }}>LAST INSPECTION: {fac.lastInspection}</div>
          <div style={{ fontSize: '0.75rem', color: '#00cc00', lineHeight: '1.5', marginTop: '0.5rem' }}>{fac.purpose}</div>
        </div>
      ))}
    </div>
  )
}

// ── Missions View ───────────────────────────────────────────────────────────

function MissionsView({
  isOversight,
  username,
  onBack,
}: {
  isOversight: boolean
  username: string
  onBack: () => void
}) {
  const [showDenied, setShowDenied] = useState<string | null>(null)

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onBack} style={s.backBtn}>← BACK TO HUB</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={s.title}>DACPC ACTIVE MISSIONS</h1>
            <div style={s.subtitle}>CURRENT FIELD OPERATIONS</div>
          </div>
          <div style={{ minWidth: '80px' }} />
        </div>
      </div>

      {missions.map(msn => {
        const canAccess = isOversight || !msn.oversightOnly

        return (
          <div key={msn.id} style={s.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#00aa00' }}>{msn.id}</div>
                <div style={{ fontSize: '0.9rem', color: '#00ff00', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{msn.name}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: msn.oversightOnly ? '#ff3300' : '#00ff88', border: `1px solid ${msn.oversightOnly ? '#ff3300' : '#00ff88'}`, padding: '0.15rem 0.5rem' }}>
                {msn.status}
              </div>
            </div>

            {canAccess ? (
              <>
                <div style={{ fontSize: '0.7rem', color: '#00aa00', marginBottom: '0.5rem' }}>
                  CLASSIFICATION: {msn.classification} | ASSIGNED: {msn.team}
                </div>
                <div style={s.contentText}>{msn.briefing}</div>
              </>
            ) : (
              <>
                <span style={s.denied}>ACCESS DENIED — OVERSIGHT ONLY</span>
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    style={{ ...s.backBtn, borderColor: '#ff3300', color: '#ff3300', marginBottom: 0 }}
                    onClick={() => setShowDenied(msn.id)}
                  >
                    [ REQUEST ACCESS ]
                  </button>
                </div>
              </>
            )}
          </div>
        )
      })}

      {showDenied && (
        <div style={s.modalOverlay} onClick={() => setShowDenied(null)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '1.2rem', color: '#ff3300', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              ⚠ ACCESS DENIED ⚠
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ff3300', marginBottom: '1rem', lineHeight: '1.6' }}>
              WARNING: User <span style={{ color: '#ffaa00' }}>{username.toUpperCase()}</span> — insufficient clearance to access mission <span style={{ color: '#ffaa00' }}>{showDenied}</span>.
            </div>
            <div style={{ fontSize: '0.7rem', color: '#ff6600', marginBottom: '1.5rem' }}>
              THIS MISSION IS CLASSIFIED UNDER OVERSIGHT COUNCIL DIRECTIVE. ACCESS ATTEMPT LOGGED.
            </div>
            <button
              style={{ ...s.button, width: 'auto', padding: '0.4rem 2rem', borderColor: '#ff3300', color: '#ff3300' }}
              onClick={() => setShowDenied(null)}
            >
              [ ACKNOWLEDGE ]
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Report Anomaly View ─────────────────────────────────────────────────────

function ReportAnomalyView({ onBack }: { onBack: () => void }) {
  const [subject, setSubject] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [classification, setClassification] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [responseMsg, setResponseMsg] = useState('')

  function handleReport() {
    if (submitted) {
      setResponseMsg('⚠ You have already made a request. Create a new one to file for another Anomaly.')
      return
    }
    const teamDesignation = getRandomTeamDesignation()
    const reportNum = getRandomReportNumber()
    setResponseMsg(`✓ REPORT #${reportNum} FILED SUCCESSFULLY.\n\nTeam - ${teamDesignation} will be dispatched as soon as possible. Thanks for Reporting.`)
    setSubmitted(true)
  }

  function handleNewReport() {
    setSubject('')
    setLocation('')
    setDescription('')
    setClassification('')
    setSubmitted(false)
    setResponseMsg('')
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onBack} style={s.backBtn}>← BACK TO HUB</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={s.title}>REPORT AN ANOMALY</h1>
            <div style={s.subtitle}>DACPC ANOMALY REPORTING SYSTEM</div>
          </div>
          <div style={{ minWidth: '80px' }} />
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={s.section}>
          <div style={s.sectionTitle}>ANOMALY REPORT FORM</div>

          <label style={s.label}>SUBJECT OF ANOMALY</label>
          <input
            style={s.input}
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Enter anomaly subject..."
            disabled={submitted}
          />

          <label style={s.label}>LOCATION</label>
          <input
            style={s.input}
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter location of anomaly..."
            disabled={submitted}
          />

          <label style={s.label}>DESCRIPTION</label>
          <textarea
            style={s.textarea}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the anomaly in detail..."
            disabled={submitted}
          />

          <label style={s.label}>CLASSIFICATION</label>
          <select
            style={s.select}
            value={classification}
            onChange={e => setClassification(e.target.value)}
            disabled={submitted}
          >
            <option value="">-- SELECT ANOMALY GROUP --</option>
            {anomalyGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <button style={s.button} onClick={handleReport}>
            [ SUBMIT REPORT ]
          </button>

          {submitted && (
            <button style={{ ...s.button, marginTop: '0.5rem', borderColor: '#00aa00', color: '#00aa00' }} onClick={handleNewReport}>
              [ CREATE NEW REPORT ]
            </button>
          )}

          {responseMsg && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              border: `1px solid ${submitted ? '#00ff88' : '#ffaa00'}`,
              fontSize: '0.8rem',
              color: submitted ? '#00ff88' : '#ffaa00',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
            }}>
              {responseMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Command Panel View ──────────────────────────────────────────────────────

const commandHelp: Record<string, string> = {
  help: `DACPC COMMAND PANEL — AVAILABLE COMMANDS
════════════════════════════════════════════
c/oversight[ID] - help .............. Display this help message
c/oversight[ID] - mission_update .... View latest mission status updates
c/oversight[ID] - contact_team ...... Contact active field teams
c/oversight[ID] - staff_detail ...... View personnel details and assignments
c/oversight[ID] - hidden_archives ... Access classified archive entries
c/oversight[ID] - dacpcinternalaccess Access DACPC internal systems

Replace [ID] with your oversight authorization number.
All commands are logged and monitored by DACPC Security Division.`,

  mission_update: `DACPC MISSION STATUS UPDATE — PRIORITY DISPATCH
════════════════════════════════════════════════
[MSN-001] GLASS HORIZON ........... ACTIVE — Field Team 12 en route to containment zone
                                     Stabilization anchors at 60% deployment
[MSN-002] SILENT CARTOGRAPH ....... ACTIVE — Entity communications decrypted at 34%
                                     New notes materialized at 0342 hours
[MSN-003] RETROGRADE AEGIS ........ ACTIVE — Dr. Wren's predictive accuracy holding at 97.3%
                                     Three new predictions logged today
[MSN-004] NULL RESPONSE ........... ACTIVE — Entity last observed Sublevel 14 at 0817
                                     Anti-geometric prototype at 12% completion
[MSN-005] FINAL CORRESPONDENCE .... PRIORITY ZERO — 274 days remain
                                     Forensic analysis of Convergence document ongoing
                                     OVERSIGHT COUNCIL BRIEFING: TOMORROW 0600

END OF UPDATE — CLASSIFIED OVERSIGHT ONLY`,

  contact_team: `DACPC FIELD TEAM COMMUNICATION RELAY
═════════════════════════════════════
ACTIVE TEAMS:
  [FT-12] Field Team 12 ........... FREQ: 447.320 MHz | STATUS: IN FIELD
  [SU-C]  Specialist Unit CIPHER .. FREQ: ENCRYPTED  | STATUS: ON SITE
  [ISD]   Internal Security Div ... FREQ: 891.100 MHz | STATUS: ACTIVE
  [APD]   Anomalous Physics Div .. FREQ: ENCRYPTED  | STATUS: IN LAB
  [ODC]   Oversight Direct Command  FREQ: CLASSIFIED | STATUS: STANDBY

COMMUNICATION PROTOCOLS:
  - All transmissions on encrypted channels require Tier-4 cipher key
  - Field teams respond within 120-second window
  - Emergency channel: 999.999 MHz (reserved for OMEGA events)

Enter team designation to initiate contact.
WARNING: All communications are recorded per Protocol 7-Echo.`,

  staff_detail: `DACPC PERSONNEL REGISTRY — OVERSIGHT ACCESS
═════════════════════════════════════════════
SENIOR STAFF:
  Director H. Voss ................ CLEARANCE: OVERSIGHT-PRIME | STATUS: ACTIVE
  Deputy Dir. L. Chen ............. CLEARANCE: OVERSIGHT       | STATUS: ACTIVE
  Chief Sci. Dr. K. Mwangi ....... CLEARANCE: OVERSIGHT       | STATUS: FIELD ASSIGNMENT
  Security Chief R. Torres ........ CLEARANCE: OVERSIGHT       | STATUS: ACTIVE
  Medical Dir. Dr. S. Petrov ...... CLEARANCE: TIER-5          | STATUS: ACTIVE

FLAGGED PERSONNEL:
  Dr. A. Wren (4471-W) ........... STATUS: VOLUNTARY ISOLATION — PRECOGNITIVE
  Dr. M. Osei (3302-O) ........... STATUS: COGNITIVE MONITORING — FRAGMENTED
  Agent R. Halloran (5518-H) ...... STATUS: ADMIN LEAVE — PHASE SHIFT
  Personnel 2290-X ................ STATUS: DUAL CONTAINMENT — MULTILOCATION
  Security Div Floor 6 (14 staff).. STATUS: MEMORY REMEDIATION — RETROGRADE

TOTAL ACTIVE PERSONNEL: 1,250
TOTAL FACILITIES: 5 OPERATIONAL | ANOMALY EVENTS THIS QUARTER: 23`,

  hidden_archives: `DACPC HIDDEN ARCHIVES — OVERSIGHT EYES ONLY
═════════════════════════════════════════════
⚠ THE FOLLOWING FILES ARE NOT IN THE STANDARD ARCHIVE SYSTEM ⚠

[DACPC-HA-001] "The Founder's Warning"
  DATE: 2029-01-01 | A message left by the original DACPC founder,
  sealed until the first Convergence event was detected.
  STATUS: SEAL INTACT — AWAITING TRIGGER EVENT

[DACPC-HA-002] "Protocol Omega-Zero"
  DATE: UNKNOWN | A contingency protocol for total dimensional collapse.
  Contents known only to Director Voss and the Oversight Council.
  STATUS: CLASSIFIED BEYOND OVERSIGHT

[DACPC-HA-003] "The Map That Was Refused"
  DATE: 2031-07-15 | A cartographic document offered by entity CARTOGRAPHER.
  Rejected per Protocol 9-Delta. Contents partially transcribed before sealing.
  STATUS: SEALED — CONTAINMENT CHAMBER 4

[DACPC-HA-004] "Subject Zero Testimony"
  DATE: 2030-03-19 | First recorded testimony of a human who survived
  direct contact with a Corrupted Domain. Subject's identity remains classified.
  STATUS: RESTRICTED — MEDICAL DIVISION

[DACPC-HA-005] "Post-Convergence Scenario Modeling"
  DATE: 2032-04-01 (FUTURE-DATED) | A document that appeared in the Director's
  office. Origin: THE CORRESPONDENT. Details unknown.
  STATUS: UNDER FORENSIC REVIEW

ACCESS TO THESE FILES REQUIRES DIRECT OVERSIGHT COUNCIL AUTHORIZATION.`,

  dacpcinternalaccess: `DACPC INTERNAL SYSTEM ACCESS
═════════════════════════════
CONNECTING TO DACPC INTERNAL NETWORK...
AUTHENTICATING OVERSIGHT CREDENTIALS...
ACCESS GRANTED.

AVAILABLE INTERNAL SYSTEMS:
  [SYS-01] Anomaly Tracking Network (ATN) ......... ONLINE
  [SYS-02] Containment Integrity Monitor (CIM) ..... ONLINE
  [SYS-03] Personnel Biometric Database (PBD) ...... ONLINE
  [SYS-04] Temporal Flux Detector Array (TFDA) ..... DEGRADED — 3 sensors offline
  [SYS-05] Entity Communication Intercept (ECI) ..... ONLINE
  [SYS-06] Dimensional Stability Index (DSI) ........ WARNING — Index at 73.2%
  [SYS-07] Emergency Response Coordination (ERC) .... STANDBY
  [SYS-08] Archive Integrity Verification (AIV) ..... ONLINE

SYSTEM ALERTS:
  ▶ DSI below 80% threshold — Convergence monitoring active
  ▶ TFDA Sensor Array 4, 7, 12 — maintenance required
  ▶ ECI has intercepted 3 new transmissions from STATIC HERALD

INTERNAL ACCESS SESSION ACTIVE. ALL ACTIONS LOGGED.`,
}

function CommandPanelView({
  username,
  onBack,
}: {
  username: string
  onBack: () => void
}) {
  const [commandInput, setCommandInput] = useState('')
  const [outputHistory, setOutputHistory] = useState<string[]>([
    `DACPC COMMAND PANEL — OVERSIGHT ACCESS\n═══════════════════════════════════════\nWelcome, ${username.toUpperCase()}. Type a command or enter "c/${username.toLowerCase()} - help" to see available commands.\n`,
  ])

  function handleCommand(e: React.FormEvent) {
    e.preventDefault()
    const raw = commandInput.trim()
    if (!raw) return

    // Parse command: c/oversightXXX - commandname
    const match = raw.match(/^c\/\S+\s*-\s*(\w+)$/i)
    let output: string

    if (match) {
      const cmd = match[1].toLowerCase()
      if (commandHelp[cmd]) {
        output = commandHelp[cmd]
      } else {
        output = `ERROR: Unknown command "${cmd}"\nType "c/${username.toLowerCase()} - help" for available commands.`
      }
    } else {
      output = `ERROR: Invalid command format.\nExpected: c/[username] - [command]\nType "c/${username.toLowerCase()} - help" for available commands.`
    }

    setOutputHistory(prev => [...prev, `> ${raw}\n\n${output}\n`])
    setCommandInput('')
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onBack} style={s.backBtn}>← BACK TO HUB</button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={s.title}>DACPC COMMAND PANEL</h1>
            <div style={s.subtitle}>OVERSIGHT COMMAND INTERFACE</div>
          </div>
          <div style={{ minWidth: '80px' }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#ffaa00', letterSpacing: '0.1em' }}>
          ⚠ CLASSIFIED — ALL COMMANDS LOGGED — OVERSIGHT ACCESS ONLY ⚠
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={s.commandOutput}>
          {outputHistory.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        <form onSubmit={handleCommand} style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <div style={{ color: '#00ff00', padding: '0.6rem 0', fontSize: '0.9rem' }}>&gt;</div>
          <input
            style={{ ...s.commandInput, flex: 1 }}
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder={`c/${username.toLowerCase()} - help`}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" style={{ ...s.button, width: 'auto', padding: '0.6rem 1.5rem', marginTop: 0 }}>
            [ EXECUTE ]
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Archives View ───────────────────────────────────────────────────────────

function ArchivesView({
  restricted,
  onBack,
}: {
  restricted: boolean
  onBack: () => void
}) {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={onBack} style={s.backBtn}>
            ← BACK TO HUB
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={s.title}>
              {restricted
                ? 'DACPC INTERNAL COMMAND — CLEARANCE LEVEL: OVERSIGHT'
                : 'DACPC COMMAND PANEL — STANDARD ARCHIVES'}
            </h1>
            <div style={s.subtitle}>
              DIMENSIONAL ANOMALY CONTAINMENT AND PROTECTION CORPORATION
            </div>
          </div>
          <div style={{ minWidth: '80px' }} />
        </div>

        {restricted ? (
          <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#ffaa00', letterSpacing: '0.1em' }}>
            ⚠ CLASSIFIED — OVERSIGHT CLEARANCE ACTIVE — ALL ACCESS LOGGED ⚠
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#ff3300', letterSpacing: '0.1em' }}>
            ⚠ RESTRICTED ACCESS — STANDARD CLEARANCE — ELEVATED CONTENT REDACTED ⚠
          </div>
        )}
      </div>

      {archiveSections.map(section => (
        <div key={section.prefix} style={s.section}>
          <div style={s.sectionTitle}>
            [{section.prefix}] — {section.label}
          </div>

          {section.entries.map(entry => (
            <div key={entry.id} style={s.entryRow}>
              <div style={s.entryId}>{entry.id}</div>
              <div style={{ flex: 1 }}>
                {restricted ? (
                  <>
                    <div style={s.entryTitle}>{entry.title}</div>
                    <span style={s.granted}>ACCESS GRANTED</span>
                    <div style={s.contentText}>{entry.content}</div>
                  </>
                ) : (
                  <>
                    <div style={s.entryTitle}>{entry.title}</div>
                    <span style={s.denied}>ACCESS DENIED</span>
                    <div style={{ fontSize: '0.72rem', color: '#555', marginTop: '0.25rem' }}>
                      CONTENT REDACTED — INSUFFICIENT CLEARANCE
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Root component ───────────────────────────────────────────────────────────

function DACPCApp() {
  const [view, setView] = useState<View>('login')
  const [isOversight, setIsOversight] = useState(false)
  const [username, setUsername] = useState('UNKNOWN')

  function handleLogin(restricted: boolean, name: string) {
    setIsOversight(restricted)
    setUsername(name)
    setView('hub')
  }

  if (view === 'login') {
    return <LoginView onLogin={handleLogin} />
  }

  if (view === 'hub') {
    return (
      <HubView
        username={username}
        isOversight={isOversight}
        onNavigate={setView}
        onLogout={() => setView('login')}
      />
    )
  }

  if (view === 'archives' || view === 'restricted') {
    return (
      <ArchivesView
        restricted={view === 'restricted'}
        onBack={() => setView('hub')}
      />
    )
  }

  if (view === 'facilities') {
    return <FacilitiesView onBack={() => setView('hub')} />
  }

  if (view === 'missions') {
    return (
      <MissionsView
        isOversight={isOversight}
        username={username}
        onBack={() => setView('hub')}
      />
    )
  }

  if (view === 'report-anomaly') {
    return <ReportAnomalyView onBack={() => setView('hub')} />
  }

  if (view === 'command-panel') {
    return (
      <CommandPanelView
        username={username}
        onBack={() => setView('hub')}
      />
    )
  }

  return null
}
