from pathlib import Path

page = Path('index.html')
html = page.read_text(encoding='utf-8')
start = html.index('        <article class="project-card" data-project-id="sparxg">')
end = html.index('        <article class="project-card" data-project-id="animarket">', start)
html = html[:start] + html[end:]
start = html.index('      <div class="project-filters"')
end = html.index('\n', start)
html = html[:start] + html[end + 1:]
start = html.index('          <div class="project-art animarket-art"')
end = html.index('          <div class="project-info">', start)
html = html[:start] + '''          <div class="project-art animarket-art" aria-label="AniMarket project brand identity">
            <span class="art-label">MOBILE / LIVESTOCK MARKETPLACE</span>
            <img class="animarket-logo" src="assets/animarket-logo.png" alt="AniMarket logo with farm animals, fields, and the tagline Buy, Sell, Grow Together" width="1280" height="1280" loading="lazy">
            <span class="illustration-label">PROJECT BRAND IDENTITY</span>
          </div>
''' + html[end:]
replacements = {
    'From a multi-branch point-of-sale system to a livestock marketplace, I enjoy bringing structure to practical problems.': 'Through AniMarket, a livestock marketplace mobile application, I bring structure to practical problems and connect people through useful technology.',
    'Two projects that reflect my approach to systems, data, and the people who use them.': 'A mobile marketplace that reflects my approach to applications, data, and the people who use them.',
    '02 / MOBILE APPLICATION': '01 / MOBILE APPLICATION',
    '2 projects shown': '1 featured project',
    'Project roles and contributions are drawn from my CV. Preview artwork illustrates each project’s purpose.': 'Project contributions are drawn from my CV. AniMarket branding is my supplied project logo.',
    'Building across web &amp; mobile': 'Developing AniMarket',
    'Co-developer of SparxG, focused on databases and quality assurance. Mobile application developer of AniMarket, built with Dart, Flutter, and Firebase.': 'Mobile application developer of AniMarket, a livestock marketplace built with Dart, Flutter, and Firebase. Developed listings, user profiles, real-time communication, and Firebase integration.',
    'My project experience includes a multi-branch point-of-sale system and a Flutter-based livestock marketplace.': 'My featured project is AniMarket, a Flutter-based livestock marketplace with Firebase integration.',
    'What was your role in the featured projects?': 'What was your role in AniMarket?',
    'I co-developed SparxG with a focus on database design and management, barcode integration, transaction interfaces, and quality assurance. For AniMarket, I developed the mobile application, including listings, messaging and calling, user profiles, and Firebase integration.': 'I developed the AniMarket mobile application, including livestock listings, messaging and calling, user profiles, and Firebase integration.',
}
for before, after in replacements.items():
    assert before in html, before
    html = html.replace(before, after)
page.write_text(html, encoding='utf-8')

data = Path('src/data/projects.js')
text = data.read_text(encoding='utf-8')
start, end = text.index('  sparxg:'), text.index('  animarket:')
text = text[:start] + text[end:]
text = text.replace('The portfolio preview is an interface illustration.', 'The portfolio preview uses the supplied AniMarket project logo.')
data.write_text(text, encoding='utf-8')

# Remove unused illustrated mobile interface styles now that actual branding is supplied.
import re
for name in ('portfolio.css', 'responsive.css'):
    path = Path('src/styles') / name
    text = path.read_text(encoding='utf-8')
    text = re.sub(r'[^{}]*(?:\.market-wordmark|\.phone-[\w-]+|\.livestock-art)[^{}]*\{[^{}]*\}', '', text)
    path.write_text(text, encoding='utf-8')
