import db from './db.js';

// Retrieves the next `number_of_projects` upcoming service projects
// (project_date >= today), soonest first, along with the name of the
// partner organization hosting each one.
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_projects sp
        JOIN public.organizations o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date ASC
        LIMIT $1`;
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

// Retrieves the details of a single service project, along with the name
// of the partner organization hosting it.
const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.project_date AS date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_projects sp
        JOIN public.organizations o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1`;
    const result = await db.query(query, [projectId]);
    return result.rows[0] || null;
};

// Retrieves all service projects hosted by a given organization.
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date AS date
        FROM public.service_projects
        WHERE organization_id = $1
        ORDER BY project_date`;
    const result = await db.query(query, [organizationId]);
    return result.rows;
};

export { getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId };
