"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollProgress } from "@/components/composite/scroll-progress"
import { CursorGlow } from "@/components/composite/cursor-glow"
import { StyleApplier } from "@/components/composite/style-applier"
import { StyleSwitcher } from "@/components/composite/style-switcher"
import { LayerReveal } from "@/components/composite/layer-reveal"

/* ── UI Library ── */
import { LibButton } from "@/components/ui/lib-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { SearchBar } from "@/components/ui/search-bar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup } from "@/components/ui/radio"
import { LibBadge } from "@/components/ui/lib-badge"
import { ToastPreview, ToasterMount } from "@/components/ui/toast"
import { Dialog, DialogFooter } from "@/components/ui/dialog"
import { Table, TableStatusCell } from "@/components/ui/table"
import { Dropdown } from "@/components/ui/dropdown"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card"
import { Tabs } from "@/components/ui/tabs"
import { Accordion } from "@/components/ui/accordion"
import { Toggle } from "@/components/ui/toggle"
import { Progress } from "@/components/ui/progress"
import { Tooltip } from "@/components/ui/tooltip"
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/skeleton"
import { Alert } from "@/components/ui/alert"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Pagination } from "@/components/ui/pagination"
import { StatCard } from "@/components/ui/stat-card"
import { CodeBlock } from "@/components/ui/code-block"
import { Timeline } from "@/components/ui/timeline"

import { TiltCard3D }      from "@/components/ui/tilt-card-3d"
import { FlipCard3D }      from "@/components/ui/flip-card-3d"
import { Cube3D }          from "@/components/ui/cube-3d"
import { ParticleField }   from "@/components/ui/particle-field"
import { FloatingOrb }     from "@/components/ui/floating-orb"
import { RingOrbit3D }     from "@/components/ui/ring-orbit-3d"
import { PerspectiveGrid } from "@/components/ui/perspective-grid"

import { MorphBlob }       from "@/components/ui/morph-blob"
import { WarpTunnel3D }    from "@/components/ui/warp-tunnel-3d"
import { HologramCard3D }  from "@/components/ui/hologram-card-3d"
import { StackedCards3D }  from "@/components/ui/stacked-cards-3d"
import { DNAHelix3D }      from "@/components/ui/dna-helix-3d"
import { GravityOrbit3D }  from "@/components/ui/gravity-orbit-3d"
import { NeuralNet3D }     from "@/components/ui/neural-net-3d"

import { toast } from "@/stores/toast-store"
import {
  StarIcon, BriefcaseIcon, CodeIcon, LayersIcon, ZapIcon,
  MailIcon, CopyIcon, TrashIcon, EditIcon, MoreHorizontalIcon, ExternalLinkIcon,
  ArrowLeftIcon, PlusIcon, DownloadIcon, HomeIcon, FolderIcon, FileIcon,
  UsersIcon, TrendingUpIcon, DollarSignIcon, ActivityIcon, ShieldIcon,
  SparklesIcon, CpuIcon, GlobeIcon,
} from "lucide-react"

/* ── Showcase helpers ── */
function ShowcaseSection({ id, title, description, children }: {
  id: string; title: string; description?: string; children: React.ReactNode
}) {
  return (
    <LayerReveal>
      <section id={id} className="py-12 border-t" style={{ borderColor: "var(--card-border)" }}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1.5" style={{ color: "hsl(var(--text-heading))" }}>{title}</h2>
          {description && <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{description}</p>}
        </div>
        <div className="space-y-10">{children}</div>
      </section>
    </LayerReveal>
  )
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "hsl(var(--text-dim))" }}>{title}</p>
      {children}
    </div>
  )
}

/* ── Table data ── */
const TABLE_COLS = [
  { key: "name",    header: "Name" },
  { key: "role",    header: "Role" },
  { key: "status",  header: "Status", render: (v: unknown) => <TableStatusCell status={String(v)} /> },
  { key: "joined",  header: "Joined" },
  { key: "actions", header: "", align: "right" as const,
    render: (_: unknown, row: Record<string, unknown>) => (
      <Dropdown align="right"
        trigger={<button className="ui-btn ui-btn-ghost ui-btn-icon" style={{ height: "1.75rem", width: "1.75rem" }}><MoreHorizontalIcon className="w-4 h-4" /></button>}
        items={[
          { key: "edit",   label: "Edit",    icon: <EditIcon className="w-3.5 h-3.5" />, onClick: () => toast.info(`Editing ${row.name}`) },
          { key: "copy",   label: "Copy ID", icon: <CopyIcon className="w-3.5 h-3.5" />, onClick: () => toast.success("ID copied!") },
          "divider",
          { key: "delete", label: "Delete",  icon: <TrashIcon className="w-3.5 h-3.5" />, variant: "danger", onClick: () => toast.error("Deleted!") },
        ]}
      />
    ),
  },
]
const TABLE_ROWS = [
  { id: 1, name: "Manish Soni",  role: "Lead Engineer",  status: "active",   joined: "Apr 2024" },
  { id: 2, name: "Anika Patel",  role: "Product Design", status: "active",   joined: "Jan 2024" },
  { id: 3, name: "Ravi Kumar",   role: "Backend Dev",    status: "pending",  joined: "Mar 2025" },
  { id: 4, name: "Priya Sharma", role: "DevOps",         status: "inactive", joined: "Feb 2023" },
]

const SAMPLE_CODE = `// Optimistic skill endorsement
import { useOptimistic, useTransition } from "react"
import { endorseSkill } from "@/stores"

export function EndorsablePill({ skill, count }: Props) {
  const [optimistic, addOptimistic] = useOptimistic(count,
    (_: number, next: number) => next
  )
  const [pending, startTransition] = useTransition()

  const handleEndorse = () =>
    startTransition(async () => {
      addOptimistic(optimistic + 1)   // instant UI
      await endorseSkill(skill)       // real API
    })

  return (
    <button onClick={handleEndorse} disabled={pending}>
      {skill} · {optimistic}
    </button>
  )
}`

/* ── Page ── */
export default function DesignPage() {
  const [searchVal, setSearchVal]   = useState("")
  const [inputVal, setInputVal]     = useState("")
  const [textareaVal, setTextareaVal] = useState("")
  const [selectVal, setSelectVal]   = useState("")
  const [checked, setChecked]       = useState(false)
  const [radioVal, setRadioVal]     = useState("react")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [activeTab, setActiveTab]   = useState("overview")
  const [toggle1, setToggle1]       = useState(true)
  const [toggle2, setToggle2]       = useState(false)
  const [toggle3, setToggle3]       = useState(true)
  const [page, setPage]             = useState(1)

  return (
    <>
      <div className="veil-bg-fixed" aria-hidden="true" />
      <ScrollProgress />
      <CursorGlow />
      <StyleApplier />
      <ToasterMount />

      <div className="max-w-5xl mx-auto px-6 pb-40">

        {/* ── Header ── */}
        <div className="pt-20 pb-4">
          <LayerReveal>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 transition-opacity hover:opacity-70" style={{ color: "hsl(var(--text-muted))" }}>
              <ArrowLeftIcon className="w-3 h-3" />
              Back to portfolio
            </Link>
          </LayerReveal>
          <LayerReveal delay={40}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 gradient-text">Design System</h1>
                <p className="text-sm max-w-lg" style={{ color: "hsl(var(--text-body))" }}>
                  28 components that morph across 9 design systems. Switch themes at the bottom — every component adapts its shape, shadow, border, and feel.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {(["primary","success","warning","error","info"] as const).map((v) => (
                  <LibBadge key={v} variant={v} dot>{v.charAt(0).toUpperCase()+v.slice(1)}</LibBadge>
                ))}
              </div>
            </div>
          </LayerReveal>
        </div>

        {/* ══════════════════ AVATARS ══════════════════ */}
        <ShowcaseSection id="avatars" title="Avatars" description="User avatars with image, initials fallback, online indicator, and 5 sizes.">
          <Sub title="Sizes + image">
            <div className="flex items-end gap-4 flex-wrap">
              {(["xs","sm","md","lg","xl"] as const).map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Avatar size={s} src="https://i.pravatar.cc/150?img=3" alt="Manish" />
                  <span className="text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>{s}</span>
                </div>
              ))}
            </div>
          </Sub>
          <Sub title="Initials fallback + online">
            <div className="flex items-end gap-4 flex-wrap">
              <Avatar size="xl" name="Manish Soni" online />
              <Avatar size="lg" name="Anika Patel" online />
              <Avatar size="md" name="Ravi Kumar" />
              <Avatar size="sm" name="P S" />
              <Avatar size="xs" name="X" />
            </div>
          </Sub>
          <Sub title="Avatar group">
            <div className="flex items-center">
              {["Manish Soni","Anika Patel","Ravi Kumar","Priya Sharma","Dev Ops"].map((n, i) => (
                <div key={n} style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: 10 - i }}>
                  <Avatar size="md" name={n} />
                </div>
              ))}
              <div style={{ marginLeft: "-10px", zIndex: 1 }}>
                <div className="ui-avatar ui-avatar-md" style={{ background: "hsl(var(--surface-2))", fontSize: ".65rem", color: "hsl(var(--text-muted))", fontWeight: 600 }}>+4</div>
              </div>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ CARDS ══════════════════ */}
        <ShowcaseSection id="cards" title="Cards" description="Content cards with header, body, footer sub-components. Shape and shadow adapt per theme.">
          <Sub title="Variants">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card hover>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 w-full">
                    <div>
                      <div className="ui-card-title">Basic Card</div>
                      <div className="ui-card-desc">With hover effect and header action</div>
                    </div>
                    <LibBadge variant="success" size="sm" dot>Active</LibBadge>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm" style={{ color: "hsl(var(--text-body))" }}>Cards morph completely between themes — rounded glass in Aurora, neumorphic clay in Clay, brutal-bordered in Neobrutalism.</p>
                </CardBody>
                <CardFooter>
                  <LibButton variant="primary" size="sm">View details</LibButton>
                  <LibButton variant="ghost" size="sm">Dismiss</LibButton>
                </CardFooter>
              </Card>

              <Card>
                <CardBody>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar size="md" name="Manish Soni" online />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>Manish Soni</div>
                      <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Lead Engineer · Remote</div>
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: "hsl(var(--text-body))" }}>Building fintech infrastructure at Mercato. Previously IIT Roorkee. Passionate about design systems and developer experience.</p>
                  <div className="flex gap-2 mt-3">
                    <LibBadge variant="primary" size="sm">Next.js</LibBadge>
                    <LibBadge variant="info" size="sm">Go</LibBadge>
                    <LibBadge variant="default" size="sm">AWS</LibBadge>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ STAT CARDS ══════════════════ */}
        <ShowcaseSection id="stats" title="Stat Cards" description="KPI and metric display cards with delta indicators and trend icons.">
          <Sub title="Grid">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Total Revenue" value="$2.4M" delta="+18.2%" deltaType="increase" icon={<DollarSignIcon className="w-5 h-5" />} description="vs last quarter" />
              <StatCard label="Active Users" value="12,840" delta="+4.6%" deltaType="increase" icon={<UsersIcon className="w-5 h-5" />} description="Monthly active" />
              <StatCard label="Churn Rate" value="1.8%" delta="-0.4%" deltaType="decrease" icon={<TrendingUpIcon className="w-5 h-5" />} description="30-day trailing" />
              <StatCard label="Uptime SLA" value="99.97%" delta="0.0%" deltaType="neutral" icon={<ActivityIcon className="w-5 h-5" />} description="Last 90 days" />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ TABS ══════════════════ */}
        <ShowcaseSection id="tabs" title="Tabs" description="Three variants with animated Framer Motion indicators. The underline type slides, the pill type morphs.">
          <Sub title="Underline (default)">
            <Tabs
              variant="underline"
              activeKey={activeTab}
              onChange={setActiveTab}
              tabs={[
                { key: "overview", label: "Overview", icon: <LayersIcon className="w-3.5 h-3.5" /> },
                { key: "activity", label: "Activity",  icon: <ActivityIcon className="w-3.5 h-3.5" />, badge: "3" },
                { key: "settings", label: "Settings",  icon: <ShieldIcon className="w-3.5 h-3.5" /> },
                { key: "disabled", label: "Disabled",  disabled: true },
              ]}
            >
              <div className="text-sm" style={{ color: "hsl(var(--text-body))" }}>
                {activeTab === "overview" && "Overview tab — shows summary metrics and recent activity."}
                {activeTab === "activity" && "Activity feed — 3 new events since your last visit."}
                {activeTab === "settings" && "Settings panel — manage your workspace preferences."}
              </div>
            </Tabs>
          </Sub>
          <Sub title="Pill variant">
            <Tabs
              variant="pill"
              activeKey={activeTab}
              onChange={setActiveTab}
              tabs={[
                { key: "overview", label: "Overview" },
                { key: "activity", label: "Activity" },
                { key: "settings", label: "Settings" },
              ]}
            />
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ ACCORDION ══════════════════ */}
        <ShowcaseSection id="accordion" title="Accordion" description="Smooth height animation via Framer Motion. Supports single or multi-open mode.">
          <Sub title="FAQ example">
            <div className="max-w-2xl">
              <Accordion items={[
                { key: "q1", title: "How does the theme switcher work?",
                  icon: <LayersIcon className="w-4 h-4" />,
                  subtitle: "Design system internals",
                  children: <p>The <code style={{ color: "hsl(var(--primary))" }}>html[data-style="X"]</code> attribute triggers per-theme CSS overrides in themes.css. Every component uses semantic CSS variables — switching the attribute re-skins everything instantly with zero JavaScript.</p> },
                { key: "q2", title: "What makes each theme structurally different?",
                  icon: <CodeIcon className="w-4 h-4" />,
                  children: <p>Beyond colors, each theme changes <strong>border-radius</strong> (0px in Neobrutalism → 14px in Clay), <strong>shadows</strong> (hard drop-shadows vs neumorphic insets vs neon glows), <strong>border-width</strong>, font-family (monospace in Carbon), and transition speed.</p> },
                { key: "q3", title: "Which frameworks are used?",
                  icon: <ZapIcon className="w-4 h-4" />,
                  defaultOpen: true,
                  children: <div className="flex gap-2 flex-wrap"><LibBadge variant="primary">Next.js 15</LibBadge><LibBadge variant="info">React 19</LibBadge><LibBadge variant="default">Framer Motion</LibBadge><LibBadge variant="default">TypeScript</LibBadge><LibBadge variant="default">Tailwind CSS</LibBadge><LibBadge variant="default">Zustand</LibBadge></div> },
              ]} />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ PROGRESS ══════════════════ */}
        <ShowcaseSection id="progress" title="Progress Bars" description="Animated fill with Framer Motion. Variants, sizes, and optional glow animation.">
          <Sub title="Variants + sizes">
            <div className="max-w-lg space-y-5">
              <Progress value={78} label="TypeScript" showValue variant="default" size="md" animated />
              <Progress value={92} label="React / Next.js" showValue variant="success" size="md" />
              <Progress value={45} label="Deployment Pipeline" showValue variant="warning" size="lg" />
              <Progress value={23} label="Error Rate" showValue variant="error" size="sm" />
              <Progress value={100} label="Uptime SLA" showValue variant="success" size="sm" />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ TOGGLES ══════════════════ */}
        <ShowcaseSection id="toggles" title="Toggles" description="Animated thumb with Framer Motion layout animation. Three sizes with label and description slots.">
          <Sub title="With labels">
            <div className="flex flex-col gap-4 max-w-sm">
              <Toggle checked={toggle1} onChange={setToggle1} size="md" label="Dark mode" description="Switch between light and dark themes." />
              <Toggle checked={toggle2} onChange={setToggle2} size="md" label="Notifications" description="Receive push notifications for updates." />
              <Toggle checked={toggle3} onChange={setToggle3} size="lg" label="Beta features" description="Enable experimental preview features." />
              <Toggle checked={false} onChange={() => {}} size="sm" label="Disabled toggle" disabled />
            </div>
          </Sub>
          <Sub title="Sizes bare">
            <div className="flex items-center gap-6">
              <Toggle checked={toggle1} onChange={setToggle1} size="sm" />
              <Toggle checked={toggle2} onChange={setToggle2} size="md" />
              <Toggle checked={toggle3} onChange={setToggle3} size="lg" />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ ALERTS ══════════════════ */}
        <ShowcaseSection id="alerts" title="Alerts" description="Inline notification banners with left-accent stripe, dismissable, and AnimatePresence exit animation.">
          <Sub title="All variants">
            <div className="max-w-2xl space-y-3">
              <Alert variant="success" title="Deployment successful" onDismiss={() => toast.info("Alert dismissed")}>Your changes went live to production 2 minutes ago. No errors detected.</Alert>
              <Alert variant="error" title="Build failed" onDismiss={() => {}}>TypeScript error in <code>contact-section.tsx</code> line 42 — parameter &apos;e&apos; implicitly has type &apos;any&apos;.</Alert>
              <Alert variant="warning" title="API rate limit approaching">You&apos;ve used 87% of your monthly quota. Upgrade to avoid disruption.</Alert>
              <Alert variant="info">Scheduled maintenance on Sunday 02:00–04:00 UTC. Read-only mode will be active during the window.</Alert>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ TOOLTIP ══════════════════ */}
        <ShowcaseSection id="tooltips" title="Tooltips" description="Portal-rendered hover tooltips with 4 placements and configurable delay. Escape stacking context issues.">
          <Sub title="Placements">
            <div className="flex flex-wrap gap-4 items-center py-4">
              <Tooltip content="Rendered above via portal" placement="top" delay={0}>
                <LibButton variant="secondary" size="sm">Top</LibButton>
              </Tooltip>
              <Tooltip content="Below the element" placement="bottom" delay={0}>
                <LibButton variant="secondary" size="sm">Bottom</LibButton>
              </Tooltip>
              <Tooltip content="To the right" placement="right" delay={0}>
                <LibButton variant="secondary" size="sm">Right</LibButton>
              </Tooltip>
              <Tooltip content="To the left" placement="left" delay={0}>
                <LibButton variant="secondary" size="sm">Left</LibButton>
              </Tooltip>
              <Tooltip content="Download the complete design system source code as a ZIP archive" placement="top">
                <LibButton variant="outline" size="sm" leftIcon={<DownloadIcon className="w-4 h-4" />}>Hover me (300ms delay)</LibButton>
              </Tooltip>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ SKELETON ══════════════════ */}
        <ShowcaseSection id="skeleton" title="Skeleton Loaders" description="Shimmer-animated loading placeholders. Base Skeleton + SkeletonText + SkeletonCard presets.">
          <Sub title="Shapes">
            <div className="flex items-end gap-4 flex-wrap">
              <Skeleton circle width={48} height={48} />
              <Skeleton width={120} height={12} />
              <Skeleton width={200} height={20} />
              <Skeleton width={80} height={32} rounded />
            </div>
          </Sub>
          <Sub title="Text + Card presets">
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "hsl(var(--text-dim))" }}>Text skeleton</p>
                <SkeletonText lines={4} />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "hsl(var(--text-dim))" }}>Card skeleton</p>
                <SkeletonCard />
              </div>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ BREADCRUMB ══════════════════ */}
        <ShowcaseSection id="breadcrumb" title="Breadcrumbs" description="Navigation breadcrumb trail with configurable separator and link support.">
          <Sub title="Examples">
            <div className="space-y-4">
              <Breadcrumb items={[
                { label: "Home",     href: "/", icon: <HomeIcon className="w-3 h-3" /> },
                { label: "Projects", href: "/projects" },
                { label: "Portfolio" },
              ]} />
              <Breadcrumb items={[
                { label: "Dashboard", href: "#", icon: <LayersIcon className="w-3 h-3" /> },
                { label: "Design",    href: "#", icon: <FolderIcon className="w-3 h-3" /> },
                { label: "Component Library", icon: <FileIcon className="w-3 h-3" /> },
              ]} separator={<span style={{ color: "hsl(var(--text-dim))" }}>/</span>} />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ PAGINATION ══════════════════ */}
        <ShowcaseSection id="pagination" title="Pagination" description="Page navigation with ellipsis window, edge buttons, and active page highlight.">
          <Sub title="Interactive">
            <div className="space-y-4">
              <Pagination page={page} totalPages={12} onChange={setPage} showEdges maxVisible={5} />
              <p className="text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>Current page: {page} of 12</p>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ CODE BLOCK ══════════════════ */}
        <ShowcaseSection id="code" title="Code Block" description="Syntax-highlighted code with copy-to-clipboard, filename, language badge. Carbon theme makes this feel very terminal.">
          <Sub title="Example">
            <CodeBlock
              code={SAMPLE_CODE}
              language="tsx"
              filename="endorsable-pill.tsx"
              showCopy
              maxHeight="380px"
            />
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ TIMELINE ══════════════════ */}
        <ShowcaseSection id="timeline" title="Timeline" description="Vertical event timeline with variant dot colors and connecting lines.">
          <Sub title="Project history">
            <div className="max-w-lg">
              <Timeline events={[
                { id: "1", title: "v2.0 shipped to production", description: "Full design system with 9 themes and 28 components. Zero TypeScript errors.", date: "May 2026", variant: "success", icon: <ZapIcon className="w-3 h-3" /> },
                { id: "2", title: "Optimistic UI added", description: "React 19 useOptimistic for skill endorsements and contact form.", date: "Apr 2026", variant: "info" },
                { id: "3", title: "Multi-theme system built", description: "Aurora, Carbon, Clay, Pulse, Obsidian, Neobrutalism, Neon Noir, Synthwave.", date: "Mar 2026", variant: "info" },
                { id: "4", title: "Portfolio v1 launched", description: "Initial Veil dark theme with scroll theater animations and Framer Motion.", date: "Jan 2026", variant: "default" },
                { id: "5", title: "TypeScript error fixed", description: "Hooks violation — conditional useId calls refactored to unconditional.", date: "Dec 2025", variant: "warning" },
              ]} />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ BUTTONS ══════════════════ */}
        <ShowcaseSection id="buttons" title="Buttons" description="Five semantic variants × four sizes. Loading state and Framer Motion press animation.">
          <Sub title="Variants">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" leftIcon={<ZapIcon className="w-4 h-4" />}>Primary</LibButton>
              <LibButton variant="secondary">Secondary</LibButton>
              <LibButton variant="outline" leftIcon={<StarIcon className="w-4 h-4" />}>Outline</LibButton>
              <LibButton variant="ghost">Ghost</LibButton>
              <LibButton variant="danger">Danger</LibButton>
            </div>
          </Sub>
          <Sub title="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <LibButton variant="primary" size="sm">Small</LibButton>
              <LibButton variant="primary" size="md">Medium</LibButton>
              <LibButton variant="primary" size="lg">Large</LibButton>
              <LibButton variant="primary" size="xl">X-Large</LibButton>
              <LibButton variant="secondary" size="icon"><PlusIcon className="w-4 h-4" /></LibButton>
            </div>
          </Sub>
          <Sub title="States + live toasts">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" loading>Saving…</LibButton>
              <LibButton variant="secondary" disabled>Disabled</LibButton>
              <LibButton variant="outline" leftIcon={<DownloadIcon className="w-4 h-4" />} rightIcon={<ExternalLinkIcon className="w-3.5 h-3.5 opacity-60" />}>With Icons</LibButton>
              <LibButton variant="primary" onClick={() => toast.success("Primary clicked!", "Action was successful.")}>Success Toast</LibButton>
              <LibButton variant="danger" onClick={() => toast.error("Action failed", "Something went wrong.")}>Error Toast</LibButton>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ INPUTS ══════════════════ */}
        <ShowcaseSection id="inputs" title="Inputs & Forms" description="Full-featured form controls with labels, hints, validation states, and focus animations.">
          <Sub title="Text inputs">
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              <Input label="Full Name" placeholder="Manish Soni" value={inputVal} onChange={(e) => setInputVal(e.target.value)} hint="Enter your legal name" leftIcon={<BriefcaseIcon className="w-3.5 h-3.5" />} />
              <Input label="Email" placeholder="you@example.com" type="email" leftIcon={<MailIcon className="w-3.5 h-3.5" />} />
              <Input label="With Error" placeholder="bad@input.com" error="That email is already taken." leftIcon={<MailIcon className="w-3.5 h-3.5" />} defaultValue="duplicate@test.com" />
              <Input label="Disabled" placeholder="Can't touch this" disabled value="Locked value" />
            </div>
          </Sub>
          <Sub title="Textarea + Select + Search">
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              <Textarea label="Message" placeholder="Tell me about your project…" value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} rows={4} showCount maxLength={280} hint="Keep it under 280 characters" />
              <div className="flex flex-col gap-4">
                <Select label="Role" placeholder="Pick a role…" value={selectVal} onChange={(e) => setSelectVal(e.target.value)}
                  options={[
                    { value: "engineer",  label: "Software Engineer" },
                    { value: "designer",  label: "Product Designer" },
                    { value: "manager",   label: "Engineering Manager" },
                    { value: "architect", label: "Platform Architect" },
                  ]} hint="Your primary function" />
                <div className="flex flex-col gap-1.5">
                  <p className="ui-label">Search</p>
                  <SearchBar value={searchVal} onValueChange={setSearchVal} placeholder="Search anything…" />
                </div>
              </div>
            </div>
          </Sub>
          <Sub title="Checkboxes + Radios">
            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl">
              <div className="flex flex-col gap-3">
                <Checkbox label="Enable notifications" description="Receive alerts for new messages." checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <Checkbox label="Remember me for 30 days" defaultChecked />
                <Checkbox label="Disabled option" disabled />
              </div>
              <RadioGroup label="Preferred Stack" name="stack" value={radioVal} onChange={setRadioVal}
                options={[
                  { value: "react",    label: "React / Next.js",  description: "TypeScript + Tailwind" },
                  { value: "golang",   label: "Go (Backend)",      description: "REST & gRPC services" },
                  { value: "mobile",   label: "React Native",      description: "Cross-platform mobile" },
                  { value: "disabled", label: "Unavailable",       disabled: true },
                ]} />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ BADGES ══════════════════ */}
        <ShowcaseSection id="badges" title="Badges" description="Semantic status indicators with optional dot. Auto-adapt across all 9 themes.">
          <Sub title="Variants">
            <div className="flex flex-wrap gap-2">
              <LibBadge variant="default">Default</LibBadge>
              <LibBadge variant="primary">Primary</LibBadge>
              <LibBadge variant="success" dot>Active</LibBadge>
              <LibBadge variant="warning" dot>Pending</LibBadge>
              <LibBadge variant="error" dot>Error</LibBadge>
              <LibBadge variant="info">Info</LibBadge>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ TOASTS ══════════════════ */}
        <ShowcaseSection id="toasts" title="Toasts" description="Portal-rendered animated notifications with auto-dismiss.">
          <Sub title="Preview">
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {(["success","error","warning","info"] as const).map((type) => (
                <ToastPreview key={type} type={type} />
              ))}
            </div>
          </Sub>
          <Sub title="Live">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="secondary" size="sm" onClick={() => toast.success("Profile saved!", "Your changes applied.")}>✓ Success</LibButton>
              <LibButton variant="secondary" size="sm" onClick={() => toast.error("Upload failed", "File exceeds 10 MB.")}>✕ Error</LibButton>
              <LibButton variant="secondary" size="sm" onClick={() => toast.warning("Rate limit", "90% of monthly quota used.")}>⚠ Warning</LibButton>
              <LibButton variant="secondary" size="sm" onClick={() => toast.info("Tip", "Press Ctrl+K for command palette.")}>ℹ Info</LibButton>
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ DIALOGS ══════════════════ */}
        <ShowcaseSection id="dialogs" title="Dialogs" description="Accessible portal modals. Escape close, backdrop dismiss, scroll lock, AnimatePresence.">
          <Sub title="Examples">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" onClick={() => setDialogOpen(true)}>Open Info Dialog</LibButton>
              <LibButton variant="danger" onClick={() => setConfirmOpen(true)}>Open Confirm Dialog</LibButton>
            </div>
          </Sub>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="About this component" description="Dialogs are portaled to document.body and adapt per theme.">
            <div className="space-y-3 text-sm" style={{ color: "hsl(var(--text-body))" }}>
              <p>Open in Neobrutalism for thick borders, Clay for neumorphic depth, or Neon Noir for a pink glow. The structure is identical — only theme CSS changes.</p>
            </div>
            <DialogFooter>
              <LibButton variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>Cancel</LibButton>
              <LibButton variant="primary" size="sm" onClick={() => { setDialogOpen(false); toast.success("Got it!") }}>Confirm</LibButton>
            </DialogFooter>
          </Dialog>
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Delete this project?" description="This action is permanent and cannot be undone.">
            <DialogFooter>
              <LibButton variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</LibButton>
              <LibButton variant="danger" size="sm" onClick={() => { setConfirmOpen(false); toast.error("Deleted!") }}>Delete forever</LibButton>
            </DialogFooter>
          </Dialog>
        </ShowcaseSection>

        {/* ══════════════════ DROPDOWNS ══════════════════ */}
        <ShowcaseSection id="dropdowns" title="Dropdowns" description="Portal-rendered menus — escape stacking context from Framer Motion transforms.">
          <Sub title="Examples">
            <div className="flex flex-wrap gap-4 items-start">
              <Dropdown
                trigger={<LibButton variant="secondary" rightIcon={<ExternalLinkIcon className="w-3.5 h-3.5 opacity-50" />}>Actions</LibButton>}
                items={[
                  { key: "view",   label: "View details",  icon: <ExternalLinkIcon className="w-3.5 h-3.5" />, onClick: () => toast.info("Viewing…") },
                  { key: "edit",   label: "Edit",          icon: <EditIcon className="w-3.5 h-3.5" />,         onClick: () => toast.info("Editing…") },
                  { key: "copy",   label: "Copy link",     icon: <CopyIcon className="w-3.5 h-3.5" />,         onClick: () => toast.success("Link copied!") },
                  "divider",
                  { key: "delete", label: "Delete",        icon: <TrashIcon className="w-3.5 h-3.5" />, variant: "danger", onClick: () => toast.error("Deleted!") },
                ]}
              />
              <Dropdown align="right"
                trigger={<LibButton variant="outline" size="icon"><MoreHorizontalIcon className="w-4 h-4" /></LibButton>}
                items={[
                  { key: "profile",  label: "Profile",  description: "View your public profile",  icon: <StarIcon className="w-3.5 h-3.5" /> },
                  { key: "settings", label: "Settings", description: "Manage preferences",         icon: <LayersIcon className="w-3.5 h-3.5" /> },
                  "divider",
                  { key: "logout",   label: "Sign out", icon: <ArrowLeftIcon className="w-3.5 h-3.5" />, variant: "danger" },
                ]}
              />
            </div>
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ TABLE ══════════════════ */}
        <ShowcaseSection id="tables" title="Tables" description="Responsive data tables with status cells and per-row action dropdowns.">
          <Sub title="Team roster">
            <Table columns={TABLE_COLS} rows={TABLE_ROWS as unknown as Record<string, unknown>[]} showIndex keyField="id" emptyMessage="No team members found" />
          </Sub>
        </ShowcaseSection>

        {/* ══════════════════ THEME PALETTE ══════════════════ */}
        <ShowcaseSection id="themes" title="Theme Palette" description="All 9 design systems. Each changes shape, shadow, border style, font feel, and color — not just hues.">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: "Veil",         desc: "Default · midnight navy + teal/gold · soft glow",         a: "#00FFDA", b: "#F5A623", bg: "#050d1a", radius: "10px", shadow: "glow" },
              { name: "Aurora",       desc: "Rounded · light glass + indigo/fuchsia · backdrop blur",   a: "#6D5BFF", b: "#C026D3", bg: "#f5f3ff", radius: "16px", shadow: "colored" },
              { name: "Carbon",       desc: "Sharp · charcoal + terminal cyan · monospace font",        a: "#00D2E6", b: "#00f0ff", bg: "#0d111a", radius: "3px",  shadow: "terminal" },
              { name: "Clay",         desc: "Soft · warm cream + terracotta · neumorphic shadows",      a: "#b44b23", b: "#c66a1e", bg: "#f5eee6", radius: "14px", shadow: "neuro" },
              { name: "Pulse",        desc: "Bold · white + coral · thick 2px borders · flat",         a: "#f0321e", b: "#f58214", bg: "#fafafa", radius: "6px",  shadow: "flat" },
              { name: "Obsidian",     desc: "Dark · pure black + neon lime · sharp edges",             a: "#82e600", b: "#ffe600", bg: "#080808", radius: "4px",  shadow: "neon-green" },
              { name: "Neobrutalism", desc: "Zero radius · thick black borders · hard drop shadows",   a: "#ffeb00", b: "#ff1580", bg: "#fffde6", radius: "0px",  shadow: "hard" },
              { name: "Neon Noir",    desc: "Thin neon · near-black + hot pink · pink glow borders",   a: "#ff1ab3", b: "#8000ff", bg: "#050505", radius: "5px",  shadow: "pink-glow" },
              { name: "Synthwave",    desc: "Retro · deep purple + pink/cyan · gradient fills",        a: "#ff1ab3", b: "#00e5ff", bg: "#140d22", radius: "8px",  shadow: "gradient" },
            ].map((theme) => (
              <motion.div key={theme.name} className="veil-card rounded-xl p-4 cursor-default"
                whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 380, damping: 24 }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-md border border-white/10 flex items-center justify-content-center" style={{ background: theme.bg }}>
                    <div className="w-2.5 h-2.5 rounded-full mx-auto mt-1.5" style={{ background: theme.a }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "hsl(var(--text-heading))" }}>{theme.name}</span>
                </div>
                <p className="text-[10px] leading-relaxed mb-2" style={{ color: "hsl(var(--text-dim))" }}>{theme.desc}</p>
                <div className="flex gap-1">
                  <div className="h-1.5 flex-1 rounded-full" style={{ background: theme.a }} />
                  <div className="h-1.5 flex-1 rounded-full" style={{ background: theme.b }} />
                  <div className="h-1.5 flex-1 rounded-full border border-white/10" style={{ background: theme.bg }} />
                </div>
                <div className="mt-2 flex gap-1.5 items-center">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "hsl(var(--text-dim))" }}>r={theme.radius}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "hsl(var(--text-dim))" }}>{theme.shadow}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ShowcaseSection>

        {/* ══════════════════ 3D & GRAPHICS ══════════════════ */}
        <ShowcaseSection id="3d" title="3D & Graphics" description="Seven GPU-accelerated components — CSS perspective, Framer Motion spring physics, and canvas-drawn particle systems.">

          {/* Tilt Cards */}
          <Sub title="Tilt Card 3D — mouse-tracked perspective">
            <div className="grid sm:grid-cols-3 gap-5">
              <TiltCard3D className="veil-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-content-center" style={{ background: "var(--impact-bg)" }}>
                    <SparklesIcon className="w-5 h-5 mx-auto mt-2.5" style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>Design System</div>
                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>v2.0 · 35 components</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>Hover me — the card tilts toward your cursor with spring physics and a live glare sheen.</p>
                <div className="flex gap-2 mt-3">
                  <LibBadge variant="primary" size="sm">CSS 3D</LibBadge>
                  <LibBadge variant="info" size="sm">Framer</LibBadge>
                </div>
              </TiltCard3D>

              <TiltCard3D intensity={20} className="veil-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-content-center" style={{ background: "var(--impact-bg)" }}>
                    <CpuIcon className="w-5 h-5 mx-auto mt-2.5" style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>High Intensity</div>
                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>intensity=20</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>Shadow shifts opposite to tilt direction, amplifying the 3D depth illusion.</p>
              </TiltCard3D>

              <TiltCard3D intensity={8} glare={false} className="veil-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-content-center" style={{ background: "var(--impact-bg)" }}>
                    <GlobeIcon className="w-5 h-5 mx-auto mt-2.5" style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>Subtle Mode</div>
                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>intensity=8, no glare</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>Lower intensity and glare disabled for UI cards that need subtlety.</p>
              </TiltCard3D>
            </div>
          </Sub>

          {/* Flip Cards */}
          <Sub title="Flip Card 3D — hover or click to reveal back">
            <div className="grid sm:grid-cols-3 gap-5">
              <FlipCard3D
                height={200}
                front={
                  <div className="veil-card rounded-xl w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                    <SparklesIcon className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />
                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>Hover to flip</div>
                    <div className="text-xs text-center" style={{ color: "hsl(var(--text-muted))" }}>Y-axis · hover trigger</div>
                  </div>
                }
                back={
                  <div className="rounded-xl w-full h-full flex flex-col items-center justify-center gap-2 p-4" style={{ background: "hsl(var(--primary))", color: "hsl(var(--background))" }}>
                    <div className="text-sm font-bold">Back face!</div>
                    <div className="text-xs text-center opacity-80">backfaceVisibility hidden + spring physics</div>
                  </div>
                }
              />
              <FlipCard3D
                height={200}
                trigger="click"
                front={
                  <div className="veil-card rounded-xl w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                    <CpuIcon className="w-8 h-8" style={{ color: "hsl(var(--accent))" }} />
                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>Click to flip</div>
                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>click trigger · toggle</div>
                  </div>
                }
                back={
                  <div className="rounded-xl w-full h-full flex flex-col items-center justify-center gap-2 p-4" style={{ background: "hsl(var(--accent))", color: "hsl(var(--background))" }}>
                    <div className="text-sm font-bold">Clicked!</div>
                    <div className="text-xs opacity-80">Click again to flip back</div>
                  </div>
                }
              />
              <FlipCard3D
                height={200}
                axis="x"
                front={
                  <div className="veil-card rounded-xl w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                    <GlobeIcon className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />
                    <div className="text-sm font-semibold" style={{ color: "hsl(var(--text-heading))" }}>X-axis flip</div>
                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>axis=&quot;x&quot; · hover</div>
                  </div>
                }
                back={
                  <div className="rounded-xl w-full h-full flex flex-col items-center justify-center gap-2 p-4" style={{ background: "hsl(var(--surface-2))", border: "1px solid var(--card-border-hover)" }}>
                    <div className="text-sm font-bold" style={{ color: "hsl(var(--primary))" }}>Flipped on X!</div>
                    <div className="text-xs" style={{ color: "hsl(var(--text-muted))" }}>Vertical tumble animation</div>
                  </div>
                }
              />
            </div>
          </Sub>

          {/* Cube */}
          <Sub title="Cube 3D — CSS preserve-3d with 6 faces">
            <div className="flex flex-wrap items-center gap-10">
              <Cube3D size={100} speed={0.8} />
              <Cube3D size={130} speed={1.2}
                faces={[
                  <SparklesIcon key="f" className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />,
                  <CpuIcon      key="r" className="w-8 h-8" style={{ color: "hsl(var(--accent))" }} />,
                  <GlobeIcon    key="b" className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />,
                  <CodeIcon     key="l" className="w-8 h-8" style={{ color: "hsl(var(--accent))" }} />,
                  <ZapIcon      key="t" className="w-8 h-8" style={{ color: "hsl(var(--primary))" }} />,
                  <LayersIcon   key="d" className="w-8 h-8" style={{ color: "hsl(var(--accent))" }} />,
                ]}
              />
              <Cube3D size={80} speed={2} pauseOnHover />
              <div className="text-xs font-mono space-y-1" style={{ color: "hsl(var(--text-dim))" }}>
                <div>size=100  speed=0.8</div>
                <div>size=130  custom icons</div>
                <div>size=80   speed=2  pauseOnHover</div>
              </div>
            </div>
          </Sub>

          {/* Orb + Rings */}
          <Sub title="Floating Orb + Ring Orbit — canvas-colored, theme-aware">
            <div className="flex flex-wrap items-center gap-12">
              <FloatingOrb size={160} rings={2} />
              <FloatingOrb size={120} rings={1} />
              <RingOrbit3D size={160} rings={3} />
              <RingOrbit3D size={120} rings={2} />
              <RingOrbit3D size={90}  rings={1} />
            </div>
          </Sub>

          {/* Particle Field */}
          <Sub title="Particle Field — 3D-projected canvas with mouse interaction">
            <div className="relative rounded-xl overflow-hidden border" style={{ height: 280, borderColor: "var(--card-border)" }}>
              <ParticleField count={100} speed={1} interactive />
              <div className="absolute bottom-3 left-4 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
                Move cursor inside to pull particles
              </div>
            </div>
          </Sub>

          {/* Perspective Grid */}
          <Sub title="Perspective Grid — animated vanishing-point grid, theme-color lines">
            <div className="relative rounded-xl overflow-hidden border" style={{ height: 260, borderColor: "var(--card-border)" }}>
              <PerspectiveGrid speed={1} cols={14} rows={18} />
              <div className="absolute bottom-3 left-4 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
                Lines converge to vanishing point · adapts to active theme color
              </div>
            </div>
          </Sub>

        </ShowcaseSection>

        {/* ── 3D Volume II ──────────────────────────────────── */}
        <ShowcaseSection
          id="3d-vol2"
          title="3D Animations — Volume II"
          description="Organic blobs, warp tunnels, holographic cards, DNA helices, gravity simulations, and neural networks."
        >

          {/* MorphBlob */}
          <Sub title="Morph Blob — organic shape-shifting with CSS border-radius animation">
            <div className="flex flex-wrap items-center gap-10">
              <MorphBlob size={160} speed={1} />
              <MorphBlob size={120} speed={2.5} />
              <MorphBlob size={200} speed={0.6} />
              <div className="text-xs font-mono space-y-1" style={{ color: "hsl(var(--text-dim))" }}>
                <div>size=160  speed=1</div>
                <div>size=120  speed=2.5</div>
                <div>size=200  speed=0.6</div>
              </div>
            </div>
          </Sub>

          {/* Warp Tunnel */}
          <Sub title="Warp Tunnel 3D — elliptical rings flying toward the viewer">
            <div className="flex flex-wrap gap-6">
              <div className="relative rounded-xl overflow-hidden border" style={{ width: 280, height: 220, borderColor: "var(--card-border)" }}>
                <WarpTunnel3D speed={1} rings={18} spokes={8} />
              </div>
              <div className="relative rounded-xl overflow-hidden border" style={{ width: 280, height: 220, borderColor: "var(--card-border)" }}>
                <WarpTunnel3D speed={2.5} rings={24} spokes={12} />
                <div className="absolute bottom-2 left-3 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>speed=2.5  24 rings</div>
              </div>
            </div>
          </Sub>

          {/* Hologram Card */}
          <Sub title="Hologram Card 3D — scanline overlay, shimmer, flicker, and tilt">
            <div className="flex flex-wrap gap-6">
              <HologramCard3D className="w-64 rounded-xl">
                <Card className="w-64">
                  <CardBody>
                    <div className="flex items-center gap-3 mb-3">
                      <RingOrbit3D size={48} rings={2} />
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "hsl(var(--text-heading))" }}>Holographic UI</div>
                        <div className="text-xs" style={{ color: "hsl(var(--text-dim))" }}>System v2.4.1</div>
                      </div>
                    </div>
                    <Progress value={72} label="Signal Integrity" />
                  </CardBody>
                </Card>
              </HologramCard3D>

              <HologramCard3D scanline={false} className="w-64 rounded-xl">
                <Card className="w-64">
                  <CardBody>
                    <StatCard
                      label="Neural Load"
                      value="94.2%"
                      delta="+3.1%"
                      deltaType="increase"
                      icon={<CpuIcon className="w-5 h-5" />}
                    />
                  </CardBody>
                </Card>
              </HologramCard3D>
            </div>
          </Sub>

          {/* Stacked Cards */}
          <Sub title="Stacked Cards 3D — CSS preserve-3d deck that fans on hover">
            <div className="flex flex-wrap items-start gap-12">
              {(["arc", "spread", "cascade"] as const).map((mode) => (
                <div key={mode} className="flex flex-col items-center gap-3">
                  <StackedCards3D
                    fanMode={mode}
                    width={220}
                    height={130}
                    cards={[
                      <div key="a" className="w-full h-full rounded-[var(--ui-radius,8px)] flex items-center justify-center" style={{ background: "hsl(var(--surface-2))", border: "1px solid var(--card-border)" }}>
                        <span className="font-semibold text-sm" style={{ color: "hsl(var(--primary))" }}>Card A</span>
                      </div>,
                      <div key="b" className="w-full h-full rounded-[var(--ui-radius,8px)] flex items-center justify-center" style={{ background: "hsl(var(--surface-2) / 0.85)", border: "1px solid var(--card-border)" }}>
                        <span className="font-semibold text-sm" style={{ color: "hsl(var(--accent))" }}>Card B</span>
                      </div>,
                      <div key="c" className="w-full h-full rounded-[var(--ui-radius,8px)] flex items-center justify-center" style={{ background: "hsl(var(--surface-2) / 0.70)", border: "1px solid var(--card-border)" }}>
                        <span className="font-semibold text-sm" style={{ color: "hsl(var(--text-dim))" }}>Card C</span>
                      </div>,
                      <div key="d" className="w-full h-full rounded-[var(--ui-radius,8px)] flex items-center justify-center" style={{ background: "hsl(var(--surface-2) / 0.55)", border: "1px solid var(--card-border)" }}>
                        <span className="font-semibold text-sm" style={{ color: "hsl(var(--text-muted))" }}>Card D</span>
                      </div>,
                    ]}
                  />
                  <span className="text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>fanMode=&ldquo;{mode}&rdquo;</span>
                </div>
              ))}
            </div>
          </Sub>

          {/* DNA Helix */}
          <Sub title="DNA Helix 3D — canvas double-helix with depth shading">
            <div className="flex flex-wrap items-center gap-10">
              <DNAHelix3D width={140} height={260} speed={1} pairs={14} />
              <DNAHelix3D width={120} height={220} speed={2}  pairs={10} />
              <DNAHelix3D width={100} height={180} speed={0.5} pairs={18} />
              <div className="text-xs font-mono space-y-1" style={{ color: "hsl(var(--text-dim))" }}>
                <div>pairs=14  speed=1</div>
                <div>pairs=10  speed=2</div>
                <div>pairs=18  speed=0.5</div>
              </div>
            </div>
          </Sub>

          {/* Gravity Orbit */}
          <Sub title="Gravity Orbit 3D — n-body physics with trailing trails">
            <div className="flex flex-wrap gap-6">
              <div className="relative rounded-xl overflow-hidden border" style={{ width: 300, height: 300, borderColor: "var(--card-border)" }}>
                <GravityOrbit3D bodies={5} speed={1} />
                <div className="absolute bottom-2 left-3 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>5 bodies</div>
              </div>
              <div className="relative rounded-xl overflow-hidden border" style={{ width: 300, height: 300, borderColor: "var(--card-border)" }}>
                <GravityOrbit3D bodies={8} speed={1.5} />
                <div className="absolute bottom-2 left-3 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>8 bodies  speed=1.5</div>
              </div>
            </div>
          </Sub>

          {/* Neural Network */}
          <Sub title="Neural Net 3D — rotating 3D graph with signal propagation">
            <div className="relative rounded-xl overflow-hidden border" style={{ height: 340, borderColor: "var(--card-border)" }}>
              <NeuralNet3D nodeCount={26} connectionDensity={0.22} speed={1} />
              <div className="absolute bottom-3 left-4 text-xs font-mono" style={{ color: "hsl(var(--text-dim))" }}>
                26 nodes · signals pulse along edges · auto-rotates
              </div>
            </div>
          </Sub>

        </ShowcaseSection>

      </div>

      <StyleSwitcher />
    </>
  )
}
