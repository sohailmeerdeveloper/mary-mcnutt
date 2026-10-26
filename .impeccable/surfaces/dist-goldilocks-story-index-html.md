---
version: 1
slug: "dist-goldilocks-story-index-html"
primary_target: "dist/goldilocks-story/index.html"
related_targets: ["dist/assets/goldilocks-story.css"]
---

# Goldilocks Story

- Scope and mode: a new long-form public page at `/goldilocks-story/`; Read mode with one external follow action.
- Audience and job: visitors learning the origin, character, and recovery mission of Goldilocks Wisdom; understand the story without losing the wider Mary McNutt brand context.
- Content and proof: user-supplied archived copy, the original mugshot illustration, the original floral Goldilocks wordmark, the five named recovery stages, and the existing Facebook page.
- Constraints: inherit the current forest-green Mary McNutt editorial, Roboto/Nunito Sans, square surfaces, existing header/footer, responsive behavior, and the site-wide CMS. Do not invent recovery outcomes or present the character as clinical guidance.
- Chosen structure: a chaptered portrait essay. A forest split hero pairs the restored character with the origin; white and pale editorial chapters explain the mission and character; a semantic five-step sequence leads to Facebook.
- Approved composition: `.impeccable/mocks/goldilocks-story-approved.png`.
- Memorable moment: the archival pink character stands inside a white editorial mat against the forest hero, letting the old artwork live inside the current brand rather than replacing it.

## Implementation inventory

| Visible ingredient | Medium | Commitment |
| --- | --- | --- |
| Existing site header and footer | Semantic HTML/CSS | Preserve current navigation, contact routes, logo, and square controls. |
| Split forest hero | Semantic HTML/CSS | Title is the dominant element; action stays adjacent to the one-sentence origin. |
| Goldilocks mugshot | Archived raster asset | Show inside a white mat with a source caption; do not recolor or redraw it. |
| Mission chapter | Semantic HTML | Two-column desktop reading composition; single-column mobile sequence. |
| Goldilocks wordmark | Archived raster asset | Use as a supporting archival object, not as the site brand. |
| “Who is Goldilocks?” chapter | Semantic HTML | Preserve the supplied character description and make every paragraph editable. |
| Five-part recovery journey | Semantic ordered list/CSS | Sequence remains numbered, source-ordered, and readable without animation. |
| Facebook close | Semantic HTML/CSS | Dark green closing field with one explicit external action. |
| CMS editing | Existing CMS JavaScript + database page row | Every main heading, paragraph, list item, button, and image remains editable. |

- Unresolved: no source-backed date was supplied for when Goldilocks Wisdom itself was founded, so the page states only that MM’s recovery work dates to 2008.
