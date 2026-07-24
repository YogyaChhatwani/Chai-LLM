import './HelperPrompts.css';
type HelperPromptsProps = {
    prompts: string[]
    onPromptClick: (prompt: string) => void
}
function HelperPrompts({ prompts, onPromptClick }: HelperPromptsProps) {
    return (
        <section className="helper-prompts" aria-label="Suggested questions">
            <h2 className="helper-prompts__title">Suggested questions</h2>
            <ul className="helper-prompts__list">
                {prompts.map((prompt) => (
                    <li key={prompt}>
                        <button
                            type="button"
                            className="helper-prompts__button"
                            title={prompt}
                            onClick={() => {
                                onPromptClick(prompt);
                            }}
                        >
                            {prompt}
                        </button>
                    </li>
                ))}

            </ul>
        </section>
    )
}
export default HelperPrompts;