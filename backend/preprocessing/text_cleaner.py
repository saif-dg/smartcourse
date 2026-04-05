import re
import spacy

nlp = spacy.load("en_core_web_sm")
nlp.max_length = 2_000_000


def _strip_html_and_special(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    return text.lower().strip()


def clean_text(text: str) -> str:
    """Full NLP pipeline: HTML removal, lowercase, stopword removal, lemmatization."""
    if not text or not text.strip():
        return ""
    text = _strip_html_and_special(text)
    doc = nlp(text)
    tokens = [
        token.lemma_
        for token in doc
        if not token.is_stop and not token.is_punct and not token.is_space and len(token.text) > 1
    ]
    return " ".join(tokens)


def clean_text_for_neural(text: str) -> str:
    """Light cleaning for sentence-transformers: HTML/special char removal only."""
    if not text or not text.strip():
        return ""
    return _strip_html_and_special(text)


def clean_texts_batch(texts: list[str]) -> list[str]:
    """Batch clean_text using spaCy's nlp.pipe for efficiency."""
    stripped = [_strip_html_and_special(t) if t else "" for t in texts]
    results = []
    for doc in nlp.pipe(stripped, batch_size=200, disable=["ner", "parser"]):
        tokens = [
            token.lemma_
            for token in doc
            if not token.is_stop and not token.is_punct and not token.is_space and len(token.text) > 1
        ]
        results.append(" ".join(tokens))
    return results


def clean_texts_for_neural_batch(texts: list[str]) -> list[str]:
    """Batch light cleaning for neural model."""
    return [_strip_html_and_special(t) if t else "" for t in texts]
