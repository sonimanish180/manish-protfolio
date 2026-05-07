"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollProgress } from "@/components/composite/scroll-progress"
import { CursorGlow } from "@/components/composite/cursor-glow"
import { StyleApplier } from "@/components/composite/style-applier"
import { StyleSwitcher } from "@/components/composite/style-switcher"
import { LayerReveal } from "@/components/composite/layer-reveal"
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
import { toast } from "@/stores/toast-store"
import {
  StarIcon, BriefcaseIcon, GraduationCapIcon, CodeIcon, LayersIcon, ZapIcon,
  MailIcon, CopyIcon, TrashIcon, EditIcon, MoreHorizontalIcon, ExternalLinkIcon,
  ArrowLeftIcon, PlusIcon, DownloadIcon,
} from "lucide-react"

/* ── Showcase section wrapper ── */
function ShowcaseSection({
  id, title, description, children,
}: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <LayerReveal>
      <section id={id} className="py-12 border-t" style={{ borderColor: "var(--card-border)" }}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1.5" style={{ color: "hsl(var(--text-heading))" }}>{title}</h2>
          {description && (
            <p className="text-sm" style={{ color: "hsl(var(--text-muted))" }}>{description}</p>
          )}
        </div>
        <div className="space-y-10">{children}</div>
      </section>
    </LayerReveal>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "hsl(var(--text-dim))" }}>
        {title}
      </p>
      {children}
    </div>
  )
}

/* ─────────────────── Table data ─────────────────── */
const TABLE_COLS = [
  { key: "name",    header: "Name" },
  { key: "role",    header: "Role" },
  { key: "status",  header: "Status", render: (v: unknown) => <TableStatusCell status={String(v)} /> },
  { key: "joined",  header: "Joined" },
  { key: "actions", header: "", align: "right" as const,
    render: (_: unknown, row: Record<string, unknown>) => (
      <Dropdown
        align="right"
        trigger={
          <button className="ui-btn ui-btn-ghost ui-btn-icon" style={{ height: "1.75rem", width: "1.75rem" }}>
            <MoreHorizontalIcon className="w-4 h-4" />
          </button>
        }
        items={[
          { key: "edit",   label: "Edit",   icon: <EditIcon className="w-3.5 h-3.5" />, onClick: () => toast.info(`Editing ${row.name}`) },
          { key: "copy",   label: "Copy ID", icon: <CopyIcon className="w-3.5 h-3.5" />, onClick: () => toast.success("ID copied!") },
          "divider",
          { key: "delete", label: "Delete", icon: <TrashIcon className="w-3.5 h-3.5" />, variant: "danger", onClick: () => toast.error("Deleted!") },
        ]}
      />
    ),
  },
]

const TABLE_ROWS = [
  { id: 1, name: "Manish Soni",     role: "Lead Engineer", status: "active",   joined: "Apr 2024" },
  { id: 2, name: "Anika Patel",     role: "Product Design", status: "active",  joined: "Jan 2024" },
  { id: 3, name: "Ravi Kumar",      role: "Backend Dev",   status: "pending",  joined: "Mar 2025" },
  { id: 4, name: "Priya Sharma",    role: "DevOps",        status: "inactive", joined: "Feb 2023" },
]

/* ─────────────────── Page ─────────────────── */
export default function DesignPage() {
  const [searchVal, setSearchVal] = useState("")
  const [inputVal, setInputVal] = useState("")
  const [textareaVal, setTextareaVal] = useState("")
  const [selectVal, setSelectVal] = useState("")
  const [checked, setChecked] = useState(false)
  const [radioVal, setRadioVal] = useState("react")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <>
      <div className="veil-bg-fixed" aria-hidden="true" />
      <ScrollProgress />
      <CursorGlow />
      <StyleApplier />
      <ToasterMount />

      <div className="max-w-5xl mx-auto px-6 pb-40">
        {/* Header */}
        <div className="pt-20 pb-4">
          <LayerReveal>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 transition-opacity hover:opacity-70"
              style={{ color: "hsl(var(--text-muted))" }}
            >
              <ArrowLeftIcon className="w-3 h-3" />
              Back to portfolio
            </Link>
          </LayerReveal>
          <LayerReveal delay={40}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-black mb-2 gradient-text">Design System</h1>
                <p className="text-sm max-w-lg" style={{ color: "hsl(var(--text-body))" }}>
                  A full component library that adapts live to all 9 design themes. Use the switcher below to
                  see every component transform in real time.
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

        {/* ── Buttons ── */}
        <ShowcaseSection id="buttons" title="Buttons" description="Five semantic variants × four sizes + icon button. All support loading state and Framer Motion press animation.">
          <SubSection title="Variants">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" leftIcon={<ZapIcon className="w-4 h-4" />}>Primary</LibButton>
              <LibButton variant="secondary">Secondary</LibButton>
              <LibButton variant="outline" leftIcon={<StarIcon className="w-4 h-4" />}>Outline</LibButton>
              <LibButton variant="ghost">Ghost</LibButton>
              <LibButton variant="danger">Danger</LibButton>
            </div>
          </SubSection>
          <SubSection title="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <LibButton variant="primary" size="sm">Small</LibButton>
              <LibButton variant="primary" size="md">Medium</LibButton>
              <LibButton variant="primary" size="lg">Large</LibButton>
              <LibButton variant="primary" size="xl">X-Large</LibButton>
              <LibButton variant="secondary" size="icon"><PlusIcon className="w-4 h-4" /></LibButton>
            </div>
          </SubSection>
          <SubSection title="States">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" loading>Saving…</LibButton>
              <LibButton variant="secondary" disabled>Disabled</LibButton>
              <LibButton variant="outline" leftIcon={<DownloadIcon className="w-4 h-4" />} rightIcon={<ExternalLinkIcon className="w-3.5 h-3.5 opacity-60" />}>
                With Icons
              </LibButton>
            </div>
          </SubSection>
          <SubSection title="Live actions">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" onClick={() => toast.success("Primary clicked!", "Action was successful.")}>
                Fire Success Toast
              </LibButton>
              <LibButton variant="outline" onClick={() => toast.info("Info toast", "Here's some useful context.")}>
                Fire Info Toast
              </LibButton>
              <LibButton variant="danger" onClick={() => toast.error("Action failed", "Something went wrong.")}>
                Fire Error Toast
              </LibButton>
              <LibButton variant="secondary" onClick={() => toast.warning("Heads up!", "This may take a moment.")}>
                Fire Warning Toast
              </LibButton>
            </div>
          </SubSection>
        </ShowcaseSection>

        {/* ── Inputs ── */}
        <ShowcaseSection id="inputs" title="Inputs & Forms" description="Full-featured form controls with labels, hints, validation states, and focus animations.">
          <SubSection title="Text Input">
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              <Input label="Full Name" placeholder="Manish Soni" value={inputVal} onChange={(e) => setInputVal(e.target.value)} hint="Enter your full legal name" leftIcon={<BriefcaseIcon className="w-3.5 h-3.5" />} />
              <Input label="Email" placeholder="you@example.com" type="email" leftIcon={<MailIcon className="w-3.5 h-3.5" />} />
              <Input label="With Error" placeholder="bad@input.com" error="That email is already taken." leftIcon={<MailIcon className="w-3.5 h-3.5" />} defaultValue="duplicate@test.com" />
              <Input label="Disabled" placeholder="Can't touch this" disabled value="Locked value" />
            </div>
          </SubSection>
          <SubSection title="Textarea">
            <div className="max-w-lg">
              <Textarea
                label="Message"
                placeholder="Tell me about your project…"
                value={textareaVal}
                onChange={(e) => setTextareaVal(e.target.value)}
                rows={4}
                showCount
                maxLength={280}
                hint="Keep it under 280 characters"
              />
            </div>
          </SubSection>
          <SubSection title="Select & Search">
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              <Select
                label="Role"
                placeholder="Pick a role…"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={[
                  { value: "engineer",  label: "Software Engineer" },
                  { value: "designer",  label: "Product Designer" },
                  { value: "manager",   label: "Engineering Manager" },
                  { value: "architect", label: "Platform Architect" },
                ]}
                hint="Your primary function"
              />
              <div className="flex flex-col gap-1.5">
                <p className="ui-label">Search</p>
                <SearchBar value={searchVal} onValueChange={setSearchVal} placeholder="Search anything…" />
              </div>
            </div>
          </SubSection>
          <SubSection title="Checkboxes & Radios">
            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl">
              <div className="flex flex-col gap-3">
                <Checkbox label="Enable notifications" description="Receive alerts for new messages and updates." checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <Checkbox label="Remember me for 30 days" defaultChecked />
                <Checkbox label="Disabled option" disabled />
              </div>
              <RadioGroup
                label="Preferred Stack"
                name="stack"
                value={radioVal}
                onChange={setRadioVal}
                options={[
                  { value: "react",     label: "React / Next.js",    description: "TypeScript + Tailwind" },
                  { value: "golang",    label: "Go (Backend)",        description: "REST & gRPC services" },
                  { value: "mobile",    label: "React Native",        description: "Cross-platform mobile" },
                  { value: "disabled",  label: "Unavailable",         disabled: true },
                ]}
              />
            </div>
          </SubSection>
        </ShowcaseSection>

        {/* ── Badges ── */}
        <ShowcaseSection id="badges" title="Badges" description="Semantic status indicators with optional dot prefix. Auto-adapt across all 9 themes.">
          <SubSection title="Variants — Default size">
            <div className="flex flex-wrap gap-2">
              <LibBadge variant="default">Default</LibBadge>
              <LibBadge variant="primary">Primary</LibBadge>
              <LibBadge variant="success" dot>Active</LibBadge>
              <LibBadge variant="warning" dot>Pending</LibBadge>
              <LibBadge variant="error" dot>Error</LibBadge>
              <LibBadge variant="info">Info</LibBadge>
            </div>
          </SubSection>
          <SubSection title="Small size">
            <div className="flex flex-wrap gap-2">
              {(["default","primary","success","warning","error","info"] as const).map((v) => (
                <LibBadge key={v} variant={v} size="sm">{v}</LibBadge>
              ))}
            </div>
          </SubSection>
          <SubSection title="In context">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <GraduationCapIcon className="w-4 h-4" style={{ color: "hsl(var(--text-muted))" }} />
                <span className="text-sm" style={{ color: "hsl(var(--text-heading))" }}>B.Tech — IIT Roorkee</span>
                <LibBadge variant="primary" size="sm">Verified</LibBadge>
              </div>
              <div className="flex items-center gap-2">
                <CodeIcon className="w-4 h-4" style={{ color: "hsl(var(--text-muted))" }} />
                <span className="text-sm" style={{ color: "hsl(var(--text-heading))" }}>Next.js 15</span>
                <LibBadge variant="success" size="sm" dot>Stable</LibBadge>
              </div>
              <div className="flex items-center gap-2">
                <LayersIcon className="w-4 h-4" style={{ color: "hsl(var(--text-muted))" }} />
                <span className="text-sm" style={{ color: "hsl(var(--text-heading))" }}>v2.0-beta</span>
                <LibBadge variant="warning" size="sm" dot>Beta</LibBadge>
              </div>
            </div>
          </SubSection>
        </ShowcaseSection>

        {/* ── Toasts ── */}
        <ShowcaseSection id="toasts" title="Toasts" description="Animated slide-in notifications with auto-dismiss. Portal-rendered, stacked, dismissable.">
          <SubSection title="Preview — all variants">
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {(["success","error","warning","info"] as const).map((type) => (
                <ToastPreview key={type} type={type} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Live — click to fire">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="secondary" size="sm" onClick={() => toast.success("Profile saved!", "Your changes have been applied.")}>
                ✓ Success
              </LibButton>
              <LibButton variant="secondary" size="sm" onClick={() => toast.error("Upload failed", "File exceeds the 10 MB limit.")}>
                ✕ Error
              </LibButton>
              <LibButton variant="secondary" size="sm" onClick={() => toast.warning("Rate limit", "You've sent 90% of your monthly requests.")}>
                ⚠ Warning
              </LibButton>
              <LibButton variant="secondary" size="sm" onClick={() => toast.info("Tip", "Press Ctrl+K to open the command palette.")}>
                ℹ Info
              </LibButton>
            </div>
          </SubSection>
        </ShowcaseSection>

        {/* ── Dialogs ── */}
        <ShowcaseSection id="dialogs" title="Dialogs" description="Accessible portal-rendered modals with scroll-lock, Escape-close, and backdrop dismiss.">
          <SubSection title="Examples">
            <div className="flex flex-wrap gap-3">
              <LibButton variant="primary" onClick={() => setDialogOpen(true)}>
                Open Info Dialog
              </LibButton>
              <LibButton variant="danger" onClick={() => setConfirmOpen(true)}>
                Open Confirm Dialog
              </LibButton>
            </div>
          </SubSection>

          {/* Info Dialog */}
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="About this component" description="Dialogs are portaled to document.body, support keyboard navigation, and auto-lock scroll.">
            <div className="space-y-3 text-sm" style={{ color: "hsl(var(--text-body))" }}>
              <p>This dialog adapts its background, border, and shadow to the active design system — open it in Neobrutalism for thick borders, or Neon Noir for a pink glow.</p>
              <p>Features: Escape key dismiss · backdrop click dismiss · scroll lock · AnimatePresence transitions.</p>
            </div>
            <DialogFooter>
              <LibButton variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>Cancel</LibButton>
              <LibButton variant="primary" size="sm" onClick={() => { setDialogOpen(false); toast.success("Got it!") }}>Confirm</LibButton>
            </DialogFooter>
          </Dialog>

          {/* Confirm Dialog */}
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Delete this project?" description="This action is permanent and cannot be undone. All project data will be removed.">
            <DialogFooter>
              <LibButton variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</LibButton>
              <LibButton variant="danger" size="sm" onClick={() => { setConfirmOpen(false); toast.error("Deleted!", "The project has been removed.") }}>
                Delete forever
              </LibButton>
            </DialogFooter>
          </Dialog>
        </ShowcaseSection>

        {/* ── Dropdowns ── */}
        <ShowcaseSection id="dropdowns" title="Dropdowns" description="Keyboard-accessible menus with icons, descriptions, dividers, and danger variants.">
          <SubSection title="Examples">
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
              <Dropdown
                align="right"
                trigger={<LibButton variant="outline" size="icon"><MoreHorizontalIcon className="w-4 h-4" /></LibButton>}
                items={[
                  { key: "profile",  label: "Profile",       description: "View your public profile",   icon: <StarIcon className="w-3.5 h-3.5" /> },
                  { key: "settings", label: "Settings",      description: "Manage preferences",          icon: <LayersIcon className="w-3.5 h-3.5" /> },
                  "divider",
                  { key: "logout",   label: "Sign out",      icon: <ArrowLeftIcon className="w-3.5 h-3.5" />, variant: "danger" },
                ]}
              />
            </div>
          </SubSection>
        </ShowcaseSection>

        {/* ── Table ── */}
        <ShowcaseSection id="tables" title="Tables" description="Responsive data tables with sortable columns, status cells, and per-row action dropdowns.">
          <SubSection title="Team roster">
            <Table
              columns={TABLE_COLS}
              rows={TABLE_ROWS as unknown as Record<string, unknown>[]}
              showIndex
              keyField="id"
              emptyMessage="No team members found"
            />
          </SubSection>
        </ShowcaseSection>

        {/* ── Design system grid ── */}
        <ShowcaseSection id="themes" title="Theme Palette" description="Quick overview of all 9 design systems. Use the switcher at the bottom to activate any theme live.">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: "Veil",          desc: "Midnight navy + teal/gold",   a: "#00FFDA", b: "#F5A623", bg: "#050d1a" },
              { name: "Aurora",        desc: "Light glass + indigo/fuchsia",a: "#6D5BFF", b: "#C026D3", bg: "#f5f3ff" },
              { name: "Carbon",        desc: "Charcoal + terminal cyan",    a: "#00D2E6", b: "#00f0ff", bg: "#0d111a" },
              { name: "Clay",          desc: "Warm cream + terracotta",     a: "#b44b23", b: "#c66a1e", bg: "#f5eee6" },
              { name: "Pulse",         desc: "White + vibrant coral",       a: "#f0321e", b: "#f58214", bg: "#fafafa" },
              { name: "Obsidian",      desc: "Pure black + neon lime",      a: "#82e600", b: "#ffe600", bg: "#080808" },
              { name: "Neobrutalism",  desc: "Cream + thick black borders", a: "#ffeb00", b: "#ff1580", bg: "#fffde6" },
              { name: "Neon Noir",     desc: "Near-black + hot pink/purple",a: "#ff1ab3", b: "#8000ff", bg: "#050505" },
              { name: "Synthwave",     desc: "Deep purple + pink/cyan grid",a: "#ff1ab3", b: "#00e5ff", bg: "#140d22" },
            ].map((theme) => (
              <motion.div
                key={theme.name}
                className="veil-card rounded-xl p-4 cursor-default"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-md border border-white/10 flex items-center justify-center" style={{ background: theme.bg }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: theme.a }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "hsl(var(--text-heading))" }}>{theme.name}</span>
                </div>
                <p className="text-[10px] leading-relaxed" style={{ color: "hsl(var(--text-dim))" }}>{theme.desc}</p>
                <div className="flex gap-1 mt-2.5">
                  <div className="h-1.5 flex-1 rounded-full" style={{ background: theme.a }} />
                  <div className="h-1.5 flex-1 rounded-full" style={{ background: theme.b }} />
                  <div className="h-1.5 flex-1 rounded-full" style={{ background: theme.bg, border: "1px solid rgba(255,255,255,0.12)" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </ShowcaseSection>
      </div>

      <StyleSwitcher />
    </>
  )
}
