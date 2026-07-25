// Import any needed model functions
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesForProject } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res, next) => {
    const { id } = req.params;
    const project = await getProjectDetails(id);

    // If no project matches the given ID, forward a 404 error
    if (!project) {
        const err = new Error('Service Project Not Found');
        err.status = 404;
        return next(err);
    }

    const categories = await getCategoriesForProject(id);
    const title = project.title;

    res.render('project', { title, project, categories });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };
