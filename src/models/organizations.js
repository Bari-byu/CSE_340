import db from './db.js';

const getAllOrganizations = async () => {
    const query = `SELECT organization_id, name, description, contact_email, logo_filename 
    FROM public.organizations`;
    const result = await db.query(query);
    return result.rows;
};

// Retrieves the details of a single organization by its ID.
const getOrganizationDetails = async (organizationId) => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organizations
        WHERE organization_id = $1`;
    const result = await db.query(query, [organizationId]);
    return result.rows[0] || null;
};

export { getAllOrganizations, getOrganizationDetails };
