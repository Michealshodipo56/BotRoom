# Product Requirements Document: BotRoom

**Version:** 1.0
**Status:** Draft
**Author:** Micheal Shodipo
**Last Updated:** July 31, 2026

---

## 1. Overview

BotRoom is a web platform where users can bring multiple AI models into a shared conversation room, watch them chat, debate, and argue with one another, and participate in the conversation themselves. Users connect their own API keys, choose which AI models populate the room, and control the flow of conversation — adding or removing AI participants at any time. The platform also supports voice-based interaction for users who prefer speaking over typing.

### 1.1 Problem Statement

Today, interacting with AI models happens in isolated, single-model chat windows. There is no simple way to:
- Put multiple AI models from different providers into the same conversation
- Watch how different models respond to the same prompt, topic, or to each other
- Use one's own API keys across multiple providers in a single, unified interface
- Casually explore multi-agent conversation dynamics without writing code

BotRoom solves this by turning multi-model AI conversation into an accessible, spectator-friendly, and participatory experience.

### 1.2 Goals

- Let users assemble a "room" of AI participants from multiple providers/models
- Allow the user to be a full participant in the conversation, not just an observer
- Give users fine-grained control over room composition (add/remove AI at will)
- Make starting a conversation frictionless with suggested prompts
- Support both text and voice interaction modes
- Keep the platform cost-neutral to operate by having users supply their own API keys

### 1.3 Non-Goals (Out of Scope for v1)

- Hosting or fine-tuning custom models
- Persistent long-term memory across separate rooms/sessions
- Monetization or subscription billing (v1 is BYO-key only)
- Mobile native apps (web-responsive only for v1)

---

## 2. Target Users

| User Type | Description |
|---|---|
| AI enthusiasts / hobbyists | Want to explore how different models "think" or respond differently to the same topic |
| Developers / prompt engineers | Want a fast way to compare model behavior side by side using their own API keys |
| Casual/curious users | Want an entertaining experience watching AI debate or chat, with light participation |
| Content creators | May use AI debates/conversations as source material for videos, posts, or research |

---

## 3. Core Concepts

- **Room**: A single conversation space containing the user and one or more AI participants. Rooms are ephemeral per session unless explicitly saved.
- **Participant**: Any entity that can post a message in the room — the human user or an AI instance. Each AI participant has: a model, a persona/system prompt, and a display identity (name/avatar/voice).
- **Turn**: A single message contribution from a participant. Turn order determines who "speaks" next.
- **Session Transcript**: The full ordered history of messages in a room, used as context for every AI participant's next response.

---

## 4. Functional Requirements

### 4.1 Room Management
- User can create a new room
- User can add an AI participant to the room at any time (mid-conversation included)
- User can remove an AI participant from the room at any time
- Newly added AI participants receive the existing transcript as context before their first turn
- Room supports a minimum of 1 and a practical maximum of participants (soft cap recommended, e.g. 6, to keep conversations readable and cost manageable)

### 4.2 API Key & Model Management
- User can input their own API key(s) for supported providers (e.g. Anthropic, OpenAI, Google, and/or an aggregator like OpenRouter for open-source models)
- Keys are stored securely (encrypted at rest; never logged or exposed in plaintext) and scoped per user
- User selects a specific model for each AI participant slot from the list of models available under their connected provider(s)
- User can assign a custom persona/system prompt to each AI participant (e.g. "skeptic," "optimist," "debate opponent," or a fully custom instruction)
- Clear error handling and messaging if a key is invalid, expired, or rate-limited

### 4.3 Conversation Flow
- Turn order defaults to round-robin across all active participants (human included)
- User can post a message at any point; their turn is not time-limited
- AI participants generate responses using the full (or intelligently windowed) transcript as context, with clear speaker labels so models do not confuse themselves with others
- User can pause and resume the automatic AI-to-AI conversation flow at any time
- "Debate mode" (optional toggle): user assigns opposing stances/personas to two or more AI participants on a chosen topic, and the room proceeds through automated back-and-forth turns until paused by the user

### 4.4 Conversation Suggestions
- When it is the user's turn and no input has been given, the system offers 3–4 contextual suggested messages or discussion prompts based on the current transcript
- Suggestions are shown as tappable/selectable options; selecting one populates or sends the message

### 4.5 Voice Mode
- User can toggle voice mode on/off per session
- Speech-to-text (STT) captures the user's spoken input and converts it to a text message in the room
- Text-to-speech (TTS) reads AI participant responses aloud
- Each AI participant is assigned a distinct voice so multiple AIs remain distinguishable by ear
- Playback is queued (one participant speaks at a time) to avoid overlapping audio in multi-participant rooms

---

## 5. User Stories

- As a user, I want to add Claude and GPT to the same room so I can see how they respond differently to the same question.
- As a user, I want to assign opposing viewpoints to two AI models and watch them debate a topic without me having to feed each message manually.
- As a user, I want to jump into the conversation at any point and have the AI participants respond to what I said.
- As a user, I want to remove a model from the room if I find its responses aren't adding value, without losing the rest of the conversation.
- As a user, I want suggested things to say when I don't know how to respond or start a topic.
- As a user, I want to use voice instead of typing when I'd rather speak the conversation.
- As a user, I want to use my own API keys so I'm only ever paying for what I actually use.

---

## 6. Technical Architecture (Proposed)

### 6.1 Stack
- **Frontend:** Next.js / React, Tailwind CSS
- **Backend:** Go service for orchestration (turn management, provider API calls, transcript state)
- **Real-time layer:** WebSockets (or Server-Sent Events) for live message delivery to the room UI
- **Storage:** Postgres (rooms, participants, transcripts, encrypted key references) and/or Redis for active session state
- **Deployment:** Docker containers

### 6.2 High-Level Data Model

```
Room {
  id
  created_at
  status: active | paused | ended
  participants: [Participant]
  transcript: [Message]
}

Participant {
  id
  room_id
  type: human | ai
  provider          // e.g. anthropic, openai, google, openrouter
  model             // specific model identifier
  persona           // system prompt / assigned stance
  display_name
  voice_id          // for TTS, if voice mode enabled
}

Message {
  id
  room_id
  speaker_id        // references Participant.id
  content
  timestamp
}

APIKey {
  id
  user_id
  provider
  encrypted_key
  created_at
}
```

### 6.3 Turn Orchestration (High-Level Flow)
1. Determine next speaker based on turn order (round-robin default).
2. If next speaker is human: wait for input (or display suggestions if idle).
3. If next speaker is AI: assemble transcript + persona + speaker labels, call the provider's API using the user's key, append response to transcript, broadcast to room via WebSocket.
4. If voice mode is active: run STT on human input before insertion; run TTS on AI response before/while broadcasting.
5. Repeat until paused by user or room ends.

---

## 7. Non-Functional Requirements

- **Security:** API keys must be encrypted at rest and in transit; never exposed in client-side logs or browser storage in plaintext.
- **Cost control:** Since users supply their own keys, the platform must clearly communicate that AI responses consume the user's own provider quota/billing.
- **Reliability:** Graceful handling of provider API failures, rate limits, and timeouts without crashing the room session.
- **Performance:** Real-time message delivery should feel responsive; long AI generation times should show typing/thinking indicators per participant.
- **Scalability:** Architecture should support multiple concurrent rooms per user and across users without cross-contamination of transcripts or keys.

---

## 8. MVP Scope (Phase 1)

1. Room creation with user + up to 2 AI participants
2. Text-only conversation, round-robin turn order
3. BYO API key support for at least one provider (e.g. Anthropic and/or OpenAI)
4. Add/remove AI participant mid-conversation
5. Basic persona/system prompt assignment per participant

## 9. Phase 2+

- Conversation suggestions
- Voice mode (STT + TTS with distinct per-participant voices)
- Debate mode with assigned opposing stances
- Support for additional providers (Google, OpenRouter/open-source models)
- Room save/replay and sharing

---

## 10. Success Metrics

- Number of rooms created and average room duration
- Average number of AI participants per room
- Voice mode adoption rate (once launched)
- Retention: users returning to create additional rooms
- Provider/model diversity used across rooms (signal of the platform's core value proposition)

---

## 11. Risks & Open Questions

- **Model convergence:** AI participants (especially same-model instances) may produce repetitive or overly agreeable exchanges without strong persona differentiation — requires careful default system prompts.
- **Cost transparency:** Users must clearly understand that automated AI-to-AI turns consume their API quota even without their direct input — needs clear UI warnings and pause controls.
- **Key security:** Handling and storing third-party API keys carries real security responsibility; requires encryption at rest and strict access controls.
- **Open question:** Should there be a maximum automated turn count before requiring user confirmation to continue, to prevent runaway API usage?
- **Open question:** Which providers/models are prioritized for the initial launch?
