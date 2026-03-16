import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export function AuthForm({ mode }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const status = useAuthStore((s) => s.status)
  const error = useAuthStore((s) => s.error)
  const signup = useAuthStore((s) => s.signup)
  const login = useAuthStore((s) => s.login)

  const isLogin = mode === 'login'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await login({ usernameOrEmail: identifier, password })
      } else {
        await signup({ username, email, password })
      }
      navigate('/')
    } catch {
      // error handled in store
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-4">
      <div className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-lg">
        <h1 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
          {isLogin ? 'Log in to Lobes' : 'Create your Lobes account'}
        </h1>
        <p className="mb-6 text-sm text-[var(--text-secondary)]">
          {isLogin
            ? 'Enter your credentials to continue.'
            : 'Use a username, email, and password you will remember.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[var(--text-secondary)]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none ring-0 focus:border-[var(--accent)]"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-[var(--text-secondary)]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none ring-0 focus:border-[var(--accent)]"
                  autoComplete="email"
                />
              </div>
            </>
          )}

          {isLogin && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-[var(--text-secondary)]">
                Username or email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none ring-0 focus:border-[var(--accent)]"
                autoComplete="username"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-[var(--text-secondary)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none ring-0 focus:border-[var(--accent)]"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <p className="text-xs text-[var(--danger)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {status === 'loading'
              ? isLogin
                ? 'Logging in...'
                : 'Creating account...'
              : isLogin
                ? 'Log in'
                : 'Sign up'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-[var(--text-secondary)]">
          {isLogin ? (
            <>
              Need an account?{' '}
              <Link to="/signup" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm

