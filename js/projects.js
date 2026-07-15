// GitHub API configuration
const GITHUB_USERNAME = 'Abdullahshaz70';
const GITHUB_API = 'https://api.github.com';

// Language color mappings
const languageColors = {
    'Python': '#3776ab',
    'Dart': '#00B4AB',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'C++': '#00599c',
    'C#': '#239120',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'TeX': '#3d6117',
    'Jupyter Notebook': '#fa7343',
};

// Projects to exclude (like the portfolio repo itself)
const excludeRepos = ['Abdullahshaz70', 'Abdullahshaz70.github.io', 'METAL-SLUG'];

// Fetch all repositories
async function fetchRepositories() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        if (!response.ok) throw new Error('Failed to fetch repositories');

        let repos = await response.json();

        // Filter out excluded repos
        repos = repos.filter(repo => !excludeRepos.includes(repo.name));

        return repos;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

// Process and organize repositories
function processRepositories(repos) {
    return repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'A cool project by Abdullah Shaz',
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: new Date(repo.updated_at),
        topics: repo.topics || [],
    }));
}

// Create project card HTML
function createProjectCard(project) {
    const langColor = languageColors[project.language] || '#6b7280';
    const updatedDate = project.updated.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const starsHtml = project.stars > 0 ? `
        <div class="project-stat">
            <span>⭐</span>
            <span>${project.stars}</span>
        </div>
    ` : '';

    const forksHtml = project.forks > 0 ? `
        <div class="project-stat">
            <span>🔀</span>
            <span>${project.forks}</span>
        </div>
    ` : '';

    const languageHtml = project.language ? `
        <div class="project-language">
            <span class="language-dot" style="background-color: ${langColor}"></span>
            <span>${project.language}</span>
        </div>
    ` : '';

    return `
        <div class="project-card" data-language="${project.language || 'Other'}">
            <div class="project-header">
                <h3 class="project-title">${escapeHtml(project.name)}</h3>
                <p class="project-description">${escapeHtml(project.description)}</p>
            </div>
            <div class="project-body">
                <div class="project-meta">
                    ${languageHtml}
                </div>
                <div class="project-stats">
                    ${starsHtml}
                    ${forksHtml}
                    <div class="project-stat">
                        <span>📅</span>
                        <span>${updatedDate}</span>
                    </div>
                </div>
            </div>
            <div class="project-footer">
                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    View on GitHub →
                </a>
            </div>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Render projects to grid
function renderProjects(projects, filterLanguage = 'all') {
    const grid = document.getElementById('projectsGrid');

    // Filter projects
    let filtered = projects;
    if (filterLanguage !== 'all') {
        filtered = projects.filter(p => p.language === filterLanguage);
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="project-card loading"><p>No projects found with this filter.</p></div>';
        return;
    }

    // Sort by date updated (newest first)
    filtered.sort((a, b) => b.updated - a.updated);

    grid.innerHTML = filtered.map(project => createProjectCard(project)).join('');
}

// Setup filter buttons
function setupFilters(projects) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get filter value and render
            const filter = btn.dataset.filter;
            activeFilter = filter;
            renderProjects(projects, filter);
        });
    });

    // Collect unique languages and update filter buttons
    const languages = [...new Set(projects.filter(p => p.language).map(p => p.language))].sort();

    // Initialize with default filter
    renderProjects(projects, activeFilter);
}

// Initialize portfolio
async function initPortfolio() {
    const repos = await fetchRepositories();
    if (repos.length === 0) {
        document.getElementById('projectsGrid').innerHTML =
            '<div class="project-card loading"><p>Unable to load projects. Please try again later.</p></div>';
        return;
    }

    const projects = processRepositories(repos);
    setupFilters(projects);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initPortfolio);
