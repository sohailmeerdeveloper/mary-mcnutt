---
name: Mary McNutt
description: Warm photographic coaching editorial in forest and living greens.
colors:
  forest: "#052e28"
  green: "#13734f"
  panel: "#12845a"
  mint: "#86efac"
  text: "#303c37"
  muted: "#59655e"
  pale: "#f0f3f0"
  white: "#fff"
typography:
  display:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(46px, 4.4vw, 84px)"
    fontWeight: 100
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "clamp(34px, 3.8vw, 68px)"
    fontWeight: 100
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Roboto, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 100
    lineHeight: 1.14
  body:
    fontFamily: "Nunito Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Nunito Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 900
    lineHeight: 1.2
rounded:
  square: "0px"
spacing:
  compact: "8px"
  control: "16px"
  paragraph: "20px"
  grid: "24px"
  card: "28px"
  group: "32px"
  spacious: "40px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "16px 27px"
  button-primary-hover:
    backgroundColor: "{colors.forest}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "16px 27px"
  button-outline-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "16px 27px"
  button-white-hover:
    backgroundColor: "{colors.mint}"
  button-light-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "16px 27px"
  button-light-outline-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
  service-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "clamp(30px, 3vw, 58px)"
  service-panel-featured:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
  pale-card:
    backgroundColor: "{colors.pale}"
    textColor: "{colors.text}"
    rounded: "{rounded.square}"
  interior-hero:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
  form-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "13px 14px"
---

# Design System: Mary McNutt

## Overview

**Creative North Star: "The Personal Coaching Editorial"**

Mary's visual world combines personal, welcoming photography with restrained editorial typography. Thin headings leave room for conversation; bold phrases give the reader an immediate point of emphasis. White space, natural imagery, and green panels create a calm but confident public coaching presence.

The user-supplied Celeste desktop and mobile compositions establish the site's visual authority, while Center for Excellence supplies the green identity. The homepage expresses that world through broad portrait compositions and overlap; the interior families extend it through panoramic photographic heroes, structured editorial grids, sequential storytelling, long-form reading, and trust-first decision support. Preserve Mary's likeness in any portrait work. The shipped system uses square surfaces and deliberate spatial relationships; it does not depend on a conventional rounded application-card aesthetic.

**Key Characteristics:**
- Personal photography with open space for readable copy.
- Hairline Roboto headings with bold, colored emphasis.
- Nunito Sans paragraphs and compact, decisive action labels.
- White editorial space alternating with solid green surfaces.
- Square panels and controlled photographic overlaps.
- Panoramic interior heroes and structured grids that become a clear mobile reading sequence.
- Editorial archives that lead into calm, generous article pages with contextual side rails.
- Contact and pricing surfaces that make verified practical information prominent before the final invitation.

## Colors

The palette moves from grounding forest to active green and soft mint, surrounded by white and gently green-tinted neutrals. The frontmatter is the normative source for reusable values; the stylesheet's matching custom properties remain the implementation source.

### Primary
- **Coaching Green** (`green`): primary buttons, emphasized headings, article titles, inline links, and line illustrations on pale backgrounds.
- **Panel Green** (`panel`): substantial service, testimonial, process-header, program, and contact surfaces with reversed copy.
- **Forest** (`forest`): the featured service, dark text on light controls, outline controls, and primary-button hover.
- **Mint** (`mint`): large light-weight headings on green surfaces, footer headings, decorative outlines, white-button hover, and selected focus treatment inside testimonials. It is not a small-copy color on Panel Green.

### Neutral
- **White** (`white`): the main page, clear button surfaces, and reversed text.
- **Pale Sage** (`pale`): repeated article and focus-card backgrounds.
- **Body Ink** (`text`): long-form copy and neutral headings.
- **Muted Sage Ink** (`muted`): supporting details and small explanatory copy on light surfaces.

**The Surface Pairing Rule.** Use green emphasis against white or pale backgrounds; use white and mint for hierarchy on green panels. Carry each complete pairing when reusing a component.

**The Readable Reverse Type Rule.** On Panel Green, set body copy, labels, metadata, compact headings, and other small reverse text in White. Reserve Mint for large display hierarchy and decorative accents; never use it where the smaller text would lose WCAG contrast.

**The Legacy Surface Contrast Rule.** On White and Pale Sage legacy-content surfaces, use the deeper leaf green (`#196b55`) for links, eyebrows, and bold phrases. Reserve the softer heritage accent (`#a8cb6a`) for large emphasis, numbering, or borders against Forest; it is not readable small text on light surfaces. Forest legacy panels pair White primary copy with the softer accent only for hierarchy.

## Typography

**Display Font:** Roboto, with Arial and sans-serif fallbacks.

**Body Font:** Nunito Sans, with Arial and sans-serif fallbacks.

**Character:** The contrast is between extremely light editorial headings and friendly, readable body text. Locally hosted variable fonts provide the actual letterforms; fallback fonts are resilience measures, not the intended display identity.

### Hierarchy
- **Display:** the frontmatter display role is the homepage hero base. Interior hero titles use the same hairline character in a contained range (50–78px) and reduce to (44px), then (40px), on narrow screens. The homepage mobile hero uses a compact size (43px), tighter leading (1.06), and tracking (-0.04em); very narrow screens reduce it (39px).
- **Headline:** the fluid headline role is the foundation for large section titles. Several photographic and green-panel compositions tune that base to their available space. Mobile section headings generally land between (38px) and (43px).
- **Title:** the base title is light, with process and program-card titles commonly enlarged to (30px), and selected mobile card titles landing between (30px) and (32px). These sizes are content roles rather than a strict mathematical scale.
- **Body:** the base body role governs reading copy. Dense card paragraphs use (15px) with leading (1.5); mobile card copy returns to (16px). Introductory paragraphs use a larger range (18–25px), while large-screen adjustments scale selected passages further.
- **Label:** the frontmatter label role applies to functional buttons, rendered uppercase. Small buttons use (12px), and supporting metadata generally stays within (12–14px).

**The Emphasized Phrase Rule.** Set large headings in Roboto at weight (100), then promote only the key phrase to weight (700). On white, that phrase uses Coaching Green; in the prominent green banners, white carries the bold phrase and mint carries the light text.

## Layout

The main desktop container occupies (80%) of the viewport and stops at (1500px). It widens to (88%) at the compact desktop breakpoint (1150px), then uses a fixed total gutter of (40px) at mobile widths (800px and below). The mobile navigation has its own total gutter (36px).

Desktop collections use three service columns, four focus-card or program columns, three journal columns, and four-column editorial icon grids. Supporting content commonly uses asymmetric image-and-copy splits; the About biography uses a (42% / 58%) composition with an (8%) gap. Card grids use related gaps rather than a universal grid constant: focus and support cards (24px), journal cards (28px), and homepage programs (36px). Paragraph spacing repeatedly begins at the frontmatter paragraph step; larger pauses group actions and separate sections.

At mobile widths, major splits, icon grids, support cards, program options, and most collections become one column. From (540px) through (800px), homepage focus cards and programs use two columns. About credentials retain a two-column fact grid until the narrow interior breakpoint (420px), then stack; the footer retains two readable columns across mobile widths. Below (370px), homepage display sizes and selected paddings tighten without removing content.

The coaching process uses a centered three-track desktop grid: one content column, a (62px) rail, and a second content column. Five pale cards alternate left and right along a (2px) line, with circular markers centered on the rail. At (800px) and below, the sequence becomes a single vertical reading column with a slim left rail, markers outside the card edge, and every step kept in source order. Coaching program options move from four columns to two at the compact desktop breakpoint (1150px), then to one at mobile widths.

Portrait sections reserve adjacent white space for copy on desktop. In the hero, the portrait sits left and the text right; the desktop image remains contained so Mary's face is preserved. On mobile, the photo becomes a faded background behind the copy. Other portrait sections use low-opacity mobile images. Do not treat the desktop side-by-side crop as a crop that can simply shrink to a phone.

Interior pages use a shared panoramic hero under the translucent desktop header: (610px) high on full desktop, (540px) at compact desktop, and (390px) on mobile. A Forest gradient protects lower-left breadcrumb, title, and introduction copy; mobile returns the header to normal document flow and deepens the overlay. The smallest interior viewport (420px and below) reduces the hero to (355px) without removing its supporting line.

Legacy service and resource hubs use a taller photographic hero (minimum 560px) with a Forest fallback and strong left-to-right overlay, followed by an asymmetric editorial introduction. Their directories use three equal columns of flat Pale Sage cards; service cards lead with a consistent landscape crop, while text-only resource cards use vertical flex to keep actions aligned. At (900px) directories become two columns, and at (600px) they become one without changing source order.

Legacy service details protect the source-faithful body as the primary reading experience: a flexible article column pairs with a fixed (330px) related-support rail and a generous (8vw) gap. The article keeps relaxed leading, a larger lede, clear heading intervals, and the care disclaimer inside the narrative; related services and the consultation action remain in the rail. Legal and recovery reading pages use the same dominant-column principle with a narrower (280px) contextual rail, sticky only on desktop. At (900px) all reading shells become one column; the service rail may briefly use two internal columns, then stacks fully at (600px).

The Center for Excellence is the migration family's deliberate exception to the photographic legacy hero. It opens on Pale Sage with a copy-and-portrait split (1 / .62), follows with an asymmetric mission statement (1 / .75), a four-column numbered value grid separated by hairline seams, then a Forest service index in two columns. At (900px) the hero and mission stack and values reduce to two columns; at (600px) values and service links become one column.

The Blog archive uses a dominant article feed with a narrower topic and author rail. Its lead story spans the feed and pairs image with copy; subsequent stories form a two-column editorial grid. Reusable Article pages keep the same dominant-content relationship, constrain the reading column to a comfortable measure, and reserve the secondary rail for recent reading and a relevant support route. Both families become a single, source-ordered column on mobile; related stories change from a compact grid to image-and-title rows.

Contact and Pricing use trust-first Persuade layouts: lead with the shared photographic hero, place the primary action or verified starting point near the top of the content sequence, then alternate pale editorial fields, solid green emphasis, and personal photography. Contact pairs the inquiry with equally visible direct routes before moving into location context and a photographic close. Pricing moves from areas of support to one prominent rate anchor, then options, proof, payment details, and a personal close. Their four- and three-item desktop collections reduce through two columns before becoming one clear mobile sequence.

**The Responsive Overlap Rule.** Overlapping panels are a desktop composition device. The raised service and offset testimonial treatment flatten into the mobile reading order; retain their green/photographic relationship while removing the desktop offsets.

**The Sequential Collapse Rule.** Alternating desktop narratives must become one continuous, source-ordered column on mobile. Keep the line and markers as orientation aids, never as a reason to squeeze content into two narrow columns.

**The Primary Narrative Rule.** On Read surfaces, the article or archive feed always owns the widest column. Side rails provide orientation, authorship, recent reading, or a support route; they must never compete with or interrupt the primary narrative, and they rejoin it after the main content on mobile.

## Elevation & Depth

Depth comes primarily from photographs, solid color fields, white space, and overlap. Panels are flat by default. The shipped CSS uses a small set of soft, green-tinted shadows for the raised service, hover feedback, the mobile menu, and a map annotation. It does not use hard offset shadows or general-purpose raised cards.

### Shadow Vocabulary
- **Featured service:** a modest diffuse shadow reinforces the desktop raised service; it is removed on mobile.
- **Focus-card hover:** a soft shadow appears on interactive focus cards.
- **Mobile menu:** a light shadow separates the open navigation from the page below.
- **Map annotation:** a low-contrast shadow keeps the white text panel distinct from the map.

Exact shadow declarations are recorded in the sidecar because the frontmatter component schema cannot hold them.

**The Flat Resting Surface Rule.** Keep ordinary editorial cards flat at rest. Reserve shadows for the existing raised, overlay, and interactive roles.

## Shapes

Buttons, panels, editorial cards, fields, and photos use square corners. The core button border is a visible outline when needed (2px); pale cards rely on tonal separation. Thin divider lines separate metadata, focus links, contact rows, and grouped form content.

The compact brand mark has a clipped octagonal silhouette. Testimonial selectors and timeline markers are small circles, while large line illustrations use circular framing. The Coaching process label is a single compact, noninteractive pill-shaped caption. These are role-specific shapes, not a rounded-card or chip vocabulary. Keep ordinary controls and surfaces square while retaining the existing mark, marker, and illustration geometry.

## Components

### Buttons

Compact, square, and decisive. Each variant shares an inline-flex layout, an icon gap (18px), a standard minimum height (48px), and the frontmatter label role and padding. Small buttons reduce padding (13px 19px) and minimum height (44px); mobile hero buttons span the available copy width and reach a larger minimum height (53px).

- **Primary:** Coaching Green with white text; hover changes the background to Forest.
- **Outline:** transparent with a Forest border and text; hover fills Forest and reverses the text to white.
- **White:** white with Forest text for use on green fields; hover changes the background to Mint.
- **Light outline:** transparent with white border and text on green fields; hover becomes white with Forest text.
- **States:** background, foreground, and border changes take (0.2s) with ease timing. Keyboard focus uses an offset blue outline (3px wide, 5px offset). Reduced-motion preferences disable transitions.

### Cards / Containers

Editorial surfaces support the photography and message. Focus, journal, process, support, and program-option cards use Pale Sage, square corners, light green titles, and comfortable interior padding in the mid-twenties. Image-bearing cards use ratios tuned to their content rather than a single crop: common editorial cards use approximately (1.5), About support cards use (1.25) on desktop, and process cards use (1.45) with the focus step widened to (1.9). Focus cards gain the documented hover shadow; journal imagery scales subtly on hover (1.035) over (0.5s), and title links underline on hover.

Service panels use Panel Green and white text, with the same action anchored to the bottom by a vertical flex layout. Process cards use a compact Panel Green header above a Pale Sage body; program-option cards use vertical flex so their inline actions align at the lower edge. The featured service uses Forest and receives the desktop lift. Larger program, invitation, testimonial, and contact panels reuse these tonal relationships at section scale.

Blog archive cards keep imagery, topic, title, summary, authorship, and the reading action in a fixed editorial hierarchy. The lead story may become a Pale Sage image-and-copy panel across the full feed; ordinary stories remain flatter and lighter. Preserve the restrained image zoom and title underline as affordances, while keeping metadata visually secondary.

### Alternating Process Timeline

The five-step coaching timeline is the canonical sequential-story pattern. Each desktop step pairs a Panel Green header, Pale Sage body, practical list, action, and photograph with a circular green marker on a central rail. Alternate whole cards, never their internal reading order. On mobile, stack the cards in step order beside a left rail; keep markers visible and let cards take the full remaining width.

### Navigation

The desktop header sits over the hero with translucent white navigation and a narrow contact strip above. Uppercase Roboto navigation links use weight (400), an ample line height (44px), and a short green underline on hover or the current item. On mobile, the contact strip disappears, the header becomes an opaque white block (64px high), and a three-line menu control opens a full-width link panel.

The menu exposes its expanded state, closes on a selected link or an outside click, and returns focus to its toggle when Escape closes it. The mobile toggle animation is a brief line rotation and fade, not a page transition.

### Interior Hero

The shared interior hero is a square-edged panoramic photograph with a Forest fallback and a left-to-right Forest overlay. Breadcrumb, light display title, and one concise supporting line sit at the lower left inside the main container. Keep the title and supporting line white, maintain enough overlay for text contrast, and adjust the image focal point per page instead of forcing one universal crop.

### Legacy Service Directory

Treat the complete service catalog as a calm index, not a promotional card wall. Every entry uses the same image-label-title-action hierarchy, Pale Sage surface, square edges, landscape crop (approximately 1.45), and (24px) grid rhythm. Keep titles naturally variable in length and let the explicit action carry navigation; do not invent featured tiers within the archived catalog.

### Source-Backed Service Reading

Preserve migrated service copy as continuous long-form reading. The body precedes the rail in source order and ends with a Pale Sage care note marked by the soft heritage accent; the rail groups related routes in a separate Pale Sage panel and places the consultation card on Forest. Marketing actions may frame the article before or after it, but must not interrupt or rewrite the source-backed narrative.

### Recovery Lists and Prayer

Recovery sequences remain semantic ordered lists with generous line height and one fine divider per item; numbering is content, not decoration. Present prayers as inset Pale Sage quotation fields with a deep-leaf left rule, spacious padding, preserved line breaks, and a quiet attribution below. Keep these treatments solemn, highly readable, and free of card-grid ornament.

### Center for Excellence Surface

Use the pale copy-and-portrait hero, numbered value sequence, and Forest service index as one continuous institutional story. On light sections, deep leaf green carries emphasis and the numbered values; on the Forest index, White carries links and the softer heritage accent carries large display emphasis. The final green invitation reconnects the Center to Mary's primary site and services.

### Inputs / Fields

Coaching and contact fields use White backgrounds, a fine sage border (1px), square corners, Body Ink text, and the frontmatter form-field padding. Controls meet a (48px) minimum height; long-message textareas remain vertically resizable and visibly deeper than single-line fields. Labels are compact, bold, and Forest; required, optional, and privacy or submission behavior stays explicit in quieter supporting text. Focus uses the established blue outline (3px wide, 2px offset); the primary submit action becomes full width on mobile where space is constrained.

### Blog Archive

The archive opens with a short editorial introduction, then uses one featured story to establish hierarchy before the regular article grid. Topic labels are compact Coaching Green uppercase text; titles use the light heading voice; summaries use Body Ink; authorship and actions sit below a fine divider. A topic list and personal author portrait form the supporting rail, followed by a full-width Panel Green invitation after the archive.

### Reusable Article

Long-form articles open with a full-width photographic story header carrying topic, title, and authorship. The reading column uses relaxed leading, a larger Forest lede, clear heading intervals, captioned figures, and Pale Sage pull quotes. Editorial provenance, a contextual consultation panel, a compact author card, and related reading follow the body in that order. Keep the desktop sidebar sticky only while it remains secondary; return it to document flow on mobile.

### Contact Surface

Pair the labeled inquiry form with a grid of equal-weight direct-contact tiles so visitors can choose the lowest-friction route. Use line icons, Pale Sage tiles, and centered details for the direct routes; keep the form itself visually quieter and more linear. Location imagery is supporting context rather than proof of an office address, and the closing portrait returns the page from logistics to a personal invitation.

### Pricing Surface

Present the single-session rate as a large hairline numeral on Forest, with its unit, low-commitment framing, and action kept adjacent. Fixed-price coaching plans use four equal-height green panels with prominent hairline prices and bottom-aligned actions; they reduce to two columns at compact desktop and one column on mobile. Practical payment terms use a plain divided definition list rather than promotional cards. Evidence or experience counts may sit over softened photography, but their labels remain readable and precise.

**The Verified Offer Rule.** Give client-confirmed rates and terms the strongest numerical hierarchy. Preserve the $99 introductory hour and the supplied Starter ($249), Professional ($399), Expert ($499), and Premium ($549) plan prices; do not alter those prices without new client direction.

### Inline Links

Text actions use Coaching Green, bold body text, a fine underline, and a separated inline SVG arrow. Preserve the visible focus outline and descriptive action copy. Contact and footer links use the surrounding surface's readable color pairing and their existing hover cues.

### Testimonial Selector

Manual selectors use generous button boxes (32px square) around small outlined dots (7px). The selected dot fills white, and each button exposes its pressed state and the testimonial it selects. Content does not auto-advance. Keep the blue global focus treatment or the local mint focus treatment visible against its surface.

## Do's and Don'ts

The client-supplied circular dragonfly is the brand mark. Use `mary-mcnutt-dragonfly-logo.svg` with its intrinsic proportions: 64px desktop/footer, 54px compact desktop, 44px mobile, and 40px on the narrowest screens. The previous M monogram is retired.

### Do:
- **Do** preserve Mary's likeness and use personal, natural photography with space for readable copy.
- **Do** carry the complete light-surface or green-surface color pairing when reusing a component.
- **Do** maintain the light-heading and bold-phrase relationship with the locally hosted Roboto font.
- **Do** keep square buttons and panels, generous reading space, and the documented mobile reading order.
- **Do** keep small reverse text white on Panel Green and use Mint only for large display hierarchy or decorative accents.
- **Do** preserve the center-rail alternation on desktop and the source-ordered left-rail timeline on mobile.
- **Do** keep archive and article side rails subordinate to the main reading column and move them after the narrative on mobile.
- **Do** preserve generous article leading, clear heading intervals, visible provenance, and contextual related reading.
- **Do** preserve the legacy hub sequence of photographic hero, editorial introduction, complete directory, and one clear consultation close.
- **Do** keep migrated service copy continuous and source-faithful, with related routes and conversion actions separated into the side rail.
- **Do** preserve ordered-list semantics, prayer line breaks, and quiet attribution in recovery resources.
- **Do** retain the Center for Excellence's pale portrait opening, numbered value grid, and Forest service index as its distinctive layout family.
- **Do** pair contact forms with direct phone and email routes, and explain what submission will do before the visitor acts.
- **Do** distinguish a verified rate or practical term from program details that still require confirmation.
- **Do** preserve visible keyboard focus, reduced-motion handling, and explicit labels on icon controls.

### Don't:
- **Don't** replace the established green identity with an unrelated accent system.
- **Don't** apply pill shapes, rounded cards, or hard offset shadows to the editorial surface vocabulary.
- **Don't** carry desktop portrait crops and negative overlaps unchanged onto narrow screens.
- **Don't** use Mint for small body copy, metadata, compact headings, or labels on Panel Green.
- **Don't** compress an alternating timeline into two narrow mobile columns or reorder steps for visual symmetry.
- **Don't** let archive metadata, sidebars, or related content overpower the story title and reading column.
- **Don't** use the soft heritage accent as small text on White or Pale Sage, or deep leaf green as small text on Forest.
- **Don't** promote one migrated service above the others in the directory unless the content model explicitly introduces a featured tier.
- **Don't** leave service, policy, or resource rails beside the article after the reading shell collapses at (900px).
- **Don't** present location imagery as a verified office address or uncertain program pricing as a fixed offer.
- **Don't** turn the existing small promotional eyebrows or text-character icons into reusable house styles; use meaningful headings and inline SVG where the role needs an icon.

The card/program eyebrows and the journal plus and footer social letter are deliberately not canonized: they remain build-specific craft exceptions, rather than patterns for future surfaces to inherit. The quotation mark is editorial punctuation and remains valid in the photographic philosophy treatment.
