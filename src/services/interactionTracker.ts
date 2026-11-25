
import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_KEY = '@museu_digital:events';

export type InteractionType =
  | 'screen_view'
  | 'exhibition_open'
  | 'content_open'
  | 'challenge_answer'
  | 'challenge_complete';

export interface InteractionEvent {
  id: string;
  sessionId: string;
  type: InteractionType;
  screen: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

let currentSessionId: string | null = null;

let writeQueue: Promise<void> = Promise.resolve();

// Inicia uma nova sessão de uso do aplicativo.
export function startSession(): string {
  currentSessionId = `session-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;

  return currentSessionId;
}

// Registra uma interação do visitante.
export function trackEvent(
  type: InteractionType,
  screen: string,
  details?: Record<string, unknown>,
): Promise<void> {
  const operation = writeQueue.then(async () => {
    if (!currentSessionId) {
      startSession();
    }

    const storedEvents = await AsyncStorage.getItem(EVENTS_KEY);

    const events: InteractionEvent[] = storedEvents
      ? JSON.parse(storedEvents)
      : [];

    const newEvent: InteractionEvent = {
      id: `event-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
      sessionId: currentSessionId!,
      type,
      screen,
      timestamp: new Date().toISOString(),
      details,
    };

    events.push(newEvent);

    await AsyncStorage.setItem(
      EVENTS_KEY,
      JSON.stringify(events),
    );
  });

  // Mantém a fila funcionando mesmo se um registro falhar.
  writeQueue = operation.catch((error) => {
    console.error('Erro ao registrar interação:', error);
  });

  return operation;
}

// Consulta todos os registros salvos.
export async function getEvents(): Promise<InteractionEvent[]> {
  await writeQueue;

  const storedEvents = await AsyncStorage.getItem(EVENTS_KEY);

  return storedEvents ? JSON.parse(storedEvents) : [];
}

// Apaga os registros locais.
export async function clearEvents(): Promise<void> {
  await AsyncStorage.removeItem(EVENTS_KEY);
}
