import { openai } from "../../../lib/openai";
import { loadPersonaKnowledge } from "../../../lib/knowledge";
import { PERSONAS, type PersonaKey } from "../../../lib/personas";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, persona, oldMessages } = body as {
            message: { role: "user" | "assistant"; content: string };
            persona: PersonaKey;
            oldMessages: { role: "user" | "assistant"; content: string }[];
        };
        // load selected persona and knowledge
        const personaData = PERSONAS[persona];
        if (!personaData) {
            return new Response(JSON.stringify({ error: "Invalid persona" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const knowledge = await loadPersonaKnowledge(persona);
        const recentMessages = (oldMessages ?? []).slice(-6);
        const truncatedKnowledge = knowledge.length > 3000 ? `${knowledge.slice(0, 3000)}

        ...[knowledge truncated]` : knowledge;

        const result = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: personaData.systemPrompt },
                ...recentMessages,
                {
                    role: message.role,
                    content: `## Knowledge\n${truncatedKnowledge}\n\n## User Question\n${message.content}`,
                },
            ],
        });
        
        return new Response(JSON.stringify({ result: result.choices[0].message.content }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}