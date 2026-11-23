import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  IconMessageChatbot,
  IconSend,
  IconSparkles,
  IconTrash,
} from '@tabler/icons-react'
import { Badge, Button, Card, Input } from '../components'

/** Nombre de la pantalla en el menú. */
export const title = 'Asistente (antes)'

type Message = {
  id: number
  author: 'user' | 'assistant'
  text: string
  time: string
}

const suggestions = [
  'Hoy me siento sin energía',
  '¿Cuándo es mi próxima revisión?',
  'Ayúdame a recordar mi medicación',
]

// Todavía no hay un agente de IA de verdad: la pantalla responde con un texto fijo.
const fakeReply =
  'Gracias por contármelo. Aún estoy en pruebas, pero pronto podré ayudarte con tus citas, tu medicación y cómo te sientes.'

function now() {
  return new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card variant="filled" className="w-full max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-teal-800">
          <IconSparkles className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          ¿En qué te ayudo hoy?
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Cuéntame cómo te sientes o pregúntame por tus citas y tu medicación.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          {suggestions.map((s) => (
            <Button key={s} variant="secondary" onClick={() => onPick(s)}>
              {s}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const mine = message.author === 'user'
  return (
    <li className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          mine
            ? 'rounded-br-sm bg-emerald-700 text-white'
            : 'rounded-bl-sm border border-gray-200 bg-white text-gray-900'
        }`}
      >
        <p className="sr-only">{mine ? 'Tú dijiste:' : 'El asistente dijo:'}</p>
        <p className="wrap-anywhere whitespace-pre-wrap">{message.text}</p>
        <p
          className={`mt-1 text-xs ${mine ? 'text-emerald-50' : 'text-gray-500'}`}
        >
          {message.time}
        </p>
      </div>
    </li>
  )
}

export default function Antes() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const nextId = useRef(1)
  const endRef = useRef<HTMLDivElement>(null)

  // Baja hasta el último mensaje cada vez que llega uno nuevo.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, thinking])

  // Respuesta simulada del asistente.
  useEffect(() => {
    if (!thinking) return
    const timer = setTimeout(() => {
      setMessages((list) => [
        ...list,
        { id: nextId.current++, author: 'assistant', text: fakeReply, time: now() },
      ])
      setThinking(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [thinking])

  function send(text: string) {
    const clean = text.trim()
    if (!clean || thinking) return
    setMessages((list) => [
      ...list,
      { id: nextId.current++, author: 'user', text: clean, time: now() },
    ])
    setDraft('')
    setThinking(true)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    send(draft)
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col">
      {/* Cabecera escrita a mano: CardHeader siempre usa un h3 y la pantalla necesita un h1. */}
      <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-gray-200 px-4 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
          <IconMessageChatbot className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1 basis-32">
          <h1 className="text-lg font-semibold text-gray-900">Asistente</h1>
          <p className="text-sm text-gray-600">Habla sobre cómo te sientes</p>
        </div>
        {messages.length > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            iconLeft={<IconTrash />}
            onClick={() => setMessages([])}
            disabled={thinking}
          >
            Borrar conversación
          </Button>
        ) : (
          <Badge variant="info">En pruebas</Badge>
        )}
      </header>

      {/* role="log": los lectores de pantalla leen en voz alta cada mensaje nuevo.
          tabIndex: se puede llegar con el teclado para recorrer el historial. */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Historial de mensajes"
        tabIndex={0}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-gray-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-600"
      >
        {messages.length === 0 ? (
          <EmptyState onPick={send} />
        ) : (
          <ol className="flex flex-col gap-3 p-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {thinking && (
              <li className="flex justify-start">
                <p className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
                  El asistente está escribiendo…
                </p>
              </li>
            )}
          </ol>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-end gap-2 border-t border-gray-200 bg-white p-4"
      >
        <Input
          label="Mensaje"
          placeholder="Escribe aquí…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
          className="flex-1"
        />
        <Button
          type="submit"
          iconLeft={<IconSend />}
          disabled={!draft.trim() || thinking}
        >
          Enviar
        </Button>
      </form>
    </div>
  )
}
