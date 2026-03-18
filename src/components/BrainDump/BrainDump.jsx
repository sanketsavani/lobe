// LOBES: Brain Dump — capture + triage inbox
import { Send } from 'lucide-react'
import { useTaskStore } from '../../store/useTaskStore'
import { api } from '../../api/client'
import { EmptyState } from '../shared/EmptyState'
import { TabInfoBanner } from '../shared/TabInfoBanner'

export default function BrainDump() {
  const [input, setInput] = useState('')
  const inbox = useTaskStore((s) => s.inbox)
  const addInboxItem = useTaskStore((s) => s.addInboxItem)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const item = { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() }
    if (api.isConfigured()) {
      try {
        await api.addInboxItem(item)
      } catch (err) {
        console.error(err)
      }
    }
    addInboxItem(item)
    setInput('')
  }

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 lg:p-8">
      <TabInfoBanner tabId="brain-dump" title="Brain Dump is for tasks.">
        Use this space to quickly capture tasks and actionable items you want to do later, not as a general journal.
      </TabInfoBanner>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Brain Dump
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Capture thoughts fast. Triage later. Cmd+Space to open from anywhere.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-2 focus-within:border-[var(--border-strong)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something and press Enter..."
            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      <section>
        <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
          Inbox ({inbox.length})
        </h2>
        {inbox.length > 0 ? (
          <ul className="space-y-2">
            {inbox.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)]"
              >
                {item.text}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="inbox"
            message="Nothing in the inbox. Dump a thought above."
          />
        )}
      </section>
    </div>
  )
}
