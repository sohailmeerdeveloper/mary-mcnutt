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
---

# Design System: Mary McNutt

## Overview

**Creative North Star: "The Personal Coaching Editorial"**

Mary's visual world combines personal, welcoming photography with restrained editorial typography. Thin headings leave room for conversation; bold phrases give the reader an immediate point of emphasis. White space, natural imagery, and green panels create a calm but confident public coaching presence.

The user-supplied Celeste desktop and mobile compositions establish the homepage's visual authority, while Center for Excellence supplies the green identity. Preserve Mary's likeness in any portrait work. The shipped system uses broad photographic areas, square surfaces, and deliberate overlaps; it does not depend on a conventional rounded application-card aesthetic.

**Key Characteristics:**
- Personal photography with open space for readable copy.
- Hairline Roboto headings with bold, colored emphasis.
- Nunito Sans paragraphs and compact, decisive action labels.
- White editorial space alternating with solid green surfaces.
- Square panels and controlled photographic overlaps.

## Colors

The palette moves from grounding forest to active green and soft mint, surrounded by white and gently green-tinted neutrals. The frontmatter is the normative source for reusable values; the stylesheet's matching custom properties remain the implementation source.

### Primary
- **Coaching Green** (`green`): primary buttons, emphasized headings, article titles, inline links, and line illustrations on pale backgrounds.
- **Panel Green** (`panel`): substantial service, testimonial, program, and contact surfaces with reversed copy.
- **Forest** (`forest`): the featured service, dark text on light controls, outline controls, and primary-button hover.
- **Mint** (`mint`): lighter headings on green surfaces, footer headings, white-button hover, and selected focus treatment inside testimonials.

### Neutral
- **White** (`white`): the main page, clear button surfaces, and reversed text.
- **Pale Sage** (`pale`): repeated article and focus-card backgrounds.
- **Body Ink** (`text`): long-form copy and neutral headings.
- **Muted Sage Ink** (`muted`): supporting details and small explanatory copy on light surfaces.

**The Surface Pairing Rule.** Use green emphasis against white or pale backgrounds; use white and mint for hierarchy on green panels. Carry each complete pairing when reusing a component.

## Typography

**Display Font:** Roboto, with Arial and sans-serif fallbacks.

**Body Font:** Nunito Sans, with Arial and sans-serif fallbacks.

**Character:** The contrast is between extremely light editorial headings and friendly, readable body text. Locally hosted variable fonts provide the actual letterforms; fallback fonts are resilience measures, not the intended display identity.

### Hierarchy
- **Display:** the frontmatter display role is the desktop hero base. The mobile hero uses a compact display size (43px), tighter leading (1.06), and tracking (-0.04em); very narrow screens reduce it (39px).
- **Headline:** the fluid headline role is the foundation for large section titles. Several photographic and green-panel compositions tune that base to their available space. Mobile section headings generally land between (38px) and (43px).
- **Title:** the base title is light, with card and program titles commonly enlarged to (30px) on desktop and (32px) on mobile. These sizes are content roles rather than a strict mathematical scale.
- **Body:** the base body role governs reading copy. Dense card paragraphs use (15px) with leading (1.5); mobile card copy returns to (16px). Introductory paragraphs use a larger range (18–25px), while large-screen adjustments scale selected passages further.
- **Label:** the frontmatter label role applies to functional buttons, rendered uppercase. Small buttons use (12px), and supporting metadata generally stays within (12–14px).

**The Emphasized Phrase Rule.** Set large headings in Roboto at weight (100), then promote only the key phrase to weight (700). On white, that phrase uses Coaching Green; in the prominent green banners, white carries the bold phrase and mint carries the light text.

## Layout

The main desktop container occupies (80%) of the viewport and stops at (1500px). It widens to (88%) at the compact desktop breakpoint (1150px), then uses a fixed total gutter of (40px) at mobile widths (800px and below). The mobile navigation has its own total gutter (36px).

Desktop collections use three service columns, four focus-card columns, three journal columns, and four program columns. Supporting content commonly uses asymmetric image-and-copy splits. Card grids use related gaps rather than a universal grid constant: focus cards (24px), journal cards (28px), and programs (36px). Paragraph spacing repeatedly begins at the frontmatter paragraph step; larger pauses group actions and separate sections.

At mobile widths, major splits and most collections become one column. From (540px) through (800px), focus cards and programs use two columns. Credentials retain a two-column number grid on mobile, and the footer retains two readable columns across mobile widths. Below (370px), display sizes and selected paddings tighten without removing content.

Portrait sections reserve adjacent white space for copy on desktop. In the hero, the portrait sits left and the text right; the desktop image remains contained so Mary's face is preserved. On mobile, the photo becomes a faded background behind the copy. Other portrait sections use low-opacity mobile images. Do not treat the desktop side-by-side crop as a crop that can simply shrink to a phone.

**The Responsive Overlap Rule.** Overlapping panels are a desktop composition device. The raised service and offset testimonial treatment flatten into the mobile reading order; retain their green/photographic relationship while removing the desktop offsets.

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

Buttons, panels, editorial cards, and photos use square corners. The core button border is a visible outline when needed (2px); pale cards rely on tonal separation. Thin divider lines separate metadata and contact rows.

The compact brand mark has a clipped octagonal silhouette. Testimonial selectors are small circular dots, and the large line illustrations use circular framing. Those are role-specific shapes, not a rounded-card vocabulary. Keep ordinary controls and surfaces square while retaining the existing mark and selector geometry.

## Components

### Buttons

Compact, square, and decisive. Each variant shares an inline-flex layout, an icon gap (18px), a standard minimum height (48px), and the frontmatter label role and padding. Small buttons reduce padding (13px 19px) and minimum height (44px); mobile hero buttons span the available copy width and reach a larger minimum height (53px).

- **Primary:** Coaching Green with white text; hover changes the background to Forest.
- **Outline:** transparent with a Forest border and text; hover fills Forest and reverses the text to white.
- **White:** white with Forest text for use on green fields; hover changes the background to Mint.
- **Light outline:** transparent with white border and text on green fields; hover becomes white with Forest text.
- **States:** background, foreground, and border changes take (0.2s) with ease timing. Keyboard focus uses an offset blue outline (3px wide, 5px offset). Reduced-motion preferences disable transitions.

### Cards / Containers

Editorial surfaces support the photography and message. Focus and journal cards use Pale Sage, square corners, image ratios of (1.5), light green titles, and comfortable interior padding in the mid-twenties. Focus cards gain the documented hover shadow; journal imagery scales subtly on hover (1.035) over (0.5s), and title links underline on hover.

Service panels use Panel Green and white text, with the same action anchored to the bottom by a vertical flex layout. The featured panel uses Forest and receives the desktop lift. Larger program and testimonial panels reuse these tonal relationships at section scale.

### Navigation

The desktop header sits over the hero with translucent white navigation and a narrow contact strip above. Uppercase Roboto navigation links use weight (400), an ample line height (44px), and a short green underline on hover or the current item. On mobile, the contact strip disappears, the header becomes an opaque white block (64px high), and a three-line menu control opens a full-width link panel.

The menu exposes its expanded state, closes on a selected link or an outside click, and returns focus to its toggle when Escape closes it. The mobile toggle animation is a brief line rotation and fade, not a page transition.

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
- **Do** preserve visible keyboard focus, reduced-motion handling, and explicit labels on icon controls.

### Don't:
- **Don't** replace the established green identity with an unrelated accent system.
- **Don't** apply pill shapes, rounded cards, or hard offset shadows to the editorial surface vocabulary.
- **Don't** carry desktop portrait crops and negative overlaps unchanged onto narrow screens.
- **Don't** turn the existing small promotional eyebrows or text-character icons into reusable house styles; use meaningful headings and inline SVG where the role needs an icon.

The card/program eyebrows and the journal plus and footer social letter are deliberately not canonized: they remain build-specific craft exceptions, rather than patterns for future surfaces to inherit. The quotation mark is editorial punctuation and remains valid in the photographic philosophy treatment.
