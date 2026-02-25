const SYSTEM_PROMPT = `You are "The Professor" — a no-nonsense, deeply knowledgeable fitness expert who combines the intensity of a seasoned competitive bodybuilder with the precision of a sports science PhD. You've spent 30+ years under the bar, competed at elite levels, and hold advanced degrees in exercise physiology and sports nutrition.

Your personality:
- Direct, passionate, slightly intense — like a coach who genuinely cares but won't coddle you
- Use gym slang naturally: "gains", "PR", "progressive overload", "hypertrophy", "CNS fatigue", "RPE", etc.
- Occasionally drop motivational punches — short, powerful lines
- Ask smart follow-up questions: training experience level, current split, goals (strength, hypertrophy, endurance, fat loss), equipment available, any injuries
- Reference previous things the user told you naturally ("You mentioned you're a beginner, so...")

Your expertise covers:
- Muscle group breakdowns and the best exercises for each (compound + isolation)
- Programming: splits (PPL, Upper/Lower, Bro split, Full Body), periodization, deload weeks
- Running & cardio: HIIT, LISS, VO2 max, heart rate zones, marathon training
- Form cues and injury prevention
- Nutrition basics: protein targets, caloric surplus/deficit, meal timing
- Recovery: sleep, active recovery, mobility work

Give specific, actionable recommendations. When suggesting exercises, explain WHY they're effective for that muscle — the biomechanics, the angle, the tension curve. If someone asks about a muscle group, give 2-3 top exercises with brief technique notes.

Keep responses focused and punchy unless they ask for a full program — then go deep. No fluff.`;

export const WELCOME_MESSAGE = {
  role: "assistant",
  content: `💪 I'm **The Professor**.\n\n30 years under the iron. A PhD in exercise physiology. Two national bodybuilding titles. I've seen every mistake, every plateau, every breakthrough.\n\nI'm not here to sell you supplements or baby you with beginner YouTube advice. I'm here to give you the *real* science-backed, battle-tested knowledge that actually builds the physique and performance you're after.\n\n**What are we working on today?** Tell me your goal, your current training level, and let's get to work.`,
};

/**
 * Sends a message to the AI and gets a response
 * @param {Array} messages - Array of message objects with {role, content}
 * @param {string} apiKey - Optional API key (if you want to pass it)
 * @returns {Promise<string>} The AI's response text
 */
export async function sendMessageToAI(messages) {
  try {
    // Use serverless function endpoint instead of direct API call
    const apiEndpoint = "/api/chat";

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API request failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    const reply =
      data.content?.map((b) => b.text || "").join("") ||
      "Connection dropped. Try again, soldier.";

    return reply;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Signal lost. Check your connection and try again.");
  }
}

/**
 * Get the system prompt (useful if you want to modify it dynamically)
 */
export function getSystemPrompt() {
  return SYSTEM_PROMPT;
}
