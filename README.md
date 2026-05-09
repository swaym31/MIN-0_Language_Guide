# MIN-0 Language Reference Website

A full static website for the MIN-0 constructed language — the alphanumeric communication system of an emergent mechatronical species from planet RB-0.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with lore, stats, and navigation |
| `textbook.html` | Full 21-chapter grammar reference with sticky TOC sidebar |
| `dictionary.html` | Searchable 5,175-entry English→MIN-0 dictionary (verbs + adjectives) |
| `translator.html` | Live English→MIN-0 translator (embedded HuggingFace Space) |

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository (or to the `docs/` subfolder of an existing one).
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch**, select `main` (or `master`) and `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo>/`.

The `.nojekyll` file disables Jekyll processing — required because some filenames contain underscores.

## Translator

The translator page embeds the live HuggingFace Space `Skronak/MIN-0_V1`.
- **Model:** Qwen 2.5 3B, fine-tuned with QLoRA via Unsloth on 83,955 sentence pairs
- **Space:** https://huggingface.co/spaces/Skronak/MIN-0_V1
- **Model repo:** https://huggingface.co/Skronak/min0-translator-v1

> **Note:** The Space runs on the HuggingFace free tier and may be sleeping. If the embed doesn't load immediately, click "↗ Full Screen" to wake it up.

## Files

```
index.html          Landing / home page
textbook.html       Grammar textbook (21 chapters + appendix)
dictionary.html     Verb & adjective dictionary with live search
translator.html     Live translator (embedded HuggingFace Space)
style.css           Shared stylesheet
script.js           Shared JS
.nojekyll           Disables GitHub Pages Jekyll processing
README.md           This file
```

---

*First Edition · Version 1.0*
