import fs from "fs";
import path from "path";

export function loadPersonaKnowledge(persona: "hitesh" | "piyush") {
    const candidates = [
        path.join(process.cwd(), "data", persona),
        path.join(process.cwd(), "src", "data", persona),
    ];

    const folder = candidates.find((folderPath) => fs.existsSync(folderPath));

    if (!folder) {
        throw new Error(`Persona data folder not found for '${persona}'. Checked: ${candidates.join(", ")}`);
    }

    const files = fs.readdirSync(folder);

    return files
        .map(file =>
            fs.readFileSync(path.join(folder, file), "utf8")
        )
        .join("\n\n");
}