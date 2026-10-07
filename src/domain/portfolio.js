// Pure selection rules, usable in the browser or Node without a document.
export function filterProjects(projects, category = 'all') {
  return projects.filter(project => category === 'all' || project.category === category);
}

export function filterSkills(groups, { category = 'all', query = '' } = {}) {
  const normalized = query.trim().toLowerCase();
  return groups.flatMap(group => {
    if (category !== 'all' && group.category !== category) return [];
    const groupMatches = group.title.toLowerCase().includes(normalized);
    const skills = group.skills.filter(skill => groupMatches || skill.label.toLowerCase().includes(normalized));
    return skills.length ? [{ ...group, skills }] : [];
  });
}
