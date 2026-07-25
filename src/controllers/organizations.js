// Import any needed model functions
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res, next) => {
    const { id } = req.params;
    const organization = await getOrganizationDetails(id);

    // If no organization matches the given ID, forward a 404 error
    if (!organization) {
        const err = new Error('Organization Not Found');
        err.status = 404;
        return next(err);
    }

    const projects = await getProjectsByOrganizationId(id);
    const title = organization.name;

    res.render('organization', { title, organization, projects });
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };
